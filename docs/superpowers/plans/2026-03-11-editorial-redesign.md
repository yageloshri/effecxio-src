# Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform effects-lab from a flat grid catalog into an editorial magazine experience with visual hierarchy, psychological hooks, and premium aesthetics.

**Architecture:** The redesign layers on top of the existing data/preview system (110 effects, 10 data files, 110 lazy-loaded previews — all untouched). We replace the page structure (`page.tsx`) and build new section components while upgrading existing ones. The data layer, preview components, types, and code modal are unchanged.

**Tech Stack:** Next.js 14, TypeScript (strict), Tailwind CSS v4, Framer Motion 12, lucide-react, highlight.js

**Spec:** `docs/superpowers/specs/2026-03-11-editorial-redesign-design.md`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `src/components/FeaturedSection.tsx` | Bento grid of 5-6 curated effects with mixed sizes |
| `src/components/CategorySection.tsx` | Single category: header + tagline + effect grid |
| `src/components/ClosingCTA.tsx` | Footer CTA with rotating preview |
| `src/components/Footer.tsx` | Minimal footer strip |
| `src/components/ScrollProgress.tsx` | 2px scroll progress bar at top |
| `src/components/ScrollIndicator.tsx` | Animated chevron in Hero |
| `src/components/DifficultyDots.tsx` | Dot-based difficulty indicator |
| `src/components/QuickCopyButton.tsx` | Copy button that appears on card hover |
| `src/lib/categories.ts` | Category metadata: order, labels, taglines, icons |
| `src/lib/featured.ts` | Featured effect IDs and sizing config |

### Modified Files
| File | Changes |
|------|---------|
| `src/app/globals.css` | New design tokens, glow utilities |
| `src/app/page.tsx` | New page structure: Hero → Featured → Categories → CTA → Footer |
| `src/components/Hero.tsx` | Full rewrite: live bg, animated gradient, dual CTA |
| `src/components/EffectCard.tsx` | Hover glow, quick copy, difficulty dots, fill animation |
| `src/components/FilterBar.tsx` | Scroll-sync, counts per category, smooth scroll to sections |
| `src/lib/utils.ts` | Add category helpers |
| `src/types/index.ts` | Add CategoryMeta type |

### Unchanged Files (do NOT touch)
- All 110 preview components in `src/components/previews/`
- All 10 data files in `src/data/`
- `src/components/previews/index.ts`
- `src/components/CodeModal.tsx`
- `src/components/ScrollVideoTool.tsx`
- `src/components/Toast.tsx`

---

## Chunk 1: Foundation — Design Tokens + Utilities

### Task 1: Update Design Tokens

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update CSS variables**

Replace the `:root` block in `globals.css` with new design tokens:

```css
:root {
  --bg:          #050505;
  --surface:     #0a0a0a;
  --surface-2:   #111111;
  --border:      #1a1a1a;
  --border-hover:#2a2a2a;
  --accent:      #c8f53b;
  --accent2:     #a855f7;
  --accent3:     #38bdf8;
  --glow:        rgba(200,245,59,0.15);
  --glow-purple: rgba(168,85,247,0.15);
  --text:        #e8e8e8;
  --muted:       #666666;
  --code-bg:     #0d0d0d;
}
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/yageloshri/effects-lab && npm run build`
Expected: Build succeeds. Visual changes: slightly darker bg, purple replaces pink, muted text more readable.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: update design tokens — depth layering, purple accent, accessible muted"
```

---

### Task 2: Category Metadata Module

**Files:**
- Create: `src/lib/categories.ts`
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add CategoryMeta type**

Add to `src/types/index.ts`:

```typescript
export interface CategoryMeta {
  id: EffectCategory;
  label: string;
  tagline: string;
  order: number;
}
```

- [ ] **Step 2: Create categories module**

Create `src/lib/categories.ts`:

```typescript
import type { CategoryMeta, EffectCategory, Effect } from '@/types';

