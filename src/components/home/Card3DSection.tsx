'use client';

import { useRef, useEffect, useState } from 'react';
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
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileVisible, setMobileVisible] = useState<Set<number>>(new Set());
  const mobileCardsRef = useRef<(HTMLElement | null)[]>([]);

  // Desktop: stagger slide-up
  useEffect(() => {
    const el = containerRef.current;
    if (!el || isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  // Mobile: detect + per-card scroll animation
  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (!mobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setMobileVisible((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe after a tick so initial paint is hidden
    const timer = setTimeout(() => {
      mobileCardsRef.current.forEach((el) => {
        if (el) observer.observe(el);
      });
    }, 50);

    return () => { clearTimeout(timer); observer.disconnect(); };
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
    margin: 0;
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

.card-3d-anim:hover {
    transform: translateY(-6px) scale(1.02) !important;
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

/* Mobile: hide desktop cards, show mobile list */
@media (max-width: 768px) {
    .card3d-section-wrap { display: none !important; }
    .card3d-mobile-list { display: flex !important; }
    .card3d-bubble-desktop { display: none !important; }
    .card3d-bubble-mobile { display: flex !important; }
}

/* Mobile card list */
.card3d-mobile-list {
    display: none;
    flex-direction: column;
    gap: 16px;
    padding: 0 20px;
    max-width: 400px;
    margin: 0 auto;
}
.card3d-mobile-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    border-radius: 16px;
    background: var(--surface, #0a0a0a);
    border: 1px solid rgba(255,255,255,0.06);
    text-decoration: none;
    direction: rtl;
    will-change: transform, opacity;
}
.card3d-mobile-item .card3d-m-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
}
.card3d-mobile-item .card3d-m-text {
    flex: 1;
}
.card3d-mobile-item .card3d-m-text h3 {
    margin: 0 0 4px;
    font-size: 18px;
    font-weight: 700;
    font-family: 'Heebo', sans-serif;
    line-height: 1.2;
}
.card3d-mobile-item .card3d-m-text p {
    margin: 0;
    font-size: 12px;
    font-family: 'Heebo', sans-serif;
    line-height: 1.5;
    opacity: 0.5;
    color: #fff;
}
.card3d-mobile-item .card3d-m-arrow {
    font-size: 18px;
    opacity: 0.3;
    flex-shrink: 0;
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
        {CARDS.map((card, i) => (
          <Link
            key={card.href}
            href={card.href}
            className="card-3d-anim"
            style={{
              background: card.clr,
              boxShadow: `1px 1px 3px ${card.fclr}22, 12px 42px 24px -8px ${card.fclr}11, 10px 24px 42px 0 ${card.fclr}11, 1px 4px 12px 0 ${card.fclr}18`,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 100}ms`,
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

      {/* Mobile list — alternating slide-in */}
      <div className="card3d-mobile-list">
        {CARDS.map((card, i) => {
          const isVisible = mobileVisible.has(i);
          const fromRight = i % 2 === 0;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="card3d-mobile-item"
              ref={(el) => { mobileCardsRef.current[i] = el; }}
              data-idx={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? 'translateX(0)'
                  : fromRight ? 'translateX(60px)' : 'translateX(-60px)',
                transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                borderColor: isVisible ? `${card.fclr}30` : 'rgba(255,255,255,0.06)',
                boxShadow: isVisible ? `0 0 20px ${card.fclr}10` : 'none',
              }}
            >
              <div className="card3d-m-dot" style={{ background: card.fclr }} />
              <div className="card3d-m-text">
                <h3 style={{ color: card.fclr }}>{card.title}</h3>
                <p>{card.description}</p>
              </div>
              <span className="card3d-m-arrow">←</span>
            </Link>
          );
        })}
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
