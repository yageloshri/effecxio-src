import type { Effect } from '@/types';

export const effectsBatch2Buttons: Effect[] = [
  // ─── 1. Ripple Button ──────────────────────────────────────────────
  {
    id: 'ripplebutton',
    title: 'Ripple Button',
    titleHe: 'כפתור גלים',
    description: 'Click ripple effect expanding from click point.',
    descriptionHe: 'אפקט גלים שמתפשט מנקודת הלחיצה על הכפתור.',
    categories: ['button'],
    tags: [
      { label: 'ripple' },
      { label: 'button' },
      { label: 'click' },
    ],
    difficulty: 'beginner',
    previewComponent: 'ripplebutton',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Ripple Button</title>
<!-- Ripple Button — Click triggers an expanding circle from the click point -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 1.5rem;
  }
  .ripple-btn {
    position: relative;
    padding: 16px 48px;
    font-size: 1.1rem; font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    border: none; border-radius: 12px;
    cursor: pointer; overflow: hidden;
    transition: transform 0.2s ease;
  }
  .ripple-btn:active { transform: scale(0.97); }
  .ripple-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
    transform: scale(0);
    animation: ripple-expand 0.6s ease-out forwards;
    pointer-events: none;
  }
  @keyframes ripple-expand {
    to {
      transform: scale(4); /* expand to 4x the initial size */
      opacity: 0;
    }
  }
</style>
</head>
<body>
  <button class="ripple-btn" id="btn1">לחץ עליי</button>
  <button class="ripple-btn" id="btn2" style="background: linear-gradient(135deg, #ec4899, #f43f5e);">כפתור שני</button>

  <script>
    document.querySelectorAll('.ripple-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height);

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (x - size / 2) + 'px';
        ripple.style.top = (y - size / 2) + 'px';

        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הגלים עובד?</h4>
<p>אפקט ה-ripple יוצר עיגול שמתפשט החוצה מנקודת הלחיצה המדויקת, בדומה לגלים במים. זהו האפקט שגוגל משתמשת בו ב-Material Design.</p>
<ul>
  <li><strong>מיקום הלחיצה:</strong> בכל לחיצה מחשבים את המיקום היחסי של הסמן בתוך הכפתור באמצעות <code>getBoundingClientRect()</code>.</li>
  <li><strong>יצירת אלמנט:</strong> נוצר <code>span</code> עגול עם <code>border-radius: 50%</code> בגודל הכפתור, ממוקם בנקודת הלחיצה.</li>
  <li><strong>אנימציית התפשטות:</strong> keyframe <code>ripple-expand</code> מגדיל את האלמנט מ-<code>scale(0)</code> ל-<code>scale(4)</code> תוך הורדת שקיפות.</li>
  <li><strong>ניקוי:</strong> <code>overflow: hidden</code> על הכפתור מסתיר את הגלים שחורגים, ו-<code>animationend</code> מסיר את האלמנט מה-DOM.</li>
</ul>
<p>השילוב של מיקום מדויק, אנימציית scale והורדת opacity יוצר אפקט ויזואלי טבעי ומשביע רצון.</p>`,
    proTipHe: 'שנו את צבע ה-ripple ואת ערך ה-scale הסופי כדי להתאים לסגנון העיצוב שלכם.',
  },

  // ─── 2. Border Beam ────────────────────────────────────────────────
  {
    id: 'borderbeam',
    title: 'Border Beam',
    titleHe: 'קרן גבול',
    description: 'Animated light beam travels around button border.',
    descriptionHe: 'קרן אור מונפשת שנוסעת לאורך גבול הכפתור.',
    categories: ['button'],
    tags: [
      { label: 'border' },
      { label: 'beam' },
      { label: 'glow' },
    ],
    difficulty: 'intermediate',
    previewComponent: 'borderbeam',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Border Beam</title>
<!-- Border Beam — A glowing beam of light orbits the button border continuously -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 2rem;
  }
  .beam-btn {
    position: relative;
    padding: 16px 48px;
    font-size: 1.1rem; font-weight: 600;
    color: #fff; background: #111;
    border: none; border-radius: 12px;
    cursor: pointer;
    overflow: hidden;
    isolation: isolate;
  }
  .beam-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px; /* border thickness */
    background: conic-gradient(
      from var(--beam-angle, 0deg),
      transparent 0%,
      transparent 70%,
      #6c63ff 78%,
      #a78bfa 85%,
      transparent 92%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: beam-rotate 2.5s linear infinite; /* full orbit duration */
  }
  .beam-btn::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 16px;
    background: conic-gradient(
      from var(--beam-angle, 0deg),
      transparent 0%,
      transparent 72%,
      rgba(108, 99, 255, 0.25) 80%,
      transparent 90%
    );
    filter: blur(8px);
    z-index: -1;
    animation: beam-rotate 2.5s linear infinite;
  }
  @keyframes beam-rotate {
    to { --beam-angle: 360deg; }
  }
  @property --beam-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  .beam-btn span { position: relative; z-index: 1; }
</style>
</head>
<body>
  <button class="beam-btn"><span>קרן גבול</span></button>
  <button class="beam-btn" style="border-radius: 50px; padding: 16px 40px;">
    <span>כפתור עגול</span>
  </button>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט קרן הגבול עובד?</h4>
<p>קרן אור מונפשת מסתובבת סביב גבול הכפתור באמצעות <code>conic-gradient</code> מסתובב ו-<code>@property</code> מותאם אישית.</p>
<ul>
  <li><strong>conic-gradient מסתובב:</strong> <code>::before</code> משתמש ב-<code>conic-gradient</code> עם זווית דינמית (<code>--beam-angle</code>) שיוצרת פס אור צר שמסתובב.</li>
  <li><strong>@property:</strong> הגדרת <code>@property --beam-angle</code> כ-<code>&lt;angle&gt;</code> מאפשרת לדפדפן להנפיש את הזווית בצורה חלקה.</li>
  <li><strong>mask-composite:</strong> השילוב של <code>-webkit-mask</code> עם <code>xor</code> חותך את הפנים ומשאיר רק את הגבול גלוי.</li>
  <li><strong>אפקט זוהר:</strong> <code>::after</code> עם <code>filter: blur(8px)</code> מוסיף הילה רכה שעוקבת אחרי הקרן.</li>
</ul>
<p>הקרן עושה סיבוב מלא כל 2.5 שניות ויוצרת אפקט מרהיב של אור חי סביב הכפתור.</p>`,
    proTipHe: 'שנו את אחוזי השקיפות ב-conic-gradient כדי לשלוט באורך הקרן — אחוז קטן יותר יוצר קרן קצרה וחדה יותר.',
  },

  // ─── 3. Shiny Button ───────────────────────────────────────────────
  {
    id: 'shinybutton',
    title: 'Shiny Button',
    titleHe: 'כפתור מבריק',
    description: 'Shine reflection sweeps on hover like metal.',
    descriptionHe: 'ברק שעובר על הכפתור בריחוף כמו משטח מתכתי.',
    categories: ['button', 'hover'],
    tags: [
      { label: 'shine' },
      { label: 'hover' },
      { label: 'button' },
    ],
    difficulty: 'beginner',
    previewComponent: 'shinybutton',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Shiny Button</title>
<!-- Shiny Button — Metallic shine sweeps across the button on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 2rem;
  }
  .shiny-btn {
    position: relative;
    padding: 16px 48px;
    font-size: 1.1rem; font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff 0%, #8b5cf6 100%);
    border: none; border-radius: 12px;
    cursor: pointer; overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
  }
  .shiny-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(108, 99, 255, 0.3);
  }
  .shiny-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; /* width of the shine band */
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 0%,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.35) 50%,
      rgba(255, 255, 255, 0) 70%,
      transparent 100%
    );
    transition: none;
    pointer-events: none;
  }
  .shiny-btn:hover::before {
    animation: shine-sweep 0.7s ease-out forwards;
  }
  @keyframes shine-sweep {
    from { left: -100%; }
    to   { left: 130%; } /* travel full width plus overflow */
  }
  .shiny-btn span { position: relative; z-index: 1; }
