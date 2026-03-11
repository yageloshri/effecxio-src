'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Star {
  x: number;
  y: number;
  radius: number;
  twinkleSpeed: number;
  phase: number;
}

const STAR_COUNT = 60;
const LINE_DIST = 55; /* max distance for constellation lines */

function ConstellationsPreview() {
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

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * 400,
      y: Math.random() * 240,
      radius: 0.4 + Math.random() * 1.2,
      twinkleSpeed: 0.01 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      /* Draw constellation lines first (behind stars) */
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            const alpha = (1 - dist / LINE_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(100,150,255,${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      /* Draw twinkling stars */
      for (const s of stars) {
        const brightness = 0.3 + 0.7 * Math.abs(Math.sin(frame * s.twinkleSpeed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${brightness})`;
        ctx.fill();
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
        כוכבים
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
        background: '#050510',
        position: 'relative',
      }}
    />
  );
}

export default memo(ConstellationsPreview);
