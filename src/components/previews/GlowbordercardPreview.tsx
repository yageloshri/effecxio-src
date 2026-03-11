'use client';
import { memo, useRef, useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function GlowbordercardPreview() {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number>(0);
  const angleRef = useRef(0);

  /* Auto-rotate glow when not hovering */
  useEffect(() => {
    if (prefersReduced) return;
    const auto = () => {
      if (!hovering) {
        angleRef.current += 0.02;
        const x = 50 + Math.cos(angleRef.current) * 50;
        const y = 50 + Math.sin(angleRef.current) * 50;
        setMousePos({ x, y });
      }
      rafRef.current = requestAnimationFrame(auto);
    };
    rafRef.current = requestAnimationFrame(auto);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovering, prefersReduced]);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    [prefersReduced]
  );

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
      }}
    >
      {/* Outer wrapper with glow border */}
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          position: 'relative',
          width: 180,
          height: 150,
          borderRadius: 16,
          padding: 2,
          cursor: 'pointer',
          background: prefersReduced
            ? 'var(--border)'
            : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, var(--accent) 0%, var(--accent2) 30%, var(--accent3) 60%, transparent 80%)`,
          transition: prefersReduced ? 'none' : 'background 0.1s linear',
        }}
      >
        {/* Inner card */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 14,
            background: 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              opacity: 0.7,
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
            גבול זוהר
          </span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>עוקב אחרי העכבר</span>
        </div>
      </div>
    </div>
  );
}

export default memo(GlowbordercardPreview);
