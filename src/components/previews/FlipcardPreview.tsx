'use client';
import { memo, useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

function FlipcardPreview() {
  const prefersReduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (prefersReduced) return;
    timerRef.current = setInterval(() => {
      setFlipped((p) => !p);
    }, 2500);
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
        perspective: 600,
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          width: 150,
          height: 180,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: prefersReduced ? 'none' : 'transform 0.7s cubic-bezier(.4,0,.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: 14,
            background: 'linear-gradient(135deg, var(--surface), var(--bg))',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              opacity: 0.8,
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
            צד קדמי
          </span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>רחף להפוך</span>
        </div>
        {/* Back face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: 14,
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}
        >
          <span style={{ fontSize: 22 }}>&#9733;</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--bg)' }}>
            צד אחורי
          </span>
          <span style={{ fontSize: 11, color: 'var(--bg)', opacity: 0.7 }}>
            תוכן מוסתר
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(FlipcardPreview);
