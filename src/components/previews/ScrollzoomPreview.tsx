'use client';
import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function ScrollzoomPreview() {
  const prefersReduced = useReducedMotion();
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);
  const dirRef = useRef(1);
  const [scale, setScale] = useState(0.6);
  const [opacity, setOpacity] = useState(0.3);

  useEffect(() => {
    if (prefersReduced) return;

    const speed = 0.005;

    const animate = () => {
      tRef.current += speed * dirRef.current;

      if (tRef.current >= 1) dirRef.current = -1;
      if (tRef.current <= 0) dirRef.current = 1;

      const t = tRef.current;
      /* Scale: 0.6 → 1.0 */
      setScale(0.6 + 0.4 * t);
      /* Opacity: 0.3 → 1.0 */
      setOpacity(0.3 + 0.7 * t);

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
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Zoom element */}
      <div
        style={{
          width: 140,
          padding: '20px 16px',
          borderRadius: 14,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          textAlign: 'center',
          transform: `scale(${scale.toFixed(3)})`,
          opacity: opacity.toFixed(3),
          willChange: 'transform, opacity',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'var(--accent)',
            opacity: 0.2,
            margin: '0 auto 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              background: 'var(--accent)',
              opacity: 0.6,
            }}
          />
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: 4,
          }}
        >
          Zoom In
        </div>
        <div
          style={{
            fontSize: 10,
            color: 'var(--muted)',
          }}
        >
          scroll-driven
        </div>
      </div>

      {/* Scale label */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          fontSize: 10,
          fontWeight: 700,
          color: 'var(--accent)',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: 1,
        }}
      >
        scale({scale.toFixed(2)})
      </div>
    </div>
  );
}

export default memo(ScrollzoomPreview);
