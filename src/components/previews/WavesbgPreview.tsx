'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const WAVE_KEYFRAMES = `
@keyframes wave-move {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

function WavesbgPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = WAVE_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const waveSvgStyle = (duration: number, reverse?: boolean, opacity?: number): React.CSSProperties => ({
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    width: '200%',
    height: '100%',
    animation: prefersReduced ? 'none' : `wave-move ${duration}s linear infinite${reverse ? ' reverse' : ''}`,
    opacity: opacity ?? 1,
  });

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%)',
      }}
    >
      {/* Label */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          width: '100%',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'var(--text)',
            opacity: 0.5,
          }}
        >
          Waves
        </span>
      </div>

      {/* Waves container */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 100 }}>
        <svg style={waveSvgStyle(8)} viewBox="0 0 2880 200" preserveAspectRatio="none">
          <path
            fill="rgba(200,245,59,0.12)"
            d="M0,100 C360,160 720,40 1080,100 C1260,130 1350,80 1440,100 L1440,200 L0,200Z M1440,100 C1800,160 2160,40 2520,100 C2700,130 2790,80 2880,100 L2880,200 L1440,200Z"
          />
        </svg>
        <svg style={waveSvgStyle(12, true, 0.7)} viewBox="0 0 2880 200" preserveAspectRatio="none">
          <path
            fill="rgba(68,170,255,0.1)"
            d="M0,120 C240,50 480,170 720,100 C960,30 1200,150 1440,120 L1440,200 L0,200Z M1440,120 C1680,50 1920,170 2160,100 C2400,30 2640,150 2880,120 L2880,200 L1440,200Z"
          />
        </svg>
        <svg style={waveSvgStyle(16, false, 0.5)} viewBox="0 0 2880 200" preserveAspectRatio="none">
          <path
            fill="rgba(255,60,172,0.08)"
            d="M0,140 C480,70 960,170 1440,140 L1440,200 L0,200Z M1440,140 C1920,70 2400,170 2880,140 L2880,200 L1440,200Z"
          />
        </svg>
      </div>
    </div>
  );
}

export default memo(WavesbgPreview);
