'use client';

import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

const TICKET_KEYFRAMES = `
@keyframes numberticket-roll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}
`;

function NumberticketPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [digits, setDigits] = useState([3, 8, 7]);
  const [rolling, setRolling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = TICKET_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const rollOnce = useCallback(() => {
    setRolling(true);
    const nextDigits = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    /* Settle after 600ms animation */
    const t = setTimeout(() => {
      setDigits(nextDigits);
      setRolling(false);
    }, 600);
    return t;
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    let timeout: ReturnType<typeof setTimeout>;
    intervalRef.current = setInterval(() => {
      timeout = rollOnce();
    }, 2000); /* Roll every 2s */
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(timeout);
    };
  }, [prefersReduced, rollOnce]);

  const slotStyle: React.CSSProperties = {
    width: 48,
    height: 64,
    overflow: 'hidden',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 34,
    fontWeight: 800,
    color: 'var(--accent)',
    fontVariantNumeric: 'tabular-nums',
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
        gap: 8,
      }}
    >
      {digits.map((d, i) => (
        <div key={i} style={slotStyle}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation:
                prefersReduced || !rolling
                  ? 'none'
                  : `numberticket-roll 0.6s cubic-bezier(0.33,1,0.68,1) ${i * 0.1}s forwards`,
            }}
          >
            <span style={{ lineHeight: '64px', height: 64 }}>{d}</span>
            <span style={{ lineHeight: '64px', height: 64 }}>
              {rolling ? Math.floor(Math.random() * 10) : d}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(NumberticketPreview);
