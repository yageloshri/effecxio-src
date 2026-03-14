'use client';
import { memo, useRef, useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const TiltPreview = memo(function TiltPreview() {
  const shouldReduceMotion = useReducedMotion();
  const previewState = usePreviewState();
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const currentRef = useRef({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = () => {
      const t = targetRef.current;
      const c = currentRef.current;

      c.rotateX += (t.rotateX - c.rotateX) * 0.1;
      c.rotateY += (t.rotateY - c.rotateY) * 0.1;
      c.glareX += (t.glareX - c.glareX) * 0.1;
      c.glareY += (t.glareY - c.glareY) * 0.1;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(400px) rotateX(${c.rotateX}deg) rotateY(${c.rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${c.glareX}% ${c.glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduceMotion, previewState]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetRef.current.rotateX = ((y - centerY) / centerY) * -12;
      targetRef.current.rotateY = ((x - centerX) / centerX) * 12;
      targetRef.current.glareX = (x / rect.width) * 100;
      targetRef.current.glareY = (y / rect.height) * 100;
    },
    [shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 };
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        overflow: 'hidden',
        borderRadius: 12,
        background: 'var(--surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          width: 180,
          height: 140,
          borderRadius: 16,
          background: 'linear-gradient(145deg, rgba(200,245,59,0.1), rgba(68,170,255,0.08))',
          border: '1px solid rgba(200,245,59,0.2)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: shouldReduceMotion ? 'none' : 'box-shadow 0.3s ease',
          boxShadow: isHovering
            ? '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(200,245,59,0.1)'
            : '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glare overlay */}
        <div
          ref={glareRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 16,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Card content */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            opacity: 0.8,
          }}
        />
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text)',
            opacity: 0.9,
          }}
        >
          הטה אותי
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'var(--muted)',
          }}
        >
          הזז את העכבר מעל
        </div>
      </div>
    </div>
  );
});

export default TiltPreview;
