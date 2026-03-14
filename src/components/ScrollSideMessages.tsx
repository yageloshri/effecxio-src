'use client';

import { useEffect, useRef, useCallback } from 'react';

const LEFT_MESSAGES = [
  'זו רק ההתחלה',
  'יש לכם עוד למטה',
  'מה חשבתם שנגמר?',
  'תגללו',
];

const RIGHT_MESSAGES = [
  'keep going',
  'copy. paste. done.',
  'no libraries needed',
  'almost there',
];

function Arrow() {
  return (
    <svg
      width="14"
      height="22"
      viewBox="0 0 14 22"
      fill="none"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <line
        x1="7" y1="0" x2="7" y2="17"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      />
      <polyline
        points="1,12 7,19 13,12"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

function SideColumn({
  messages,
  side,
}: {
  messages: string[];
  side: 'left' | 'right';
}) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const isLeft = side === 'left';

  const update = useCallback(() => {
    const scrollY = window.scrollY;
    // Start only after the filter bar (≈ 1 viewport height)
    const startOffset = window.innerHeight;
    const maxScroll = Math.max(
      document.body.scrollHeight - window.innerHeight,
      1,
    );
    const raw = (scrollY - startOffset) / (maxScroll - startOffset);
    const progress = Math.max(0, Math.min(1, raw)); // 0 → 1, clamped

    messages.forEach((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return;

      // Each message is triggered at a different scroll position
      const trigger = i / messages.length;
      const fadeInEnd = trigger + 0.04;
      const fadeOutStart = trigger + 0.12;
      const end = trigger + 0.18;

      let opacity = 0;
      let translateY = 0;

      if (progress < trigger) {
        opacity = 0;
        translateY = 28;
      } else if (progress < fadeInEnd) {
        const t = (progress - trigger) / (fadeInEnd - trigger);
        opacity = t;
        translateY = 28 * (1 - t);
      } else if (progress < fadeOutStart) {
        opacity = 1;
        translateY = 0;
      } else if (progress < end) {
        const t = (progress - fadeOutStart) / (end - fadeOutStart);
        opacity = 1 - t;
        translateY = -t * 20;
      } else {
        opacity = 0;
        translateY = -20;
      }

      el.style.opacity = String(Math.max(0, Math.min(1, opacity)));
      el.style.transform = `translateY(${translateY}px)`;
    });
  }, [messages]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = undefined;
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        [side]: 0,
        width: 'calc((100vw - 1360px) / 2)',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 30,
      }}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            opacity: 0,
            transform: 'translateY(28px)',
            willChange: 'opacity, transform',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            color: '#ffffff',
            fontSize: 14,
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            whiteSpace: 'nowrap',
            direction: isLeft ? 'rtl' : 'ltr',
          }}
        >
          {msg}
          <span style={{ color: '#c8f53b', opacity: 0.8 }}>
            <Arrow />
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ScrollSideMessages() {
  return (
    <>
      <style>{`
        @media (max-width: 1720px) {
          .scroll-side-left,
          .scroll-side-right {
            display: none !important;
          }
        }
      `}</style>

      <div className="scroll-side-left">
        <SideColumn messages={LEFT_MESSAGES} side="left" />
      </div>
      <div className="scroll-side-right">
        <SideColumn messages={RIGHT_MESSAGES} side="right" />
      </div>
    </>
  );
}
