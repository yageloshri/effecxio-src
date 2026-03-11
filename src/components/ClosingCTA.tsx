'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Effect } from '@/types';
import previewMap from '@/components/previews';

interface ClosingCTAProps {
  effects: Effect[];
}

export default function ClosingCTA({ effects }: ClosingCTAProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * effects.length)
  );

  useEffect(() => {
    if (prefersReducedMotion || effects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % effects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, effects.length]);

  const currentEffect = effects[currentIndex];
  if (!currentEffect) return null;

  const PreviewComponent = previewMap[currentEffect.previewComponent];

  return (
    <section
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      {/* Gradient divider */}
      <div
        style={{
          width: '60%',
          height: 1,
          margin: '0 auto 48px',
          background: 'linear-gradient(90deg, var(--accent) 0%, transparent 100%)',
          opacity: 0.3,
        }}
      />

      {/* Headline */}
      <h2
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: "'Heebo', sans-serif",
          color: '#fff',
          marginBottom: 32,
        }}
      >
        מה, עדיין לא העתקת כלום?
      </h2>

      {/* Mini preview */}
      <div
        style={{
          width: 300,
          height: 200,
          margin: '0 auto 32px',
          borderRadius: 12,
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {prefersReducedMotion ? (
          PreviewComponent ? (
            <Suspense
              fallback={
                <div
                  className="animate-pulse"
                  style={{ background: 'var(--surface)', height: '100%' }}
                />
              }
            >
              <PreviewComponent />
            </Suspense>
          ) : null
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEffect.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%' }}
            >
              {PreviewComponent ? (
                <Suspense
                  fallback={
                    <div
                      className="animate-pulse"
                      style={{ background: 'var(--surface)', height: '100%' }}
                    />
                  }
                >
                  <PreviewComponent />
                </Suspense>
              ) : null}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* CTA button */}
      <button
        onClick={() => {
          const target = document.getElementById('featured');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="rounded-full"
        style={{
          paddingInline: 32,
          paddingBlock: 12,
          background: 'var(--accent)',
          color: '#111',
          fontFamily: "'Heebo', sans-serif",
          fontSize: 16,
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
          transition: 'filter 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.15)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)';
        }}
      >
        בחר אפקט והתחל
      </button>
    </section>
  );
}
