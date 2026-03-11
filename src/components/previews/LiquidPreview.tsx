'use client';

import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

const LIQUID_KEYFRAMES = `
@keyframes liquid-morph {
  0% { d: path('M25,50 C25,27 27,25 50,25 C73,25 75,27 75,50 C75,73 73,75 50,75 C27,75 25,73 25,50 Z'); }
  25% { d: path('M22,50 C22,30 30,22 50,22 C70,22 78,30 78,50 C78,70 70,78 50,78 C30,78 22,70 22,50 Z'); }
  50% { d: path('M28,48 C26,26 28,24 52,26 C76,28 74,26 72,52 C70,78 72,76 48,74 C24,72 30,70 28,48 Z'); }
  75% { d: path('M24,52 C22,28 26,24 50,22 C74,20 76,26 76,50 C76,74 74,78 50,76 C26,74 26,76 24,52 Z'); }
  100% { d: path('M25,50 C25,27 27,25 50,25 C73,25 75,27 75,50 C75,73 73,75 50,75 C27,75 25,73 25,50 Z'); }
}

@keyframes liquid-turbulence {
  0% { baseFrequency: 0.01; }
  50% { baseFrequency: 0.03; }
  100% { baseFrequency: 0.01; }
}
`;

function LiquidPreview() {
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const rafRef = useRef<number>(0);
  const freqRef = useRef(0.01);
  const targetFreqRef = useRef(0.01);
  const feRef = useRef<SVGFETurbulenceElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = LIQUID_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    targetFreqRef.current = isHovered ? 0.035 : 0.01;
  }, [isHovered]);

  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      freqRef.current += (targetFreqRef.current - freqRef.current) * 0.06;
      if (feRef.current) {
        feRef.current.setAttribute('baseFrequency', `${freqRef.current}`);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleEnter = useCallback(() => setIsHovered(true), []);
  const handleLeave = useCallback(() => setIsHovered(false), []);

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
      {/* SVG filter definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="liquid-goo">
            <feTurbulence
              ref={feRef}
              type="turbulence"
              baseFrequency="0.01"
              numOctaves="3"
              result="turbulence"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={isHovered ? 18 : 6}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <button
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          position: 'relative',
          padding: '16px 44px',
          borderRadius: 14,
          border: '2px solid var(--accent2)',
          background: isHovered ? 'var(--accent2)' : 'transparent',
          color: isHovered ? 'var(--bg)' : 'var(--accent2)',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: 'background 0.4s ease, color 0.4s ease, transform 0.3s ease',
          filter: prefersReduced ? 'none' : 'url(#liquid-goo)',
          willChange: 'filter',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          letterSpacing: 1,
        }}
      >
        Liquid
      </button>
    </div>
  );
}

export default memo(LiquidPreview);
