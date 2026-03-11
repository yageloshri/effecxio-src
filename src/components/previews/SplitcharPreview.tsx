'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const TEXT = 'EFFECTS';

const KEYFRAMES = `
@keyframes splitchar-fly {
  from {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.3);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
    filter: blur(0px);
  }
}
`;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function SplitcharPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  // Replay on click
  const handleClick = () => setKey((k) => k + 1);

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        cursor: 'pointer',
        gap: 10,
      }}
    >
      <div key={key} style={{ display: 'flex', gap: 2 }}>
        {TEXT.split('').map((ch, i) => (
          <span
            key={`${key}-${i}`}
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: 'var(--text)',
              display: 'inline-block',
              opacity: prefersReduced ? 1 : 0,
              '--tx': `${randomBetween(-250, 250)}px`,
              '--ty': `${randomBetween(-250, 250)}px`,
              '--rot': `${randomBetween(-180, 180)}deg`,
              animation: prefersReduced
                ? 'none'
                : `splitchar-fly 0.7s cubic-bezier(0.23,1,0.32,1) ${i * 0.1}s forwards`,
            } as React.CSSProperties}
          >
            {ch}
          </span>
        ))}
      </div>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>
        לחץ להפעלה מחדש
      </span>
    </div>
  );
}

export default memo(SplitcharPreview);
