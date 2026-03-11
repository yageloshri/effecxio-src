'use client';

import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

function SuccessbuttonPreview() {
  const prefersReduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = useCallback(() => {
    if (done) return;
    setDone(true);
    timerRef.current = setTimeout(() => setDone(false), 2500);
  }, [done]);

  const dur = prefersReduced ? '0s' : '0.5s';

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
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <button
        onClick={handleClick}
        style={{
          position: 'relative',
          minWidth: done ? 50 : 160,
          height: 50,
          padding: done ? 0 : '0 32px',
          borderRadius: done ? '50%' : 12,
          border: 'none',
          background: done ? '#10b981' : 'var(--accent)',
          color: 'var(--bg)',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: `all ${dur} cubic-bezier(0.34, 1.56, 0.64, 1)`,
        }}
      >
        {/* Label text */}
        <span
          style={{
            opacity: done ? 0 : 1,
            transform: done ? 'scale(0.5)' : 'scale(1)',
            transition: `opacity 0.2s, transform 0.3s`,
            display: 'inline-block',
          }}
        >
          Success
        </span>

        {/* Check SVG */}
        <svg
          viewBox="0 0 24 24"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 24,
            height: 24,
            opacity: done ? 1 : 0,
            transition: `opacity 0.3s ease ${done ? '0.3s' : '0s'}`,
          }}
        >
          <polyline
            points="4 12 10 18 20 6"
            fill="none"
            stroke="#fff"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={30}
            strokeDashoffset={done ? 0 : 30}
            style={{
              transition: `stroke-dashoffset 0.4s ease ${done ? '0.4s' : '0s'}`,
            }}
          />
        </svg>
      </button>

      {/* Success message */}
      <div
        style={{
          color: '#10b981',
          fontWeight: 600,
          fontSize: 13,
          opacity: done ? 1 : 0,
          transform: done ? 'translateY(0)' : 'translateY(8px)',
          transition: `all 0.4s ease ${done ? '0.6s' : '0s'}`,
        }}
      >
        Done!
      </div>
    </div>
  );
}

export default memo(SuccessbuttonPreview);
