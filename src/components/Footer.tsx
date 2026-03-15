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
              color: '#ffffff',
            }}
          >
            Effec<span style={{ color: 'var(--accent)' }}>x</span>io
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

      </div>
    </footer>
  );
}
