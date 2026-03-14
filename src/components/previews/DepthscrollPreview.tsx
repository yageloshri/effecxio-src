'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const LAYERS = [
  /* far: slow, large, faint */
  { speed: 0.15, shapes: [
    { x: '10%', y: '15%', size: 60, color: 'var(--accent)', opacity: 0.08 },
    { x: '70%', y: '60%', size: 50, color: 'var(--accent)', opacity: 0.06 },
  ]},
  /* mid: medium speed */
  { speed: 0.35, shapes: [
    { x: '40%', y: '25%', size: 35, color: 'var(--accent2)', opacity: 0.1 },
    { x: '15%', y: '65%', size: 40, color: 'var(--accent2)', opacity: 0.08 },
    { x: '75%', y: '35%', size: 25, color: 'var(--accent2)', opacity: 0.12 },
  ]},
  /* near: fast, small, more visible */
  { speed: 0.6, shapes: [
    { x: '60%', y: '20%', size: 18, color: 'var(--accent3)', opacity: 0.14 },
    { x: '25%', y: '50%', size: 22, color: 'var(--accent3)', opacity: 0.12 },
  ]},
];

function DepthscrollPreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const dirRef = useRef(1);

  useEffect(() => {
    if (prefersReduced) return;
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const speed = 0.5;
    const maxOffset = 40;

    const animate = () => {
      offsetRef.current += speed * dirRef.current;

      if (offsetRef.current >= maxOffset) dirRef.current = -1;
      if (offsetRef.current <= -maxOffset) dirRef.current = 1;

      LAYERS.forEach((layer, i) => {
        const el = layerRefs.current[i];
        if (el) {
          const y = -offsetRef.current * layer.speed;
          el.style.transform = `translateY(${y}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced, previewState]);

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
      {/* Depth layers */}
      {LAYERS.map((layer, li) => (
        <div
          key={li}
          ref={(el) => { layerRefs.current[li] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        >
          {layer.shapes.map((s, si) => (
            <div
              key={si}
              style={{
                position: 'absolute',
                left: s.x,
                top: s.y,
                width: s.size,
                height: s.size,
                borderRadius: '50%',
                background: s.color,
                opacity: s.opacity,
              }}
            />
          ))}
        </div>
      ))}

      {/* Center label */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: 'var(--text)',
            opacity: 0.7,
            marginBottom: 4,
          }}
        >
          Depth Scroll
        </div>
        <div
          style={{
            fontSize: 10,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontWeight: 600,
          }}
        >
          3 layers &middot; 3 speeds
        </div>
      </div>
    </div>
  );
}

export default memo(DepthscrollPreview);
