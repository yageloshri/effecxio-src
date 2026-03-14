'use client';
import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

interface CounterConfig {
  target: number;
  suffix: string;
  prefix: string;
  label: string;
  color: string;
  format: boolean;
}

const counters: CounterConfig[] = [
  { target: 1234, suffix: '', prefix: '', label: 'משתמשים', color: 'var(--accent)', format: true },
  { target: 99, suffix: '%', prefix: '', label: 'דיוק', color: 'var(--accent2)', format: false },
  { target: 500, suffix: '+', prefix: '', label: 'פרויקטים', color: 'var(--accent3)', format: false },
];

const DURATION = 2500;
const PAUSE = 1500;

function formatNumber(n: number, format: boolean): string {
  if (!format) return Math.round(n).toString();
  return Math.round(n).toLocaleString();
}

const CountupPreview = memo(function CountupPreview() {
  const shouldReduceMotion = useReducedMotion();
  const previewState = usePreviewState();
  const [values, setValues] = useState<number[]>(() =>
    shouldReduceMotion ? counters.map((c) => c.target) : counters.map(() => 0)
  );
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const phaseRef = useRef<'counting' | 'pausing'>('counting');
  const pauseStartRef = useRef<number>(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    if (previewState !== 'active') {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    startTimeRef.current = performance.now();
    phaseRef.current = 'counting';

    const animate = (now: number) => {
      if (phaseRef.current === 'counting') {
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / DURATION, 1);
        const eased = easeOutCubic(progress);

        setValues(counters.map((c) => eased * c.target));

        if (progress >= 1) {
          phaseRef.current = 'pausing';
          pauseStartRef.current = now;
        }
      } else {
        const pauseElapsed = now - pauseStartRef.current;
        if (pauseElapsed >= PAUSE) {
          // Reset and start counting again
          setValues(counters.map(() => 0));
          startTimeRef.current = now;
          phaseRef.current = 'counting';
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduceMotion, previewState]);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        overflow: 'hidden',
        borderRadius: 12,
        background: 'var(--surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 16,
      }}
    >
      {counters.map((counter, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            flex: 1,
          }}
        >
          {/* Number */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: counter.color,
              fontFamily: "'Space Mono', monospace",
              lineHeight: 1,
              direction: 'ltr',
              minWidth: 80,
              textAlign: 'center',
            }}
          >
            {counter.prefix}
            {formatNumber(values[i], counter.format)}
            {counter.suffix}
          </div>

          {/* Divider line */}
          <div
            style={{
              width: 30,
              height: 2,
              borderRadius: 1,
              background: counter.color,
              opacity: 0.3,
            }}
          />

          {/* Label */}
          <div
            style={{
              fontSize: 12,
              color: 'var(--muted)',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            {counter.label}
          </div>
        </div>
      ))}
    </div>
  );
});

export default CountupPreview;
