'use client';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: 18,
              color: 'var(--accent)',
            }}
          >
            Effecxio
          </span>
        </div>

        {/* One-liner */}
        <p
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 14,
            color: 'var(--muted)',
            margin: '0 0 16px 0',
          }}
        >
          נבנה באהבה רבה לקהילת ה-vibe coders בישראל 🇮🇱
        </p>

        {/* Links row */}
        <div
          style={{
            fontSize: 12,
            color: 'var(--muted)',
            fontFamily: "'Heebo', sans-serif",
          }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--muted)',
              textDecoration: 'none',
            }}
          >
            GitHub
          </a>
          <span style={{ margin: '0 8px' }}>&middot;</span>
          <span>גרסה 2.0</span>
        </div>
      </div>
    </footer>
  );
}
