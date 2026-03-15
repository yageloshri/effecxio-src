'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { hebrewFonts, CATEGORIES, SOURCES, type HebrewFont } from '@/data/fonts';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobilePageHeader from '@/components/mobile/MobilePageHeader';

/* ═══════════════════════════════════════════
   FONT PAIRS DATA
   ═══════════════════════════════════════════ */

interface FontPair {
  heading: string;
  body: string;
  vibe: string;
  tag: string;
}

const FONT_PAIRS: FontPair[] = [
  { heading: 'Space Mono',         body: 'Inter',           vibe: 'טכנולוגי',    tag: 'Tech' },
  { heading: 'Syne',               body: 'Inter',           vibe: 'מודרני',      tag: 'SaaS' },
  { heading: 'Playfair Display',   body: 'Lato',            vibe: 'אלגנטי',      tag: 'Elegant' },
  { heading: 'Bebas Neue',         body: 'Open Sans',       vibe: 'בולד',        tag: 'Bold' },
  { heading: 'Montserrat',         body: 'Source Sans Pro',  vibe: 'קלאסי',       tag: 'Classic' },
  { heading: 'DM Serif Display',   body: 'DM Sans',         vibe: 'עיתונאי',     tag: 'Editorial' },
  { heading: 'Cormorant Garamond', body: 'Raleway',         vibe: 'יוקרתי',      tag: 'Luxury' },
  { heading: 'Nunito',             body: 'Nunito Sans',     vibe: 'חברותי',      tag: 'Friendly' },
  { heading: 'Oswald',             body: 'Quattrocento',    vibe: 'חזק',         tag: 'Strong' },
  { heading: 'Raleway',            body: 'Merriweather',    vibe: 'בלוג',        tag: 'Blog' },
  { heading: 'Poppins',            body: 'Lato',            vibe: 'נקי',         tag: 'Clean' },
  { heading: 'Libre Baskerville',  body: 'Montserrat',      vibe: 'מקצועי',      tag: 'Pro' },
  { heading: 'Josefin Sans',       body: 'Cardo',           vibe: 'אופנה',       tag: 'Fashion' },
  { heading: 'Abril Fatface',      body: 'Lato',            vibe: 'מגזין',       tag: 'Magazine' },
  { heading: 'Manrope',            body: 'Inter',           vibe: 'מינימלי',     tag: 'Minimal' },
  { heading: 'Hanken Grotesk',     body: 'Archivo',         vibe: 'דשבורד',      tag: 'Dashboard' },
  { heading: 'Caveat',             body: 'Karla',           vibe: 'יצירתי',      tag: 'Creative' },
  { heading: 'Fugaz One',          body: 'Roboto',          vibe: 'אנרגטי',      tag: 'Energy' },
  { heading: 'Young Serif',        body: 'Instrument Sans', vibe: 'פורטפוליו',   tag: 'Portfolio' },
];

const ALL_VIBES = ['הכל', ...Array.from(new Set(FONT_PAIRS.map(p => p.vibe)))];

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

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

