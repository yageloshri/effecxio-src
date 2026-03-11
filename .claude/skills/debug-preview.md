# Skill: Debugging Preview Components

Use this skill when a preview component is broken, static, or causes errors.

## Diagnostic checklist
1. Is it exported from previews/index.ts? → Check the map
2. Is the previewComponent field in effects.ts matching the key in the map?
3. Is there a useEffect cleanup? Missing cleanup = memory leak + broken re-renders
4. Does it use any browser APIs without typeof window check? (SSR issue)
5. Does it import anything that doesn't exist?
6. Is it over 220px? Add: style={{ maxHeight: '220px', overflow: 'hidden' }}

## Common issues

### "hydration error"
Wrap browser-only code:
```typescript
useEffect(() => {
  // browser code here — safe
}, []);
```

### "canvas is null"
Always check ref: `if (!canvasRef.current) return;`
Always cancel animation frame on cleanup:
```typescript
useEffect(() => {
  let frameId: number;
  const animate = () => { frameId = requestAnimationFrame(animate); };
  animate();
  return () => cancelAnimationFrame(frameId);
}, []);
```

### "animation doesn't restart on re-mount"
Use a key prop on the preview container to force remount:
```tsx
<div key={effectId}>
  <PreviewComponent />
</div>
```

### "static on first render"
Add a small setTimeout or use Framer Motion's `initial` + `animate` instead of CSS.
