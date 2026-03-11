'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const TEXT = '3D WAVE';

const KEYFRAMES = `
@keyframes textwave3d-rotate {
  0%, 100% {
    transform: rotateX(0deg);
  }
  25% {
    transform: rotateX(40deg);
  }
  50% {
    transform: rotateX(0deg);
  }
  75% {
    transform: rotateX(-40deg);
  }
}
`;

function Textwave3dPreview() {
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
      <div style={{ display: 'flex', perspective: 500 }}>
        {TEXT.split('').map((ch, i) => (
          <span
            key={i}
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: 'var(--text)',
              display: 'inline-block',
              width: ch === ' ' ? 18 : undefined,
              transformStyle: 'preserve-3d' as const,
              animation: prefersReduced
                ? 'none'
                : `textwave3d-rotate 2s ease-in-out ${i * 0.12}s infinite`,
            }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(Textwave3dPreview);
