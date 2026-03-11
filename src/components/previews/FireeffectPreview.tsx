'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface FireParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  decay: number;
}

const PARTICLE_COUNT = 60; /* fewer particles for small preview */

function FireeffectPreview() {
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

    function createParticle(): FireParticle {
      return {
        x: W / 2 + (Math.random() - 0.5) * 60,  /* spread from center */
        y: H,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -1.5 - Math.random() * 2.5,           /* upward speed */
        radius: 2 + Math.random() * 4,
        life: 1.0,
        decay: 0.01 + Math.random() * 0.02,
      };
    }

    const particles: FireParticle[] = Array.from({ length: PARTICLE_COUNT }, createParticle);

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        /* Color: white -> yellow -> orange -> red -> transparent */
        const r = 255;
        const g = Math.round(200 * p.life);
        const b = Math.round(50 * p.life * p.life);
        const a = p.life;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.shadowColor = `rgba(255,${g},0,${a * 0.4})`;
        ctx.shadowBlur = 10; /* glow effect */
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx + (Math.random() - 0.5) * 0.4; /* wobble */
        p.y += p.vy;
        p.vy *= 0.99;
        p.life -= p.decay;

        if (p.life <= 0) Object.assign(p, createParticle());
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
        אפקט אש
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
        background: 'var(--bg)',
        position: 'relative',
      }}
    />
  );
}

export default memo(FireeffectPreview);
