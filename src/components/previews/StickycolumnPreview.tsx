'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const SECTIONS = [
  'React',
  'TypeScript',
  'Tailwind',
  'Next.js',
  'Framer',
  'CSS Vars',
];

const duped = [...SECTIONS, ...SECTIONS];

function StickycolumnPreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const colRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    if (prefersReduced) return;
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const col = colRef.current;
    if (!col) return;

    const speed = 0.35;

    const animate = () => {
      offsetRef.current += speed;

      const halfHeight = col.scrollHeight / 2;
      if (offsetRef.current >= halfHeight) {
        offsetRef.current -= halfHeight;
      }

      col.style.transform = `translateY(-${offsetRef.current}px)`;
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
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Sticky left column */}
      <div
        style={{
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1px solid var(--border)',
          padding: 16,
          background: 'var(--surface)',
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: 6,
          }}
        >
          Sidebar
        </div>
        <div style={{ fontSize: 10, color: 'var(--muted)' }}>sticky</div>
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {['CSS', 'Grid'].map((t) => (
            <span
              key={t}
              style={{
                fontSize: 9,
                padding: '3px 8px',
                borderRadius: 10,
                background: 'var(--accent)',
                opacity: 0.15,
                color: 'var(--accent)',
                fontWeight: 700,
                border: '1px solid var(--accent)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Scrolling right column */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Fade overlays */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 25,
            background: 'linear-gradient(to bottom, var(--bg), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 25,
            background: 'linear-gradient(to top, var(--bg), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <div ref={colRef} style={{ willChange: 'transform', padding: '8px 12px' }}>
          {duped.map((section, i) => (
            <div
              key={i}
              style={{
                padding: '10px 12px',
                marginBottom: 6,
                borderRadius: 8,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text)',
                opacity: 0.7,
              }}
            >
              {section}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(StickycolumnPreview);
