'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Bubble {
  text: string;
  emoji: string;
  originX: number;
  originY: number;
  size: 'sm' | 'md' | 'lg';
  tail: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const BUBBLES: Bubble[] = [
  // Bottom center — below content
  { text: 'שיפור נראות האתר בקלות',   emoji: '★',   originX: 42, originY: 88, size: 'lg', tail: 'top-left' },
  // Upper pair — pushed to edges
  { text: '110 אפקטים מוכנים',       emoji: '✦',   originX: 4,  originY: 18, size: 'md', tail: 'bottom-right' },
  { text: 'הכל ב״העתק הדבק״',        emoji: '⌘',   originX: 84, originY: 18, size: 'md', tail: 'bottom-left' },
  // Lower pair — pushed to edges
  { text: 'מושלם לוויב קודרים',       emoji: '</>', originX: 2,  originY: 52, size: 'md', tail: 'top-right' },
  { text: '0 כאבי ראש',              emoji: '◈',   originX: 86, originY: 52, size: 'md', tail: 'top-left' },
];

const SIZE_STYLES = {
  sm: { fontSize: 11, padding: '8px 14px',  maxWidth: 130 },
  md: { fontSize: 12, padding: '10px 16px', maxWidth: 170 },
  lg: { fontSize: 13, padding: '11px 18px', maxWidth: 220 },
};

function BubbleTail({ direction }: { direction: Bubble['tail'] }) {
  const tails: Record<Bubble['tail'], React.ReactNode> = {
    'bottom-right': (
      <svg width="22" height="16" viewBox="0 0 22 16"
        style={{ position: 'absolute', bottom: -14, right: 20, display: 'block' }}>
        <path d="M0,0 Q9,0 13,8 Q15,14 22,16 Q11,14 4,6 Q0,4 0,0Z" fill="#ffffff" />
      </svg>
    ),
    'bottom-left': (
      <svg width="22" height="16" viewBox="0 0 22 16"
        style={{ position: 'absolute', bottom: -14, left: 20, display: 'block' }}>
        <path d="M22,0 Q13,0 9,8 Q7,14 0,16 Q11,14 18,6 Q22,4 22,0Z" fill="#ffffff" />
      </svg>
    ),
    'top-right': (
      <svg width="22" height="16" viewBox="0 0 22 16"
        style={{ position: 'absolute', top: -14, right: 20, display: 'block' }}>
        <path d="M0,16 Q9,16 13,8 Q15,2 22,0 Q11,2 4,10 Q0,12 0,16Z" fill="#ffffff" />
      </svg>
    ),
    'top-left': (
      <svg width="22" height="16" viewBox="0 0 22 16"
        style={{ position: 'absolute', top: -14, left: 20, display: 'block' }}>
        <path d="M22,16 Q13,16 9,8 Q7,2 0,0 Q11,2 18,10 Q22,12 22,16Z" fill="#ffffff" />
      </svg>
    ),
  };
  return <>{tails[direction]}</>;
}

function ThoughtDots({ tail }: { tail: Bubble['tail'] }) {
  const configs: Record<Bubble['tail'], { left: number; top: string | number; size: number }[]> = {
    'bottom-right': [
      { left: 24, top: '100%', size: 5 },
      { left: 34, top: 'calc(100% + 8px)', size: 3 },
    ],
    'bottom-left': [
      { left: -10, top: '100%', size: 5 },
      { left: -16, top: 'calc(100% + 8px)', size: 3 },
    ],
    'top-right': [
      { left: 24, top: -10, size: 5 },
      { left: 34, top: -16, size: 3 },
    ],
    'top-left': [
      { left: -10, top: -10, size: 5 },
      { left: -16, top: -16, size: 3 },
    ],
  };

  return (
    <>
      {configs[tail].map((dot, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

function ThoughtBubble({
  bubble,
  mousePos,
  containerRef,
}: {
  bubble: Bubble;
  mousePos: React.RefObject<{ x: number; y: number }>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: bubble.originX, y: bubble.originY });
  const velRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const loop = () => {
      const el = elRef.current;
      const container = containerRef.current;
      if (!el || !container) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const cRect = container.getBoundingClientRect();
      const cW = cRect.width;
      const cH = cRect.height;

      const mx = ((mousePos.current.x - cRect.left) / cW) * 100;
      const my = ((mousePos.current.y - cRect.top) / cH) * 100;

      const pos = posRef.current;
      const vel = velRef.current;

      const dx = pos.x - mx;
      const dy = pos.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const REPULSION_RADIUS = 15;

      if (dist < REPULSION_RADIUS && dist > 0.01) {
        const force = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) * 2.4;
        vel.x += (dx / dist) * force;
        vel.y += (dy / dist) * force;
      }

      vel.x += (bubble.originX - pos.x) * 0.055;
      vel.y += (bubble.originY - pos.y) * 0.055;

      vel.x *= 0.78;
      vel.y *= 0.78;

      pos.x += vel.x;
      pos.y += vel.y;

      const bwPct = (el.offsetWidth / cW) * 100;
      const bhPct = (el.offsetHeight / cH) * 100;
      pos.x = Math.max(0, Math.min(100 - bwPct, pos.x));
      pos.y = Math.max(0, Math.min(100 - bhPct, pos.y));

      const isNear = dist < REPULSION_RADIUS;
      const targetScale = isNear ? 1.07 : 1;
      scaleRef.current += (targetScale - scaleRef.current) * 0.1;

      el.style.left = (pos.x / 100) * cW + 'px';
      el.style.top = (pos.y / 100) * cH + 'px';
      el.style.transform = `scale(${scaleRef.current})`;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [bubble, containerRef, mousePos]);

  const s = SIZE_STYLES[bubble.size];

  return (
    <div
      ref={elRef}
      style={{
        position: 'absolute',
        top: `${bubble.originY}%`,
        left: `${bubble.originX}%`,
        pointerEvents: 'none',
        userSelect: 'none',
        willChange: 'left, top, transform',
        zIndex: 10,
      }}
    >
      <ThoughtDots tail={bubble.tail} />

      <div
        style={{
          position: 'relative',
          background: '#ffffff',
          borderRadius: 16,
          padding: s.padding,
          maxWidth: s.maxWidth,
          boxShadow: '0 4px 24px rgba(0,0,0,0.28), 0 1px 6px rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          direction: 'rtl',
        }}
      >
        <BubbleTail direction={bubble.tail} />

        <span
          style={{
            color: '#111111',
            fontSize: s.fontSize + 2,
            fontFamily: 'monospace',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          {bubble.emoji}
        </span>

        <span
          style={{
            fontSize: s.fontSize,
            fontWeight: 700,
            color: '#111111',
            fontFamily: "'Heebo', sans-serif",
            lineHeight: 1.3,
            whiteSpace: 'normal',
          }}
        >
          {bubble.text}
        </span>
      </div>
    </div>
  );
}

interface FloatingBadgesProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const MIN_WIDTH = 1300;

export default function FloatingBadges({ containerRef }: FloatingBadgesProps) {
  const mousePos = useRef({ x: -9999, y: -9999 });
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const check = () => setWide(window.innerWidth >= MIN_WIDTH);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!wide) return null;

  return (
    <>
      {BUBBLES.map((bubble, i) => (
        <ThoughtBubble
          key={i}
          bubble={bubble}
          mousePos={mousePos}
          containerRef={containerRef}
        />
      ))}
    </>
  );
}
