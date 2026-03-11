'use client';
import { memo, useRef, useCallback, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

function ImagezoomPreview() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState('50% 50%');
  const [zoomed, setZoomed] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const s = document.createElement('style');
    s.textContent = `
      @keyframes izoom-pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 0.9; }
      }
    `;
    el.appendChild(s);
    styleRef.current = s;
    return () => { s.remove(); };
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setOrigin(`${x}% ${y}%`);
    },
    [prefersReduced]
  );

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
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => { setZoomed(false); setOrigin('50% 50%'); }}
        style={{
          width: 200,
          height: 150,
          borderRadius: 14,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'zoom-in',
          border: '1px solid var(--border)',
        }}
      >
        {/* Simulated image using gradient pattern */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `
              linear-gradient(135deg, var(--accent) 0%, var(--accent2) 33%, var(--accent3) 66%, var(--surface) 100%)
            `,
            backgroundSize: '200% 200%',
            transformOrigin: origin,
            transform: zoomed && !prefersReduced ? 'scale(2.2)' : 'scale(1)',
            transition: prefersReduced ? 'none' : 'transform 0.4s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {/* Decorative shapes to make zoom visible */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap', gap: 12, padding: 16, alignContent: 'center', justifyContent: 'center' }}>
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: i % 2 === 0 ? '50%' : 8,
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(4px)',
                }}
              />
            ))}
          </div>
        </div>
        {!zoomed && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.25)',
              animation: prefersReduced ? 'none' : 'izoom-pulse 2s ease infinite',
            }}
          >
            <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>
              רחף לזום
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ImagezoomPreview);
