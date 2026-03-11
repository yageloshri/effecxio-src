'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLITCH_KEYFRAMES = `
@keyframes glitch-1 {
  0% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 2px); }
  10% { clip-path: inset(50% 0 10% 0); transform: translate(3px, -1px); }
  20% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 3px); }
  30% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -3px); }
  40% { clip-path: inset(5% 0 85% 0); transform: translate(-1px, 1px); }
  50% { clip-path: inset(60% 0 20% 0); transform: translate(3px, 2px); }
  60% { clip-path: inset(30% 0 50% 0); transform: translate(-3px, -2px); }
  70% { clip-path: inset(70% 0 10% 0); transform: translate(1px, 3px); }
  80% { clip-path: inset(15% 0 65% 0); transform: translate(-2px, -1px); }
  90% { clip-path: inset(45% 0 35% 0); transform: translate(2px, 1px); }
  100% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 2px); }
}

@keyframes glitch-2 {
  0% { clip-path: inset(65% 0 10% 0); transform: translate(3px, -2px); }
  10% { clip-path: inset(10% 0 75% 0); transform: translate(-3px, 1px); }
  20% { clip-path: inset(40% 0 30% 0); transform: translate(2px, -3px); }
  30% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, 3px); }
  40% { clip-path: inset(75% 0 5% 0); transform: translate(1px, -1px); }
  50% { clip-path: inset(25% 0 55% 0); transform: translate(-3px, -2px); }
  60% { clip-path: inset(55% 0 25% 0); transform: translate(3px, 2px); }
  70% { clip-path: inset(15% 0 70% 0); transform: translate(-1px, -3px); }
  80% { clip-path: inset(85% 0 5% 0); transform: translate(2px, 1px); }
  90% { clip-path: inset(35% 0 45% 0); transform: translate(-2px, -1px); }
  100% { clip-path: inset(65% 0 10% 0); transform: translate(3px, -2px); }
}

@keyframes glitch-skew {
  0% { transform: skew(0deg); }
  20% { transform: skew(-2deg); }
  40% { transform: skew(0.5deg); }
  60% { transform: skew(-0.5deg); }
  80% { transform: skew(1.5deg); }
  100% { transform: skew(0deg); }
}
`;

function GlitchPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = GLITCH_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const baseStyle: React.CSSProperties = {
    fontSize: 48,
    fontWeight: 900,
    fontFamily: "'Space Mono', monospace",
    color: 'var(--text)',
    letterSpacing: 6,
    position: 'relative',
    display: 'inline-block',
    animation: prefersReduced ? 'none' : 'glitch-skew 4s infinite linear alternate',
  };

  const pseudoBase: React.CSSProperties = {
    content: '"GLITCH"',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fontSize: 48,
    fontWeight: 900,
    fontFamily: "'Space Mono', monospace",
    letterSpacing: 6,
    pointerEvents: 'none',
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
      <div style={{ position: 'relative' }}>
        <span style={baseStyle}>GLITCH</span>

        {/* Before pseudo-element */}
        <span
          aria-hidden
          style={{
            ...pseudoBase,
            color: 'var(--accent2)',
            animation: prefersReduced ? 'none' : 'glitch-1 0.7s infinite linear alternate-reverse',
            mixBlendMode: 'screen',
          }}
        >
          GLITCH
        </span>

        {/* After pseudo-element */}
        <span
          aria-hidden
          style={{
            ...pseudoBase,
            color: 'var(--accent3)',
            animation: prefersReduced ? 'none' : 'glitch-2 0.5s infinite linear alternate-reverse',
            mixBlendMode: 'screen',
          }}
        >
          GLITCH
        </span>
      </div>
    </div>
  );
}

export default memo(GlitchPreview);
