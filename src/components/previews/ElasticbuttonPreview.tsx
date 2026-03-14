'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const ELASTIC_KEYFRAMES = `
@keyframes preview-elastic-bounce {
  0%   { transform: scale(1, 1); }
  10%  { transform: scale(1.15, 0.85); }
  20%  { transform: scale(0.85, 1.15); }
  30%  { transform: scale(1.1, 0.9); }
  40%  { transform: scale(0.95, 1.05); }
  50%  { transform: scale(1.05, 0.95); }
  60%  { transform: scale(0.98, 1.02); }
  70%  { transform: scale(1.02, 0.98); }
  80%  { transform: scale(0.99, 1.01); }
  90%  { transform: scale(1.01, 0.99); }
  100% { transform: scale(1, 1); }
}
`;

function ElasticbuttonPreview() {
  const prefersReduced = useReducedMotion();
  const [bouncing, setBouncing] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = ELASTIC_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const handleClick = useCallback(() => {
    if (prefersReduced) return;
    setBouncing(false);
    // Force reflow to restart animation
    requestAnimationFrame(() => {
      setBouncing(true);
    });
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
      <button
        onMouseEnter={handleClick}
        onAnimationEnd={() => setBouncing(false)}
        style={{
          padding: '14px 40px',
          borderRadius: 12,
          border: '2px solid var(--accent)',
          background: 'var(--accent)',
          color: 'var(--bg)',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          transformOrigin: 'center center',
          willChange: 'transform',
          animation: bouncing
            ? 'preview-elastic-bounce 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            : 'none',
          letterSpacing: 1,
        }}
      >
        Elastic
      </button>
    </div>
  );
}

export default memo(ElasticbuttonPreview);
