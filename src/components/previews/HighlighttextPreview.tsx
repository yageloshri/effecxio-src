'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes highlighttext-sweep {
  from { background-size: 0% 100%; }
  to   { background-size: 100% 100%; }
}
`;

function HighlighttextPreview() {
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
    { text: 'This is important', color: 'var(--accent)', delay: 0 },
    { text: 'text that gets', color: 'var(--accent)', delay: 0.5 },
    { text: 'highlighted like a marker', color: 'var(--accent3)', delay: 1 },
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
        gap: 4,
      }}
    >
      {lines.map((line, i) => (
        <span
          key={`${key}-${i}`}
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1.8,
            background: `linear-gradient(transparent 55%, color-mix(in srgb, ${line.color} 30%, transparent) 55%)`,
            backgroundSize: prefersReduced ? '100% 100%' : '0% 100%',
            backgroundRepeat: 'no-repeat',
            animation: prefersReduced
              ? 'none'
              : `highlighttext-sweep 1s ease ${line.delay}s forwards`,
            padding: '0 4px',
          }}
        >
          {line.text}
        </span>
      ))}
    </div>
  );
}

export default memo(HighlighttextPreview);
