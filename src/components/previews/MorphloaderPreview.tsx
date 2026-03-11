'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/* Morphs: circle -> square -> triangle -> circle, 6s total loop */
const MORPHLOADER_KEYFRAMES = `
@keyframes morphloader-shape {
  0%, 100% {
    border-radius: 50%;
    transform: rotate(0deg);
    clip-path: none;
    background: var(--accent);
  }
  33% {
    border-radius: 12px;
    transform: rotate(90deg);
    clip-path: none;
    background: var(--accent2);
  }
  66% {
    border-radius: 0;
    transform: rotate(180deg);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background: var(--accent3);
  }
}
@keyframes morphloader-pulse {
  0%, 100% { transform: scale(1); opacity: 0.25; }
  50% { transform: scale(1.6); opacity: 0; }
}
`;

function MorphloaderPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = MORPHLOADER_KEYFRAMES;
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
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        {/* Pulse ring behind */}
        <div
          style={{
            position: 'absolute',
            inset: -8,
            borderRadius: '50%',
            border: '2px solid var(--accent)',
            animation: prefersReduced ? 'none' : 'morphloader-pulse 2s ease-in-out infinite',
          }}
        />
        {/* Morphing shape */}
        <div
          style={{
            width: 64,
            height: 64,
            background: 'var(--accent)',
            borderRadius: '50%',
            animation: prefersReduced ? 'none' : 'morphloader-shape 6s ease-in-out infinite',
            willChange: 'border-radius, transform, clip-path',
          }}
        />
      </div>
    </div>
  );
}

export default memo(MorphloaderPreview);
