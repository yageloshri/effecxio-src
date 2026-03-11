'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CLOUD_KEYFRAMES = `
@keyframes cloud-float {
  0%   { transform: translateX(-120px); }
  100% { transform: translateX(calc(100% + 120px)); }
}
`;

const CLOUDS = [
  { width: 160, height: 55, top: '12%', duration: 25, delay: 0, opacity: 0.08 },
  { width: 130, height: 45, top: '32%', duration: 35, delay: -15, opacity: 0.06 },
  { width: 180, height: 60, top: '52%', duration: 30, delay: -8, opacity: 0.07 },
  { width: 110, height: 40, top: '70%', duration: 40, delay: -22, opacity: 0.05 },
  { width: 150, height: 50, top: '22%', duration: 32, delay: -18, opacity: 0.06 },
];

function CloudbgPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = CLOUD_KEYFRAMES;
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
        background: 'linear-gradient(180deg, #0a0e1a 0%, #0d1220 100%)',
      }}
    >
      {/* Moon */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '18%',
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #f0f0f0, #ccc)',
          boxShadow: '0 0 20px rgba(255,255,255,0.15), 0 0 50px rgba(200,245,59,0.03)',
        }}
      />

      {/* Clouds */}
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: cloud.width,
            height: cloud.height,
            top: cloud.top,
            left: 0,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08), transparent 70%)',
            filter: 'blur(20px)',
            opacity: cloud.opacity,
            animation: prefersReduced ? 'none' : `cloud-float ${cloud.duration}s linear infinite`,
            animationDelay: `${cloud.delay}s`,
            willChange: 'transform',
          }}
        />
      ))}

      {/* Label */}
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
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        >
          Clouds
        </span>
      </div>
    </div>
  );
}

export default memo(CloudbgPreview);
