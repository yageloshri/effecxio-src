import type { Effect } from '@/types';

export const effectsPart2: Effect[] = [
  {
    id: 'trail',
    title: 'Mouse Trail',
    titleHe: 'שובל עכבר',
    description: 'Creates a smooth trail of fading circles that follow the mouse cursor.',
    descriptionHe: 'יוצר שובל חלק של עיגולים דועכים שעוקבים אחרי סמן העכבר.',
    categories: ['cursor'],
    tags: [
      { label: 'cursor' },
      { label: 'animation' },
      { label: 'mousemove' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'trail',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    overflow: hidden;
    cursor: none;
  }
  .trail-dot {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, #a78bfa, #7c3aed);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .hint {
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: #555; font-family: sans-serif; font-size: 1.2rem;
  }
</style>
</head>
<body>
<p class="hint">הזיזו את העכבר</p>
<script>
  const dots = [];
  const MAX = 20;

  document.addEventListener('mousemove', (e) => {
    createDot(e.clientX, e.clientY);
  });

  function createDot(x, y) {
    const dot = document.createElement('div');
    dot.classList.add('trail-dot');
    const size = 18;
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left = (x - size / 2) + 'px';
    dot.style.top = (y - size / 2) + 'px';
    dot.style.opacity = '1';
    document.body.appendChild(dot);
    dots.push(dot);

    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = 'scale(0.2)';
    });

    setTimeout(() => {
      dot.remove();
      dots.shift();
    }, 600);

    if (dots.length > MAX) {
      const old = dots.shift();
      old.remove();
    }
  }
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>אפקט שובל העכבר יוצר תחושה קסומה של תנועה על ידי יצירת אלמנטים שנעלמים בהדרגה בעקבות הסמן.</p>
<ul>
  <li>מאזינים לאירוע <code>mousemove</code> על כל הדף כדי לעקוב אחרי מיקום העכבר.</li>
  <li>בכל תזוזה, יוצרים אלמנט <code>div</code> עגול עם <code>border-radius: 50%</code> במיקום הנוכחי של הסמן.</li>
  <li>מיד לאחר היצירה, משנים את ה-<code>opacity</code> ל-0 וה-<code>transform</code> ל-<code>scale(0.2)</code> כדי ליצור אנימציית דעיכה חלקה.</li>
  <li>ה-CSS <code>transition</code> דואג שהשינויים יהיו חלקים ולא קופצניים.</li>
  <li>אחרי 600 מילישניות, האלמנט מוסר מה-DOM לחלוטין כדי לשמור על ביצועים טובים.</li>
  <li>שומרים מערך של נקודות ומגבילים ל-20 בו-זמנית כדי למנוע עומס על הדפדפן.</li>
</ul>`,
    proTipHe: 'אפשר להוסיף צבעים משתנים לכל נקודה באמצעות hsl עם ערך hue שמשתנה לפי הזמן.',
  },

  {
    id: 'glass',
    title: 'Glass Cards',
    titleHe: 'כרטיסי זכוכית',
    description: 'Semi-transparent cards with a frosted glass effect using backdrop-filter.',
    descriptionHe: 'כרטיסים שקופים למחצה עם אפקט זכוכית חלבית באמצעות backdrop-filter.',
    categories: ['card', 'background'],
    tags: [
      { label: 'glassmorphism' },
      { label: 'CSS' },
      { label: 'backdrop-filter' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'glass',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: sans-serif;
  }
  .bg-shapes {
    position: fixed; inset: 0; z-index: 0; overflow: hidden;
  }
  .bg-shapes span {
    position: absolute; border-radius: 50%;
  }
  .bg-shapes span:nth-child(1) {
    width: 300px; height: 300px; background: #ff6b6b; top: -50px; left: 10%;
  }
  .bg-shapes span:nth-child(2) {
    width: 200px; height: 200px; background: #feca57; bottom: 10%; right: 15%;
  }
  .bg-shapes span:nth-child(3) {
    width: 250px; height: 250px; background: #48dbfb; top: 40%; left: 50%;
  }
  .glass-card {
    position: relative; z-index: 1;
    width: 260px; padding: 2rem;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #fff;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .glass-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
  .glass-card h3 { font-size: 1.3rem; margin-bottom: 0.8rem; }
  .glass-card p { font-size: 0.95rem; opacity: 0.9; line-height: 1.5; }
  .glass-icon { font-size: 2.5rem; margin-bottom: 0.8rem; }
</style>
</head>
<body>
<div class="bg-shapes"><span></span><span></span><span></span></div>
<div class="glass-card">
  <div class="glass-icon">🎨</div>
  <h3>עיצוב</h3>
  <p>כרטיס זכוכית עם טשטוש רקע ושקיפות</p>
</div>
<div class="glass-card">
  <div class="glass-icon">⚡</div>
  <h3>ביצועים</h3>
  <p>אפקט קל שרץ חלק על כל דפדפן מודרני</p>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>אפקט זכוכית (Glassmorphism) הוא טרנד עיצובי פופולרי שיוצר מראה של זכוכית חלבית באמצעות CSS בלבד.</p>
<ul>
  <li>השתמשו ב-<code>backdrop-filter: blur(12px)</code> כדי לטשטש את כל מה שמאחורי הכרטיס.</li>
  <li>הוסיפו רקע שקוף למחצה עם <code>rgba(255, 255, 255, 0.15)</code> כדי לתת לכרטיס צבע עדין.</li>
  <li>גבול דק עם <code>border: 1px solid rgba(255, 255, 255, 0.25)</code> מוסיף הגדרה ותחושת עומק.</li>
  <li><code>border-radius: 16px</code> עושה את הפינות מעוגלות לתחושה רכה ומודרנית.</li>
  <li>אפקט ה-hover עם <code>translateY(-8px)</code> ו-<code>box-shadow</code> יוצר תחושה שהכרטיס צף מעל הדף.</li>
  <li>הצורות הצבעוניות ברקע הן מה שגורם לטשטוש להיראות מרשים, בלי רקע צבעוני האפקט פחות בולט.</li>
</ul>`,
    proTipHe: 'הוסיפו -webkit-backdrop-filter תמיד לצד backdrop-filter כדי לתמוך גם בדפדפני Safari.',
  },

  {
    id: 'marquee',
    title: 'Infinite Marquee',
    titleHe: 'מרקי אינסופי',
    description: 'A smooth infinite horizontal scrolling text marquee using pure CSS animation.',
    descriptionHe: 'טקסט נגלל אינסופי וחלק לאורך באמצעות אנימציית CSS בלבד.',
    categories: ['text'],
    tags: [
      { label: 'marquee' },
      { label: 'CSS animation' },
      { label: 'infinite scroll' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'marquee',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 2rem;
    background: #0f0f1a;
    font-family: sans-serif;
    overflow: hidden;
  }
  .marquee-wrapper {
    width: 100%;
    overflow: hidden;
    padding: 1.2rem 0;
    background: linear-gradient(90deg, #1a1a2e, #16213e);
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: scroll-left 12s linear infinite;
  }
  .marquee-wrapper:nth-child(2) .marquee-track {
    animation-direction: reverse;
    animation-duration: 15s;
  }
  .marquee-track span {
    white-space: nowrap;
    font-size: 1.6rem;
    font-weight: 700;
    color: #e2e8f0;
    padding: 0 2.5rem;
    letter-spacing: 0.05em;
  }
  .marquee-track span .highlight {
    color: #a78bfa;
  }
  @keyframes scroll-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  h2 { color: #e2e8f0; font-size: 1.4rem; }
</style>
</head>
<body>
<h2>מרקי אינסופי עם CSS בלבד</h2>
<div class="marquee-wrapper">
  <div class="marquee-track">
    <span>עיצוב ✦ <span class="highlight">פיתוח</span> ✦ יצירתיות ✦ קוד ✦ אנימציה ✦ חדשנות ✦&nbsp;</span>
    <span>עיצוב ✦ <span class="highlight">פיתוח</span> ✦ יצירתיות ✦ קוד ✦ אנימציה ✦ חדשנות ✦&nbsp;</span>
  </div>
</div>
<div class="marquee-wrapper">
  <div class="marquee-track">
    <span>HTML ★ CSS ★ JavaScript ★ React ★ TypeScript ★ Node.js ★&nbsp;</span>
    <span>HTML ★ CSS ★ JavaScript ★ React ★ TypeScript ★ Node.js ★&nbsp;</span>
  </div>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>מרקי אינסופי הוא אפקט קלאסי שמשמש הרבה באתרים מודרניים להצגת לוגואים, טקסטים, וכותרות נעות.</p>
<ul>
  <li>יוצרים מכולה עם <code>overflow: hidden</code> כדי להסתיר את התוכן שחורג מהמסגרת.</li>
  <li>בפנים, שמים רצועה (<code>track</code>) עם <code>display: flex</code> ו-<code>width: max-content</code> כדי שהתוכן יתפרס בשורה אחת.</li>
  <li>משכפלים את התוכן פעמיים כדי שכשהעותק הראשון יוצא מהמסך, השני ממשיך מאחוריו ויוצר לולאה אינסופית.</li>
  <li>ה-keyframe <code>translateX(-50%)</code> מזיז את הרצועה בדיוק בחצי מהרוחב, כלומר עותק אחד שלם.</li>
  <li><code>animation: scroll-left 12s linear infinite</code> יוצר תנועה חלקה, קבועה, ובלי סוף.</li>
  <li>שימוש ב-<code>animation-direction: reverse</code> על שורה שנייה יוצר מראה דינמי של גלילה הפוכה.</li>
</ul>`,
    proTipHe: 'כדי שהמרקי יעצור כשהמשתמש מרחף עליו, הוסיפו .marquee-wrapper:hover .marquee-track { animation-play-state: paused; }',
  },

  {
    id: 'morphtext',
    title: 'Morphing Text',
    titleHe: 'מורפינג טקסט',
    description: 'Text that smoothly morphs between different words using opacity transitions.',
    descriptionHe: 'טקסט שמשתנה בצורה חלקה בין מילים שונות עם מעברי שקיפות.',
    categories: ['text'],
    tags: [
      { label: 'text' },
      { label: 'animation' },
      { label: 'transition' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'morphtext',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0f0f1a;
    font-family: sans-serif;
  }
  .morph-container {
    text-align: center;
  }
  .morph-container h2 {
    color: #94a3b8;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    font-weight: 400;
  }
  .morph-word {
    font-size: 4rem;
    font-weight: 800;
    background: linear-gradient(135deg, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 1;
    transition: opacity 0.4s ease, transform 0.4s ease;
    display: inline-block;
  }
  .morph-word.out {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  .morph-word.in {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  .morph-dots {
    margin-top: 1.5rem;
    display: flex; gap: 0.5rem; justify-content: center;
  }
  .morph-dots span {
    width: 10px; height: 10px; border-radius: 50%;
    background: #334155;
    transition: background 0.3s;
  }
  .morph-dots span.active {
    background: #a78bfa;
  }
</style>
</head>
<body>
<div class="morph-container">
  <h2>אנחנו בונים אתרים</h2>
  <div class="morph-word" id="word">מדהימים</div>
  <div class="morph-dots" id="dots"></div>
</div>
<script>
  const words = ['מדהימים', 'מהירים', 'יצירתיים', 'מרשימים', 'חכמים'];
  let index = 0;
  const wordEl = document.getElementById('word');
  const dotsEl = document.getElementById('dots');

  words.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dotsEl.appendChild(dot);
  });
  const dotEls = dotsEl.querySelectorAll('span');

  function morphNext() {
    wordEl.classList.add('out');
    wordEl.classList.remove('in');

    setTimeout(() => {
      index = (index + 1) % words.length;
      wordEl.textContent = words[index];
      dotEls.forEach((d, i) => d.classList.toggle('active', i === index));
      wordEl.classList.remove('out');
      wordEl.classList.add('in');
    }, 400);
  }

  setInterval(morphNext, 2200);
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>אפקט מורפינג טקסט מחליף מילים בצורה חלקה עם אנימציית כניסה ויציאה, מושלם לכותרות דינמיות.</p>
<ul>
  <li>מגדירים מערך של מילים שהטקסט יעבור ביניהן, ומשתנה <code>index</code> שעוקב אחרי המילה הנוכחית.</li>
  <li>כל 2.2 שניות, מפעילים פונקציה שמוסיפה class בשם <code>out</code> לאלמנט הטקסט.</li>
  <li>ה-class <code>out</code> משנה <code>opacity</code> ל-0 ומזיז את הטקסט למעלה עם <code>translateY(-20px)</code>.</li>
  <li>אחרי 400 מילישניות (כשהאנימציה מסתיימת), מחליפים את התוכן למילה הבאה ומוסיפים class <code>in</code>.</li>
  <li>נקודות מחוון (dots) בתחתית מראות למשתמש באיזו מילה הוא נמצא, עם <code>transition</code> חלק על הצבע.</li>
  <li>ה-gradient על הטקסט נעשה עם <code>background-clip: text</code> ו-<code>-webkit-text-fill-color: transparent</code>.</li>
</ul>`,
    proTipHe: 'אפשר להוסיף אפקט blur קל בזמן המעבר עם filter: blur(4px) ב-class out.',
  },

  {
    id: 'tilt',
    title: '3D Tilt Card',
    titleHe: 'כרטיס הטיה 3D',
    description: 'A card that tilts in 3D following the mouse position using perspective transforms.',
    descriptionHe: 'כרטיס שנוטה בתלת-ממד בעקבות מיקום העכבר באמצעות טרנספורמציות פרספקטיבה.',
    categories: ['card', 'hover'],
    tags: [
      { label: '3D' },
      { label: 'perspective' },
      { label: 'hover' },
      { label: 'transform' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'tilt',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0f0f1a;
    font-family: sans-serif;
    perspective: 1000px;
  }
  .tilt-card {
    width: 320px; height: 400px;
    background: linear-gradient(145deg, #1e1b4b, #312e81);
    border-radius: 20px;
    padding: 2rem;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    color: #e2e8f0;
    transform-style: preserve-3d;
    transition: transform 0.1s ease;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;
  }
  .tilt-card::before {
    content: '';
    position: absolute;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(167,139,250,0.3), transparent);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .tilt-card:hover::before { opacity: 1; }
  .tilt-icon { font-size: 3.5rem; transform: translateZ(40px); margin-bottom: 1rem; }
  .tilt-title { font-size: 1.6rem; font-weight: 700; transform: translateZ(30px); margin-bottom: 0.5rem; }
  .tilt-desc { text-align: center; opacity: 0.8; transform: translateZ(20px); line-height: 1.6; }
</style>
</head>
<body>
<div class="tilt-card" id="card">
  <div class="tilt-icon">🚀</div>
  <div class="tilt-title">כרטיס 3D</div>
  <p class="tilt-desc">הזיזו את העכבר מעל הכרטיס כדי לראות את אפקט ההטיה התלת-ממדי</p>
</div>
<script>
  const card = document.getElementById('card');
  const MAX_TILT = 15;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -MAX_TILT;
    const rotateY = ((x - centerX) / centerX) * MAX_TILT;

    card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;

    const before = card.querySelector('::before') || card;
    card.style.setProperty('--mx', x + 'px');
    card.style.setProperty('--my', y + 'px');
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>כרטיס הטיה 3D יוצר תחושת עומק אמיתית על ידי שימוש ב-CSS perspective יחד עם חישובי JavaScript של מיקום העכבר.</p>
<ul>
  <li>על ה-body מגדירים <code>perspective: 1000px</code> כדי ליצור את מרחב ה-3D שבו הכרטיס יכול להסתובב.</li>
  <li><code>transform-style: preserve-3d</code> על הכרטיס שומר על ה-3D גם לאלמנטים הפנימיים.</li>
  <li>ב-<code>mousemove</code>, מחשבים את המרחק של העכבר ממרכז הכרטיס ומתרגמים אותו לזוויות סיבוב.</li>
  <li><code>rotateX</code> שולט בהטיה אנכית (למעלה/למטה) ו-<code>rotateY</code> בהטיה אופקית (ימין/שמאל).</li>
  <li>אלמנטים פנימיים עם <code>translateZ</code> שונה יוצרים אפקט פרלקס, כאילו הם צפים בגבהים שונים.</li>
  <li>ב-<code>mouseleave</code>, הכרטיס חוזר למצבו הרגיל עם <code>transition</code> חלק.</li>
</ul>`,
    proTipHe: 'הוסיפו אפקט אור עם pseudo-element radial-gradient שעוקב אחרי העכבר כדי לשפר את התחושה התלת-ממדית.',
  },

  {
    id: 'neontext',
    title: 'Neon Text',
    titleHe: 'טקסט ניאון',
    description: 'Glowing neon text effect with pulsating multi-layered text-shadow animations.',
    descriptionHe: 'אפקט טקסט ניאון זוהר עם אנימציית הבהוב רב-שכבתית של text-shadow.',
    categories: ['text'],
    tags: [
      { label: 'neon' },
      { label: 'glow' },
      { label: 'text-shadow' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'neontext',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 3rem;
    background: #0a0a0a;
    font-family: sans-serif;
  }
  .neon {
    font-size: 4rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    animation: neon-pulse 2s ease-in-out infinite alternate;
  }
  .neon-blue {
    color: #4fc3f7;
    text-shadow:
      0 0 7px #4fc3f7,
      0 0 10px #4fc3f7,
      0 0 21px #4fc3f7,
      0 0 42px #0288d1,
      0 0 82px #0288d1,
      0 0 92px #0288d1;
  }
  .neon-pink {
    color: #f48fb1;
    text-shadow:
      0 0 7px #f48fb1,
      0 0 10px #f48fb1,
      0 0 21px #f48fb1,
      0 0 42px #c2185b,
      0 0 82px #c2185b,
      0 0 92px #c2185b;
    animation-delay: 0.5s;
  }
  .neon-green {
    color: #69f0ae;
    text-shadow:
      0 0 7px #69f0ae,
      0 0 10px #69f0ae,
      0 0 21px #69f0ae,
      0 0 42px #00c853,
      0 0 82px #00c853,
      0 0 92px #00c853;
    animation-delay: 1s;
  }
  @keyframes neon-pulse {
    from {
      text-shadow:
        0 0 7px currentColor,
        0 0 10px currentColor,
        0 0 21px currentColor,
        0 0 42px currentColor,
        0 0 82px currentColor;
      opacity: 1;
    }
    to {
      text-shadow:
        0 0 4px currentColor,
        0 0 7px currentColor,
        0 0 12px currentColor,
        0 0 20px currentColor,
        0 0 40px currentColor;
      opacity: 0.85;
    }
  }
  .subtitle {
    color: #555; font-size: 1rem;
    text-align: center; margin-top: -1.5rem;
  }
</style>
</head>
<body>
<div class="neon neon-blue">שלום עולם</div>
<div class="neon neon-pink">אפקט ניאון</div>
<div class="neon neon-green">CSS בלבד</div>
<p class="subtitle">אנימציית text-shadow עם שכבות זוהר מרובות</p>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>אפקט הניאון משתמש בשכבות מרובות של <code>text-shadow</code> כדי ליצור זוהר ריאליסטי שמדמה שלט ניאון אמיתי.</p>
<ul>
  <li>כל שכבת <code>text-shadow</code> יוצרת טבעת זוהר ברדיוס שונה, מקרוב (7px) ועד רחוק (92px).</li>
  <li>השכבות הקרובות משתמשות בצבע בהיר יותר (למשל <code>#4fc3f7</code>) והרחוקות בצבע כהה יותר (<code>#0288d1</code>).</li>
  <li>אנימציית <code>neon-pulse</code> מחליפה בין שני מצבי זוהר, חזק וחלש, עם <code>alternate</code> כדי ליצור פעימה.</li>
  <li>שימוש ב-<code>currentColor</code> ב-keyframes מאפשר לכתוב אנימציה אחת שעובדת עם כל צבע.</li>
  <li><code>animation-delay</code> שונה לכל שורה יוצר אפקט גל, כאילו השלטים נדלקים אחד אחרי השני.</li>
  <li>הרקע הכהה (<code>#0a0a0a</code>) חיוני כדי שהזוהר יבלוט כמו ניאון אמיתי בחושך.</li>
</ul>`,
    proTipHe: 'הוסיפו אפקט flicker ריאליסטי על ידי שינוי ה-opacity באקראי עם keyframes מרובים.',
  },

  {
    id: 'particlesbg',
    title: 'Particles Network',
    titleHe: 'רשת חלקיקים',
    description: 'An animated canvas background with floating particles connected by lines.',
    descriptionHe: 'רקע קנבס מונפש עם חלקיקים צפים שמחוברים בקווים ביניהם.',
    categories: ['background'],
    tags: [
      { label: 'canvas' },
      { label: 'particles' },
      { label: 'animation' },
      { label: 'background' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'particlesbg',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #0a0a1a; overflow: hidden; }
  canvas { display: block; }
  .overlay-text {
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: #e2e8f0; font-family: sans-serif;
    text-align: center; z-index: 1;
    pointer-events: none;
  }
  .overlay-text h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
  .overlay-text p { opacity: 0.6; font-size: 1rem; }
</style>
</head>
<body>
<canvas id="c"></canvas>
<div class="overlay-text">
  <h1>רשת חלקיקים</h1>
  <p>רקע אינטראקטיבי עם Canvas 2D</p>
</div>
<script>
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];
  const COUNT = 80;
  const MAX_DIST = 120;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2 + 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(167, 139, 250, 0.8)';
      ctx.fill();

      for (let j = i + 1; j < COUNT; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = \`rgba(167, 139, 250, \${1 - dist / MAX_DIST})\`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>רשת חלקיקים היא אפקט רקע מרשים שמשתמש ב-Canvas API כדי לצייר חלקיקים נעים ולחבר ביניהם קווים.</p>
<ul>
  <li>יוצרים אלמנט <code>canvas</code> בגודל מלא של החלון, ומשיגים את ה-<code>2d context</code> לציור.</li>
  <li>מאתחלים 80 חלקיקים עם מיקום אקראי (<code>x, y</code>), מהירות (<code>vx, vy</code>), ורדיוס (<code>r</code>).</li>
  <li>בכל פריים, כל חלקיק זז לפי המהירות שלו ומקפיץ מהקירות כשהוא מגיע לקצה המסך.</li>
  <li>לכל זוג חלקיקים, מחשבים את המרחק ביניהם. אם הוא קטן מ-120 פיקסלים, מציירים קו מחבר.</li>
  <li>השקיפות של הקו נקבעת לפי המרחק: ככל שהחלקיקים קרובים יותר, הקו בולט יותר (<code>1 - dist / MAX_DIST</code>).</li>
  <li><code>requestAnimationFrame</code> מבטיח ש-60 פריימים בשנייה ירוצו בצורה חלקה ויעילה.</li>
</ul>`,
    proTipHe: 'הוסיפו אינטראקציה עם העכבר על ידי הוספת חלקיק מיוחד שמיקומו תמיד במקום הסמן.',
  },

  {
    id: 'gradientborder',
    title: 'Gradient Border',
    titleHe: 'גבול גרדיאנט',
    description: 'Animated gradient border on cards using a rotating conic-gradient pseudo-element.',
    descriptionHe: 'גבול גרדיאנט מונפש על כרטיסים באמצעות pseudo-element עם conic-gradient מסתובב.',
    categories: ['card', 'hover'],
    tags: [
      { label: 'gradient' },
      { label: 'border' },
      { label: 'animation' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'gradientborder',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
    background: #0a0a1a;
    font-family: sans-serif;
  }
  .gradient-card {
    position: relative;
    width: 280px; height: 200px;
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .gradient-card::before {
    content: '';
    position: absolute;
    width: 200%; height: 200%;
    top: -50%; left: -50%;
    background: conic-gradient(
      from 0deg,
      #a78bfa, #f472b6, #fb923c, #34d399, #60a5fa, #a78bfa
    );
    animation: spin 3s linear infinite;
  }
  .gradient-card::after {
    content: '';
    position: absolute;
    inset: 3px;
    background: #13131f;
    border-radius: 14px;
  }
  .gradient-card .content {
    position: relative;
    z-index: 1;
    color: #e2e8f0;
    text-align: center;
    padding: 1.5rem;
  }
  .gradient-card .content h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
  .gradient-card .content p {
    font-size: 0.9rem;
    opacity: 0.7;
    line-height: 1.5;
  }
  .gradient-card:hover::before {
    animation-duration: 1.5s;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .card-icon { font-size: 2rem; margin-bottom: 0.5rem; }
</style>
</head>
<body>
<div class="gradient-card">
  <div class="content">
    <div class="card-icon">✨</div>
    <h3>גבול מסתובב</h3>
    <p>הגבול מסתובב ומאיץ כשמרחפים</p>
  </div>
</div>
<div class="gradient-card">
  <div class="content">
    <div class="card-icon">🎯</div>
    <h3>גרדיאנט קוני</h3>
    <p>שימוש ב-conic-gradient ו-pseudo-element</p>
  </div>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>אפקט הגבול הגרדיאנטי משתמש בטריק יצירתי של שכבות pseudo-element כדי ליצור גבול צבעוני מסתובב.</p>
<ul>
  <li>הכרטיס עצמו משמש כמסגרת עם <code>overflow: hidden</code> ו-<code>border-radius</code> כדי לחתוך את הצורה.</li>
  <li><code>::before</code> יוצר ריבוע ענק (200% מגודל הכרטיס) עם <code>conic-gradient</code> של 6 צבעים.</li>
  <li>האלמנט הגדול מסתובב עם <code>animation: spin 3s linear infinite</code>, וכי יש <code>overflow: hidden</code>, רק החלק שבתוך הכרטיס נראה.</li>
  <li><code>::after</code> יוצר שכבה כהה שמכסה את הפנים, עם <code>inset: 3px</code> שמשאיר 3 פיקסלים של הגרדיאנט בולטים כגבול.</li>
  <li>התוכן האמיתי נמצא ב-div עם <code>z-index: 1</code> כדי שיופיע מעל שתי שכבות ה-pseudo.</li>
  <li>ב-hover, מהירות האנימציה יורדת ל-1.5 שניות כדי ליצור תחושה של האצה.</li>
</ul>`,
    proTipHe: 'אפשר לשנות את עובי הגבול על ידי שינוי ערך ה-inset ב-::after, למשל 2px לגבול דק יותר.',
  },

  {
    id: 'countup',
    title: 'Count Up',
    titleHe: 'ספירה עולה',
    description: 'Animated number counter that starts when the element scrolls into view.',
    descriptionHe: 'ספירת מספרים מונפשת שמתחילה כשהאלמנט נכנס לתצוגה בגלילה.',
    categories: ['text', 'scroll'],
    tags: [
      { label: 'counter' },
      { label: 'IntersectionObserver' },
      { label: 'animation' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'countup',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 200vh;
    background: #0f0f1a;
    font-family: sans-serif;
  }
  .spacer {
    height: 60vh;
    display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.2rem;
  }
  .stats {
    display: flex; justify-content: center; gap: 3rem;
    flex-wrap: wrap;
    padding: 4rem 2rem;
    background: linear-gradient(180deg, #13131f, #1a1a2e);
    border-top: 1px solid #222;
    border-bottom: 1px solid #222;
  }
  .stat-item {
    text-align: center;
    min-width: 140px;
  }
  .stat-number {
    font-size: 3.5rem;
    font-weight: 800;
    color: #a78bfa;
    font-variant-numeric: tabular-nums;
  }
  .stat-number::after {
    content: attr(data-suffix);
    font-size: 2rem;
  }
  .stat-label {
    margin-top: 0.5rem;
    color: #94a3b8;
    font-size: 1rem;
  }
</style>
</head>
<body>
<div class="spacer">⬇ גללו למטה כדי לראות את האפקט ⬇</div>
<section class="stats" id="stats">
  <div class="stat-item">
    <div class="stat-number" data-target="1500" data-suffix="+">0</div>
    <div class="stat-label">לקוחות מרוצים</div>
  </div>
  <div class="stat-item">
    <div class="stat-number" data-target="98" data-suffix="%">0</div>
    <div class="stat-label">שביעות רצון</div>
  </div>
  <div class="stat-item">
    <div class="stat-number" data-target="350" data-suffix="">0</div>
    <div class="stat-label">פרויקטים</div>
  </div>
  <div class="stat-item">
    <div class="stat-number" data-target="12" data-suffix="">0</div>
    <div class="stat-label">שנות ניסיון</div>
  </div>
</section>
<script>
  const numbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCount(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        numbers.forEach((n) => animateCount(n));
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.getElementById('stats'));
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>אפקט הספירה העולה משלב בין IntersectionObserver לזיהוי גלילה לבין אנימציית מספרים חלקה עם easing.</p>
<ul>
  <li><code>IntersectionObserver</code> עוקב אחרי הסקשן ומפעיל את הספירה רק כשהוא נכנס ל-30% מהתצוגה (<code>threshold: 0.3</code>).</li>
  <li>כל אלמנט מספר מכיל <code>data-target</code> עם הערך הסופי ו-<code>data-suffix</code> עם סימן כמו + או %.</li>
  <li>הפונקציה <code>animateCount</code> משתמשת ב-<code>requestAnimationFrame</code> לאנימציה חלקה של 60fps.</li>
  <li>פונקציית easing <code>1 - Math.pow(1 - progress, 3)</code> (cubic ease-out) גורמת לספירה להתחיל מהר ולהאט לקראת הסוף.</li>
  <li>משתנה <code>animated</code> מוודא שהספירה תרוץ רק פעם אחת ולא תתחיל מחדש בכל גלילה.</li>
  <li><code>font-variant-numeric: tabular-nums</code> על הטקסט מוודא שכל הספרות באותו רוחב כדי למנוע קפיצות בפריסה.</li>
</ul>`,
    proTipHe: 'אפשר להשתמש ב-CSS pseudo-element ::after עם content: attr(data-suffix) כדי להוסיף את הסימן בלי JavaScript.',
  },

  {
    id: 'splitscroll',
    title: 'Split Scroll',
    titleHe: 'גלילה מפוצלת',
    description: 'A split-screen layout where left and right columns scroll at different speeds.',
    descriptionHe: 'פריסת מסך מפוצל שבה העמודות גוללות במהירויות שונות.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'sticky' },
      { label: 'layout' },
      { label: 'parallax' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'splitscroll',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: sans-serif;
    background: #0f0f1a;
    color: #e2e8f0;
  }
  .split-container {
    display: flex;
    min-height: 100vh;
  }
  .split-left {
    width: 50%;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #1e1b4b, #312e81);
  }
  .split-left-content {
    text-align: center;
    padding: 2rem;
  }
  .split-left-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .split-left-content p {
    color: #94a3b8;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  .split-right {
    width: 50%;
  }
  .split-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    border-bottom: 1px solid #1e293b;
  }
  .split-section:nth-child(1) { background: #0f172a; }
  .split-section:nth-child(2) { background: #1a1a2e; }
  .split-section:nth-child(3) { background: #162032; }
  .split-section:nth-child(4) { background: #1a1028; }
  .section-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 2rem;
    max-width: 380px;
    text-align: center;
  }
  .section-card .num {
    font-size: 3rem;
    font-weight: 800;
    color: #a78bfa;
    margin-bottom: 0.5rem;
  }
  .section-card h3 { font-size: 1.3rem; margin-bottom: 0.8rem; }
  .section-card p { color: #94a3b8; line-height: 1.6; font-size: 0.95rem; }
</style>
</head>
<body>
<div class="split-container">
  <div class="split-left">
    <div class="split-left-content">
      <h1>גלילה מפוצלת</h1>
      <p>הצד השמאלי נשאר קבוע בזמן<br>שהצד הימני גולל</p>
    </div>
  </div>
  <div class="split-right">
    <div class="split-section">
      <div class="section-card">
        <div class="num">01</div>
        <h3>תכנון</h3>
        <p>שלב ראשון של כל פרויקט מצליח הוא תכנון מדויק של המטרות והיעדים</p>
      </div>
    </div>
    <div class="split-section">
      <div class="section-card">
        <div class="num">02</div>
        <h3>עיצוב</h3>
        <p>עיצוב ממשק משתמש מודרני ונקי שמתמקד בחוויית המשתמש</p>
      </div>
    </div>
    <div class="split-section">
      <div class="section-card">
        <div class="num">03</div>
        <h3>פיתוח</h3>
        <p>כתיבת קוד נקי ויעיל עם טכנולוגיות מתקדמות ומעודכנות</p>
      </div>
    </div>
    <div class="split-section">
      <div class="section-card">
        <div class="num">04</div>
        <h3>השקה</h3>
        <p>בדיקות מקיפות והשקה מוצלחת של המוצר הסופי ללקוח</p>
      </div>
    </div>
  </div>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>גלילה מפוצלת היא טכניקת פריסה מתקדמת שבה חלק מהדף נשאר קבוע בזמן שהחלק השני גולל כרגיל.</p>
<ul>
  <li>המבנה מחולק לשתי עמודות עם <code>display: flex</code>, כל אחת ברוחב 50%.</li>
  <li>העמודה השמאלית מקבלת <code>position: sticky</code> ו-<code>top: 0</code> עם <code>height: 100vh</code>, מה שגורם לה להישאר קבועה על המסך.</li>
  <li>העמודה הימנית גוללת כרגיל, וכל סקשן בה תופס <code>min-height: 100vh</code> כדי ליצור תחושה של עמודים.</li>
  <li>כי ה-sticky פועל בתוך flex container, הוא נשאר במקום כל עוד העמודה הימנית גוללת.</li>
  <li>כל סקשן בצד הימני מקבל רקע שונה כדי ליצור הפרדה ויזואלית ברורה בין התכנים.</li>
  <li>הכרטיסים בתוך כל סקשן משתמשים ב-<code>rgba</code> שקוף עם <code>backdrop</code> עדין ליצירת עומק.</li>
</ul>`,
    proTipHe: 'אפשר להוסיף IntersectionObserver שמחליף את התוכן בצד השמאלי בהתאם לסקשן הנוכחי בצד הימני.',
  },
  {
    id: 'scrollvideo',
    title: 'Scroll Video',
    titleHe: 'סרטון גלילה',
    description: 'Frame-by-frame video playback driven by scroll position',
    descriptionHe: 'הפעלת וידאו פריים-אחר-פריים לפי מיקום הגלילה — עובד על כל הדפדפנים כולל מובייל',
    categories: ['scroll'],
    tags: [{ label: 'scroll' }, { label: 'video' }, { label: 'canvas' }, { label: 'mobile' }],
    difficulty: 'advanced',
    previewComponent: 'scrollvideo',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scroll Video</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; }
    .scroll-video-section {
      height: calc(var(--frame-count, 60) * 20px + 100dvh);
      position: relative;
    }
    @supports not (height: 100dvh) {
      .scroll-video-section {
        height: calc(var(--frame-count, 60) * 20px + 100vh);
      }
    }
    .scroll-video-sticky {
      position: sticky; top: 0;
      height: 100dvh;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; background: #000;
    }
    @supports not (height: 100dvh) {
      .scroll-video-sticky { height: 100vh; }
    }
    #scrollCanvas {
      max-width: 100%; max-height: 100%;
      width: auto; height: auto;
      display: block; will-change: contents;
    }
    .scroll-video-loader {
      position: absolute; bottom: 0; left: 0; right: 0;
      height: 3px; background: rgba(255,255,255,0.1);
    }
    .scroll-video-loader-fill {
      height: 100%; background: #c8f53b;
      width: 0%; transition: width 0.3s;
    }
    #scrollCanvas.loading { opacity: 0; }
    #scrollCanvas.ready { opacity: 1; transition: opacity 0.4s; }
  </style>
</head>
<body>
  <div class="scroll-video-section" id="scrollVideoSection">
    <div class="scroll-video-sticky">
      <canvas id="scrollCanvas" class="loading"></canvas>
      <div class="scroll-video-loader">
        <div class="scroll-video-loader-fill" id="loaderFill"></div>
      </div>
    </div>
  </div>
  <script>
  (function () {
    'use strict';
    var FRAME_URLS = [
      /* הדבק כאן את מערך ה-URL של הפריימים */
    ];
    var TOTAL = FRAME_URLS.length;
    var canvas = document.getElementById('scrollCanvas');
    var ctx = canvas.getContext('2d');
    var section = document.getElementById('scrollVideoSection');
    var loader = document.getElementById('loaderFill');
    var imgs = [], cur = 0, ticking = false;

    function setVh() {
      document.documentElement.style.setProperty('--vh', innerHeight * 0.01 + 'px');
      section.style.setProperty('--frame-count', TOTAL);
    }
    setVh();
    addEventListener('orientationchange', setVh);

    function preload() {
      imgs = FRAME_URLS.map(function(u) {
        var i = new Image(); i.crossOrigin = 'anonymous'; i.src = u; return i;
      });
      Promise.all(imgs.slice(0, 10).map(function(i) {
        return i.decode ? i.decode().catch(function(){}) :
          new Promise(function(r) { i.onload = r; i.onerror = r; });
      })).then(function() {
        if (imgs[0].naturalWidth) {
          canvas.width = imgs[0].naturalWidth;
          canvas.height = imgs[0].naturalHeight;
        }
        fit(); ctx.drawImage(imgs[0], 0, 0);
        canvas.classList.replace('loading', 'ready');
        loader.style.width = '100%';
      });
    }

    function fit() {
      if (!canvas.width) return;
      var r = canvas.width / canvas.height;
      if (innerWidth / innerHeight > r) {
        canvas.style.height = innerHeight + 'px';
        canvas.style.width = Math.round(innerHeight * r) + 'px';
      } else {
        canvas.style.width = innerWidth + 'px';
        canvas.style.height = Math.round(innerWidth / r) + 'px';
      }
    }

    var rt;
    addEventListener('orientationchange', function() {
      clearTimeout(rt);
      rt = setTimeout(function() { fit(); draw(cur); }, 200);
    });

    function draw(i) {
      var m = imgs[i];
      if (!m || !m.complete || !m.naturalWidth) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(m, 0, 0);
    }

    function sched() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function() {
        var rect = section.getBoundingClientRect();
        var total = section.offsetHeight - innerHeight;
        var p = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
        var f = Math.min(Math.floor(p * TOTAL), TOTAL - 1);
        if (f !== cur) { cur = f; draw(cur); }
        ticking = false;
      });
    }

    addEventListener('scroll', sched, { passive: true });
    addEventListener('touchmove', sched, { passive: true });
    preload();
  })();
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זה עובד?</h4>
<p>סרטון גלילה מאפשר לשלוט בהפעלת וידאו לפי מיקום הגלילה — בדיוק כמו שאפל עושים בדפי המוצר שלהם.</p>
<ul>
  <li>הוידאו מפורק לפריימים (תמונות JPEG) שמועלים ל-imgbb.</li>
  <li>Canvas HTML5 מציג את הפריים הנכון לפי אחוז הגלילה.</li>
  <li><code>position: sticky</code> משאיר את הקנבס קבוע על המסך בזמן הגלילה.</li>
  <li><code>getBoundingClientRect</code> משמש במקום <code>scrollY</code> כי הוא מתעדכן גם במהלך momentum scroll באייפון.</li>
  <li>דגל <code>ticking</code> מוודא שרק <code>drawImage</code> אחד רץ לכל פריים של האנימציה.</li>
  <li><code>100dvh</code> פותר את באג ה-address bar של iOS Safari.</li>
  <li><code>img.decode()</code> מבטיח שהתמונות מפוענחות לפני ההצגה — מונע הבהוב לבן.</li>
</ul>`,
    proTipHe: 'השתמש בכלי היצירה המובנה כדי לחלץ פריימים מוידאו ולהעלות אותם אוטומטית. שמור על 40-60 פריימים לביצועים מיטביים.',
  },
];
