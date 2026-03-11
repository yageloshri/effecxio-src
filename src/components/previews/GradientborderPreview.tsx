'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const GradientborderPreview = memo(function GradientborderPreview() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes gradient-border-spin {
        0% { --gradient-angle: 0deg; }
        100% { --gradient-angle: 360deg; }
      }

      @property --gradient-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }

      .gradient-border-card {
        position: relative;
        border-radius: 20px;
        overflow: visible;
      }

      .gradient-border-card::before {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: 22px;
        padding: 2px;
        background: conic-gradient(
          from var(--gradient-angle, 0deg),
          var(--accent) 0%,
          var(--accent2) 25%,
          var(--accent3) 50%,
          var(--accent2) 75%,
          var(--accent) 100%
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: gradient-border-spin 3s linear infinite;
      }

      .gradient-border-card-inner {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        background: var(--surface);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      @keyframes gradient-border-shimmer {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.7; }
      }

      /* Fallback for browsers without @property */
      @supports not (background: conic-gradient(from 0deg, red, blue)) {
        .gradient-border-card::before {
          background: linear-gradient(
            45deg,
            var(--accent),
            var(--accent2),
            var(--accent3),
            var(--accent)
          );
          background-size: 300% 300%;
          animation: gradient-border-fallback 3s linear infinite;
        }
      }

      @keyframes gradient-border-fallback {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    el.appendChild(styleEl);

    return () => {
      styleEl.remove();
    };
  }, []);

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
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="gradient-border-card"
        style={{
          width: 190,
          height: 140,
        }}
      >
        {/* Inner card content */}
        <div className="gradient-border-card-inner">
          {/* Icon placeholder */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              opacity: 0.6,
              animation: shouldReduceMotion ? 'none' : 'gradient-border-shimmer 3s ease-in-out infinite',
            }}
          />

          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--text)',
            }}
          >
            גבול מונפש
          </div>

          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              textAlign: 'center',
              padding: '0 16px',
              lineHeight: 1.4,
            }}
          >
            גרדיאנט מסתובב
          </div>
        </div>
      </div>
    </div>
  );
});

export default GradientborderPreview;
