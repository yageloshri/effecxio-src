'use client';

import { motion } from 'framer-motion';
import type { Effect } from '@/types';
import EffectCard from '@/components/EffectCard';

interface CategorySectionProps {
  id: string;
  label: string;
  tagline: string;
  count: number;
  effects: Effect[];
  onSelect: (effect: Effect) => void;
}

export default function CategorySection({
  id,
  label,
  tagline,
  count,
  effects,
  onSelect,
}: CategorySectionProps) {
  return (
    <section
      id={id}
      style={{
        maxWidth: 1360,
        margin: '0 auto',
        padding: '40px 24px',
      }}
    >
      {/* Section header row */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          direction: 'rtl',
        }}
      >
        <h2
          style={{
            fontFamily: 'Heebo, sans-serif',
            fontWeight: 700,
            fontSize: 24,
            color: 'var(--text)',
            margin: 0,
          }}
        >
          &#x25C8; {label}
        </h2>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: 'var(--muted)',
          }}
        >
          {count} &#x5D0;&#x5E4;&#x5E7;&#x5D8;&#x5D9;&#x5DD;
        </span>
      </motion.div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'Heebo, sans-serif',
          fontSize: 16,
          color: 'var(--muted)',
          marginTop: 8,
          marginBottom: 24,
          direction: 'rtl',
        }}
      >
        {tagline}
      </p>

      {/* Effects grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 20,
        }}
      >
        {effects.map((effect) => (
          <EffectCard key={effect.id} effect={effect} onSelect={onSelect} />
        ))}
      </div>

      {/* Gradient divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        style={{
          height: 1,
          width: '60%',
          margin: '48px auto 0',
          background:
            'linear-gradient(90deg, var(--accent) 0%, transparent 100%)',
          opacity: 0.3,
          originX: 1,
        }}
      />
    </section>
  );
}