export const CATEGORY_ORDER: CategoryMeta[] = [
  { id: 'text', label: 'טקסט', tagline: 'כל מה שצריך כדי שהטקסט באתר שלך יהיה חי ונושם', order: 1 },
  { id: 'button', label: 'כפתורים', tagline: 'כפתורים שהמשתמשים שלך לא יפסיקו ללחוץ עליהם', order: 2 },
  { id: 'card', label: 'כרטיסים', tagline: 'כרטיסים שגורמים למשתמש לרצות לגעת במסך', order: 3 },
  { id: 'scroll', label: 'גלילה', tagline: 'הפוך את הגלילה לחוויה, לא לדרך', order: 4 },
  { id: 'background', label: 'רקעים', tagline: 'רקעים שהופכים כל דף למשהו שאי אפשר לעזוב', order: 5 },
  { id: 'media', label: 'מדיה', tagline: 'תמונות ווידאו שזזים, נחשפים ומפתיעים', order: 6 },
  { id: 'cursor', label: 'עכבר', tagline: 'הפוך את העכבר לחלק מהעיצוב', order: 7 },
  { id: 'loader', label: 'טעינה', tagline: 'גם ההמתנה יכולה להיות יפה', order: 8 },
  { id: 'hover', label: 'hover', tagline: 'אינטראקציות ריחוף שנותנות חיים לממשק', order: 9 },
  { id: 'interaction', label: 'אינטראקציה', tagline: 'אינטראקציות שהופכות את הממשק לחוויה', order: 10 },
];

export function getEffectsByCategory(effects: Effect[]): Map<EffectCategory, Effect[]> {
  const map = new Map<EffectCategory, Effect[]>();
  for (const meta of CATEGORY_ORDER) {
    const filtered = effects.filter(e => e.categories.includes(meta.id));
    if (filtered.length > 0) {
      map.set(meta.id, filtered);
    }
  }
  return map;
}
```

- [ ] **Step 3: Create featured effects config**

Create `src/lib/featured.ts`:

```typescript
export const FEATURED_IDS = ['aurora', 'glitch', 'parallax', 'particlesbg', 'morphtext'] as const;

export type FeaturedSize = 'large' | 'regular';

export const FEATURED_LAYOUT: { id: string; size: FeaturedSize }[] = [
  { id: 'aurora', size: 'large' },
  { id: 'glitch', size: 'regular' },
  { id: 'parallax', size: 'regular' },
  { id: 'particlesbg', size: 'regular' },
  { id: 'morphtext', size: 'large' },
];
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds, no type errors.

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/lib/categories.ts src/lib/featured.ts
git commit -m "feat: add category metadata, featured config, and CategoryMeta type"
```

---

## Chunk 2: Hero Rewrite

### Task 3: ScrollIndicator Component

**Files:**
- Create: `src/components/ScrollIndicator.tsx`

- [ ] **Step 1: Create component**

```typescript
'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      onClick={() => {
        const featured = document.getElementById('featured');
        featured?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span
        style={{
          color: 'var(--muted)',
          fontSize: 13,
          fontFamily: "'Heebo', sans-serif",
        }}
      >
        גלול לגלות
      </span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M4 7L10 13L16 7"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ScrollIndicator.tsx
git commit -m "feat: add ScrollIndicator component with animated chevron"
```

---

### Task 4: ScrollProgress Component

**Files:**
- Create: `src/components/ScrollProgress.tsx`

- [ ] **Step 1: Create component**

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[2px]"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
        transition: 'width 0.1s linear',
      }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ScrollProgress.tsx
git commit -m "feat: add ScrollProgress bar — lime-to-purple gradient"
```

---

### Task 5: Hero Full Rewrite

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero**

Full rewrite of `src/components/Hero.tsx` with:
- Live atmospheric background (CSS-only aurora + grid + particles via pseudo-elements and keyframes — no external deps)
- Animated lime→purple gradient title
- Dual CTA buttons (primary filled, secondary outline)
- Stats strip with dot separators
- ScrollIndicator at bottom
- 100vh height

