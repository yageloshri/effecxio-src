'use client';

import { use, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { specials } from '@/data/specials';

function generatePrompt(slug: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `Fetch the full code from this URL and implement it as-is:
${origin}/specials-demos/${slug}.html

The file is self-contained HTML with all CSS and JS included.
Display it exactly as it appears — do not modify the code.`;
}

export default function SpecialPreviewClient({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
  const { id } = use(paramsPromise);
  const router = useRouter();
  const special = specials.find(s => s.slug === id);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!special) return;
    const prompt = generatePrompt(special.slug);
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const el = document.createElement('textarea');
      el.value = prompt;
      el.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } finally { document.body.removeChild(el); }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [special]);

  if (!special) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)', color: 'var(--text)', fontFamily: "'Heebo', sans-serif",
      }}>
        אפקט לא נמצא
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Top bar */}
      <div style={{
        height: 60, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(5,5,5,0.95)',
        backdropFilter: 'blur(12px)',
      }}>
        {/* Left: back button */}
        <button
          onClick={() => router.push('/specials')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'transparent', border: 'none',
            color: 'var(--text)', cursor: 'pointer',
            fontSize: 14, fontFamily: "'Heebo', sans-serif",
            padding: '8px 12px', borderRadius: 8,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          חזרה
        </button>

        {/* Center: title */}
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 14, color: 'var(--text)',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          maxWidth: '40%',
        }}>
          {special.title}
        </span>

        {/* Right: actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <a
            href={special.previewUrl}
            download={`${special.title}.html`}
            style={{
              display: 'flex', alignItems: 'center',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 8, padding: '8px 14px',
              color: 'var(--muted)', cursor: 'pointer',
              fontSize: 12, fontFamily: "'Heebo', sans-serif",
              transition: 'all 0.2s', textDecoration: 'none',
            }}
          >
            הורד HTML
          </a>
          <button
            onClick={() => window.open(special.previewUrl, '_blank')}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 8, padding: '8px 14px',
              color: 'var(--muted)', cursor: 'pointer',
              fontSize: 12, fontFamily: "'Heebo', sans-serif",
              transition: 'all 0.2s',
            }}
          >
            פתח בטאב חדש
          </button>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? 'rgba(40,200,80,0.2)' : 'rgba(200,245,59,0.1)',
              border: `1px solid ${copied ? 'rgba(40,200,80,0.3)' : 'rgba(200,245,59,0.2)'}`,
              borderRadius: 8, padding: '8px 14px',
              color: copied ? '#28c850' : 'var(--accent)',
              cursor: 'pointer', fontSize: 12, fontFamily: "'Heebo', sans-serif",
              transition: 'all 0.2s',
            }}
          >
            {copied ? '✓ הועתק!' : 'העתק פרומפט'}
          </button>
        </div>
      </div>

      {/* Full-screen iframe */}
      <iframe
        src={special.previewUrl}
        style={{
          flex: 1, width: '100%', border: 'none',
        }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        title={special.title}
      />
    </div>
  );
}
