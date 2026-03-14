'use client';

import { useState } from 'react';
import { libraries, LIBRARY_CATEGORIES, type Library } from '@/data/libraries';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobilePageHeader from '@/components/mobile/MobilePageHeader';
import MobileCopyToast from '@/components/mobile/MobileCopyToast';
import { LibraryPreview } from '@/components/Libraries/LibraryPreview';

const categoryColors: Record<string, string> = {
  animation: '#c8f53b',
  ui:        '#44aaff',
  '3d':      '#ff3cac',
  charts:    '#f59e0b',
  drag:      '#8b5cf6',
  scroll:    '#10b981',
  forms:     '#f97316',
  media:     '#ec4899',
  utility:   '#6366f1',
  effects:   '#c8f53b',
};

function LibraryCard({ lib }: { lib: Library }) {
  const [copied, setCopied] = useState(false);

  const color = categoryColors[lib.category] || '#c8f53b';

  const handleCopy = () => {
    navigator.clipboard.writeText(lib.lovablePrompt).catch(() => {
      const el = document.createElement('textarea');
      el.value = lib.lovablePrompt;
      el.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      document.body.appendChild(el);
      el.focus();
      el.select();
      try { document.execCommand('copy'); } finally { document.body.removeChild(el); }
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'all .2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}30`;
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 12px 40px ${color}10`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* LIVE PREVIEW */}
      <LibraryPreview libraryId={lib.id} />

      {/* INFO */}
      <div style={{ padding: '20px 20px 16px', flex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>
              {lib.name}
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{
                fontSize: 10, padding: '2px 8px', borderRadius: 100,
                background: `${color}15`, border: `1px solid ${color}30`,
                color, fontFamily: 'Space Mono, monospace',
              }}>
                {lib.npm}
              </span>
              <span style={{ fontSize: 11, opacity: .35 }}>⭐ {lib.stars}</span>
            </div>
          </div>

          <a
            href={lib.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11, opacity: .35, textDecoration: 'none',
              padding: '4px 8px', borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'inherit',
              transition: 'opacity .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.35')}
          >
            docs ↗
          </a>
        </div>

        {/* Description */}
        <p style={{ fontSize: 13, opacity: .5, lineHeight: 1.65, marginBottom: 14, direction: 'rtl' }}>
          {lib.descriptionHe}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 16 }}>
          {lib.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10, padding: '2px 7px', borderRadius: 100,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.35)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div style={{
        padding: '0 20px 20px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 8,
      }}>
        <button
          onClick={handleCopy}
          style={{
            padding: '11px 16px',
            borderRadius: 12,
            background: copied ? `${color}15` : color,
            border: `1px solid ${copied ? color + '40' : 'transparent'}`,
            color: copied ? color : '#000',
            fontWeight: 700, fontSize: 13,
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all .2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          }}
        >
          {copied ? '✓ הועתק!' : (
            <>
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="5" y="5" width="9" height="9" rx="1"/>
                <path d="M11 5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h2"/>
              </svg>
              העתק פרומט ל-Lovable
            </>
          )}
        </button>

        <a
          href={lib.npmUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 44, height: 44,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700,
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
            fontFamily: 'Space Mono, monospace',
            transition: 'all .2s',
          }}
          title="פתח ב-npm"
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
          }}
        >
          npm
        </a>
      </div>
    </div>
  );
}

export default function LibrariesPage() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [showToast, setShowToast] = useState(false);
  const isMobile = useIsMobile();

  const filtered = libraries.filter(lib => {
    if (category !== 'all' && lib.category !== category) return false;
    if (search) {
      const q = search.toLowerCase();
      return lib.name.toLowerCase().includes(q) ||
        lib.descriptionHe.includes(search) ||
        lib.npm.toLowerCase().includes(q) ||
        lib.tags.some(t => t.toLowerCase().includes(q) || t.includes(search));
    }
    return true;
  });

  if (isMobile) {
    return (
      <div className="mobile-page">
        <MobilePageHeader title="ספריות" onSearch={setSearch} searchPlaceholder="חפש ספרייה..." />

        <div className="mobile-filter-pills" data-scroll-horizontal>
          {LIBRARY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`filter-pill-mobile ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
              <span style={{ opacity: .5, marginRight: 4, fontSize: 11 }}>{cat.count}</span>
            </button>
          ))}
        </div>

        <div style={{ padding: '8px 16px 100px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 12, opacity: .3 }}>{filtered.length} ספריות</div>
          {filtered.map(lib => (
            <LibraryCard key={lib.id} lib={lib} />
          ))}
        </div>

        <MobileCopyToast show={showToast} message="הפרומט הועתק!" />
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg, #080808)', minHeight: '100vh', color: 'var(--text, #f0f0f0)' }}>

      {/* Hero */}
      <div style={{ padding: '120px 60px 40px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', opacity: .4, marginBottom: 16 }}>
          Effects Lab
        </div>
        <h1 style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 'clamp(2.5rem,5vw,4rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 16,
        }}>
          ספריות npm<br />
          <span style={{ color: 'var(--accent, #c8f53b)' }}>ל-vibe coders</span>
        </h1>
        <p style={{ opacity: .45, fontSize: 16, maxWidth: 500, lineHeight: 1.7, direction: 'rtl' }}>
          {libraries.length} ספריות עם preview חי. לחץ על כל אחת, ראה מה היא עושה,
          והעתק פרומט מוכן להדביק ב-Lovable.
        </p>
      </div>

      {/* Filters */}
      <div style={{ padding: '0 60px 32px', maxWidth: 1400, margin: '0 auto' }}>
        <input
          placeholder="חפש ספרייה..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, padding: '10px 16px',
            color: 'var(--text)', fontSize: 14,
            width: 260, fontFamily: 'inherit', outline: 'none',
            marginBottom: 16, display: 'block',
            direction: 'rtl',
          }}
        />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {LIBRARY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: '7px 16px',
                borderRadius: 100, fontSize: 13,
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                background: category === cat.id ? 'var(--accent, #c8f53b)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${category === cat.id ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                color: category === cat.id ? '#000' : 'rgba(255,255,255,0.5)',
                transition: 'all .2s',
              }}
            >
              {cat.label}
              <span style={{ opacity: .5, marginRight: 4, fontSize: 11 }}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div style={{ padding: '0 60px 20px', maxWidth: 1400, margin: '0 auto', fontSize: 12, opacity: .3 }}>
        {filtered.length} ספריות
      </div>

      {/* Grid */}
      <div style={{
        padding: '0 60px 100px',
        maxWidth: 1400, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: 20,
      }}>
        {filtered.map(lib => (
          <LibraryCard key={lib.id} lib={lib} />
        ))}
      </div>

    </div>
  );
}
