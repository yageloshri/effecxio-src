'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';

interface ViewportPreviewProps {
  component: React.LazyExoticComponent<React.ComponentType> | undefined;
  height: number;
  margin?: string;
}

function PreviewSkeleton({ height }: { height: number }) {
  return (
    <div
      className="w-full animate-pulse"
      style={{ height, background: 'var(--surface)' }}
    />
  );
}

/**
 * Only mounts the lazy preview component when the container
 * enters the viewport (with 200px margin for pre-loading).
 * Before that, renders a lightweight skeleton placeholder.
 */
export default function ViewportPreview({ component: Component, height, margin = '200px' }: ViewportPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, margin]);

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

  return (
    <div ref={ref} style={{ height, width: '100%' }}>
      {inView ? (
        <Suspense fallback={<PreviewSkeleton height={height} />}>
          <Component />
        </Suspense>
      ) : (
        <PreviewSkeleton height={height} />
      )}
    </div>
  );
}
