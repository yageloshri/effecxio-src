'use client';

import { memo, useEffect, useState, useRef } from 'react';
import { useReducedMotion, motion, AnimatePresence, type Variants } from 'framer-motion';

const WORD_SETS = [
  ['ברוכים', 'הבאים', 'לעולם', 'האפקטים'],
  ['עיצוב', 'שמרגיש', 'חי', 'ונושם'],
  ['כל', 'מילה', 'נכנסת', 'בסטייל'],
];

const CYCLE_DURATION = 3500;

function RevealPreview() {
  const prefersReduced = useReducedMotion();
  const [setIndex, setSetIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSetIndex((prev) => (prev + 1) % WORD_SETS.length);
    }, CYCLE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const words = WORD_SETS[setIndex];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.15,
      },
    },
    exit: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.08,
        staggerDirection: -1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReduced ? 0 : 20,
      filter: prefersReduced ? 'none' : 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      y: prefersReduced ? 0 : -15,
      filter: prefersReduced ? 'none' : 'blur(4px)',
      transition: { duration: 0.3, ease: 'easeIn' as const },
    },
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
      <AnimatePresence mode="wait">
        <motion.div
          key={setIndex}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            display: 'flex',
            gap: 12,
            flexDirection: 'row',
            direction: 'rtl',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 20px',
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={`${setIndex}-${i}`}
              variants={wordVariants}
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: i === words.length - 1 ? 'var(--accent)' : 'var(--text)',
                lineHeight: 1.3,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default memo(RevealPreview);
