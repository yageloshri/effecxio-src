'use client';

import { useRef } from 'react';
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

  return (
    <section ref={containerRef}>
      <style>{`
@import url('https://fonts.cdnfonts.com/css/satoshi');

.card3d-section-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 80px 32px;
    font-family: 'Satoshi', sans-serif;
    --scale: clamp(180px, 18vw, 260px);
    gap: 24px;
    max-width: 900px;
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
    bottom: -5%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-3d-anim .card3d-model img {
    max-width: 70%;
    max-height: 75%;
    object-fit: contain;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
}
.card-3d-anim:hover .card3d-model img {
    transform: scale(1.1) translateY(-8px);
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
    position: relative;
    z-index: 1;
    bottom: 0;
    top: unset;
    height: fit-content;
    padding: 12px 20px 16px;
    direction: rtl;
    text-align: right;
    width: 100%;
}
.card-3d-anim .card3d-content h2 {
    margin: 0 0 6px 0;
    padding: 0;
    line-height: 124%;
    font-weight: 700;
    font-family: 'Heebo', sans-serif;
    font-size: 17px;
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

@media (max-width: 768px) {
    .card3d-section-wrap {
        --scale: clamp(140px, 42vw, 180px);
        gap: 12px;
        padding: 60px 16px;
    }
    .card-3d-anim {
        height: 280px;
    }
    .card-3d-anim .card3d-content h2 { font-size: 15px; }
    .card-3d-anim .card3d-content p { font-size: 11px; }
}
@media (max-width: 480px) {
    .card3d-section-wrap {
        --scale: clamp(130px, 44vw, 160px);
        gap: 10px;
        padding: 48px 12px;
    }
    .card-3d-anim {
        height: 240px;
    }
}
      `}</style>

      <div className="card3d-section-wrap">
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
    </section>
  );
}
