'use client';
import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const SLIDES = [
  { label: 'שקופית 1', color: 'var(--accent)' },
  { label: 'שקופית 2', color: 'var(--accent2)' },
  { label: 'שקופית 3', color: 'var(--accent3)' },
  { label: 'שקופית 4', color: 'var(--muted)' },
];

function CarouselSnapPreview() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (prefersReduced) return;
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % SLIDES.length);
    }, 1800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [prefersReduced]);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        gap: 12,
      }}
    >
      {/* Track */}
      <div style={{ width: 220, overflow: 'hidden', borderRadius: 12 }}>
        <div
          style={{
            display: 'flex',
            transition: prefersReduced ? 'none' : 'transform 0.5s cubic-bezier(.4,0,.2,1)',
            transform: `translateX(-${active * 220}px)`,
          }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              style={{
                minWidth: 220,
                height: 140,
                background: `linear-gradient(135deg, ${slide.color}, var(--surface))`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>
                {slide.label}
              </span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>snap קרוסלה</span>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div style={{ display: 'flex', gap: 8 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: active === i ? 20 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              background: active === i ? 'var(--accent)' : 'var(--border)',
              transition: prefersReduced ? 'none' : 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(CarouselSnapPreview);
