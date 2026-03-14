'use client';

import { memo, useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CONFETTI_KEYFRAMES = `
@keyframes preview-confetti-fall {
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--cdx), var(--cdy)) rotate(var(--crot)) scale(0.3);
  }
}
`;

const COLORS = ['#c8f53b', '#f43f5e', '#fbbf24', '#34d399', '#60a5fa', '#f472b6'];

function ConfettibuttonPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = CONFETTI_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const handleHover = useCallback(
    () => {
      if (prefersReduced || !containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const PARTICLE_COUNT = 24; /* confetti particles per burst */

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const el = document.createElement('div');
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT;
        const velocity = 50 + Math.random() * 80; /* px travel distance */
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity - 30; /* bias upward */
        const rot = (Math.random() * 720 - 360) + 'deg';
        const size = 5 + Math.random() * 6;

        el.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${cx}px;
          top: ${cy}px;
          background: ${COLORS[i % COLORS.length]};
          border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
          pointer-events: none;
          z-index: 10;
          animation: preview-confetti-fall ${0.7 + Math.random() * 0.5}s ease-out forwards;
        `;
        el.style.setProperty('--cdx', dx + 'px');
        el.style.setProperty('--cdy', dy + 'px');
        el.style.setProperty('--crot', rot);

        container.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
      }
    },
    [prefersReduced],
  );

  return (
    <div
      ref={containerRef}
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
      <button
        onMouseEnter={handleHover}
        style={{
          position: 'relative',
          padding: '14px 40px',
          borderRadius: 14,
          border: 'none',
          background: 'var(--accent)',
          color: 'var(--bg)',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          zIndex: 1,
          letterSpacing: 1,
        }}
      >
        Confetti
      </button>
    </div>
  );
}

export default memo(ConfettibuttonPreview);
