'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// Preview simulates interaction -- real version uses actual events

const DRAG_KEYFRAMES = `
@keyframes preview-drag-path {
  0%   { left: 20px;  top: 30px; }
  15%  { left: 100px; top: 20px; }
  30%  { left: 160px; top: 60px; }
  50%  { left: 120px; top: 100px; }
  65%  { left: 40px;  top: 80px; }
  80%  { left: 80px;  top: 40px; }
  100% { left: 20px;  top: 30px; }
}
`;

function DraggablePreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = DRAG_KEYFRAMES;
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
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 240,
          height: 160,
          border: '2px dashed var(--border)',
          borderRadius: 14,
          background: 'var(--surface)',
        }}
      >
        {/* Simulated draggable box */}
        <div
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            borderRadius: 12,
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--bg)',
            fontWeight: 700,
            fontSize: 10,
            userSelect: 'none',
            boxShadow: '0 4px 16px rgba(200,245,59,0.2)',
            animation: prefersReduced
              ? 'none'
              : 'preview-drag-path 6s ease-in-out infinite',
            left: 20,
            top: 30,
          }}
        >
          Drag
        </div>
        {/* Hint text */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'var(--muted)',
            fontSize: 10,
          }}
        >
          simulated drag path
        </div>
      </div>
    </div>
  );
}

export default memo(DraggablePreview);
