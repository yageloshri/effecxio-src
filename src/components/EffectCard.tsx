'use client';

import React, { Suspense } from 'react';
import { Code2 } from 'lucide-react';
import { cn, getDifficultyLabel } from '@/lib/utils';
import type { Effect } from '@/types';
import previewMap from './previews';

interface EffectCardProps {
  effect: Effect;
  onSelect: (effect: Effect) => void;
}

function PreviewSkeleton() {
  return (
    <div
      className="w-full h-full animate-pulse"
      style={{ background: 'var(--surface)' }}
    />
  );
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'var(--accent)';
    case 'intermediate':
      return 'var(--accent3)';
    case 'advanced':
      return 'var(--accent2)';
    default:
      return 'var(--muted)';
  }
}

export default function EffectCard({ effect, onSelect }: EffectCardProps) {
  const PreviewComponent = previewMap[effect.previewComponent];
  const diffColor = getDifficultyColor(effect.difficulty);

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          'rgba(200, 245, 59, 0.3)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
      }}
    >
      {/* Preview area */}
      <div
        className="relative overflow-hidden"
        style={{ height: 180, background: 'var(--surface)' }}
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
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              color: diffColor,
              border: `1px solid ${diffColor}`,
              background: `color-mix(in srgb, ${diffColor} 10%, transparent)`,
              fontFamily: "'Heebo', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            {getDifficultyLabel(effect.difficulty)}
          </span>
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
            'transition-all duration-200',
          )}
          style={{
            background: 'transparent',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            fontFamily: "'Heebo', sans-serif",
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = 'var(--accent)';
            btn.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = 'transparent';
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
