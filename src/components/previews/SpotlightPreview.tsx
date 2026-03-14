'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const COLS = 10;
const ROWS = 6;
const GAP = 4;

function SpotlightPreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const smoothRef = useRef<{ x: number; y: number } | null>(null);
  const [smoothMouse, setSmoothMouse] = useState<{ x: number; y: number } | null>(null);
  const [containerWidth, setContainerWidth] = useState(300);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      smoothRef.current = { x, y };
    },
    [prefersReduced],
  );

  const handleMouseLeave = useCallback(() => {
    smoothRef.current = null;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    let running = true;
    const curr = { x: 0, y: 0 };
    let hasValue = false;

    const tick = () => {
      if (!running) return;
      const tgt = smoothRef.current;
      if (tgt) {
        if (!hasValue) {
          curr.x = tgt.x;
          curr.y = tgt.y;
          hasValue = true;
        } else {
          curr.x += (tgt.x - curr.x) * 0.15;
          curr.y += (tgt.y - curr.y) * 0.15;
        }
        setSmoothMouse({ x: curr.x, y: curr.y });
      } else {
        if (hasValue) {
          hasValue = false;
          setSmoothMouse(null);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [previewState]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: 220,
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gap: GAP,
        padding: GAP,
        background: 'var(--bg)',
        cursor: 'crosshair',
        position: 'relative',
      }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        let opacity = 0.06;

        if (smoothMouse) {
          const cellW = containerWidth / COLS;
          const cellH = 220 / ROWS;
          const cx = col * cellW + cellW / 2;
          const cy = row * cellH + cellH / 2;
          const dx = smoothMouse.x - cx;
          const dy = smoothMouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 100;
          opacity = Math.max(0.06, 1 - dist / maxDist);
        }

        return (
          <div
            key={i}
            style={{
              borderRadius: 3,
              background: 'var(--accent)',
              opacity,
              transition: 'opacity 0.1s ease-out',
              willChange: 'opacity',
            }}
          />
        );
      })}
    </div>
  );
}

export default memo(SpotlightPreview);
