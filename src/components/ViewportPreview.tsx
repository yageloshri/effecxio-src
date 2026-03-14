'use client';

import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { PreviewStateContext, type PreviewState } from '@/context/PreviewStateContext';

interface ViewportPreviewProps {
  component: React.LazyExoticComponent<React.ComponentType> | undefined;
  height: number;
  margin?: string;
}

function PreviewSkeleton({ height }: { height: number }) {
  return (
    <div
      className="w-full"
      style={{
        height,
        background: 'var(--surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '50%',
          height: 10,
          borderRadius: 5,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)',
          backgroundSize: '200% 100%',
          animation: 'preview-shimmer 1.5s ease-in-out infinite',
        }}
      />
    </div>
  );
}

/**
 * 3-state preview system:
 *  idle    → out of viewport → nothing mounted
 *  visible → in viewport, no hover → component mounted, CSS animations paused via data-attr
 *  active  → hovered → everything runs (RAF, canvas, particles)
 */
export default function ViewportPreview({
  component: Component,
  height,
  margin = '200px',
}: ViewportPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<PreviewState>('idle');

  // IntersectionObserver — toggle between idle and visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState((prev) => {
          if (entry.isIntersecting) {
            // entering viewport: idle -> visible (keep active if hovered)
            return prev === 'idle' ? 'visible' : prev;
          }
          // leaving viewport: visible -> idle (active -> idle)
          return 'idle';
        });
      },
      { rootMargin: margin, threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  const handleMouseEnter = useCallback(() => {
    setState((prev) => (prev !== 'idle' ? 'active' : prev));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState((prev) => (prev === 'active' ? 'visible' : prev));
  }, []);

  if (!Component) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          height,
          background: 'var(--bg)',
          color: 'var(--muted)',
          fontFamily: "'Space Mono', monospace",
          fontSize: 14,
        }}
      >
        Preview
      </div>
    );
  }

  const mounted = state !== 'idle';

  return (
    <div
      ref={ref}
      data-preview-state={state}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ height, width: '100%' }}
    >
      {mounted ? (
        <PreviewStateContext.Provider value={state}>
          <Suspense fallback={<PreviewSkeleton height={height} />}>
            <Component />
          </Suspense>
        </PreviewStateContext.Provider>
      ) : (
        <PreviewSkeleton height={height} />
      )}
    </div>
  );
}
