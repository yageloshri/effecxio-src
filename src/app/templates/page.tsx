'use client';
import { useState, useMemo } from 'react';
import { TEMPLATES, TemplateCategory, CATEGORY_LABELS, generateUniversalPrompt } from '@/data/templates';
import type { Template } from '@/data/templates';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { TemplateFilters } from '@/components/templates/TemplateFilters';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobilePageHeader from '@/components/mobile/MobilePageHeader';
import MobileTemplateModal from '@/components/mobile/MobileTemplateModal';
import MobileCopyToast from '@/components/mobile/MobileCopyToast';

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [mobileCopied, setMobileCopied] = useState(false);

  const filtered = useMemo(() => {
    return TEMPLATES.filter(t => {
      const matchCat = activeCategory === 'all' || t.category === activeCategory;
      const matchSearch = !search ||
        t.title.includes(search) ||
        t.titleEn.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some(tag => tag.includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: TEMPLATES.length };
    TEMPLATES.forEach(t => { c[t.category] = (c[t.category] || 0) + 1; });
    return c;
  }, []);

  if (isMobile) {
    const handleMobileCopy = async (template: Template) => {
      try {
        const res = await fetch(template.previewFile);
        const html = await res.text();
        const prompt = generateUniversalPrompt(template, html);
        if (navigator.clipboard) await navigator.clipboard.writeText(prompt);
        else {
          const el = document.createElement('textarea');
          el.value = prompt;
          el.style.cssText = 'position:fixed;left:-9999px';
          document.body.appendChild(el);
          el.select();
          try { document.execCommand('copy'); } finally { document.body.removeChild(el); }
        }
        setMobileCopied(true);
        setTimeout(() => setMobileCopied(false), 2000);
      } catch {}
    };

    return (
      <div className="mobile-page">
        <MobilePageHeader title="טמפלייטים" onSearch={setSearch} searchPlaceholder="חפש טמפלייט..." />

        <div className="mobile-filter-pills" data-scroll-horizontal>
          <button className={`filter-pill-mobile ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>הכל</button>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button key={key} className={`filter-pill-mobile ${activeCategory === key ? 'active' : ''}`} onClick={() => setActiveCategory(key as TemplateCategory)}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ paddingTop: 8 }}>
          {filtered.map((template) => (
            <div key={template.id} className="template-card-mobile card-reveal">
              <div className="template-browser-bar">
                <div className="browser-dot" style={{ background: '#ff5f57' }} />
                <div className="browser-dot" style={{ background: '#febc2e' }} />
                <div className="browser-dot" style={{ background: '#28c840' }} />
              </div>
              <div className="template-preview-mobile">
                <iframe
                  src={template.previewFile}
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '1200px', height: '900px', border: 'none',
                    transform: 'scale(0.29)', transformOrigin: 'top left',
                    pointerEvents: 'none',
                  }}
                  sandbox="allow-same-origin allow-scripts"
                  title={template.titleEn}
                  loading="lazy"
                />
              </div>
              <div className="template-actions-mobile">
                <button className="template-prompt-btn tappable" onClick={() => handleMobileCopy(template)}>
                  העתק פרומפט
                </button>
                <button className="template-preview-btn tappable" onClick={() => setPreviewTemplate(template)} aria-label="תצוגה מקדימה">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {previewTemplate && (
          <MobileTemplateModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
        )}
        <MobileCopyToast show={mobileCopied} message="✓ פרומפט הועתק!" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#f0f0f0' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '120px 24px 60px', direction: 'rtl' }}>
        <div style={{
          fontSize: 13, color: '#555', marginBottom: 20,
          fontFamily: "'Heebo', sans-serif", fontWeight: 400,
          letterSpacing: '0.02em',
        }}>
          <span style={{ color: 'var(--accent)', fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 14 }}>100</span>
          {' \u05d8\u05de\u05e4\u05dc\u05d9\u05d9\u05d8\u05d9\u05dd \u05de\u05d5\u05db\u05e0\u05d9\u05dd'}
        </div>
        <h1 style={{
          fontSize: 'clamp(2.5rem,5vw,4rem)',
          fontWeight: 900,
          margin: '0 0 16px',
          fontFamily: "'Heebo', sans-serif",
        }}>
          {'\u05d1\u05d7\u05e8\u05d5 \u05d8\u05de\u05e4\u05dc\u05d9\u05d9\u05d8, \u05ea\u05e2\u05ea\u05d9\u05e7\u05d5 \u05d5\u05e1\u05d9\u05d9\u05de\u05ea\u05dd.'}
        </h1>
        <p style={{ fontSize: 17, color: '#fff', maxWidth: 500, margin: '0 auto 40px' }}>
          100 טמפלייטים מקצועיים לכל עסק. בחרו, העתיקו פרומפט — קבלו אתר מעוצב תוך דקות.
        </p>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={'\u05d7\u05e4\u05e9 \u05d8\u05de\u05e4\u05dc\u05d9\u05d9\u05d8... (SaaS, \u05e4\u05d5\u05e8\u05d8\u05e4\u05d5\u05dc\u05d9\u05d5, \u05e7\u05e8\u05d9\u05e4\u05d8\u05d5...)'}
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

      {/* Filters */}
      <div style={{ padding: '0 24px' }}>
        <TemplateFilters
          active={activeCategory}
          onChange={setActiveCategory}
          counts={counts}
        />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '0 24px 80px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {filtered.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#555' }}>
          {'\u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d5 \u05d8\u05de\u05e4\u05dc\u05d9\u05d9\u05d8\u05d9\u05dd. \u05e0\u05e1\u05d4 \u05d7\u05d9\u05e4\u05d5\u05e9 \u05d0\u05d7\u05e8.'}
        </div>
      )}
    </div>
  );
}
