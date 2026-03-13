'use client';

import { useEffect, useRef } from 'react';
import type { Template } from '@/data/templates';
import { generateUniversalPrompt } from '@/data/templates';

interface Props {
  template: Template;
  onClose: () => void;
}

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

export default function MobileTemplateModal({ template, onClose }: Props) {
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    };
  }, []);

  // Trap focus inside modal + Escape to close
  useEffect(() => {
    const modalEl = document.querySelector('.template-modal-overlay') as HTMLElement;
    const focusableSelector = 'button, [href], input, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !modalEl) return;

      const focusable = modalEl.querySelectorAll(focusableSelector);
      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const firstBtn = modalEl?.querySelector(focusableSelector) as HTMLElement;
    firstBtn?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyPrompt = async () => {
    try {
      const res = await fetch(template.previewFile);
      const html = await res.text();
      const prompt = generateUniversalPrompt(template, html);
      copyToClipboard(prompt);
    } catch {
      copyToClipboard(template.title);
    }
  };

  return (
    <div
      className="template-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`תצוגה מקדימה: ${template.title}`}
    >
      <div className="template-modal-header">
        <button
          className="mobile-header-btn"
          onClick={onClose}
          aria-label="סגור"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" /><path d="M6 6l12 12" />
          </svg>
        </button>
        <span className="mobile-page-header-title">{template.title}</span>
        <div style={{ width: 44 }} />
      </div>

      <iframe
        className="template-modal-iframe"
        src={template.previewFile}
        title={template.titleEn}
        sandbox="allow-same-origin allow-scripts"
        style={{ height: 'calc(100vh - 56px - 80px)' }}
      />

      <div className="template-modal-cta">
        <button
          className="template-prompt-btn"
          style={{ width: '100%' }}
          onClick={handleCopyPrompt}
        >
          העתק פרומפט ←
        </button>
      </div>
    </div>
  );
}
