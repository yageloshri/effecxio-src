'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useColorStudio, ColorPalette } from './useColorStudio';
import { MoodSelector } from './MoodSelector';

import { ManualPicker } from './ManualPicker';
import { ColorPreview } from './ColorPreview';
import { Template, CATEGORY_LABELS } from '@/data/templates';
import './colorStudio.css';

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

function generatePromptWithPalette(template: Template, palette: ColorPalette): string {
  return `# ${template.titleEn} — Build Prompt (Custom Colors)

## מה לבנות
${template.title} — דף נחיתה מלא עם ${template.sections.length} סקשנים.
קטגוריה: ${CATEGORY_LABELS[template.category]}

## Design Tokens (Custom Palette)
- Background: ${palette.bg}
- Surface: ${palette.surface}
- Accent: ${palette.accent}
- Accent 2: ${palette.accent2}
- Text: ${palette.text}
- Muted: ${palette.muted}
- Border: ${palette.border}

## סקשנים
${template.sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## הנחיות
- RTL Hebrew layout (dir="rtl", lang="he")
- כל הטקסטים בעברית
- Responsive: mobile-first with breakpoints at 768px and 1024px
- Scroll-reveal animations (fade up)
- Hover effects on cards and buttons
- Sticky navbar with backdrop-filter blur

## אם אתה ב-Lovable/Base44/v0
השתמש בצבעים למעלה ובנה React component עם אותו עיצוב מדויק.

## אם אתה ב-Next.js/React
- CSS variables for all design tokens
- page.tsx with all sections
- Tailwind CSS + framer-motion`;
}

interface ColorStudioProps {
  template: Template;
  templatePalette: ColorPalette;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  onPaletteChange?: (palette: ColorPalette | null) => void;
}

