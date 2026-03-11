'use client';
import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const STACK_COLORS = [
  'var(--accent)',
  'var(--accent2)',
  'var(--accent3)',
  'var(--muted)',
];

function ImagestackPreview() {
  const prefersReduced = useReducedMotion();
  const [spread, setSpread] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (prefersReduced) return;
    timerRef.current = setInterval(() => {
      setSpread((p) => !p);
    }, 2200);
    return () => clearInterval(timerRef.current);
  }, [prefersReduced]);

  const getCardStyle = useCallback(
    (i: number): React.CSSProperties => {
      const total = STACK_COLORS.length;
      /* Fan from -20 to +20 degrees */
      const angle = spread ? (i - (total - 1) / 2) * 14 : (i - (total - 1) / 2) * 2;
      const yOff = spread ? -Math.abs(i - (total - 1) / 2) * 8 : i * -3;
      const xOff = spread ? (i - (total - 1) / 2) * 28 : 0;
      return {
        position: 'absolute',
        width: 72,
        height: 96,
        borderRadius: 10,
        background: `linear-gradient(145deg, ${STACK_COLORS[i]}, var(--surface))`,
        border: '1px solid var(--border)',
        transition: prefersReduced ? 'none' : 'transform 0.5s cubic-bezier(.4,0,.2,1)',
        transform: `translateX(${xOff}px) translateY(${yOff}px) rotate(${angle}deg)`,
        transformOrigin: 'center bottom',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
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
      <div style={{ position: 'relative', width: 72, height: 96 }}>
        {STACK_COLORS.map((_, i) => (
          <div key={i} style={getCardStyle(i)}>
            <span
              style={{
                fontSize: 18,
                opacity: 0.3,
                color: 'var(--text)',
                fontWeight: 700,
              }}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 11,
          color: 'var(--muted)',
        }}
      >
        מחסנית תמונות
      </div>
    </div>
  );
}

export default memo(ImagestackPreview);
