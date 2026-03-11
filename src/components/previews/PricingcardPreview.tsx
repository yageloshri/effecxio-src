'use client';
import { memo, useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const PLANS = [
  { name: 'בסיסי', price: 'חינם', accent: 'var(--muted)', features: 2 },
  { name: 'פרו', price: '49\u20AA', accent: 'var(--accent)', features: 4 },
  { name: 'עסקי', price: '99\u20AA', accent: 'var(--accent2)', features: 3 },
];

function PricingcardPreview() {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (prefersReduced) return;
    let idx = 1;
    timerRef.current = setInterval(() => {
      idx = (idx + 1) % PLANS.length;
      setHovered(idx);
    }, 2000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [prefersReduced]);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        gap: 10,
        direction: 'rtl',
      }}
    >
      {PLANS.map((plan, i) => {
        const isActive = hovered === i;
        return (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              width: 90,
              padding: '14px 10px',
              borderRadius: 14,
              background: isActive ? 'var(--surface)' : 'var(--bg)',
              border: `1.5px solid ${isActive ? plan.accent : 'var(--border)'}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              transition: prefersReduced ? 'none' : 'all 0.35s ease',
              transform: isActive && !prefersReduced ? 'scale(1.08)' : 'scale(1)',
              boxShadow: isActive
                ? `0 8px 30px rgba(0,0,0,0.25)`
                : '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: plan.accent }}>
              {plan.name}
            </span>
            <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>
              {plan.price}
            </span>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[...Array(plan.features)].map((_, f) => (
                <div
                  key={f}
                  style={{
                    height: 5,
                    borderRadius: 3,
                    background: 'var(--border)',
                    width: `${70 + f * 8}%`,
                    opacity: isActive ? 1 : 0.5,
                    transition: prefersReduced ? 'none' : 'opacity 0.3s ease',
                  }}
                />
              ))}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 10,
                fontWeight: 600,
                color: 'var(--bg)',
                background: plan.accent,
                borderRadius: 6,
                padding: '4px 12px',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                transition: prefersReduced ? 'none' : 'all 0.3s ease',
              }}
            >
              בחר
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(PricingcardPreview);
