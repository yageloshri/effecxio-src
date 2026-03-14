'use client';
import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const COLORS = [
  [10, 10, 26],   /* deep blue */
  [30, 15, 60],   /* purple */
  [60, 10, 50],   /* magenta */
  [10, 40, 50],   /* teal */
  [10, 10, 26],   /* loop back to start */
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getColor(t: number): string {
  const segment = Math.min(Math.floor(t * (COLORS.length - 1)), COLORS.length - 2);
  const local = t * (COLORS.length - 1) - segment;
  const c1 = COLORS[segment];
  const c2 = COLORS[segment + 1];
  const r = Math.round(lerp(c1[0], c2[0], local));
  const g = Math.round(lerp(c1[1], c2[1], local));
  const b = Math.round(lerp(c1[2], c2[2], local));
  return `rgb(${r},${g},${b})`;
}

function ScrollcolorPreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);
  const dirRef = useRef(1);
  const [bg, setBg] = useState(getColor(0));

  useEffect(() => {
    if (prefersReduced) return;
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const speed = 0.002;

    const animate = () => {
      tRef.current += speed * dirRef.current;

      if (tRef.current >= 1) dirRef.current = -1;
      if (tRef.current <= 0) dirRef.current = 1;

      setBg(getColor(tRef.current));
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
        background: bg,
        overflow: 'hidden',
        position: 'relative',
        transition: prefersReduced ? 'none' : 'background 0.05s linear',
      }}
    >
      {/* Central label */}
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#fff',
            opacity: 0.9,
            marginBottom: 4,
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          Color Shift
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#fff',
            opacity: 0.5,
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontWeight: 600,
          }}
        >
          scroll-linked
        </div>
      </div>

      {/* Color dots indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          display: 'flex',
          gap: 8,
        }}
      >
        {COLORS.slice(0, -1).map((c, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: `rgb(${c[0]},${c[1]},${c[2]})`,
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(ScrollcolorPreview);
