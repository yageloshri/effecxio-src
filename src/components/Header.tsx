'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        background: 'rgba(5, 5, 5, 0.85)',
        borderBottom: '1px solid var(--border)',
        height: 64,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '0 32px',
          gap: '28px',
          direction: 'ltr',
        }}
      >
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link
            href="/effects"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            אפקטים
          </Link>
          <Link
            href="/templates"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            תבניות
          </Link>
        </nav>

        <motion.a
          href="/"
          className="no-underline"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: 22,
            color: '#fff',
            letterSpacing: '-0.5px',
            textDecoration: 'none',
          }}
        >
          Effec<span style={{ color: 'var(--accent)' }}>x</span>io
        </motion.a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link
            href="/icons"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            אייקונים
          </Link>
          <Link
            href="/fonts"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            פונטים
          </Link>
          <Link
            href="/libraries"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            ספריות
          </Link>
        </nav>
      </div>
    </header>
  );
}
