'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Effect } from '@/types';
import EffectCard from './EffectCard';

interface EffectsGridProps {
  effects: Effect[];
  onSelect: (effect: Effect) => void;
}

export default function EffectsGrid({ effects, onSelect }: EffectsGridProps) {
  return (
    <div
      style={{
        maxWidth: 1360,
        margin: '0 auto',
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 20,
        }}
      >
        <AnimatePresence mode="popLayout">
          {effects.map((effect, index) => (
            <motion.div
              key={effect.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.3,
                delay: Math.min(index * 0.03, 0.8),
                layout: { duration: 0.3 },
              }}
            >
              <EffectCard effect={effect} onSelect={onSelect} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
