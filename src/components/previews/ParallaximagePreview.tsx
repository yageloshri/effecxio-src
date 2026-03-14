'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

function ParallaximagePreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const imgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const dirRef = useRef(1);

  useEffect(() => {
    if (prefersReduced) return;
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const img = imgRef.current;
    if (!img) return;

    const speed = 0.25;
    const maxOffset = 30; /* max parallax shift in px */

    const animate = () => {
      offsetRef.current += speed * dirRef.current;

      if (offsetRef.current >= maxOffset) dirRef.current = -1;
      if (offsetRef.current <= -maxOffset) dirRef.current = 1;

      img.style.transform = `translateY(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced, previewState]);

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
        position: 'relative',
      }}
    >
      {/* Simulated parallax container */}
      <div
        style={{
          width: '75%',
          height: 140,
          borderRadius: 12,
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid var(--border)',
        }}
      >
        {/* Image layer - taller than container */}
        <div
          ref={imgRef}
          style={{
            position: 'absolute',
            top: -30,
            left: 0,
            right: 0,
            height: 200, /* 60px taller than container */
            willChange: 'transform',
            background: 'linear-gradient(135deg, var(--surface) 0%, var(--border) 50%, var(--surface) 100%)',
          }}
        >
          {/* Decorative circles to show movement */}
          <div
            style={{
              position: 'absolute',
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'var(--accent)',
              opacity: 0.12,
              top: 20,
              left: '20%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'var(--accent2)',
              opacity: 0.1,
              top: 80,
              right: '25%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'var(--accent3)',
              opacity: 0.08,
              top: 40,
              left: '50%',
            }}
          />
        </div>

        {/* Overlay text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: 'var(--text)',
              opacity: 0.5,
              textTransform: 'uppercase',
              letterSpacing: 3,
            }}
          >
            Depth
          </span>
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 2,
          color: 'var(--muted)',
          fontWeight: 700,
        }}
      >
        parallax image
      </div>
    </div>
  );
}

export default memo(ParallaximagePreview);
