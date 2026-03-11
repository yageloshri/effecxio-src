# Effects Lab — CLAUDE.md

## Project
Israeli web effects library. Next.js 14 + TypeScript + Tailwind + Framer Motion.
20+ live interactive CSS/JS effects with Hebrew UI, copy-pasteable code, live previews.

## Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS (CSS variables for design tokens — never hardcode hex)
- Framer Motion (ALL transitions — no CSS transitions on interactive elements)
- highlight.js (syntax highlighting in modal)
- lucide-react (icons)

## Agents available
Call these with: `claude --agent <name> <task>`

- `effect-builder` — generates a new Effect data object + preview component for a given effect name
- `preview-builder` — generates only the React preview component for a given effect
- `code-writer` — generates complete, copy-pasteable code snippets for a given effect
- `qa-checker` — runs build, checks TypeScript, checks for console errors, verifies all 20 effects render

## Skills available (in .claude/skills/)
- `new-effect.md` — how to add a new effect to the library end-to-end
- `preview-component.md` — how to build animated preview components correctly
- `code-snippet.md` — how to write production-ready copy-pasteable code snippets
- `debug-preview.md` — how to debug a broken or static preview component

## Conventions
- All UI text: Hebrew (rtl direction)
- All code snippets: English variable names, English comments
- Colors: CSS variables only (`var(--accent)` not `#c8f53b`)
- Effects data: `src/data/effects.ts` only — never inline in components
- Preview components: `src/components/previews/` — one file per effect, registered in index.ts
- cn() utility: always use for conditional classNames
- React.memo() on all preview components
- useReducedMotion() wrapping all Framer Motion animations
- Arabic numerals in Hebrew text (20 אפקטים, not עשרים)

## Design tokens
--bg: #080808
--surface: #111111
--border: #1e1e1e
--accent: #c8f53b
--accent2: #ff3cac
--accent3: #44aaff
--text: #f0f0f0
--muted: #555555

## Adding a new effect (quick reference)
1. Read .claude/skills/new-effect.md
2. Run agent: effect-builder "<effect-name>"
3. Register preview in src/components/previews/index.ts
4. Verify with agent: qa-checker

## Commands
npm run dev       → development server
npm run build     → production build
npm run lint      → ESLint
npm run typecheck → tsc --noEmit
