'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Drop {
  x: number;
  y: number;
  speed: number;
  len: number;
  opacity: number;
}

interface Splash {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const DROP_COUNT = 80;    /* fewer drops for small preview canvas */
const SPLASH_LIFE = 10;   /* frames a splash lives */

function RaindropPreview() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReduced) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block;';
    el.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W: number, H: number;

    const resize = () => {
      const rect = el.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const drops: Drop[] = Array.from({ length: DROP_COUNT }, () => ({
      x: Math.random() * 400,
      y: Math.random() * -300,
      speed: 3 + Math.random() * 4,
      len: 8 + Math.random() * 12,
      opacity: 0.15 + Math.random() * 0.35,
    }));

    const splashes: Splash[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      /* Draw drops */
      for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + 0.3, d.y + d.len);
        ctx.strokeStyle = `rgba(170,210,255,${d.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        d.y += d.speed;
        if (d.y > H) {
          for (let i = 0; i < 2; i++) {
            splashes.push({
              x: d.x,
              y: H,
              vx: (Math.random() - 0.5) * 1.5,
              vy: -0.8 - Math.random() * 1.5,
              life: SPLASH_LIFE,
            });
          }
          d.y = Math.random() * -100;
          d.x = Math.random() * W;
        }
      }

      /* Draw splashes */
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        const alpha = (s.life / SPLASH_LIFE) * 0.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(170,210,255,${alpha})`;
        ctx.fill();
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.12; /* gravity */
        s.life--;
        if (s.life <= 0) splashes.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const observer = new ResizeObserver(resize);
    observer.observe(el);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      canvas.remove();
    };
  }, [prefersReduced]);

  if (prefersReduced) {
    return (
      <div
        style={{
          width: '100%',
          height: 220,
          background: 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
          fontSize: 14,
        }}
      >
        טיפות גשם
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 220,
        overflow: 'hidden',
        background: '#080a10',
        position: 'relative',
      }}
    />
  );
}

export default memo(RaindropPreview);
