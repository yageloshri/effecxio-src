'use client';

import { memo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const LAYERS = [
  { opacity: 0.15, tx: -12, ty: -12 },
  { opacity: 0.3, tx: -8, ty: -8 },
  { opacity: 0.5, tx: -4, ty: -4 },
];

function StackedtextPreview() {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        gap: 12,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          fontSize: 48,
          fontWeight: 900,
          cursor: 'pointer',
        }}
      >
        {/* Background layers */}
        {LAYERS.map((layer, i) => (
          <span
            key={i}
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: 'var(--accent)',
              opacity: layer.opacity,
              transition: 'transform 0.5s cubic-bezier(0.22,0.61,0.36,1)',
              transform:
                hovered && !prefersReduced
                  ? `translate(${layer.tx}px, ${layer.ty}px)`
                  : 'translate(0, 0)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            STACK
          </span>
        ))}
        {/* Front layer */}
        <span style={{ position: 'relative', color: 'var(--text)', zIndex: 4 }}>
          STACK
        </span>
      </div>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>
        רחף כדי לפרוס שכבות
      </span>
    </div>
  );
}

export default memo(StackedtextPreview);
