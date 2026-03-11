'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const MESH_KEYFRAMES = `
@keyframes mesh-drift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(60px, 40px) scale(1.15); }
}
@keyframes mesh-drift2 {
  0%, 100% { transform: translate(0, 0) scale(1.1); }
  50% { transform: translate(-50px, 30px) scale(0.9); }
}
@keyframes mesh-drift3 {
  0%, 100% { transform: translate(0, 0) scale(0.95); }
  50% { transform: translate(40px, -35px) scale(1.1); }
}
@keyframes mesh-drift4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, -25px) scale(1.1); }
}
`;

const BLOBS = [
  { size: 140, color: 'var(--accent)', animation: 'mesh-drift1 8s ease-in-out infinite', top: '-10%', left: '-5%', opacity: 0.4 },
  { size: 120, color: 'var(--accent2)', animation: 'mesh-drift2 10s ease-in-out infinite', top: '25%', right: '-5%', opacity: 0.35 },
  { size: 110, color: 'var(--accent3)', animation: 'mesh-drift3 12s ease-in-out infinite', bottom: '-10%', left: '25%', opacity: 0.35 },
  { size: 100, color: '#ff6b35', animation: 'mesh-drift4 9s ease-in-out infinite', top: '40%', left: '5%', opacity: 0.3 },
];

function MeshgradientPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = MESH_KEYFRAMES;
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
            right: (blob as Record<string, unknown>).right as string | undefined,
            bottom: (blob as Record<string, unknown>).bottom as string | undefined,
            animation: prefersReduced ? 'none' : blob.animation,
            willChange: 'transform',
            mixBlendMode: 'screen',
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
          Mesh Gradient
        </span>
      </div>
    </div>
  );
}

export default memo(MeshgradientPreview);
