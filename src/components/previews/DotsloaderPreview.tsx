'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const DOTS_KEYFRAMES = `
@keyframes dotsloader-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-18px); opacity: 1; }
}
`;

function DotsloaderPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = DOTS_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const dots = [0, 1, 2];

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
        gap: 12,
      }}
    >
      {dots.map((i) => (
        <div
          key={i}
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'var(--accent)',
            animation: prefersReduced
              ? 'none'
              : `dotsloader-bounce 1.4s ease-in-out infinite`,
            animationDelay: `${i * 0.16}s`, /* 160ms stagger between dots */
          }}
        />
      ))}
    </div>
  );
}

export default memo(DotsloaderPreview);
