'use client';

import { memo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function FillText({ text }: { text: string }) {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        fontSize: 38,
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: '1.5px var(--muted)',
        cursor: 'pointer',
        display: 'inline-block',
      }}
    >
      {text}
      {/* Colored fill overlay clipped by inset */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          color: 'var(--accent)',
          WebkitTextStroke: '0px transparent',
          clipPath:
            hovered && !prefersReduced
              ? 'inset(0 0 0 0)'
              : 'inset(0 100% 0 0)',
          transition: 'clip-path 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
          pointerEvents: 'none',
        }}
      >
        {text}
      </span>
    </span>
  );
}

function TextfillhoverPreview() {
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
        gap: 16,
      }}
    >
      <FillText text="HOVER ME" />
      <FillText text="FILL" />
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>
        רחף מעל הטקסט
      </span>
    </div>
  );
}

export default memo(TextfillhoverPreview);
