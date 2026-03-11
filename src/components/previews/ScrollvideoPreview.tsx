'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const FRAME_COUNT = 16;
const CYCLE_MS = 4000;
const COLORS = ['var(--accent)', 'var(--accent2)', 'var(--accent3)'];

function ScrollvideoPreview() {
  const prefersReduced = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  useEffect(() => {
    if (prefersReduced) return;

    startRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = (elapsed % CYCLE_MS) / CYCLE_MS;
      setFrame(Math.floor(progress * FRAME_COUNT));
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced]);

  const displayFrame = prefersReduced ? 0 : frame;
  const progressPct = ((displayFrame + 1) / FRAME_COUNT) * 100;
  const color = COLORS[displayFrame % COLORS.length];

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Film strip holes - top */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 5,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.06)',
            }}
          />
        ))}
      </div>

      {/* Simulated video frame */}
      <div
        style={{
          width: 140,
          height: 90,
          borderRadius: 6,
          background: '#0a0a0a',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated color wash */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: color,
            opacity: 0.1,
            transition: 'background 0.15s ease-out',
          }}
        />

        {/* Frame number */}
        <span
          style={{
            fontSize: 32,
            fontWeight: 900,
            color,
            fontFamily: "'Space Mono', monospace",
            position: 'relative',
            zIndex: 1,
            transition: 'color 0.15s',
          }}
        >
          {String(displayFrame + 1).padStart(2, '0')}
        </span>

        {/* Small play indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            right: 6,
            width: 0,
            height: 0,
            borderLeft: '6px solid var(--accent)',
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            opacity: 0.5,
          }}
        />
      </div>

      {/* Scroll progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 100,
          height: 3,
          borderRadius: 2,
          background: 'rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 2,
            background: 'var(--accent)',
            width: progressPct + '%',
            transition: 'width 0.12s ease-out',
          }}
        />
      </div>

      {/* Scroll icon */}
      <div
        style={{
          position: 'absolute',
          bottom: 34,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <div
          style={{
            width: 14,
            height: 22,
            borderRadius: 7,
            border: '1.5px solid rgba(255,255,255,0.15)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 4,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 2,
              height: 5,
              borderRadius: 1,
              background: 'var(--accent)',
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      {/* Label */}
      <span
        style={{
          position: 'absolute',
          top: 20,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--muted)',
          opacity: 0.4,
        }}
      >
        Scroll Video
      </span>

      {/* Film strip holes - bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 5,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.06)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(ScrollvideoPreview);
