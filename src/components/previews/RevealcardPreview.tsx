'use client';
import { memo, useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

function RevealcardPreview() {
  const prefersReduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (prefersReduced) return;
    timerRef.current = setInterval(() => {
      setRevealed((p) => !p);
    }, 2200);
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
      }}
    >
      <div
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        style={{
          width: 170,
          height: 160,
          borderRadius: 14,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          border: '1px solid var(--border)',
        }}
      >
        {/* Content underneath */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              opacity: 0.9,
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
            תוכן נחשף
          </span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>נמצא מתחת</span>
        </div>

        {/* Colored overlay that wipes away */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            transition: prefersReduced ? 'none' : 'clip-path 0.6s cubic-bezier(.4,0,.2,1)',
            clipPath: revealed
              ? 'inset(0 100% 0 0)'
              : 'inset(0 0 0 0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--bg)' }}>
            רחף לחשיפה
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(RevealcardPreview);
