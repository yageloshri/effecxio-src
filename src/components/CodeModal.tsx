'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Copy, Check, Sparkles } from 'lucide-react';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { copyToClipboard } from '@/lib/utils';
import type { Effect } from '@/types';
import previewMap from './previews';

hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('tsx', typescript);

const DIFFICULTY_MAP: Record<string, { color: string; bg: string; label: string }> = {
  beginner:     { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)', label: 'קל' },
  intermediate: { color: '#facc15', bg: 'rgba(250, 204, 21, 0.1)', label: 'בינוני' },
  advanced:     { color: '#f87171', bg: 'rgba(248, 113, 113, 0.1)', label: 'מתקדם' },
};

const DOTS = [
  { color: '#ff5f57' },
  { color: '#febc2e' },
  { color: '#28c840' },
];

interface CodeModalProps {
  effect: Effect | null;
  onClose: () => void;
  onCopy: () => void;
}

export default function CodeModal({ effect, onClose, onCopy }: CodeModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset tab when effect changes
  const [prevEffectId, setPrevEffectId] = useState<string | undefined>(effect?.id);
  if (prevEffectId !== effect?.id) {
    setPrevEffectId(effect?.id);
    setActiveTab(0);
    setCopied(false);
  }

  // Escape key to close
  useEffect(() => {
    if (!effect) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [effect, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (!effect) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [effect]);

  // Focus trap
  useEffect(() => {
    if (!effect || !modalRef.current) return;
    const modal = modalRef.current;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleTab);
    const firstFocusable = modal.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
    return () => document.removeEventListener('keydown', handleTab);
  }, [effect]);

  const handleCopy = useCallback(async () => {
    if (!effect) return;
    const code = effect.codeTabs[activeTab]?.code ?? '';
    copyToClipboard(code);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  }, [effect, activeTab, onCopy]);

  function highlightCode(code: string, language: string): string {
    const lang = language.toLowerCase();
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }

  const currentTab = effect?.codeTabs[activeTab];
  const codeLines = currentTab?.code.split('\n') ?? [];
  const highlightedCode = currentTab
    ? highlightCode(currentTab.code, currentTab.language)
    : '';

  const diff = effect ? (DIFFICULTY_MAP[effect.difficulty] ?? { color: '#9ca3af', bg: 'rgba(156,163,175,0.1)', label: effect.difficulty }) : null;
  const PreviewComponent = effect ? previewMap[effect.previewComponent] : undefined;

  return (
    <AnimatePresence>
      {effect && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <style>{`
            .codemodal-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
            .codemodal-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .codemodal-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255,255,255,0.1);
              border-radius: 3px;
            }
            .codemodal-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255,255,255,0.2);
            }
            .codemodal-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }

            .codemodal-explanation h4 {
              color: var(--accent);
              margin-bottom: 8px;
              font-family: 'Heebo', sans-serif;
              font-weight: 700;
              font-size: 15px;
            }
            .codemodal-explanation p {
              color: rgba(255,255,255,0.7);
              margin-bottom: 10px;
              font-family: 'Heebo', sans-serif;
              font-size: 13.5px;
              line-height: 1.75;
            }
            .codemodal-explanation ul {
              list-style: none;
              padding: 0;
              color: rgba(255,255,255,0.7);
              font-family: 'Heebo', sans-serif;
              font-size: 13.5px;
              line-height: 1.75;
            }
            .codemodal-explanation li {
              margin-bottom: 4px;
              padding-right: 16px;
              position: relative;
            }
            .codemodal-explanation li::before {
              content: '';
              position: absolute;
              right: 0;
              top: 10px;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: var(--accent);
              opacity: 0.6;
            }
            .codemodal-explanation code {
              background: rgba(200, 245, 59, 0.08);
              padding: 2px 7px;
              border-radius: 4px;
              font-family: 'Space Mono', monospace;
              font-size: 11.5px;
              color: var(--accent);
              border: 1px solid rgba(200, 245, 59, 0.15);
            }

            @media (max-width: 900px) {
              .codemodal-grid { grid-template-columns: 1fr !important; }
              .codemodal-left { max-height: 300px !important; }
            }
          `}</style>

          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-xl"
            style={{ background: 'rgba(0, 0, 0, 0.85)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            ref={modalRef}
            className="relative z-10 flex flex-col w-full overflow-hidden"
            style={{
              maxWidth: 1200,
              maxHeight: '92vh',
              borderRadius: 20,
              background: '#0c0c0c',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 0 80px rgba(0,0,0,0.8), 0 0 40px rgba(200, 245, 59, 0.03)',
            }}
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header Bar ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              {/* Left: Title + badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, direction: 'rtl', minWidth: 0 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#ffffff',
                    fontFamily: "'Heebo', sans-serif",
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {effect.titleHe}
                </h2>

                {diff && (
                  <span
                    style={{
                      fontSize: 11,
                      padding: '3px 10px',
                      borderRadius: 20,
                      background: diff.bg,
                      color: diff.color,
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 700,
                      border: `1px solid ${diff.color}22`,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {diff.label}
                  </span>
                )}

                <span
                  style={{
                    fontSize: 10,
                    padding: '3px 8px',
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: "'Space Mono', monospace",
                    border: '1px solid rgba(255,255,255,0.06)',
                    flexShrink: 0,
                  }}
                >
                  {effect.categories[0]}
                </span>
              </div>

              {/* Right: Copy + Close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <button
                  onClick={handleCopy}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 20px',
                    borderRadius: 10,
                    background: copied ? 'rgba(200, 245, 59, 0.12)' : 'var(--accent)',
                    color: copied ? 'var(--accent)' : '#000',
                    border: copied ? '1px solid rgba(200,245,59,0.3)' : '1px solid transparent',
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: copied ? 'none' : '0 0 24px rgba(200, 245, 59, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    if (!copied) e.currentTarget.style.boxShadow = '0 0 36px rgba(200,245,59,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    if (!copied) e.currentTarget.style.boxShadow = '0 0 24px rgba(200,245,59,0.2)';
                  }}
                >
                  {copied ? <><Check size={15} /> הועתק!</> : <><Copy size={15} /> העתק קוד</>}
                </button>

                <button
                  onClick={onClose}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                  }}
                  aria-label="סגור"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── Two-Column Grid ── */}
            <div
              className="codemodal-grid flex-1 overflow-hidden"
              style={{
                display: 'grid',
                gridTemplateColumns: '380px 1fr',
                minHeight: 0,
              }}
            >
              {/* ── Left Column: Preview + Info ── */}
              <div
                className="codemodal-left codemodal-scrollbar"
                style={{
                  borderRight: '1px solid rgba(255,255,255,0.06)',
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Live Preview in browser frame */}
                <div style={{ padding: 20, paddingBottom: 0 }}>
                  <div
                    style={{
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: '#1a1a1a',
                    }}
                  >
                    {/* Browser bar */}
                    <div
                      style={{
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#1a1a1a',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 5 }}>
                        {DOTS.map((dot, i) => (
                          <div
                            key={i}
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: '50%',
                              background: dot.color,
                              opacity: 0.8,
                            }}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          background: 'rgba(255,255,255,0.05)',
                          borderRadius: 5,
                          padding: '3px 8px',
                          fontSize: 10,
                          fontFamily: "'Space Mono', monospace",
                          color: 'rgba(255,255,255,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <span style={{ fontSize: 8, flexShrink: 0 }}>&#x1F512;</span>
                        <span>effecxio.dev/{effect.id}</span>
                      </div>
                    </div>

                    {/* Preview area */}
                    <div
                      style={{
                        height: 220,
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {PreviewComponent ? (
                        <Suspense
                          fallback={
                            <div style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'Space Mono', monospace", fontSize: 12 }}>
                              Loading...
                            </div>
                          }
                        >
                          <PreviewComponent />
                        </Suspense>
                      ) : (
                        <div style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'Space Mono', monospace", fontSize: 12 }}>
                          Preview
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ padding: '16px 20px 0' }} dir="rtl">
                  <p
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.75,
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: "'Heebo', sans-serif",
                      margin: 0,
                    }}
                  >
                    {effect.descriptionHe}
                  </p>
                </div>

                {/* Tags */}
                {effect.tags.length > 0 && (
                  <div style={{ padding: '12px 20px 0', display: 'flex', flexWrap: 'wrap', gap: 6, direction: 'rtl' }}>
                    {effect.tags.map((tag) => (
                      <span
                        key={tag.label}
                        style={{
                          fontSize: 10,
                          padding: '3px 9px',
                          borderRadius: 20,
                          background: 'rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.35)',
                          fontFamily: "'Space Mono', monospace",
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        #{tag.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Divider */}
                <div
                  style={{
                    margin: '16px 20px',
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                  }}
                />

                {/* Explanation */}
                <div style={{ padding: '0 20px', direction: 'rtl', flex: 1 }}>
                  <div
                    className="codemodal-explanation"
                    dangerouslySetInnerHTML={{ __html: effect.explanationHe }}
                  />

                  {/* Pro tip */}
                  {effect.proTipHe && (
                    <div
                      style={{
                        marginTop: 14,
                        padding: '12px 14px',
                        borderRadius: 10,
                        background: 'rgba(200, 245, 59, 0.04)',
                        border: '1px solid rgba(200, 245, 59, 0.1)',
                        display: 'flex',
                        gap: 8,
                        alignItems: 'flex-start',
                      }}
                    >
                      <Sparkles size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 3 }} />
                      <span
                        style={{
                          fontSize: 12.5,
                          lineHeight: 1.7,
                          color: 'rgba(255,255,255,0.55)',
                          fontFamily: "'Heebo', sans-serif",
                        }}
                      >
                        {effect.proTipHe}
                      </span>
                    </div>
                  )}

                  {/* AI Prompt */}
                  {effect.promptHe && (
                    <div
                      style={{
                        marginTop: 14,
                        padding: '12px 14px',
                        borderRadius: 10,
                        background: 'rgba(168, 85, 247, 0.05)',
                        border: '1px solid rgba(168, 85, 247, 0.12)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: 'rgba(168, 85, 247, 0.7)',
                          fontFamily: "'Heebo', sans-serif",
                          marginBottom: 6,
                        }}
                      >
                        פרומפט ל-AI
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          lineHeight: 1.7,
                          color: 'rgba(255,255,255,0.45)',
                          fontFamily: "'Heebo', sans-serif",
                          margin: 0,
                        }}
                      >
                        {effect.promptHe}
                      </p>
                    </div>
                  )}

                  <div style={{ height: 20 }} />
                </div>
              </div>

              {/* ── Right Column: Code ── */}
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                {/* Tabs bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    padding: '10px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.015)',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                  }}
                >
                  {effect.codeTabs.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => { setActiveTab(i); setCopied(false); }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontFamily: "'Space Mono', monospace",
                        fontWeight: activeTab === i ? 700 : 400,
                        cursor: 'pointer',
                        border: 'none',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s',
                        background: activeTab === i ? 'rgba(200, 245, 59, 0.1)' : 'transparent',
                        color: activeTab === i ? 'var(--accent)' : 'rgba(255,255,255,0.35)',
                      }}
                      onMouseEnter={(e) => {
                        if (activeTab !== i) e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== i) e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Code area */}
                <div
                  className="codemodal-scrollbar"
                  dir="ltr"
                  style={{
                    flex: 1,
                    overflow: 'auto',
                    background: '#0a0a0a',
                  }}
                >
                  <div style={{ padding: '20px 20px', display: 'flex', minWidth: 'fit-content' }}>
                    {/* Line numbers */}
                    <div
                      style={{
                        userSelect: 'none',
                        paddingRight: 20,
                        textAlign: 'right',
                        color: 'rgba(255, 255, 255, 0.12)',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 12.5,
                        lineHeight: '1.75',
                        minWidth: 36,
                      }}
                    >
                      {codeLines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>

                    {/* Separator */}
                    <div
                      style={{
                        width: 1,
                        background: 'rgba(255,255,255,0.04)',
                        marginRight: 20,
                        flexShrink: 0,
                      }}
                    />

                    {/* Code content */}
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 12.5,
                        lineHeight: '1.75',
                        flex: 1,
                      }}
                    >
                      <code
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                        style={{ color: 'rgba(255,255,255,0.85)' }}
                      />
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
