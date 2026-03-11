'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const KEYFRAMES = `
@keyframes followeyes-cursor {
  0%   { left: 20%; top: 50%; }
  12%  { left: 70%; top: 25%; }
  25%  { left: 85%; top: 60%; }
  37%  { left: 50%; top: 80%; }
  50%  { left: 15%; top: 65%; }
  62%  { left: 35%; top: 20%; }
  75%  { left: 80%; top: 45%; }
  87%  { left: 55%; top: 75%; }
  100% { left: 20%; top: 50%; }
}
@keyframes followeyes-pupil-x {
  0%   { --px: -8px; }
  12%  { --px: 10px; }
  25%  { --px: 12px; }
  37%  { --px: 2px; }
  50%  { --px: -10px; }
  62%  { --px: -4px; }
  75%  { --px: 10px; }
  87%  { --px: 4px; }
  100% { --px: -8px; }
}
`;

/* Since CSS @property for custom properties may not work everywhere,
   we approximate pupil movement with separate x/y keyframes for each eye */
const PUPIL_ANIM = `
@keyframes followeyes-pupil-left {
  0%   { transform: translate(-6px, 0); }
  12%  { transform: translate(8px, -6px); }
  25%  { transform: translate(10px, 3px); }
  37%  { transform: translate(2px, 8px); }
  50%  { transform: translate(-8px, 4px); }
  62%  { transform: translate(-3px, -8px); }
  75%  { transform: translate(9px, -1px); }
  87%  { transform: translate(3px, 6px); }
  100% { transform: translate(-6px, 0); }
}
@keyframes followeyes-pupil-right {
  0%   { transform: translate(-10px, 0); }
  12%  { transform: translate(6px, -7px); }
  25%  { transform: translate(10px, 2px); }
  37%  { transform: translate(0px, 7px); }
  50%  { transform: translate(-10px, 3px); }
  62%  { transform: translate(-5px, -9px); }
  75%  { transform: translate(8px, -2px); }
  87%  { transform: translate(2px, 5px); }
  100% { transform: translate(-10px, 0); }
}
`;

function FolloweyesPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = KEYFRAMES + PUPIL_ANIM;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const eyeStyle: React.CSSProperties = {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'radial-gradient(circle, #f0f0f0 60%, #d0d0d0 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.2), 0 0 20px rgba(200,245,59,0.06)',
    position: 'relative',
    overflow: 'hidden',
  };

  const pupilBase: React.CSSProperties = {
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #333 50%, #111 100%)',
    position: 'relative',
    willChange: 'transform',
  };

  const pupilHighlight: React.CSSProperties = {
    position: 'absolute',
    top: 4,
    left: 5,
    width: 6,
    height: 6,
    background: '#fff',
    borderRadius: '50%',
  };

  const eyeShine: React.CSSProperties = {
    position: 'absolute',
    top: 5,
    left: '25%',
    width: '50%',
    height: 10,
    background: 'rgba(255,255,255,0.4)',
    borderRadius: '50%',
    filter: 'blur(4px)',
  };

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left eye */}
      <div style={eyeStyle}>
        <div style={eyeShine} />
        <div
          style={{
            ...pupilBase,
            animation: prefersReduced ? 'none' : 'followeyes-pupil-left 7s ease-in-out infinite',
          }}
        >
          <div style={pupilHighlight} />
        </div>
      </div>

      {/* Right eye */}
      <div style={eyeStyle}>
        <div style={eyeShine} />
        <div
          style={{
            ...pupilBase,
            animation: prefersReduced ? 'none' : 'followeyes-pupil-right 7s ease-in-out infinite',
          }}
        >
          <div style={pupilHighlight} />
        </div>
      </div>

      <span
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 12,
          color: 'var(--muted)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      >
        Follow Eyes
      </span>
    </div>
  );
}

export default memo(FolloweyesPreview);
