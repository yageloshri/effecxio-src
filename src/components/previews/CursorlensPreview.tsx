'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes cursorlens-move {
  0%   { left: 25%; top: 40%; }
  20%  { left: 50%; top: 30%; }
  40%  { left: 70%; top: 50%; }
  60%  { left: 55%; top: 70%; }
  80%  { left: 30%; top: 60%; }
  100% { left: 25%; top: 40%; }
}
`;

function CursorlensPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = KEYFRAMES;
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
        position: 'relative',
      }}
    >
      {/* Background text content to be "magnified" */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text)',
            opacity: 0.3,
            letterSpacing: 2,
          }}
        >
          LENS EFFECT
        </div>
        {/* Small grid to demonstrate magnification */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 20px)',
            gap: 4,
          }}
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                background: i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? 'var(--accent2)' : 'var(--accent3)',
                opacity: 0.15,
              }}
            />
          ))}
        </div>
        <div
          style={{
            fontSize: 10,
            color: 'var(--muted)',
            opacity: 0.4,
            marginTop: 4,
          }}
        >
          Tiny text to magnify
        </div>
      </div>

      {/* Lens circle following cursor path */}
      <div
        style={{
          position: 'absolute',
          width: 70,
          height: 70,
          borderRadius: '50%',
          border: '2px solid var(--accent)',
          opacity: 0.6,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          animation: prefersReduced ? 'none' : 'cursorlens-move 7s ease-in-out infinite',
          willChange: 'left, top',
          zIndex: 10,
          boxShadow: '0 0 20px rgba(200,245,59,0.1), inset 0 0 30px rgba(200,245,59,0.05)',
          backdropFilter: 'blur(1px)',
        }}
      >
        {/* Inner zoom indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: -18,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 9,
            color: 'var(--accent)',
            opacity: 0.7,
            whiteSpace: 'nowrap',
          }}
        >
          2x
        </div>
      </div>

      <span
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 12,
          color: 'var(--muted)',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        Cursor Lens
      </span>
    </div>
  );
}

export default memo(CursorlensPreview);
