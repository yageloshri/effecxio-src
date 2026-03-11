'use client';
import { memo, useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const THUMBS = [
  'linear-gradient(135deg, var(--accent), var(--accent3))',
  'linear-gradient(135deg, var(--accent2), var(--accent))',
  'linear-gradient(135deg, var(--accent3), var(--accent2))',
  'linear-gradient(135deg, var(--accent), var(--accent2))',
];

function LightboxPreview() {
  const prefersReduced = useReducedMotion();
  const [openIdx, setOpenIdx] = useState(-1);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  /* Auto-demo: cycle through thumbnails */
  useEffect(() => {
    if (prefersReduced) return;
    let idx = 0;
    timerRef.current = setInterval(() => {
      setOpenIdx(idx % THUMBS.length);
      setTimeout(() => setOpenIdx(-1), 1200);
      idx++;
    }, 2400);
    return () => clearInterval(timerRef.current);
  }, [prefersReduced]);

  const isOpen = openIdx >= 0;

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
      {/* Thumbnail grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 60px)',
          gap: 8,
          opacity: isOpen ? 0.3 : 1,
          transition: prefersReduced ? 'none' : 'opacity 0.3s ease',
        }}
      >
        {THUMBS.map((bg, i) => (
          <div
            key={i}
            onClick={() => setOpenIdx(i)}
            style={{
              width: 60,
              height: 44,
              borderRadius: 8,
              background: bg,
              cursor: 'pointer',
              border: '1px solid var(--border)',
              transition: prefersReduced ? 'none' : 'transform 0.2s ease',
              transform: openIdx === i ? 'scale(0.9)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* Lightbox overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: prefersReduced ? 'none' : 'opacity 0.3s ease',
          zIndex: 5,
        }}
        onClick={() => setOpenIdx(-1)}
      >
        <div
          style={{
            width: 160,
            height: 120,
            borderRadius: 12,
            background: isOpen ? THUMBS[openIdx] : 'transparent',
            transform: isOpen && !prefersReduced ? 'scale(1)' : 'scale(0.6)',
            transition: prefersReduced
              ? 'none'
              : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          }}
        />
        {/* Close hint */}
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 14,
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              color: 'var(--text)',
              cursor: 'pointer',
            }}
          >
            &#215;
          </div>
        )}
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              fontSize: 10,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            {openIdx + 1} / {THUMBS.length}
          </div>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 11,
          color: 'var(--muted)',
          zIndex: 0,
        }}
      >
        תיבת אור
      </div>
    </div>
  );
}

export default memo(LightboxPreview);
