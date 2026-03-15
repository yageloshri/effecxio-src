'use client';

import { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

const CARDS = [
  {
    href: '/effects',
    image: '/images/fx.png',
    title: 'אפקטים',
    description: 'למעלה מ-110 אפקטי CSS ו-JS מוכנים להעתקה. אנימציות, מעברים, רקעים ועוד.',
    clr: '#1a3a1a',
    fclr: '#c8f53b',
  },
  {
    href: '/templates',
    image: '/images/templates.png',
    title: 'טמפלייטים',
    description: 'תבניות אתר מוכנות: Landing pages, dashboards, portfolios — העתק והתחל לבנות.',
    clr: '#1e1e2e',
    fclr: '#a855f7',
  },
  {
    href: '/specials',
    image: '/images/speacils.png',
    title: 'ספיישלים',
    description: '46 אפקטים מיוחדים ומרשימים. אנימציות 3D, מעברים מורכבים ועוד.',
    clr: '#2e2214',
    fclr: '#f59e0b',
  },
  {
    href: '/icons',
    image: '/images/icons.png',
    title: 'אייקונים',
    description: '480+ אייקונים בסגנון אחיד. SVG נקי שאפשר להדביק ישר בקוד.',
    clr: '#0e1e2e',
    fclr: '#38bdf8',
  },
  {
    href: '/fonts',
    image: '/images/fonts.png',
    title: 'פונטים',
    description: 'זוגות פונטים שעובדים יחד. עברית ואנגלית, עם הוראות שימוש.',
    clr: '#2e1414',
    fclr: '#ff6b6b',
  },
  {
    href: '/libraries',
    image: '/images/libraries.png',
    title: 'ספריות',
    description: 'הספריות הכי שימושיות לפיתוח. מוכן להעתקה עם פרומפט מותאם.',
    clr: '#0e2e1e',
    fclr: '#10b981',
  },
];

export default function Card3DSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered animation for mobile
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const cards = containerRef.current?.querySelectorAll('.card-3d-anim');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card3d-in-view');
          } else {
            entry.target.classList.remove('card3d-in-view');
          }
        });
      },
      { threshold: 0.6 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} style={{ marginTop: 60 }}>
      <style>{`
.card3d-section-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    padding: 80px 24px 40px;
    font-family: 'Heebo', sans-serif;
    --scale: clamp(120px, 13vw, 170px);
    gap: 72px;
    max-width: 1400px;
    margin: 0 auto;
}

.card-3d-anim {
    width: var(--scale);
    height: 340px;
    min-width: var(--scale);
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin: 0;
}
.card-3d-anim:hover {
    transform: translateY(-6px) scale(1.02);
}

.card-3d-anim .card3d-overflow {
    pointer-events: none;
    position: absolute;
    width: 200%;
    height: 200%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    clip-path: polygon(0 0, 100% 0, 100% 60%, 75% 60%, 75% 100%, 25% 100%, 25% 60%, 0 60%);
}
.card-3d-anim .card3d-model {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    perspective: 600px;
}
.card-3d-anim .card3d-model img {
    max-width: 80%;
    max-height: 85%;
    object-fit: contain;
    /* Default: diagonal tilt to the LEFT, pushed up high — sticking out of card */
    transform: rotateY(22deg) rotateX(18deg) translateY(-40px) scale(1.05);
    transition: transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), filter 0.5s ease;
    filter: drop-shadow(0 8px 24px rgba(0,0,0,0.4));
    transform-origin: center bottom;
}
.card-3d-anim:hover .card3d-model img {
    /* Hover: flattens and sinks into pocket */
    transform: rotateY(0deg) rotateX(-8deg) translateY(6px) scale(0.93);
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.25));
}

.card-3d-anim .card3d-glass {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80%;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow: hidden;
}
.card-3d-anim .card3d-content {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: fit-content;
    padding: 12px 16px;
    direction: rtl;
    text-align: center;
    width: 100%;
}
.card-3d-anim .card3d-content h2 {
    margin: 0 0 6px 0;
    padding: 0;
    line-height: 124%;
    font-weight: 700;
    font-family: 'Heebo', sans-serif;
    font-size: 22px;
}
.card-3d-anim .card3d-content p {
    margin: 0;
    padding: 0;
    line-height: 150%;
    font-weight: 500;
    font-family: 'Heebo', sans-serif;
    font-size: 12px;
    opacity: 0.65;
}

/* Gradient blur */
.card3d-gradient-blur {
    position: absolute;
    z-index: 1;
    height: 100%;
    inset: auto 0 0 0;
    pointer-events: none;
}
.card3d-gradient-blur > div,
.card3d-gradient-blur::before,
.card3d-gradient-blur::after {
    position: absolute;
    inset: 0;
    --p1: 0%; --p2: 12.5%; --p3: 25%; --p4: 37.5%;
    --p5: 50%; --p6: 62.5%; --p7: 75%; --p8: 87.5%; --p9: 100%;
}
.card3d-gradient-blur::before {
    content: "";
    z-index: 1;
    backdrop-filter: blur(0.5px);
    mask: linear-gradient(to bottom, rgba(0,0,0,0) var(--p1), rgba(0,0,0,1) var(--p2), rgba(0,0,0,1) var(--p3), rgba(0,0,0,0) var(--p4));
}
.card3d-gradient-blur > div:nth-of-type(1) {
    z-index: 2; backdrop-filter: blur(1px);
    mask: linear-gradient(to bottom, rgba(0,0,0,0) var(--p2), rgba(0,0,0,1) var(--p3), rgba(0,0,0,1) var(--p4), rgba(0,0,0,0) var(--p5));
}
.card3d-gradient-blur > div:nth-of-type(2) {
    z-index: 3; backdrop-filter: blur(2px);
    mask: linear-gradient(to bottom, rgba(0,0,0,0) var(--p3), rgba(0,0,0,1) var(--p4), rgba(0,0,0,1) var(--p5), rgba(0,0,0,0) var(--p6));
}
.card3d-gradient-blur > div:nth-of-type(3) {
    z-index: 4; backdrop-filter: blur(4px);
    mask: linear-gradient(to bottom, rgba(0,0,0,0) var(--p4), rgba(0,0,0,1) var(--p5), rgba(0,0,0,1) var(--p6), rgba(0,0,0,0) var(--p7));
}
.card3d-gradient-blur > div:nth-of-type(4) {
    z-index: 5; backdrop-filter: blur(8px);
    mask: linear-gradient(to bottom, rgba(0,0,0,0) var(--p5), rgba(0,0,0,1) var(--p6), rgba(0,0,0,1) var(--p7), rgba(0,0,0,0) var(--p8));
}
.card3d-gradient-blur > div:nth-of-type(5) {
    z-index: 6; backdrop-filter: blur(16px);
    mask: linear-gradient(to bottom, rgba(0,0,0,0) var(--p6), rgba(0,0,0,1) var(--p7), rgba(0,0,0,1) var(--p8), rgba(0,0,0,0) var(--p9));
}
.card3d-gradient-blur > div:nth-of-type(6) {
    z-index: 7; backdrop-filter: blur(32px);
    mask: linear-gradient(to bottom, rgba(0,0,0,0) var(--p7), rgba(0,0,0,1) var(--p8), rgba(0,0,0,1) var(--p9));
}
.card3d-gradient-blur::after {
    content: "";
    z-index: 8; backdrop-filter: blur(64px);
    mask: linear-gradient(to bottom, rgba(0,0,0,0) var(--p8), rgba(0,0,0,1) var(--p9));
}

/* Thought bubble tag */
/* Thought bubble — sits inside the flex row, to the right of the cards */
.card3d-bubble {
    position: relative;
    background: #ffffff;
    border-radius: 20px;
    padding: 14px 22px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.28), 0 1px 6px rgba(0,0,0,0.18);
    display: flex;
    align-items: center;
    gap: 8px;
    direction: rtl;
    align-self: center;
    flex-shrink: 0;
}
.card3d-bubble-emoji {
    font-size: 18px;
    line-height: 1;
}
.card3d-bubble-text {
    font-size: 15px;
    font-weight: 700;
    color: #111111;
    font-family: 'Heebo', sans-serif;
    line-height: 1.3;
    white-space: nowrap;
}
.card3d-bubble-dot1 {
    position: absolute;
    left: -10px;
    top: 50%;
    margin-top: -3px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 6px rgba(0,0,0,0.2);
}
.card3d-bubble-dot2 {
    position: absolute;
    left: -20px;
    top: 50%;
    margin-top: -5px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 6px rgba(0,0,0,0.2);
}

@media (max-width: 1024px) {
    .card3d-section-wrap {
        flex-wrap: wrap;
        --scale: clamp(140px, 28vw, 180px);
        gap: 16px;
        padding: 60px 16px 20px;
    }
    .card-3d-anim {
        margin: 0;
        height: 300px;
    }
    /* Hide desktop bubble, show mobile bubble */
    .card3d-bubble-desktop { display: none !important; }
    .card3d-bubble-mobile { display: flex !important; }
}
@media (max-width: 768px) {
    .card3d-section-wrap {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr);
        --scale: auto;
        gap: 12px;
        padding: 60px 16px 20px;
    }
    .card-3d-anim {
        width: 100% !important;
        min-width: unset !important;
        height: 260px;
        margin: 0;
    }
    /* Scroll-triggered animation instead of hover */
    .card-3d-anim .card3d-model img {
        transform: rotateY(22deg) rotateX(18deg) translateY(-30px) scale(1.02);
    }
    .card-3d-anim.card3d-in-view .card3d-model img {
        transform: rotateY(0deg) rotateX(-5deg) translateY(4px) scale(0.93);
    }
    .card-3d-anim .card3d-content h2 { font-size: 16px; }
    .card-3d-anim .card3d-content p { font-size: 10px; }
}
@media (max-width: 480px) {
    .card3d-section-wrap {
        gap: 10px;
        padding: 48px 12px 16px;
    }
    .card-3d-anim {
        height: 220px;
    }
    .card-3d-anim .card3d-content h2 { font-size: 14px; }
    .card-3d-anim .card3d-content p { font-size: 9px; }
}
      `}</style>

      <div className="card3d-section-wrap" style={{ position: 'relative' }}>
        {/* Thought bubble — absolute positioned to the right of cards */}
        <div className="card3d-bubble card3d-bubble-desktop" style={{ position: 'absolute', top: '50%', right: -30, transform: 'translateX(100%) translateY(-50%)', zIndex: 10 }}>
          <div className="card3d-bubble-dot1" />
          <div className="card3d-bubble-dot2" />
          <span className="card3d-bubble-emoji">✨</span>
          <span className="card3d-bubble-text">גם האפקט הזה נלקח מהאתר</span>
        </div>
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="card-3d-anim"
            style={{
              background: card.clr,
              boxShadow: `1px 1px 3px ${card.fclr}22, 12px 42px 24px -8px ${card.fclr}11, 10px 24px 42px 0 ${card.fclr}11, 1px 4px 12px 0 ${card.fclr}18`,
            }}
          >
            <div className="card3d-overflow">
              <div className="card3d-model">
                <img src={card.image} alt={card.title} />
              </div>
            </div>
            <div
              className="card3d-glass"
              style={{
                background: `linear-gradient(transparent, ${card.clr} 80%)`,
              }}
            >
              <div className="card3d-gradient-blur"><div /><div /><div /><div /><div /><div /></div>
            </div>
            <div className="card3d-content">
              <h2 style={{ color: card.fclr }}>{card.title}</h2>
              <p style={{ color: card.fclr }}>{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile bubble — below cards */}
      <div className="card3d-bubble-mobile" style={{
        display: 'none',
        justifyContent: 'center',
        padding: '16px 0 8px',
      }}>
        <div className="card3d-bubble">
          <div className="card3d-bubble-dot1" style={{ left: 'auto', right: 'auto', top: -8, marginTop: 0 }} />
          <div className="card3d-bubble-dot2" style={{ left: 'auto', right: 'auto', top: -18, marginTop: 0 }} />
          <span className="card3d-bubble-emoji">✨</span>
          <span className="card3d-bubble-text">גם האפקט הזה נלקח מהאתר</span>
        </div>
      </div>
    </section>
  );
}
