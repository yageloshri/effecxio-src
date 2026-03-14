'use client';
import { memo, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const TRAIL_LENGTH = 12;

const TrailPreview = memo(function TrailPreview() {
  const shouldReduceMotion = useReducedMotion();
  const previewState = usePreviewState();
  const containerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const mouseRef = useRef({ x: 110, y: 110 });
  const rafRef = useRef<number>(0);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldReduceMotion) return;

    // Create trail dots
    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const dot = document.createElement('div');
      const size = Math.max(6, 24 - i * 1.5);
      const opacity = 1 - i * 0.07;
      const hueShift = i * 15;
      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        pointer-events: none;
        transition: none;
        opacity: ${opacity};
        filter: hue-rotate(${hueShift}deg);
        background: ${i === 0 ? 'var(--accent)' : i < 4 ? 'var(--accent2)' : 'var(--accent3)'};
        box-shadow: 0 0 ${8 - i * 0.5}px ${i === 0 ? 'var(--accent)' : i < 4 ? 'var(--accent2)' : 'var(--accent3)'};
        transform: translate(-50%, -50%);
        z-index: ${TRAIL_LENGTH - i};
      `;
      el.appendChild(dot);
      dots.push(dot);
    }
    dotsRef.current = dots;

    // Initialize trail positions
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      trailRef.current[i] = { x: 110, y: 110 };
    }

    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return () => {
        dots.forEach((dot) => dot.remove());
      };
    }

    const animate = () => {
      const trail = trailRef.current;
      const mouse = mouseRef.current;

      // First point follows mouse with easing
      trail[0].x += (mouse.x - trail[0].x) * 0.3;
      trail[0].y += (mouse.y - trail[0].y) * 0.3;

      // Each subsequent point follows the one before it
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const ease = 0.25 - i * 0.01;
        trail[i].x += (trail[i - 1].x - trail[i].x) * Math.max(0.05, ease);
        trail[i].y += (trail[i - 1].y - trail[i].y) * Math.max(0.05, ease);
      }

      // Update DOM positions
      for (let i = 0; i < dots.length; i++) {
        dots[i].style.left = `${trail[i].x}px`;
        dots[i].style.top = `${trail[i].y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      dots.forEach((dot) => dot.remove());
    };
  }, [shouldReduceMotion, previewState]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  if (shouldReduceMotion) {
    return (
      <div
        style={{
          width: '100%',
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--surface)',
          borderRadius: 12,
          overflow: 'hidden',
          color: 'var(--muted)',
          fontSize: 14,
        }}
      >
        אפקט עקיבה
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        width: '100%',
        height: 220,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        background: 'var(--surface)',
        cursor: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
          fontSize: 13,
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      >
        הזז את העכבר
      </div>
    </div>
  );
});

export default TrailPreview;
