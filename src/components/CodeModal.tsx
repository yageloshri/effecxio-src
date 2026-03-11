'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { copyToClipboard } from '@/lib/utils';
import type { Effect } from '@/types';

hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('tsx', typescript);

interface CodeModalProps {
  effect: Effect | null;
  onClose: () => void;
  onCopy: () => void;
}

export default function CodeModal({ effect, onClose, onCopy }: CodeModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset tab when effect changes (React-recommended derived state pattern)
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
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    // Focus the first focusable element
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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-md"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            ref={modalRef}
            className="relative z-10 flex flex-col w-full max-w-3xl overflow-hidden rounded-2xl"
            style={{
              maxHeight: '85vh',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-5"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <h2
                className="text-xl font-bold"
                style={{
                  color: 'var(--text)',
                  fontFamily: "'Heebo', sans-serif",
                }}
              >
                {effect.titleHe}
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg transition-colors duration-200"
                style={{
                  color: 'var(--muted)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                }}
                aria-label="סגור"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div
              className="flex overflow-x-auto"
              style={{
                borderBottom: '1px solid var(--border)',
                scrollbarWidth: 'none',
              }}
            >
              {effect.codeTabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => {
                    setActiveTab(i);
                    setCopied(false);
                  }}
                  className="px-4 py-3 text-sm whitespace-nowrap transition-colors duration-200"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === i
                      ? '2px solid var(--accent)'
                      : '2px solid transparent',
                    color: activeTab === i ? 'var(--accent)' : 'var(--muted)',
                    fontFamily: "'Space Mono', monospace",
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== i) {
                      (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== i) {
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Code pane */}
            <div
              className="flex-1 overflow-auto relative"
              dir="ltr"
              style={{ background: 'var(--code-bg)' }}
            >
              {/* Copy button */}
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                style={{
                  background: copied
                    ? 'rgba(200, 245, 59, 0.15)'
                    : 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${copied ? 'var(--accent)' : 'var(--border)'}`,
                  color: copied ? 'var(--accent)' : 'var(--muted)',
                  fontFamily: "'Space Mono', monospace",
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!copied) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--muted)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!copied) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                  }
                }}
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    <span dir="rtl">הועתק!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span dir="rtl">העתק</span>
                  </>
                )}
              </button>

              {/* Code with line numbers */}
              <div className="p-5 flex">
                {/* Line numbers */}
                <div
                  className="select-none pr-4 text-left"
                  style={{
                    color: 'rgba(255, 255, 255, 0.15)',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13,
                    lineHeight: '1.7',
                    minWidth: 40,
                  }}
                >
                  {codeLines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Code content */}
                <pre
                  className="flex-1 overflow-x-auto"
                  style={{
                    margin: 0,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13,
                    lineHeight: '1.7',
                  }}
                >
                  <code
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    style={{ color: 'var(--text)' }}
                  />
                </pre>
              </div>
            </div>

            {/* Explanation pane */}
            <div
              className="overflow-auto"
              dir="rtl"
              style={{
                borderTop: '1px solid var(--border)',
                maxHeight: '30vh',
              }}
            >
              <div className="p-5">
                <style>{`
                  .explanation-content h4 {
                    color: var(--accent);
                    margin-bottom: 8px;
                    font-family: 'Heebo', sans-serif;
                    font-weight: 700;
                    font-size: 16px;
                  }
                  .explanation-content p {
                    color: var(--muted);
                    margin-bottom: 12px;
                    font-family: 'Heebo', sans-serif;
                    font-size: 14px;
                    line-height: 1.7;
                  }
                  .explanation-content ul {
                    list-style: disc;
                    padding-right: 20px;
                    color: var(--muted);
                    font-family: 'Heebo', sans-serif;
                    font-size: 14px;
                    line-height: 1.7;
                  }
                  .explanation-content li {
                    margin-bottom: 4px;
                  }
                  .explanation-content code {
                    background: var(--code-bg);
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: 'Space Mono', monospace;
                    font-size: 12px;
                    color: var(--accent);
                  }
                `}</style>
                <div
                  className="explanation-content"
                  dangerouslySetInnerHTML={{ __html: effect.explanationHe }}
                />

                {effect.proTipHe && (
                  <div
                    className="mt-4 p-4 rounded-lg"
                    style={{
                      border: '1px solid var(--border)',
                      background: 'rgba(200, 245, 59, 0.03)',
                    }}
                  >
                    <div
                      className="text-sm"
                      style={{
                        fontFamily: "'Heebo', sans-serif",
                        lineHeight: 1.7,
                      }}
                    >
                      <span className="ml-2" style={{ fontSize: 16 }}>
                        &#x1F4A1;
                      </span>
                      <span style={{ color: 'var(--muted)' }}>
                        {effect.proTipHe}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
