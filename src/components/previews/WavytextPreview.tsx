'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const TEXT = 'WAVE EFFECT';

const KEYFRAMES = `
@keyframes wavytext-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-18px); }
}
`;

function WavytextPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

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
      <div style={{ display: 'flex' }}>
        {TEXT.split('').map((ch, i) => (
          <span
            key={i}
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: 'var(--text)',
              display: 'inline-block',
              width: ch === ' ' ? 16 : undefined,
              animation: prefersReduced
                ? 'none'
                : `wavytext-bounce 1.5s ease-in-out ${i * 0.08}s infinite`,
            }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(WavytextPreview);
