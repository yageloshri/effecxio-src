'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ScrollIndicator from '@/components/ScrollIndicator';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

function scrollToFeatured() {
  const el = document.getElementById('featured');
  el?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── CSS-only atmospheric animations ── */}
      <style>{`
        /* Aurora color shift */
        @keyframes aurora-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Grid line movement */
        @keyframes grid-move {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 60px 60px;
          }
        }

        /* Floating particles */
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-40vh) translateX(20px);
          }
          100% {
            transform: translateY(-80vh) translateX(-10px);
            opacity: 0;
          }
        }

        /* Gradient title animation */
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* ── Aurora background ── */
        .hero-aurora {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hero-aurora::before {
          content: '';
          position: absolute;
          inset: -50%;
          background: radial-gradient(
            ellipse at 30% 50%,
            rgba(200, 245, 59, 0.06) 0%,
            transparent 50%
          ),
          radial-gradient(
            ellipse at 70% 50%,
            rgba(168, 85, 247, 0.05) 0%,
            transparent 50%
          ),
          radial-gradient(
            ellipse at 50% 80%,
            rgba(200, 245, 59, 0.04) 0%,
            transparent 40%
          );
          background-size: 200% 200%;
          animation: aurora-shift 12s ease-in-out infinite;
        }

        .hero-aurora::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 0%, var(--bg) 75%);
        }

        /* ── Animated grid ── */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: grid-move 25s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .hero-grid::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 0%, var(--bg) 70%);
          pointer-events: none;
        }

        /* ── Floating particles ── */
        .hero-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0;
          pointer-events: none;
          z-index: 1;
        }

        .hero-particle:nth-child(1) {
          left: 15%;
          bottom: 10%;
          animation: float-particle 8s ease-in-out infinite;
          animation-delay: 0s;
        }

        .hero-particle:nth-child(2) {
          left: 35%;
          bottom: 5%;
          animation: float-particle 10s ease-in-out infinite;
          animation-delay: 2s;
          width: 2px;
          height: 2px;
          background: var(--accent2);
        }

        .hero-particle:nth-child(3) {
          left: 55%;
          bottom: 15%;
          animation: float-particle 9s ease-in-out infinite;
          animation-delay: 4s;
        }

        .hero-particle:nth-child(4) {
          left: 75%;
          bottom: 8%;
          animation: float-particle 11s ease-in-out infinite;
          animation-delay: 1s;
          width: 2px;
          height: 2px;
        }

        .hero-particle:nth-child(5) {
          left: 90%;
          bottom: 12%;
          animation: float-particle 7s ease-in-out infinite;
          animation-delay: 3s;
          width: 2px;
          height: 2px;
          background: var(--accent2);
        }

        /* ── Gradient title text ── */
        .hero-gradient-title {
          background: linear-gradient(135deg, var(--accent), var(--accent2), var(--accent));
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease-in-out infinite;
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .hero-aurora::before,
          .hero-grid,
          .hero-particle,
          .hero-gradient-title {
            animation: none !important;
          }
          .hero-particle {
            display: none;
          }
          .hero-aurora::before {
            background-position: 50% 50%;
          }
          .hero-gradient-title {
            background-position: 0% 50%;
          }
        }
      `}</style>

      {/* Atmospheric layers */}
      <div className="hero-aurora" />
      <div className="hero-grid" />

      {/* Floating particles */}
      <div className="hero-particle" />
      <div className="hero-particle" />
      <div className="hero-particle" />
      <div className="hero-particle" />
      <div className="hero-particle" />

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial={prefersReduced ? 'visible' : 'hidden'}
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
          style={{
            border: '1px solid var(--accent)',
            background: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              color: 'var(--accent)',
              fontSize: 14,
              fontFamily: "'Heebo', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            effects.lab
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: 56,
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          <span style={{ color: 'var(--text)' }}>
            תפסיק לבנות
          </span>
          <br />
          <span className="hero-gradient-title">
            אתרים גנריים
          </span>
        </motion.h1>

        {/* Dual CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          {/* Primary CTA */}
          <button
            onClick={scrollToFeatured}
            className="rounded-full cursor-pointer"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: "'Heebo', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              paddingInline: 32,
              paddingBlock: 12,
              border: 'none',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            העתק את האפקט הראשון
          </button>

          {/* Secondary CTA */}
          <button
            onClick={scrollToFeatured}
            className="rounded-full cursor-pointer"
            style={{
              background: 'transparent',
              color: 'var(--accent)',
              fontFamily: "'Heebo', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              paddingInline: 32,
              paddingBlock: 12,
              border: '1px solid var(--accent)',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(200, 245, 59, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            גלול לגלות
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.p
          variants={itemVariants}
          style={{
            color: 'var(--muted)',
            fontSize: 14,
            fontFamily: "'Space Mono', monospace",
            letterSpacing: '0.3px',
          }}
        >
          110 אפקטים
          <span style={{ margin: '0 12px', opacity: 0.4 }}>&middot;</span>
          0 ספריות חיצוניות
          <span style={{ margin: '0 12px', opacity: 0.4 }}>&middot;</span>
          Copy-Paste טהור
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
