'use client';

import { memo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function HoverrevealPreview() {
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
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: 200,
          height: 140,
          borderRadius: 14,
          overflow: 'hidden',
          cursor: 'pointer',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
      >
        {/* Front content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            color: 'var(--text)',
            transition: `opacity 0.4s ease, transform 0.4s ease`,
            opacity: isHovered ? 0 : 1,
            transform: isHovered ? 'translateY(-16px)' : 'translateY(0)',
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: 28 }}>&#9650;</div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Hover me</div>
        </div>

        {/* Back content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: 16,
            color: 'var(--text)',
            background: 'var(--accent)',
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            transition: `transform ${dur} ${bezier}`,
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--bg)',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Hidden content revealed on hover
          </div>
          <div
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              background: 'rgba(0,0,0,0.2)',
              color: 'var(--bg)',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            CTA
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HoverrevealPreview);
