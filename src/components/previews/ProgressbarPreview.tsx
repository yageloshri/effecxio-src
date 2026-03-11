'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const PROGRESS_KEYFRAMES = `
@keyframes progressbar-fill {
  0% { width: 0%; }
  80% { width: 100%; }
  100% { width: 100%; }
}
@keyframes progressbar-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
@keyframes progressbar-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

function ProgressbarPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = PROGRESS_KEYFRAMES;
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
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Track */}
      <div
        style={{
          width: 220,
          height: 12,
          borderRadius: 6,
          background: 'var(--surface)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Fill bar */}
        <div
          style={{
            height: '100%',
            borderRadius: 6,
            background: `linear-gradient(90deg, var(--accent), var(--accent3))`,
            backgroundSize: '400% 100%',
            animation: prefersReduced
              ? 'none'
              : 'progressbar-fill 2.5s ease-in-out infinite, progressbar-shimmer 1.5s linear infinite',
          }}
        />
      </div>
      {/* Pulsing label */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--muted)',
          letterSpacing: 1,
          animation: prefersReduced ? 'none' : 'progressbar-pulse 2.5s ease-in-out infinite',
        }}
      >
        Loading...
      </span>
    </div>
  );
}

export default memo(ProgressbarPreview);
