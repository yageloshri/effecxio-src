'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const PIXEL_KEYFRAMES = `
@keyframes pixel-hue-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes pixel-auto-reveal {
  0%, 100% { opacity: 1; }
  40%, 60% { opacity: 0; }
}
`;

function PixelatePreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = PIXEL_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  /* Unique filter ID */
  const filterId = 'pixelate-filter-preview';

  const gradientBg = 'linear-gradient(135deg, #c8f53b, #44aaff, #ff3cac, #c8f53b)';

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
      {/* SVG pixelation filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feFlood x="4" y="4" width="2" height="2" />
            <feComposite width="10" height="10" />
            <feTile result="tiled" />
            <feComposite in="SourceGraphic" in2="tiled" operator="in" />
            <feMorphology operator="dilate" radius="5" />
          </filter>
        </defs>
      </svg>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '75%',
          maxWidth: 260,
          height: 150,
          borderRadius: 12,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Clear content underneath */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: gradientBg,
            backgroundSize: '200% 200%',
            animation: prefersReduced ? 'none' : 'pixel-hue-shift 6s ease infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#fff',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              letterSpacing: 2,
            }}
          >
            HOVER ME
          </span>
        </div>

        {/* Pixelated overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: gradientBg,
            backgroundSize: '200% 200%',
            animation: prefersReduced ? 'none' : 'pixel-hue-shift 6s ease infinite',
            filter: `url(#${filterId})`,
            transition: 'opacity 0.5s ease',
            opacity: isHovered ? 0 : 1,
          }}
        />

        {/* Hover hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            width: '100%',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 10,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          {isHovered ? '' : 'Hover to reveal'}
        </div>
      </div>
    </div>
  );
}

export default memo(PixelatePreview);
