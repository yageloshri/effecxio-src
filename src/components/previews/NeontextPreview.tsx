'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const NeontextPreview = memo(function NeontextPreview() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes neon-flicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
          text-shadow:
            0 0 4px var(--accent),
            0 0 11px var(--accent),
            0 0 19px var(--accent),
            0 0 40px var(--accent),
            0 0 80px var(--accent);
          opacity: 1;
        }
        20%, 24%, 55% {
          text-shadow: none;
          opacity: 0.8;
        }
      }

      @keyframes neon-pulse {
        0%, 100% {
          text-shadow:
            0 0 4px var(--accent2),
            0 0 10px var(--accent2),
            0 0 20px var(--accent2),
            0 0 40px var(--accent2);
          opacity: 1;
        }
        50% {
          text-shadow:
            0 0 2px var(--accent2),
            0 0 6px var(--accent2),
            0 0 12px var(--accent2),
            0 0 22px var(--accent2);
          opacity: 0.85;
        }
      }

      @keyframes neon-breathe {
        0%, 100% {
          text-shadow:
            0 0 5px var(--accent3),
            0 0 12px var(--accent3),
            0 0 25px var(--accent3),
            0 0 50px var(--accent3);
        }
        50% {
          text-shadow:
            0 0 2px var(--accent3),
            0 0 5px var(--accent3),
            0 0 10px var(--accent3),
            0 0 20px var(--accent3);
        }
      }

      @keyframes neon-line-glow {
        0%, 100% {
          box-shadow: 0 0 5px var(--accent), 0 0 10px var(--accent);
          opacity: 0.6;
        }
        50% {
          box-shadow: 0 0 15px var(--accent), 0 0 30px var(--accent);
          opacity: 1;
        }
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
        background: '#050508',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        position: 'relative',
      }}
    >
      {/* Main neon text with flicker */}
      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: 'var(--accent)',
          animation: shouldReduceMotion ? 'none' : 'neon-flicker 3s infinite',
          letterSpacing: 2,
          lineHeight: 1.2,
        }}
      >
        ניאון
      </div>

      {/* Secondary neon text with pulse */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--accent2)',
          animation: shouldReduceMotion ? 'none' : 'neon-pulse 2s ease-in-out infinite',
          letterSpacing: 4,
        }}
      >
        אפקט זוהר
      </div>

      {/* Small subtitle with breathe */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: 'var(--accent3)',
          animation: shouldReduceMotion ? 'none' : 'neon-breathe 4s ease-in-out infinite',
          letterSpacing: 3,
        }}
      >
        Effects Lab
      </div>

      {/* Decorative neon lines */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: '10%',
          right: '10%',
          height: 1,
          background: 'var(--accent)',
          opacity: 0.3,
          animation: shouldReduceMotion ? 'none' : 'neon-line-glow 3s ease-in-out infinite',
          borderRadius: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: '10%',
          right: '10%',
          height: 1,
          background: 'var(--accent)',
          opacity: 0.3,
          animation: shouldReduceMotion ? 'none' : 'neon-line-glow 3s ease-in-out infinite 1.5s',
          borderRadius: 1,
        }}
      />
    </div>
  );
});

export default NeontextPreview;
