'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes staggerIn {
  0%, 10%  { opacity: 0; transform: translateY(14px) scale(0.9); }
  25%, 65% { opacity: 1; transform: translateY(0) scale(1); }
  80%, 100%{ opacity: 0; transform: translateY(-14px) scale(0.9); }
}
`;

const CARDS = [
  { icon: '\u2605', label: 'Design', color: 'var(--accent)' },
  { icon: '\u26A1', label: 'Speed', color: 'var(--accent2)' },
  { icon: '\u2699', label: 'Build', color: 'var(--accent3)' },
];

function ScrolltriggerPreview() {
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

  const dur = 3; /* seconds for full cycle */

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
        scroll trigger
      </div>

      {/* Staggered cards */}
      <div style={{ display: 'flex', gap: 12 }}>
        {CARDS.map((card, i) => (
          <div
            key={i}
            style={{
              width: 72,
              padding: '14px 8px',
              borderRadius: 10,
              background: `${card.color}10`,
              border: `1px solid ${card.color}25`,
              textAlign: 'center',
              animation: prefersReduced
                ? 'none'
                : `staggerIn ${dur}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              willChange: 'transform, opacity',
            }}
          >
            <div
              style={{
                fontSize: 18,
                marginBottom: 6,
              }}
            >
              {card.icon}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--text)',
                opacity: 0.8,
              }}
            >
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Trigger line indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: '15%',
          right: '15%',
          height: 1,
          background: 'var(--muted)',
          opacity: 0.2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 34,
          fontSize: 9,
          color: 'var(--muted)',
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        viewport trigger line
      </div>
    </div>
  );
}

export default memo(ScrolltriggerPreview);
