'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes customcursor-move {
  0%   { left: 20%; top: 50%; }
  15%  { left: 45%; top: 30%; }
  30%  { left: 70%; top: 55%; }
  45%  { left: 50%; top: 70%; }
  60%  { left: 30%; top: 40%; }
  75%  { left: 65%; top: 35%; }
  90%  { left: 40%; top: 60%; }
  100% { left: 20%; top: 50%; }
}
@keyframes customcursor-ring {
  0%   { left: 20%; top: 50%; }
  15%  { left: 44%; top: 31%; }
  30%  { left: 69%; top: 54%; }
  45%  { left: 49%; top: 69%; }
  60%  { left: 29%; top: 41%; }
  75%  { left: 64%; top: 36%; }
  90%  { left: 39%; top: 59%; }
  100% { left: 20%; top: 50%; }
}
`;

function CustomcursorPreview() {
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
      {/* Target boxes to give context */}
      <div
        style={{
          position: 'absolute',
          left: '20%',
          top: '35%',
          width: 80,
          height: 40,
          borderRadius: 10,
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          color: 'var(--muted)',
        }}
      >
        Hover
      </div>
      <div
        style={{
          position: 'absolute',
          right: '20%',
          top: '50%',
          width: 80,
          height: 40,
          borderRadius: 10,
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          color: 'var(--muted)',
        }}
      >
        Click
      </div>

      {/* Ring (follows with delay) */}
      <div
        style={{
          position: 'absolute',
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid var(--accent)',
          opacity: 0.5,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          animation: prefersReduced ? 'none' : 'customcursor-ring 6s ease-in-out infinite',
          willChange: 'left, top',
        }}
      />

      {/* Dot (follows precisely) */}
      <div
        style={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          animation: prefersReduced ? 'none' : 'customcursor-move 6s ease-in-out infinite',
          willChange: 'left, top',
          boxShadow: '0 0 8px var(--accent)',
        }}
      />

      <span
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 12,
          color: 'var(--muted)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      >
        Custom Cursor
      </span>
    </div>
  );
}

export default memo(CustomcursorPreview);