</style>
</head>
<body>
  <button class="shiny-btn"><span>כפתור מבריק</span></button>
  <button class="shiny-btn" style="background: linear-gradient(135deg, #ec4899, #f43f5e); border-radius: 50px;">
    <span>ברק מתכתי</span>
  </button>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הברק עובד?</h4>
<p>פס אור שקוף למחצה עובר על פני הכפתור בריחוף, מדמה את ההשתקפות של אור על משטח מתכתי או זכוכית מבריקה.</p>
<ul>
  <li><strong>פס אור:</strong> <code>::before</code> עם <code>linear-gradient</code> שקוף-לבן-שקוף יוצר פס אור צר (60% מרוחב הכפתור).</li>
  <li><strong>מיקום התחלתי:</strong> הפס מתחיל ב-<code>left: -100%</code>, מוסתר לחלוטין מחוץ לכפתור.</li>
  <li><strong>אנימציית hover:</strong> ב-hover, keyframe <code>shine-sweep</code> מזיז את הפס מ-<code>-100%</code> ל-<code>130%</code> — מעבר חלק על כל הכפתור.</li>
  <li><strong>overflow: hidden:</strong> מוודא שהפס לא נראה מחוץ לגבולות הכפתור.</li>
</ul>
<p>האפקט פשוט ליישום אבל נותן תחושה פרימיום מיידית לכל כפתור.</p>`,
    proTipHe: 'שנו את הזווית של ה-linear-gradient (120deg) ואת רוחב פס האור כדי ליצור אפקטי ברק שונים.',
  },

  // ─── 4. Split Button ───────────────────────────────────────────────
  {
    id: 'splitbutton',
    title: 'Split Button',
    titleHe: 'כפתור מפוצל',
    description: 'Button splits in half on hover revealing content.',
    descriptionHe: 'כפתור שנפצל לשני חלקים בריחוף וחושף תוכן מוסתר.',
    categories: ['button', 'hover'],
    tags: [
      { label: 'split' },
      { label: 'hover' },
      { label: 'reveal' },
    ],
    difficulty: 'advanced',
    previewComponent: 'splitbutton',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Split Button</title>
<!-- Split Button — Button halves split apart on hover revealing hidden content -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .split-btn {
    position: relative;
    width: 220px; height: 56px;
    cursor: pointer;
    border: none; background: transparent;
  }
  .split-half {
    position: absolute;
    width: 100%; height: 50%;
    left: 0;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    color: #fff; font-weight: 700; font-size: 1rem;
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                border-radius 0.4s ease;
  }
  .split-top {
    top: 0;
    border-radius: 12px 12px 0 0;
    clip-path: inset(0 0 0 0); /* top half text crop */
  }
  .split-bottom {
    top: 50%;
    border-radius: 0 0 12px 12px;
    clip-path: inset(0 0 0 0);
  }
  .split-half span {
    position: absolute;
    white-space: nowrap;
  }
  .split-top span { bottom: 0; transform: translateY(50%); }
  .split-bottom span { top: 0; transform: translateY(-50%); }
  .split-btn:hover .split-top {
    transform: translateY(-10px) rotateX(-8deg);
    border-radius: 12px;
  }
  .split-btn:hover .split-bottom {
    transform: translateY(10px) rotateX(8deg);
    border-radius: 12px;
  }
  .split-reveal {
    position: absolute;
    inset: 0;
    display: flex; align-items: center; justify-content: center;
    color: #a78bfa; font-size: 0.85rem; font-weight: 600;
    opacity: 0;
    transition: opacity 0.3s ease 0.1s;
    pointer-events: none;
  }
  .split-btn:hover .split-reveal { opacity: 1; }
</style>
</head>
<body>
  <div class="split-btn" role="button" tabindex="0">
    <div class="split-half split-top"><span>לחץ כאן</span></div>
    <div class="split-half split-bottom"><span>לחץ כאן</span></div>
    <div class="split-reveal">✦ תוכן מוסתר ✦</div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך הכפתור המפוצל עובד?</h4>
<p>הכפתור מורכב משני חצאים שנפרדים בריחוף ליצירת אפקט דרמטי של חשיפת תוכן מוסתר מאחוריהם.</p>
<ul>
  <li><strong>שני חצאים:</strong> שני <code>div</code> ממוקמים אחד על השני, כל אחד תופס 50% מגובה הכפתור.</li>
  <li><strong>טקסט ממורכז:</strong> הטקסט בכל חצי מוזז ב-<code>translateY(50%)</code> כך שהוא נראה כטקסט אחד שלם.</li>
  <li><strong>פיצול ב-hover:</strong> החצי העליון זז למעלה והתחתון למטה עם <code>cubic-bezier</code> שיוצר תנועה קפיצית.</li>
  <li><strong>תוכן חבוי:</strong> <code>.split-reveal</code> מופיע עם <code>opacity</code> ו-<code>transition-delay</code> כדי להיחשף אחרי תחילת הפיצול.</li>
</ul>
<p>השילוב של תנועה תלת-ממדית קלה עם <code>rotateX</code> מוסיף עומק ותחושת מציאותיות לפיצול.</p>`,
    proTipHe: 'הוסיפו perspective על האלמנט ההורה לקבלת אפקט 3D מודגש יותר בפיצול.',
  },

  // ─── 5. Morph Button ───────────────────────────────────────────────
  {
    id: 'morphbutton',
    title: 'Morph Button',
    titleHe: 'כפתור מורף',
    description: 'Button morphs shape on hover (pill to square to pill).',
    descriptionHe: 'כפתור שמשנה צורה בריחוף — מגלולה לריבוע ובחזרה.',
    categories: ['button'],
    tags: [
      { label: 'morph' },
      { label: 'shape' },
      { label: 'animation' },
    ],
    difficulty: 'intermediate',
    previewComponent: 'morphbutton',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Morph Button</title>
<!-- Morph Button — Smoothly transitions between pill and square shapes on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 2rem;
  }
  .morph-btn {
    position: relative;
    padding: 16px 48px;
    font-size: 1.1rem; font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    border: none;
    border-radius: 50px; /* pill shape */
    cursor: pointer;
    transition:
      border-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
      transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.4s ease,
      padding 0.4s ease;
    box-shadow: 0 4px 20px rgba(108, 99, 255, 0.2);
  }
  .morph-btn:hover {
    border-radius: 8px; /* square-ish shape */
    transform: scale(1.08);
    box-shadow: 0 8px 40px rgba(108, 99, 255, 0.35);
    padding: 18px 52px;
  }
  .morph-btn:active {
    transform: scale(0.95);
    border-radius: 20px; /* mid-morph */
  }
  .morph-btn .icon {
    display: inline-block;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .morph-btn:hover .icon {
    transform: rotate(90deg) scale(1.2);
  }
  .label-text {
    display: inline-block;
    transition: letter-spacing 0.4s ease;
  }
  .morph-btn:hover .label-text {
    letter-spacing: 2px;
  }
</style>
</head>
<body>
  <button class="morph-btn">
    <span class="icon">▶</span>
    <span class="label-text">הפעל</span>
  </button>
  <button class="morph-btn" style="background: linear-gradient(135deg, #06b6d4, #0891b2);">
    <span class="icon">⬇</span>
    <span class="label-text">הורד</span>
  </button>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך הכפתור המורף עובד?</h4>
<p>הכפתור משנה צורה בריחוף — מגלולה עגולה לריבוע עם פינות מעוגלות, באמצעות אנימציית <code>border-radius</code> חלקה.</p>
<ul>
  <li><strong>מצב התחלתי:</strong> <code>border-radius: 50px</code> יוצר צורת גלולה עגולה, צורה פופולרית לכפתורי CTA.</li>
  <li><strong>מורפינג ב-hover:</strong> <code>border-radius</code> יורד ל-<code>8px</code> — הכפתור מתמורף לריבוע מעוגל.</li>
  <li><strong>cubic-bezier:</strong> <code>(0.34, 1.56, 0.64, 1)</code> יוצר אפקט "bounce" קל שהופך את המעבר לחי ואנרגטי.</li>
  <li><strong>שינויים מרובים:</strong> בנוסף לצורה, משתנים גם scale, padding, letter-spacing ו-box-shadow לתחושה דינמית.</li>
  <li><strong>אייקון מסתובב:</strong> האייקון מסתובב 90 מעלות ב-hover כחיווי ויזואלי נוסף.</li>
</ul>
<p>מספר שינויים קטנים שמתרחשים בו-זמנית יוצרים אפקט מורף מרשים ועשיר.</p>`,
    proTipHe: 'נסו ערכי cubic-bezier שונים כמו (0.68, -0.55, 0.27, 1.55) לאפקטי תנועה שונים.',
  },

  // ─── 6. Glitch Button ──────────────────────────────────────────────
  {
    id: 'glitchbutton',
    title: 'Glitch Button',
    titleHe: "כפתור גליץ'",
    description: 'RGB split glitch on hover.',
    descriptionHe: "פיצול RGB ואפקט גליץ' בריחוף על הכפתור.",
    categories: ['button', 'hover'],
    tags: [
      { label: 'glitch' },
      { label: 'RGB' },
      { label: 'hover' },
    ],
    difficulty: 'intermediate',
    previewComponent: 'glitchbutton',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Glitch Button</title>
<!-- Glitch Button — RGB split and chromatic aberration glitch on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: 'Courier New', monospace;
  }
  .glitch-btn {
    position: relative;
    padding: 18px 56px;
    font-size: 1.2rem; font-weight: 700;
    color: #fff; letter-spacing: 4px;
    background: #111; border: 2px solid #333;
    cursor: pointer;
    text-transform: uppercase;
  }
  .glitch-btn::before,
  .glitch-btn::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    padding: 18px 56px;
    background: #111;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }
  .glitch-btn::before {
    color: #0ff; /* cyan channel */
    border: 2px solid #0ff;
    z-index: -1;
  }
  .glitch-btn::after {
    color: #f0f; /* magenta channel */
    border: 2px solid #f0f;
    z-index: -1;
  }
  .glitch-btn:hover::before {
    opacity: 0.8;
    animation: glitch-r 0.3s steps(2) infinite;
  }
  .glitch-btn:hover::after {
    opacity: 0.8;
    animation: glitch-b 0.3s steps(2) infinite;
  }
  .glitch-btn:hover {
    animation: glitch-skew 0.5s steps(4) infinite;
  }
  @keyframes glitch-r {
    0%   { clip-path: inset(20% 0 40% 0); transform: translate(-4px, 2px); }
    25%  { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); }
    50%  { clip-path: inset(10% 0 70% 0); transform: translate(-3px, -1px); }
    75%  { clip-path: inset(50% 0 20% 0); transform: translate(3px, 1px); }
    100% { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 3px); }
  }
  @keyframes glitch-b {
    0%   { clip-path: inset(50% 0 20% 0); transform: translate(4px, -1px); }
    25%  { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 2px); }
    50%  { clip-path: inset(70% 0 5% 0); transform: translate(3px, 1px); }
    75%  { clip-path: inset(30% 0 40% 0); transform: translate(-3px, -2px); }
    100% { clip-path: inset(5% 0 75% 0); transform: translate(2px, -3px); }
  }
  @keyframes glitch-skew {
    0%  { transform: skew(0deg); }
    25% { transform: skew(-2deg); }
    50% { transform: skew(1deg); }
    75% { transform: skew(-1deg); }
    100% { transform: skew(0deg); }
  }
</style>
</head>
<body>
  <button class="glitch-btn" data-text="GLITCH">GLITCH</button>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך כפתור הגליץ' עובד?</h4>
<p>האפקט מדמה תקלה דיגיטלית על כפתור באמצעות פיצול RGB — שתי שכבות בצבעי ציאן ומגנטה שזזות בצורה אקראית.</p>
<ul>
  <li><strong>שכפול טקסט:</strong> <code>::before</code> ו-<code>::after</code> משתמשים ב-<code>attr(data-text)</code> ליצירת שכבות ציאן ומגנטה.</li>
  <li><strong>clip-path:</strong> כל שכבה נחתכת עם <code>clip-path: inset()</code> שמשתנה כל פריים, כך שרק חלקים אקראיים נראים.</li>
  <li><strong>translate:</strong> כל שכבה זזה בכמה פיקסלים בכיוונים שונים, מה שיוצר אפקט פיצול צבעוני (chromatic aberration).</li>
  <li><strong>steps():</strong> <code>steps(2)</code> יוצר מעברים קופצניים במקום חלקים, מה שמחזק את התחושה של תקלה דיגיטלית.</li>
  <li><strong>skew:</strong> הכפתור עצמו עובר עיוות קל עם <code>skew</code> שמוסיף לאפקט הגליץ'.</li>
</ul>
<p>האפקט מופעל רק ב-hover כך שהכפתור נראה נקי ומקצועי במצב רגיל.</p>`,
    proTipHe: "הגדילו את ערכי ה-translate לגליץ' אגרסיבי יותר, או הקטינו אותם לאפקט עדין.",
  },

  // ─── 7. Elastic Button ─────────────────────────────────────────────
  {
    id: 'elasticbutton',
    title: 'Elastic Button',
    titleHe: 'כפתור אלסטי',
    description: 'Button stretches elastically on click with spring back.',
    descriptionHe: 'כפתור שנמתח בצורה אלסטית בלחיצה וקופץ בחזרה כמו גומי.',
    categories: ['button'],
    tags: [
      { label: 'elastic' },
      { label: 'spring' },
      { label: 'click' },
    ],
    difficulty: 'advanced',
    previewComponent: 'elasticbutton',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Elastic Button</title>
<!-- Elastic Button — Button stretches and bounces like rubber on click -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 2rem;
  }
  .elastic-btn {
    padding: 16px 48px;
    font-size: 1.1rem; font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    border: none; border-radius: 12px;
    cursor: pointer;
    transform-origin: center center;
    will-change: transform;
  }
  .elastic-btn.bounce {
    animation: elastic-bounce 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  @keyframes elastic-bounce {
    0%   { transform: scale(1, 1); }
    10%  { transform: scale(1.15, 0.85); } /* squash horizontally */
    20%  { transform: scale(0.85, 1.15); } /* stretch vertically */
    30%  { transform: scale(1.1, 0.9); }
    40%  { transform: scale(0.95, 1.05); }
    50%  { transform: scale(1.05, 0.95); }
    60%  { transform: scale(0.98, 1.02); }
    70%  { transform: scale(1.02, 0.98); }
    80%  { transform: scale(0.99, 1.01); }
    90%  { transform: scale(1.01, 0.99); }
    100% { transform: scale(1, 1); }
  }
  .elastic-btn:active {
    transform: scale(0.9, 1.1);
  }
  .hint { color: #555; font-size: 0.85rem; }
</style>
</head>
<body>
  <button class="elastic-btn" id="btn1">לחץ עליי</button>
  <button class="elastic-btn" id="btn2" style="background: linear-gradient(135deg, #f97316, #ef4444);">
    כפתור שני
  </button>
  <p class="hint">לחצו על הכפתורים</p>

  <script>
    document.querySelectorAll('.elastic-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        this.classList.remove('bounce');
        void this.offsetWidth; /* force reflow to restart animation */
        this.classList.add('bounce');
      });
      btn.addEventListener('animationend', function() {
        this.classList.remove('bounce');
      });
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך הכפתור האלסטי עובד?</h4>
<p>הכפתור מדמה חומר גמיש — בלחיצה הוא נמעך ונמתח בציר X ו-Y לסירוגין, כמו כדור גומי שקופץ על שולחן.</p>
<ul>
  <li><strong>squash & stretch:</strong> עיקרון אנימציה קלאסי — <code>scaleX</code> עולה כש-<code>scaleY</code> יורד ולהיפך, מה ששומר על נפח קבוע.</li>
  <li><strong>10 שלבים:</strong> האנימציה מחולקת ל-10 שלבים שבהם העיוות הולך וקטן, מדמה דעיכת תנודה פיזיקלית.</li>
  <li><strong>force reflow:</strong> <code>void this.offsetWidth</code> מאלץ את הדפדפן לחשב מחדש, מה שמאפשר להפעיל מחדש אנימציה על אותו אלמנט.</li>
  <li><strong>:active:</strong> בזמן הלחיצה עצמה, <code>scale(0.9, 1.1)</code> נותן פידבק מיידי לפני תחילת האנימציה.</li>
</ul>
<p>התנודות ההולכות ופוחתות יוצרות תחושת פיזיקה אמיתית שהופכת את הלחיצה למספקת.</p>`,
    proTipHe: 'הגדילו את ערכי ה-scale הראשונים (1.15/0.85) לאלסטיות דרמטית יותר.',
  },

  // ─── 8. Confetti Button ────────────────────────────────────────────
  {
    id: 'confettibutton',
    title: 'Confetti Button',
    titleHe: 'כפתור קונפטי',
    description: 'Click triggers confetti particles burst.',
    descriptionHe: 'לחיצה מפעילה פיצוץ של חלקיקי קונפטי צבעוניים.',
    categories: ['button'],
    tags: [
      { label: 'confetti' },
      { label: 'particles' },
      { label: 'celebration' },
    ],
    difficulty: 'intermediate',
    previewComponent: 'confettibutton',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Confetti Button</title>
<!-- Confetti Button — Click spawns colorful confetti particles that burst and fall -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    overflow: hidden;
  }
  .confetti-btn {
    position: relative;
    padding: 18px 56px;
    font-size: 1.2rem; font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff, #a855f7);
    border: none; border-radius: 14px;
    cursor: pointer;
    transition: transform 0.2s;
    z-index: 1;
  }
  .confetti-btn:active { transform: scale(0.95); }
  .confetti {
    position: fixed;
    width: 10px; height: 10px;
    pointer-events: none;
    z-index: 0;
    animation: confetti-fall 1.2s ease-out forwards;
  }
  @keyframes confetti-fall {
    0% {
      opacity: 1;
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    100% {
      opacity: 0;
      transform:
        translate(var(--dx), var(--dy))
        rotate(var(--rot))
        scale(0.3);
    }
  }
</style>
</head>
<body>
  <button class="confetti-btn" id="confettiBtn">🎉 חגיגה!</button>

  <script>
    const btn = document.getElementById('confettiBtn');
    const colors = ['#6c63ff', '#f43f5e', '#fbbf24', '#34d399', '#60a5fa', '#f472b6'];
    const PARTICLE_COUNT = 30; /* number of particles per burst */

    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'confetti';

        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT;
        const velocity = 80 + Math.random() * 120; /* px travel distance */
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity - 40; /* bias upward */
        const rot = (Math.random() * 720 - 360) + 'deg';

        el.style.left = cx + 'px';
        el.style.top = cy + 'px';
        el.style.setProperty('--dx', dx + 'px');
        el.style.setProperty('--dy', dy + 'px');
        el.style.setProperty('--rot', rot);
        el.style.background = colors[i % colors.length];
        el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        el.style.width = (6 + Math.random() * 8) + 'px';
        el.style.height = (6 + Math.random() * 8) + 'px';
        el.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';

        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
      }
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הקונפטי עובד?</h4>
<p>לחיצה על הכפתור יוצרת 30 חלקיקי קונפטי צבעוניים שמתפזרים בכל הכיוונים ונופלים בהדרגה.</p>
<ul>
  <li><strong>חישוב כיוון:</strong> 30 חלקיקים מחולקים ב-360 מעלות כך שכל חלקיק עף בכיוון שונה באמצעות <code>Math.cos/sin</code>.</li>
  <li><strong>CSS Variables:</strong> כל חלקיק מקבל <code>--dx</code>, <code>--dy</code> ו-<code>--rot</code> ייחודיים שקובעים לאן הוא עף.</li>
  <li><strong>צורות אקראיות:</strong> חלק מהחלקיקים עגולים (<code>border-radius: 50%</code>) וחלק מרובעים, עם גדלים אקראיים.</li>
  <li><strong>ניקוי אוטומטי:</strong> <code>animationend</code> מסיר כל חלקיק מה-DOM לשמירה על ביצועים.</li>
</ul>
<p>המשחק של צורות, צבעים וגדלים אקראיים יוצר אפקט קונפטי טבעי ומשמח.</p>`,
    proTipHe: 'שנו את PARTICLE_COUNT ואת velocity כדי לשלוט בעוצמת הפיצוץ.',
  },

  // ─── 9. Success Button ─────────────────────────────────────────────
  {
    id: 'successbutton',
    title: 'Success Button',
    titleHe: 'כפתור הצלחה',
    description: 'Click triggers checkmark animation and success message.',
    descriptionHe: 'לחיצה מפעילה אנימציית וי ירוק והודעת הצלחה שנכנסת.',
    categories: ['button'],
    tags: [
      { label: 'success' },
      { label: 'checkmark' },
      { label: 'feedback' },
    ],
    difficulty: 'beginner',
    previewComponent: 'successbutton',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Success Button</title>
<!-- Success Button — Click morphs button into a success checkmark with animated stroke -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .success-btn {
    position: relative;
    min-width: 200px; height: 56px;
    padding: 0 32px;
    font-size: 1.1rem; font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    border: none; border-radius: 12px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .success-btn.done {
    background: #10b981;
    min-width: 56px;
    border-radius: 50%;
    padding: 0;
  }
  .success-btn .label {
    transition: opacity 0.2s, transform 0.3s;
  }
  .success-btn.done .label {
    opacity: 0;
    transform: scale(0.5);
  }
  .check-svg {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 28px; height: 28px;
    opacity: 0;
    transition: opacity 0.3s ease 0.3s;
  }
  .success-btn.done .check-svg { opacity: 1; }
  .check-path {
    fill: none; stroke: #fff; stroke-width: 3;
    stroke-linecap: round; stroke-linejoin: round;
    stroke-dasharray: 30;   /* total path length */
    stroke-dashoffset: 30;  /* fully hidden */
    transition: stroke-dashoffset 0.4s ease 0.4s;
  }
  .success-btn.done .check-path {
    stroke-dashoffset: 0; /* fully drawn */
  }
  .msg {
    margin-top: 1rem;
    color: #10b981; font-weight: 600;
    opacity: 0; transform: translateY(10px);
    transition: all 0.4s ease 0.6s;
  }
  .msg.show {
    opacity: 1; transform: translateY(0);
  }
</style>
</head>
<body>
  <div style="text-align: center;">
    <button class="success-btn" id="successBtn">
      <span class="label">שלח</span>
      <svg class="check-svg" viewBox="0 0 24 24">
        <polyline class="check-path" points="4 12 10 18 20 6" />
      </svg>
    </button>
    <div class="msg" id="msg">✓ הפעולה הושלמה בהצלחה!</div>
  </div>

  <script>
    const btn = document.getElementById('successBtn');
    const msg = document.getElementById('msg');

    btn.addEventListener('click', () => {
      if (btn.classList.contains('done')) return;
      btn.classList.add('done');
      msg.classList.add('show');

      setTimeout(() => {
        btn.classList.remove('done');
        msg.classList.remove('show');
      }, 2500); /* reset after 2.5 seconds */
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך כפתור ההצלחה עובד?</h4>
<p>הכפתור עובר מורפינג מכפתור רגיל לעיגול ירוק עם אנימציית וי (checkmark) שמציירת את עצמה, ומלווה בהודעת הצלחה.</p>
<ul>
  <li><strong>מורפינג צורה:</strong> <code>min-width</code> יורד מ-200px ל-56px ו-<code>border-radius</code> עולה ל-50% כדי ליצור עיגול.</li>
  <li><strong>SVG checkmark:</strong> נתיב <code>polyline</code> עם <code>stroke-dasharray</code> ו-<code>stroke-dashoffset</code> — מתחיל מוסתר ומתגלה בהדרגה.</li>
  <li><strong>transition-delay:</strong> כל שלב מתחיל עם השהייה שונה — הטקסט נעלם (0s), העיגול מתכווץ (0.3s), הוי נמשך (0.4s), וההודעה מופיעה (0.6s).</li>
  <li><strong>איפוס:</strong> <code>setTimeout</code> מאפס את הכפתור אחרי 2.5 שניות כדי לאפשר לחיצה נוספת.</li>
</ul>
<p>שרשרת האנימציות יוצרת חוויית פידבק מלאה ומספקת שמעבירה למשתמש מסר ברור של הצלחה.</p>`,
    proTipHe: 'הוסיפו מצב loading עם ספינר לפני ההצלחה כדי ליצור תהליך שלם של submit > loading > success.',
  },

  // ─── 10. Hover Reveal ──────────────────────────────────────────────
  {
    id: 'hoverreveal',
    title: 'Hover Reveal',
    titleHe: 'חשיפת hover',
    description: 'Hidden content slides up from behind element on hover.',
    descriptionHe: 'תוכן מוסתר שמחליק למעלה מאחורי האלמנט בריחוף.',
    categories: ['hover', 'card'],
    tags: [
      { label: 'hover' },
      { label: 'reveal' },
      { label: 'card' },
    ],
    difficulty: 'beginner',
    previewComponent: 'hoverreveal',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Hover Reveal</title>
<!-- Hover Reveal — Hidden overlay content slides up from behind the card on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 2rem;
  }
  .reveal-card {
    position: relative;
    width: 260px; height: 200px;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    background: linear-gradient(145deg, #1e1b4b, #312e81);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .reveal-front {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0.8rem;
    color: #e2e8f0;
    padding: 1.5rem;
    transition: opacity 0.4s ease, transform 0.4s ease;
    z-index: 1;
  }
  .reveal-front .icon { font-size: 2.5rem; }
  .reveal-front h3 { font-size: 1.2rem; }
  .reveal-card:hover .reveal-front {
    opacity: 0;
    transform: translateY(-20px);
  }
  .reveal-back {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0.8rem;
    padding: 1.5rem;
    color: #e2e8f0;
    background: linear-gradient(145deg, #312e81, #4c1d95);
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 2;
  }
  .reveal-card:hover .reveal-back {
    transform: translateY(0);
  }
  .reveal-back p {
    font-size: 0.9rem;
    line-height: 1.6;
    text-align: center;
    opacity: 0.85;
  }
  .reveal-back .cta {
    padding: 8px 24px;
    border-radius: 8px;
    background: rgba(108, 99, 255, 0.3);
    border: 1px solid rgba(108, 99, 255, 0.5);
    color: #fff; font-size: 0.85rem; font-weight: 600;
    cursor: pointer;
  }
</style>
</head>
<body>
  <div class="reveal-card">
    <div class="reveal-front">
      <span class="icon">🚀</span>
      <h3>רחף עליי</h3>
    </div>
    <div class="reveal-back">
      <p>תוכן מוסתר שנחשף בריחוף עם אנימציה חלקה</p>
      <button class="cta">גלה עוד</button>
    </div>
  </div>
  <div class="reveal-card">
    <div class="reveal-front">
      <span class="icon">✨</span>
      <h3>רחף גם עליי</h3>
    </div>
    <div class="reveal-back">
      <p>האפקט משתמש ב-translateY וב-cubic-bezier לתנועה קפיצית</p>
      <button class="cta">לפרטים</button>
    </div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט החשיפה עובד?</h4>
<p>כרטיס עם שתי שכבות — חזית ואחורה. בריחוף, החזית מתעמעמת וקטנה, והשכבה האחורית מחליקה למעלה מלמטה.</p>
<ul>
  <li><strong>שתי שכבות:</strong> <code>.reveal-front</code> מציגה תוכן ראשוני, <code>.reveal-back</code> מוסתרת עם <code>translateY(100%)</code>.</li>
  <li><strong>hover על ההורה:</strong> ריחוף על <code>.reveal-card</code> גורם לחזית להיעלם ולשכבה האחורית לעלות למקומה.</li>
  <li><strong>cubic-bezier:</strong> <code>(0.34, 1.56, 0.64, 1)</code> יוצר תנועה קפיצית, כאילו השכבה "נזרקת" למעלה וחוזרת קצת אחורה.</li>
  <li><strong>overflow: hidden:</strong> מסתיר את השכבה האחורית כשהיא מחוץ לגבולות הכרטיס.</li>
</ul>
<p>אפקט פשוט ויעיל שמוסיף אינטראקטיביות לכרטיסי מידע ותוכן.</p>`,
    proTipHe: 'נסו לשנות את כיוון הכניסה — translateX במקום translateY ליצירת חשיפה אופקית.',
  },

  // ─── 11. Fancy Tooltip ─────────────────────────────────────────────
  {
    id: 'tooltipfancy',
    title: 'Fancy Tooltip',
    titleHe: 'טולטיפ מעוצב',
    description: 'Animated tooltip with arrow, fade + scale entrance.',
    descriptionHe: 'טולטיפ מונפש עם חץ, כניסה של fade ו-scale.',
    categories: ['hover', 'interaction'],
    tags: [
      { label: 'tooltip' },
      { label: 'hover' },
      { label: 'UI' },
    ],
    difficulty: 'beginner',
    previewComponent: 'tooltipfancy',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Fancy Tooltip</title>
<!-- Fancy Tooltip — Animated tooltip with arrow, fade and scale entrance -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 3rem;
  }
  .tooltip-wrap {
    position: relative;
    display: inline-block;
  }
  .tooltip-trigger {
    padding: 12px 32px;
    font-size: 1rem; font-weight: 600;
    color: #e2e8f0;
    background: #1a1a2e;
    border: 1px solid #333;
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.3s;
  }
  .tooltip-trigger:hover { border-color: #6c63ff; }
  .tooltip-bubble {
    position: absolute;
    bottom: calc(100% + 12px); /* gap above trigger */
    left: 50%;
    transform: translateX(-50%) scale(0.85);
    padding: 10px 18px;
    background: #6c63ff;
    color: #fff;
    font-size: 0.85rem; font-weight: 500;
    white-space: nowrap;
    border-radius: 8px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 8px 24px rgba(108, 99, 255, 0.3);
  }
  .tooltip-bubble::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #6c63ff; /* arrow pointing down */
  }
  .tooltip-wrap:hover .tooltip-bubble {
    opacity: 1;
    transform: translateX(-50%) scale(1);
    pointer-events: auto;
  }
  /* Bottom variant */
  .tooltip-bubble.bottom {
    bottom: auto;
    top: calc(100% + 12px);
    transform-origin: top center;
  }
  .tooltip-bubble.bottom::after {
    top: auto; bottom: 100%;
    border-top-color: transparent;
    border-bottom-color: #6c63ff;
  }
</style>
</head>
<body>
  <div class="tooltip-wrap">
    <button class="tooltip-trigger">רחף למעלה</button>
    <div class="tooltip-bubble">✨ טולטיפ מונפש עם חץ!</div>
  </div>

  <div class="tooltip-wrap">
    <button class="tooltip-trigger">רחף למטה</button>
    <div class="tooltip-bubble bottom">📌 טולטיפ מלמטה</div>
  </div>

  <div class="tooltip-wrap">
    <button class="tooltip-trigger">עוד טולטיפ</button>
    <div class="tooltip-bubble" style="background: #ec4899; box-shadow: 0 8px 24px rgba(236,72,153,0.3);">
      💡 צבע מותאם אישית
      <span style="position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#ec4899;"></span>
    </div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך הטולטיפ המעוצב עובד?</h4>
<p>טולטיפ שמופיע בריחוף עם אנימציית כניסה של fade ו-scale בו-זמנית, עם חץ שמצביע על האלמנט שהפעיל אותו.</p>
<ul>
  <li><strong>מיקום:</strong> הטולטיפ ממוקם עם <code>position: absolute</code> מעל הטריגר, עם <code>translateX(-50%)</code> למרכוז.</li>
  <li><strong>חץ CSS:</strong> <code>::after</code> עם <code>border</code> שקוף ו-<code>border-top-color</code> צבעוני יוצר חץ משולש שמצביע למטה.</li>
  <li><strong>אנימציית כניסה:</strong> מצב התחלתי <code>scale(0.85)</code> ו-<code>opacity: 0</code>. בהריחוף משתנה ל-<code>scale(1)</code> ו-<code>opacity: 1</code>.</li>
  <li><strong>cubic-bezier:</strong> <code>(0.34, 1.56, 0.64, 1)</code> על ה-transform יוצר אפקט "bounce" קל שמוסיף חיים.</li>
</ul>
<p>הטולטיפ מרגיש חי ודינמי, הרבה מעבר לטולטיפ CSS סטנדרטי.</p>`,
    proTipHe: 'הוסיפו transition-delay קצר (0.1s) כדי שהטולטיפ לא יופיע מיד ויימנע מהבזקים מיותרים.',
  },

  // ─── 12. Toggle Switch ─────────────────────────────────────────────
  {
    id: 'toggleswitch',
    title: 'Toggle Switch',
    titleHe: 'מתג מונפש',
    description: 'Custom toggle switch with fluid animation.',
    descriptionHe: 'מתג מותאם אישית עם אנימציה נוזלית וחלקה.',
    categories: ['interaction'],
    tags: [
      { label: 'toggle' },
      { label: 'switch' },
      { label: 'UI' },
    ],
    difficulty: 'beginner',
    previewComponent: 'toggleswitch',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Toggle Switch</title>
<!-- Toggle Switch — Custom animated toggle with stretchy knob and color transition -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 3rem; flex-direction: column;
  }
  .toggle-row {
    display: flex; align-items: center; gap: 1rem;
    color: #94a3b8; font-size: 0.95rem;
  }
  .toggle {
    position: relative;
    width: 56px; height: 30px;
    cursor: pointer;
  }
  .toggle input {
    opacity: 0; width: 0; height: 0;
    position: absolute;
  }
  .track {
    position: absolute; inset: 0;
    background: #333;
    border-radius: 15px; /* pill shape */
    transition: background 0.4s ease;
  }
  .toggle input:checked + .track {
    background: #6c63ff;
  }
  .knob {
    position: absolute;
    top: 3px; left: 3px;
    width: 24px; height: 24px;
    background: #fff;
    border-radius: 50%;
    transition:
      left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      width 0.2s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
  .toggle input:checked ~ .knob {
    left: 29px; /* 56 - 24 - 3 = 29 */
  }
  .toggle:active .knob {
    width: 30px; /* stretch the knob on press */
  }
  .toggle input:checked + .track + .knob {
    /* knob shifts accounting for stretch */
  }
  .toggle:active input:checked ~ .knob {
    left: 23px; /* compensate for wider knob */
  }
  .status {
    font-weight: 600;
    min-width: 40px;
    transition: color 0.3s;
  }
</style>
</head>
<body>
  <div class="toggle-row">
    <span>התראות</span>
    <label class="toggle">
      <input type="checkbox" checked />
      <div class="track"></div>
      <div class="knob"></div>
    </label>
    <span class="status" id="s1">פועל</span>
  </div>
  <div class="toggle-row">
    <span>מצב כהה</span>
    <label class="toggle">
      <input type="checkbox" />
      <div class="track"></div>
      <div class="knob"></div>
    </label>
    <span class="status" id="s2">כבוי</span>
  </div>

  <script>
    document.querySelectorAll('.toggle input').forEach((input, i) => {
      const statusEl = document.getElementById('s' + (i + 1));
      input.addEventListener('change', () => {
        statusEl.textContent = input.checked ? 'פועל' : 'כבוי';
        statusEl.style.color = input.checked ? '#6c63ff' : '#94a3b8';
      });
      /* init */
      statusEl.style.color = input.checked ? '#6c63ff' : '#94a3b8';
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך המתג המונפש עובד?</h4>
<p>מתג toggle מותאם אישית שנבנה עם CSS טהור מעל <code>input[type=checkbox]</code> מוסתר, עם אנימציית "מתיחה" נוזלית.</p>
<ul>
  <li><strong>input מוסתר:</strong> ה-checkbox האמיתי מוסתר עם <code>opacity: 0</code> אבל עדיין פעיל ונגיש.</li>
  <li><strong>:checked selector:</strong> כשה-input מסומן, ה-CSS משנה את צבע ה-track ואת מיקום ה-knob באמצעות sibling selectors.</li>
  <li><strong>מתיחת knob:</strong> ב-<code>:active</code>, ה-knob נמתח ל-<code>30px</code> — מדמה כפתור פיזי שנדחס.</li>
  <li><strong>cubic-bezier:</strong> <code>(0.34, 1.56, 0.64, 1)</code> על תנועת ה-knob יוצר תנודה קלה כאילו הכדור קופץ למקומו.</li>
</ul>
<p>המתג נגיש לחלוטין (עובד עם Tab ו-Space) כי הוא בנוי על checkbox אמיתי.</p>`,
    proTipHe: 'הוסיפו אייקונים של שמש וירח בתוך ה-track ליצירת מתג dark mode מקצועי.',
  },

  // ─── 13. Input Float Label ─────────────────────────────────────────
  {
    id: 'inputfloat',
    title: 'Float Label Input',
    titleHe: 'שדה float label',
    description: 'Label floats up when input focused.',
    descriptionHe: 'תווית שצפה למעלה כשהשדה מקבל פוקוס.',
    categories: ['interaction'],
    tags: [
      { label: 'input' },
      { label: 'form' },
      { label: 'label' },
    ],
    difficulty: 'beginner',
    previewComponent: 'inputfloat',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Float Label Input</title>
<!-- Float Label Input — Label text animates upward when the input receives focus -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .form-group {
    display: flex; flex-direction: column; gap: 1.5rem;
    width: 320px;
  }
  .float-field {
    position: relative;
  }
  .float-field input {
    width: 100%;
    padding: 18px 16px 8px;
    font-size: 1rem;
    color: #e2e8f0;
    background: #111;
    border: 2px solid #333;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.3s ease;
    font-family: inherit;
  }
  .float-field input:focus {
    border-color: #6c63ff;
  }
  .float-field label {
    position: absolute;
    left: 16px; top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #666;
    pointer-events: none;
    transition:
      top 0.25s ease,
      font-size 0.25s ease,
      color 0.25s ease;
  }
  .float-field input:focus + label,
  .float-field input:not(:placeholder-shown) + label {
    top: 10px;
    font-size: 0.75rem;
    color: #6c63ff;
  }
  .float-field .line {
    position: absolute;
    bottom: 0; left: 50%;
    width: 0; height: 2px;
    background: #6c63ff;
    transition: width 0.3s ease, left 0.3s ease;
    border-radius: 0 0 10px 10px;
  }
  .float-field input:focus ~ .line {
    width: 100%;
    left: 0;
  }
</style>
</head>
<body>
  <div class="form-group">
    <div class="float-field">
      <input type="text" id="name" placeholder=" " />
      <label for="name">שם מלא</label>
      <div class="line"></div>
    </div>
    <div class="float-field">
      <input type="email" id="email" placeholder=" " />
      <label for="email">אימייל</label>
      <div class="line"></div>
    </div>
    <div class="float-field">
      <input type="password" id="pass" placeholder=" " />
      <label for="pass">סיסמה</label>
      <div class="line"></div>
    </div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך שדה ה-float label עובד?</h4>
<p>התווית ממוקמת בתוך השדה כ-placeholder ויזואלי, וצפה למעלה כשהשדה מקבל פוקוס או כשיש בו תוכן — ב-CSS בלבד.</p>
<ul>
  <li><strong>placeholder ריק:</strong> <code>placeholder=" "</code> (רווח) מאפשר שימוש ב-<code>:not(:placeholder-shown)</code> לזיהוי תוכן.</li>
  <li><strong>מיקום התחלתי:</strong> ה-label ממוקמת עם <code>top: 50%</code> ו-<code>translateY(-50%)</code> — בדיוק במרכז השדה.</li>
  <li><strong>float למעלה:</strong> ב-focus, <code>top</code> יורד ל-<code>10px</code>, <code>font-size</code> קטן ל-<code>0.75rem</code>, והצבע משתנה לסגול.</li>
  <li><strong>קו תחתון:</strong> <code>.line</code> מתפשט מהמרכז לצדדים ב-focus באמצעות שינוי <code>width</code> ו-<code>left</code>.</li>
  <li><strong>:not(:placeholder-shown):</strong> מוודא שה-label נשארת למעלה גם אחרי שעוזבים את השדה, אם יש בו תוכן.</li>
</ul>
<p>פתרון אלגנטי ונגיש שלא דורש JavaScript כלל.</p>`,
    proTipHe: 'הוסיפו :valid ו-:invalid selectors כדי לשנות את צבע הגבול והתווית לפי תקינות השדה.',
  },

  // ─── 14. Draggable ─────────────────────────────────────────────────
  {
    id: 'draggable',
    title: 'Draggable Element',
    titleHe: 'אלמנט גרירה',
    description: 'Draggable element with momentum and boundary snap.',
    descriptionHe: 'אלמנט שניתן לגרור עם מומנטום ותפיסה לגבולות.',
    categories: ['interaction'],
    tags: [
      { label: 'drag' },
      { label: 'interaction' },
      { label: 'momentum' },
    ],
    difficulty: 'advanced',
    previewComponent: 'draggable',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Draggable Element</title>
<!-- Draggable Element — Drag with momentum physics and boundary snapping -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a;
    font-family: sans-serif;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .drag-area {
    position: relative;
    width: 500px; height: 350px;
    border: 2px dashed #333;
    border-radius: 16px;
    background: #0c0c14;
  }
  .draggable {
    position: absolute;
    width: 80px; height: 80px;
    border-radius: 16px;
    background: linear-gradient(135deg, #6c63ff, #a855f7);
    cursor: grab;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-weight: 700; font-size: 0.8rem;
    user-select: none;
    touch-action: none;
    transition: box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(108,99,255,0.2);
    left: 50px; top: 50px;
  }
  .draggable.dragging {
    cursor: grabbing;
    box-shadow: 0 8px 40px rgba(108,99,255,0.4);
    z-index: 10;
  }
  .hint {
    position: absolute;
    bottom: 12px; left: 0; right: 0;
    text-align: center;
    color: #555; font-size: 0.8rem;
  }
</style>
</head>
<body>
  <div class="drag-area" id="area">
    <div class="draggable" id="box">גרור</div>
    <div class="hint">גררו את הקוביה בתוך האזור</div>
  </div>

  <script>
    const box = document.getElementById('box');
    const area = document.getElementById('area');
    let isDragging = false;
    let startX, startY, offsetX, offsetY;
    let velX = 0, velY = 0;
    let lastX, lastY, lastTime;
    let animId = null;
    const FRICTION = 0.92; /* momentum decay rate */
    const MIN_VEL = 0.5;   /* threshold to stop */

    box.addEventListener('pointerdown', (e) => {
      isDragging = true;
      box.classList.add('dragging');
      box.setPointerCapture(e.pointerId);
      const rect = box.getBoundingClientRect();
      const areaRect = area.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      lastX = e.clientX; lastY = e.clientY;
      lastTime = performance.now();
      velX = 0; velY = 0;
      if (animId) cancelAnimationFrame(animId);
    });

    document.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const aRect = area.getBoundingClientRect();
      let x = e.clientX - aRect.left - offsetX;
      let y = e.clientY - aRect.top - offsetY;

      /* clamp within boundaries */
      x = Math.max(0, Math.min(x, aRect.width - 80));
      y = Math.max(0, Math.min(y, aRect.height - 80));

      box.style.left = x + 'px';
      box.style.top = y + 'px';

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        velX = (e.clientX - lastX) / dt * 16;
        velY = (e.clientY - lastY) / dt * 16;
      }
      lastX = e.clientX; lastY = e.clientY;
      lastTime = now;
    });

    document.addEventListener('pointerup', () => {
      if (!isDragging) return;
      isDragging = false;
      box.classList.remove('dragging');
      applyMomentum();
    });

    function applyMomentum() {
      const aRect = area.getBoundingClientRect();
      const maxX = aRect.width - 80;
      const maxY = aRect.height - 80;

      function tick() {
        velX *= FRICTION;
        velY *= FRICTION;

        let x = parseFloat(box.style.left) + velX;
        let y = parseFloat(box.style.top) + velY;

        /* bounce off boundaries */
        if (x <= 0) { x = 0; velX = -velX * 0.5; }
        if (x >= maxX) { x = maxX; velX = -velX * 0.5; }
        if (y <= 0) { y = 0; velY = -velY * 0.5; }
        if (y >= maxY) { y = maxY; velY = -velY * 0.5; }

        box.style.left = x + 'px';
        box.style.top = y + 'px';

        if (Math.abs(velX) > MIN_VEL || Math.abs(velY) > MIN_VEL) {
          animId = requestAnimationFrame(tick);
        }
      }
      animId = requestAnimationFrame(tick);
    }
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אלמנט הגרירה עובד?</h4>
<p>אלמנט שניתן לגרור עם פיזיקת מומנטום — כשעוזבים אותו, הוא ממשיך לזוז בכיוון הגרירה ומקפיץ מהגבולות.</p>
<ul>
  <li><strong>Pointer Events:</strong> <code>pointerdown/move/up</code> תומכים גם בעכבר וגם במגע, עם <code>setPointerCapture</code> ללכידת האירועים.</li>
  <li><strong>חישוב מהירות:</strong> בכל תזוזה מחשבים את המהירות מההפרש בין המיקום הנוכחי לקודם חלקי הזמן שעבר.</li>
  <li><strong>מומנטום:</strong> אחרי שחרור, לולאת <code>requestAnimationFrame</code> ממשיכה להזיז את האלמנט בכיוון האחרון עם חיכוך (<code>FRICTION = 0.92</code>).</li>
  <li><strong>הקפצה מגבולות:</strong> כשהאלמנט פוגע בקצה, המהירות מתהפכת ומוכפלת ב-0.5 (מאבדת אנרגיה).</li>
  <li><strong>תנאי עצירה:</strong> האנימציה עוצרת כשהמהירות יורדת מתחת ל-<code>MIN_VEL</code>.</li>
</ul>
<p>הפיזיקה הפשוטה של מומנטום + חיכוך + הקפצה יוצרת תחושה טבעית ומהנה.</p>`,
    proTipHe: 'הוסיפו מספר אלמנטים ניתנים לגרירה עם בדיקת התנגשות ביניהם ליצירת חוויה אינטראקטיבית מורכבת.',
  },
];
