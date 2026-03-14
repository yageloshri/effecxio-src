'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_ORDER } from '@/lib/categories';
import { effects } from '@/data/effects';

export default function FilterBar() {
  const [active, setActive] = useState<string>('all');

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of CATEGORY_ORDER) {
      map[cat.id] = effects.filter((e) => e.categories.includes(cat.id)).length;
    }
    map['all'] = effects.length;
    return map;
  }, []);

  useEffect(() => {
    const sectionIds = CATEGORY_ORDER.map((cat) => cat.id);
    const tracked = new Map<string, Element>();

    // Single observer for all category sections
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.3 },
    );

    // Scan DOM for category sections — picks up deferred sections after mount
    function scan() {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (tracked.get(id) === el) continue; // already observing this element
        const prev = tracked.get(id);
        if (prev) io.unobserve(prev);
        io.observe(el);
        tracked.set(id, el);
      }
    }

    scan();

    // Re-scan when DeferredSection swaps placeholder → real content
    const mo = new MutationObserver(() => {
      if (tracked.size < sectionIds.length) scan();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Featured section
    const featuredEl = document.getElementById('featured');
    if (featuredEl) {
      const featuredIo = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive('all');
            }
          }
        },
        { threshold: 0.3 },
      );
      featuredIo.observe(featuredEl);

      return () => {
        io.disconnect();
        featuredIo.disconnect();
        mo.disconnect();
      };
    }

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  const handleClick = (id: string) => {
    const targetId = id === 'all' ? CATEGORY_ORDER[0].id : id;
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

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
      className="sticky z-40 backdrop-blur-xl"
      style={{
        top: 64,
        background: 'rgba(5, 5, 5, 0.8)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="filter-scroll flex items-center gap-3 overflow-x-auto"
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '16px 24px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          direction: 'rtl',
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
              style={{
                position: 'relative',
                border: 'none',
                borderRadius: 8,
                padding: '8px 18px',
                color: isActive ? '#000' : 'var(--muted)',
                background: isActive ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                fontFamily: "'Heebo', sans-serif",
                fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                outline: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 20px var(--glow)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = 'rgba(255, 255, 255, 0.1)';
                  btn.style.color = 'var(--text)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = 'rgba(255, 255, 255, 0.05)';
                  btn.style.color = 'var(--muted)';
                }
              }}
            >
              {pill.label}
              <span
                style={{
                  marginRight: 6,
                  fontSize: 12,
                  opacity: isActive ? 0.7 : 0.5,
                }}
              >
                {pill.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
