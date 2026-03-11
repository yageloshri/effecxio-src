'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { FEATURED_LAYOUT } from '@/lib/featured';
import { copyToClipboard } from '@/lib/utils';
import type { Effect } from '@/types';
import previewMap from '@/components/previews';
import ViewportPreview from '@/components/ViewportPreview';

interface FeaturedSectionProps {
  effects: Effect[];
  onSelect: (effect: Effect) => void;
  onCopy: () => void;
}

export default function FeaturedSection({
  effects,
  onSelect,
  onCopy,
}: FeaturedSectionProps) {
  const featuredEffects = FEATURED_LAYOUT.map((item) => {
    const effect = effects.find((e) => e.id === item.id);
    return effect ? { ...item, effect } : null;
  }).filter(Boolean) as { id: string; size: 'large' | 'regular'; effect: Effect }[];

  return (
    <section
      id="featured"
      style={{
        maxWidth: 1360,
        margin: '0 auto',
        padding: '60px 24px',
      }}
    >
      {/* Section header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 700,
          fontSize: 28,
          color: '#fff',
          margin: 0,
          marginBottom: 32,
          direction: 'rtl',
        }}
      >
        &#x2726; &#x5D0;&#x5E4;&#x5E7;&#x5D8;&#x5D9;&#x5DD; &#x5E9;&#x5D0;&#x5D9; &#x5D0;&#x5E4;&#x5E9;&#x5E8; &#x5DC;&#x5D4;&#x5EA;&#x5E2;&#x5DC;&#x5DD; &#x5DE;&#x5D4;&#x5DD;
      </motion.h2>

      {/* Bento grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}
      >
        {featuredEffects.map((item, index) => {
          const { effect, size } = item;
          const isLarge = size === 'large';
          const PreviewComponent = previewMap[effect.previewComponent];

          return (
            <motion.div
              key={effect.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl overflow-hidden cursor-pointer group"
              style={{
                gridColumn: isLarge ? 'span 2' : 'span 1',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onClick={() => onSelect(effect)}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = '0 0 30px var(--glow)';
                el.style.borderColor = 'rgba(200, 245, 59, 0.3)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = 'none';
                el.style.borderColor = 'var(--border)';
              }}
            >
              {/* Preview area */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: isLarge ? 280 : 200,
                  background: 'var(--bg)',
                }}
              >
                <ViewportPreview
                  component={PreviewComponent}
                  height={isLarge ? 280 : 200}
                  margin="300px"
                />

                {/* Recommended badge for large cards */}
                {isLarge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'rgba(200, 245, 59, 0.15)',
                      border: '1px solid rgba(200, 245, 59, 0.3)',
                      borderRadius: 20,
                      padding: '4px 12px',
                      fontSize: 13,
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 600,
                      color: 'var(--accent)',
                      direction: 'rtl',
                    }}
                  >
                    &#x2726; &#x5DE;&#x5D5;&#x5DE;&#x5DC;&#x5E5;
                  </div>
                )}
              </div>

              {/* Content area */}
              <div style={{ padding: 20, direction: 'rtl' }}>
                <h3
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 700,
                    fontSize: isLarge ? 20 : 17,
                    color: 'var(--text)',
                    margin: 0,
                    marginBottom: 6,
                  }}
                >
                  {effect.titleHe}
                </h3>

                <p
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: 14,
                    color: 'var(--muted)',
                    margin: 0,
                    marginBottom: isLarge ? 16 : 0,
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {effect.descriptionHe}
                </p>

                {/* Copy button for large cards */}
                {isLarge && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (effect.codeTabs.length > 0) {
                        copyToClipboard(effect.codeTabs[0].code);
                        onCopy();
                      }
                    }}
                    className="flex items-center gap-2 transition-all duration-200"
                    style={{
                      background: 'rgba(200, 245, 59, 0.1)',
                      border: '1px solid rgba(200, 245, 59, 0.3)',
                      borderRadius: 8,
                      padding: '8px 16px',
                      fontSize: 14,
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 500,
                      color: 'var(--accent)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.background = 'var(--accent)';
                      btn.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.background = 'rgba(200, 245, 59, 0.1)';
                      btn.style.color = 'var(--accent)';
                    }}
                  >
                    <Copy size={15} />
                    &#x5D4;&#x5E2;&#x5EA;&#x5E7; &#x5E7;&#x5D5;&#x5D3;
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
