'use client';

import { useState, useCallback, Suspense } from 'react';
import { effects } from '@/data/effects';
import { CATEGORY_ORDER, getEffectsByCategory } from '@/lib/categories';
import type { Effect } from '@/types';
import Hero from '@/components/Hero';
import ScrollProgress from '@/components/ScrollProgress';
import FilterBar from '@/components/FilterBar';
import CategorySection from '@/components/CategorySection';
import DeferredSection from '@/components/DeferredSection';
import ClosingCTA from '@/components/ClosingCTA';
import Footer from '@/components/Footer';
import CodeModal from '@/components/CodeModal';
import ScrollVideoTool from '@/components/ScrollVideoTool';
import Toast from '@/components/Toast';
import ScrollSideMessages from '@/components/ScrollSideMessages';
import DevTestimonials from '@/components/DevTestimonials';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobilePageHeader from '@/components/mobile/MobilePageHeader';
import MobileCopyToast from '@/components/mobile/MobileCopyToast';
import previewMap from '@/components/previews';

export default function Home() {
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);
  const [showToast, setShowToast] = useState(false);
  const categoryMap = getEffectsByCategory(effects);
  const isMobile = useIsMobile();
  const [mobileSearch, setMobileSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleCopy = useCallback(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  if (isMobile) {
    const allEffects = CATEGORY_ORDER.flatMap(meta => categoryMap.get(meta.id) || []);
    const filteredEffects = allEffects.filter(e => {
      const matchCat = activeCategory === 'all' || e.categories.includes(activeCategory as any);
      const matchSearch = !mobileSearch ||
        e.titleHe.includes(mobileSearch) ||
        e.title.toLowerCase().includes(mobileSearch.toLowerCase()) ||
        e.tags.some(t => t.label.toLowerCase().includes(mobileSearch.toLowerCase()));
      return matchCat && matchSearch;
    });

    return (
      <div className="mobile-page">
        <MobilePageHeader title="אפקטים" onSearch={setMobileSearch} searchPlaceholder="חפש אפקט..." />

        <div className="mobile-filter-pills" data-scroll-horizontal>
          <button
            className={`filter-pill-mobile ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            הכל
          </button>
          {CATEGORY_ORDER.map(meta => (
            <button
              key={meta.id}
              className={`filter-pill-mobile ${activeCategory === meta.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(meta.id)}
            >
              {meta.label}
            </button>
          ))}
        </div>

        <div style={{ paddingTop: 8 }}>
          {filteredEffects.map((effect) => {
            const PreviewComp = previewMap[effect.previewComponent];
            return (
              <div key={effect.id} className="effect-card-mobile card-reveal">
                <div className="effect-preview-mobile">
                  {PreviewComp && (
                    <Suspense fallback={<div style={{ width: '100%', height: '100%', background: 'var(--surface)' }} />}>
                      <PreviewComp />
                    </Suspense>
                  )}
                </div>
                <div className="effect-info-mobile">
                  <span className="effect-name-mobile">{effect.titleHe}</span>
                  <button
                    className="copy-btn-mobile"
                    onClick={() => { setSelectedEffect(effect); }}
                  >
                    העתק
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedEffect?.id === 'scrollvideo' ? (
          <ScrollVideoTool onClose={() => setSelectedEffect(null)} onCopy={handleCopy} />
        ) : (
          <CodeModal effect={selectedEffect} onClose={() => setSelectedEffect(null)} onCopy={handleCopy} />
        )}
        <MobileCopyToast show={showToast} />
      </div>
    );
  }

  return (
    <>
      <ScrollSideMessages />
      <ScrollProgress />
      <Hero />
      <DevTestimonials />
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
          <DeferredSection key={meta.id} id={meta.id} height={600}>
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
