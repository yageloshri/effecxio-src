# Skill: Writing Code Snippets for Effects

Code snippets are what users copy and paste into their own projects.
Quality bar: must work immediately with zero modifications.

## Requirements
- Complete and self-contained — no external imports unless standard CDN
- Commented in English — brief explanations on non-obvious lines
- No placeholder text like "// your code here" or "// add styles"
- Variable names are descriptive English (not a, b, x)
- Works in vanilla HTML file with a <script> tag and <style> tag

## Tab structure
For short effects (< 60 lines):
- One tab: "מלא" — full HTML/CSS/JS combined

For longer effects (60+ lines):
- "HTML" tab — markup only
- "CSS" tab — styles only
- "JS" tab — script only
- "מלא" tab — everything combined

## Code quality checklist
- [ ] No ES6+ that needs transpiling (use const, let, arrow functions — all fine)
- [ ] CSS uses --variable references for colors where possible
- [ ] JS cleans up event listeners (important for SPA usage)
- [ ] Responsive — doesn't hardcode pixel widths
- [ ] Comment the "magic number" — e.g. `* 0.3 /* magnetic pull strength */`
- [ ] Brief /* How it works */ comment block at top for complex effects

## Example structure for a "Full" tab
```html
<!-- ==========================================
     EFFECT NAME — Effects Lab
     How it works: [1 sentence]
     ========================================== -->

<!-- HTML -->
<div class="effect-container">
  <!-- markup -->
</div>

<style>
  /* CSS */
  .effect-container { ... }
</style>

<script>
  // JS
  const el = document.querySelector('.effect-container');
  // ...
</script>
```
