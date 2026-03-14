'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Template, CATEGORY_LABELS, generateUniversalPrompt, getTemplatePalette } from '@/data/templates';
import { ColorStudio } from '@/components/ColorStudio';
import type { ColorPalette } from '@/components/ColorStudio/useColorStudio';

function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    return;
  }
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;left:-9999px';
  document.body.appendChild(el);
  el.select();
  try { document.execCommand('copy'); }
  finally { document.body.removeChild(el); }
}

export function TemplateCard({ template }: { template: Template }) {
  const [copied, setCopied] = useState<'universal' | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [customPalette, setCustomPalette] = useState<ColorPalette | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const templatePalette = useMemo<ColorPalette>(() => {
    const p = getTemplatePalette(template);
    return {
      bg: p.bg, surface: p.surface, accent: p.accent,
      accent2: p.accent2, text: p.text, muted: p.muted, border: p.border,
    };
  }, [template]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Open template — with custom colors injected if active
  const handleOpenTemplate = useCallback(async () => {
    if (!customPalette) {
      window.open(template.previewFile, '_blank');
      return;
    }
    try {
      const res = await fetch(template.previewFile);
      const html = await res.text();
      const colorStyle = `<style id="color-studio-custom">
:root {
  --bg: ${customPalette.bg}; --surface: ${customPalette.surface};
  --accent: ${customPalette.accent}; --accent2: ${customPalette.accent2};
  --text: ${customPalette.text}; --muted: ${customPalette.muted};
  --border: ${customPalette.border};
  --primary: ${customPalette.accent}; --background: ${customPalette.bg};
  --color-accent: ${customPalette.accent}; --color-bg: ${customPalette.bg};
}
</style>`;
      const modified = html.replace('</head>', `${colorStyle}\n</head>`);
      const blob = new Blob([modified], { type: 'text/html' });
      window.open(URL.createObjectURL(blob), '_blank');
    } catch {
      window.open(template.previewFile, '_blank');
    }
  }, [customPalette, template.previewFile]);

  const handleCopyUniversal = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setCopied('universal');
    try {
      const res = await fetch(template.previewFile);
      const html = await res.text();
      const prompt = generateUniversalPrompt(template, html);
      copyToClipboard(prompt);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const difficultyColor: Record<string, string> = {
    '\u05e7\u05dc': '#22c55e',
    '\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9': '#f59e0b',
    '\u05de\u05ea\u05e7\u05d3\u05dd': '#ef4444',
  };

  return (
    <div
      ref={ref}
      onClick={handleOpenTemplate}
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) scale(1.015)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
      }}>

      {/* Browser top bar */}
      <div style={{
        background: '#f5f5f5',
        borderBottom: '1px solid #e5e5e5',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: '#e8e8e8', borderRadius: '5px',
          padding: '3px 10px', fontSize: '10px', color: '#888',
          fontFamily: 'monospace', overflow: 'hidden',
          whiteSpace: 'nowrap', textOverflow: 'ellipsis', direction: 'ltr',
        }}>
          effectslab.dev/t/{template.id}
        </div>
        <span style={{
          fontSize: '9px', fontWeight: 700,
          color: difficultyColor[template.difficulty],
          background: `${difficultyColor[template.difficulty]}18`,
          padding: '2px 8px', borderRadius: '100px', flexShrink: 0,
        }}>
          {template.difficulty}
        </span>
      </div>

      {/* Preview iframe */}
      <div style={{
        position: 'relative', height: '220px',
        overflow: 'hidden', background: '#1a1a2e',
      }}>
        {inView && (
          <iframe
            ref={iframeRef}
            src={template.previewFile}
            onLoad={() => setLoaded(true)}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '1200px', height: '900px', border: 'none',
              transform: 'scale(0.26)', transformOrigin: 'top left',
              pointerEvents: 'none',
              opacity: loaded ? 1 : 0, transition: 'opacity 0.3s',
            }}
            sandbox="allow-same-origin allow-scripts"
            title={template.titleEn}
          />
        )}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: '#444', fontSize: '12px',
          }}>
            {'\u05d8\u05d5\u05e2\u05df \u05ea\u05e6\u05d5\u05d2\u05d4 \u05de\u05e7\u05d3\u05d9\u05de\u05d4...'}
          </div>
        )}

      </div>

      {/* Card footer */}
      <div style={{ padding: '14px 16px', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', direction: 'rtl' }}>
              {template.title}
            </div>
            <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
              {CATEGORY_LABELS[template.category]}
            </div>
          </div>
        </div>

        <button
          onClick={handleCopyUniversal}
          style={{
            width: '100%', padding: '9px 6px', borderRadius: '8px', border: 'none',
            background: copied === 'universal' ? '#16a34a' : '#111',
            color: '#fff', fontSize: '11px', fontWeight: 700,
            cursor: 'pointer', transition: 'all .2s',
            marginBottom: '6px',
          }}>
          {copied === 'universal' ? '\u2713 \u05d4\u05d5\u05e2\u05ea\u05e7' : '\uD83D\uDCCB \u05d4\u05e2\u05ea\u05e7 \u05e4\u05e8\u05d5\u05de\u05e4\u05d8 \u05de\u05dc\u05d0'}
        </button>

        {/* Color Studio trigger */}
        <div onClick={e => e.stopPropagation()}>
          <ColorStudio
            template={template}
            templatePalette={templatePalette}
            iframeRef={iframeRef}
            onPaletteChange={setCustomPalette}
          />
        </div>
      </div>
    </div>
  );
}
