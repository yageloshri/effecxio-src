'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_ORDER } from '@/lib/categories';
import { effects } from '@/data/effects';

export default function FilterBar() {
  const [active, setActive] = useState<string>('all');

  // Count effects per category
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of CATEGORY_ORDER) {
      map[cat.id] = effects.filter((e) => e.categories.includes(cat.id)).length;
    }
    map['all'] = effects.length;
    return map;
  }, []);

  // Scroll sync via IntersectionObserver
  useEffect(() => {
    const sectionIds = CATEGORY_ORDER.map((cat) => cat.id);
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive(entry.target.id);
            }
          }
        },
        { threshold: 0.3 },
      );

      observer.observe(el);
      observers.push(observer);
    }

    // Also observe #featured for the "all" state
    const featuredEl = document.getElementById('featured');
    if (featuredEl) {
      const featuredObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive('all');
            }
          }
        },
        { threshold: 0.3 },
      );
      featuredObserver.observe(featuredEl);
      observers.push(featuredObserver);
    }

    return () => {
      for (const obs of observers) {
        obs.disconnect();
      }
    };
  }, []);

  const handleClick = (id: string) => {
    const targetId = id === 'all' ? 'featured' : id;
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Build pill list: "הכל" first, then categories in order
  const pills: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'הכל', count: counts['all'] },
    ...CATEGORY_ORDER.map((cat) => ({
      id: cat.id,
      label: cat.label,
      count: counts[cat.id] ?? 0,
    })),
  ];

  return (
    <div
      className="sticky z-40 backdrop-blur-lg"
      style={{
        top: 64,
        background: 'rgba(5, 5, 5, 0.85)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="filter-scroll flex gap-2 overflow-x-auto"
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
        {pills.map((pill) => {
          const isActive = active === pill.id;
          return (
            <motion.button
              key={pill.id}
              onClick={() => handleClick(pill.id)}
              whileTap={{ scale: 0.95 }}
              className="rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors duration-200"
              style={{
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                color: isActive ? 'var(--accent)' : 'var(--muted)',
                background: isActive ? 'rgba(200, 245, 59, 0.1)' : 'transparent',
                boxShadow: isActive ? '0 0 12px var(--glow)' : 'none',
                fontFamily: "'Heebo', sans-serif",
                cursor: 'pointer',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    'var(--muted)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    'var(--border)';
                }
              }}
            >
              {pill.label}{' '}
              <span
                style={{
                  color: 'var(--muted)',
                  fontSize: '0.75rem',
                  opacity: 0.7,
                }}
              >
                ({pill.count})
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
