'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes gradienttext-shift {
  0%   { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}
`;

function GradienttextPreview() {
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        gap: 8,
      }}
    >
      <span
        style={{
          fontSize: 48,
          fontWeight: 900,
          background: 'linear-gradient(90deg, var(--accent), var(--accent3), var(--accent2), var(--accent), var(--accent3))',
          backgroundSize: '300% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: prefersReduced ? 'none' : 'gradienttext-shift 4s linear infinite',
        }}
      >
        GRADIENT
      </span>
      <span style={{ fontSize: 13, color: 'var(--muted)' }}>
        גרדיאנט נע בתוך טקסט
      </span>
    </div>
  );
}

export default memo(GradienttextPreview);
