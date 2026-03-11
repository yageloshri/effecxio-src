'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes textmask-gradient {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

function TextmaskPreview() {
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
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 120,
          overflow: 'hidden',
          background: 'var(--bg)',
        }}
      >
        {/* Animated gradient layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--accent), var(--accent3), var(--accent2), var(--accent))',
            backgroundSize: '400% 400%',
            animation: prefersReduced ? 'none' : 'textmask-gradient 5s ease infinite',
            zIndex: 1,
          }}
        />
        {/* Text mask layer — black text on black bg, multiply removes it */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 72,
            fontWeight: 900,
            color: 'var(--bg)',
            background: 'var(--bg)',
            mixBlendMode: 'multiply',
            letterSpacing: 6,
            userSelect: 'none',
          }}
        >
          MASK
        </div>
      </div>
    </div>
  );
}

export default memo(TextmaskPreview);
