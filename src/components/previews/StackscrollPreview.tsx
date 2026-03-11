'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const STACK_COLORS = ['var(--accent)', 'var(--accent2)', 'var(--accent3)', 'var(--muted)'];

function StackscrollPreview() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const s = document.createElement('style');
    /* Each card slides up, shrinks, and fades while the next card enters */
    s.textContent = `
      @keyframes stackscroll-cycle {
        0%   { transform: translateY(0)   scale(1);   opacity: 1; }
        20%  { transform: translateY(-8px) scale(0.95); opacity: 0.7; }
        25%  { transform: translateY(-8px) scale(0.95); opacity: 0.7; }
        45%  { transform: translateY(-16px) scale(0.90); opacity: 0.4; }
        50%  { transform: translateY(-16px) scale(0.90); opacity: 0.4; }
        70%  { transform: translateY(-24px) scale(0.85); opacity: 0.1; }
        75%  { transform: translateY(100px) scale(1); opacity: 0; }
        90%  { transform: translateY(0) scale(1); opacity: 0.3; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
    `;
    el.appendChild(s);
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
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ position: 'relative', width: 180, height: 130 }}>
        {STACK_COLORS.map((color, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 14,
              background: `linear-gradient(145deg, ${color}, var(--surface))`,
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              /* Stagger: each card starts its cycle at a different offset */
              animation: prefersReduced
                ? 'none'
                : `stackscroll-cycle 6s ${i * 1.5}s ease infinite`,
              zIndex: STACK_COLORS.length - i,
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', opacity: 0.6 }}>
              {i + 1}
            </span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>כרטיס בגלילה</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(StackscrollPreview);
