'use client';
import { memo, useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const SHAPES = [
  {
    collapsed: 'circle(20% at 50% 50%)',
    expanded: 'circle(70% at 50% 50%)',
    gradient: 'linear-gradient(135deg, var(--accent), var(--accent3))',
  },
  {
    collapsed: 'polygon(50% 10%, 90% 50%, 50% 90%, 10% 50%)',
    expanded: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    gradient: 'linear-gradient(135deg, var(--accent2), var(--accent))',
  },
  {
    collapsed: 'inset(25% round 8px)',
    expanded: 'inset(0% round 8px)',
    gradient: 'linear-gradient(135deg, var(--accent3), var(--accent2))',
  },
];

function ImageclipPreview() {
  const prefersReduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(-1);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (prefersReduced) return;
    let idx = 0;
    timerRef.current = setInterval(() => {
      setActiveIdx(idx % SHAPES.length);
      setTimeout(() => setActiveIdx(-1), 1200);
      idx++;
    }, 2000);
    return () => clearInterval(timerRef.current);
  }, [prefersReduced]);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {SHAPES.map((shape, i) => (
        <div
          key={i}
          style={{
            width: 72,
            height: 90,
            borderRadius: 10,
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid var(--border)',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setActiveIdx(i)}
          onMouseLeave={() => setActiveIdx(-1)}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: shape.gradient,
              clipPath: activeIdx === i ? shape.expanded : shape.collapsed,
              transition: prefersReduced
                ? 'none'
                : 'clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--surface)',
              zIndex: -1,
            }}
          />
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 11,
          color: 'var(--muted)',
        }}
      >
        חיתוך תמונה
      </div>
    </div>
  );
}

export default memo(ImageclipPreview);
