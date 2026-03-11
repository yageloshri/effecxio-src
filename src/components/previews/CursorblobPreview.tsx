'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes cursorblob-path {
  0%   { left: 30%; top: 50%; }
  20%  { left: 60%; top: 30%; }
  40%  { left: 70%; top: 65%; }
  60%  { left: 35%; top: 70%; }
  80%  { left: 25%; top: 35%; }
  100% { left: 30%; top: 50%; }
}
`;

function CursorblobPreview() {
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
      {/* The blob */}
      <div
        style={{
          position: 'absolute',
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.4,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          animation: prefersReduced ? 'none' : 'cursorblob-path 8s ease-in-out infinite',
          willChange: 'left, top',
        }}
      />

      {/* Content on top */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--text)',
            opacity: 0.7,
            marginBottom: 6,
          }}
        >
          Blob
        </div>
        <div
          style={{
            fontSize: 12,
            color: 'var(--muted)',
            opacity: 0.5,
          }}
        >
          Follows cursor with lerp
        </div>
      </div>
    </div>
  );
}

export default memo(CursorblobPreview);