export function ColorStudio({ template, templatePalette, iframeRef, onPaletteChange }: ColorStudioProps) {
  const { state, setPalette: _setPalette, undo, reset: _reset, open, close: _close, setActiveMode, setLoading } = useColorStudio(iframeRef);
  const panelRef = useRef<HTMLDivElement>(null);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);
  const [toast, setToast] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Helper to apply palette to any iframe document
  const applyPaletteToDoc = useCallback((doc: Document, palette: ColorPalette) => {
    const root = doc.documentElement;
    Object.entries(palette).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
      if (key === 'accent') {
        root.style.setProperty('--primary', value);
        root.style.setProperty('--color-accent', value);
      }
      if (key === 'bg') {
        root.style.setProperty('--background', value);
        root.style.setProperty('--color-bg', value);
      }
    });
    if (!doc.getElementById('color-studio-transitions')) {
      const style = doc.createElement('style');
      style.id = 'color-studio-transitions';
      style.textContent = `*, *::before, *::after {
        transition: background-color 0.35s ease, color 0.35s ease,
        border-color 0.35s ease, box-shadow 0.35s ease !important;
      }`;
      doc.head.appendChild(style);
    }
  }, []);

  // Live-update the large preview iframe whenever palette changes
  useEffect(() => {
    const doc = previewIframeRef.current?.contentDocument;
    if (doc && state.isOpen) {
      applyPaletteToDoc(doc, state.palette);
    }
  }, [state.palette, state.isOpen, applyPaletteToDoc]);

  // Wrap setPalette to also notify parent
  const setPalette = (p: ColorPalette, addToHistory?: boolean) => {
    _setPalette(p, addToHistory);
    onPaletteChange?.(p);
  };

  const reset = () => {
    _reset();
    onPaletteChange?.(null);
  };

  const close = () => {
    _close();
    onPaletteChange?.(null);
  };

  useEffect(() => {
    if (state.isOpen) {
      open(templatePalette);
    }
  }, [template.id]);

  // Close on Escape
  useEffect(() => {
    if (!state.isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [state.isOpen]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleCopyPrompt = async () => {
    try {
      const res = await fetch(template.previewFile);
      const html = await res.text();
      const palettePrompt = generatePromptWithPalette(template, state.palette);
      const fullPrompt = `${palettePrompt}

## הקוד המקורי (לרפרנס)
\`\`\`html
${html}
\`\`\``;
      copyToClipboard(fullPrompt);
      showToast('פרומפט עם הצבעים החדשים הועתק!');
    } catch {
      const prompt = generatePromptWithPalette(template, state.palette);
      copyToClipboard(prompt);
      showToast('פרומפט הועתק!');
    }
  };

  // Trigger button (renders inside the card)
  if (!state.isOpen) {
    return (
      <button className="cs-trigger" onClick={(e) => { e.stopPropagation(); open(templatePalette); }}>
        <svg viewBox="0 0 24 24" fill="none" className="cs-trigger-icon">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8" cy="8" r="2" fill="#ef4444"/>
          <circle cx="16" cy="8" r="2" fill="#3b82f6"/>
          <circle cx="8" cy="16" r="2" fill="#22c55e"/>
          <circle cx="16" cy="16" r="2" fill="#f59e0b"/>
        </svg>
        <span>{'\u05e6\u05d1\u05e2\u05d9\u05dd'}</span>
      </button>
    );
  }

  // Full-screen split layout via portal
  const panel = (
    <div className="cs-fullscreen" onClick={close}>
      {/* Left: large iframe preview */}
      <div className="cs-preview-area" onClick={e => e.stopPropagation()}>
        <iframe
          src={template.previewFile}
          className="cs-preview-iframe"
          sandbox="allow-same-origin allow-scripts"
          title={template.titleEn}
          ref={previewIframeRef}
          onLoad={() => {
            const doc = previewIframeRef.current?.contentDocument;
            if (doc) applyPaletteToDoc(doc, state.palette);
          }}
        />
        <div className="cs-preview-label">{template.title}</div>
      </div>

      {/* Right: Color Studio panel */}
      <div className="cs-panel" ref={panelRef} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="cs-header">
          <div className="cs-header-left">
            <div className="cs-logo">
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <circle cx="10" cy="10" r="9" stroke="#c8f53b" strokeWidth="1.2"/>
                <circle cx="7" cy="8" r="2" fill="#ef4444"/>
                <circle cx="13" cy="8" r="2" fill="#3b82f6"/>
                <circle cx="7" cy="13" r="2" fill="#22c55e"/>
                <circle cx="13" cy="13" r="2" fill="#f59e0b"/>
              </svg>
              Color Studio
            </div>
            <div className="cs-history-btns">
              <button
                className="cs-icon-btn"
                onClick={undo}
                disabled={state.historyIndex <= 0}
                title="Undo"
              >{'\u21A9'}</button>
              <button
                className="cs-icon-btn"
                onClick={reset}
                title="Reset to original"
              >{'\u21BA'}</button>
            </div>
          </div>
          <button className="cs-close" onClick={close}>{'\u2715'}</button>
        </div>

        {/* Mode tabs */}
        <div className="cs-tabs">
          {([
            { id: 'moods', label: '\u2726 Moods' },
            { id: 'manual', label: '\u2726 \u05d9\u05d3\u05e0\u05d9' },
          ] as const).map(tab => (
            <button
              key={tab.id}
              className={`cs-tab ${state.activeMode === tab.id ? 'active' : ''}`}
              onClick={() => setActiveMode(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="cs-content">
          {state.activeMode === 'moods' && (
            <MoodSelector currentPalette={state.palette} onSelect={setPalette} />
          )}

          {state.activeMode === 'manual' && (
            <ManualPicker
              palette={state.palette}
              onChange={(key, value) => setPalette({ ...state.palette, [key]: value })}
            />
          )}
        </div>

        {/* Current palette preview */}
        <ColorPreview palette={state.palette} />

        {/* Actions */}
        <div className="cs-actions">
          <button className="cs-btn-primary" onClick={handleCopyPrompt}>
            {'\u2B07'} העתק פרומפט עם הצבעים
          </button>
          <button className="cs-btn-ghost" onClick={reset}>
            איפוס
          </button>
        </div>
      </div>

      {toast && <div className="cs-toast">{toast}</div>}
    </div>
  );

  return (
    <>
      {/* Keep trigger visible but styled as "active" */}
      <button className="cs-trigger cs-trigger-active" onClick={(e) => { e.stopPropagation(); close(); }}>
        <svg viewBox="0 0 24 24" fill="none" className="cs-trigger-icon">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8" cy="8" r="2" fill="#ef4444"/>
          <circle cx="16" cy="8" r="2" fill="#3b82f6"/>
          <circle cx="8" cy="16" r="2" fill="#22c55e"/>
          <circle cx="16" cy="16" r="2" fill="#f59e0b"/>
        </svg>
        <span>{'\u05e4\u05e2\u05d9\u05dc'}</span>
      </button>
      {/* Portal: panel renders at body level */}
      {mounted && createPortal(panel, document.body)}
    </>
  );
}
