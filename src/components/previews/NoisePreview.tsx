'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const NOISE_KEYFRAMES = `
@keyframes noise-shift {
  0% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(-10%, 5%); }
  30% { transform: translate(5%, -10%); }
  40% { transform: translate(-5%, 15%); }
  50% { transform: translate(-10%, 5%); }
  60% { transform: translate(15%, 0); }
  70% { transform: translate(0, 10%); }
  80% { transform: translate(-15%, 0); }
  90% { transform: translate(10%, 5%); }
  100% { transform: translate(5%, 0); }
}

@keyframes noise-glow {
  0%, 100% { box-shadow: 0 0 30px rgba(200,245,59,0.08), inset 0 0 30px rgba(200,245,59,0.03); }
  50% { box-shadow: 0 0 40px rgba(68,170,255,0.1), inset 0 0 40px rgba(68,170,255,0.04); }
}
`;

function NoisePreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = NOISE_KEYFRAMES;
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
          width: '80%',
          maxWidth: 280,
          padding: '28px 24px',
          borderRadius: 16,
          background: 'rgba(17,17,17,0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
          animation: prefersReduced ? 'none' : 'noise-glow 6s ease-in-out infinite',
        }}
      >
        {/* SVG noise overlay */}
        <div
          style={{
            position: 'absolute',
            inset: -20,
            opacity: 0.12,
            pointerEvents: 'none',
            animation: prefersReduced ? 'none' : 'noise-shift 0.5s steps(5) infinite',
            willChange: 'transform',
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-filter)" />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: 'var(--accent)',
              marginBottom: 8,
            }}
          >
            Glass Card
          </div>
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: 'var(--text)',
              opacity: 0.8,
            }}
          >
            Noise texture overlay with backdrop blur for frosted glass.
          </div>
          <div
            style={{
              marginTop: 14,
              display: 'flex',
              gap: 8,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 20,
                background: 'rgba(200,245,59,0.1)',
                color: 'var(--accent)',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              SVG Filter
            </span>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 20,
                background: 'rgba(68,170,255,0.1)',
                color: 'var(--accent3)',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              Backdrop Blur
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(NoisePreview);
