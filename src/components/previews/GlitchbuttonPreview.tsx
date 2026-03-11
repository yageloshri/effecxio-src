'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLITCH_BTN_KEYFRAMES = `
@keyframes preview-glitch-r {
  0%   { clip-path: inset(20% 0 40% 0); transform: translate(-4px, 2px); }
  25%  { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); }
  50%  { clip-path: inset(10% 0 70% 0); transform: translate(-3px, -1px); }
  75%  { clip-path: inset(50% 0 20% 0); transform: translate(3px, 1px); }
  100% { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 3px); }
}
@keyframes preview-glitch-b {
  0%   { clip-path: inset(50% 0 20% 0); transform: translate(4px, -1px); }
  25%  { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 2px); }
  50%  { clip-path: inset(70% 0 5% 0); transform: translate(3px, 1px); }
  75%  { clip-path: inset(30% 0 40% 0); transform: translate(-3px, -2px); }
  100% { clip-path: inset(5% 0 75% 0); transform: translate(2px, -3px); }
}
@keyframes preview-glitch-skew {
  0%   { transform: skew(0deg); }
  25%  { transform: skew(-2deg); }
  50%  { transform: skew(1deg); }
  75%  { transform: skew(-1deg); }
  100% { transform: skew(0deg); }
}
`;

function GlitchbuttonPreview() {
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = GLITCH_BTN_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const showGlitch = isHovered && !prefersReduced;

  const pseudoBase: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 3,
    fontFamily: "'Courier New', monospace",
    overflow: 'hidden',
    pointerEvents: 'none',
    opacity: showGlitch ? 0.8 : 0,
    background: 'var(--surface)',
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
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          padding: '14px 44px',
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: 3,
          fontFamily: "'Courier New', monospace",
          color: 'var(--text)',
          background: 'var(--surface)',
          border: `2px solid var(--border)`,
          cursor: 'pointer',
          textTransform: 'uppercase' as const,
          animation: showGlitch ? 'preview-glitch-skew 0.5s steps(4) infinite' : 'none',
        }}
      >
        GLITCH
        {/* Cyan layer */}
        <span
          aria-hidden
          style={{
            ...pseudoBase,
            color: '#0ff',
            borderLeft: '2px solid #0ff',
            borderRight: '2px solid #0ff',
            animation: showGlitch ? 'preview-glitch-r 0.3s steps(2) infinite' : 'none',
          }}
        >
          GLITCH
        </span>
        {/* Magenta layer */}
        <span
          aria-hidden
          style={{
            ...pseudoBase,
            color: '#f0f',
            borderLeft: '2px solid #f0f',
            borderRight: '2px solid #f0f',
            animation: showGlitch ? 'preview-glitch-b 0.3s steps(2) infinite' : 'none',
          }}
        >
          GLITCH
        </span>
      </div>
    </div>
  );
}

export default memo(GlitchbuttonPreview);
