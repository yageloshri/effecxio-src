'use client';
import { memo, useState, useEffect, useRef, useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePreviewState } from '@/context/PreviewStateContext';

function DistortimagePreview() {
  const prefersReduced = useReducedMotion();
  const previewState = usePreviewState();
  const [hovered, setHovered] = useState(false);
  const filterId = useId();
  const seedRef = useRef(1);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  /* Auto-toggle hover for preview animation */
  useEffect(() => {
    if (prefersReduced) return;
    if (previewState !== 'active') {
      clearInterval(autoTimerRef.current);
      return;
    }
    autoTimerRef.current = setInterval(() => {
      setHovered((p) => !p);
    }, 2000);
    return () => clearInterval(autoTimerRef.current);
  }, [prefersReduced, previewState]);

  /* Animate seed when hovered */
  useEffect(() => {
    if (!hovered || prefersReduced) {
      clearInterval(intervalRef.current);
      return;
    }
    if (previewState !== 'active') {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      seedRef.current = (seedRef.current % 50) + 1;
      if (turbRef.current) {
        turbRef.current.setAttribute('seed', String(seedRef.current));
      }
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [hovered, prefersReduced, previewState]);

  const cleanId = filterId.replace(/:/g, '_');

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
      {/* SVG filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id={cleanId}>
          <feTurbulence
            ref={turbRef}
            type="turbulence"
            baseFrequency="0.025"
            numOctaves={3}
            seed={1}
            result="turb"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turb"
            scale={hovered && !prefersReduced ? 18 : 0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        style={{
          width: 140,
          height: 160,
          borderRadius: 14,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          filter: hovered && !prefersReduced ? `url(#${cleanId})` : 'none',
          transition: prefersReduced ? 'none' : 'filter 0.3s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2) 50%, var(--accent3))',
          }}
        />
        {/* Grid lines for visible distortion */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          fontSize: 11,
          color: 'var(--muted)',
        }}
      >
        עיוות תמונה
      </div>
    </div>
  );
}

export default memo(DistortimagePreview);
