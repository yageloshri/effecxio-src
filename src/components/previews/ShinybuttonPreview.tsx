'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const SHINE_KEYFRAMES = `
@keyframes preview-shine-sweep {
  from { left: -100%; }
  to   { left: 130%; }
}
`;

function ShinybuttonPreview() {
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = SHINE_KEYFRAMES;
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
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          padding: '14px 44px',
          borderRadius: 12,
          border: 'none',
          background: 'var(--accent)',
          color: 'var(--bg)',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'transform 0.2s ease, box-shadow 0.3s ease',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 8px 30px rgba(200,245,59,0.25)' : 'none',
          letterSpacing: 1,
        }}
      >
        {/* Shine band */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '60%',
            height: '100%',
            background:
              'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 70%, transparent 100%)',
            pointerEvents: 'none',
            animation:
              isHovered && !prefersReduced
                ? 'preview-shine-sweep 0.7s ease-out forwards'
                : 'none',
          }}
        />
        <span style={{ position: 'relative', zIndex: 1 }}>Shiny</span>
      </button>
    </div>
  );
}

export default memo(ShinybuttonPreview);
