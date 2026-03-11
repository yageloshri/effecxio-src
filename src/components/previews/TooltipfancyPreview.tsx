'use client';

import { memo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function TooltipfancyPreview() {
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const dur = prefersReduced ? '0s' : '0.25s';
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
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        {/* Trigger */}
        <button
          style={{
            padding: '10px 28px',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'inherit',
            color: 'var(--text)',
            background: 'var(--surface)',
            border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 10,
            cursor: 'pointer',
            transition: 'border-color 0.3s',
          }}
        >
          Hover
        </button>

        {/* Tooltip bubble */}
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 10px)',
            left: '50%',
            transform: `translateX(-50%) scale(${isHovered ? 1 : 0.85})`,
            padding: '8px 16px',
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            borderRadius: 8,
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? 'auto' : 'none',
            transition: `opacity ${dur} ease, transform ${dur} ${bezier}`,
            boxShadow: '0 6px 20px rgba(200,245,59,0.2)',
          }}
        >
          Fancy tooltip!
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid var(--accent)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(TooltipfancyPreview);
