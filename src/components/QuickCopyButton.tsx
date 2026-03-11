'use client';

import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface QuickCopyButtonProps {
  code: string;
  onCopy?: () => void;
}

export default function QuickCopyButton({ code, onCopy }: QuickCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(code);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  }, [code, onCopy]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      style={{
        background: copied ? 'rgba(200,245,59,0.2)' : 'rgba(0,0,0,0.7)',
        border: `1px solid ${copied ? 'var(--accent)' : 'var(--border)'}`,
        color: copied ? 'var(--accent)' : 'var(--text)',
        fontFamily: "'Space Mono', monospace",
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'הועתק' : 'העתק'}
    </button>
  );
}
