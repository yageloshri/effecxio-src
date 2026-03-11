'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const RING_KEYFRAMES = `
@keyframes draw-ring {
  0% { stroke-dashoffset: 440; opacity: 1; }
  80% { stroke-dashoffset: 0; opacity: 1; }
  90% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

@keyframes draw-ring-delayed {
  0% { stroke-dashoffset: 440; opacity: 0.5; }
  80% { stroke-dashoffset: 0; opacity: 0.5; }
  90% { stroke-dashoffset: 0; opacity: 0.5; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

@keyframes pulse-center {
  0%, 100% { transform: scale(0.8); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.7; }
}

@keyframes counter-text {
  0% { opacity: 0.4; }
  80% { opacity: 1; }
  100% { opacity: 0.4; }
}
`;

const CIRCUMFERENCE = 2 * Math.PI * 70; // ~440

function ScrollringPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = RING_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const dur = prefersReduced ? '0s' : '3s';

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
      <div style={{ position: 'relative', width: 160, height: 160 }}>
        <svg
          viewBox="0 0 160 160"
          width="160"
          height="160"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Background track */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="var(--surface)"
            strokeWidth="4"
          />

          {/* Outer glow ring */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="var(--accent3)"
            strokeWidth="2"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            strokeLinecap="round"
            opacity="0.3"
            transform="rotate(-90 80 80)"
            style={{
              animation: prefersReduced
                ? 'none'
                : `draw-ring-delayed ${dur} ease-in-out infinite`,
            }}
          />

          {/* Main drawing ring */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
            style={{
              animation: prefersReduced
                ? 'none'
                : `draw-ring ${dur} ease-in-out infinite`,
              willChange: 'stroke-dashoffset',
            }}
          />

          {/* Center pulse */}
          <circle
            cx="80"
            cy="80"
            r="8"
            fill="var(--accent)"
            style={{
              transformOrigin: '80px 80px',
              animation: prefersReduced
                ? 'none'
                : `pulse-center ${dur} ease-in-out infinite`,
            }}
          />
        </svg>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: 'var(--muted)',
              fontWeight: 700,
              animation: prefersReduced
                ? 'none'
                : `counter-text ${dur} ease-in-out infinite`,
            }}
          >
            scroll
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(ScrollringPreview);
