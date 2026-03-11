'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const HOLO_KEYFRAMES = `
@keyframes holo-shift {
  0%   { background-position: 0% 50%; }
  25%  { background-position: 100% 0%; }
  50%  { background-position: 100% 100%; }
  75%  { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}
`;

function HolographicPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = HOLO_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const shimmer = shimmerRef.current;
    if (!card || !shimmer || prefersReduced) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      shimmer.style.backgroundPosition = `${x}% ${y}%`;
      shimmer.style.opacity = '1';
    };

    const handleLeave = () => {
      shimmer.style.opacity = '0';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);

    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [prefersReduced]);

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
        ref={cardRef}
        style={{
          position: 'relative',
          width: '80%',
          maxWidth: 280,
          height: 140,
          borderRadius: 14,
          overflow: 'hidden',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          cursor: 'pointer',
        }}
      >
        {/* Holographic shimmer layer */}
        <div
          ref={shimmerRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255,0,0,0.15), rgba(255,165,0,0.15), rgba(255,255,0,0.15), rgba(0,255,0,0.15), rgba(0,255,255,0.15), rgba(0,0,255,0.15), rgba(128,0,255,0.15))',
            backgroundSize: '300% 300%',
            mixBlendMode: 'color-dodge',
            opacity: 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
            animation: prefersReduced ? 'none' : 'holo-shift 6s ease infinite',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '20px 20px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: 4,
            }}
          >
            Holographic Card
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              lineHeight: 1.4,
            }}
          >
            Hover to see the shimmer effect
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HolographicPreview);
