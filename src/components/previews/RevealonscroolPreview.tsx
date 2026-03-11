'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const ITEMS = [
  { label: 'Design', color: 'var(--accent)' },
  { label: 'Build', color: 'var(--accent2)' },
  { label: 'Ship', color: 'var(--accent3)' },
];

const KEYFRAMES = `
@keyframes revealCycle {
  0%, 5%   { opacity: 0; transform: translateY(16px); }
  15%, 40% { opacity: 1; transform: translateY(0); }
  55%, 100%{ opacity: 0; transform: translateY(-16px); }
}
`;

function RevealonscroolPreview() {
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

  const duration = 4; /* seconds for full cycle */

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
        position: 'relative',
      }}
    >
      {/* Label */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 2,
          color: 'var(--muted)',
          fontWeight: 700,
        }}
      >
        reveal on scroll
      </div>

      {ITEMS.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 20px',
            borderRadius: 10,
            background: `${item.color}10`,
            border: `1px solid ${item.color}30`,
            animation: prefersReduced
              ? 'none'
              : `revealCycle ${duration}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: item.color,
              boxShadow: `0 0 6px ${item.color}`,
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--text)',
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default memo(RevealonscroolPreview);
