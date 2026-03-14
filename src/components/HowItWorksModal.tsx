'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface HowItWorksModalProps {
  open: boolean;
  onClose: () => void;
}

/* ── Custom SVG Icons ── */

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="var(--accent)"
        opacity="0.9"
      />
    </svg>
  );
}

function BrowseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="5" width="11" height="9" rx="2.5" stroke="var(--accent)" strokeWidth="2" />
      <rect x="18" y="5" width="11" height="9" rx="2.5" stroke="var(--accent)" strokeWidth="2" opacity="0.5" />
      <rect x="3" y="18" width="11" height="9" rx="2.5" stroke="var(--accent)" strokeWidth="2" opacity="0.5" />
      <rect x="18" y="18" width="11" height="9" rx="2.5" stroke="var(--accent)" strokeWidth="2" opacity="0.3" />
      <circle cx="8.5" cy="9.5" r="1.5" fill="var(--accent)" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="8" y="3" width="18" height="22" rx="3" stroke="var(--accent)" strokeWidth="2" />
      <rect x="4" y="7" width="18" height="22" rx="3" stroke="var(--accent)" strokeWidth="2" fill="var(--surface)" />
      <line x1="9" y1="15" x2="17" y2="15" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="20" x2="15" y2="20" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 3c-3 4-5 9-5 14l3 4h4l3-4c0-5-2-10-5-14z"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="16" cy="14" r="2.5" fill="var(--accent)" />
      <path d="M11 21l-3 4.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M21 21l3 4.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M13 25h6" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const steps = [
  {
    icon: <BrowseIcon />,
    number: '01',
    title: 'בחר אפקט',
    description: 'גלול בין 110+ אפקטים מקצועיים מחולקים לקטגוריות. כל אפקט כולל תצוגה מקדימה חיה.',
  },
  {
    icon: <CopyIcon />,
    number: '02',
    title: 'העתק את הקוד',
    description: 'לחץ על כפתור ההעתקה — הקוד מועתק ישירות. HTML, CSS, JavaScript — הכל מוכן.',
  },
  {
    icon: <RocketIcon />,
    number: '03',
    title: 'הדבק ותהנה',
    description: 'הדבק את הקוד בפרויקט שלך. בלי התקנות, בלי ספריות, בלי תלויות. פשוט עובד.',
  },
];

export default function HowItWorksModal({ open, onClose }: HowItWorksModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-md"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            ref={modalRef}
            className="relative z-10 w-full overflow-hidden rounded-3xl"
            dir="rtl"
            style={{
              maxWidth: 520,
              background: 'linear-gradient(180deg, rgba(20, 20, 20, 1) 0%, rgba(12, 12, 12, 1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(200, 245, 59, 0.04)',
            }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 left-5 p-2 rounded-full transition-all duration-200"
              style={{
                color: 'var(--muted)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                zIndex: 10,
                lineHeight: 0,
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.color = 'var(--accent)';
                btn.style.borderColor = 'rgba(200, 245, 59, 0.3)';
                btn.style.background = 'rgba(200, 245, 59, 0.08)';
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.color = 'var(--muted)';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                btn.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              aria-label="סגור"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Content */}
            <div style={{ padding: '44px 36px 36px' }}>
              {/* Header */}
              <div className="text-center" style={{ marginBottom: 40 }}>
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full"
                  style={{
                    padding: '8px 20px',
                    marginBottom: 28,
                    background: 'rgba(200, 245, 59, 0.06)',
                    border: '1px solid rgba(200, 245, 59, 0.15)',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <HeartIcon />
                  <span
                    style={{
                      color: 'var(--accent)',
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      letterSpacing: '0.02em',
                    }}
                  >
                    מהלב
                  </span>
                </motion.div>

                <motion.h2
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 900,
                    fontSize: 30,
                    color: 'var(--text)',
                    lineHeight: 1.25,
                    marginBottom: 16,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  בנינו את מה שהיינו
                  <br />
                  רוצים שיהיה לנו
                </motion.h2>

                <motion.p
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: 'var(--muted)',
                    maxWidth: 360,
                    margin: '0 auto',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  קולקציה של אפקטים מקצועיים שפשוט מעתיקים ומדביקים.
                  <br />
                  בלי ספריות, בלי תלויות, בלי כאבי ראש.
                  <br />
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
                    רק קוד נקי שעובד — מהלב.
                  </span>
                </motion.p>
              </div>

              {/* Steps */}
              <div className="flex flex-col" style={{ gap: 16, marginBottom: 36 }}>
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    className="flex items-start"
                    style={{
                      gap: 20,
                      padding: '20px 22px',
                      borderRadius: 16,
                      background: 'rgba(255, 255, 255, 0.025)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      transition: 'border-color 0.3s ease, background 0.3s ease',
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.45 }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'rgba(200, 245, 59, 0.15)';
                      el.style.background = 'rgba(200, 245, 59, 0.03)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                      el.style.background = 'rgba(255, 255, 255, 0.025)';
                    }}
                  >
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-2xl"
                      style={{
                        width: 56,
                        height: 56,
                        background: 'rgba(200, 245, 59, 0.06)',
                        border: '1px solid rgba(200, 245, 59, 0.1)',
                      }}
                    >
                      {step.icon}
                    </div>
                    <div style={{ flex: 1, paddingTop: 2 }}>
                      <div className="flex items-center gap-3" style={{ marginBottom: 6 }}>
                        <h3
                          style={{
                            fontFamily: "'Heebo', sans-serif",
                            fontWeight: 800,
                            fontSize: 17,
                            color: 'var(--text)',
                            margin: 0,
                          }}
                        >
                          {step.title}
                        </h3>
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 11,
                            color: 'var(--accent)',
                            opacity: 0.5,
                          }}
                        >
                          {step.number}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "'Heebo', sans-serif",
                          fontSize: 14,
                          lineHeight: 1.7,
                          color: 'var(--muted)',
                          margin: 0,
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                onClick={() => {
                  onClose();
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full rounded-2xl cursor-pointer"
                style={{
                  background: 'var(--accent)',
                  color: '#000',
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: 17,
                  fontWeight: 800,
                  padding: '16px 0',
                  border: 'none',
                  boxShadow: '0 0 30px rgba(200, 245, 59, 0.15), 0 4px 20px rgba(0, 0, 0, 0.3)',
                  transition: 'box-shadow 0.3s ease, transform 0.2s ease',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(200, 245, 59, 0.3), 0 4px 20px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(200, 245, 59, 0.15), 0 4px 20px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                יאללה, בוא נתחיל
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
