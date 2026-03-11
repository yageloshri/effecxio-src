'use client';
import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function StickyheaderPreview() {
  const prefersReduced = useReducedMotion();
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const dirRef = useRef(1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const speed = 0.5;
    const maxOffset = 60; /* max simulated scroll distance */
    const threshold = 30; /* when header shrinks */

    const animate = () => {
      offsetRef.current += speed * dirRef.current;

      if (offsetRef.current >= maxOffset) dirRef.current = -1;
      if (offsetRef.current <= 0) dirRef.current = 1;

      setScrolled(offsetRef.current > threshold);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced]);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Simulated header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '8px 16px' : '16px 16px',
          background: scrolled ? 'var(--surface)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: prefersReduced ? 'none' : 'all 0.3s ease',
        }}
      >
        <span
          style={{
            fontSize: scrolled ? 12 : 15,
            fontWeight: 800,
            color: 'var(--text)',
            transition: prefersReduced ? 'none' : 'font-size 0.3s ease',
          }}
        >
          MySite
        </span>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Home', 'About'].map((l) => (
            <span
              key={l}
              style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 500 }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Simulated page content that scrolls */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transform: `translateY(-${offsetRef.current}px)`,
          paddingTop: 60,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: 'var(--text)',
            opacity: 0.5,
          }}
        >
          Hero Section
        </div>
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            style={{
              width: '70%',
              height: 8,
              borderRadius: 4,
              background: 'var(--surface)',
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 2,
          color: 'var(--muted)',
          fontWeight: 700,
        }}
      >
        sticky header
      </div>
    </div>
  );
}

export default memo(StickyheaderPreview);
