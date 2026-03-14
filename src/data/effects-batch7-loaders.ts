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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>בזמן שהתוכן האמיתי נטען, במקום מסך ריק מוצגים מלבנים ועיגולים אפורים שנראים כמו המבנה של הדף. גל אור רך עובר עליהם שוב ושוב כדי להראות שמשהו קורה. ככה המשתמש מרגיש שהדף כבר כמעט מוכן, במקום לבהות בספינר גנרי.</p>`,
    proTipHe: 'השתמשו ב-@media (prefers-reduced-motion) כדי לבטל את האנימציה למשתמשים שמעדיפים פחות תנועה.',
    promptHe: 'אני רוצה אנימציית טעינה בסגנון Skeleton Loader — מסך שלד עם מלבנים ועיגולים אפורים שגל אור (shimmer) עובר עליהם בזמן שהתוכן נטען. לפני שאתה כותב קוד, תשאל אותי: מה הצבעים שאני רוצה לשלד ולגל האור? באיזו מהירות הנצנוץ צריך לנוע? מה המבנה שצריך להציג (אווטאר + שורות טקסט, תמונה, כרטיס)? מה הגודל הכללי של הרכיב? האם צריך רקע כהה או בהיר? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כשהעמוד נטען, שתי שכבות צבעוניות מכסות את כל המסך ואז נמחקות הצידה אחת אחרי השנייה. אחרי שהשכבות נעלמות, התוכן שמתחת מופיע בהדרגה עם אנימציית כניסה חלקה. זה יוצר רושם ראשוני מרשים ומקצועי כשנכנסים לאתר.</p>`,
    proTipHe: 'אפשר לשנות את כיוון המחיקה ל-translateY לאפקט אנכי, או להשתמש ב-clip-path לחיתוך יצירתי.',
    promptHe: 'אני רוצה אפקט חשיפת עמוד (Page Reveal) — שכבות צבעוניות שמכסות את כל המסך ונמחקות הצידה כשהדף נטען, וחושפות את התוכן מתחת. לפני שאתה כותב קוד, תשאל אותי: אילו צבעים לשכבות הכיסוי? כמה שכבות אני רוצה? באיזה כיוון המחיקה (ימין, שמאל, למעלה, למטה)? מה המהירות של האנימציה? האם התוכן צריך להופיע עם אפקט נוסף אחרי החשיפה? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>צורה צבעונית משתנה ברציפות בין עיגול, ריבוע ומשולש תוך כדי סיבוב איטי. מסביב לצורה יש טבעת שפועמת ונעלמת, מה שנותן תחושה של עומק ותנועה. האפקט הזה עובד מצוין כאנימציית טעינה שמושכת את העין בלי להיות מעצבנת.</p>`,
    proTipHe: 'הוסיפו filter: hue-rotate() לאנימציה כדי שהצבעים ישתנו בהדרגה יחד עם הצורה.',
    promptHe: 'אני רוצה אנימציית טעינה בסגנון Morph Loader — צורה שמשתנה ברציפות בין עיגול, ריבוע ומשולש עם סיבוב חלק וטבעת פועמת ברקע. לפני שאתה כותב קוד, תשאל אותי: מה הצבעים של הצורה? באיזו מהירות השינוי בין הצורות? מה הגודל של האלמנט? האם להוסיף טקסט מתחת (כמו "טוען...")? האם צריך טבעת פועמת ברקע או בלי? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>שלוש נקודות עגולות קופצות למעלה ולמטה אחת אחרי השנייה, כמו גל. כשנקודה בשיא הקפיצה היא גדלה קצת ונהיית יותר בולטת, וכשהיא למטה היא שקופה יותר. התוצאה היא אנימציית טעינה קלאסית שכולם מכירים, שנותנת תחושה שמשהו קורה ברקע.</p>`,
    proTipHe: 'החליפו את הנקודות בריבועים או לבבות כדי להתאים את האנימציה לסגנון האתר שלכם.',
    promptHe: 'אני רוצה אנימציית טעינה בסגנון Dots Loader — שלוש נקודות שקופצות למעלה ולמטה בזו אחר זו כמו גל. לפני שאתה כותב קוד, תשאל אותי: מה צבע הנקודות? כמה נקודות אני רוצה? מה הגודל של כל נקודה? באיזו מהירות הקפיצה? האם להוסיף טקסט כמו "טוען..." מתחת? האם הרקע כהה או בהיר? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>סרגל כהה מתמלא בהדרגה בצבע גרדיאנט מירוק לכחול, עם נצנוץ שנע על פני המילוי. מתחת לסרגל יש זוהר מטושטש שנותן אפקט ניאוני, והטקסט למטה פועם בסנכרון עם ההתקדמות. זה סרגל התקדמות קלאסי אבל עם נראות מודרנית ומושכת.</p>`,
    proTipHe: 'חברו את הסרגל ל-JavaScript אמיתי עם fetch progress events כדי להציג התקדמות אמיתית בהורדות.',
    promptHe: 'אני רוצה סרגל התקדמות מונפש (Progress Bar) עם מילוי גרדיאנט, אפקט נצנוץ שנע על פני הסרגל, וזוהר ניאוני מתחת. לפני שאתה כותב קוד, תשאל אותי: מה הצבעים של הגרדיאנט? מה הרוחב והגובה של הסרגל? באיזו מהירות המילוי? האם להציג אחוזים או טקסט מותאם אישית? האם צריך זוהר מתחת לסרגל? מה צבע הרקע? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כרטיסים עם מספרים מציגים ספירה לאחור, וכל פעם שמספר משתנה הוא מתהפך בתלת-ממד כמו שעון מכני ישן. הנקודותיים באמצע מהבהבות כל שנייה כדי לתת תחושה של שעון אמיתי. האפקט מושלם לדפי השקה או כל מקום שצריכים ספירה לאחור מרשימה.</p>`,
    proTipHe: 'הוסיפו קו אופקי באמצע כל כרטיס עם pseudo-element כדי לדמות שעון flip מכני קלאסי.',
    promptHe: 'אני רוצה טיימר ספירה לאחור (Countdown Timer) עם אנימציית היפוך תלת-ממדית בין המספרים, כמו שעון flip מכני. לפני שאתה כותב קוד, תשאל אותי: מאיזה זמן להתחיל את הספירה? מה הצבעים של הכרטיסים והמספרים? מה הגודל של הכרטיסים? האם להציג שעות, דקות ושניות או רק חלק מהם? מה קורה כשהספירה מגיעה לאפס? האם צריך טקסט מתחת לכל כרטיס? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>שלושה חלונות קטנים מציגים ספרות שמתגלגלות למעלה כמו מכונת מזל. כל כמה שניות נבחרים מספרים חדשים והספרות מתגלגלות אליהם בתנועה חלקה. בקצוות החלונות יש הצללה שגורמת לספרות להיעלם בהדרגה, מה שנותן תחושה של עומק ותלת-ממד.</p>`,
    proTipHe: 'הוסיפו animation-delay שונה לכל slot כדי שהספרות ייעצרו אחת אחרי השנייה כמו מכונת מזל אמיתית.',
    promptHe: 'אני רוצה תצוגת מספרים בסגנון Number Ticket — ספרות שמתגלגלות למעלה כמו מכונת מזל (slot machine). לפני שאתה כותב קוד, תשאל אותי: כמה ספרות להציג? מה צבע הספרות והרקע? מה הגודל של כל חריץ? באיזו מהירות הגלגול? האם המספרים צריכים להיות אקראיים או לספור למספר מסוים? האם להוסיף כותרת או תווית מתחת? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>עיגול מתמלא בנוזל צבעוני שעולה מלמטה למעלה, עם גלים שזזים על פני השטח כמו מים אמיתיים. באמצע העיגול מוצג אחוז ההתקדמות שמתעדכן בזמן אמת. האפקט נראה מרשים ויצירתי, ומתאים למסכי טעינה שרוצים לבלוט מעל הרגיל.</p>`,
    proTipHe: 'החליפו את העיגול בכל צורת SVG עם clip-path — לדוגמה לוגו של החברה שמתמלא בנוזל.',
    promptHe: 'אני רוצה אנימציית טעינה בסגנון Liquid Loader — עיגול שמתמלא בנוזל צבעוני עם גלים מונפשים על פני השטח ותצוגת אחוזים באמצע. לפני שאתה כותב קוד, תשאל אותי: מה הצבעים של הנוזל? מה הגודל של העיגול? באיזו מהירות הנוזל עולה? האם להציג אחוזים או טקסט אחר באמצע? כמה גלים על פני השטח? האם הצורה צריכה להיות עיגול או צורה אחרת? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
  },
];
