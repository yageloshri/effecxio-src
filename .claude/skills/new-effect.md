# Skill: Adding a New Effect

Use this skill every time you add an effect to Effects Lab.
Never add an effect without following.

## Step 1 — Plan the effect
Before writing any code, define:
- id: unique camelCase string (e.g. "gradientBorder")
- title: English name
- titleHe: Hebrew name
- categories: array from EffectCategory union
- difficulty: beginner | intermediate | advanced
- What CSS/JS technique does it demonstrate?
- What should the preview animation look like?

## Step 2 — Write the Effect data object
In `src/data/effects.ts`, add an Effect object.
Required fields — never leave any empty or stubbed:
- id, title, titleHe
- description (English, 1 sentence)
- descriptionHe (Hebrew, 1 sentence)
- categories (1-3 values)
- tags (2-4 tags with short labels)
- difficulty
- previewComponent (same as id)
- codeTabs — minimum 1 tab labeled "מלא" with COMPLETE code
- explanationHe — full Hebrew explanation (HTML string, use <h4>, <p>, <ul>, <li>)
- proTipHe — one Hebrew pro tip (optional but preferred)

## Step 3 — Write the preview component
In `src/components/previews/<EffectNamePreview>.tsx`
Rules:
- Must fit in card (overflow hidden on parent)
- Must be animated — never static
- Must use Framer Motion OR pure CSS animations
- Must be interactive on hover/mousemove if the effect is interactive
- Must cleanup on unmount (useEffect return fn for canvas, event listeners)
- Must be wrapped in React.memo()
- Must use useReducedMotion() from framer-motion

## Step 4 — Register the preview
In `src/components/previews/index.ts`:
```typescript
import { NewEffectPreview } from './NewEffectPreview';
export const previewMap = {
  // ... existing
  newEffect: NewEffectPreview,
};
```

## Step 5 — Verify
- npm run typecheck → 0 errors
- npm run dev → card renders with live preview
- Click "צפה בקוד" → modal opens with correct code
- Copy button → clipboard works
