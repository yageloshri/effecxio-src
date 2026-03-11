import type { Effect } from '@/types';

export const effectsBatch8Media: Effect[] = [
  // ─── 1. Image Parallax ────────────────────────────────────────────────
  {
    id: 'imageparallax',
    title: 'Image Parallax',
    titleHe: 'פרלקס תמונה',
    description: 'Image inside a card moves opposite to scroll direction, creating a depth illusion.',
    descriptionHe: 'תמונה בתוך כרטיס נעה בכיוון הפוך לגלילה ויוצרת אשליית עומק.',
    categories: ['media', 'scroll'],
    tags: [
      { label: 'parallax' },
      { label: 'image' },
      { label: 'scroll' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'imageparallax',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Image Parallax</title>
<!-- Image Parallax — image inside card moves opposite to scroll for depth effect -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 300vh;
    background: #0a0a0a;
    font-family: sans-serif;
    color: #fff;
  }
  .spacer {
    height: 60vh;
    display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.1rem;
  }
  .parallax-cards {
    display: flex; gap: 2rem;
    justify-content: center; flex-wrap: wrap;
    padding: 2rem;
  }
  .parallax-card {
    width: 300px;
    height: 220px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .parallax-card__img {
    position: absolute;
    inset: -40px; /* 40px extra on each side for movement range */
    will-change: transform;
    transition: transform 0.1s linear;
  }
  .card-img-1 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  .card-img-2 {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  .card-img-3 {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
  .parallax-card__label {
    position: absolute; bottom: 16px; left: 16px;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(8px);
    padding: 8px 16px; border-radius: 8px;
    font-size: 0.9rem; z-index: 1;
  }
</style>
</head>
<body>
  <div class="spacer">Scroll down to see parallax images</div>
  <div class="parallax-cards">
    <div class="parallax-card">
      <div class="parallax-card__img card-img-1"></div>
      <div class="parallax-card__label">Mountain View</div>
    </div>
    <div class="parallax-card">
      <div class="parallax-card__img card-img-2"></div>
      <div class="parallax-card__label">Sunset Beach</div>
    </div>
    <div class="parallax-card">
      <div class="parallax-card__img card-img-3"></div>
      <div class="parallax-card__label">Ocean Drive</div>
    </div>
  </div>
  <div class="spacer"></div>

  <script>
    const cards = document.querySelectorAll('.parallax-card');
    const STRENGTH = 0.15; /* parallax intensity — higher = more movement */

    function update() {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const viewH = window.innerHeight;
        /* Center of card relative to viewport center: -1 to 1 */
        const center = (rect.top + rect.height / 2 - viewH / 2) / (viewH / 2);
        const yOffset = center * 40 * STRENGTH; /* max 40px * strength */
        const img = card.querySelector('.parallax-card__img');
        img.style.transform = 'translateY(' + yOffset + 'px)';
      });
    }

    window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    update();
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט פרלקס תמונה עובד?</h4>
<p>האפקט יוצר אשליית עומק על ידי הזזת התמונה בכיוון ההפוך לגלילה — ככל שגוללים למטה, התמונה זזה למעלה ולהפך.</p>
<ul>
  <li><strong>שטח תנועה:</strong> התמונה גדולה מהכרטיס ב-40 פיקסלים מכל צד (<code>inset: -40px</code>), מה שנותן לה מרחב לנוע בלי לחשוף רקע ריק.</li>
  <li><strong>חישוב מיקום:</strong> מחשבים את מרכז הכרטיס ביחס למרכז הוויופורט — התוצאה היא ערך בין -1 ל-1 שמגדיר את כיוון ועוצמת ההזזה.</li>
  <li><strong>requestAnimationFrame:</strong> ה-scroll handler משתמש ב-<code>requestAnimationFrame</code> כדי לעדכן רק פעם אחת לכל פריים ולמנוע עומס.</li>
  <li><strong>will-change:</strong> מוסיפים <code>will-change: transform</code> לתמונה כדי שהדפדפן ייצור שכבת GPU נפרדת ויחסוך חישובים.</li>
  <li><strong>overflow: hidden:</strong> על הכרטיס מסתיר את החלקים העודפים של התמונה ושומר על הגבולות הנקיים.</li>
</ul>
<p>עוצמת האפקט נשלטת על ידי קבוע <code>STRENGTH</code> — ערך גבוה יותר יוצר תנועה דרמטית יותר.</p>`,
    proTipHe: 'הוסיפו scale(1.05) קל ב-hover מעל הכרטיס כדי ליצור תחושה שהתמונה מתקרבת אליכם.',
  },

  // ─── 2. Image Clip ────────────────────────────────────────────────────
  {
    id: 'imageclip',
    title: 'Image Clip',
    titleHe: 'חיתוך תמונה',
    description: 'Circular or shape clip-path that expands smoothly on hover to reveal the full image.',
    descriptionHe: 'חיתוך עיגולי שמתרחב בצורה חלקה ב-hover וחושף את התמונה המלאה.',
    categories: ['media', 'hover'],
    tags: [
      { label: 'clip-path' },
      { label: 'image' },
      { label: 'hover' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'imageclip',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Image Clip</title>
<!-- Image Clip — shape clip-path expands on hover to reveal full image -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
    flex-wrap: wrap;
    background: #0a0a0a; font-family: sans-serif;
  }
  .clip-card {
    width: 280px; height: 360px;
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
  }
  .clip-card__bg {
    position: absolute; inset: 0;
    /* Gradient placeholder for image */
    transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .clip-bg-1 {
    background: linear-gradient(135deg, #667eea, #764ba2);
    clip-path: circle(25% at 50% 50%); /* collapsed circle */
  }
  .clip-bg-2 {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); /* diamond */
  }
  .clip-bg-3 {
    background: linear-gradient(135deg, #43e97b, #38f9d7);
    clip-path: inset(30% round 16px); /* inset rectangle */
  }
  .clip-card:hover .clip-bg-1 {
    clip-path: circle(75% at 50% 50%); /* expanded circle */
  }
  .clip-card:hover .clip-bg-2 {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); /* full rect */
  }
  .clip-card:hover .clip-bg-3 {
    clip-path: inset(0% round 16px); /* full area */
  }
  .clip-card__overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-end;
    padding: 1.5rem; color: #fff;
    transition: background 0.4s;
  }
  .clip-card:hover .clip-card__overlay {
    background: rgba(0,0,0,0.15);
  }
  .clip-card__overlay h3 { font-size: 1.2rem; margin-bottom: 4px; }
  .clip-card__overlay p  { font-size: 0.85rem; opacity: 0.8; }
  .clip-label {
    position: absolute; top: 12px; left: 12px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    padding: 4px 12px; border-radius: 20px;
    font-size: 0.75rem; color: #fff;
  }
</style>
</head>
<body>
  <div class="clip-card">
    <div class="clip-card__bg clip-bg-1"></div>
    <div class="clip-card__overlay">
      <h3>Circle Reveal</h3>
      <p>Hover to expand</p>
    </div>
    <span class="clip-label">circle</span>
  </div>
  <div class="clip-card">
    <div class="clip-card__bg clip-bg-2"></div>
    <div class="clip-card__overlay">
      <h3>Diamond Reveal</h3>
      <p>Hover to expand</p>
    </div>
    <span class="clip-label">polygon</span>
  </div>
  <div class="clip-card">
    <div class="clip-card__bg clip-bg-3"></div>
    <div class="clip-card__overlay">
      <h3>Inset Reveal</h3>
      <p>Hover to expand</p>
    </div>
    <span class="clip-label">inset</span>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט חיתוך תמונה עובד?</h4>
<p>האפקט משתמש ב-<code>clip-path</code> של CSS כדי להסתיר חלק מהתמונה ולחשוף אותה בצורה מונפשת ב-hover.</p>
<ul>
  <li><strong>clip-path:</strong> מגדיר צורה שמסתירה הכל מחוצה לה — <code>circle()</code> לעיגול, <code>polygon()</code> ליהלום, ו-<code>inset()</code> למלבן.</li>
  <li><strong>מצב התחלתי:</strong> הצורה קטנה (למשל <code>circle(25%)</code>) כך שרק חלק קטן מהתמונה נראה.</li>
  <li><strong>hover:</strong> הצורה מתרחבת לגודל מלא (למשל <code>circle(75%)</code>) וחושפת את כל התמונה.</li>
  <li><strong>transition:</strong> <code>cubic-bezier(0.4, 0, 0.2, 1)</code> עם 0.6 שניות יוצר מעבר חלק ואלגנטי.</li>
  <li><strong>שכבת overlay:</strong> שכבה שקופה למחצה מעל התמונה מתבהרת ב-hover כדי שהתמונה תבלוט יותר.</li>
</ul>
<p>ניתן ליצור כל צורה שרוצים עם <code>clip-path</code> — כוכב, לב, או כל פוליגון מותאם אישית.</p>`,
    proTipHe: 'השתמשו בכלי כמו Clippy (bennettfeely.com/clippy) כדי ליצור צורות clip-path מורכבות בצורה ויזואלית.',
  },

  // ─── 3. Before After ──────────────────────────────────────────────────
  {
    id: 'beforeafter',
    title: 'Before & After',
    titleHe: 'לפני ואחרי',
    description: 'Draggable divider that reveals before and after images side by side.',
    descriptionHe: 'מחיצה נגררת שחושפת תמונות לפני ואחרי זו לצד זו.',
    categories: ['media', 'interaction'],
    tags: [
      { label: 'comparison' },
      { label: 'slider' },
      { label: 'image' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'beforeafter',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Before &amp; After</title>
<!-- Before & After — draggable divider reveals before/after images -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a; font-family: sans-serif;
  }
  .ba-container {
    position: relative;
    width: 600px; height: 400px;
    border-radius: 16px;
    overflow: hidden;
    cursor: ew-resize;
    user-select: none;
  }
  .ba-layer {
    position: absolute; inset: 0;
  }
  .ba-before {
    /* "Before" image — warm gradient */
    background: linear-gradient(135deg, #f5af19, #f12711);
    z-index: 1;
  }
  .ba-after {
    /* "After" image — cool gradient */
    background: linear-gradient(135deg, #667eea, #764ba2);
    z-index: 0;
  }
  .ba-clip {
    /* Clip the "before" layer to reveal "after" underneath */
    clip-path: inset(0 50% 0 0); /* initial: show left 50% */
  }
  .ba-label {
    position: absolute; top: 16px;
    padding: 6px 14px; border-radius: 20px;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(6px);
    color: #fff; font-size: 0.8rem; z-index: 5;
    pointer-events: none;
  }
  .ba-label-before { left: 16px; }
  .ba-label-after  { right: 16px; }
  .ba-handle {
    position: absolute;
    top: 0; bottom: 0;
    left: 50%; /* initial position */
    width: 4px;
    background: #fff;
    z-index: 10;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .ba-handle::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 40px; height: 40px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  }
  .ba-handle::after {
    content: '\\2194'; /* ↔ arrows */
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px; color: #333;
    z-index: 1;
  }
</style>
</head>
<body>
  <div class="ba-container" id="ba">
    <div class="ba-layer ba-after"></div>
    <div class="ba-layer ba-before ba-clip" id="baClip"></div>
    <div class="ba-handle" id="baHandle"></div>
    <span class="ba-label ba-label-before">Before</span>
    <span class="ba-label ba-label-after">After</span>
  </div>

  <script>
    const container = document.getElementById('ba');
    const clip = document.getElementById('baClip');
    const handle = document.getElementById('baHandle');
    let dragging = false;

    function setPos(x) {
      const rect = container.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      const right = (1 - pct) * 100; /* percentage from right edge */
      clip.style.clipPath = 'inset(0 ' + right + '% 0 0)';
      handle.style.left = pct * 100 + '%';
    }

    container.addEventListener('mousedown', (e) => { dragging = true; setPos(e.clientX); });
    window.addEventListener('mousemove', (e) => { if (dragging) setPos(e.clientX); });
    window.addEventListener('mouseup', () => { dragging = false; });

    /* Touch support */
    container.addEventListener('touchstart', (e) => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', (e) => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', () => { dragging = false; });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט לפני ואחרי עובד?</h4>
<p>מחלקים את המסך לשתי שכבות — "לפני" ו"אחרי" — ומשתמשים ב-<code>clip-path</code> כדי לחשוף את השכבה התחתונה בהתאם למיקום המחיצה.</p>
<ul>
  <li><strong>שתי שכבות:</strong> שכבת "after" בתחתית ושכבת "before" מעליה. ה-"before" נחתכת עם <code>clip-path: inset()</code> כדי לחשוף את ה-"after".</li>
  <li><strong>חישוב אחוז:</strong> בכל תנועת עכבר, מחשבים את המיקום היחסי (0-1) ומעדכנים את <code>clip-path</code> ואת מיקום המחיצה.</li>
  <li><strong>מחיצה ויזואלית:</strong> קו לבן אנכי עם עיגול במרכז משמש כידית גרירה ומסמן את נקודת ההפרדה.</li>
  <li><strong>תמיכה במובייל:</strong> מאזינים ל-<code>touchstart</code>, <code>touchmove</code> ו-<code>touchend</code> בנוסף לאירועי עכבר.</li>
  <li><strong>user-select: none:</strong> מונע בחירת טקסט בזמן גרירה שיכולה להפריע לחוויה.</li>
</ul>
<p>האפקט מושלם להשוואת תמונות — עריכת תמונה, עיצוב לפני/אחרי, או כל מצב שדורש השוואה ויזואלית.</p>`,
    proTipHe: 'הוסיפו אנימציית bounce קלה למחיצה בטעינה כדי לרמז למשתמש שהיא ניתנת לגרירה.',
  },

  // ─── 4. Image Stack ───────────────────────────────────────────────────
  {
    id: 'imagestack',
    title: 'Image Stack',
    titleHe: 'מחסנית תמונות',
    description: 'Stack of images that fan out on hover, revealing all images in the stack.',
    descriptionHe: 'מחסנית תמונות שנפרשת ב-hover וחושפת את כל התמונות.',
    categories: ['media', 'hover'],
    tags: [
      { label: 'stack' },
      { label: 'image' },
      { label: 'hover' },
      { label: 'fan' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'imagestack',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Image Stack</title>
<!-- Image Stack — stacked images fan out on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a; font-family: sans-serif;
  }
  .stack-container {
    position: relative;
    width: 240px; height: 320px;
    cursor: pointer;
  }
  .stack-item {
    position: absolute;
    width: 240px; height: 320px;
    border-radius: 16px;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.5s ease;
    transform-origin: center bottom;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    overflow: hidden;
  }
  .stack-item::after {
    content: attr(data-label);
    position: absolute; bottom: 16px; left: 16px;
    padding: 6px 12px; border-radius: 8px;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(6px);
    color: #fff; font-size: 0.8rem;
  }
  /* Gradient image placeholders */
  .stack-1 { background: linear-gradient(135deg, #667eea, #764ba2); z-index: 5; }
  .stack-2 { background: linear-gradient(135deg, #f093fb, #f5576c); z-index: 4; }
  .stack-3 { background: linear-gradient(135deg, #4facfe, #00f2fe); z-index: 3; }
  .stack-4 { background: linear-gradient(135deg, #43e97b, #38f9d7); z-index: 2; }
  .stack-5 { background: linear-gradient(135deg, #fa709a, #fee140); z-index: 1; }
  /* Collapsed: slight offset */
  .stack-2 { transform: translateY(-4px) rotate(-1deg); }
  .stack-3 { transform: translateY(-8px) rotate(1deg); }
  .stack-4 { transform: translateY(-12px) rotate(-2deg); }
  .stack-5 { transform: translateY(-16px) rotate(2deg); }
  /* Fan out on hover */
  .stack-container:hover .stack-1 { transform: translateX(0) rotate(0deg); }
  .stack-container:hover .stack-2 { transform: translateX(-90px) rotate(-12deg); }
  .stack-container:hover .stack-3 { transform: translateX(-180px) rotate(-24deg); }
  .stack-container:hover .stack-4 { transform: translateX(90px) rotate(12deg); }
  .stack-container:hover .stack-5 { transform: translateX(180px) rotate(24deg); }
  .stack-container:hover .stack-item {
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
  .hint {
    position: fixed; bottom: 2rem; left: 50%;
    transform: translateX(-50%);
    color: #555; font-size: 0.9rem;
  }
</style>
</head>
<body>
  <div class="stack-container">
    <div class="stack-item stack-5" data-label="Photo 5"></div>
    <div class="stack-item stack-4" data-label="Photo 4"></div>
    <div class="stack-item stack-3" data-label="Photo 3"></div>
    <div class="stack-item stack-2" data-label="Photo 2"></div>
    <div class="stack-item stack-1" data-label="Photo 1"></div>
  </div>
  <p class="hint">Hover over the stack</p>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט מחסנית תמונות עובד?</h4>
<p>תמונות מונחות אחת על גבי השנייה כמו חפיסת קלפים, וב-hover הן נפרשות לצדדים באפקט מניפה.</p>
<ul>
  <li><strong>position: absolute:</strong> כל התמונות ממוקמות אחת על גבי השנייה עם <code>z-index</code> שונה כדי לשלוט בסדר השכבות.</li>
  <li><strong>מצב סגור:</strong> בהתחלה התמונות מוזחות מעט למעלה (<code>translateY</code>) ומסובבות קלות כדי ליצור רושם של ערימה.</li>
  <li><strong>מצב פתוח:</strong> ב-hover כל תמונה מקבלת <code>translateX</code> ו-<code>rotate</code> שונים שיוצרים מניפה סימטרית.</li>
  <li><strong>transition:</strong> <code>cubic-bezier(0.4, 0, 0.2, 1)</code> נותן תנועה טבעית עם האטה בסוף.</li>
  <li><strong>transform-origin:</strong> <code>center bottom</code> גורם לכל תמונה להסתובב מהנקודה התחתונה — כמו חפיסת קלפים אמיתית.</li>
</ul>
<p>ניתן לשנות את כיוון הפריסה על ידי שינוי ה-translateX ל-translateY כדי לקבל פריסה אנכית במקום אופקית.</p>`,
    proTipHe: 'הוסיפו transition-delay שונה לכל כרטיס כדי ליצור אפקט גל שבו הכרטיסים נפתחים בזה אחר זה.',
  },

  // ─── 5. Distort Image ─────────────────────────────────────────────────
  {
    id: 'distortimage',
    title: 'Distort Image',
    titleHe: 'עיוות תמונה',
    description: 'SVG filter image distortion effect on hover using feTurbulence and feDisplacementMap.',
    descriptionHe: 'אפקט עיוות תמונה ב-hover באמצעות פילטרי SVG של feTurbulence ו-feDisplacementMap.',
    categories: ['media', 'hover'],
    tags: [
      { label: 'distortion' },
      { label: 'SVG filter' },
      { label: 'image' },
      { label: 'hover' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'distortimage',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Distort Image</title>
<!-- Distort Image — SVG feTurbulence distortion on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
    flex-wrap: wrap;
    background: #0a0a0a; font-family: sans-serif;
  }
  .distort-card {
    width: 320px; height: 400px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: filter 0.4s ease;
  }
  .distort-card:hover {
    filter: url(#distortFilter);
  }
  .distort-card__img {
    width: 100%; height: 100%;
  }
  .distort-img-1 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  }
  .distort-img-2 {
    background: linear-gradient(135deg, #f5af19, #f12711 50%, #a80077 100%);
  }
  /* Grid overlay for visual texture */
  .distort-card__img::before {
    content: '';
    position: absolute; inset: 0;
    background:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 40px 40px; /* grid cell size */
  }
  .distort-card__label {
    position: absolute; bottom: 16px; left: 16px;
    color: #fff; font-size: 1.2rem; font-weight: 700;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    z-index: 2;
  }
  .distort-card__label small {
    display: block; font-size: 0.8rem; font-weight: 400; opacity: 0.7;
  }
  .hint {
    width: 100%; text-align: center;
    color: #555; font-size: 0.9rem;
  }
</style>
</head>
<body>
  <!-- SVG filter definition -->
  <svg style="position:absolute;width:0;height:0">
    <filter id="distortFilter">
      <feTurbulence id="turb" type="turbulence"
        baseFrequency="0.02" numOctaves="3"
        result="turbulence" seed="5" />
      <feDisplacementMap in="SourceGraphic" in2="turbulence"
        scale="0" xChannelSelector="R" yChannelSelector="G">
        <animate attributeName="scale"
          values="0;30;0" dur="0.8s"
          begin="indefinite" fill="freeze" id="distAnim" />
      </feDisplacementMap>
    </filter>
  </svg>

  <div class="distort-card" id="card1">
    <div class="distort-card__img distort-img-1"></div>
    <div class="distort-card__label">Liquid Waves<small>Hover to distort</small></div>
  </div>
  <div class="distort-card" id="card2">
    <div class="distort-card__img distort-img-2"></div>
    <div class="distort-card__label">Heat Haze<small>Hover to distort</small></div>
  </div>
  <p class="hint">Hover over the images</p>

  <script>
    const turb = document.getElementById('turb');
    const cards = document.querySelectorAll('.distort-card');
    let animId;

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        let seed = 1;
        /* Animate turbulence seed for varied distortion */
        animId = setInterval(() => {
          seed = (seed % 50) + 1;
          turb.setAttribute('seed', seed);
        }, 80); /* update every 80ms */
      });

      card.addEventListener('mouseleave', () => {
        clearInterval(animId);
        turb.setAttribute('seed', '5');
      });
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט עיוות תמונה עובד?</h4>
<p>האפקט משתמש בפילטרי SVG כדי ליצור עיוות "נוזלי" על התמונה כשהמשתמש מרחף עליה — בדומה לאפקט גלי חום או מים.</p>
<ul>
  <li><strong>feTurbulence:</strong> יוצר תבנית רעש פרקטלית. <code>baseFrequency</code> שולט בגודל הגלים — ערכים נמוכים = גלים רחבים וגדולים.</li>
  <li><strong>feDisplacementMap:</strong> לוקח כל פיקסל בתמונה ומזיז אותו לפי ערכי הצבע בתבנית הרעש. <code>scale</code> שולט בעוצמת העיוות.</li>
  <li><strong>seed משתנה:</strong> סקריפט JS משנה את ה-<code>seed</code> כל 80 מילישניות בזמן hover, מה שיוצר תבנית רעש חדשה ואפקט תנועה מתמשכת.</li>
  <li><strong>filter ב-CSS:</strong> <code>filter: url(#distortFilter)</code> מחבר את הפילטר SVG לאלמנט HTML רגיל — עובד על כל סוג תוכן.</li>
  <li><strong>Grid overlay:</strong> רשת דקה מעל התמונה עוזרת לראות את העיוות בצורה ברורה יותר.</li>
</ul>
<p>פילטרי SVG הם כלי רב-עוצמה שמאפשר אפקטים שלא ניתן להשיג עם CSS בלבד.</p>`,
    proTipHe: 'שלבו את האפקט עם transition על scale ב-hover כדי ליצור תחושה של תמונה שמתעוותת ומתגדלת בו-זמנית.',
  },

  // ─── 6. Image Gallery ─────────────────────────────────────────────────
  {
    id: 'imagegallery',
    title: 'Image Gallery',
    titleHe: 'גלריית תמונות',
    description: 'Masonry-style grid gallery with lightbox zoom effect on click.',
    descriptionHe: 'גלריית רשת בסגנון masonry עם אפקט זום לתיבת אור בלחיצה.',
    categories: ['media'],
    tags: [
      { label: 'gallery' },
      { label: 'masonry' },
      { label: 'lightbox' },
      { label: 'grid' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'imagegallery',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Image Gallery</title>
<!-- Image Gallery — masonry grid with lightbox zoom on click -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a0a; font-family: sans-serif;
    padding: 2rem;
  }
  h1 { color: #fff; text-align: center; margin-bottom: 2rem; font-size: 1.6rem; }
  .gallery {
    columns: 3;
    column-gap: 12px;
    max-width: 900px;
    margin: 0 auto;
  }
  .gallery-item {
    break-inside: avoid;
    margin-bottom: 12px;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .gallery-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  }
  .gallery-item__img {
    width: 100%; display: block;
  }
  /* Gradient image placeholders with varied heights */
  .gi-1 { background: linear-gradient(135deg, #667eea, #764ba2); height: 200px; }
  .gi-2 { background: linear-gradient(135deg, #f093fb, #f5576c); height: 280px; }
  .gi-3 { background: linear-gradient(135deg, #4facfe, #00f2fe); height: 180px; }
  .gi-4 { background: linear-gradient(135deg, #43e97b, #38f9d7); height: 240px; }
  .gi-5 { background: linear-gradient(135deg, #fa709a, #fee140); height: 200px; }
  .gi-6 { background: linear-gradient(135deg, #a18cd1, #fbc2eb); height: 260px; }
  .gi-7 { background: linear-gradient(135deg, #ffecd2, #fcb69f); height: 190px; }
  .gi-8 { background: linear-gradient(135deg, #89f7fe, #66a6ff); height: 220px; }
  .gi-9 { background: linear-gradient(135deg, #fddb92, #d1fdff); height: 250px; }

  /* Lightbox overlay */
  .lightbox {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.9);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .lightbox.active { opacity: 1; pointer-events: all; }
  .lightbox__content {
    width: 70vw; height: 70vh;
    border-radius: 16px;
    transform: scale(0.8);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .lightbox.active .lightbox__content {
    transform: scale(1);
  }
  .lightbox__close {
    position: absolute; top: 24px; right: 24px;
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,0.15); border: none;
    color: #fff; font-size: 1.4rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .lightbox__close:hover { background: rgba(255,255,255,0.3); }
</style>
</head>
<body>
  <h1>Gallery</h1>
  <div class="gallery" id="gallery">
    <div class="gallery-item" data-bg="linear-gradient(135deg, #667eea, #764ba2)"><div class="gallery-item__img gi-1"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #f093fb, #f5576c)"><div class="gallery-item__img gi-2"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #4facfe, #00f2fe)"><div class="gallery-item__img gi-3"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #43e97b, #38f9d7)"><div class="gallery-item__img gi-4"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #fa709a, #fee140)"><div class="gallery-item__img gi-5"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #a18cd1, #fbc2eb)"><div class="gallery-item__img gi-6"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #ffecd2, #fcb69f)"><div class="gallery-item__img gi-7"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #89f7fe, #66a6ff)"><div class="gallery-item__img gi-8"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #fddb92, #d1fdff)"><div class="gallery-item__img gi-9"></div></div>
  </div>

  <div class="lightbox" id="lightbox">
    <div class="lightbox__content" id="lbContent"></div>
    <button class="lightbox__close" id="lbClose">&times;</button>
  </div>

  <script>
    const lightbox = document.getElementById('lightbox');
    const lbContent = document.getElementById('lbContent');
    const lbClose = document.getElementById('lbClose');

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const bg = item.getAttribute('data-bg');
        lbContent.style.background = bg;
        lightbox.classList.add('active');
      });
    });

    lbClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('active');
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך גלריית התמונות עובדת?</h4>
<p>הגלרייה משלבת פריסת masonry עם CSS columns ותיבת אור (lightbox) שנפתחת בלחיצה על תמונה.</p>
<ul>
  <li><strong>CSS Columns:</strong> <code>columns: 3</code> יוצר פריסת masonry אוטומטית — הדפדפן ממלא 3 עמודות ומפזר את הפריטים ביניהן.</li>
  <li><strong>break-inside: avoid:</strong> מונע מפריט להישבר לשתי עמודות, מה שמבטיח שכל תמונה נשארת שלמה.</li>
  <li><strong>גבהים שונים:</strong> כל תמונה בגובה שונה, מה שיוצר את אפקט ה-masonry האופייני של Pinterest.</li>
  <li><strong>Lightbox:</strong> שכבה קבועה (<code>position: fixed</code>) עם <code>opacity: 0</code> שמוצגת בלחיצה עם transition חלק.</li>
  <li><strong>Scale animation:</strong> התמונה בתיבת האור מתחילה ב-<code>scale(0.8)</code> וגדלה ל-<code>scale(1)</code> ליצירת אפקט זום.</li>
  <li><strong>סגירה:</strong> ניתן לסגור בלחיצה על X, לחיצה על הרקע, או מקש Escape.</li>
</ul>
<p>שילוב CSS columns עם lightbox יוצר גלרייה מלאה ומרשימה בכמות מינימלית של קוד.</p>`,
    proTipHe: 'הוסיפו חצים לניווט בין תמונות בתוך ה-lightbox כדי ליצור חוויית גלרייה מלאה.',
  },

  // ─── 7. Lightbox ──────────────────────────────────────────────────────
  {
    id: 'lightbox',
    title: 'Lightbox',
    titleHe: 'תיבת אור',
    description: 'Click an image to open a fullscreen lightbox with smooth scale and fade transition.',
    descriptionHe: 'לחיצה על תמונה פותחת תיבת אור במסך מלא עם מעבר חלק של סקייל ושקיפות.',
    categories: ['media'],
    tags: [
      { label: 'lightbox' },
      { label: 'modal' },
      { label: 'image' },
      { label: 'fullscreen' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'lightbox',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Lightbox</title>
<!-- Lightbox — click image to open fullscreen with transition -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center; gap: 1.5rem;
    flex-wrap: wrap;
    background: #0a0a0a; font-family: sans-serif;
    padding: 2rem;
  }
  .thumb {
    width: 200px; height: 160px;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .thumb:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  }
  .thumb::after {
    content: '\\1F50D'; /* magnifier emoji */
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.3);
    font-size: 1.8rem;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .thumb:hover::after { opacity: 1; }
  .t1 { background: linear-gradient(135deg, #667eea, #764ba2); }
  .t2 { background: linear-gradient(135deg, #f093fb, #f5576c); }
  .t3 { background: linear-gradient(135deg, #4facfe, #00f2fe); }
  .t4 { background: linear-gradient(135deg, #43e97b, #38f9d7); }
  .t5 { background: linear-gradient(135deg, #fa709a, #fee140); }
  .t6 { background: linear-gradient(135deg, #a18cd1, #fbc2eb); }

  /* Lightbox */
  .lb-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.92);
    z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none;
    transition: opacity 0.35s ease;
  }
  .lb-overlay.open { opacity: 1; pointer-events: all; }
  .lb-img {
    width: 75vw; max-width: 800px;
    height: 60vh;
    border-radius: 16px;
    transform: scale(0.7) translateY(30px);
    transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .lb-overlay.open .lb-img {
    transform: scale(1) translateY(0);
  }
  .lb-close {
    position: absolute; top: 20px; right: 20px;
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: #fff; font-size: 1.5rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .lb-close:hover { background: rgba(255,255,255,0.25); }
  .lb-nav {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: #fff; font-size: 1.2rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .lb-nav:hover { background: rgba(255,255,255,0.25); }
  .lb-prev { left: 20px; }
  .lb-next { right: 20px; }
  .lb-counter {
    position: absolute; bottom: 20px; left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.5); font-size: 0.85rem;
  }
</style>
</head>
<body>
  <div class="thumb t1" data-idx="0"></div>
  <div class="thumb t2" data-idx="1"></div>
  <div class="thumb t3" data-idx="2"></div>
  <div class="thumb t4" data-idx="3"></div>
  <div class="thumb t5" data-idx="4"></div>
  <div class="thumb t6" data-idx="5"></div>

  <div class="lb-overlay" id="lbOverlay">
    <div class="lb-img" id="lbImg"></div>
    <button class="lb-close" id="lbClose">&times;</button>
    <button class="lb-nav lb-prev" id="lbPrev">&#8249;</button>
    <button class="lb-nav lb-next" id="lbNext">&#8250;</button>
    <span class="lb-counter" id="lbCounter"></span>
  </div>

  <script>
    const bgs = [
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #fa709a, #fee140)',
      'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    ];
    const overlay = document.getElementById('lbOverlay');
    const img = document.getElementById('lbImg');
    const counter = document.getElementById('lbCounter');
    let current = 0;

    function show(idx) {
      current = ((idx % bgs.length) + bgs.length) % bgs.length;
      img.style.background = bgs[current];
      counter.textContent = (current + 1) + ' / ' + bgs.length;
      overlay.classList.add('open');
    }
    function close() { overlay.classList.remove('open'); }

    document.querySelectorAll('.thumb').forEach(t => {
      t.addEventListener('click', () => show(parseInt(t.dataset.idx)));
    });
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', () => show(current - 1));
    document.getElementById('lbNext').addEventListener('click', () => show(current + 1));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט תיבת האור עובד?</h4>
<p>תיבת אור (Lightbox) היא רכיב UI קלאסי שמציג תמונה בגודל מלא מעל כל התוכן, עם אפשרות ניווט בין תמונות.</p>
<ul>
  <li><strong>שכבת overlay:</strong> <code>position: fixed</code> עם <code>inset: 0</code> יוצר שכבה שמכסה את כל המסך. <code>opacity</code> ו-<code>pointer-events</code> שולטים בנראות.</li>
  <li><strong>אנימציית כניסה:</strong> התמונה מתחילה ב-<code>scale(0.7)</code> עם <code>translateY(30px)</code> וגדלה ל-<code>scale(1)</code> — אפקט זום חלק מלמטה.</li>
  <li><strong>ניווט:</strong> חצים בצדדים מאפשרים לעבור בין תמונות. <code>modulo</code> מוודא שהניווט מעגלי — מהתמונה האחרונה חוזרים לראשונה.</li>
  <li><strong>מקלדת:</strong> מקשי חצים לניווט ו-Escape לסגירה הופכים את הרכיב לנגיש יותר.</li>
  <li><strong>סגירה:</strong> שלוש דרכים לסגירה — כפתור X, לחיצה על הרקע, או מקש Escape.</li>
  <li><strong>מונה:</strong> טקסט "2 / 6" בתחתית מראה למשתמש היכן הוא נמצא ברצף התמונות.</li>
</ul>
<p>תיבת אור טובה צריכה תמיד לתמוך בניווט מקלדת ובסגירה מרובת דרכים לחוויית משתמש מיטבית.</p>`,
    proTipHe: 'הוסיפו preload לתמונות הבאות והקודמות כדי שהניווט יהיה מיידי ובלי עיכובים.',
  },
];
