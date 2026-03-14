'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

const STEPS = [
  { label: 'Step 1', color: 'var(--accent)' },
  { label: 'Step 2', color: 'var(--accent2)' },
  { label: 'Step 3', color: 'var(--accent3)' },
];

function PinnedsectionPreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const rightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const dirRef = useRef(1);

  useEffect(() => {
    if (prefersReduced) return;
    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const el = rightRef.current;
    if (!el) return;

    const speed = 0.3;
    const itemHeight = 64; /* height per step item + gap */
    const maxOffset = itemHeight * (STEPS.length - 1);

    const animate = () => {
      offsetRef.current += speed * dirRef.current;

      if (offsetRef.current >= maxOffset) dirRef.current = -1;
      if (offsetRef.current <= 0) dirRef.current = 1;

      el.style.transform = `translateY(-${offsetRef.current}px)`;
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
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Pinned left side */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1px solid var(--border)',
          padding: 16,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: 'var(--text)',
              marginBottom: 4,
            }}
          >
            Pinned
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              fontWeight: 500,
            }}
          >
            stays in place
          </div>
        </div>
      </div>

      {/* Scrolling right side */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        {/* Fade overlays */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: 30,
            background: 'linear-gradient(to bottom, var(--bg), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '50%',
            height: 30,
            background: 'linear-gradient(to top, var(--bg), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <div ref={rightRef} style={{ willChange: 'transform', width: '100%' }}>
          {[...STEPS, ...STEPS].map((step, i) => (
            <div
              key={i}
              style={{
                padding: '12px 14px',
                marginBottom: 8,
                borderRadius: 8,
                background: `${step.color}10`,
                border: `1px solid ${step.color}25`,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: step.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 2,
          color: 'var(--muted)',
          fontWeight: 700,
          zIndex: 3,
        }}
      >
        pinned section
      </div>
    </div>
  );
}

export default memo(PinnedsectionPreview);
