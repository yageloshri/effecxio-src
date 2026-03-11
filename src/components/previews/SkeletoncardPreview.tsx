'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

function SkeletoncardPreview() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const s = document.createElement('style');
    s.textContent = `
      @keyframes skel-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;
    el.appendChild(s);
    return () => { s.remove(); };
  }, []);

  const shimmerBg: React.CSSProperties = {
    background: prefersReduced
      ? 'var(--border)'
      : 'linear-gradient(90deg, var(--border) 25%, var(--surface) 50%, var(--border) 75%)',
    backgroundSize: '200% 100%',
    animation: prefersReduced ? 'none' : 'skel-shimmer 1.8s ease infinite',
    borderRadius: 6,
  };

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
        gap: 16,
      }}
    >
      {/* Skeleton card 1 */}
      <div
        style={{
          width: 140,
          padding: 14,
          borderRadius: 14,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {/* Avatar row */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ ...shimmerBg, width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ ...shimmerBg, width: '80%', height: 10 }} />
            <div style={{ ...shimmerBg, width: '50%', height: 8 }} />
          </div>
        </div>
        {/* Image placeholder */}
        <div style={{ ...shimmerBg, width: '100%', height: 60 }} />
        {/* Text lines */}
        <div style={{ ...shimmerBg, width: '100%', height: 8 }} />
        <div style={{ ...shimmerBg, width: '65%', height: 8 }} />
      </div>

      {/* Skeleton card 2 - smaller */}
      <div
        style={{
          width: 110,
          padding: 12,
          borderRadius: 14,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ ...shimmerBg, width: '100%', height: 50 }} />
        <div style={{ ...shimmerBg, width: '100%', height: 8 }} />
        <div style={{ ...shimmerBg, width: '75%', height: 8 }} />
        <div style={{ ...shimmerBg, width: '40%', height: 8 }} />
      </div>
    </div>
  );
}

export default memo(SkeletoncardPreview);
