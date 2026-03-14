'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';

interface SpotlightCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function SpotlightCard({ href, icon, title, description, children }: SpotlightCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [bg, setBg] = useState('transparent');
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBg(`radial-gradient(circle at ${x}px ${y}px, rgba(200,245,59,0.06), transparent 60%)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setBg('transparent');
    setHovered(false);
  }, []);

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'block',
        textDecoration: 'none',
        padding: 28,
        borderRadius: 16,
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        background: bg === 'transparent' ? 'var(--surface)' : `${bg}, var(--surface)`,
        transition: 'border-color 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        direction: 'rtl',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 16, lineHeight: 1, display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <h3
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          color: 'var(--text)',
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontSize: 14,
          color: '#fff',
          lineHeight: 1.6,
          marginBottom: children ? 16 : 0,
        }}
      >
        {description}
      </p>
      {children}
    </Link>
  );
}
