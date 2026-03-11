'use client';

import { memo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function MorphbuttonPreview() {
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const dur = prefersReduced ? '0s' : '0.5s';
  const bezier = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

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
          padding: isHovered ? '16px 48px' : '14px 40px',
          borderRadius: isHovered ? 8 : 50, /* pill to square morph */
          border: '2px solid var(--accent)',
          background: isHovered ? 'var(--accent)' : 'transparent',
          color: isHovered ? 'var(--bg)' : 'var(--accent)',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: `border-radius ${dur} ${bezier}, transform ${dur} ${bezier}, background 0.3s ease, color 0.3s ease, padding 0.4s ease, box-shadow 0.4s ease`,
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          boxShadow: isHovered
            ? '0 8px 40px rgba(200,245,59,0.2)'
            : '0 4px 20px rgba(200,245,59,0.08)',
          letterSpacing: isHovered ? 2 : 0.5,
          willChange: 'border-radius, transform',
        }}
      >
        Morph
      </button>
    </div>
  );
}

export default memo(MorphbuttonPreview);
