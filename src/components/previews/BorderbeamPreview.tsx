'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const BEAM_KEYFRAMES = `
@property --preview-beam-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes preview-beam-rotate {
  to { --preview-beam-angle: 360deg; }
}
`;

function BorderbeamPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = BEAM_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const animStyle = prefersReduced ? 'none' : 'preview-beam-rotate 2.5s linear infinite';

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
          padding: '14px 40px',
          borderRadius: 12,
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          isolation: 'isolate' as const,
        }}
      >
        {/* Beam border */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 12,
            padding: 2,
            background: `conic-gradient(from var(--preview-beam-angle, 0deg), transparent 0%, transparent 70%, var(--accent) 78%, var(--accent2) 85%, transparent 92%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude' as const,
            animation: animStyle,
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: 16,
            background: `conic-gradient(from var(--preview-beam-angle, 0deg), transparent 0%, transparent 72%, rgba(200,245,59,0.15) 80%, transparent 90%)`,
            filter: 'blur(8px)',
            zIndex: -1,
            animation: animStyle,
          }}
        />
        <span style={{ position: 'relative', zIndex: 1 }}>Border Beam</span>
      </div>
    </div>
  );
}

export default memo(BorderbeamPreview);
