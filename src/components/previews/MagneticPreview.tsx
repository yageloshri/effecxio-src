'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

function MagneticPreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const btnRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number>(0);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 120;

      if (dist < radius) {
        const strength = 1 - dist / radius;
        targetRef.current = {
          x: dx * strength * 0.45,
          y: dy * strength * 0.45,
        };
      } else {
        targetRef.current = { x: 0, y: 0 };
      }
    },
    [prefersReduced],
  );

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    let running = true;
    const tick = () => {
      if (!running) return;
      const curr = currentRef.current;
      const tgt = targetRef.current;
      curr.x += (tgt.x - curr.x) * 0.12;
      curr.y += (tgt.y - curr.y) * 0.12;
      setOffset({ x: curr.x, y: curr.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [previewState]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      <button
        ref={btnRef}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          willChange: 'transform',
          padding: '14px 36px',
          borderRadius: 50,
          border: '2px solid var(--accent)',
          background: 'transparent',
          color: 'var(--accent)',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s ease',
          boxShadow:
            Math.abs(offset.x) > 2 || Math.abs(offset.y) > 2
              ? '0 0 24px rgba(200,245,59,0.25)'
              : 'none',
          letterSpacing: 1,
        }}
      >
        Magnetic
      </button>
    </div>
  );
}

export default memo(MagneticPreview);
