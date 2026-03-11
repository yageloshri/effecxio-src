'use client';
import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const cards = [
  {
    width: 140,
    height: 100,
    x: 20,
    y: 30,
    rotate: -6,
    bg: 'rgba(200, 245, 59, 0.08)',
    border: 'rgba(200, 245, 59, 0.2)',
    animateY: [30, 18, 30],
    duration: 4,
  },
  {
    width: 130,
    height: 90,
    x: 70,
    y: 55,
    rotate: 4,
    bg: 'rgba(255, 60, 172, 0.08)',
    border: 'rgba(255, 60, 172, 0.2)',
    animateY: [55, 68, 55],
    duration: 5,
  },
  {
    width: 120,
    height: 85,
    x: 45,
    y: 90,
    rotate: -2,
    bg: 'rgba(68, 170, 255, 0.08)',
    border: 'rgba(68, 170, 255, 0.2)',
    animateY: [90, 78, 90],
    duration: 3.5,
  },
];

const GlassPreview = memo(function GlassPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        background: 'var(--surface)',
      }}
    >
      {/* Background gradient blobs */}
      <div
        style={{
          position: 'absolute',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'var(--accent)',
          opacity: 0.12,
          filter: 'blur(40px)',
          top: 10,
          left: 30,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'var(--accent2)',
          opacity: 0.1,
          filter: 'blur(40px)',
          bottom: 10,
          right: 20,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--accent3)',
          opacity: 0.1,
          filter: 'blur(35px)',
          top: 80,
          left: '50%',
        }}
      />

      {/* Glass cards */}
      {cards.map((card, i) => (
        <motion.div
          key={i}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: card.animateY,
                  rotate: [card.rotate, card.rotate + 2, card.rotate],
                }
          }
          transition={{
            duration: card.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: card.width,
            height: card.height,
            left: card.x,
            top: card.y,
            borderRadius: 16,
            background: card.bg,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid ${card.border}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
            padding: 12,
          }}
        >
          <div
            style={{
              width: '60%',
              height: 6,
              borderRadius: 3,
              background: 'var(--text)',
              opacity: 0.2,
            }}
          />
          <div
            style={{
              width: '40%',
              height: 4,
              borderRadius: 2,
              background: 'var(--text)',
              opacity: 0.1,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
});

export default GlassPreview;
