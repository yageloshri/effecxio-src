'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';

interface DeferredSectionProps {
  children: ReactNode;
  id: string;
  height?: number;
  margin?: string;
}

/**
 * Defers rendering of children until the placeholder
 * approaches the viewport. Keeps the section ID for scroll targeting.
 */
export default function DeferredSection({ children, id, height = 600, margin = '400px' }: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || mounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, margin]);

  if (mounted) {
    return <>{children}</>;
  }

  return (
    <div
      ref={ref}
      id={id}
      style={{
        minHeight: height,
        background: 'transparent',
      }}
    />
  );
}
