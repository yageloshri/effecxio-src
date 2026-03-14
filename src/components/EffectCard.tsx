'use client';

import React, { useState } from 'react';
import type { Effect } from '@/types';
import previewMap from './previews';
import QuickCopyButton from '@/components/QuickCopyButton';
import ViewportPreview from '@/components/ViewportPreview';

interface EffectCardProps {
  effect: Effect;
  onSelect: (effect: Effect) => void;
  onCopy?: () => void;
}

const DOTS = [
  { color: '#ff5f57', shadow: '#ff5f5766' },
  { color: '#febc2e', shadow: '#febc2e66' },
  { color: '#28c840', shadow: '#28c84066' },
];

const DIFFICULTY_MAP: Record<string, { bg: string; text: string; label: string }> = {
  beginner:     { bg: '#dcfce7', text: '#166534', label: 'קל' },
  intermediate: { bg: '#fef9c3', text: '#854d0e', label: 'בינוני' },
  advanced:     { bg: '#fee2e2', text: '#991b1b', label: 'מתקדם' },
};

export default function EffectCard({ effect, onSelect, onCopy }: EffectCardProps) {
  const PreviewComponent = previewMap[effect.previewComponent];
  const [hovered, setHovered] = useState(false);
  const diff = DIFFICULTY_MAP[effect.difficulty] ?? { bg: '#f3f4f6', text: '#374151', label: effect.difficulty };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(effect)}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)'
          : '0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.03)',
        transform: hovered ? 'translateY(-5px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          background: '#f0f0f0',
          borderBottom: '1px solid #e2e2e2',
          padding: '9px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          userSelect: 'none',
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {DOTS.map((dot, i) => (
            <div
              key={i}
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                background: hovered ? dot.color : '#d0d0d0',
                boxShadow: hovered ? `0 0 6px ${dot.shadow}` : 'none',
                transition: 'background 0.25s, box-shadow 0.25s',
              }}
            />
          ))}
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: '#ffffff',
            border: '1px solid #d8d8d8',
            borderRadius: 5,
            padding: '3px 8px',
            fontSize: 11,
            fontFamily: "'Space Mono', monospace",
            color: '#555',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            minWidth: 0,
          }}
        >
          <span style={{ color: '#22c55e', fontSize: 9, flexShrink: 0 }}>&#x1F512;</span>
          <span style={{ color: '#aaa', flexShrink: 0 }}>effectslab.dev/</span>
          <span
            style={{
              color: '#222',
              fontWeight: 700,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {effect.id}
          </span>
        </div>

        {/* Difficulty badge */}
        <span
          style={{
            fontSize: 10,
            padding: '2px 8px',
            borderRadius: 20,
            background: diff.bg,
            color: diff.text,
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {diff.label}
        </span>
      </div>

      {/* ── Preview area ── */}
      <div
        style={{
          height: 200,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ViewportPreview component={PreviewComponent} height={200} />

        <QuickCopyButton
          code={effect.codeTabs[0]?.code ?? ''}
          onCopy={onCopy}
        />
      </div>

      {/* ── Footer bar ── */}
      <div
        style={{
          background: '#fafafa',
          borderTop: '1px solid #ebebeb',
          padding: '10px 13px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        {/* Title */}
        <span
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: '#111111',
            direction: 'rtl',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {effect.titleHe}
        </span>

        {/* Right: category + code button */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <span
            style={{
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 4,
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: '#6b7280',
              fontFamily: "'Space Mono', monospace",
              whiteSpace: 'nowrap',
            }}
          >
            {effect.categories[0]}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(effect);
            }}
            style={{
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 5,
              background: '#111',
              color: '#c8f53b',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              letterSpacing: '0.02em',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#111';
            }}
          >
            {'</>'}
          </button>
        </div>
      </div>
    </div>
  );
}
