'use client';

import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

const COUNTDOWN_KEYFRAMES = `
@keyframes countdown-flipout {
  0% { transform: rotateX(0deg); opacity: 1; }
  100% { transform: rotateX(-90deg); opacity: 0; }
}
@keyframes countdown-flipin {
  0% { transform: rotateX(90deg); opacity: 0; }
  100% { transform: rotateX(0deg); opacity: 1; }
}
`;

function CountdowntimerPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [count, setCount] = useState(9);
  const [flipping, setFlipping] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = COUNTDOWN_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const tick = useCallback(() => {
    setFlipping(true);
    const flipTimeout = setTimeout(() => {
      setCount((c) => (c <= 0 ? 9 : c - 1));
      setFlipping(false);
    }, 300); /* 300ms = half of the flip animation */
    return flipTimeout;
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    let flipTimeout: ReturnType<typeof setTimeout>;
    intervalRef.current = setInterval(() => {
      flipTimeout = tick();
    }, 1000); /* tick every 1s */
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(flipTimeout);
    };
  }, [prefersReduced, tick]);

  const digitStyle: React.CSSProperties = {
    width: 64,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--surface)',
    borderRadius: 10,
    fontSize: 42,
    fontWeight: 800,
    color: 'var(--accent)',
    fontVariantNumeric: 'tabular-nums',
    perspective: '300px',
    border: '1px solid var(--border)',
    position: 'relative',
    overflow: 'hidden',
  };

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
        gap: 10,
      }}
    >
      <div style={digitStyle}>
        <span
          style={{
            display: 'inline-block',
            animation:
              prefersReduced || !flipping
                ? 'none'
                : 'countdown-flipout 0.3s ease-in forwards',
            transformOrigin: 'bottom center',
          }}
        >
          {flipping ? (count <= 0 ? 9 : count) : count}
        </span>
      </div>
      {/* Divider line */}
      <div
        style={{
          width: 4,
          height: 50,
          borderRadius: 2,
          background: 'var(--border)',
        }}
      />
      {/* Static second digit for visual balance */}
      <div style={digitStyle}>
        <span>0</span>
      </div>
    </div>
  );
}

export default memo(CountdowntimerPreview);
