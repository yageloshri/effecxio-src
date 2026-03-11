'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const LIQUID_KEYFRAMES = `
@keyframes liquidloader-rise {
  0% { transform: translateY(100%); }
  80% { transform: translateY(0%); }
  100% { transform: translateY(0%); }
}
@keyframes liquidloader-wave {
  0% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(-25%) translateY(-3px); }
  100% { transform: translateX(-50%) translateY(0); }
}
@keyframes liquidloader-cycle {
  0%, 100% { transform: translateY(100%); }
  50%, 80% { transform: translateY(0%); }
}
`;

function LiquidloaderPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = LIQUID_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  /* Circle dimensions */
  const SIZE = 100; /* px */

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
      {/* Outer ring */}
      <div
        style={{
          width: SIZE,
          height: SIZE,
          borderRadius: '50%',
          border: '2px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Rising liquid */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            animation: prefersReduced
              ? 'none'
              : 'liquidloader-cycle 4s ease-in-out infinite',
          }}
        >
          {/* Wave surface */}
          <div
            style={{
              position: 'absolute',
              top: -6, /* wave crest peeks above fill */
              left: '-50%',
              width: '200%',
              height: 12,
              borderRadius: '40%',
              background: 'var(--accent)',
              opacity: 0.6,
              animation: prefersReduced
                ? 'none'
                : 'liquidloader-wave 2s linear infinite',
            }}
          />
          {/* Solid fill */}
          <div
            style={{
              position: 'absolute',
              top: 4,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(to top, var(--accent), var(--accent3))`,
              opacity: 0.85,
            }}
          />
        </div>
        {/* Percentage label */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--text)',
              mixBlendMode: 'difference',
            }}
          >
            LOAD
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(LiquidloaderPreview);
