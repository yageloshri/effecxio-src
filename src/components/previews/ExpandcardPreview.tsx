'use client';
import { memo, useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

function ExpandcardPreview() {
  const prefersReduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (prefersReduced) return;
    timerRef.current = setInterval(() => {
      setExpanded((p) => !p);
    }, 2500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [prefersReduced]);

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
      <div
        onClick={() => setExpanded((p) => !p)}
        style={{
          position: 'absolute',
          borderRadius: expanded ? 0 : 14,
          width: expanded ? '100%' : 140,
          height: expanded ? '100%' : 160,
          background: 'linear-gradient(145deg, var(--surface), var(--bg))',
          border: expanded ? 'none' : '1px solid var(--border)',
          transition: prefersReduced
            ? 'none'
            : 'all 0.6s cubic-bezier(.4,0,.2,1)',
          boxShadow: expanded
            ? '0 0 60px rgba(0,0,0,0.4)'
            : '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          zIndex: expanded ? 10 : 1,
        }}
      >
        <div
          style={{
            width: expanded ? 60 : 36,
            height: expanded ? 60 : 36,
            borderRadius: expanded ? 16 : 10,
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            transition: prefersReduced ? 'none' : 'all 0.6s cubic-bezier(.4,0,.2,1)',
            opacity: 0.9,
          }}
        />
        <span
          style={{
            fontSize: expanded ? 18 : 14,
            fontWeight: 700,
            color: 'var(--text)',
            transition: prefersReduced ? 'none' : 'font-size 0.6s ease',
          }}
        >
          {expanded ? 'כרטיס מורחב' : 'לחץ להרחבה'}
        </span>
        <span style={{ fontSize: 11, color: 'var(--muted)' }}>
          {expanded ? 'לחץ לסגירה' : 'מתרחב למסך מלא'}
        </span>
      </div>
    </div>
  );
}

export default memo(ExpandcardPreview);
