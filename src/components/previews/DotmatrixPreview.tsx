'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// Preview simulates mouse — real version reacts to actual cursor
const DOT_KEYFRAMES = `
@keyframes dot-cursor-path {
  0%   { left: 20%; top: 30%; }
  25%  { left: 70%; top: 50%; }
  50%  { left: 50%; top: 70%; }
  75%  { left: 30%; top: 40%; }
  100% { left: 20%; top: 30%; }
}
`;

const GAP = 18;         /* space between dots */
const BASE_R = 1.5;     /* base dot radius */
const MAX_R = 5;        /* max radius when near cursor */
const INFLUENCE = 60;   /* cursor influence radius in px */

function DotmatrixPreview() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = DOT_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    const cursorEl = cursorRef.current;
    if (!el || !cursorEl || prefersReduced) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block;';
    el.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = el.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const w = () => canvas.width / dpr;
    const h = () => canvas.height / dpr;

    const computedStyle = getComputedStyle(el);
    const accentColor = computedStyle.getPropertyValue('--accent').trim() || '#c8f53b';

    const animate = () => {
      const width = w();
      const height = h();
      ctx.clearRect(0, 0, width, height);

      // Get simulated cursor position from the animated div
      const elRect = el.getBoundingClientRect();
      const cursorRect = cursorEl.getBoundingClientRect();
      const mx = cursorRect.left - elRect.left + cursorRect.width / 2;
      const my = cursorRect.top - elRect.top + cursorRect.height / 2;

      for (let x = GAP; x < width; x += GAP) {
        for (let y = GAP; y < height; y += GAP) {
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - dist / INFLUENCE); /* 0-1 proximity */
          const r = BASE_R + (MAX_R - BASE_R) * t;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = t > 0
            ? `${accentColor}${Math.round((0.3 + 0.7 * t) * 255).toString(16).padStart(2, '0')}`
            : 'rgba(85,85,85,0.3)';
          ctx.fill();
        }
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
        מטריצת נקודות
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
    >
      {/* Animated invisible cursor for preview simulation */}
      <div
        ref={cursorRef}
        style={{
          position: 'absolute',
          width: 4,
          height: 4,
          pointerEvents: 'none',
          animation: 'dot-cursor-path 6s ease-in-out infinite',
        }}
      />
    </div>
  );
}

export default memo(DotmatrixPreview);
