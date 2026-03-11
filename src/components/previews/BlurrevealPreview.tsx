'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes blurreveal-in {
  from {
    opacity: 0;
    filter: blur(20px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
  }
}
`;

function BlurrevealPreview() {
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

  const lines = [
    { text: 'BLUR REVEAL', size: 38, weight: 900, color: 'var(--text)', delay: 0 },
    { text: 'כניסה חלומית', size: 16, weight: 400, color: 'var(--muted)', delay: 0.3 },
    { text: 'מטשטוש לבהירות', size: 14, weight: 400, color: 'var(--muted)', delay: 0.6 },
  ];

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
        gap: 8,
      }}
    >
      {lines.map((line, i) => (
        <div
          key={`${key}-${i}`}
          style={{
            fontSize: line.size,
            fontWeight: line.weight,
            color: line.color,
            opacity: prefersReduced ? 1 : 0,
            filter: prefersReduced ? 'none' : 'blur(20px)',
            animation: prefersReduced
              ? 'none'
              : `blurreveal-in 1s cubic-bezier(0.25,0.46,0.45,0.94) ${line.delay}s forwards`,
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}

export default memo(BlurrevealPreview);
