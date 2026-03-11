'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const PHRASES = [
  'Effects Lab — כל האפקטים במקום אחד',
  'קוד נקי. אנימציה חלקה.',
  'העתק. הדבק. תהנה.',
];

const TYPE_SPEED = 65;
const DELETE_SPEED = 35;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 500;

function TypewriterPreview() {
  const prefersReduced = useReducedMotion();
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const phrase = PHRASES[phraseIdx];

    if (!isDeleting) {
      if (displayed.length < phrase.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(phrase.slice(0, displayed.length + 1));
        }, TYPE_SPEED);
      } else {
        timerRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        timerRef.current = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % PHRASES.length);
        }, PAUSE_AFTER_DELETE);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [displayed, isDeleting, phraseIdx, prefersReduced]);

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
        padding: '0 24px',
      }}
    >
      <div
        style={{
          direction: 'rtl',
          fontFamily: "'Space Mono', monospace",
          fontSize: 16,
          color: 'var(--text)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          minHeight: 28,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span>{prefersReduced ? PHRASES[0] : displayed}</span>
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: '1.2em',
            background: 'var(--accent)',
            marginRight: 2,
            animation: 'cursor-blink 1s step-end infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default memo(TypewriterPreview);
