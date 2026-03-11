'use client';
import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CARD_COLORS = [
  'var(--accent)',
  'var(--accent2)',
  'var(--accent3)',
  'var(--muted)',
];

function StackedcardsPreview() {
  const prefersReduced = useReducedMotion();
  const [spread, setSpread] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (prefersReduced) return;
    timerRef.current = setInterval(() => {
      setSpread((p) => !p);
    }, 2000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [prefersReduced]);

  const getCardStyle = useCallback(
    (i: number): React.CSSProperties => {
      const total = CARD_COLORS.length;
      /* Angles fan from -24 to +24 degrees */
      const angle = spread ? (i - (total - 1) / 2) * 16 : (i - (total - 1) / 2) * 2;
      const yOff = spread ? -Math.abs(i - (total - 1) / 2) * 12 : i * -3;
      const xOff = spread ? (i - (total - 1) / 2) * 30 : 0;
      return {
        position: 'absolute',
        width: 100,
        height: 140,
        borderRadius: 12,
        background: `linear-gradient(145deg, ${CARD_COLORS[i]}, var(--surface))`,
        border: '1px solid var(--border)',
        transition: prefersReduced ? 'none' : 'transform 0.5s cubic-bezier(.4,0,.2,1)',
        transform: `translateX(${xOff}px) translateY(${yOff}px) rotate(${angle}deg)`,
        transformOrigin: 'center bottom',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: i,
      };
    },
    [spread, prefersReduced]
  );

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
        position: 'relative',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setSpread(true)}
      onMouseLeave={() => setSpread(false)}
    >
      <div style={{ position: 'relative', width: 100, height: 140 }}>
        {CARD_COLORS.map((_, i) => (
          <div key={i} style={getCardStyle(i)}>
            <span style={{ fontSize: 24, opacity: 0.4, color: 'var(--text)' }}>
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(StackedcardsPreview);
