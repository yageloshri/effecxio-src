'use client';
import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function BeforeafterPreview() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const animRef = useRef<number>(0);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const s = document.createElement('style');
    s.textContent = `
      @keyframes ba-slide {
        0%, 100% { left: 30%; }
        50% { left: 70%; }
      }
    `;
    el.appendChild(s);
    styleRef.current = s;
    return () => { s.remove(); };
  }, []);

  /* Auto-animate the divider position */
  useEffect(() => {
    if (prefersReduced) return;
    let start: number | null = null;
    const DURATION = 3000; /* ms per cycle */

    const animate = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = (ts - start) % DURATION;
      const t = elapsed / DURATION;
      /* Smooth ping-pong: ease in-out */
      const eased = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
      setPos(25 + eased * 50); /* range: 25% to 75% */
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
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
      <div
        style={{
          width: 200,
          height: 140,
          borderRadius: 12,
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid var(--border)',
        }}
      >
        {/* "After" layer (bottom) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--accent3), var(--accent))',
          }}
        />
        {/* "Before" layer (top, clipped) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--accent2), var(--accent))',
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
          }}
        />
        {/* Divider line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${pos}%`,
            width: 2,
            background: 'var(--text)',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          {/* Handle circle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'var(--text)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 10, color: 'var(--bg)' }}>
              &#8596;
            </span>
          </div>
        </div>
        {/* Labels */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            fontSize: 9,
            color: 'var(--text)',
            background: 'rgba(0,0,0,0.3)',
            padding: '2px 6px',
            borderRadius: 4,
            zIndex: 3,
          }}
        >
          לפני
        </div>
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontSize: 9,
            color: 'var(--text)',
            background: 'rgba(0,0,0,0.3)',
            padding: '2px 6px',
            borderRadius: 4,
            zIndex: 3,
          }}
        >
          אחרי
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 11,
          color: 'var(--muted)',
        }}
      >
        לפני ואחרי
      </div>
    </div>
  );
}

export default memo(BeforeafterPreview);
