'use client';
import { memo, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CARDS = [
  {
    gradient: 'linear-gradient(135deg, var(--accent), var(--accent3))',
    label: 'A',
  },
  {
    gradient: 'linear-gradient(135deg, var(--accent2), var(--accent))',
    label: 'B',
  },
  {
    gradient: 'linear-gradient(135deg, var(--accent3), var(--accent2))',
    label: 'C',
  },
];

function ImageparallaxPreview() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const s = document.createElement('style');
    s.textContent = `
      @keyframes imgparallax-float {
        0%, 100% { transform: translateY(8px); }
        50% { transform: translateY(-8px); }
      }
    `;
    el.appendChild(s);
    styleRef.current = s;
    return () => { s.remove(); };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {CARDS.map((card, i) => (
        <div
          key={i}
          style={{
            width: 80,
            height: 110,
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}
        >
          {/* Inner "image" that moves opposite */}
          <div
            style={{
              position: 'absolute',
              inset: -12, /* extra space for movement */
              background: card.gradient,
              animation: prefersReduced
                ? 'none'
                : `imgparallax-float ${3 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${i * -0.6}s`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: 'rgba(0,0,0,0.2)',
              }}
            >
              {card.label}
            </span>
          </div>
        </div>
      ))}
      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 11,
          color: 'var(--muted)',
        }}
      >
        פרלקס תמונה
      </motion.div>
    </div>
  );
}

export default memo(ImageparallaxPreview);
