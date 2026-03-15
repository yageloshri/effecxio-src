'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import HowItWorksModal from '@/components/HowItWorksModal';
import FloatingBadges from '@/components/FloatingBadges';
import { useIsMobile } from '@/hooks/useIsMobile';

function scrollToFeatured() {
  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Animated counter ── */
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <section
      ref={heroContainerRef}
      className="hero-section relative overflow-hidden"
      style={{
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes float-orb {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(15px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-40px) translateX(5px); }
        }

        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes grid-pulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }

        @keyframes scan-line {
          0% { top: -2px; }
          100% { top: 100%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes hero-float-up {
          0% { transform: translateY(20px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        @keyframes hero-letter-reveal {
          0% { opacity: 0; transform: translateY(40px) rotateX(45deg); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg); filter: blur(0); }
        }

        @keyframes hero-glow-pulse {
          0%, 100% { text-shadow: 0 0 40px rgba(200, 245, 59, 0.2), 0 0 80px rgba(200, 245, 59, 0.1); }
          50% { text-shadow: 0 0 60px rgba(200, 245, 59, 0.35), 0 0 120px rgba(200, 245, 59, 0.15); }
        }

        @keyframes hero-line-grow {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        /* ── Orb glow ── */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .hero-orb-1 {
          width: min(600px, 80vw);
          height: min(600px, 80vw);
          top: -10%;
          left: -15%;
          background: radial-gradient(circle, rgba(200, 245, 59, 0.12) 0%, transparent 70%);
          animation: float-orb 20s ease-in-out infinite;
        }

        .hero-orb-2 {
          width: min(500px, 70vw);
          height: min(500px, 70vw);
          bottom: -20%;
          right: -10%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%);
          animation: float-orb 25s ease-in-out infinite reverse;
        }

        .hero-orb-3 {
          width: min(300px, 50vw);
          height: min(300px, 50vw);
          top: 50%;
          left: 50%;
          margin-top: -150px;
          margin-left: -150px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, transparent 70%);
          animation: pulse-glow 8s ease-in-out infinite;
        }

        /* ── Grid ── */
        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
          animation: grid-pulse 6s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
          mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent);
          -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent);
        }

        /* ── Scan line ── */
        .hero-scan {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200, 245, 59, 0.15), transparent);
          pointer-events: none;
          z-index: 2;
          animation: scan-line 8s linear infinite;
        }

        /* ── Gradient title ── */
        .hero-title-gradient {
          background: linear-gradient(
            135deg,
            var(--accent) 0%,
            #38bdf8 30%,
            var(--accent2) 60%,
            var(--accent) 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-flow 6s ease-in-out infinite, hero-glow-pulse 4s ease-in-out infinite;
        }

        /* ── CTA shimmer ── */
        .hero-cta-primary {
          position: relative;
          overflow: hidden;
        }
        .hero-cta-primary::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.2) 50%,
            transparent 60%
          );
          animation: shimmer 3s ease-in-out infinite;
        }

        /* ── Vignette overlay ── */
        .hero-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 0%, var(--bg) 75%);
          pointer-events: none;
          z-index: 3;
        }

        /* ── Noise texture ── */
        .hero-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          pointer-events: none;
          z-index: 2;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px 256px;
        }

        /* ── Decorative line ── */
        .hero-deco-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200, 245, 59, 0.3), transparent);
          animation: hero-line-grow 0.5s ease-out 0.05s both;
          transform-origin: center;
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .hero-orb, .hero-scan, .hero-cta-primary::after { animation: none !important; }
          .hero-grid-bg { animation: none !important; opacity: 0.03; }
          .hero-title-gradient { animation: none !important; background-position: 0% 50%; }
          .hero-deco-line { animation: none !important; transform: scaleX(1); }
        }

        /* ── Mobile responsive ── */
        @media (max-width: 768px) {
          .hero-section { min-height: auto !important; padding: 60px 0 40px !important; }
          .hero-heading { font-size: 28px !important; }
          .hero-heading-accent { font-size: 36px !important; }
          .hero-sub { font-size: 14px !important; max-width: 90vw !important; margin-bottom: 28px !important; }
          .hero-stats { flex-direction: row; gap: 20px !important; }
          .hero-stat-divider { display: none; }
          .hero-cta-row { flex-direction: column; width: 100%; gap: 10px !important; margin-bottom: 28px !important; }
          .hero-cta-row button { width: 100%; padding: 14px 32px !important; font-size: 15px !important; }
          .hero-mono-label { font-size: 11px !important; }
          .hero-deco-line { width: 80px !important; margin-top: 10px !important; margin-bottom: 18px !important; }
        }

        @media (max-width: 480px) {
          .hero-heading { font-size: 24px !important; line-height: 1.2 !important; }
          .hero-heading-accent { font-size: 32px !important; }
          .hero-sub { font-size: 13px !important; }
}
      `}</style>

      {/* Background layers */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid-bg" />
      <div className="hero-scan" />
      <div className="hero-noise" />
      <div className="hero-vignette" />

      {/* ── Floating badges (desktop only) ── */}
      {!isMobile && <FloatingBadges containerRef={heroContainerRef} />}

      {/* ── Content ── */}
      <div
        className="relative z-10 text-center px-6 mx-auto"
        style={{ maxWidth: 860 }}
      >
        {/* Logo — mobile only */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: 16,
              color: 'var(--accent)',
              letterSpacing: '0.05em',
              marginBottom: 24,
            }}
          >
            <span style={{ color: '#ffffff' }}>Effec</span><span style={{ color: 'var(--accent)' }}>x</span><span style={{ color: '#ffffff' }}>io</span>
          </motion.div>
        )}

        {/* Main heading — line 1: Heebo */}
        <motion.div
          className="hero-heading"
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: 48,
            lineHeight: 1.15,
            color: 'var(--text)',
            direction: 'rtl',
            marginBottom: 0,
            letterSpacing: '-0.01em',
          }}
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          תפסיקו לבנות
        </motion.div>

        {/* Main heading — line 2: Bold gradient with glow */}
        <motion.div
          className="hero-heading-accent hero-title-gradient"
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: 72,
            lineHeight: 1.1,
            direction: 'rtl',
            marginBottom: 8,
            letterSpacing: '-0.02em',
          }}
          initial={prefersReduced ? {} : { opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          אתרים גנריים
        </motion.div>

        {/* Decorative line */}
        <div
          className="hero-deco-line mx-auto"
          style={{ width: 120, marginTop: 16, marginBottom: 28 }}
        />

        {/* Subtitle — mixed fonts */}
        <motion.p
          className="hero-sub"
          style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: '#ffffff',
            maxWidth: 500,
            margin: '0 auto 44px',
            direction: 'rtl',
          }}
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400 }}>
            קולקציית אפקטים מקצועיים שאתה פשוט מעתיק ומדביק.
          </span>
          <br />
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400 }}>
            בלי ספריות. בלי תלויות.
          </span>
          {' '}
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 14,
              color: 'var(--accent)',
              fontWeight: 700,
            }}
          >
            {'{ just clean code }'}
          </span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="hero-cta-row flex flex-wrap items-center justify-center gap-4"
          style={{ marginBottom: 48 }}
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <button
            onClick={scrollToFeatured}
            className="hero-cta-primary rounded-2xl cursor-pointer"
            style={{
              background: 'var(--accent)',
              color: '#000',
              fontFamily: "'Heebo', sans-serif",
              fontSize: 17,
              fontWeight: 800,
              padding: '16px 44px',
              border: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 0 40px rgba(200, 245, 59, 0.2), 0 4px 20px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 60px rgba(200, 245, 59, 0.35), 0 8px 30px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(200, 245, 59, 0.2), 0 4px 20px rgba(0, 0, 0, 0.3)';
            }}
          >
            גלה את האפקטים
          </button>

          <button
            onClick={() => setShowHowItWorks(true)}
            className="rounded-2xl cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--text)',
              fontFamily: "'Heebo', sans-serif",
              fontSize: 17,
              fontWeight: 600,
              padding: '16px 44px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            איך זה עובד?
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats flex items-center justify-center gap-10"
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          {[
            { value: 110, suffix: '', label: 'אפקטים' },
            { value: 0, suffix: '', label: 'כאבי ראש' },
            { value: 100, suffix: '%', label: 'Copy-Paste' },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-10">
              {i > 0 && (
                <span
                  className="hero-stat-divider"
                  style={{
                    width: 1,
                    height: 32,
                    background: 'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                  }}
                />
              )}
              <div className="text-center">
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 26,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    lineHeight: 1,
                  }}
                >
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#ffffff',
                    marginTop: 6,
                    letterSpacing: '0.01em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Mobile badges (inline pills) ── */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 8,
              marginTop: 32,
              direction: 'rtl',
            }}
          >
            {[
              { text: '110 אפקטים מוכנים', emoji: '✦' },
              { text: 'הכל ב״העתק הדבק״', emoji: '⌘' },
              { text: '0 כאבי ראש', emoji: '◈' },
              { text: 'מושלם לוויב קודרים', emoji: '</>' },
            ].map((badge) => (
              <span
                key={badge.text}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 100,
                  padding: '6px 14px',
                  fontSize: 11,
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: 10, opacity: 0.6 }}>{badge.emoji}</span>
                {badge.text}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      <HowItWorksModal
        open={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </section>
  );
}
