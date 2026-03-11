# Effects Lab — Editorial Redesign

**Date:** 2026-03-11
**Status:** Approved
**Audience:** Israeli developers seeking ready-to-use CSS/JS effects
**Stack:** Next.js 14, TypeScript, Tailwind, Framer Motion

---

## Problem Statement

The current site is a flat grid of 110 identical cards on a dark background. There is no visual hierarchy, no narrative structure, no psychological hooks, and no clear CTA. The second half of the page feels like a black screen. The site functions as a tool but not as an experience.

## Design Vision

Transform the site from a flat catalog into an "editorial magazine" — each section tells a story, progressive disclosure guides the user, and the site itself is the best showcase for its effects library.

**Emotional targets:** Professional + Efficient + "This site IS the effect"

---

## 1. Design Tokens

### Current
```
--bg: #080808    --surface: #111111    --border: #1e1e1e
--accent: #c8f53b    --accent2: #ff3cac    --accent3: #44aaff
--text: #f0f0f0    --muted: #555555
```

### New
```
--bg:          #050505        // deeper black for better contrast
--surface:     #0a0a0a        // subtle lift from bg
--surface-2:   #111111        // card bodies, elevated elements
--border:      #1a1a1a        // default borders
--border-hover:#2a2a2a        // hover state borders
--accent:      #c8f53b        // lime — brand DNA, stays
--accent2:     #a855f7        // purple — replaces pink, premium feel
--accent3:     #38bdf8        // sky blue — cleaner, more modern
--glow:        rgba(200,245,59,0.15)  // new — glow/halo effects
--text:        #e8e8e8        // slightly softer white
--muted:       #666666        // lighter — passes WCAG AA on dark bg
--code-bg:     #0d0d0d        // stays
```

**Rationale:**
- 3-level depth layering (bg → surface → surface-2) creates spatial hierarchy
- Lime + purple is a proven tech-premium combination (Vercel, Linear, Figma)
- Muted bumped from #555 to #666 for accessibility
- Glow token enables consistent halo effects across interactive elements

---

## 2. Hero Section

**Current:** 70vh, static text, grid animation background, no CTA.

**New:** 90-100vh fullscreen first impression.

### Components:
1. **Live background effect** — 3-4 atmospheric effects from the library (particles, aurora, grid) running in a subtle loop. Shows immediately that the library is real.
2. **Animated gradient title** — "תפסיק לבנות / אתרים גנריים" with animated lime→purple gradient (background-position keyframe).
3. **Dual CTA:**
   - Primary (filled lime): "העתק את האפקט הראשון" → scrolls to Featured
   - Secondary (outline): "גלול לגלות" → scrolls to Featured
4. **Stats strip:** `110 אפקטים · 0 ספריות חיצוניות · Copy-Paste טהור` — monospace, dot separators.
5. **Scroll indicator** — animated chevron at bottom, inviting scroll.

### Psychology:
- **Peak-End Rule** — first impression determines perception
- **Show don't tell** — live effects > "110 effects ready"
- **Zeigarnik Effect** — "copy your first effect" starts an open loop

---

## 3. Featured Effects Section

**Current:** Does not exist. User drops straight into 110-card grid.

**New:** Curated bento grid of 5-6 visually impressive effects.

### Layout:
- Bento grid: 2 large cards (2 cols, 280-320px preview) + 3 regular cards (1 col)
- Alternating pattern: large-left + regular-right on row 1, flipped on row 2

### Features:
- Large cards get direct "copy code" button (no modal needed)
- `✦ מומלץ` badge on large cards
- Section header: `✦ אפקטים שאי אפשר להתעלם מהם`

### Curated effects (most visual):
`aurora`, `glitch`, `parallax`, `particlesbg`, `morphtext`

### Psychology:
- **Von Restorff Effect** — different-sized cards are remembered
- **Anchoring** — impressive first effects set quality expectations
- **Paradox of Choice** — 5-6 curated > 110 undifferentiated

---

## 4. Category Sections

**Current:** FilterBar toggles + flat grid. No structure, no narrative.

**New:** Each category is a distinct section with personality.

### Structure per category:
```
◈ Category Name                           N אפקטים
One-liner that sells the value of this category

[grid of effect cards, 4 columns]

──── gradient divider (lime → transparent) ────
```

### Category order (psychologically intentional):
1. טקסט (18) — most universal, every dev needs this
2. כפתורים (14) — interactive, engaging
3. כרטיסים (12) — tangible UI patterns
4. גלילה (12) — exciting, unique
5. רקעים (12) — atmospheric
6. מדיה (7) — specific
7. עכבר (6) — niche
8. טעינה (8) — utility
9. hover — from originals
10. אינטראקציה — from originals

### Category one-liners:
- טקסט: "כל מה שצריך כדי שהטקסט באתר שלך יהיה חי ונושם"
- כפתורים: "כפתורים שהמשתמשים שלך לא יפסיקו ללחוץ עליהם"
- כרטיסים: "כרטיסים שגורמים למשתמש לרצות לגעת במסך"
- גלילה: "הפוך את הגלילה לחוויה, לא לדרך"
- רקעים: "רקעים שהופכים כל דף למשהו שאי אפשר לעזוב"
- מדיה: "תמונות ווידאו שזזים, נחשפים ומפתיעים"
- עכבר: "הפוך את העכבר לחלק מהעיצוב"
- טעינה: "גם ההמתנה יכולה להיות יפה"

