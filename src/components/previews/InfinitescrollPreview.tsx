'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const ITEMS = Array.from({ length: 8 }, (_, i) => ({
  label: `Item #${i + 1}`,
}));

function InfinitescrollPreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const listRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    if (prefersReduced) return;
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const list = listRef.current;
    if (!list) return;

    const speed = 0.4;

    const animate = () => {
      offsetRef.current += speed;

      /* Reset when scrolled past first set (seamless loop) */
      const halfHeight = list.scrollHeight / 2;
      if (offsetRef.current >= halfHeight) {
        offsetRef.current -= halfHeight;
      }

      list.style.transform = `translateY(-${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced, previewState]);

  const duped = [...ITEMS, ...ITEMS]; /* duplicate for seamless loop */

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top fade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 30,
          background: 'linear-gradient(to bottom, var(--bg), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
          background: 'linear-gradient(to top, var(--bg), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Scrolling list */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          padding: '0 20px',
        }}
      >
        <div ref={listRef} style={{ willChange: 'transform' }}>
          {duped.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '10px 14px',
                marginBottom: 6,
                borderRadius: 8,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text)',
                  opacity: 0.8,
                }}
              >
                {item.label}
              </span>
              <div
                style={{
                  width: 30,
                  height: 4,
                  borderRadius: 2,
                  background: 'var(--accent)',
                  opacity: 0.3,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Loading indicator at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 9,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontWeight: 700,
          zIndex: 3,
        }}
      >
        loading more...
      </div>
    </div>
  );
}

export default memo(InfinitescrollPreview);
