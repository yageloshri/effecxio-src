'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const WORDS = ['אתרים', 'מוצרים', 'חלומות', 'חוויות', 'עתידות'];

function FlipwordPreview() {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 14,
          color: 'var(--muted)',
        }}
      >
        אנחנו בונים
      </div>
      <div
        style={{
          position: 'relative',
          height: 56,
          minWidth: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: 600,
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={WORDS[index]}
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { rotateX: -90, opacity: 0 }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { rotateX: 0, opacity: 1 }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { rotateX: 90, opacity: 0 }
            }
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              fontSize: 36,
              fontWeight: 900,
              color: 'var(--accent)',
              backfaceVisibility: 'hidden',
            }}
          >
            {WORDS[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default memo(FlipwordPreview);
