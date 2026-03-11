'use client';

import { motion } from 'framer-motion';
import { getCategoryLabel } from '@/lib/utils';
import type { EffectCategory } from '@/types';

const CATEGORIES: (EffectCategory | 'all')[] = [
  'all',
  'text',
  'background',
  'button',
  'scroll',
  'cursor',
  'card',
  'hover',
  'loader',
  'media',
  'interaction',
];

interface FilterBarProps {
  active: EffectCategory | 'all';
  onChange: (cat: EffectCategory | 'all') => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div
      className="sticky z-40 backdrop-blur-lg"
      style={{
        top: 64,
        background: 'rgba(8, 8, 8, 0.85)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="flex gap-2 overflow-x-auto"
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '12px 24px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          .filter-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {CATEGORIES.map((cat) => {
          const isActive = active === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => onChange(cat)}
              whileTap={{ scale: 0.95 }}
              className="rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors duration-200"
              style={{
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                color: isActive ? 'var(--accent)' : 'var(--muted)',
                background: isActive ? 'rgba(200, 245, 59, 0.1)' : 'transparent',
                fontFamily: "'Heebo', sans-serif",
                cursor: 'pointer',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--muted)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                }
              }}
            >
              {getCategoryLabel(cat)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
