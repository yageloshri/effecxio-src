'use client';

import { memo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function SplitbuttonPreview() {
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const dur = prefersReduced ? '0s' : '0.4s';
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
          width: 180,
          height: 50,
          cursor: 'pointer',
        }}
      >
        {/* Top half */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '50%',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontWeight: 700,
            fontSize: 14,
            overflow: 'hidden',
            borderRadius: isHovered ? '10px' : '10px 10px 0 0',
            transition: `transform ${dur} ${bezier}, border-radius ${dur} ease`,
            transform: isHovered ? 'translateY(-8px) rotateX(-6deg)' : 'translateY(0)',
            clipPath: 'inset(0 0 0 0)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              transform: 'translateY(50%)',
              whiteSpace: 'nowrap',
            }}
          >
            Split Me
          </span>
        </div>
        {/* Bottom half */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '50%',
            top: '50%',
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontWeight: 700,
            fontSize: 14,
            overflow: 'hidden',
            borderRadius: isHovered ? '10px' : '0 0 10px 10px',
            transition: `transform ${dur} ${bezier}, border-radius ${dur} ease`,
            transform: isHovered ? 'translateY(8px) rotateX(6deg)' : 'translateY(0)',
            clipPath: 'inset(0 0 0 0)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 0,
              transform: 'translateY(-50%)',
              whiteSpace: 'nowrap',
            }}
          >
            Split Me
          </span>
        </div>
        {/* Reveal content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            fontSize: 12,
            fontWeight: 600,
            opacity: isHovered ? 1 : 0,
            transition: `opacity 0.3s ease ${isHovered ? '0.1s' : '0s'}`,
            pointerEvents: 'none',
          }}
        >
          Hidden!
        </div>
      </div>
    </div>
  );
}

export default memo(SplitbuttonPreview);
