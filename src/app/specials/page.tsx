'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { specials } from '@/data/specials';
import type { Special } from '@/data/specials';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobilePageHeader from '@/components/mobile/MobilePageHeader';
import MobileCopyToast from '@/components/mobile/MobileCopyToast';
import Footer from '@/components/Footer';

const IFRAME_W = 1280;

function generatePrompt(slug: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `Fetch the full code from this URL and implement it as-is:
${origin}/specials-demos/${slug}.html

The file is self-contained HTML with all CSS and JS included.
Display it exactly as it appears — do not modify the code.`;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(el);
    el.select();
    try { document.execCommand('copy'); } finally { document.body.removeChild(el); }
  }
}

const btnStyle = (active: boolean, accent: boolean) => ({
  background: active ? 'rgba(40,200,80,0.2)' : accent ? 'rgba(200,245,59,0.1)' : 'transparent',
  border: `1px solid ${active ? 'rgba(40,200,80,0.3)' : accent ? 'rgba(200,245,59,0.2)' : 'var(--border)'}`,
  borderRadius: 8, padding: '6px 14px',
  color: active ? '#28c850' : accent ? 'var(--accent)' : 'var(--muted)',
  cursor: 'pointer', fontSize: 12, fontFamily: "'Heebo', sans-serif",
  transition: 'all 0.2s', textDecoration: 'none',
} as const);

/**
 * LazyPreview — shows a static placeholder, loads iframe on hover (desktop)
 * or when visible in viewport (mobile). Iframe fades in over the placeholder.
 */
