'use client';

import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const SCANLINE_KEYFRAMES = `
@keyframes scanline-flicker {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.06; }
}
@keyframes scanline-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;

function ScanlinesPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = SCANLINE_KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

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
        style={{
          position: 'relative',
          width: '85%',
          maxWidth: 300,
          height: 170,
          borderRadius: 10,
          overflow: 'hidden',
          background: '#0a0a0a',
          border: '2px solid #222',
        }}
      >
        {/* CRT terminal content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '18px 16px',
            fontFamily: "'Courier New', monospace",
            color: '#33ff33', /* classic green terminal */
            fontSize: 11,
            lineHeight: 1.7,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 6, color: '#44ff44' }}>
            {'> SYSTEM ONLINE'}
          </div>
          <div>{'> Scanlines enabled.'}</div>
          <div>{'> Vignette active.'}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {'> Ready.'}
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 12,
                background: '#33ff33',
                marginLeft: 2,
                animation: prefersReduced ? 'none' : 'scanline-blink 1s step-end infinite',
              }}
            />
          </div>
        </div>

        {/* Scanlines overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)',
          }}
        />

        {/* CRT vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 11,
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Subtle flicker */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 12,
            background: '#fff',
            animation: prefersReduced ? 'none' : 'scanline-flicker 0.1s infinite',
            opacity: 0.03,
          }}
        />
      </div>
    </div>
  );
}

export default memo(ScanlinesPreview);
