'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 140,
        paddingBottom: 80,
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Animated grid background */}
      <style>{`
        @keyframes grid-move {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 60px 60px;
          }
        }
        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: grid-move 20s linear infinite;
          pointer-events: none;
        }
        .hero-grid-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 0%, var(--bg) 70%);
          pointer-events: none;
        }
      `}</style>
      <div className="hero-grid-bg" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
          style={{
            border: '1px solid var(--border)',
            background: 'rgba(17, 17, 17, 0.8)',
          }}
        >
          <span
            className="relative flex h-2 w-2"
          >
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{
                background: 'var(--accent)',
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
              }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: 'var(--accent)' }}
            />
          </span>
          <span
            style={{
              color: 'var(--muted)',
              fontSize: 14,
              fontFamily: "'Heebo', sans-serif",
            }}
          >
            110 אפקטים מוכנים לשימוש
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6"
          style={{ fontFamily: "'Heebo', sans-serif" }}
        >
          <span style={{ color: 'var(--text)' }}>תפסיק לבנות</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            אתרים גנריים
          </span>
        </motion.h1>

        {/* Stats line */}
        <motion.p
          variants={itemVariants}
          style={{
            color: 'var(--muted)',
            fontSize: 15,
            fontFamily: "'Space Mono', monospace",
            letterSpacing: '0.5px',
          }}
        >
          110 אפקטים&nbsp;&nbsp;|&nbsp;&nbsp;0 ספריות חיצוניות&nbsp;&nbsp;|&nbsp;&nbsp;100% CSS / JS טהור
        </motion.p>
      </motion.div>
    </section>
  );
}
