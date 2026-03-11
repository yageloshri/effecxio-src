'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const AURORA_KEYFRAMES = `
@keyframes aurora-1 {
  0%, 100% { transform: translate(0%, 0%) scale(1); filter: hue-rotate(0deg); }
  25% { transform: translate(30%, -20%) scale(1.1); filter: hue-rotate(30deg); }
  50% { transform: translate(-10%, 25%) scale(0.9); filter: hue-rotate(60deg); }
  75% { transform: translate(-25%, -10%) scale(1.05); filter: hue-rotate(90deg); }
}

@keyframes aurora-2 {
  0%, 100% { transform: translate(0%, 0%) scale(1); filter: hue-rotate(0deg); }
  25% { transform: translate(-25%, 20%) scale(0.95); filter: hue-rotate(-40deg); }
  50% { transform: translate(20%, -15%) scale(1.15); filter: hue-rotate(-80deg); }
  75% { transform: translate(10%, 30%) scale(1); filter: hue-rotate(-120deg); }
}

@keyframes aurora-3 {
  0%, 100% { transform: translate(0%, 0%) scale(1.05); filter: hue-rotate(0deg); }
  33% { transform: translate(15%, 25%) scale(0.9); filter: hue-rotate(50deg); }
  66% { transform: translate(-20%, -20%) scale(1.1); filter: hue-rotate(100deg); }
}
`;

const BLOBS = [
  {
    size: 160,
    color: 'var(--accent)',
    animation: 'aurora-1 8s ease-in-out infinite',
    top: '10%',
    left: '15%',
    opacity: 0.35,
  },
  {
    size: 130,
    color: 'var(--accent2)',
    animation: 'aurora-2 10s ease-in-out infinite',
    top: '30%',
    left: '55%',
    opacity: 0.3,
  },
  {
    size: 110,
    color: 'var(--accent3)',
    animation: 'aurora-3 12s ease-in-out infinite',
    top: '50%',
    left: '30%',
    opacity: 0.3,
  },
];

function AuroraPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = AURORA_KEYFRAMES;
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
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        borderRadius: 0,
      }}
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: blob.color,
            filter: 'blur(50px)',
            opacity: blob.opacity,
            top: blob.top,
            left: blob.left,
            animation: prefersReduced ? 'none' : blob.animation,
            willChange: 'transform, filter',
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'var(--text)',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        >
          Aurora
        </span>
      </div>
    </div>
  );
}

export default memo(AuroraPreview);