Key implementation notes:
- The live background should use CSS keyframes only (not actual preview components — those are lazy-loaded and too heavy for Hero). Create a `<style>` block with `@keyframes aurora-shift`, `@keyframes grid-move`, `@keyframes float-particle` that create an atmospheric effect.
- The gradient title uses `background-size: 200% 200%` with `@keyframes gradient-shift` moving `background-position`.
- Primary CTA scrolls to `#featured` section.
- Use Framer Motion `containerVariants` / `itemVariants` pattern for staggered entrance.
- `useReducedMotion()` disables all motion.

- [ ] **Step 2: Verify build and visual check**

Run: `npm run build`
Expected: Build succeeds. Hero fills viewport, gradient title animates, CTAs visible, scroll indicator bounces.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: rewrite Hero — live bg, animated gradient, dual CTA, scroll indicator"
```

---

## Chunk 3: Featured Section + Category Section

### Task 6: FeaturedSection Component

**Files:**
- Create: `src/components/FeaturedSection.tsx`

- [ ] **Step 1: Create component**

Build a bento grid section that:
- Takes the full `effects` array, filters by `FEATURED_LAYOUT` from `src/lib/featured.ts`
- Renders a CSS grid with `grid-template-columns` and `grid-column: span 2` for large items
- Each card shows: live preview (from `previewMap`), title, "העתק קוד" button on large cards, `✦ מומלץ` badge
- Section header: `✦ אפקטים שאי אפשר להתעלם מהם`
- Preview height: 280px for large, 200px for regular
- Container: `maxWidth: 1360, margin: '0 auto', padding: '0 24px'`
- `id="featured"` on the section element for scroll targeting

Key implementation:
- Use `React.lazy` via existing `previewMap` for previews
- Wrap each preview in `<Suspense fallback={<div className="animate-pulse" style={{ background: 'var(--surface)', height: '100%' }} />}>`
- Hover glow: `box-shadow: 0 0 30px var(--glow)` on card hover
- "העתק קוד" button copies the first code tab of the effect using `copyToClipboard` from utils

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/FeaturedSection.tsx
git commit -m "feat: add FeaturedSection — bento grid with 5 curated effects"
```

---

### Task 7: CategorySection Component

**Files:**
- Create: `src/components/CategorySection.tsx`

- [ ] **Step 1: Create component**

A reusable section that renders one category:

```typescript
interface CategorySectionProps {
  id: string;           // for scroll targeting
  label: string;        // Hebrew label
  tagline: string;      // Hebrew tagline
  count: number;        // number of effects
  effects: Effect[];
  onSelect: (effect: Effect) => void;
}
```

Layout:
- Section header: `◈ {label}` (right-aligned, Hebrew) + count badge `{count} אפקטים` (left-aligned)
- Tagline below header in muted color
- Grid of EffectCards: `gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))'`, gap 20
- Gradient divider at bottom: `linear-gradient(90deg, var(--accent) 0%, transparent 100%)`, 1px height, 60% width, centered
- Scroll-triggered entrance: cards use IntersectionObserver to fade-up when entering viewport (NOT delay-based stagger)
- Container: `maxWidth: 1360, margin: '0 auto', padding: '40px 24px'`

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/CategorySection.tsx
git commit -m "feat: add CategorySection — header, tagline, grid, divider per category"
```

---

## Chunk 4: Effect Card Upgrade

### Task 8: DifficultyDots + QuickCopyButton

**Files:**
- Create: `src/components/DifficultyDots.tsx`
- Create: `src/components/QuickCopyButton.tsx`

- [ ] **Step 1: Create DifficultyDots**

```typescript
'use client';