### FilterBar upgrade:
- Effect count next to each category name
- Click = smooth scroll to section (not filter toggle)
- Active state synced to scroll position via IntersectionObserver
- Pill shape with subtle glow on active

### Psychology:
- **Chunking** — 8 groups of 6-18 > one list of 110
- **Goal Gradient** — seeing "18 effects" creates completable scope
- **Narrative Structure** — header → promise → effects = story
- **Mere Exposure** — one-liners pre-sell before cards are seen

---

## 5. Effect Cards

**Current:** Flat card, 180px dark preview, title, description, tags, "view code" button. Minimal hover (border color only).

### New card features:

1. **Hover glow** — `box-shadow: 0 0 30px var(--glow)` + border brightens. Full "lift" effect, not just border change.

2. **Quick copy on hover** — small copy button appears in preview top-right corner on hover. Reduces friction — copy without opening modal.

3. **Difficulty dots** (replaces text badge):
   - `●○○` green = beginner
   - `●●○` blue = intermediate
   - `●●●` purple = advanced
   - Tooltip on hover shows Hebrew text

4. **CTA button fill animation** — on hover, lime fills from left like a progress bar. Zeigarnik effect invites click.

5. **Preview improvements:**
   - Inner border-radius — "screen within frame" effect
   - Gradient background (surface → surface-2) instead of flat
   - Tech badge (top-right, mono font, 40% opacity): `CSS` / `JS` / `SVG`

6. **Tags upgrade:**
   - Hover: background shifts to `rgba(200,245,59,0.1)`
   - Clickable — clicking a tag filters by it

### Psychology:
- **Fitts's Law** — large hover copy button = less effort than modal→copy
- **Progressive Disclosure** — hover reveals layers without cluttering static view
- **Hick's Law** — dots scannable in 0.1s vs reading text badges
- **Feedback loops** — every interaction gives immediate visual response

---

## 6. Footer + Closing CTA

**Current:** No footer. Site ends abruptly after last card.

### New:

1. **Closing CTA:**
   - Headline: "מה, עדיין לא העתקת כלום?" (direct, Israeli tone)
   - Mini preview: random effect rotating every 5s with fade transition
   - Button (filled lime): "🚀 בחר אפקט והתחל" → scrolls to top/Featured

2. **Footer strip:**
   - Logo: effects.lab
   - One-liner: "נבנה עם ♥ לקהילת המפתחים הישראלית"
   - Links: GitHub · Twitter · גרסה 2.0

### Psychology:
- **Peak-End Rule** — strong ending = strong memory
- **Open Loop** — "haven't copied yet?" creates tension
- **Mere Exposure** — rotating preview resurfaces missed effects

---

## 7. Micro-interactions + Motion Design

Cross-cutting animation layer:

1. **Scroll-triggered reveals** — cards fade-up via IntersectionObserver (replacing delay-based stagger). Each card animates when it enters viewport.

2. **Section header animations** — slide-in from right + gradient line fill on scroll-into-view.

3. **FilterBar scroll sync** — active pill moves smoothly as user scrolls between sections.

4. **Card hover orchestration:**
   - 0ms: border glow starts
   - 50ms: preview scale(1.02)
   - 100ms: copy button fades in
   - 150ms: CTA fill animation begins

5. **Modal transition** — backdrop blur + content behind scales to 0.97. Focus effect.

6. **Scroll progress bar** — 2px lime line at page top showing scroll progress. Goal gradient effect.

---

## Page Structure Summary

```
Header (fixed, backdrop-blur)
  ↓
Hero (fullscreen, live effects bg, dual CTA, scroll indicator)
  ↓
Featured Effects (bento grid, 5-6 effects, mixed sizes)
  ↓
Category Sections × 8-10 (header + tagline + grid per category)
  ↓  (sticky FilterBar synced to scroll position)
Closing CTA (cheeky headline + rotating preview + button)
  ↓
Footer (logo + tagline + links)
```

## Files Affected

- `src/app/globals.css` — design tokens
- `src/app/page.tsx` — page structure (add sections)
- `src/components/Hero.tsx` — full rewrite
- `src/components/EffectCard.tsx` — hover glow, copy button, dots, fill animation
- `src/components/EffectsGrid.tsx` — becomes CategorySection component
- `src/components/FilterBar.tsx` — scroll sync, counts, smooth scroll
- `src/components/FeaturedSection.tsx` — NEW: bento grid
- `src/components/CategorySection.tsx` — NEW: section with header + grid
- `src/components/ClosingCTA.tsx` — NEW: footer CTA
- `src/components/Footer.tsx` — NEW: footer strip
- `src/components/ScrollProgress.tsx` — NEW: scroll progress bar
- `src/components/ScrollIndicator.tsx` — NEW: hero scroll chevron
