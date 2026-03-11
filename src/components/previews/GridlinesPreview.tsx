'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const GRID_KEYFRAMES = `
@keyframes grid-scroll-anim {
  0% { background-position: 0 0; }
  100% { background-position: 0 40px; }
}
`;

function GridlinesPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = GRID_KEYFRAMES;
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
        perspective: 400, /* depth of 3D effect */
      }}
    >
      {/* Grid plane */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-50%',
          width: '200%',
          height: '65%',
          transform: 'rotateX(60deg)', /* tilt toward viewer */
          transformOrigin: 'center bottom',
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(200,245,59,0.15) 0px, transparent 1px, transparent 40px),' +
            'repeating-linear-gradient(0deg, rgba(200,245,59,0.15) 0px, transparent 1px, transparent 40px)',
          backgroundSize: '40px 40px', /* grid cell size */
          animation: prefersReduced ? 'none' : 'grid-scroll-anim 2s linear infinite',
        }}
      />

      {/* Horizon glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '35%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          height: 60,
          background: 'radial-gradient(ellipse, rgba(200,245,59,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          width: '100%',
          textAlign: 'center',
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
            textShadow: '0 0 20px rgba(200,245,59,0.2)',
          }}
        >
          Grid Lines
        </span>
      </div>
    </div>
  );
}

export default memo(GridlinesPreview);