interface DifficultyDotsProps {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const LEVELS = {
  beginner:     { filled: 1, color: 'var(--accent)',  label: 'מתחיל' },
  intermediate: { filled: 2, color: 'var(--accent3)', label: 'בינוני' },
  advanced:     { filled: 3, color: 'var(--accent2)', label: 'מתקדם' },
};

export default function DifficultyDots({ difficulty }: DifficultyDotsProps) {
  const { filled, color, label } = LEVELS[difficulty];
  return (
    <div className="flex items-center gap-1" title={label}>
      {[1, 2, 3].map(i => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: i <= filled ? color : 'var(--border)',
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create QuickCopyButton**

```typescript
'use client';

import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface QuickCopyButtonProps {
  code: string;
  onCopy?: () => void;
}

export default function QuickCopyButton({ code, onCopy }: QuickCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(code);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  }, [code, onCopy]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      style={{
        background: copied ? 'rgba(200,245,59,0.2)' : 'rgba(0,0,0,0.7)',
        border: `1px solid ${copied ? 'var(--accent)' : 'var(--border)'}`,
        color: copied ? 'var(--accent)' : 'var(--text)',
        fontFamily: "'Space Mono', monospace",
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'הועתק' : 'העתק'}
    </button>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/DifficultyDots.tsx src/components/QuickCopyButton.tsx
git commit -m "feat: add DifficultyDots and QuickCopyButton components"
```

---

### Task 9: EffectCard Upgrade

**Files:**
- Modify: `src/components/EffectCard.tsx`

- [ ] **Step 1: Upgrade EffectCard**

Changes to existing EffectCard:
1. Replace difficulty badge with `<DifficultyDots />`
2. Add `<QuickCopyButton />` inside preview area (copies first code tab)
3. Add `group` class to outer div for group-hover
4. Hover: `box-shadow: 0 0 30px var(--glow)`, `border-color: var(--border-hover)`
5. Preview area: inner `border-radius: 8px`, gradient bg `linear-gradient(135deg, var(--surface), var(--surface-2))`
6. CTA button: fill animation on hover via CSS `background-size` transition from `0% 100%` to `100% 100%` using `background: linear-gradient(90deg, var(--accent) 50%, transparent 50%)` with `background-size` and `background-position` trick
7. Remove old `getDifficultyColor` function and difficulty badge span
8. Add `onCopy` prop for toast integration

- [ ] **Step 2: Verify build and visual**

Run: `npm run build`
Expected: Build succeeds. Cards show dots for difficulty, glow on hover, copy button appears on hover, CTA has fill animation.

- [ ] **Step 3: Commit**

```bash
git add src/components/EffectCard.tsx
git commit -m "feat: upgrade EffectCard — glow hover, quick copy, difficulty dots, CTA fill animation"
```

---

## Chunk 5: Footer + Closing CTA

### Task 10: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Footer**

Minimal footer strip:
- Logo: `effects.lab` (same style as header)
- One-liner: `נבנה עם ♥ לקהילת המפתחים הישראלית`
- Links row: `GitHub · גרסה 2.0`
- Container maxWidth 1360, padding 40px 24px
- Top border: `1px solid var(--border)`
- Background: `var(--bg)`

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 11: ClosingCTA Component

**Files:**
- Create: `src/components/ClosingCTA.tsx`

- [ ] **Step 1: Create ClosingCTA**

Implementation:
- Headline: `מה, עדיין לא העתקת כלום?` (bold, large, Heebo)
- Mini preview: picks random effect from `effects` array, renders its preview via `previewMap`, changes every 5s with fade (Framer Motion `AnimatePresence mode="wait"` + `key={currentEffect.id}`)
- CTA button: filled lime, `בחר אפקט והתחל` → smooth scroll to `#featured`
- Container: centered, maxWidth 800px, padding 80px 24px
- Gradient divider above (same style as category dividers)
- `useReducedMotion()` — if reduced, just show static preview without rotation

- [ ] **Step 2: Commit**

```bash
git add src/components/ClosingCTA.tsx
git commit -m "feat: add ClosingCTA — rotating preview, cheeky headline, scroll-to-top"
```

---

## Chunk 6: FilterBar Upgrade + Page Assembly

### Task 12: FilterBar Upgrade

**Files:**
- Modify: `src/components/FilterBar.tsx`

- [ ] **Step 1: Upgrade FilterBar**

Changes:
1. Import `CATEGORY_ORDER` from `src/lib/categories.ts` and `effects` from data
2. Show count next to each category label: `{label} {count}` (count in small muted text)
3. On click: `document.getElementById(cat)?.scrollIntoView({ behavior: 'smooth' })` instead of filtering
4. Active state synced to scroll: use `IntersectionObserver` on each category section, update active category based on which section is in viewport
5. Keep "הכל" — scrolls to `#featured` (top of content area)
6. Active pill glow: `box-shadow: 0 0 12px var(--glow)` on active button
7. Remove the old `onChange` prop pattern — FilterBar manages its own state internally via scroll observation

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/FilterBar.tsx
git commit -m "feat: upgrade FilterBar — scroll sync, category counts, glow on active"
```

---

### Task 13: Page Assembly

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx**

New page structure:

```typescript
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
      {CATEGORY_ORDER.map(meta => {
        const catEffects = categoryMap.get(meta.id);
        if (!catEffects || catEffects.length === 0) return null;
        return (
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
```

- [ ] **Step 2: Remove EffectsGrid.tsx**

`src/components/EffectsGrid.tsx` is replaced by `CategorySection.tsx`. Delete it.

- [ ] **Step 3: Full build + visual verification**

Run: `npm run build`
Expected: Build succeeds. Full page flow: Hero → Featured → FilterBar → Category sections × N → ClosingCTA → Footer.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git rm src/components/EffectsGrid.tsx
git commit -m "feat: assemble editorial page — Hero, Featured, Categories, CTA, Footer"
```

---

## Chunk 7: Micro-interactions + Polish

### Task 14: Card Hover Orchestration

**Files:**
- Modify: `src/components/EffectCard.tsx`

- [ ] **Step 1: Add staggered hover transitions**

Update the EffectCard hover behavior to orchestrate timing:
- Border glow: `transition: box-shadow 0.3s ease`
- Preview scale: `transition: transform 0.3s ease 0.05s` (50ms delay)
- Copy button: `transition: opacity 0.2s ease 0.1s` (100ms delay)
- CTA fill: `transition: background-size 0.4s ease 0.15s` (150ms delay)

This creates a cascading "alive" feeling instead of everything snapping at once.

- [ ] **Step 2: Commit**

```bash
git add src/components/EffectCard.tsx
git commit -m "feat: staggered hover orchestration on EffectCard"
```

---

### Task 15: Section Header Animations

**Files:**
- Modify: `src/components/CategorySection.tsx`

- [ ] **Step 1: Add scroll-triggered entrance**

Use Framer Motion `whileInView` on section headers:
- Header text: `initial={{ opacity: 0, x: 30 }}` → `whileInView={{ opacity: 1, x: 0 }}`
- Gradient divider: `initial={{ scaleX: 0, originX: 1 }}` → `whileInView={{ scaleX: 1 }}`
- Cards: each uses own IntersectionObserver for individual fade-up (not stagger delay)
- `viewport={{ once: true, margin: '-50px' }}` — triggers slightly before fully in view

- [ ] **Step 2: Commit**

```bash
git add src/components/CategorySection.tsx
git commit -m "feat: scroll-triggered section header animations"
```

---

### Task 16: Header Width Alignment

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Update max-width to match new layout**

Change `max-w-7xl` to inline `style={{ maxWidth: 1360 }}` to match the grid container width.

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.tsx
git commit -m "fix: align Header max-width with new 1360px layout"
```

---

### Task 17: Final Build + Visual QA

- [ ] **Step 1: Full production build**

Run: `cd /Users/yageloshri/effects-lab && npm run build`
Expected: Build succeeds with zero errors.

- [ ] **Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: Zero errors.

- [ ] **Step 3: Visual QA via Playwright**

Take full-page screenshot at 1440px width, verify:
- Hero fills viewport with animated gradient
- Featured section shows bento grid with mixed sizes
- FilterBar is sticky with category counts
- Each category has header + tagline + grid + divider
- Cards show glow on hover
- ClosingCTA has rotating preview
- Footer renders at bottom
- Scroll progress bar visible at top
- No horizontal overflow

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: editorial redesign complete — magazine layout, premium aesthetics, psychological hooks"
```
