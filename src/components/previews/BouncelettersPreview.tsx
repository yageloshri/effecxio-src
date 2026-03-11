'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const TEXT = 'BOUNCE';

const KEYFRAMES = `
@keyframes bounceletters-drop {
  0% {
    opacity: 0;
    transform: translateY(-80px) scale(0.6);
  }
  60% {
    opacity: 1;
    transform: translateY(8px) scale(1.05);
  }
  80% {
    transform: translateY(-4px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
`;

function BouncelettersPreview() {
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

  return (
    <div
      onClick={() => setKey((k) => k + 1)}
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
      <div key={key} style={{ display: 'flex' }}>
        {TEXT.split('').map((ch, i) => (
          <span
            key={`${key}-${i}`}
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: 'var(--text)',
              display: 'inline-block',
              opacity: prefersReduced ? 1 : 0,
              animation: prefersReduced
                ? 'none'
                : `bounceletters-drop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s forwards`,
            }}
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

export default memo(BouncelettersPreview);
