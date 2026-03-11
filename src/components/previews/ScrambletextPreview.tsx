'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const ORIGINAL = 'EFFECTS';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
const CYCLES_PER_LETTER = 3;
const FRAME_MS = 40;

function ScrambletextPreview() {
  const prefersReduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(ORIGINAL);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const handleEnter = useCallback(() => {
    if (prefersReduced) return;
    cleanup();
    let iteration = 0;
    const total = ORIGINAL.length * CYCLES_PER_LETTER;
    intervalRef.current = setInterval(() => {
      setDisplayed(
        ORIGINAL.split('')
          .map((ch, i) => {
            if (i < Math.floor(iteration / CYCLES_PER_LETTER)) return ORIGINAL[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      iteration++;
      if (iteration > total) cleanup();
    }, FRAME_MS);
  }, [prefersReduced, cleanup]);

  const handleLeave = useCallback(() => {
    cleanup();
    setDisplayed(ORIGINAL);
  }, [cleanup]);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        gap: 12,
      }}
    >
      <span
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          fontSize: 42,
          fontWeight: 900,
          fontFamily: "'Space Mono', monospace",
          color: 'var(--text)',
          letterSpacing: 6,
          cursor: 'pointer',
          padding: '8px 16px',
          borderRadius: 8,
          transition: 'background 0.3s',
          userSelect: 'none',
        }}
      >
        {displayed}
      </span>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>
        רחף כדי לערבב
      </span>
    </div>
  );
}

export default memo(ScrambletextPreview);