function LazyPreview({ src, title, slug }: { src: string; title: string; slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [activated, setActivated] = useState(false);

  // Scale iframe to fit container
  useEffect(() => {
    if (!activated) return;
    const update = () => {
      const container = containerRef.current;
      const iframe = iframeRef.current;
      if (!container || !iframe) return;
      const scale = container.offsetWidth / IFRAME_W;
      iframe.style.transform = `scale(${scale})`;
      iframe.style.height = `${container.offsetHeight / scale}px`;
    };
    // Small delay to let iframe mount
    const t = setTimeout(update, 50);
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, [activated]);

  // Mobile: activate when visible in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActivated(true); io.disconnect(); } },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        aspectRatio: '16 / 10',
        overflow: 'hidden',
        position: 'relative',
        background: '#111',
      }}
      onMouseEnter={() => setActivated(true)}
    >
      {/* Static placeholder */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 8,
        opacity: loaded ? 0 : 1,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #151515 100%)',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: 11,
          color: 'var(--muted)', opacity: 0.6, textAlign: 'center',
          padding: '0 16px', maxWidth: '80%',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {slug}
        </span>
      </div>

      {/* Iframe — only rendered after activation */}
      {activated && (
        <iframe
          ref={iframeRef}
          src={src}
          onLoad={() => setLoaded(true)}
          style={{
            width: IFRAME_W,
            height: 800,
            border: 'none',
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          sandbox="allow-same-origin allow-scripts"
          title={title}
          loading="lazy"
        />
      )}
    </div>
  );
}

function SpecialCodeModal({ special, onClose }: { special: Special; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const prompt = generatePrompt(special.slug);

  const handleCopy = useCallback(async () => {
    await copyText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, width: '100%', maxWidth: 600,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 20px', borderBottom: '1px solid var(--border)',
        }}>
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 600, color: 'var(--text)' }}>
            {special.title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              borderRadius: 8, padding: '8px 12px', color: 'var(--muted)',
              cursor: 'pointer', fontSize: 16,
            }}
          >
            ✕
          </button>
        </div>
        <pre style={{
          overflow: 'auto', padding: 20, margin: 0,
          fontSize: 13, lineHeight: 1.8, color: '#ccc',
          fontFamily: "'Space Mono', monospace",
          background: 'var(--code-bg)',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>
          {prompt}
        </pre>
        <div style={{
          display: 'flex', gap: 8, padding: '16px 20px',
          borderTop: '1px solid var(--border)',
        }}>
          <button onClick={handleCopy} style={btnStyle(copied, true)}>
            {copied ? '✓ פרומפט הועתק!' : 'העתק פרומפט'}
          </button>
          <a
            href={special.previewUrl}
            download={`${special.title}.html`}
            style={btnStyle(false, false)}
          >
            הורד HTML
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SpecialsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Special | null>(null);
  const [mobileCopied, setMobileCopied] = useState(false);
  const isMobile = useIsMobile();

  const filtered = useMemo(() => {
    if (!search) return specials;
    const q = search.toLowerCase();
    return specials.filter(s =>
      s.title.toLowerCase().includes(q) || s.slug.includes(q)
    );
  }, [search]);

  const handleMobileCopy = useCallback(async (special: Special) => {
    await copyText(generatePrompt(special.slug));
    setMobileCopied(true);
    setTimeout(() => setMobileCopied(false), 2000);
  }, []);

  if (isMobile) {
    return (
      <div className="mobile-page">
        <MobilePageHeader title="ספיישלים" onSearch={setSearch} searchPlaceholder="חפש אפקט..." />

        <div style={{ paddingTop: 8 }}>
          {filtered.map(special => (
            <div key={special.slug} className="template-card-mobile card-reveal">
              <Link href={`/specials/${special.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="template-browser-bar">
                  <div className="browser-dot" style={{ background: '#ff5f57' }} />
                  <div className="browser-dot" style={{ background: '#febc2e' }} />
                  <div className="browser-dot" style={{ background: '#28c840' }} />
                </div>
                <LazyPreview src={special.previewUrl} title={special.title} slug={special.slug} />
              </Link>
              <div className="template-actions-mobile">
                <button className="template-prompt-btn tappable" onClick={() => handleMobileCopy(special)}>
                  העתק פרומפט
                </button>
                <a href={special.previewUrl} download={`${special.title}.html`} className="template-preview-btn tappable" aria-label="הורד HTML">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, color: '#555', fontFamily: "'Heebo', sans-serif" }}>
            לא נמצאו אפקטים. נסה חיפוש אחר.
          </div>
        )}

        {selected && <SpecialCodeModal special={selected} onClose={() => setSelected(null)} />}
        <MobileCopyToast show={mobileCopied} message="✓ פרומפט הועתק!" />
      </div>
    );
  }

  // Desktop
  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#f0f0f0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '120px 24px 60px', direction: 'rtl' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(200,245,59,0.08)', border: '1px solid rgba(200,245,59,0.2)',
          borderRadius: 100, padding: '4px 14px', fontSize: 11,
          color: '#c8f53b', fontFamily: 'monospace', marginBottom: 20, letterSpacing: '0.05em',
        }}>
          ✦ {specials.length} אפקטים מיוחדים
        </div>
        <h1 style={{
          fontSize: 'clamp(2.5rem,5vw,4rem)',
          fontWeight: 900,
          margin: '0 0 16px',
          fontFamily: "'Heebo', sans-serif",
        }}>
          אפקטים מיוחדים, מוכנים להעתקה.
        </h1>
        <p style={{ fontSize: 17, color: '#666', maxWidth: 500, margin: '0 auto 40px' }}>
          {specials.length} אפקטים עצמאיים ב-HTML/CSS/JS. בחרו, צפו בתצוגה מקדימה, העתיקו את הקוד.
        </p>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="חפש אפקט... (Card, Login, Button...)"
          style={{
            width: '100%', maxWidth: 440,
            background: '#111', border: '1px solid #222',
            borderRadius: 10, padding: '12px 18px',
            color: '#fff', fontSize: 14,
            outline: 'none', direction: 'rtl',
            marginBottom: 40,
          }}
        />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 20,
        padding: '0 24px 80px',
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        {filtered.map(special => (
          <div
            key={special.slug}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            {/* Clickable preview area */}
            <Link href={`/specials/${special.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}>
              {/* Browser bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 14px',
                borderBottom: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                <span style={{
                  marginRight: 'auto', marginLeft: 12, fontSize: 11,
                  color: 'var(--muted)', fontFamily: "'Space Mono', monospace",
                }}>
                  {special.slug}.html
                </span>
              </div>

              {/* Preview */}
              <LazyPreview src={special.previewUrl} title={special.title} slug={special.slug} />
            </Link>

            {/* Footer */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px',
              borderTop: '1px solid var(--border)',
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 13, color: 'var(--text)',
              }}>
                {special.title}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                <a
                  href={special.previewUrl}
                  download={`${special.title}.html`}
                  style={btnStyle(false, false)}
                >
                  הורד HTML
                </a>
                <button
                  onClick={() => setSelected(special)}
                  style={btnStyle(false, true)}
                >
                  העתק פרומפט
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#555', fontFamily: "'Heebo', sans-serif" }}>
          לא נמצאו אפקטים. נסה חיפוש אחר.
        </div>
      )}

      <Footer />
      {selected && <SpecialCodeModal special={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
