'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const LIQUID_KEYFRAMES = `
@keyframes liquidbg-gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}
@keyframes liquidbg-drift-a {
  0% { transform: translate(0, 0); }
  100% { transform: translate(30px, 20px); }
}
@keyframes liquidbg-drift-b {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-25px, -15px); }
}
`;

function LiquidbgPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = LIQUID_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  /* Unique filter ID to avoid clashes with other SVG filters on page */
  const filterId = 'liquidbg-turb-preview';

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
      {/* SVG filter definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018"
              numOctaves={3}
              seed={1}
              result="noise"
            >
              {!prefersReduced && (
                <animate
                  attributeName="seed"
                  from="1"
                  to="80"
                  dur="8s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={30}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Liquid background layer */}
      <div
        style={{
          position: 'absolute',
          inset: -15, /* overflow hides edge artifacts */
          background: 'linear-gradient(135deg, #0a1628, #1a0a28, #0a2818, #1a1a0a)',
          backgroundSize: '400% 400%',
          animation: prefersReduced ? 'none' : 'liquidbg-gradient-shift 10s ease infinite',
          filter: `url(#${filterId})`,
        }}
      />

      {/* Color blobs that also get distorted */}
      <div
        style={{
          position: 'absolute',
          width: 120,
          height: 120,
          top: '15%',
          left: '15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(68,170,255,0.25), transparent 70%)',
          filter: `url(#${filterId})`,
          animation: prefersReduced ? 'none' : 'liquidbg-drift-a 8s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          bottom: '15%',
          right: '15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,60,172,0.25), transparent 70%)',
          filter: `url(#${filterId})`,
          animation: prefersReduced ? 'none' : 'liquidbg-drift-b 10s ease-in-out infinite alternate',
        }}
      />

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
            opacity: 0.5,
            pointerEvents: 'none',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          Liquid
        </span>
      </div>
    </div>
  );
}

export default memo(LiquidbgPreview);
