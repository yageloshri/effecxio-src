'use client';
import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function ScrollprogressPreview() {
  const prefersReduced = useReducedMotion();
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const dirRef = useRef(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;

    const speed = 0.004; /* progress increment per frame (0 to 1) */

    const animate = () => {
      progressRef.current += speed * dirRef.current;

      if (progressRef.current >= 1) dirRef.current = -1;
      if (progressRef.current <= 0) dirRef.current = 1;

      setProgress(progressRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced]);

  const pct = Math.round(progress * 100);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 3,
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))',
          borderRadius: '0 2px 2px 0',
          boxShadow: `0 0 8px var(--accent)`,
          transition: prefersReduced ? 'none' : undefined,
          zIndex: 2,
        }}
      />

      {/* Simulated header */}
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--text)',
          opacity: 0.6,
        }}
      >
        Article Title
      </div>

      {/* Simulated content lines */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: 20,
        }}
      >
        {[0.85, 0.7, 0.9, 0.6, 0.75, 0.5].map((w, i) => (
          <div
            key={i}
            style={{
              width: `${w * 100}%`,
              height: 6,
              borderRadius: 3,
              background: 'var(--surface)',
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* Percentage display */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: 'var(--accent)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {pct}%
        </span>
      </div>
    </div>
  );
}

export default memo(ScrollprogressPreview);
