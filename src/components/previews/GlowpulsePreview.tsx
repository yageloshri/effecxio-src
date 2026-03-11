'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes glowpulse-breathe {
  0% {
    text-shadow:
      0 0 4px color-mix(in srgb, var(--accent) 50%, transparent),
      0 0 11px color-mix(in srgb, var(--accent) 30%, transparent),
      0 0 19px color-mix(in srgb, var(--accent) 15%, transparent);
  }
  100% {
    text-shadow:
      0 0 8px color-mix(in srgb, var(--accent) 80%, transparent),
      0 0 25px color-mix(in srgb, var(--accent) 50%, transparent),
      0 0 46px color-mix(in srgb, var(--accent) 30%, transparent),
      0 0 80px color-mix(in srgb, var(--accent) 15%, transparent);
  }
}
`;

function GlowpulsePreview() {
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
        gap: 12,
      }}
    >
      <span
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: 'var(--text)',
          animation: prefersReduced
            ? 'none'
            : 'glowpulse-breathe 2s ease-in-out infinite alternate',
        }}
      >
        GLOW
      </span>
      <span
        style={{
          fontSize: 14,
          color: 'var(--muted)',
        }}
      >
        זוהר ניאון פועם
      </span>
    </div>
  );
}

export default memo(GlowpulsePreview);
