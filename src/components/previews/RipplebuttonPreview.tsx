'use client';

import { memo, useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const RIPPLE_KEYFRAMES = `
@keyframes preview-ripple-expand {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

function RipplebuttonPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Inject keyframes on mount
  if (typeof document !== 'undefined' && !styleRef.current) {
    const style = document.createElement('style');
    style.textContent = RIPPLE_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
  }

  const handleHover = useCallback(
    () => {
      if (prefersReduced) return;
      const btn = btnRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const x = rect.width / 2;
      const y = rect.height / 2;
      const size = Math.max(rect.width, rect.height);

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        transform: scale(0);
        animation: preview-ripple-expand 0.6s ease-out forwards;
        pointer-events: none;
      `;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    },
    [prefersReduced],
  );

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
        ref={btnRef}
        onMouseEnter={handleHover}
        style={{
          position: 'relative',
          padding: '14px 40px',
          borderRadius: 12,
          border: 'none',
          background: 'var(--accent)',
          color: 'var(--bg)',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'transform 0.2s ease',
          letterSpacing: 1,
        }}
      >
        Ripple
      </button>
    </div>
  );
}

export default memo(RipplebuttonPreview);
