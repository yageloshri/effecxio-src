'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'ghost';
}

export default function MagneticButton({ children, href, variant = 'primary' }: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const rafRef = useRef<number>(0);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 120;

      if (dist < radius) {
        const strength = 1 - dist / radius;
        targetRef.current = { x: dx * strength * 0.3, y: dy * strength * 0.3 };
      } else {
        targetRef.current = { x: 0, y: 0 };
      }
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      const curr = currentRef.current;
      const tgt = targetRef.current;
      curr.x += (tgt.x - curr.x) * 0.12;
      curr.y += (tgt.y - curr.y) * 0.12;
      setOffset({ x: curr.x, y: curr.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isPrimary = variant === 'primary';

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ display: 'inline-block' }}>
      <Link
        ref={btnRef}
        href={href}
        style={{
          display: 'inline-block',
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          willChange: 'transform',
          padding: isPrimary ? '16px 44px' : '16px 32px',
          borderRadius: 50,
          border: isPrimary ? 'none' : '1px solid rgba(255,255,255,0.1)',
          background: isPrimary ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
          color: isPrimary ? '#000' : 'var(--text)',
          fontSize: 17,
          fontWeight: isPrimary ? 800 : 600,
          fontFamily: "'Heebo', sans-serif",
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s ease',
          boxShadow: isPrimary
            ? '0 0 40px rgba(200,245,59,0.2), 0 4px 20px rgba(0,0,0,0.3)'
            : 'none',
          backdropFilter: isPrimary ? undefined : 'blur(8px)',
        }}
      >
        {children}
      </Link>
    </div>
  );
}
