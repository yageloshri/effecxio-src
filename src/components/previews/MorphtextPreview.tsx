'use client';
import { memo, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const words = ['יצירתיות', 'חדשנות', 'עיצוב', 'קוד', 'אנימציה'];

const MorphtextPreview = memo(function MorphtextPreview() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
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
        overflow: 'hidden',
        borderRadius: 12,
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 14,
          color: 'var(--muted)',
          letterSpacing: 1,
        }}
      >
        העתיד הוא
      </div>

      <div
        style={{
          position: 'relative',
          height: 60,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={words[index]}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.9 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -30, filter: 'blur(8px)', scale: 0.9 }
            }
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              fontSize: 36,
              fontWeight: 900,
              background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.3,
            }}
          >
            {words[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Word indicator dots */}
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        {words.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === index ? 1.3 : 1,
              opacity: i === index ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: i === index ? 'var(--accent)' : 'var(--muted)',
            }}
          />
        ))}
      </div>
    </div>
  );
});

export default MorphtextPreview;
