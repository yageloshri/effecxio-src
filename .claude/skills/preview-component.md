# Skill: Building Preview Components

Preview components are the heart of Effects Lab. Each one is a miniature
animated demo of the effect. Quality bar is HIGH.

## Rules (non-negotiable)
1. Height fits in 220px, overflow hidden on parent
2. Always animated — never a static screenshot
3. Interactive where relevant — mousemove, hover, click
4. Self-contained — no props required, default export
5. Cleanup on unmount — return cleanup fn from useEffect
6. React.memo() — prevents unnecessary re-renders
7. useReducedMotion() — accessibility

## Template structure
```typescript
'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const EffectNamePreview = memo(function EffectNamePreview() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // setup code
    return () => {
      // cleanup code
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* preview content */}
    </div>
  );
});

export default EffectNamePreview;
```

## Canvas previews (particles, etc.)
- Create canvas element in useEffect, not in JSX
- Always cancel animationFrameId on cleanup
- Use devicePixelRatio for sharp rendering

## CSS animation previews
- Use style jsx or inline keyframes via `<style>` tag in the component
- Never import external CSS files into preview components
- Prefer CSS animations over JS for simple loops

## Framer Motion previews
- Use `animate` prop with `repeat: Infinity` instead of CSS for complex sequences
- Wrap conditional animations: `if (shouldReduceMotion) return <StaticVersion />`

## Color usage
- Always use CSS variables: `style={{ color: 'var(--accent)' }}`
- Never hardcode colors
