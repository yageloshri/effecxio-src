import type { Effect } from '@/types';

export const effectsBatch7Loaders: Effect[] = [
  {
    id: 'skeletonloader',
    title: 'Skeleton Loader',
    titleHe: 'שלד טעינה',
    description: 'Skeleton screen with animated shimmer pulse that mimics content placeholders.',
    descriptionHe: 'מסך שלד עם אנימציית נצנוץ פועם שמדמה מקומות שמורים לתוכן.',
    categories: ['loader'],
    tags: [
      { label: 'skeleton' },
      { label: 'loading' },
      { label: 'shimmer' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'skeletonloader',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Skeleton Loader — shimmer pulse placeholder while content loads -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
  }
  .skeleton-card {
    width: 340px;
    padding: 24px;
    background: #111;
    border-radius: 16px;
    display: flex; flex-direction: column; gap: 16px;
  }
  .skeleton-row {
    display: flex; gap: 12px; align-items: center;
  }
  .skeleton {
    background: linear-gradient(
      90deg,
      #1a1a1a 25%,   /* base color */
      #2a2a2a 50%,   /* shimmer highlight */
      #1a1a1a 75%    /* back to base */
    );
    background-size: 400% 100%; /* 4x width for travel distance */
    animation: shimmer 1.8s ease-in-out infinite;
    border-radius: 8px;
  }
  .skeleton-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .skeleton-line { height: 12px; }
  .skeleton-line-short { width: 60%; }
  .skeleton-line-medium { width: 80%; }
  .skeleton-line-full { width: 100%; }
  .skeleton-image {
    width: 100%; height: 120px;
    border-radius: 12px;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
</style>
</head>
<body>
<div class="skeleton-card">
  <div class="skeleton-row">
    <div class="skeleton skeleton-avatar"></div>
    <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
      <div class="skeleton skeleton-line skeleton-line-medium"></div>
      <div class="skeleton skeleton-line skeleton-line-short"></div>
    </div>
  </div>
  <div class="skeleton skeleton-image"></div>
  <div class="skeleton skeleton-line skeleton-line-full"></div>
  <div class="skeleton skeleton-line skeleton-line-medium"></div>
  <div class="skeleton skeleton-line skeleton-line-short"></div>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>שלד טעינה (Skeleton Screen) מציג מקומות שמורים מונפשים במקום תוכן אמיתי בזמן שהדף נטען, וכך משפר את חווית המשתמש.</p>
<ul>
  <li>כל אלמנט שלד מקבל <code>background</code> עם <code>linear-gradient</code> של שלושה עצירות — צבע בסיס, הבהרה, וחזרה לבסיס.</li>
  <li><code>background-size: 400% 100%</code> מרחיב את הגרדיאנט פי 4 מרוחב האלמנט כדי שהנצנוץ ינוע לרוחב מלא.</li>
  <li>אנימציית <code>shimmer</code> מזיזה את <code>background-position</code> מ-200% ל--200% וחוזר, מה שיוצר אפקט גל אור נודד.</li>
  <li>שימוש ב-<code>border-radius</code> שונה לכל סוג אלמנט — עיגול לאווטאר, מלבן מעוגל לתמונה, ופס דק לטקסט.</li>
  <li><code>ease-in-out</code> על האנימציה יוצר תחושה אורגנית ולא מכנית.</li>
  <li>היתרון על spinner רגיל: המשתמש רואה את המבנה הצפוי של הדף ומרגיש שהטעינה מהירה יותר.</li>
</ul>`,
    proTipHe: 'השתמשו ב-@media (prefers-reduced-motion) כדי לבטל את האנימציה למשתמשים שמעדיפים פחות תנועה.',
  },

  {
    id: 'pagereveal',
    title: 'Page Reveal',
    titleHe: 'חשיפת עמוד',
    description: 'Full-page overlay that wipes away on load to reveal the content beneath.',
    descriptionHe: 'שכבת כיסוי על כל העמוד שנמחקת בטעינה כדי לחשוף את התוכן מתחת.',
    categories: ['loader'],
    tags: [
      { label: 'transition' },
      { label: 'page-load' },
      { label: 'reveal' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'pagereveal',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Page Reveal — full-screen overlay wipes away on load -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    overflow: hidden;
  }
  .page-content {
    text-align: center; color: #f0f0f0;
    opacity: 0;
    animation: content-fadein 1s ease 1.2s forwards;
  }
  .page-content h1 {
    font-size: 3rem; margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .page-content p { color: #888; font-size: 1.2rem; }
  /* Overlay that wipes horizontally */
  .page-overlay {
    position: fixed; inset: 0;
    background: #c8f53b;
    z-index: 100;
    animation: wipe-out 1.2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
  }
  /* Secondary overlay for layered feel */
  .page-overlay-2 {
    position: fixed; inset: 0;
    background: #44aaff;
    z-index: 99;
    animation: wipe-out 1.2s cubic-bezier(0.77, 0, 0.18, 1) 0.15s forwards;
  }
  @keyframes wipe-out {
    0%   { transform: translateX(0); }
    100% { transform: translateX(101%); }
  }
  @keyframes content-fadein {
    0%   { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
</style>
</head>
<body>
<div class="page-overlay"></div>
<div class="page-overlay-2"></div>
<div class="page-content">
  <h1>ברוכים הבאים</h1>
  <p>העמוד נחשף עם אנימציית מעבר חלקה</p>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>אפקט חשיפת עמוד יוצר רושם ראשוני מרשים על ידי שכבת כיסוי צבעונית שנמחקת בטעינת הדף.</p>
<ul>
  <li>שני אלמנטי <code>div</code> עם <code>position: fixed</code> ו-<code>inset: 0</code> מכסים את כל המסך בצבעים שונים.</li>
  <li>אנימציית <code>wipe-out</code> מזיזה כל שכבה עם <code>translateX(101%)</code> — כלומר זזה החוצה מימין לשמאל.</li>
  <li><code>cubic-bezier(0.77, 0, 0.18, 1)</code> יוצר easing חלק שמתחיל מהר ומאט בסוף כמו דלת שנסגרת.</li>
  <li>השכבה השנייה מקבלת <code>animation-delay: 0.15s</code> כדי ליצור אפקט שכבות מדורג ויוקרתי.</li>
  <li>התוכן מתחת מתחיל עם <code>opacity: 0</code> ומופיע עם <code>content-fadein</code> אחרי שהשכבות נעלמו.</li>
  <li>שימוש ב-<code>z-index</code> שונה (99, 100) מבטיח שהשכבות יהיו בסדר הנכון.</li>
</ul>`,
    proTipHe: 'אפשר לשנות את כיוון המחיקה ל-translateY לאפקט אנכי, או להשתמש ב-clip-path לחיתוך יצירתי.',
  },

  {
    id: 'morphloader',
    title: 'Morph Loader',
    titleHe: 'טעינה מורפת',
    description: 'Loading shape morphs between circle, square, and triangle continuously.',
    descriptionHe: 'צורת טעינה שמשתנה ברציפות בין עיגול, ריבוע ומשולש.',
    categories: ['loader'],
    tags: [
      { label: 'morph' },
      { label: 'shape' },
      { label: 'animation' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'morphloader',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Morph Loader — shape morphs between circle, square, triangle -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    flex-direction: column; gap: 24px;
  }
  .morph-shape {
    width: 80px; height: 80px;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
    animation: morph 6s ease-in-out infinite;
    will-change: border-radius, transform, clip-path;
  }
  .morph-ring {
    width: 96px; height: 96px;
    position: absolute;
    border-radius: 50%;
    border: 2px solid #c8f53b;
    opacity: 0.25;
    animation: morph-pulse 2s ease-in-out infinite;
  }
  .morph-label {
    color: #555; font-size: 0.9rem;
    letter-spacing: 2px; text-transform: uppercase;
  }
  @keyframes morph {
    0%, 100% {
      border-radius: 50%;          /* circle */
      transform: rotate(0deg);
      clip-path: none;
    }
    33% {
      border-radius: 12px;         /* rounded square */
      transform: rotate(90deg);
      clip-path: none;
    }
    66% {
      border-radius: 0;
      transform: rotate(180deg);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%); /* triangle */
    }
  }
  @keyframes morph-pulse {
    0%, 100% { transform: scale(1); opacity: 0.25; }
    50% { transform: scale(1.5); opacity: 0; }
  }
</style>
</head>
<body>
<div style="position:relative; display:flex; align-items:center; justify-content:center;">
  <div class="morph-ring"></div>
  <div class="morph-shape"></div>
</div>
<p class="morph-label">טוען...</p>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>טעינה מורפת יוצרת אנימציה היפנוטית של צורה שמשתנה בין עיגול, ריבוע ומשולש — אידיאלית למסכי טעינה.</p>
<ul>
  <li>השינוי בין עיגול לריבוע נעשה עם <code>border-radius</code> — מ-50% (עיגול) ל-12px (ריבוע מעוגל).</li>
  <li>המעבר למשולש משתמש ב-<code>clip-path: polygon(50% 0%, 0% 100%, 100% 100%)</code> שחותך את הצורה לשלוש נקודות.</li>
  <li><code>transform: rotate()</code> מוסיף סיבוב הדרגתי שנותן לאנימציה תחושה אורגנית.</li>
  <li>גרדיאנט <code>linear-gradient</code> על הרקע משתנה ויזואלית בזכות הסיבוב, כי הזווית משתנה.</li>
  <li>טבעת פועמת (<code>morph-ring</code>) ברקע מוסיפה עומק ומרחב עם <code>scale</code> ו-<code>opacity</code> משתנים.</li>
  <li><code>will-change</code> רומז לדפדפן לייעל את הרינדור של המאפיינים שישתנו.</li>
</ul>`,
    proTipHe: 'הוסיפו filter: hue-rotate() לאנימציה כדי שהצבעים ישתנו בהדרגה יחד עם הצורה.',
  },

  {
    id: 'dotsloader',
    title: 'Dots Loader',
    titleHe: 'טעינת נקודות',
    description: 'Three dots that bounce up and down in a smooth sequential pattern.',
    descriptionHe: 'שלוש נקודות שקופצות למעלה ולמטה בדפוס רציף וחלק.',
    categories: ['loader'],
    tags: [
      { label: 'dots' },
      { label: 'bounce' },
      { label: 'loading' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'dotsloader',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Dots Loader — three dots bounce in sequence -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    flex-direction: column; gap: 24px;
  }
  .dots-container {
    display: flex;
    gap: 14px; /* space between dots */
    align-items: center;
  }
  .dot {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: #c8f53b;
    animation: dot-bounce 1.4s ease-in-out infinite;
  }
  .dot:nth-child(1) { animation-delay: 0s; }
  .dot:nth-child(2) { animation-delay: 0.16s; }   /* 160ms stagger */
  .dot:nth-child(3) { animation-delay: 0.32s; }   /* 320ms stagger */
  .dots-label {
    color: #555; font-size: 0.9rem;
    letter-spacing: 2px; text-transform: uppercase;
  }
  @keyframes dot-bounce {
    0%, 80%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.4;
    }
    40% {
      transform: translateY(-24px) scale(1.15); /* bounce height */
      opacity: 1;
    }
  }
</style>
</head>
<body>
<div class="dots-container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
<p class="dots-label">טוען...</p>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>טעינת נקודות היא אחד מאפקטי הטעינה הפופולריים ביותר — שלוש נקודות שקופצות ברצף יוצרות תחושה של תהליך פעיל.</p>
<ul>
  <li>שלוש נקודות עם <code>border-radius: 50%</code> מסודרות ב-<code>flexbox</code> עם <code>gap: 14px</code>.</li>
  <li>אנימציית <code>dot-bounce</code> משנה <code>translateY</code> ו-<code>scale</code> כדי ליצור קפיצה עם הגדלה קלה.</li>
  <li><code>animation-delay</code> שונה לכל נקודה (0, 160ms, 320ms) יוצר אפקט גל — כל נקודה קופצת מעט אחרי הקודמת.</li>
  <li>שינוי ה-<code>opacity</code> מ-0.4 ל-1 בשיא הקפיצה מוסיף עומק ודגש ויזואלי.</li>
  <li>ה-keyframes מכסים 0-40% לעלייה ו-40-80% לירידה, כשב-80-100% הנקודה נחה — מה שיוצר קצב טבעי.</li>
  <li><code>ease-in-out</code> מעניק לתנועה תחושה פיזית כמו כדור שקופץ באמת.</li>
</ul>`,
    proTipHe: 'החליפו את הנקודות בריבועים או לבבות כדי להתאים את האנימציה לסגנון האתר שלכם.',
  },

  {
    id: 'progressbar',
    title: 'Progress Bar',
    titleHe: 'סרגל התקדמות',
    description: 'Animated progress bar with a gradient fill and a shimmer pulse effect.',
    descriptionHe: 'סרגל התקדמות מונפש עם מילוי גרדיאנט ואפקט נצנוץ פועם.',
    categories: ['loader'],
    tags: [
      { label: 'progress' },
      { label: 'bar' },
      { label: 'gradient' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'progressbar',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Progress Bar — animated fill with gradient and shimmer -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    flex-direction: column; gap: 16px;
  }
  .progress-track {
    width: 320px; height: 14px;
    background: #1a1a1a;
    border-radius: 7px;
    overflow: hidden;
    position: relative;
  }
  .progress-fill {
    height: 100%;
    border-radius: 7px;
    background: linear-gradient(90deg, #c8f53b, #44aaff);
    background-size: 400% 100%;
    animation:
      progress-grow 2.5s ease-in-out infinite,
      progress-shimmer 1.5s linear infinite;
  }
  .progress-label {
    color: #555; font-size: 0.85rem;
    letter-spacing: 1px;
    animation: label-pulse 2.5s ease-in-out infinite;
  }
  /* Glow under the bar */
  .progress-glow {
    width: 320px; height: 14px;
    border-radius: 7px;
    position: absolute;
    filter: blur(12px);    /* glow radius */
    opacity: 0.3;
    background: linear-gradient(90deg, #c8f53b, #44aaff);
    animation: progress-grow 2.5s ease-in-out infinite;
  }
  @keyframes progress-grow {
    0%   { width: 0%; }
    80%  { width: 100%; }
    100% { width: 100%; }
  }
  @keyframes progress-shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes label-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
</style>
</head>
<body>
<div style="position:relative;">
  <div class="progress-glow"></div>
  <div class="progress-track">
    <div class="progress-fill"></div>
  </div>
</div>
<p class="progress-label">Loading...</p>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>סרגל התקדמות מונפש משלב מילוי הדרגתי עם גרדיאנט ונצנוץ כדי ליצור תחושה דינמית של טעינה.</p>
<ul>
  <li>המסילה (<code>progress-track</code>) היא מלבן כהה עם <code>overflow: hidden</code> ו-<code>border-radius</code> מעוגל.</li>
  <li>המילוי (<code>progress-fill</code>) משתמש בגרדיאנט ליניארי בין שני צבעים — ירוק לכחול.</li>
  <li>אנימציית <code>progress-grow</code> מגדילה את ה-<code>width</code> מ-0% ל-100% ב-2.5 שניות עם easing חלק.</li>
  <li>בנוסף, <code>progress-shimmer</code> מזיזה את ה-<code>background-position</code> כדי ליצור אפקט נצנוץ שנע על פני הסרגל.</li>
  <li>שכבת זוהר (<code>progress-glow</code>) עם <code>filter: blur(12px)</code> מתחת לסרגל מוסיפה אפקט ניאוני.</li>
  <li>הטקסט פועם עם <code>opacity</code> משתנה בסנכרון עם מילוי הסרגל.</li>
</ul>`,
    proTipHe: 'חברו את הסרגל ל-JavaScript אמיתי עם fetch progress events כדי להציג התקדמות אמיתית בהורדות.',
  },

  {
    id: 'countdowntimer',
    title: 'Countdown Timer',
    titleHe: 'ספירה לאחור',
    description: 'Animated countdown timer with a 3D flip animation between numbers.',
    descriptionHe: 'טיימר ספירה לאחור מונפש עם אנימציית היפוך תלת-ממדית בין מספרים.',
    categories: ['loader'],
    tags: [
      { label: 'countdown' },
      { label: 'flip' },
      { label: 'timer' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'countdowntimer',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Countdown Timer — flip animation between digits -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    gap: 12px;
  }
  .flip-card {
    width: 80px; height: 100px;
    perspective: 400px;     /* 3D depth */
    position: relative;
  }
  .flip-face {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: #111;
    border: 1px solid #222;
    border-radius: 12px;
    font-size: 48px;
    font-weight: 800;
    color: #c8f53b;
    font-variant-numeric: tabular-nums;
    backface-visibility: hidden;
  }
  .flip-face.active {
    animation: flip-out 0.3s ease-in forwards;
    transform-origin: bottom center;
  }
  .flip-face.next {
    animation: flip-in 0.3s ease-out 0.3s forwards;
    transform-origin: top center;
    opacity: 0;
    position: absolute; top: 0; left: 0;
  }
  /* Separator colon */
  .flip-colon {
    font-size: 48px; font-weight: 800;
    color: #333;
    animation: colon-blink 1s step-end infinite;
  }
  .flip-label {
    position: absolute; bottom: -24px; left: 0; width: 100%;
    text-align: center; font-size: 0.7rem;
    color: #555; text-transform: uppercase; letter-spacing: 2px;
  }
  @keyframes flip-out {
    0%   { transform: rotateX(0deg); opacity: 1; }
    100% { transform: rotateX(-90deg); opacity: 0; }
  }
  @keyframes flip-in {
    0%   { transform: rotateX(90deg); opacity: 0; }
    100% { transform: rotateX(0deg); opacity: 1; }
  }
  @keyframes colon-blink {
    50% { opacity: 0; }
  }
</style>
</head>
<body>
<div class="flip-card">
  <div class="flip-face" id="min">05</div>
  <span class="flip-label">דקות</span>
</div>
<span class="flip-colon">:</span>
<div class="flip-card">
  <div class="flip-face" id="sec">00</div>
  <span class="flip-label">שניות</span>
</div>
<script>
  let total = 300; /* 5 minutes in seconds */
  const minEl = document.getElementById('min');
  const secEl = document.getElementById('sec');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    if (total <= 0) { total = 300; } /* loop back */
    total--;
    const m = Math.floor(total / 60);
    const s = total % 60;
    /* Trigger flip animation by cloning */
    [minEl, secEl].forEach((el, i) => {
      const val = i === 0 ? pad(m) : pad(s);
      if (el.textContent !== val) {
        el.classList.add('active');
        const next = el.cloneNode(true);
        next.classList.remove('active');
        next.classList.add('next');
        next.textContent = val;
        el.parentElement.appendChild(next);
        setTimeout(() => {
          el.textContent = val;
          el.classList.remove('active');
          next.remove();
        }, 600);
      }
    });
  }

  setInterval(tick, 1000);
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>ספירה לאחור עם אנימציית flip תלת-ממדית שמדמה לוח מספרים מכני — מושלם לדפי Landing או השקות.</p>
<ul>
  <li><code>perspective: 400px</code> על הכרטיס יוצר את מרחב ה-3D שמאפשר לאנימציית ה-flip להיראות ריאלית.</li>
  <li>אנימציית <code>flip-out</code> מסובבת את המספר הנוכחי 90 מעלות סביב הציר התחתון עם <code>rotateX(-90deg)</code>.</li>
  <li>אנימציית <code>flip-in</code> מכניסה את המספר החדש מלמעלה עם <code>delay</code> של 300ms — כך שהמספר הישן יוצא לפני שהחדש נכנס.</li>
  <li><code>backface-visibility: hidden</code> מוודא שלא רואים את הצד האחורי של הכרטיס במהלך הסיבוב.</li>
  <li>הנקודותיים מהבהבות עם <code>step-end</code> כל שנייה — מה שנותן תחושה של שעון אמיתי.</li>
  <li>ב-JavaScript, כל שנייה נבדק אם הערך השתנה ורק אז מפעילים את אנימציית ה-flip.</li>
</ul>`,
    proTipHe: 'הוסיפו קו אופקי באמצע כל כרטיס עם pseudo-element כדי לדמות שעון flip מכני קלאסי.',
  },

  {
    id: 'numberticket',
    title: 'Number Ticket',
    titleHe: 'כרטיס מספר',
    description: 'Number display that rolls digits up like a slot machine.',
    descriptionHe: 'תצוגת מספרים שמגלגלת ספרות למעלה כמו מכונת מזל.',
    categories: ['loader'],
    tags: [
      { label: 'slot' },
      { label: 'numbers' },
      { label: 'roll' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'numberticket',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Number Ticket — digits roll like a slot machine -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    flex-direction: column; gap: 24px;
  }
  .ticket {
    display: flex; gap: 8px;
    background: #111;
    padding: 16px 24px;
    border-radius: 16px;
    border: 1px solid #222;
  }
  .slot {
    width: 52px; height: 72px;
    overflow: hidden;
    background: #0a0a0a;
    border-radius: 8px;
    position: relative;
  }
  /* Gradient mask for depth */
  .slot::before, .slot::after {
    content: ''; position: absolute;
    left: 0; right: 0; height: 20px;
    z-index: 2; pointer-events: none;
  }
  .slot::before { top: 0; background: linear-gradient(#0a0a0a, transparent); }
  .slot::after  { bottom: 0; background: linear-gradient(transparent, #0a0a0a); }
  .slot-strip {
    display: flex; flex-direction: column;
    align-items: center;
    transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  }
  .slot-num {
    height: 72px; /* must match .slot height */
    display: flex; align-items: center; justify-content: center;
    font-size: 40px; font-weight: 800;
    color: #c8f53b;
    font-variant-numeric: tabular-nums;
  }
  .ticket-label {
    color: #555; font-size: 0.85rem;
    letter-spacing: 3px; text-transform: uppercase;
  }
</style>
</head>
<body>
<div class="ticket" id="ticket">
  <div class="slot"><div class="slot-strip" id="s0"></div></div>
  <div class="slot"><div class="slot-strip" id="s1"></div></div>
  <div class="slot"><div class="slot-strip" id="s2"></div></div>
</div>
<p class="ticket-label">כרטיס מספר</p>
<script>
  const strips = [
    document.getElementById('s0'),
    document.getElementById('s1'),
    document.getElementById('s2'),
  ];
  /* Build digit strips 0-9 for each slot */
  strips.forEach((strip) => {
    for (let d = 0; d <= 9; d++) {
      const el = document.createElement('div');
      el.className = 'slot-num';
      el.textContent = d;
      strip.appendChild(el);
    }
  });

  function rollTo(targets) {
    strips.forEach((strip, i) => {
      const offset = targets[i] * -72; /* 72px per digit */
      strip.style.transform = 'translateY(' + offset + 'px)';
    });
  }

  function randomRoll() {
    const targets = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    rollTo(targets);
  }

  randomRoll();
  setInterval(randomRoll, 2000); /* roll every 2s */
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>כרטיס מספר מדמה מכונת מזל (slot machine) עם גלגול ספרות חלק — מתאים לתצוגת סטטיסטיקות או טיקרים.</p>
<ul>
  <li>כל חריץ (<code>slot</code>) הוא מלבן עם <code>overflow: hidden</code> שמסתיר את הספרות שמחוצה לו.</li>
  <li>בפנים, רצועת ספרות (<code>slot-strip</code>) מכילה 10 ספרות (0-9) מסודרות אנכית.</li>
  <li>גלגול הספרה נעשה על ידי שינוי <code>translateY</code> של הרצועה — כל ספרה גבוהה 72px אז offset = target * -72.</li>
  <li><code>transition</code> עם <code>cubic-bezier(0.33, 1, 0.68, 1)</code> יוצר תנועה שמתחילה מהר ומאטה בסוף כמו גלגל פיזי.</li>
  <li>פסודו-אלמנטים <code>::before</code> ו-<code>::after</code> עם גרדיאנטים יוצרים מסיכת עומק — הספרות בקצוות נעלמות בהדרגה.</li>
  <li>כל 2 שניות נבחרים 3 מספרים אקראיים חדשים ומפעילים את הגלגול מחדש.</li>
</ul>`,
    proTipHe: 'הוסיפו animation-delay שונה לכל slot כדי שהספרות ייעצרו אחת אחרי השנייה כמו מכונת מזל אמיתית.',
  },

  {
    id: 'liquidloader',
    title: 'Liquid Loader',
    titleHe: 'טעינה נוזלית',
    description: 'Liquid fill progress inside a circle with animated wave surface.',
    descriptionHe: 'מילוי נוזלי מתקדם בתוך עיגול עם משטח גל מונפש.',
    categories: ['loader'],
    tags: [
      { label: 'liquid' },
      { label: 'wave' },
      { label: 'fill' },
      { label: 'svg' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'liquidloader',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Liquid Loader — liquid fill with wave inside a circle -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    flex-direction: column; gap: 20px;
  }
  .liquid-container {
    width: 140px; height: 140px;
    border-radius: 50%;
    border: 3px solid #222;
    position: relative;
    overflow: hidden;
  }
  .liquid-fill {
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(to top, #c8f53b, #44aaff);
    animation: liquid-rise 4s ease-in-out infinite;
    opacity: 0.85;
  }
  /* Wave on top of liquid */
  .liquid-wave {
    position: absolute;
    top: -8px;        /* wave crests peek above liquid level */
    left: -50%;
    width: 200%;
    height: 16px;
    border-radius: 40%;
    background: rgba(200, 245, 59, 0.6);
    animation: wave-move 2s linear infinite;
  }
  .liquid-wave:nth-child(2) {
    top: -4px;
    animation-duration: 3s;
    animation-direction: reverse;
    opacity: 0.4;
    background: rgba(68, 170, 255, 0.5);
  }
  .liquid-label {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    z-index: 2;
    font-size: 1.6rem; font-weight: 800;
    color: #f0f0f0;
    mix-blend-mode: difference;
  }
  .liquid-caption {
    color: #555; font-size: 0.85rem;
    letter-spacing: 2px; text-transform: uppercase;
  }
  @keyframes liquid-rise {
    0%, 100% { transform: translateY(100%); }
    50%, 80% { transform: translateY(0%); }
  }
  @keyframes wave-move {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
</style>
</head>
<body>
<div class="liquid-container">
  <div class="liquid-fill">
    <div class="liquid-wave"></div>
    <div class="liquid-wave"></div>
  </div>
  <div class="liquid-label" id="pct">0%</div>
</div>
<p class="liquid-caption">טוען...</p>
<script>
  const label = document.getElementById('pct');
  let pct = 0;
  let dir = 1;
  setInterval(() => {
    pct += dir * 2;          /* increment 2% each tick */
    if (pct >= 100) dir = -1;
    if (pct <= 0) dir = 1;
    label.textContent = pct + '%';
  }, 80);                     /* ~50 ticks for 0→100 */
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>טעינה נוזלית יוצרת אפקט מרהיב של נוזל שעולה בתוך עיגול עם גלים מונפשים — אידיאלי למסכי טעינה ייחודיים.</p>
<ul>
  <li>המכולה העגולה (<code>liquid-container</code>) מוגדרת עם <code>border-radius: 50%</code> ו-<code>overflow: hidden</code> כדי לחתוך את הנוזל לצורת עיגול.</li>
  <li>המילוי (<code>liquid-fill</code>) הוא שכבה בגובה 100% שנעה מלמטה למעלה עם <code>translateY(100%)</code> ל-<code>translateY(0%)</code>.</li>
  <li>שני גלים (<code>liquid-wave</code>) ממוקמים מעל הנוזל עם <code>border-radius: 40%</code> שיוצר צורה גלית.</li>
  <li>כל גל נע לצדדים עם <code>translateX</code> במהירות שונה ובכיוון הפוך — מה שיוצר תנועה אורגנית של מים.</li>
  <li>הגל השני עם <code>opacity</code> נמוך ו-<code>animation-direction: reverse</code> מוסיף שכבה שנייה של תנועה.</li>
  <li>הטקסט באמצע משתמש ב-<code>mix-blend-mode: difference</code> כדי שיהיה קריא גם מעל הנוזל הצבעוני וגם מעל הרקע הכהה.</li>
</ul>`,
    proTipHe: 'החליפו את העיגול בכל צורת SVG עם clip-path — לדוגמה לוגו של החברה שמתמלא בנוזל.',
  },
];
