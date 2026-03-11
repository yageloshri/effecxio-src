'use client';

import { useState, useCallback } from 'react';
import type { EffectCategory, Effect } from '@/types';
import { effects } from '@/data/effects';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import EffectsGrid from '@/components/EffectsGrid';
import CodeModal from '@/components/CodeModal';
import ScrollVideoTool from '@/components/ScrollVideoTool';
import Toast from '@/components/Toast';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<EffectCategory | 'all'>('all');
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);
  const [showToast, setShowToast] = useState(false);

  const filtered = activeCategory === 'all'
    ? effects
    : effects.filter(e => e.categories.includes(activeCategory));

  const handleCopy = useCallback(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <FilterBar active={activeCategory} onChange={setActiveCategory} />
      <div style={{ padding: '40px 0 80px' }}>
        <EffectsGrid effects={filtered} onSelect={setSelectedEffect} />
      </div>
      {selectedEffect?.id === 'scrollvideo' ? (
        <ScrollVideoTool
          onClose={() => setSelectedEffect(null)}
          onCopy={handleCopy}
        />
      ) : (
        <CodeModal
          effect={selectedEffect}
          onClose={() => setSelectedEffect(null)}
          onCopy={handleCopy}
        />
      )}
      <Toast show={showToast} />
    </>
  );
}
