'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const PANELS = [
  { label: 'A', color: 'var(--accent)' },
  { label: 'B', color: 'var(--accent2)' },
  { label: 'C', color: 'var(--accent3)' },
  { label: 'D', color: 'var(--accent)' },
];

function HorizontalscrollPreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const dirRef = useRef(1);

  useEffect(() => {
    if (prefersReduced) return;
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const track = trackRef.current;
    if (!track) return;

    const panelWidth = 120; /* px per panel */
    const totalExtra = panelWidth * (PANELS.length - 1);
    const speed = 0.4; /* px per frame */

    const animate = () => {
      offsetRef.current += speed * dirRef.current;

      if (offsetRef.current >= totalExtra) {
        dirRef.current = -1;
      } else if (offsetRef.current <= 0) {
        dirRef.current = 1;
      }

      track.style.transform = `translateX(-${offsetRef.current}px)`;
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
      {/* Scroll direction indicator */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 2,
          color: 'var(--muted)',
          fontWeight: 700,
          zIndex: 2,
        }}
      >
        horizontal scroll
      </div>

      {/* Track container */}
      <div style={{ overflow: 'hidden', width: 120, borderRadius: 8 }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 8,
            willChange: 'transform',
          }}
        >
          {PANELS.map((p, i) => (
            <div
              key={i}
              style={{
                minWidth: 120,
                height: 120,
                borderRadius: 8,
                background: `${p.color}15`,
                border: `1px solid ${p.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 800,
                color: p.color,
              }}
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          display: 'flex',
          gap: 6,
        }}
      >
        {PANELS.map((p, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: p.color,
              opacity: 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(HorizontalscrollPreview);
