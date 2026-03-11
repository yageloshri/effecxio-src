'use client';
import { memo, useRef, useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function Hovercard3dPreview() {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ rx: 0, ry: 0, sx: 50, sy: 50 });
  const currentRef = useRef({ rx: 0, ry: 0, sx: 50, sy: 50 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const animate = () => {
      const t = targetRef.current;
      const c = currentRef.current;
      /* Lerp factor for smooth interpolation */
      c.rx += (t.rx - c.rx) * 0.08;
      c.ry += (t.ry - c.ry) * 0.08;
      c.sx += (t.sx - c.sx) * 0.08;
      c.sy += (t.sy - c.sy) * 0.08;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(500px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale3d(1.03,1.03,1.03)`;
      }
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(circle at ${c.sx}% ${c.sy}%, rgba(255,255,255,0.18) 0%, transparent 55%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced]);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      /* Max tilt 15 degrees */
      targetRef.current.rx = ((y - rect.height / 2) / (rect.height / 2)) * -15;
      targetRef.current.ry = ((x - rect.width / 2) / (rect.width / 2)) * 15;
      targetRef.current.sx = (x / rect.width) * 100;
      targetRef.current.sy = (y / rect.height) * 100;
    },
    [prefersReduced]
  );

  const handleLeave = useCallback(() => {
    targetRef.current = { rx: 0, ry: 0, sx: 50, sy: 50 };
    setHovering(false);
  }, []);

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
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleLeave}
        style={{
          width: 170,
          height: 150,
          borderRadius: 16,
          background: 'linear-gradient(145deg, var(--surface), var(--bg))',
          border: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          transition: prefersReduced ? 'none' : 'box-shadow 0.3s ease',
          boxShadow: hovering
            ? '0 20px 50px rgba(0,0,0,0.35)'
            : '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {/* Spotlight overlay */}
        <div
          ref={spotRef}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
        />
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            opacity: 0.8,
          }}
        />
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', zIndex: 1 }}>
          כרטיס 3D
        </span>
        <span style={{ fontSize: 11, color: 'var(--muted)', zIndex: 1 }}>
          הזז את העכבר
        </span>
      </div>
    </div>
  );
}

export default memo(Hovercard3dPreview);
