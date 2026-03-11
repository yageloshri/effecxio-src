'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const leftItems = [
  { text: 'עיצוב', color: 'var(--accent)' },
  { text: 'פיתוח', color: 'var(--accent2)' },
  { text: 'אנימציה', color: 'var(--accent3)' },
  { text: 'חוויה', color: 'var(--accent)' },
  { text: 'ביצועים', color: 'var(--accent2)' },
  { text: 'נגישות', color: 'var(--accent3)' },
];

const rightItems = [
  { text: 'React', opacity: 0.9 },
  { text: 'TypeScript', opacity: 0.7 },
  { text: 'Framer Motion', opacity: 0.8 },
  { text: 'Tailwind CSS', opacity: 0.6 },
  { text: 'Next.js', opacity: 0.9 },
  { text: 'CSS Vars', opacity: 0.7 },
];

// Duplicate for seamless loop
const leftDuped = [...leftItems, ...leftItems, ...leftItems];
const rightDuped = [...rightItems, ...rightItems, ...rightItems];

const SplitscrollPreview = memo(function SplitscrollPreview() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef({ left: 0, right: 0 });

  useEffect(() => {
    const el = containerRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!el || !leftCol || !rightCol || shouldReduceMotion) return;

    const leftSpeed = 0.4;
    const rightSpeed = 0.7;

    const animate = () => {
      offsetRef.current.left += leftSpeed;
      offsetRef.current.right += rightSpeed;

      // Reset for seamless loop: each item block is about 1/3 of the total
      const leftHeight = leftCol.scrollHeight / 3;
      const rightHeight = rightCol.scrollHeight / 3;

      if (offsetRef.current.left >= leftHeight) {
        offsetRef.current.left -= leftHeight;
      }
      if (offsetRef.current.right >= rightHeight) {
        offsetRef.current.right -= rightHeight;
      }

      leftCol.style.transform = `translateY(-${offsetRef.current.left}px)`;
      rightCol.style.transform = `translateY(-${offsetRef.current.right}px)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 220,
        overflow: 'hidden',
        borderRadius: 12,
        background: 'var(--surface)',
        display: 'flex',
        position: 'relative',
      }}
    >
      {/* Fade overlays */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 40,
          background: 'linear-gradient(to bottom, var(--surface), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          background: 'linear-gradient(to top, var(--surface), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Center divider */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 20,
          bottom: 20,
          width: 1,
          background: 'var(--muted)',
          opacity: 0.2,
          zIndex: 3,
        }}
      />

      {/* Left column - scrolls slower */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div ref={leftColRef} style={{ willChange: 'transform' }}>
          {leftDuped.map((item, i) => (
            <div
              key={`l-${i}`}
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                direction: 'rtl',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: item.color,
                  flexShrink: 0,
                  boxShadow: `0 0 6px ${item.color}`,
                }}
              />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--text)',
                  opacity: 0.85,
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right column - scrolls faster */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div ref={rightColRef} style={{ willChange: 'transform' }}>
          {rightDuped.map((item, i) => (
            <div
              key={`r-${i}`}
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                direction: 'ltr',
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--text)',
                  opacity: item.opacity,
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SplitscrollPreview;
