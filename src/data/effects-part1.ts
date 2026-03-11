import type { Effect } from '@/types';

export const effectsPart1: Effect[] = [
  // ─── 1. Parallax Depth ────────────────────────────────────────────────
  {
    id: 'parallax',
    title: 'Parallax Depth',
    titleHe: 'Parallax עומק',
    description: 'Multi-layer parallax scrolling effect where background layers move at different speeds to create a sense of depth.',
    descriptionHe: 'אפקט גלילה בפרלקס רב-שכבתי שבו שכבות רקע נעות במהירויות שונות ליצירת תחושת עומק.',
    categories: ['scroll', 'background'],
    tags: [
      { label: 'scroll' },
      { label: 'parallax' },
      { label: 'layers' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'parallax',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Parallax Depth</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { height: 300vh; overflow-x: hidden; background: #0a0a0a; font-family: sans-serif; }
  .parallax-container { position: relative; height: 100vh; overflow: hidden; }
  .layer {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; font-weight: bold; color: #fff;
    will-change: transform;
  }
  .layer-1 {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    z-index: 1;
  }
  .layer-2 {
    background: radial-gradient(circle at 30% 50%, rgba(108, 99, 255, 0.35), transparent 60%);
    z-index: 2;
  }
  .layer-3 {
    z-index: 3;
  }
  .layer-3 span {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(6px);
    padding: 1.5rem 3rem;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.15);
  }
  .content {
    position: relative; z-index: 4;
    display: flex; align-items: center; justify-content: center;
    height: 100vh; color: #aaa; font-size: 1.2rem;
  }
</style>
</head>
<body>
  <div class="parallax-container" id="parallaxBox">
    <div class="layer layer-1">Background Layer</div>
    <div class="layer layer-2">Middle Layer</div>
    <div class="layer layer-3"><span>Foreground Layer</span></div>
  </div>
  <div class="content">Scroll up to see the parallax effect</div>
  <div class="content">Keep scrolling...</div>

  <script>
    const layers = document.querySelectorAll('.layer');
    const speeds = [0.1, 0.35, 0.7];

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      layers.forEach((layer, i) => {
        const yOffset = -(scrollY * speeds[i]);
        layer.style.transform = \`translateY(\${yOffset}px)\`;
      });
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הפרלקס עובד?</h4>
<p>פרלקס הוא אפקט ויזואלי שמדמה עומק על ידי הזזת שכבות שונות במהירויות שונות בזמן גלילה. ככל ששכבה "רחוקה" יותר, היא נעה לאט יותר.</p>
<ul>
  <li><strong>שלוש שכבות:</strong> כל שכבה ממוקמת עם <code>position: absolute</code> אחת על גבי השנייה באמצעות <code>z-index</code>.</li>
  <li><strong>מהירויות שונות:</strong> מערך <code>speeds</code> מגדיר את קצב התנועה — 0.1 לשכבת הרקע, 0.35 לאמצע ו-0.7 לחזית.</li>
  <li><strong>מאזין scroll:</strong> בכל אירוע גלילה מחשבים את ה-<code>translateY</code> לפי מיקום הגלילה כפול המהירות.</li>
  <li><strong>will-change:</strong> מוסיפים <code>will-change: transform</code> לשיפור ביצועים כי הדפדפן יודע מראש שהאלמנט ישתנה.</li>
</ul>
<p>השילוב של גרדיאנטים שונים בכל שכבה עם מהירויות תנועה שונות יוצר אשליית עומק תלת-ממדית מרשימה.</p>`,
    proTipHe: 'השתמשו ב-requestAnimationFrame במקום מאזין scroll ישיר כדי לשפר ביצועים באתרים כבדים.',
  },

  // ─── 2. Glitch Text ───────────────────────────────────────────────────
  {
    id: 'glitch',
    title: 'Glitch Text',
    titleHe: "גליץ' טקסט",
    description: 'A glitchy text animation using CSS clip-path and pseudo-elements that creates a digital distortion look.',
    descriptionHe: "אנימציית טקסט גליץ' באמצעות CSS clip-path ופסאודו-אלמנטים שיוצרת מראה של עיוות דיגיטלי.",
    categories: ['text'],
    tags: [
      { label: 'glitch' },
      { label: 'text' },
      { label: 'animation' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'glitch',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Glitch Text</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: 'Courier New', monospace;
  }
  .glitch {
    position: relative; font-size: 5rem; font-weight: 900;
    color: #fff; letter-spacing: 4px;
  }
  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    overflow: hidden;
  }
  .glitch::before {
    color: #0ff;
    animation: glitch-top 2s infinite linear alternate-reverse;
    clip-path: inset(0 0 65% 0);
  }
  .glitch::after {
    color: #f0f;
    animation: glitch-bottom 3s infinite linear alternate-reverse;
    clip-path: inset(60% 0 0 0);
  }
  @keyframes glitch-top {
    0%   { transform: translate(0); }
    20%  { transform: translate(-3px, 3px); }
    40%  { transform: translate(3px, -2px); }
    60%  { transform: translate(-2px, 1px); }
    80%  { transform: translate(2px, -3px); }
    100% { transform: translate(-1px, 2px); }
  }
  @keyframes glitch-bottom {
    0%   { transform: translate(0); }
    25%  { transform: translate(4px, -1px); }
    50%  { transform: translate(-3px, 2px); }
    75%  { transform: translate(2px, 1px); }
    100% { transform: translate(-4px, -2px); }
  }
  .scanlines {
    position: fixed; inset: 0; pointer-events: none; z-index: 10;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.08) 2px,
      rgba(0,0,0,0.08) 4px
    );
  }
</style>
</head>
<body>
  <div class="scanlines"></div>
  <div class="glitch" data-text="GLITCH">GLITCH</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הגליץ' עובד?</h4>
<p>אפקט הגליץ' מדמה תקלה דיגיטלית על ידי שכפול הטקסט באמצעות פסאודו-אלמנטים שזוזים בכיוונים שונים.</p>
<ul>
  <li><strong>פסאודו-אלמנטים:</strong> <code>::before</code> ו-<code>::after</code> משתמשים ב-<code>attr(data-text)</code> כדי לשכפל את הטקסט בצבעים שונים — ציאן ומגנטה.</li>
  <li><strong>clip-path:</strong> כל פסאודו-אלמנט חתוך עם <code>clip-path: inset()</code> כך שרק חלק מהטקסט נראה, מה שיוצר את אפקט הפיצול.</li>
  <li><strong>אנימציות:</strong> שתי אנימציות <code>@keyframes</code> שונות מזיזות את השכבות בכיוונים ובמהירויות שונות ליצירת אפקט הגליץ'.</li>
  <li><strong>קווי סריקה:</strong> שכבת <code>scanlines</code> עם <code>repeating-linear-gradient</code> מוסיפה אפקט של מסך ישן.</li>
</ul>
<p>השילוב של הצבעים, התנועה האקראית וקווי הסריקה יוצר אפקט גליץ' משכנע לחלוטין ב-CSS בלבד.</p>`,
    proTipHe: "שנו את ערכי ה-clip-path ואת קצב האנימציה כדי ליצור גליץ'ים עדינים יותר או אגרסיביים יותר.",
  },

  // ─── 3. Magnetic Button ───────────────────────────────────────────────
  {
    id: 'magnetic',
    title: 'Magnetic Button',
    titleHe: 'כפתור מגנטי',
    description: 'A button that follows the cursor with a magnetic pull effect when the mouse is nearby.',
    descriptionHe: 'כפתור שנמשך אחרי הסמן באפקט מגנטי כאשר העכבר בקרבת מקום.',
    categories: ['button', 'cursor'],
    tags: [
      { label: 'magnetic' },
      { label: 'button' },
      { label: 'cursor' },
      { label: 'hover' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'magnetic',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Magnetic Button</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .magnetic-wrap {
    position: relative; padding: 60px;
  }
  .magnetic-btn {
    position: relative;
    padding: 18px 48px;
    font-size: 1.1rem; font-weight: 600;
    color: #fff; background: transparent;
    border: 2px solid rgba(108, 99, 255, 0.7);
    border-radius: 50px; cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1),
                background 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;
  }
  .magnetic-btn:hover {
    background: rgba(108, 99, 255, 0.15);
    box-shadow: 0 0 30px rgba(108, 99, 255, 0.25);
  }
  .magnetic-btn span {
    display: inline-block;
    transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
</style>
</head>
<body>
  <div class="magnetic-wrap" id="wrap">
    <button class="magnetic-btn" id="btn">
      <span id="btnText">Hover Me</span>
    </button>
  </div>

  <script>
    const wrap = document.getElementById('wrap');
    const btn = document.getElementById('btn');
    const btnText = document.getElementById('btnText');
    const strength = 40;
    const textStrength = 20;

    wrap.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150;

      if (dist < maxDist) {
        const pull = 1 - dist / maxDist;
        btn.style.transform =
          \`translate(\${dx * pull * 0.4}px, \${dy * pull * 0.4}px)\`;
        btnText.style.transform =
          \`translate(\${dx * pull * 0.2}px, \${dy * pull * 0.2}px)\`;
      }
    });

    wrap.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btnText.style.transform = 'translate(0, 0)';
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך הכפתור המגנטי עובד?</h4>
<p>הכפתור המגנטי יוצר תחושה של משיכה פיזית — ככל שהסמן קרוב יותר לכפתור, הכפתור נמשך חזק יותר לכיוון הסמן.</p>
<ul>
  <li><strong>חישוב מרחק:</strong> בכל תנועת עכבר מחשבים את המרחק בין הסמן למרכז הכפתור באמצעות <code>Math.sqrt</code>.</li>
  <li><strong>עוצמת משיכה:</strong> כאשר המרחק קטן מ-<code>maxDist</code> (150px), מחשבים מקדם משיכה — ככל שהסמן קרוב יותר, המשיכה חזקה יותר.</li>
  <li><strong>שתי שכבות תנועה:</strong> הכפתור עצמו זז ב-40% מהמרחק, והטקסט הפנימי זז ב-20% — מה שיוצר תחושת עומק ותנועה טבעית.</li>
  <li><strong>חזרה חלקה:</strong> כשהעכבר עוזב, ה-<code>transition</code> עם <code>cubic-bezier</code> מחזיר את הכפתור בצורה חלקה למקומו.</li>
</ul>
<p>האפקט מתאים מצוין לכפתורי CTA כי הוא מזמין אינטראקציה ויוצר חוויה מישושית דיגיטלית.</p>`,
    proTipHe: 'הוסיפו אפקט scale קל ב-hover כדי להעצים את תחושת המגנטיות.',
  },

  // ─── 4. Aurora Background ─────────────────────────────────────────────
  {
    id: 'aurora',
    title: 'Aurora Background',
    titleHe: 'רקע אורורה',
    description: 'A dreamy aurora borealis background using animated CSS gradients with hue-rotate for continuous color shifts.',
    descriptionHe: 'רקע אורורה חלומי באמצעות גרדיאנטים מונפשים עם hue-rotate לשינויי צבע רציפים.',
    categories: ['background'],
    tags: [
      { label: 'aurora' },
      { label: 'gradient' },
      { label: 'background' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'aurora',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Aurora Background</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    background: #050510; font-family: sans-serif;
  }
  .aurora {
    position: fixed; inset: 0; z-index: 0;
    filter: blur(80px) saturate(1.5);
    animation: hueShift 12s ease-in-out infinite;
  }
  .aurora .blob {
    position: absolute; border-radius: 50%;
    animation: float 8s ease-in-out infinite;
  }
  .blob:nth-child(1) {
    width: 60vw; height: 60vh;
    top: -15%; left: -10%;
    background: radial-gradient(circle, rgba(0,255,128,0.4), transparent 70%);
    animation-duration: 10s;
  }
  .blob:nth-child(2) {
    width: 50vw; height: 50vh;
    top: 20%; right: -10%;
    background: radial-gradient(circle, rgba(80,120,255,0.4), transparent 70%);
    animation-duration: 14s;
    animation-delay: -3s;
  }
  .blob:nth-child(3) {
    width: 45vw; height: 45vh;
    bottom: -10%; left: 25%;
    background: radial-gradient(circle, rgba(200,50,255,0.35), transparent 70%);
    animation-duration: 12s;
    animation-delay: -5s;
  }
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%      { transform: translate(40px, -30px) scale(1.05); }
    66%      { transform: translate(-20px, 20px) scale(0.95); }
  }
  @keyframes hueShift {
    0%, 100% { filter: blur(80px) saturate(1.5) hue-rotate(0deg); }
    50%      { filter: blur(80px) saturate(1.8) hue-rotate(40deg); }
  }
  .content {
    position: relative; z-index: 1;
    color: #fff; text-align: center;
  }
  .content h1 { font-size: 3rem; margin-bottom: 0.5rem; }
  .content p  { opacity: 0.7; font-size: 1.1rem; }
</style>
</head>
<body>
  <div class="aurora">
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
  </div>
  <div class="content">
    <h1>Aurora</h1>
    <p>A dreamy animated background</p>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך רקע האורורה עובד?</h4>
<p>האפקט משתמש בשלושה "כתמי" גרדיאנט צבעוניים שנעים ומשנים גוון באופן רציף, כשהטשטוש הכבד ממזג אותם לתוצאה חלומית.</p>
<ul>
  <li><strong>שלושה Blobs:</strong> כל blob הוא <code>div</code> עגול עם <code>radial-gradient</code> בצבע שונה — ירוק, כחול וסגול.</li>
  <li><strong>טשטוש כבד:</strong> <code>filter: blur(80px)</code> על המכיל ממזג את הכתמים ליצירת מעבר צבעים חלק כמו אורורה אמיתית.</li>
  <li><strong>אנימציית float:</strong> כל blob זז בנתיב שונה עם <code>translate</code> ו-<code>scale</code> קל, ב-<code>animation-delay</code> שונה כדי שהתנועה תיראה אורגנית.</li>
  <li><strong>hue-rotate:</strong> אנימציית <code>hueShift</code> משנה את גוון הצבעים לאורך זמן כך שהצבעים מתחלפים ברציפות.</li>
</ul>
<p>הטריק המרכזי הוא הטשטוש הכבד — בלעדיו היינו רואים עיגולים נפרדים, ואיתו הכל מתמזג לאפקט אורורה קסום.</p>`,
    proTipHe: 'הוסיפו blob רביעי עם צבע חם כמו כתום כדי ליצור אורורה עשירה יותר.',
  },

  // ─── 5. Noise Glass Card ──────────────────────────────────────────────
  {
    id: 'noise',
    title: 'Noise Glass Card',
    titleHe: 'כרטיס noise זכוכית',
    description: 'A glass-morphism card with an SVG noise texture filter for a frosted, grainy aesthetic.',
    descriptionHe: 'כרטיס בסגנון זכוכית עם מסנן טקסטורת רעש SVG למראה חלבי ומגורען.',
    categories: ['card', 'background'],
    tags: [
      { label: 'glass' },
      { label: 'noise' },
      { label: 'card' },
      { label: 'frosted' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'noise',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Noise Glass Card</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    font-family: sans-serif;
  }
  .scene {
    position: relative;
    width: 380px;
  }
  .orb {
    position: absolute; border-radius: 50%; filter: blur(60px);
  }
  .orb-1 {
    width: 200px; height: 200px;
    background: rgba(108, 99, 255, 0.5);
    top: -60px; left: -40px;
  }
  .orb-2 {
    width: 160px; height: 160px;
    background: rgba(255, 80, 150, 0.4);
    bottom: -40px; right: -30px;
  }
  .glass-card {
    position: relative;
    padding: 2.5rem;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #fff;
    overflow: hidden;
  }
  .glass-card::before {
    content: '';
    position: absolute; inset: 0;
    filter: url(#noiseFilter);
    opacity: 0.08;
    pointer-events: none;
  }
  .glass-card h2 { font-size: 1.5rem; margin-bottom: 0.75rem; }
  .glass-card p  { font-size: 0.95rem; opacity: 0.8; line-height: 1.6; }
  .glass-card .badge {
    display: inline-block; margin-top: 1.2rem;
    padding: 6px 16px; border-radius: 20px;
    background: rgba(108, 99, 255, 0.25);
    border: 1px solid rgba(108, 99, 255, 0.4);
    font-size: 0.8rem;
  }
</style>
</head>
<body>
  <svg style="position:absolute;width:0;height:0">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.65"
        numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </svg>

  <div class="scene">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="glass-card">
      <h2>Glass Card</h2>
      <p>A frosted glass card with a subtle SVG noise texture overlay that gives it a real-world grainy feel.</p>
      <span class="badge">Glassmorphism</span>
    </div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך כרטיס הזכוכית עם הרעש עובד?</h4>
<p>האפקט משלב שני טריקים — <code>backdrop-filter: blur</code> ליצירת מראה זכוכית חלבית, ופילטר SVG <code>feTurbulence</code> להוספת טקסטורת רעש עדינה.</p>
<ul>
  <li><strong>Backdrop Blur:</strong> <code>backdrop-filter: blur(16px)</code> מטשטש את מה שמאחורי הכרטיס, ורקע שקוף חלקי (<code>rgba</code>) חושף את הטשטוש.</li>
  <li><strong>SVG Noise:</strong> פילטר <code>feTurbulence</code> מסוג <code>fractalNoise</code> יוצר תבנית רעש שנראית כמו גרגר של נייר או זכוכית אמיתית.</li>
  <li><strong>שכבת pseudo:</strong> ה-<code>::before</code> משתמש בפילטר הרעש עם <code>opacity: 0.08</code> כך שהטקסטורה עדינה ולא מסיחה.</li>
  <li><strong>כדורי צבע:</strong> שני <code>orb</code> מטושטשים מאחורי הכרטיס נותנים לו צבעים יפים שנראים דרך הזכוכית.</li>
</ul>
<p>הטריק לגלאסמורפיזם מוצלח הוא רקע צבעוני מאחורי הכרטיס — בלעדיו הטשטוש לא נראה.</p>`,
    proTipHe: 'הגדילו את baseFrequency של ה-feTurbulence כדי לקבל גרגר עדין יותר, או הקטינו אותו לטקסטורה גסה יותר.',
  },

  // ─── 6. Word Reveal ───────────────────────────────────────────────────
  {
    id: 'reveal',
    title: 'Word Reveal',
    titleHe: 'חשיפת מילים',
    description: 'Words reveal one by one as the user scrolls into view using IntersectionObserver.',
    descriptionHe: 'מילים נחשפות אחת אחת כאשר המשתמש גולל לאזור הנראה באמצעות IntersectionObserver.',
    categories: ['text', 'scroll'],
    tags: [
      { label: 'reveal' },
      { label: 'scroll' },
      { label: 'text' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'reveal',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Word Reveal</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 200vh; background: #0a0a0a;
    font-family: sans-serif; color: #fff;
  }
  .spacer {
    height: 60vh;
    display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.2rem;
  }
  .reveal-section {
    max-width: 700px; margin: 0 auto;
    padding: 4rem 2rem; line-height: 2.2;
  }
  .reveal-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    margin: 0 4px;
    font-size: 2rem; font-weight: 700;
  }
  .reveal-word.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
</head>
<body>
  <div class="spacer">Scroll down to reveal words</div>

  <div class="reveal-section" id="revealBox">
    <span class="reveal-word">Design</span>
    <span class="reveal-word">is</span>
    <span class="reveal-word">not</span>
    <span class="reveal-word">just</span>
    <span class="reveal-word">what</span>
    <span class="reveal-word">it</span>
    <span class="reveal-word">looks</span>
    <span class="reveal-word">like.</span>
    <span class="reveal-word">Design</span>
    <span class="reveal-word">is</span>
    <span class="reveal-word">how</span>
    <span class="reveal-word">it</span>
    <span class="reveal-word">works.</span>
  </div>

  <div class="spacer"></div>

  <script>
    const words = document.querySelectorAll('.reveal-word');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const idx = [...words].indexOf(el);
          setTimeout(() => {
            el.classList.add('visible');
          }, idx * 120);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    words.forEach(word => observer.observe(word));
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט חשיפת המילים עובד?</h4>
<p>כל מילה מוסתרת בתחילה ונחשפת בזו אחר זו כשהמשתמש גולל אליה, באמצעות <code>IntersectionObserver</code> ו-<code>setTimeout</code> מדורג.</p>
<ul>
  <li><strong>מצב התחלתי:</strong> כל מילה מתחילה עם <code>opacity: 0</code> ו-<code>translateY(20px)</code> — בלתי נראית ומעט למטה.</li>
  <li><strong>IntersectionObserver:</strong> עוקב אחרי כל מילה ומזהה מתי היא נכנסת לאזור הנראה (threshold של 20%).</li>
  <li><strong>השהייה מדורגת:</strong> <code>setTimeout</code> עם כפולה של אינדקס המילה (120ms לכל מילה) יוצר אפקט "גל" — מילה אחרי מילה.</li>
  <li><strong>unobserve:</strong> אחרי שמילה נחשפה, מפסיקים לעקוב אחריה כדי שהאנימציה לא תחזור על עצמה.</li>
</ul>
<p>הטרנזישן החלק של opacity ו-transform יחד יוצר תחושה אלגנטית של טקסט שנבנה מול העיניים.</p>`,
    proTipHe: 'נסו להחליף את translateY ב-translateX או scale כדי לקבל אפקטי כניסה שונים ומעניינים.',
  },

  // ─── 7. Spotlight Grid ────────────────────────────────────────────────
  {
    id: 'spotlight',
    title: 'Spotlight Grid',
    titleHe: 'Spotlight רשת',
    description: 'A grid where a radial gradient spotlight follows the mouse cursor to illuminate nearby cells.',
    descriptionHe: 'רשת שבה ספוטלייט גרדיאנט רדיאלי עוקב אחרי הסמן ומאיר את התאים הקרובים.',
    categories: ['background', 'cursor'],
    tags: [
      { label: 'spotlight' },
      { label: 'grid' },
      { label: 'cursor' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'spotlight',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Spotlight Grid</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #050508; font-family: sans-serif;
  }
  .grid-wrap {
    position: relative; padding: 1px;
    border-radius: 16px; overflow: hidden;
  }
  .grid-spotlight {
    position: absolute; inset: 0;
    pointer-events: none; z-index: 1;
    background: radial-gradient(
      300px circle at var(--x, 50%) var(--y, 50%),
      rgba(108, 99, 255, 0.15),
      transparent 70%
    );
    transition: opacity 0.3s;
    opacity: 0;
  }
  .grid-wrap:hover .grid-spotlight { opacity: 1; }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 140px);
    gap: 1px;
    background: rgba(255,255,255,0.06);
    border-radius: 16px; overflow: hidden;
    position: relative; z-index: 0;
  }
  .cell {
    height: 100px;
    background: #0c0c14;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.25); font-size: 0.8rem;
    transition: color 0.3s;
  }
  .grid-wrap:hover .cell { color: rgba(255,255,255,0.5); }
</style>
</head>
<body>
  <div class="grid-wrap" id="gridWrap">
    <div class="grid-spotlight" id="spotlight"></div>
    <div class="grid" id="grid"></div>
  </div>

  <script>
    const grid = document.getElementById('grid');
    const wrap = document.getElementById('gridWrap');
    const spot = document.getElementById('spotlight');

    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = \`\${String(i + 1).padStart(2, '0')}\`;
      grid.appendChild(cell);
    }

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      wrap.style.setProperty('--x', x + 'px');
      wrap.style.setProperty('--y', y + 'px');
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הספוטלייט על הרשת עובד?</h4>
<p>גרדיאנט רדיאלי שקוף למחצה עוקב אחרי מיקום הסמן ומאיר את אזור הרשת שמתחתיו, ויוצר אפקט פנס.</p>
<ul>
  <li><strong>CSS Variables:</strong> מיקום הספוטלייט מוגדר דרך <code>--x</code> ו-<code>--y</code> ב-<code>radial-gradient</code>, מה שמאפשר עדכון דינמי מ-JS.</li>
  <li><strong>שכבת spotlight:</strong> <code>div</code> שקוף עם <code>pointer-events: none</code> שיושב מעל הרשת ומציג את הגרדיאנט.</li>
  <li><strong>מאזין mousemove:</strong> בכל תנועת עכבר מחשבים את המיקום היחסי ומעדכנים את ה-CSS variables.</li>
  <li><strong>רשת עם gap:</strong> <code>gap: 1px</code> עם רקע בהיר יותר על המכיל יוצר קווי רשת דקים שהספוטלייט מדגיש.</li>
</ul>
<p>הספוטלייט מופיע רק ב-hover (opacity 0 ל-1) כך שהאפקט נקי ולא מציק כשהעכבר מחוץ לרשת.</p>`,
    proTipHe: 'שנו את גודל ה-radial-gradient (300px) ואת עוצמת הצבע כדי לשלוט בגודל ובהירות הספוטלייט.',
  },

  // ─── 8. Typewriter ────────────────────────────────────────────────────
  {
    id: 'typewriter',
    title: 'Typewriter',
    titleHe: 'מכונת כתיבה',
    description: 'A pure CSS typewriter animation using steps() timing and a blinking cursor made with border-right.',
    descriptionHe: 'אנימציית מכונת כתיבה ב-CSS בלבד עם פונקציית steps() וסמן מהבהב באמצעות border-right.',
    categories: ['text'],
    tags: [
      { label: 'typewriter' },
      { label: 'text' },
      { label: 'CSS-only' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'typewriter',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Typewriter</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 2rem;
    min-height: 100vh; background: #0a0a0a;
    font-family: 'Courier New', Courier, monospace;
  }
  .typewriter-line {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid rgba(108, 99, 255, 0.9);
    font-size: 2rem; color: #fff;
    width: 0;
    animation:
      typing 3s steps(28) 0.5s forwards,
      blink 0.6s step-end infinite;
  }
  .typewriter-line.line-2 {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.5);
    animation:
      typing2 2.5s steps(32) 4s forwards,
      blink 0.6s step-end infinite;
  }
  @keyframes typing {
    from { width: 0; }
    to   { width: 17ch; }
  }
  @keyframes typing2 {
    from { width: 0; }
    to   { width: 32ch; }
  }
  @keyframes blink {
    50% { border-color: transparent; }
  }
  .restart-btn {
    padding: 10px 24px;
    background: rgba(108, 99, 255, 0.15);
    border: 1px solid rgba(108, 99, 255, 0.4);
    border-radius: 8px; color: #fff;
    cursor: pointer; font-family: inherit;
    font-size: 0.9rem;
    transition: background 0.3s;
  }
  .restart-btn:hover {
    background: rgba(108, 99, 255, 0.3);
  }
</style>
</head>
<body>
  <div>
    <div class="typewriter-line" id="line1">Hello, I'm a coder.</div>
    <div class="typewriter-line line-2" id="line2">I build things for the web, daily.</div>
  </div>
  <button class="restart-btn" id="restartBtn">Restart</button>

  <script>
    const btn = document.getElementById('restartBtn');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');

    btn.addEventListener('click', () => {
      [line1, line2].forEach(el => {
        const clone = el.cloneNode(true);
        el.parentNode.replaceChild(clone, el);
      });
      /* re-assign after clone so next restart works */
      document.getElementById('restartBtn').addEventListener('click', arguments.callee);
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אנימציית מכונת הכתיבה עובדת?</h4>
<p>האפקט משתמש בטריק CSS פשוט אבל חזק — הרחבת רוחב אלמנט מ-0 עם <code>steps()</code> כך שכל "צעד" חושף תו נוסף.</p>
<ul>
  <li><strong>overflow: hidden:</strong> הטקסט קיים כבר ב-DOM, אבל <code>overflow: hidden</code> עם <code>white-space: nowrap</code> מסתיר אותו.</li>
  <li><strong>steps() timing:</strong> פונקציית <code>steps(28)</code> מחלקת את האנימציה ל-28 צעדים בדיוק (כמספר התווים), כך שכל צעד חושף תו אחד.</li>
  <li><strong>יחידת ch:</strong> רוחב היעד מוגדר ב-<code>ch</code> — יחידה שמייצגת את רוחב התו "0" בפונט, מושלם לפונטים monospace.</li>
  <li><strong>סמן מהבהב:</strong> <code>border-right</code> עם אנימציית <code>blink</code> שמחליפה את הצבע ל-transparent כל 50% יוצר סמן קלאסי.</li>
</ul>
<p>השורה השנייה מתחילה עם <code>animation-delay</code> כך שהיא ממתינה לסיום השורה הראשונה.</p>`,
    proTipHe: 'כדי שהאפקט יעבוד מושלם, ודאו שמספר ה-steps() תואם בדיוק למספר התווים בטקסט.',
  },

  // ─── 9. Liquid Buttons ────────────────────────────────────────────────
  {
    id: 'liquid',
    title: 'Liquid Buttons',
    titleHe: 'כפתורים נוזליים',
    description: 'Buttons with an SVG liquid morph effect on hover using feTurbulence and feDisplacementMap filters.',
    descriptionHe: 'כפתורים עם אפקט עיוות נוזלי ב-hover באמצעות פילטרים של feTurbulence ו-feDisplacementMap ב-SVG.',
    categories: ['button'],
    tags: [
      { label: 'liquid' },
      { label: 'SVG filter' },
      { label: 'button' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'liquid',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Liquid Buttons</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    gap: 2rem; flex-wrap: wrap;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .liquid-btn {
    position: relative;
    padding: 16px 42px;
    font-size: 1.1rem; font-weight: 600;
    color: #fff; border: none; cursor: pointer;
    border-radius: 50px;
    transition: filter 0.3s ease, transform 0.2s ease;
    will-change: filter;
  }
  .liquid-btn:hover {
    filter: url(#liquid);
    transform: scale(1.05);
  }
  .liquid-btn:active {
    transform: scale(0.97);
  }
  .btn-purple { background: linear-gradient(135deg, #6c63ff, #8b5cf6); }
  .btn-pink   { background: linear-gradient(135deg, #ec4899, #f43f5e); }
  .btn-cyan   { background: linear-gradient(135deg, #06b6d4, #0891b2); }

  .label {
    width: 100%; text-align: center;
    color: #555; font-size: 0.85rem;
    margin-top: -0.5rem;
  }
</style>
</head>
<body>
  <svg style="position:absolute;width:0;height:0">
    <filter id="liquid">
      <feTurbulence type="turbulence" baseFrequency="0.015"
        numOctaves="3" result="turbulence" seed="2">
        <animate attributeName="baseFrequency"
          dur="1.5s" values="0.015;0.04;0.015"
          repeatCount="indefinite" />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="turbulence"
        scale="14" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>

  <button class="liquid-btn btn-purple">Explore</button>
  <button class="liquid-btn btn-pink">Subscribe</button>
  <button class="liquid-btn btn-cyan">Download</button>
  <p class="label">Hover over the buttons</p>

  <script>
    /* Optional: animate seed for varied turbulence */
    const turb = document.querySelector('feTurbulence');
    let seed = 2;
    setInterval(() => {
      seed = (seed % 100) + 1;
      turb.setAttribute('seed', seed);
    }, 200);
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הכפתורים הנוזליים עובד?</h4>
<p>האפקט משתמש בפילטרי SVG — <code>feTurbulence</code> יוצר תבנית רעש, ו-<code>feDisplacementMap</code> משתמש בתבנית הזו כדי לעוות את הכפתור כאילו הוא נוזלי.</p>
<ul>
  <li><strong>feTurbulence:</strong> יוצר תבנית רעש פרקטלית. ה-<code>baseFrequency</code> שולט ברמת הפירוט — ערכים נמוכים יוצרים גלים רחבים.</li>
  <li><strong>feDisplacementMap:</strong> לוקח כל פיקסל בכפתור ומזיז אותו לפי ערכי הצבע בתבנית הרעש, מה שיוצר עיוות נוזלי.</li>
  <li><strong>animate:</strong> אלמנט <code>animate</code> ב-SVG משנה את <code>baseFrequency</code> לאורך זמן כך שהעיוות זזה כמו נוזל.</li>
  <li><strong>seed משתנה:</strong> סקריפט קטן משנה את ה-<code>seed</code> כל 200ms כדי שהתבנית תהיה שונה בכל פעם ולא חוזרת על עצמה.</li>
</ul>
<p>האפקט מופעל רק ב-hover דרך <code>filter: url(#liquid)</code>, כך שהכפתור נראה רגיל עד שמרחפים עליו.</p>`,
    proTipHe: 'שנו את scale ב-feDisplacementMap כדי לשלוט בעוצמת העיוות — ערכים גבוהים יותר יוצרים אפקט דרמטי יותר.',
  },

  // ─── 10. Scroll Ring ──────────────────────────────────────────────────
  {
    id: 'scrollring',
    title: 'Scroll Ring',
    titleHe: 'טבעת גלילה',
    description: 'An SVG circle whose stroke fills progressively based on the scroll percentage of the page.',
    descriptionHe: 'מעגל SVG שהקו שלו מתמלא בהדרגה בהתאם לאחוז הגלילה בעמוד.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'SVG' },
      { label: 'progress' },
      { label: 'ring' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'scrollring',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Ring</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 400vh;
    background: #0a0a0a; font-family: sans-serif;
  }
  .ring-container {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 100;
    width: 72px; height: 72px;
  }
  .ring-svg {
    transform: rotate(-90deg);
    width: 72px; height: 72px;
  }
  .ring-bg {
    fill: none;
    stroke: rgba(255,255,255,0.08);
    stroke-width: 4;
  }
  .ring-progress {
    fill: none;
    stroke: url(#ringGrad);
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 188.5;
    stroke-dashoffset: 188.5;
    transition: stroke-dashoffset 0.15s ease-out;
  }
  .ring-label {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 0.8rem; font-weight: 600;
  }
  .sections { padding: 2rem; }
  .sections section {
    max-width: 600px; margin: 0 auto 60vh;
    padding: 2rem; color: #ccc;
    border-left: 2px solid rgba(108,99,255,0.3);
    padding-left: 1.5rem;
  }
  .sections h2 { color: #fff; margin-bottom: 0.5rem; font-size: 1.3rem; }
  .sections p  { line-height: 1.7; opacity: 0.7; }
</style>
</head>
<body>
  <div class="ring-container">
    <svg class="ring-svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6c63ff" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>
      </defs>
      <circle class="ring-bg" cx="32" cy="32" r="30" />
      <circle class="ring-progress" id="ringCircle" cx="32" cy="32" r="30" />
    </svg>
    <div class="ring-label" id="ringLabel">0%</div>
  </div>

  <div class="sections">
    <section><h2>Section 1</h2><p>Scroll down to watch the ring fill up. The stroke-dashoffset of the SVG circle is driven by the scroll percentage.</p></section>
    <section><h2>Section 2</h2><p>The circle has a circumference calculated from its radius. As you scroll, the dashoffset decreases to reveal more of the stroke.</p></section>
    <section><h2>Section 3</h2><p>A linear gradient gives the stroke a nice purple hue that transitions from indigo to violet.</p></section>
    <section><h2>Section 4</h2><p>Keep going — you're almost at 100 percent!</p></section>
  </div>

  <script>
    const circle = document.getElementById('ringCircle');
    const label = document.getElementById('ringLabel');
    const circumference = 2 * Math.PI * 30; /* ~188.5 */

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(scrollTop / docHeight, 1);

      circle.style.strokeDashoffset = circumference * (1 - pct);
      label.textContent = Math.round(pct * 100) + '%';
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך טבעת הגלילה עובדת?</h4>
<p>מעגל SVG עם <code>stroke-dasharray</code> ו-<code>stroke-dashoffset</code> מאפשר לשלוט בכמה מהקו נראה — בדיוק כמו מד התקדמות מעגלי.</p>
<ul>
  <li><strong>חישוב היקף:</strong> ההיקף מחושב לפי הנוסחה <code>2 * PI * r</code> (רדיוס 30 = היקף ~188.5). זהו אורך הקו המלא.</li>
  <li><strong>stroke-dasharray:</strong> מגדיר את אורך ה-"מקף" להיקף המלא — כך יש מקף אחד ארוך שמקיף את כל המעגל.</li>
  <li><strong>stroke-dashoffset:</strong> מזיז את תחילת המקף — כשהערך שווה להיקף, הקו מוסתר לחלוטין. כשהוא 0, הקו נראה במלואו.</li>
  <li><strong>אחוז גלילה:</strong> <code>scrollY / (scrollHeight - innerHeight)</code> נותן אחוז בין 0 ל-1. מכפילים אותו בהיקף כדי לעדכן את ה-offset.</li>
</ul>
<p>הטבעת ממוקמת ב-<code>position: fixed</code> בפינה הימנית-תחתונה ותמיד נראית, מה שנותן למשתמש אינדיקציה ויזואלית יפה של מיקום הגלילה.</p>`,
    proTipHe: 'הוסיפו rotate(-90deg) על ה-SVG כדי שהמילוי יתחיל מלמעלה ולא מהצד הימני.',
  },
];
