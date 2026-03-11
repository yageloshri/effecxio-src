'use client';
import { memo, useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const ITEMS = [
  { q: 'מה זה Effects Lab?', a: 'ספריית אפקטים מוכנים לשימוש עם קוד נקי.' },
  { q: 'האם זה בחינם?', a: 'כן, כל האפקטים זמינים בקוד פתוח.' },
  { q: 'איך מתחילים?', a: 'פשוט העתיקו את הקוד לפרויקט שלכם.' },
];

function AccordionsmoothPreview() {
  const prefersReduced = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (prefersReduced) return;
    let idx = 0;
    timerRef.current = setInterval(() => {
      idx = (idx + 1) % (ITEMS.length + 1);
      setOpenIdx(idx < ITEMS.length ? idx : null);
    }, 1800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [prefersReduced]);

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
        direction: 'rtl',
      }}
    >
      <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {ITEMS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              onClick={() => setOpenIdx(isOpen ? null : i)}
              style={{
                borderRadius: 10,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>
                  {item.q}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: 'var(--accent)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: prefersReduced ? 'none' : 'transform 0.3s ease',
                    lineHeight: 1,
                  }}
                >
                  &#9660;
                </span>
              </div>
              {/* Body - CSS grid trick for smooth height */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: prefersReduced ? 'none' : 'grid-template-rows 0.35s ease',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <p
                    style={{
                      fontSize: 11,
                      color: 'var(--muted)',
                      padding: '0 14px 10px',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(AccordionsmoothPreview);
