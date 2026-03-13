'use client';

import { useState, useEffect, useRef } from 'react';
import { hebrewFonts, CATEGORIES, SOURCES, type HebrewFont } from '@/data/fonts';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobilePageHeader from '@/components/mobile/MobilePageHeader';

/** Inject a @font-face rule for a local font file (once per font) */
const loadedFonts = new Set<string>();
function ensureFontLoaded(font: HebrewFont) {
  if (loadedFonts.has(font.id)) return;
  loadedFonts.add(font.id);

  const ext = font.localFile.split('.').pop()?.toLowerCase();
  const formatMap: Record<string, string> = {
    woff2: 'woff2',
    woff: 'woff',
    ttf: 'truetype',
    otf: 'opentype',
  };
  const format = formatMap[ext || ''] || 'truetype';

  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: '${font.fontFamily}';
      src: url('${font.localFile}') format('${format}');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
}

function FontCard({ font }: { font: HebrewFont }) {
  const [previewSize, setPreviewSize] = useState(32);
  const [customText, setCustomText] = useState(font.previewText);
  const [isEditing, setIsEditing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureFontLoaded(font);
  }, [font]);

  const sourceLabel: Record<string, string> = {
    google: 'Google Fonts',
    kolmus: 'פרויקט קולמוס',
    aaa: 'AlefAlefAlef',
    other: font.designer || 'מעצב עצמאי',
  };

  const sourceBadgeColor: Record<string, string> = {
    google: '#4285f4',
    kolmus: 'var(--accent)',
    aaa: '#ff3cac',
    other: '#f59e0b',
  };

  return (
    <div
      ref={cardRef}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: 28,
        transition: 'all .2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.background = 'rgba(255,255,255,0.06)';
        el.style.borderColor = 'rgba(255,255,255,0.12)';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.background = 'rgba(255,255,255,0.03)';
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
            {font.name}
            <span style={{ fontSize: 13, opacity: .4, marginRight: 8, fontWeight: 400 }}>
              {font.nameEn}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11, padding: '2px 8px', borderRadius: 100,
              background: `${sourceBadgeColor[font.source]}20`,
              border: `1px solid ${sourceBadgeColor[font.source]}40`,
              color: sourceBadgeColor[font.source],
            }}>
              {sourceLabel[font.source]}
            </span>
            {font.hasLatin && (
              <span style={{
                fontSize: 11, padding: '2px 8px', borderRadius: 100,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
              }}>
                + Latin
              </span>
            )}
          </div>
        </div>

        {/* Weights */}
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 120 }}>
          {font.weights.map(w => (
            <span key={w} style={{
              fontSize: 9, padding: '2px 5px', borderRadius: 4,
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.3)',
            }}>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div
        style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 10,
          padding: '24px 20px',
          marginBottom: 16,
          minHeight: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'text',
        }}
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <input
            autoFocus
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={e => { if (e.key === 'Enter') setIsEditing(false); }}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: `'${font.fontFamily}', sans-serif`,
              fontSize: previewSize,
              color: 'var(--text)',
              textAlign: 'center',
              width: '100%',
              direction: 'rtl',
            }}
          />
        ) : (
          <div style={{
            fontFamily: `'${font.fontFamily}', sans-serif`,
            fontSize: previewSize,
            color: 'var(--text)',
            textAlign: 'center',
            direction: 'rtl',
            lineHeight: 1.4,
            transition: 'color .3s',
            userSelect: 'none',
          }}>
            {customText}
          </div>
        )}

        {!isEditing && (
          <div style={{
            position: 'absolute', top: 8, left: 8,
            fontSize: 9, opacity: .25,
          }}>
            לחץ לעריכה
          </div>
        )}
      </div>

      {/* Size slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 10, opacity: .3, width: 20 }}>A</span>
        <input
          type="range"
          min={14}
          max={72}
          value={previewSize}
          onChange={e => setPreviewSize(Number(e.target.value))}
          style={{ flex: 1, accentColor: 'var(--accent)', cursor: 'pointer' }}
        />
        <span style={{ fontSize: 16, opacity: .3 }}>A</span>
        <span style={{ fontSize: 10, opacity: .3, width: 28, textAlign: 'right' }}>{previewSize}px</span>
      </div>

      {/* Description */}
      <p style={{ fontSize: 12, opacity: .45, lineHeight: 1.6, marginBottom: 16 }}>
        {font.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {font.tags.map(tag => (
          <span key={tag} style={{
            fontSize: 10, padding: '2px 8px', borderRadius: 100,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: 'rgba(255,255,255,0.35)',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Download button */}
      <a
        href={font.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          padding: '11px 0',
          borderRadius: 10,
          background: 'var(--accent)',
          color: '#000',
          fontWeight: 700,
          fontSize: 13,
          textDecoration: 'none',
          transition: 'all .2s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget;
          el.style.opacity = '0.85';
          el.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M8 2v8M5 7l3 3 3-3M2 12v2h12v-2"/>
        </svg>
        הורד מ-{sourceLabel[font.source]}
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 4h8v8M12 4L4 12"/>
        </svg>
      </a>
    </div>
  );
}

function MobileFontCard({ font }: { font: HebrewFont }) {
  const [previewSize, setPreviewSize] = useState(36);
  const [customText, setCustomText] = useState(font.previewText);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => { ensureFontLoaded(font); }, [font]);

  const sourceLabel: Record<string, string> = {
    google: 'Google Fonts', kolmus: 'פרויקט קולמוס',
    aaa: 'AlefAlefAlef', other: font.designer || 'מעצב עצמאי',
  };
  const sourceBadgeColor: Record<string, string> = {
    google: '#4285f4', kolmus: 'var(--accent)', aaa: '#ff3cac', other: '#f59e0b',
  };

  return (
    <div className="font-card-mobile card-reveal">
      <div className="font-preview-area-mobile" onClick={() => setIsEditing(true)}>
        {isEditing ? (
          <input
            autoFocus
            className="font-preview-text-mobile"
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={e => { if (e.key === 'Enter') setIsEditing(false); }}
            style={{ fontFamily: `'${font.fontFamily}', sans-serif`, fontSize: previewSize }}
          />
        ) : (
          <div className="font-preview-text-mobile" style={{ fontFamily: `'${font.fontFamily}', sans-serif`, fontSize: previewSize }}>
            {customText}
          </div>
        )}
        {!isEditing && <div className="font-edit-hint">לחץ לעריכה</div>}
      </div>

      <div className="font-size-slider-mobile">
        <input type="range" min={14} max={72} value={previewSize} onChange={e => setPreviewSize(Number(e.target.value))} />
      </div>

      <div className="font-footer-mobile">
        <div>
          <div className="font-name-mobile">{font.name}</div>
          <div className="font-source-badge-mobile" style={{
            background: `${sourceBadgeColor[font.source]}20`,
            color: sourceBadgeColor[font.source],
            borderColor: `${sourceBadgeColor[font.source]}40`,
          }}>
            {sourceLabel[font.source]}
          </div>
        </div>
        <a href={font.downloadUrl} target="_blank" rel="noopener noreferrer" className="font-download-btn-mobile tappable">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 2v8M5 7l3 3 3-3M2 12v2h12v-2"/>
          </svg>
          הורד
        </a>
      </div>
    </div>
  );
}

export default function FontsPage() {
  const [category, setCategory] = useState('all');
  const [source, setSource] = useState('all');
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const [mobileSearch, setMobileSearch] = useState('');

  const filtered = hebrewFonts.filter(font => {
    if (category !== 'all' && font.category !== category) return false;
    if (source !== 'all' && font.source !== source) return false;
    if (search && !font.name.includes(search) && !font.nameEn.toLowerCase().includes(search.toLowerCase()) && !font.tags.some(t => t.includes(search))) return false;
    return true;
  });

  if (isMobile) {
    const mobileFiltered = hebrewFonts.filter(font => {
      if (category !== 'all' && font.category !== category) return false;
      if (mobileSearch && !font.name.includes(mobileSearch) && !font.nameEn.toLowerCase().includes(mobileSearch.toLowerCase())) return false;
      return true;
    });

    return (
      <div className="mobile-page">
        <MobilePageHeader title="פונטים" onSearch={setMobileSearch} searchPlaceholder="חפש פונט..." />

        <div className="mobile-filter-pills" data-scroll-horizontal>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`filter-pill-mobile ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ paddingTop: 8 }}>
          {mobileFiltered.map((font) => (
            <MobileFontCard key={font.id} font={font} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ padding: '120px 60px 40px', maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', opacity: .4, marginBottom: 16 }}>
          Effexio
        </div>
        <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
          פונטים עבריים<br />
          <span style={{ color: 'var(--accent)' }}>חינמיים</span>
        </h1>
        <p style={{ opacity: .45, fontSize: 16, maxWidth: 500, lineHeight: 1.7, margin: '0 auto' }}>
          {hebrewFonts.length} פונטים עבריים חינמיים לשימוש מסחרי.
          לחץ על preview לעריכה חיה — ואז הורד מהמקור המקורי.
        </p>
      </div>

      {/* Filters */}
      <div style={{ padding: '0 60px 32px', maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>

        {/* Search */}
        <input
          placeholder="חפש פונט..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, padding: '10px 16px',
            color: 'var(--text)', fontSize: 14,
            width: 280, fontFamily: 'inherit',
            outline: 'none', marginBottom: 16, display: 'block',
            direction: 'rtl',
            margin: '0 auto 16px',
          }}
        />

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12, justifyContent: 'center' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: '7px 16px', borderRadius: 100, fontSize: 13,
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                background: category === cat.id ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${category === cat.id ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                color: category === cat.id ? '#000' : 'rgba(255,255,255,0.5)',
                transition: 'all .2s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Source tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {SOURCES.map(src => (
            <button
              key={src.id}
              onClick={() => setSource(src.id)}
              style={{
                padding: '5px 14px', borderRadius: 100, fontSize: 11,
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                background: source === src.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: `1px solid ${source === src.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}`,
                color: source === src.id ? '#fff' : 'rgba(255,255,255,0.35)',
                transition: 'all .2s',
              }}
            >
              {src.label}
            </button>
          ))}
        </div>

      </div>

      {/* Count */}
      <div style={{ padding: '0 60px 24px', maxWidth: 1400, margin: '0 auto', fontSize: 12, opacity: .3, textAlign: 'center' }}>
        מציג {filtered.length} פונטים
      </div>

      {/* Grid */}
      <div style={{
        padding: '0 60px 100px',
        maxWidth: 1400, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 20,
      }}>
        {filtered.map(font => (
          <FontCard key={font.id} font={font} />
        ))}
      </div>

    </div>
  );
}
