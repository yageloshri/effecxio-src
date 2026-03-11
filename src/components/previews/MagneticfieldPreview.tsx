'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes magfield-cursor {
  0%   { left: 25%; top: 50%; }
  25%  { left: 60%; top: 30%; }
  50%  { left: 75%; top: 60%; }
  75%  { left: 40%; top: 70%; }
  100% { left: 25%; top: 50%; }
}
@keyframes magfield-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.15); }
}
`;

/* 5x3 grid of nodes */
const NODES: { x: number; y: number }[] = [];
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 5; c++) {
    NODES.push({
      x: 15 + c * 17.5,
      y: 25 + r * 25,
    });
  }
}

function MagneticfieldPreview() {
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
      {/* Grid of magnetic nodes */}
      {NODES.map((node, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.5,
            transform: 'translate(-50%, -50%)',
            animation: prefersReduced
              ? 'none'
              : `magfield-pulse ${2 + (i % 3) * 0.5}s ease-in-out ${i * 0.15}s infinite`,
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '50%',
              border: '1px solid var(--accent)',
              opacity: 0.2,
            }}
          />
        </div>
      ))}

      {/* Simulated cursor */}
      <div
        style={{
          position: 'absolute',
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: 'var(--accent2)',
          boxShadow: '0 0 20px var(--accent2)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          animation: prefersReduced ? 'none' : 'magfield-cursor 5s ease-in-out infinite',
          willChange: 'left, top',
          zIndex: 10,
        }}
      />

      {/* Influence ring around cursor */}
      <div
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: '1px solid var(--accent2)',
          opacity: 0.15,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          animation: prefersReduced ? 'none' : 'magfield-cursor 5s ease-in-out infinite',
          willChange: 'left, top',
          zIndex: 9,
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
          zIndex: 20,
        }}
      >
        Magnetic Field
      </span>
    </div>
  );
}

export default memo(MagneticfieldPreview);
