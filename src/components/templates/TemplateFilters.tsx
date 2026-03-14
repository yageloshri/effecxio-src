'use client';

import { TemplateCategory, CATEGORY_LABELS } from '@/data/templates';

const CATEGORIES = Object.entries(CATEGORY_LABELS) as [TemplateCategory, string][];

interface Props {
  active: TemplateCategory | 'all';
  onChange: (cat: TemplateCategory | 'all') => void;
  counts: Record<string, number>;
}

export function TemplateFilters({ active, onChange, counts }: Props) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
      <button
        onClick={() => onChange('all')}
        style={{
          padding: '8px 18px', borderRadius: '100px', border: 'none', cursor: 'pointer',
          background: active === 'all' ? '#c8f53b' : 'rgba(255,255,255,0.06)',
          color: active === 'all' ? '#000' : '#fff',
          fontSize: '13px', fontWeight: 600, transition: 'all .2s',
        }}>
        {'\u05d4\u05db\u05dc'} ({counts.all || 0})
      </button>
      {CATEGORIES.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            padding: '8px 18px', borderRadius: '100px', border: 'none', cursor: 'pointer',
            background: active === key ? '#c8f53b' : 'rgba(255,255,255,0.06)',
            color: active === key ? '#000' : '#aaa',
            fontSize: '13px', fontWeight: 600, transition: 'all .2s',
          }}>
          {label} {counts[key] ? `(${counts[key]})` : ''}
        </button>
      ))}
    </div>
  );
}
