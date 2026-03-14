'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const LAYERS = [
  { speed: 0.02, width: 140, height: 60, radius: 12, color: 'var(--accent)', opacity: 0.25, y: 20 },
  { speed: 0.05, width: 110, height: 50, radius: 10, color: 'var(--accent2)', opacity: 0.35, y: 0 },
  { speed: 0.1, width: 80, height: 40, radius: 8, color: 'var(--accent3)', opacity: 0.55, y: -20 },
];

function ParallaxPreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRef.current = { x, y };
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
      curr.x += (tgt.x - curr.x) * 0.08;
      curr.y += (tgt.y - curr.y) * 0.08;
      setSmoothMouse({ x: curr.x, y: curr.y });
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
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: 220,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        cursor: 'crosshair',
      }}
    >
      {LAYERS.map((layer, i) => {
        const offsetX = smoothMouse.x * layer.speed * 500;
        const offsetY = smoothMouse.y * layer.speed * 500;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: layer.width,
              height: layer.height,
              borderRadius: layer.radius,
              background: layer.color,
              opacity: layer.opacity,
              transform: `translate(${offsetX}px, ${layer.y + offsetY}px)`,
              transition: prefersReduced ? 'none' : undefined,
              willChange: 'transform',
              border: `1px solid ${layer.color}`,
            }}
          />
        );
      })}

      <span
        style={{
          position: 'relative',
          zIndex: 10,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--text)',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      >
        Parallax
      </span>
    </div>
  );
}

export default memo(ParallaxPreview);
