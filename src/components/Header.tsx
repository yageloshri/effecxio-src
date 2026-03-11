'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        background: 'rgba(8, 8, 8, 0.8)',
        borderBottom: '1px solid var(--border)',
        height: 64,
      }}
    >
      <div className="flex items-center justify-between h-full px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <motion.a
            href="/"
            className="flex items-center gap-0 no-underline"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                fontSize: 22,
                color: '#fff',
                letterSpacing: '-0.5px',
              }}
            >
              effects
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                fontSize: 22,
                color: 'var(--accent)',
              }}
            >
              .
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                fontSize: 22,
                color: '#fff',
                letterSpacing: '-0.5px',
              }}
            >
              lab
            </span>
          </motion.a>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              color: 'var(--muted)',
              fontSize: 13,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {/* ספריית אפקטים לאתרים */}
            {'// ספריית אפקטים לאתרים'}
          </motion.span>
        </div>
      </div>
    </header>
  );
}
