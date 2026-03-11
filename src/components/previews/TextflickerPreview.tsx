'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes textflicker-blink {
  0%  { opacity: 1; }
  5%  { opacity: 0.85; }
  10% { opacity: 1; }
  15% { opacity: 0.4; }
  20% { opacity: 1; }
  50% { opacity: 1; }
  55% { opacity: 0.7; }
  60% { opacity: 1; }
  80% { opacity: 0.9; }
  85% { opacity: 0.3; transform: translateX(2px); }
  90% { opacity: 1; transform: translateX(0); }
  100%{ opacity: 1; }
}
`;

function TextflickerPreview() {
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
        position: 'relative',
      }}
    >
      {/* Scanlines overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          zIndex: 2,
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5))',
          zIndex: 1,
        }}
      />
      <span
        style={{
          fontSize: 36,
          fontWeight: 700,
          fontFamily: "'Courier New', monospace",
          color: 'var(--text)',
          textShadow: '0 0 8px color-mix(in srgb, var(--accent) 60%, transparent)',
          animation: prefersReduced ? 'none' : 'textflicker-blink 0.15s infinite',
          position: 'relative',
          zIndex: 3,
        }}
      >
        SIGNAL LOST
      </span>
    </div>
  );
}

export default memo(TextflickerPreview);
