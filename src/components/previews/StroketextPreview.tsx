'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes stroketext-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes stroketext-fill {
  to { opacity: 1; }
}
`;

function StroketextPreview() {
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
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <svg key={key} viewBox="0 0 320 70" width="320" height="70" style={{ overflow: 'visible' }}>
        {/* Stroke outline that draws on */}
        <text
          x="50%"
          y="55"
          textAnchor="middle"
          style={{
            fontSize: 60,
            fontWeight: 900,
            fontFamily: 'Arial, sans-serif',
            fill: 'none',
            stroke: 'var(--accent)',
            strokeWidth: 2,
            strokeDasharray: 500,
            strokeDashoffset: prefersReduced ? 0 : 500,
            animation: prefersReduced ? 'none' : 'stroketext-draw 2.5s ease forwards',
          }}
        >
          EFFECT
        </text>
        {/* Fill that fades in after stroke completes */}
        <text
          x="50%"
          y="55"
          textAnchor="middle"
          style={{
            fontSize: 60,
            fontWeight: 900,
            fontFamily: 'Arial, sans-serif',
            fill: 'var(--text)',
            opacity: prefersReduced ? 1 : 0,
            animation: prefersReduced ? 'none' : 'stroketext-fill 0.8s ease 2s forwards',
          }}
        >
          EFFECT
        </text>
      </svg>
    </div>
  );
}

export default memo(StroketextPreview);
