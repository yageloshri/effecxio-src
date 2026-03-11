'use client';

import { useState, useCallback } from 'react';
import { effects } from '@/data/effects';
import { CATEGORY_ORDER, getEffectsByCategory } from '@/lib/categories';
import type { Effect } from '@/types';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ScrollProgress from '@/components/ScrollProgress';
import FeaturedSection from '@/components/FeaturedSection';
import FilterBar from '@/components/FilterBar';
import CategorySection from '@/components/CategorySection';
import DeferredSection from '@/components/DeferredSection';
import ClosingCTA from '@/components/ClosingCTA';
import Footer from '@/components/Footer';
import CodeModal from '@/components/CodeModal';
import ScrollVideoTool from '@/components/ScrollVideoTool';
import Toast from '@/components/Toast';

export default function Home() {
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);
  const [showToast, setShowToast] = useState(false);
  const categoryMap = getEffectsByCategory(effects);

  const handleCopy = useCallback(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Header />
      <Hero />
      <FeaturedSection effects={effects} onSelect={setSelectedEffect} onCopy={handleCopy} />
      <FilterBar />
      {CATEGORY_ORDER.map((meta, index) => {
        const catEffects = categoryMap.get(meta.id);
        if (!catEffects || catEffects.length === 0) return null;
        const section = (
          <CategorySection
            key={meta.id}
            id={meta.id}
            label={meta.label}
            tagline={meta.tagline}
            count={catEffects.length}
            effects={catEffects}
            onSelect={setSelectedEffect}
          />
        );
        // First 2 categories render immediately; rest are deferred
        if (index < 2) return section;
        return (
          <DeferredSection key={meta.id} id={`cat-${meta.id}`} height={600}>
            {section}
          </DeferredSection>
        );
      })}
      <ClosingCTA effects={effects} />
      <Footer />
      {selectedEffect?.id === 'scrollvideo' ? (
        <ScrollVideoTool onClose={() => setSelectedEffect(null)} onCopy={handleCopy} />
      ) : (
        <CodeModal effect={selectedEffect} onClose={() => setSelectedEffect(null)} onCopy={handleCopy} />
      )}
      <Toast show={showToast} />
    </>
  );
}