let allPairFontsLoaded = false;
function loadAllPairFonts(): Promise<void> {
  if (allPairFontsLoaded) return document.fonts.ready.then(() => {});
  allPairFontsLoaded = true;

  const allFonts = FONT_PAIRS.map(p =>
    `family=${p.heading.replace(/ /g, '+')}:wght@400;700&family=${p.body.replace(/ /g, '+')}:wght@400`
  ).join('&');

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${allFonts}&display=swap`;
  document.head.appendChild(link);

  return document.fonts.ready.then(() => {});
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(el);
    el.focus();
    el.select();
    try { document.execCommand('copy'); }
    finally { document.body.removeChild(el); }
  });
}

/* ═══════════════════════════════════════════
   FONT PAIR CARD
   ═══════════════════════════════════════════ */

function FontPairCard({ pair, isMobile }: { pair: FontPair; isMobile?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [copiedBtn, setCopiedBtn] = useState<string | null>(null);
  const [headingText, setHeadingText] = useState('The Quick Brown Fox');
  const [bodyText, setBodyText] = useState('Jumps over the lazy dog');

  // Load all pair fonts at once
  useEffect(() => {
    loadAllPairFonts().then(() => setLoaded(true));
  }, []);

  const handleCopy = (type: 'css' | 'lovable') => {
    let text: string;
    if (type === 'css') {
      text = `/* ${pair.heading} + ${pair.body} */
@import url('https://fonts.googleapis.com/css2?family=${pair.heading.replace(/ /g, '+')}:wght@700&family=${pair.body.replace(/ /g, '+')}:wght@400&display=swap');

h1, h2, h3 { font-family: '${pair.heading}', serif; }
body, p     { font-family: '${pair.body}', sans-serif; }`;
    } else {
      text = `Use this Google Fonts pairing throughout the project:
- Headings (h1, h2, h3): '${pair.heading}', weight 700
- Body text: '${pair.body}', weight 400
Import both from Google Fonts with display=swap.
Apply consistently to all text elements.`;
    }
    copyToClipboard(text);
    setCopiedBtn(type);
    setTimeout(() => setCopiedBtn(null), 2000);
  };

  return (
    <div
      className="font-pair-card"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: isMobile ? 20 : 28,
        cursor: 'default',
        opacity: loaded ? 1 : 0.4,
        transition: 'opacity 0.4s ease, background 0.2s, border-color 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => {
        if (isMobile) return;
        const el = e.currentTarget;
        el.style.background = 'rgba(255,255,255,0.06)';
        el.style.borderColor = 'rgba(255,255,255,0.12)';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        if (isMobile) return;
        const el = e.currentTarget;
        el.style.background = 'rgba(255,255,255,0.03)';
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Vibe badge */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <span style={{
          fontSize: 11, padding: '3px 10px', borderRadius: 100,
          background: 'rgba(200,245,59,0.1)',
          border: '1px solid rgba(200,245,59,0.25)',
          color: 'var(--accent)',
          fontWeight: 600,
        }}>
          {pair.vibe}
        </span>
      </div>

      {/* Scoped styles to override globals with !important */}
      <style>{`
        .fp-card-${pair.heading.replace(/\s/g, '')} .fp-heading {
          font-family: '${pair.heading}', serif !important;
          font-size: ${isMobile ? 30 : 38}px !important;
          font-weight: 700 !important;
          color: #ffffff !important;
          line-height: 1.15 !important;
          direction: ltr !important;
          text-align: left !important;
          margin: 0 0 8px 0 !important;
        }
        .fp-card-${pair.heading.replace(/\s/g, '')} .fp-body {
          font-family: '${pair.body}', sans-serif !important;
          font-size: ${isMobile ? 14 : 16}px !important;
          font-weight: 400 !important;
          color: rgba(255,255,255,0.6) !important;
          line-height: 1.5 !important;
          direction: ltr !important;
          text-align: left !important;
          margin: 0 !important;
        }
        .fp-card-${pair.heading.replace(/\s/g, '')} .fp-name-h {
          font-family: '${pair.heading}', serif !important;
          font-weight: 700 !important;
        }
        .fp-card-${pair.heading.replace(/\s/g, '')} .fp-name-b {
          font-family: '${pair.body}', sans-serif !important;
          font-weight: 400 !important;
        }
      `}</style>

      {/* Preview area */}
      <div
        className={`fp-card-${pair.heading.replace(/\s/g, '')}`}
        style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 12,
          padding: isMobile ? '24px 20px' : '32px 28px',
          marginBottom: 16,
          direction: 'ltr',
          textAlign: 'left',
        }}
      >
        <div className="fp-heading">{headingText}</div>
        <div className="fp-body">{bodyText}</div>

        {/* Font names */}
        <div style={{
          marginTop: 24,
          paddingTop: 12,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          direction: 'ltr',
          textAlign: 'left',
          fontSize: 13,
        }}>
          <span className="fp-name-h" style={{ color: 'var(--text)' }}>
            {pair.heading}
          </span>
          <span style={{ opacity: .3, margin: '0 8px' }}>+</span>
          <span className="fp-name-b" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {pair.body}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => handleCopy('css')}
          style={{
            flex: 1,
            padding: '10px 0',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.1)',
            background: copiedBtn === 'css' ? 'rgba(200,245,59,0.15)' : 'rgba(255,255,255,0.05)',
            color: copiedBtn === 'css' ? 'var(--accent)' : 'rgba(255,255,255,0.6)',
            fontWeight: 600,
            fontSize: 12,
            cursor: 'pointer',
            transition: 'all .2s',
            fontFamily: 'inherit',
          }}
        >
          {copiedBtn === 'css' ? '✓ הועתק!' : 'העתק CSS'}
        </button>
        <button
          onClick={() => handleCopy('lovable')}
          style={{
            flex: 1,
            padding: '10px 0',
            borderRadius: 10,
            border: 'none',
            background: copiedBtn === 'lovable' ? 'rgba(200,245,59,0.8)' : 'var(--accent)',
            color: '#000',
            fontWeight: 700,
            fontSize: 12,
            cursor: 'pointer',
            transition: 'all .2s',
            fontFamily: 'inherit',
          }}
        >
          {copiedBtn === 'lovable' ? '✓ הועתק!' : 'העתק פרומפט ל-Lovable'}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EXISTING COMPONENTS (UNCHANGED)
   ═══════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════
   TAB PILLS COMPONENT
   ═══════════════════════════════════════════ */

function TabPills({
  activeTab,
  onTabChange,
  isMobile,
}: {
  activeTab: 'hebrew' | 'pairs';
  onTabChange: (tab: 'hebrew' | 'pairs') => void;
  isMobile?: boolean;
}) {
  const tabs: { id: 'hebrew' | 'pairs'; label: string }[] = [
    { id: 'hebrew', label: 'פונטים עבריים' },
    { id: 'pairs', label: 'זוגות פונטים' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: 8,
      justifyContent: 'center',
      padding: isMobile ? '12px 16px' : '0 60px 24px',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: isMobile ? '10px 24px' : '12px 32px',
            borderRadius: 100,
            fontSize: isMobile ? 14 : 15,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            background: activeTab === tab.id ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${activeTab === tab.id ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
            color: activeTab === tab.id ? '#000' : 'rgba(255,255,255,0.5)',
            transition: 'all .2s',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function FontsPage() {
  const [activeTab, setActiveTab] = useState<'hebrew' | 'pairs'>('hebrew');
  const [category, setCategory] = useState('all');
  const [source, setSource] = useState('all');
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const [mobileSearch, setMobileSearch] = useState('');

  // Font pairs state
  const [pairsFilter, setPairsFilter] = useState('הכל');

  const filtered = hebrewFonts.filter(font => {
    if (category !== 'all' && font.category !== category) return false;
    if (source !== 'all' && font.source !== source) return false;
    if (search && !font.name.includes(search) && !font.nameEn.toLowerCase().includes(search.toLowerCase()) && !font.tags.some(t => t.includes(search))) return false;
    return true;
  });

  const filteredPairs = pairsFilter === 'הכל'
    ? FONT_PAIRS
    : FONT_PAIRS.filter(p => p.vibe === pairsFilter);

  /* ═══ MOBILE ═══ */
  if (isMobile) {
    const mobileFiltered = hebrewFonts.filter(font => {
      if (category !== 'all' && font.category !== category) return false;
      if (mobileSearch && !font.name.includes(mobileSearch) && !font.nameEn.toLowerCase().includes(mobileSearch.toLowerCase())) return false;
      return true;
    });

    return (
      <div className="mobile-page">
        <MobilePageHeader title="פונטים" onSearch={setMobileSearch} searchPlaceholder="חפש פונט..." />

        <TabPills activeTab={activeTab} onTabChange={setActiveTab} isMobile />

        {activeTab === 'hebrew' && (
          <>
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
          </>
        )}

        {activeTab === 'pairs' && (
          <>
            <div className="mobile-filter-pills" data-scroll-horizontal>
              {ALL_VIBES.map(tag => (
                <button
                  key={tag}
                  className={`filter-pill-mobile ${pairsFilter === tag ? 'active' : ''}`}
                  onClick={() => setPairsFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div style={{ padding: '8px 16px 80px' }}>
              {filteredPairs.map((pair) => (
                <div key={`${pair.heading}-${pair.body}`} style={{ marginBottom: 16 }}>
                  <FontPairCard pair={pair} isMobile />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  /* ═══ DESKTOP ═══ */
  return (
    <div style={{ minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ padding: '120px 60px 40px', maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', opacity: .4, marginBottom: 16 }}>
          Effecxio
        </div>
        <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
          {activeTab === 'hebrew' ? (
            <>פונטים עבריים<br /><span style={{ color: 'var(--accent)' }}>חינמיים</span></>
          ) : (
            <>זוגות פונטים<br /><span style={{ color: 'var(--accent)' }}>מושלמים</span></>
          )}
        </h1>
        <p style={{ color: '#fff', fontSize: 16, maxWidth: 500, lineHeight: 1.7, margin: '0 auto' }}>
          {activeTab === 'hebrew' ? (
            <>{hebrewFonts.length} פונטים עבריים חינמיים לשימוש מסחרי. לחץ על preview לעריכה חיה — ואז הורד מהמקור המקורי.</>
          ) : (
            <>{FONT_PAIRS.length} זוגות heading + body מ-Google Fonts. לחץ על הטקסט לעריכה חיה — והעתק CSS או פרומפט ל-Lovable.</>
          )}
        </p>
      </div>

      {/* Tab Pills */}
      <TabPills activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ═══ TAB: Hebrew Fonts ═══ */}
      {activeTab === 'hebrew' && (
        <>
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
        </>
      )}

      {/* ═══ TAB: Font Pairs ═══ */}
      {activeTab === 'pairs' && (
        <>
          {/* Filter pills */}
          <div style={{
            padding: '0 60px 32px',
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {ALL_VIBES.map(tag => (
              <button
                key={tag}
                onClick={() => setPairsFilter(tag)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  background: pairsFilter === tag ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${pairsFilter === tag ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                  color: pairsFilter === tag ? '#000' : 'rgba(255,255,255,0.5)',
                  transition: 'all .2s',
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Count */}
          <div style={{ padding: '0 60px 24px', maxWidth: 1400, margin: '0 auto', fontSize: 12, opacity: .3, textAlign: 'center' }}>
            מציג {filteredPairs.length} זוגות
          </div>

          {/* Grid */}
          <div style={{
            padding: '0 60px 100px',
            maxWidth: 1400,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}>
            {filteredPairs.map((pair) => (
              <FontPairCard key={`${pair.heading}-${pair.body}`} pair={pair} />
            ))}
          </div>
        </>
      )}

    </div>
  );
}
