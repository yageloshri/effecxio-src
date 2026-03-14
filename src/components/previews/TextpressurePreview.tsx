'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const TEXT = 'PRESSURE';
const MAX_DIST = 120;

function TextpressurePreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const [weights, setWeights] = useState<number[]>(
    () => new Array(TEXT.length).fill(100)
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReduced || previewState !== 'active') return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const newWeights = spanRefs.current.map((span) => {
          if (!span) return 100;
          const rect = span.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
          const ratio = Math.max(0, 1 - dist / MAX_DIST);
          return Math.round(100 + ratio * 800);
        });
        setWeights(newWeights);
      });
    },
    [prefersReduced, previewState]
  );

  useEffect(() => {
    if (previewState !== 'active') {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, previewState]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        cursor: 'default',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex' }}>
        {TEXT.split('').map((ch, i) => {
          const w = weights[i];
          const ratio = (w - 100) / 800;
          return (
            <span
              key={i}
              ref={(el) => {
                spanRefs.current[i] = el;
              }}
              style={{
                fontSize: 44,
                fontWeight: w,
                fontFamily: "'Inter', system-ui, sans-serif",
                color: `color-mix(in srgb, var(--accent) ${Math.round(ratio * 100)}%, var(--text))`,
                display: 'inline-block',
                transition: 'font-weight 0.15s ease, color 0.15s ease',
                lineHeight: 1.1,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>
        הזז את העכבר קרוב לטקסט
      </span>
    </div>
  );
}

export default memo(TextpressurePreview);
