'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const PAGEREVEAL_KEYFRAMES = `
@keyframes pagereveal-wipe {
  0% { transform: translateX(0%); }
  40% { transform: translateX(0%); }
  100% { transform: translateX(101%); }
}
@keyframes pagereveal-fadein {
  0%, 40% { opacity: 0; }
  100% { opacity: 1; }
}
`;

function PagerevealPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = PAGEREVEAL_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  /* Restart the reveal every 3s so the loop is visible */
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setCycle((c) => c + 1), 3000);
    return () => clearInterval(id);
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
        position: 'relative',
      }}
    >
      {/* Page content underneath */}
      <span
        key={`text-${cycle}`}
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: 2,
          opacity: prefersReduced ? 1 : undefined,
          animation: prefersReduced ? 'none' : 'pagereveal-fadein 2s ease forwards',
        }}
      >
        Page Revealed
      </span>

      {/* Overlay that wipes away */}
      {!prefersReduced && (
        <div
          key={`overlay-${cycle}`}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--accent)',
            animation: 'pagereveal-wipe 2s cubic-bezier(0.77,0,0.18,1) forwards',
            zIndex: 2,
          }}
        />
      )}
    </div>
  );
}

export default memo(PagerevealPreview);
