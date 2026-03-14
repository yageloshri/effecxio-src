'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

/* Trail point coordinates along a figure-8 path */
function getFigure8(t: number, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const rx = w * 0.3;  /* horizontal radius */
  const ry = h * 0.3;  /* vertical radius */
  return {
    x: cx + rx * Math.sin(t),
    y: cy + ry * Math.sin(t * 2),
  };
}

function CursortrailcolorPreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 320;
    const H = 180;
    canvas.width = W;
    canvas.height = H;

    const TRAIL_COUNT = 30;   /* number of trail dots */
    let hue = 0;
    let time = 0;
    const trail: { x: number; y: number; hue: number; alpha: number }[] = [];

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      time += 0.025;  /* speed of figure-8 traversal */
      hue = (hue + 2) % 360;

      const pos = getFigure8(time, W, H);
      trail.push({ x: pos.x, y: pos.y, hue, alpha: 1 });
      if (trail.length > TRAIL_COUNT) trail.shift();

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const progress = i / trail.length;
        const radius = 2 + progress * 7;  /* grow from 2 to 9 */
        p.alpha -= 0.02;
        if (p.alpha <= 0) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReduced, previewState]);

  if (prefersReduced) {
    return (
      <div
        style={{
          width: '100%',
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg)',
          color: 'var(--muted)',
          fontSize: 14,
        }}
      >
        שובל צבעוני
      </div>
    );
  }

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
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 12,
          color: 'var(--muted)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      >
        Color Trail
      </span>
    </div>
  );
}

export default memo(CursortrailcolorPreview);
