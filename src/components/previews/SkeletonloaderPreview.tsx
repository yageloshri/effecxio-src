'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const SKELETON_KEYFRAMES = `
@keyframes skeleton-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

function SkeletonloaderPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = SKELETON_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const shimmerBg = prefersReduced
    ? 'var(--surface)'
    : `linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)`;

  const shimmerStyle: React.CSSProperties = {
    background: shimmerBg,
    backgroundSize: '400% 100%',
    animation: prefersReduced ? 'none' : 'skeleton-shimmer 1.8s ease-in-out infinite',
    borderRadius: 8,
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
      }}
    >
      <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Avatar + lines row */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div
            style={{
              ...shimmerStyle,
              width: 44,
              height: 44,
              borderRadius: '50%',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ ...shimmerStyle, width: '75%', height: 12 }} />
            <div style={{ ...shimmerStyle, width: '50%', height: 10 }} />
          </div>
        </div>
        {/* Image placeholder */}
        <div style={{ ...shimmerStyle, width: '100%', height: 80 }} />
        {/* Text lines */}
        <div style={{ ...shimmerStyle, width: '100%', height: 10 }} />
        <div style={{ ...shimmerStyle, width: '85%', height: 10 }} />
        <div style={{ ...shimmerStyle, width: '60%', height: 10 }} />
      </div>
    </div>
  );
}

export default memo(SkeletonloaderPreview);
