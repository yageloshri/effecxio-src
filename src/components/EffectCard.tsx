'use client';

import React, { Suspense } from 'react';
import { Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Effect } from '@/types';
import previewMap from './previews';
import DifficultyDots from '@/components/DifficultyDots';
import QuickCopyButton from '@/components/QuickCopyButton';

interface EffectCardProps {
  effect: Effect;
  onSelect: (effect: Effect) => void;
  onCopy?: () => void;
}

function PreviewSkeleton() {
  return (
    <div
      className="w-full h-full animate-pulse"
      style={{ background: 'var(--surface)' }}
    />
  );
}

export default function EffectCard({ effect, onSelect, onCopy }: EffectCardProps) {
  const PreviewComponent = previewMap[effect.previewComponent];

  return (
    <div
      className="group rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget as HTMLDivElement;
        card.style.boxShadow = '0 0 30px var(--glow)';
        card.style.borderColor = 'var(--border-hover)';
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget as HTMLDivElement;
        card.style.boxShadow = 'none';
        card.style.borderColor = 'var(--border)';
      }}
    >
      {/* Preview area */}
      <div
        className="relative overflow-hidden group-hover:scale-[1.02]"
        style={{
          height: 180,
          borderRadius: 8,
          background: 'linear-gradient(135deg, var(--surface), var(--surface-2))',
          transition: 'transform 0.3s ease 0.05s',
        }}
      >
        {PreviewComponent ? (
          <Suspense fallback={<PreviewSkeleton />}>
            <PreviewComponent />
          </Suspense>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: 'var(--bg)',
              color: 'var(--muted)',
              fontFamily: "'Space Mono', monospace",
              fontSize: 14,
            }}
          >
            Preview
          </div>
        )}

        <QuickCopyButton
          code={effect.codeTabs[0]?.code ?? ''}
          onCopy={onCopy}
        />
      </div>

      {/* Content area */}
      <div className="p-5">
        {/* Title + difficulty */}
        <div className="flex items-center justify-between mb-2">
          <h3
            className="text-lg font-bold"
            style={{
              color: 'var(--text)',
              fontFamily: "'Heebo', sans-serif",
            }}
          >
            {effect.titleHe}
          </h3>
          <DifficultyDots difficulty={effect.difficulty} />
        </div>

        {/* Description */}
        <p
          className="text-sm mb-3 line-clamp-2"
          style={{
            color: 'var(--muted)',
            fontFamily: "'Heebo', sans-serif",
            lineHeight: 1.6,
          }}
        >
          {effect.descriptionHe}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {effect.tags.map((tag) => (
            <span
              key={tag.label}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                color: 'var(--muted)',
                background: 'rgba(255, 255, 255, 0.05)',
                fontFamily: "'Space Mono', monospace",
              }}
            >
              #{tag.label}
            </span>
          ))}
        </div>

        {/* Action button */}
        <button
          onClick={() => onSelect(effect)}
          className={cn(
            'w-full mt-1 py-2 rounded-lg text-sm font-medium',
            'flex items-center justify-center gap-2',
          )}
          style={{
            backgroundImage:
              'linear-gradient(90deg, var(--accent) 50%, transparent 50%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '100% 0',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            fontFamily: "'Heebo', sans-serif",
            cursor: 'pointer',
            transition: 'background-position 0.4s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.backgroundPosition = '0% 0';
            btn.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.backgroundPosition = '100% 0';
            btn.style.color = 'var(--accent)';
          }}
        >
          <Code2 size={16} />
          צפה בקוד
        </button>
      </div>
    </div>
  );
}
