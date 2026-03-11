'use client';
import { memo, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const GALLERY_ITEMS = [
  { w: 44, h: 56, gradient: 'linear-gradient(135deg, var(--accent), var(--accent3))' },
  { w: 44, h: 36, gradient: 'linear-gradient(135deg, var(--accent2), var(--accent))' },
  { w: 44, h: 48, gradient: 'linear-gradient(135deg, var(--accent3), var(--accent2))' },
  { w: 44, h: 40, gradient: 'linear-gradient(135deg, var(--accent), var(--accent2))' },
  { w: 44, h: 52, gradient: 'linear-gradient(135deg, var(--accent2), var(--accent3))' },
  { w: 44, h: 34, gradient: 'linear-gradient(135deg, var(--accent3), var(--accent))' },
  { w: 44, h: 44, gradient: 'linear-gradient(135deg, var(--accent), var(--accent3))' },
  { w: 44, h: 50, gradient: 'linear-gradient(135deg, var(--accent2), var(--accent))' },
  { w: 44, h: 38, gradient: 'linear-gradient(135deg, var(--accent3), var(--accent2))' },
];

function ImagegalleryPreview() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const s = document.createElement('style');
    s.textContent = `
      @keyframes gallery-shimmer {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
      }
    `;
    el.appendChild(s);
    styleRef.current = s;
    return () => { s.remove(); };
  }, []);

  return (
    <div
      ref={containerRef}
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
      {/* Mini masonry grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 50px)',
          gap: 6,
          padding: 8,
        }}
      >
        {GALLERY_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: prefersReduced ? 0 : i * 0.08,
              duration: 0.3,
            }}
            style={{
              width: item.w,
              height: item.h,
              borderRadius: 6,
              background: item.gradient,
              animation: prefersReduced
                ? 'none'
                : `gallery-shimmer ${2.5 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            whileHover={
              prefersReduced
                ? {}
                : {
                    scale: 1.15,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                    zIndex: 10,
                  }
            }
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 11,
          color: 'var(--muted)',
        }}
      >
        גלריית תמונות
      </div>
    </div>
  );
}

export default memo(ImagegalleryPreview);
