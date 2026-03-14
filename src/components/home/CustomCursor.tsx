'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setVisible(true);
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      target.current = { x: -100, y: -100 };
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    let rafId = 0;
    const lerp = 0.15;

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Scale up over interactive elements
    const scaleUp = () => {
      if (dotRef.current) dotRef.current.style.width = dotRef.current.style.height = '18px';
    };
    const scaleDown = () => {
      if (dotRef.current) dotRef.current.style.width = dotRef.current.style.height = '12px';
    };

    const handleOver = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.matches('a, button, [role="button"], input, textarea, [data-cursor-hover]')) {
        scaleUp();
      }
    };
    const handleOut = () => scaleDown();

    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.documentElement.style.cursor = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: 'var(--accent)',
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'width 0.2s, height 0.2s',
        mixBlendMode: 'difference',
        willChange: 'transform',
      }}
    />
  );
}
