import type { Effect } from '@/types';

export const effectsBatch5Bg: Effect[] = [
  // ─── 1. Mesh Gradient ───────────────────────────────────────────────
  {
    id: 'meshgradient',
    title: 'Mesh Gradient',
    titleHe: 'גרדיאנט רשת',
    description: 'Animated multi-point mesh gradient background with flowing color blobs.',
    descriptionHe: 'רקע גרדיאנט רשת מונפש עם כתמי צבע זורמים בתנועה אורגנית.',
    categories: ['background'],
    tags: [
      { label: 'gradient' },
      { label: 'mesh' },
      { label: 'background' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'meshgradient',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Mesh Gradient — Animated multi-point mesh gradient using layered radial gradients -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Mesh Gradient</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #080808; overflow: hidden; }
  .mesh-container {
    position: relative;
    width: 100%; height: 100vh;
    overflow: hidden;
    background: #080808;
  }
  /* Each blob is a radial gradient circle */
  .mesh-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px); /* heavy blur for smooth blending */
    will-change: transform;
    mix-blend-mode: screen;
  }
  .blob-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #c8f53b 0%, transparent 70%);
    top: -10%; left: -5%;
    animation: drift1 8s ease-in-out infinite alternate;
  }
  .blob-2 {
    width: 450px; height: 450px;
    background: radial-gradient(circle, #ff3cac 0%, transparent 70%);
    top: 30%; right: -10%;
    animation: drift2 10s ease-in-out infinite alternate;
  }
  .blob-3 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #44aaff 0%, transparent 70%);
    bottom: -15%; left: 30%;
    animation: drift3 12s ease-in-out infinite alternate;
  }
  .blob-4 {
    width: 350px; height: 350px;
    background: radial-gradient(circle, #ff6b35 0%, transparent 70%);
    top: 50%; left: 10%;
    animation: drift4 9s ease-in-out infinite alternate;
  }
  @keyframes drift1 {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(30vw, 20vh) scale(1.2); }
  }
  @keyframes drift2 {
    0% { transform: translate(0, 0) scale(1.1); }
    100% { transform: translate(-25vw, 15vh) scale(0.9); }
  }
  @keyframes drift3 {
    0% { transform: translate(0, 0) scale(0.9); }
    100% { transform: translate(20vw, -25vh) scale(1.15); }
  }
  @keyframes drift4 {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-15vw, -20vh) scale(1.1); }
  }
  .content {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    z-index: 10; color: #fff; font-family: sans-serif;
    font-size: 2rem; font-weight: 700; text-shadow: 0 2px 20px rgba(0,0,0,0.5);
  }
</style>
</head>
<body>
  <div class="mesh-container">
    <div class="mesh-blob blob-1"></div>
    <div class="mesh-blob blob-2"></div>
    <div class="mesh-blob blob-3"></div>
    <div class="mesh-blob blob-4"></div>
    <div class="content">Mesh Gradient</div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך גרדיאנט הרשת עובד?</h4>
<p>אפקט גרדיאנט הרשת יוצר רקע צבעוני דינמי באמצעות שכבות של גרדיאנטים רדיאליים מטושטשים שזזים אחד ביחס לשני.</p>
<ul>
  <li><strong>כתמי צבע:</strong> כל <code>.mesh-blob</code> הוא עיגול עם <code>radial-gradient</code> שעובר מצבע מלא לשקוף. ארבעה כתמים בצבעים שונים יוצרים את האפקט.</li>
  <li><strong>טשטוש כבד:</strong> <code>filter: blur(80px)</code> מטשטש את הקצוות כדי שהכתמים יתמזגו בצורה חלקה.</li>
  <li><strong>מיזוג צבעים:</strong> <code>mix-blend-mode: screen</code> גורם לצבעים להתמזג בצורה אדטיבית — אזורי חפיפה נהיים בהירים יותר.</li>
  <li><strong>תנועה אורגנית:</strong> כל כתם נע באנימציה שונה עם <code>translate</code> ו-<code>scale</code> שמשתנים, מה שיוצר תנועה טבעית ולא מחזורית.</li>
  <li><strong>ביצועים:</strong> <code>will-change: transform</code> מבטיח שהדפדפן מכין את השכבות מראש להנפשה.</li>
</ul>
<p>שנו את הצבעים, מידות הטשטוש ומהירויות האנימציה כדי להתאים את הרקע למותג שלכם.</p>`,
    proTipHe: 'הוסיפו opacity נמוך (0.3-0.5) לכתמים לאפקט עדין יותר שלא מסיח תשומת לב מהתוכן.',
  },

  // ─── 2. Waves Background ────────────────────────────────────────────
  {
    id: 'wavesbg',
    title: 'Waves Background',
    titleHe: 'רקע גלים',
    description: 'SVG animated waves at bottom of section with layered parallax motion.',
    descriptionHe: 'גלים מונפשים ב-SVG בתחתית המקטע עם תנועת פרלקס שכבתית.',
    categories: ['background'],
    tags: [
      { label: 'waves' },
      { label: 'svg' },
      { label: 'background' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'wavesbg',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Waves Background — SVG animated waves with layered parallax motion -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Waves Background</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif; color: #f0f0f0;
  }
  .wave-section {
    position: relative; width: 100%; height: 100vh;
    overflow: hidden; background: linear-gradient(180deg, #0a0a0a 0%, #111 100%);
  }
  .wave-section h1 {
    position: absolute; top: 30%; width: 100%;
    text-align: center; font-size: 2.5rem; z-index: 10;
  }
  .waves {
    position: absolute; bottom: 0; left: 0; width: 100%; height: 200px;
  }
  .waves svg { width: 200%; height: 100%; }
  .wave-layer { animation: wave-scroll 8s linear infinite; }
  .wave-layer:nth-child(2) { animation-duration: 12s; animation-direction: reverse; opacity: 0.6; }
  .wave-layer:nth-child(3) { animation-duration: 16s; opacity: 0.3; }
  @keyframes wave-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); } /* scroll half since svg is 200% wide */
  }
</style>
</head>
<body>
  <div class="wave-section">
    <h1>Waves Background</h1>
    <div class="waves">
      <svg class="wave-layer" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path fill="rgba(200,245,59,0.15)" d="M0,100 C360,180 720,20 1080,100 C1260,140 1350,80 1440,100 L1440,200 L0,200Z
          M1440,100 C1800,180 2160,20 2520,100 C2700,140 2790,80 2880,100 L2880,200 L1440,200Z"/>
      </svg>
      <svg class="wave-layer" viewBox="0 0 1440 200" preserveAspectRatio="none" style="position:absolute;bottom:0;left:0;">
        <path fill="rgba(68,170,255,0.12)" d="M0,120 C240,40 480,180 720,100 C960,20 1200,160 1440,120 L1440,200 L0,200Z
          M1440,120 C1680,40 1920,180 2160,100 C2400,20 2640,160 2880,120 L2880,200 L1440,200Z"/>
      </svg>
      <svg class="wave-layer" viewBox="0 0 1440 200" preserveAspectRatio="none" style="position:absolute;bottom:0;left:0;">
        <path fill="rgba(255,60,172,0.08)" d="M0,140 C480,60 960,180 1440,140 L1440,200 L0,200Z
          M1440,140 C1920,60 2400,180 2880,140 L2880,200 L1440,200Z"/>
      </svg>
    </div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך רקע הגלים עובד?</h4>
<p>אפקט הגלים יוצר תנועה של גלי ים בתחתית המקטע באמצעות נתיבי SVG מונפשים בשכבות.</p>
<ul>
  <li><strong>נתיבי SVG:</strong> כל גל הוא <code>path</code> עם עקומות Bezier (<code>C</code>) שיוצרות צורת גל. הנתיב מכפיל את עצמו כדי ליצור לולאה חלקה.</li>
  <li><strong>רוחב כפול:</strong> ה-SVG ברוחב 200% ואנימציית <code>translateX(-50%)</code> יוצרת גלילה אינסופית ללא קפיצה.</li>
  <li><strong>שלוש שכבות:</strong> שלושה גלים בצבעים ושקיפויות שונות עם מהירויות אנימציה שונות (8, 12, 16 שניות) יוצרים עומק.</li>
  <li><strong>כיוונים מנוגדים:</strong> השכבה השנייה נעה בכיוון ההפוך (<code>animation-direction: reverse</code>) לאפקט טבעי יותר.</li>
</ul>
<p>אפקט קל לביצועים כי SVG מרונדר על ידי ה-GPU כאשר משתמשים ב-transform בלבד.</p>`,
    proTipHe: 'שנו את ערכי ה-path כדי לקבל גלים חדים יותר או רכים יותר. כלי כמו SVG Wave Generator יכולים לעזור.',
  },

  // ─── 3. Grid Lines ──────────────────────────────────────────────────
  {
    id: 'gridlines',
    title: 'Grid Lines',
    titleHe: 'קווי רשת',
    description: 'Animated perspective grid lines background with vanishing point.',
    descriptionHe: 'רקע קווי רשת מונפש עם פרספקטיבה ונקודת היעלמות.',
    categories: ['background'],
    tags: [
      { label: 'grid' },
      { label: 'perspective' },
      { label: 'background' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'gridlines',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Grid Lines — Animated perspective grid with scrolling lines and vanishing point -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Grid Lines</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #080808; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif;
  }
  .grid-container {
    position: relative; width: 100%; height: 100vh;
    perspective: 500px; /* depth of 3D effect */
    overflow: hidden;
  }
  .grid-plane {
    position: absolute; bottom: 0; left: -50%; width: 200%; height: 70%;
    transform: rotateX(60deg); /* tilt plane toward viewer */
    transform-origin: center bottom;
    background-image:
      repeating-linear-gradient(90deg, rgba(200,245,59,0.15) 0px, transparent 1px, transparent 60px),
      repeating-linear-gradient(0deg, rgba(200,245,59,0.15) 0px, transparent 1px, transparent 60px);
    background-size: 60px 60px; /* grid cell size */
    animation: grid-scroll 3s linear infinite;
  }
  @keyframes grid-scroll {
    0% { background-position: 0 0; }
    100% { background-position: 0 60px; } /* move by one cell */
  }
  .glow {
    position: absolute; bottom: 0; left: 50%; width: 600px; height: 200px;
    transform: translateX(-50%);
    background: radial-gradient(ellipse, rgba(200,245,59,0.2) 0%, transparent 70%);
    pointer-events: none;
  }
  .title {
    position: absolute; top: 15%; width: 100%; text-align: center;
    font-size: 2.5rem; font-weight: 700; color: #f0f0f0;
    text-shadow: 0 0 40px rgba(200,245,59,0.3);
    z-index: 10;
  }
</style>
</head>
<body>
  <div class="grid-container">
    <div class="grid-plane"></div>
    <div class="glow"></div>
    <div class="title">Grid Lines</div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך קווי הרשת עובדים?</h4>
<p>אפקט קווי הרשת יוצר מראה של משטח תלת-ממדי עם קווים נעים לכיוון הצופה, בסגנון רטרו-פיוצ'ריסטי.</p>
<ul>
  <li><strong>פרספקטיבה:</strong> <code>perspective: 500px</code> על הקונטיינר ו-<code>rotateX(60deg)</code> על המשטח יוצרים את אשליית העומק.</li>
  <li><strong>רשת CSS:</strong> שני <code>repeating-linear-gradient</code> ניצבים (אנכי ואופקי) יוצרים את קווי הרשת ברוחב 1px כל 60px.</li>
  <li><strong>אנימציית גלילה:</strong> <code>background-position</code> מונפש ב-60px (גודל תא אחד) ליצירת אשליה של תנועה קדימה.</li>
  <li><strong>זוהר:</strong> <code>radial-gradient</code> בתחתית יוצר אפקט זוהר בנקודת ההיעלמות שמוסיף עומק.</li>
  <li><strong>רוחב כפול:</strong> המשטח ברוחב 200% ומוזז שמאלה כדי למנוע קצוות נראים בזמן הסיבוב.</li>
</ul>
<p>אפקט קלאסי לדפי נחיתה בנושאי טכנולוגיה, משחקים ורטרו.</p>`,
    proTipHe: 'הוסיפו שכבת radial-gradient עם mask כדי שהרשת תדעך בהדרגה לכיוון האופק.',
  },

  // ─── 4. Dot Matrix ──────────────────────────────────────────────────
  {
    id: 'dotmatrix',
    title: 'Dot Matrix',
    titleHe: 'מטריצת נקודות',
    description: 'Dot grid that reacts to mouse proximity with scale and color changes.',
    descriptionHe: 'רשת נקודות שמגיבה לקרבת העכבר עם שינויי גודל וצבע.',
    categories: ['background', 'cursor'],
    tags: [
      { label: 'dots' },
      { label: 'interactive' },
      { label: 'cursor' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'dotmatrix',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Dot Matrix — Interactive dot grid reacting to mouse proximity -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Dot Matrix</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #080808; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  canvas { display: block; width: 100%; height: 100vh; }
</style>
</head>
<body>
  <canvas id="dots"></canvas>
  <script>
    const canvas = document.getElementById('dots');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const GAP = 28;        /* space between dots */
    const BASE_R = 2;      /* base dot radius */
    const MAX_R = 8;       /* max radius when near cursor */
    const INFLUENCE = 120;  /* cursor influence radius in px */
    let mouse = { x: -999, y: -999 };

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

    function draw() {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      for (let x = GAP; x < w; x += GAP) {
        for (let y = GAP; y < h; y += GAP) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - dist / INFLUENCE); /* 0-1 proximity */
          const r = BASE_R + (MAX_R - BASE_R) * t;
          const green = Math.round(245 * t + 85 * (1 - t));
          const red = Math.round(200 * t + 85 * (1 - t));
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = \`rgba(\${red},\${green},59,\${0.2 + 0.8 * t})\`;
          ctx.fill();
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
    explanationHe: `<h4>איך מטריצת הנקודות עובדת?</h4>
<p>אפקט אינטראקטיבי שבו רשת של נקודות מגיבה לקרבת הסמן — נקודות קרובות גדלות ומשנות צבע.</p>
<ul>
  <li><strong>Canvas Grid:</strong> לולאה כפולה מציירת נקודות כל <code>GAP</code> פיקסלים. Canvas יעיל הרבה יותר מ-DOM לאלפי אלמנטים.</li>
  <li><strong>חישוב מרחק:</strong> עבור כל נקודה מחשבים את המרחק מהסמן עם <code>Math.sqrt(dx*dx + dy*dy)</code>.</li>
  <li><strong>ערך קרבה:</strong> <code>t = 1 - dist/INFLUENCE</code> נותן ערך בין 0 ל-1 — ככל שהנקודה קרובה יותר, הערך גבוה יותר.</li>
  <li><strong>רדיוס דינמי:</strong> הרדיוס משתנה מ-<code>BASE_R</code> (2px) ל-<code>MAX_R</code> (8px) לפי ערך הקרבה.</li>
  <li><strong>צבע דינמי:</strong> הצבע עובר ממוט (אפור) לירוק בהיר ככל שהנקודה קרובה יותר לסמן.</li>
  <li><strong>devicePixelRatio:</strong> הכפלה ב-DPR מבטיחה חדות במסכי רטינה.</li>
</ul>`,
    proTipHe: 'הגבילו את טווח הלולאה רק לנקודות בתוך אזור ההשפעה של הסמן לשיפור ביצועים משמעותי ברזולוציות גבוהות.',
  },

  // ─── 5. Cloud Background ────────────────────────────────────────────
  {
    id: 'cloudbg',
    title: 'Cloud Background',
    titleHe: 'רקע עננים',
    description: 'Soft moving cloud shapes with blur for dreamy atmosphere.',
    descriptionHe: 'צורות ענן רכות נעות עם טשטוש ליצירת אווירה חלומית.',
    categories: ['background'],
    tags: [
      { label: 'clouds' },
      { label: 'blur' },
      { label: 'background' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'cloudbg',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Cloud Background — Soft moving cloud shapes with blur for dreamy look -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cloud Background</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0e1a; overflow: hidden;
    font-family: sans-serif;
  }
  .sky {
    position: relative; width: 100%; height: 100vh; overflow: hidden;
  }
  .cloud {
    position: absolute;
    background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08), transparent 70%);
    border-radius: 50%;
    filter: blur(40px); /* soften edges */
    will-change: transform;
  }
  .cloud-1 { width: 500px; height: 200px; top: 10%; left: -10%; animation: float-right 30s linear infinite; }
  .cloud-2 { width: 400px; height: 160px; top: 35%; left: -15%; animation: float-right 45s linear infinite; opacity: 0.7; }
  .cloud-3 { width: 600px; height: 220px; top: 55%; left: -20%; animation: float-right 35s linear infinite; opacity: 0.5; }
  .cloud-4 { width: 350px; height: 140px; top: 75%; left: -10%; animation: float-right 50s linear infinite; opacity: 0.4; }
  .cloud-5 { width: 450px; height: 180px; top: 20%; left: -15%; animation: float-right 40s linear infinite; opacity: 0.6; animation-delay: -20s; }
  @keyframes float-right {
    0%   { transform: translateX(0); }
    100% { transform: translateX(calc(100vw + 600px)); } /* fully off right edge */
  }
  .moon {
    position: absolute; top: 12%; right: 15%;
    width: 80px; height: 80px; border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #f0f0f0, #ccc);
    box-shadow: 0 0 60px rgba(255,255,255,0.2), 0 0 120px rgba(200,245,59,0.05);
  }
  .title {
    position: absolute; bottom: 15%; width: 100%; text-align: center;
    color: rgba(240,240,240,0.6); font-size: 1.5rem; z-index: 10;
  }
</style>
</head>
<body>
  <div class="sky">
    <div class="moon"></div>
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>
    <div class="cloud cloud-4"></div>
    <div class="cloud cloud-5"></div>
    <div class="title">Cloud Background</div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך רקע העננים עובד?</h4>
<p>אפקט חלומי של עננים רכים שצפים לאורך המסך, יוצר אווירה שלווה ואלגנטית.</p>
<ul>
  <li><strong>צורת ענן:</strong> כל ענן הוא <code>div</code> עם <code>radial-gradient</code> אליפטי שעובר מלבן חצי-שקוף לשקוף, עם <code>border-radius: 50%</code>.</li>
  <li><strong>טשטוש:</strong> <code>filter: blur(40px)</code> מרכך את הקצוות ויוצר מראה טבעי של ענן.</li>
  <li><strong>תנועה אינסופית:</strong> אנימציית <code>translateX</code> מזיזה כל ענן משמאל למסך ימינה. המרחק כולל את רוחב הענן כדי שלא ייחתך.</li>
  <li><strong>שכבות:</strong> חמישה עננים בגדלים, שקיפויות ומהירויות שונות (30-50 שניות) יוצרים עומק.</li>
  <li><strong>עיכוב:</strong> <code>animation-delay</code> שלילי מתחיל חלק מהעננים באמצע כדי שהמסך לא יהיה ריק בהתחלה.</li>
</ul>
<p>ניתן להוסיף כוכבים או ירח לשלמות האפקט הלילי.</p>`,
    proTipHe: 'הוסיפו box-shadow פנימי לעננים עם צבע כחלחל עדין לאפקט של אור ירח.',
  },

  // ─── 6. Raindrop ────────────────────────────────────────────────────
  {
    id: 'raindrop',
    title: 'Raindrop',
    titleHe: 'טיפות גשם',
    description: 'Canvas rain animation with falling drops and splash effect at bottom.',
    descriptionHe: 'אנימציית גשם על Canvas עם טיפות נופלות ואפקט מתיזה בתחתית.',
    categories: ['background'],
    tags: [
      { label: 'rain' },
      { label: 'canvas' },
      { label: 'particles' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'raindrop',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Raindrop — Canvas rain with falling drops and splash particles -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Raindrop</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #080a10; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100vh; }
</style>
</head>
<body>
  <canvas id="rain"></canvas>
  <script>
    const canvas = document.getElementById('rain');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const DROP_COUNT = 200;   /* number of raindrops */
    const SPLASH_LIFE = 12;   /* frames a splash lives */

    let W, H;
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    /* Rain drops */
    const drops = Array.from({ length: DROP_COUNT }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * -1000,
      speed: 4 + Math.random() * 6,   /* fall speed */
      len: 12 + Math.random() * 18,   /* streak length */
      opacity: 0.2 + Math.random() * 0.4,
    }));

    /* Splash particles */
    const splashes = [];

    function animate() {
      ctx.clearRect(0, 0, W, H);
      /* Draw drops */
      for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + 0.5, d.y + d.len); /* slight slant */
        ctx.strokeStyle = \`rgba(170,210,255,\${d.opacity})\`;
        ctx.lineWidth = 1;
        ctx.stroke();
        d.y += d.speed;
        if (d.y > H) {
          /* Create splash */
          for (let i = 0; i < 3; i++) {
            splashes.push({
              x: d.x, y: H,
              vx: (Math.random() - 0.5) * 2,
              vy: -1 - Math.random() * 2,
              life: SPLASH_LIFE,
            });
          }
          d.y = Math.random() * -200;
          d.x = Math.random() * W;
        }
      }
      /* Draw splashes */
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        const alpha = s.life / SPLASH_LIFE;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(170,210,255,\${alpha * 0.6})\`;
        ctx.fill();
        s.x += s.vx; s.y += s.vy; s.vy += 0.15; /* gravity */
        s.life--;
        if (s.life <= 0) splashes.splice(i, 1);
      }
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הגשם עובד?</h4>
<p>סימולציית גשם מלאה על Canvas עם טיפות נופלות ואפקט מתיזה כשהן פוגעות ב"קרקע".</p>
<ul>
  <li><strong>טיפות:</strong> 200 טיפות עם מהירויות שונות (4-10px לפריים) ואורכי פס שונים (12-30px). כל טיפה היא קו אנכי.</li>
  <li><strong>מתיזה:</strong> כשטיפה מגיעה לתחתית, נוצרים 3 חלקיקי מתיזה שנעים כלפי מעלה ולצדדים עם כוח משיכה (<code>vy += 0.15</code>).</li>
  <li><strong>מחזור חיים:</strong> כל מתיזה חיה <code>SPLASH_LIFE</code> פריימים (12) ודועכת בהדרגה. טיפות שיורדות מהמסך חוזרות למעלה במיקום אקראי.</li>
  <li><strong>devicePixelRatio:</strong> Canvas מוכפל ב-DPR לחדות מלאה במסכי רטינה.</li>
  <li><strong>ביצועים:</strong> ציור ישיר על Canvas הרבה יותר יעיל מ-DOM עבור מאות אלמנטים נעים.</li>
</ul>`,
    proTipHe: 'הוסיפו רוח באמצעות הזזת d.x קלה בכל פריים — זה נותן מראה גשם אלכסוני יותר ריאליסטי.',
  },

  // ─── 7. Fire Effect ─────────────────────────────────────────────────
  {
    id: 'fireeffect',
    title: 'Fire Effect',
    titleHe: 'אפקט אש',
    description: 'Canvas fire particles rising animation with glow and fade.',
    descriptionHe: 'אנימציית חלקיקי אש עולים על Canvas עם זוהר ודעיכה.',
    categories: ['background'],
    tags: [
      { label: 'fire' },
      { label: 'particles' },
      { label: 'canvas' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'fireeffect',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Fire Effect — Canvas fire particles rising with color fade from orange to transparent -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Fire Effect</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #080808; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100vh; }
</style>
</head>
<body>
  <canvas id="fire"></canvas>
  <script>
    const canvas = document.getElementById('fire');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const PARTICLE_COUNT = 120;

    let W, H;
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    function createParticle() {
      return {
        x: W / 2 + (Math.random() - 0.5) * 80,  /* spread from center */
        y: H,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -2 - Math.random() * 3,               /* upward speed */
        radius: 3 + Math.random() * 5,
        life: 1.0,                                 /* 1 = alive, 0 = dead */
        decay: 0.008 + Math.random() * 0.015,      /* fade speed */
      };
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

    function animate() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        /* Color transitions: white -> yellow -> orange -> red -> transparent */
        const r = 255;
        const g = Math.round(200 * p.life);    /* green fades first */
        const b = Math.round(50 * p.life * p.life); /* blue fades fast */
        const a = p.life;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(\${r},\${g},\${b},\${a})\`;
        ctx.shadowColor = \`rgba(255,\${g},0,\${a * 0.5})\`;
        ctx.shadowBlur = 15; /* glow effect */
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx + (Math.random() - 0.5) * 0.5; /* slight wobble */
        p.y += p.vy;
        p.vy *= 0.99;  /* slow down gradually */
        p.life -= p.decay;

        if (p.life <= 0) Object.assign(p, createParticle()); /* recycle */
      }
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט האש עובד?</h4>
<p>סימולציית אש על Canvas באמצעות חלקיקים שעולים מלמטה ומשנים צבע בזמן שהם דועכים.</p>
<ul>
  <li><strong>חלקיקים:</strong> 120 חלקיקים שנוצרים בתחתית המסך עם פיזור אופקי אקראי ומהירות עלייה בין 2-5px.</li>
  <li><strong>מעבר צבע:</strong> כל חלקיק עובר מלבן-צהוב (<code>life=1</code>) דרך כתום ואדום ונעלם (<code>life=0</code>) על ידי חישוב ערוצי R/G/B לפי מקדם החיים.</li>
  <li><strong>זוהר:</strong> <code>shadowColor</code> ו-<code>shadowBlur</code> יוצרים הילה כתומה סביב כל חלקיק.</li>
  <li><strong>תנועה טבעית:</strong> תזוזה אקראית קטנה (<code>wobble</code>) ב-X והאטה הדרגתית (<code>vy *= 0.99</code>) יוצרים תנועה אורגנית.</li>
  <li><strong>מיחזור:</strong> חלקיקים שדעכו לגמרי מתאפסים ומתחילים שוב מלמטה — לולאה אינסופית ללא הקצאות זיכרון חדשות.</li>
</ul>`,
    proTipHe: 'הוסיפו שכבה שנייה של חלקיקי עשן (אפור, איטיים יותר, גדולים יותר) מעל האש לריאליזם.',
  },

  // ─── 8. Holographic ─────────────────────────────────────────────────
  {
    id: 'holographic',
    title: 'Holographic',
    titleHe: 'הולוגרפי',
    description: 'Holographic shimmer on surface that reacts to hover position.',
    descriptionHe: 'אפקט הולוגרפי נוצץ על משטח שמגיב למיקום העכבר.',
    categories: ['background', 'hover'],
    tags: [
      { label: 'holographic' },
      { label: 'shimmer' },
      { label: 'hover' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'holographic',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Holographic — Shimmer surface with rainbow gradient that follows mouse -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Holographic</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #080808;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif;
  }
  .holo-card {
    position: relative; width: 320px; height: 200px;
    border-radius: 16px; overflow: hidden;
    background: #111; border: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
  }
  .holo-shimmer {
    position: absolute; inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255,0,0,0.15),
      rgba(255,165,0,0.15),
      rgba(255,255,0,0.15),
      rgba(0,255,0,0.15),
      rgba(0,255,255,0.15),
      rgba(0,0,255,0.15),
      rgba(128,0,255,0.15)
    );
    background-size: 300% 300%;
    mix-blend-mode: color-dodge;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .holo-card:hover .holo-shimmer { opacity: 1; }
  .holo-content {
    position: relative; z-index: 2; padding: 24px;
    color: #f0f0f0; height: 100%;
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  .holo-content h3 { font-size: 1.2rem; margin-bottom: 4px; }
  .holo-content p { font-size: 0.85rem; opacity: 0.6; }
</style>
</head>
<body>
  <div class="holo-card" id="card">
    <div class="holo-shimmer" id="shimmer"></div>
    <div class="holo-content">
      <h3>Holographic Card</h3>
      <p>Move your mouse across the card</p>
    </div>
  </div>
  <script>
    const card = document.getElementById('card');
    const shimmer = document.getElementById('shimmer');
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      /* Move gradient origin to follow cursor */
      shimmer.style.backgroundPosition = \`\${x}% \${y}%\`;
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך האפקט ההולוגרפי עובד?</h4>
<p>אפקט נוצץ כמו הולוגרמה על כרטיס שמגיב לתנועת העכבר, עם קשת צבעים שעוקבת אחרי הסמן.</p>
<ul>
  <li><strong>שכבת שימר:</strong> <code>.holo-shimmer</code> הוא שכבה שקופה עם <code>linear-gradient</code> של 7 צבעי קשת, כל אחד בשקיפות 15%.</li>
  <li><strong>גודל רקע:</strong> <code>background-size: 300% 300%</code> מגדיל את הגרדיאנט כך שניתן להזיז את המוקד שלו.</li>
  <li><strong>מיזוג צבע:</strong> <code>mix-blend-mode: color-dodge</code> יוצר אפקט של אור מוחזר — הצבעים מתגברים על הרקע הכהה.</li>
  <li><strong>מעקב אחר סמן:</strong> JavaScript מחשב את מיקום הסמן באחוזים ומעדכן את <code>backgroundPosition</code> בזמן אמת.</li>
  <li><strong>מעבר רך:</strong> <code>opacity</code> עם <code>transition</code> גורם לשימר להופיע בעדינות רק בזמן hover.</li>
</ul>`,
    proTipHe: 'הוסיפו transform: perspective(600px) rotateX/Y קל לפי מיקום הסמן ליצירת אפקט כרטיס תלת-ממדי מלא.',
  },

  // ─── 9. Constellations ──────────────────────────────────────────────
  {
    id: 'constellations',
    title: 'Constellations',
    titleHe: 'כוכבים',
    description: 'Twinkling star field with connecting constellation lines between nearby stars.',
    descriptionHe: 'שדה כוכבים מנצנצים עם קווי קבוצות כוכבים המחברים בין כוכבים קרובים.',
    categories: ['background'],
    tags: [
      { label: 'stars' },
      { label: 'constellations' },
      { label: 'canvas' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'constellations',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Constellations — Twinkling star field with connecting lines between nearby stars -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Constellations</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #050510; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100vh; }
</style>
</head>
<body>
  <canvas id="stars"></canvas>
  <script>
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const STAR_COUNT = 150;
    const LINE_DIST = 100;  /* max distance for constellation lines */

    let W, H;
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      radius: 0.5 + Math.random() * 1.5,
      twinkleSpeed: 0.01 + Math.random() * 0.03, /* radians per frame */
      phase: Math.random() * Math.PI * 2,         /* start at random phase */
    }));

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, W, H);
      frame++;

      /* Draw constellation lines first (behind stars) */
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            const alpha = (1 - dist / LINE_DIST) * 0.2;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = \`rgba(100,150,255,\${alpha})\`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* Draw twinkling stars */
      for (const s of stars) {
        const brightness = 0.4 + 0.6 * Math.abs(Math.sin(frame * s.twinkleSpeed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(200,220,255,\${brightness})\`;
        ctx.fill();
      }
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הכוכבים עובד?</h4>
<p>שמי לילה מלאי כוכבים מנצנצים עם קווים שמחברים כוכבים קרובים, כמו קבוצות כוכבים אמיתיות.</p>
<ul>
  <li><strong>כוכבים:</strong> 150 נקודות ברדיוס אקראי (0.5-2px) פזורות על ה-Canvas. כל כוכב שומר פאזה וקצב נצנוץ אקראיים.</li>
  <li><strong>נצנוץ:</strong> <code>Math.sin(frame * speed + phase)</code> יוצר נצנוץ חלק. הפאזה האקראית מבטיחה שכל כוכב מנצנץ עצמאית.</li>
  <li><strong>קווי חיבור:</strong> לולאה כפולה בודקת מרחק בין כל זוג כוכבים. אם קרובים מ-<code>LINE_DIST</code>, נמתח קו עם שקיפות יורדת לפי המרחק.</li>
  <li><strong>שכבות ציור:</strong> קווים מצוירים קודם ואז כוכבים מעליהם — כך הכוכבים תמיד בחזית.</li>
  <li><strong>צבעים:</strong> כוכבים בגוון כחול-לבן (<code>200,220,255</code>) וקווים בכחול כהה (<code>100,150,255</code>) לאפקט שמימי.</li>
</ul>`,
    proTipHe: 'הוסיפו כוכב שביט מדי פעם (חלקיק מהיר עם שובל דועך) כדי להפתיע את המשתמש.',
  },

  // ─── 10. Liquid Background ──────────────────────────────────────────
  {
    id: 'liquidbg',
    title: 'Liquid Background',
    titleHe: 'רקע נוזלי',
    description: 'SVG turbulence filter animated liquid background effect.',
    descriptionHe: 'אפקט רקע נוזלי מונפש באמצעות פילטר SVG turbulence.',
    categories: ['background'],
    tags: [
      { label: 'liquid' },
      { label: 'svg-filter' },
      { label: 'turbulence' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'liquidbg',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Liquid Background — SVG feTurbulence + feDisplacementMap for liquid distortion -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Liquid Background</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #080808; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif;
  }
  .liquid-container {
    position: relative; width: 100%; height: 100vh; overflow: hidden;
  }
  .liquid-bg {
    position: absolute; inset: -20px; /* overflow to hide edge artifacts */
    background: linear-gradient(135deg, #0a1628, #1a0a28, #0a2818, #1a1a0a);
    background-size: 400% 400%;
    animation: gradient-shift 10s ease infinite;
    filter: url(#liquid-filter);
  }
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 100% 0%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
  }
  .liquid-content {
    position: relative; z-index: 10; height: 100%;
    display: flex; align-items: center; justify-content: center;
    color: #f0f0f0; font-size: 2rem; font-weight: 700;
    text-shadow: 0 2px 20px rgba(0,0,0,0.8);
  }
  /* Blobs that get distorted by the filter */
  .liquid-blob {
    position: absolute; border-radius: 50%;
    filter: url(#liquid-filter);
  }
  .blob-a {
    width: 300px; height: 300px; top: 20%; left: 15%;
    background: radial-gradient(circle, rgba(68,170,255,0.3), transparent 70%);
    animation: drift-a 8s ease-in-out infinite alternate;
  }
  .blob-b {
    width: 250px; height: 250px; bottom: 20%; right: 15%;
    background: radial-gradient(circle, rgba(255,60,172,0.3), transparent 70%);
    animation: drift-b 10s ease-in-out infinite alternate;
  }
  @keyframes drift-a { 0% { transform: translate(0,0); } 100% { transform: translate(60px, 40px); } }
  @keyframes drift-b { 0% { transform: translate(0,0); } 100% { transform: translate(-50px, -30px); } }
</style>
</head>
<body>
  <!-- SVG filter definition -->
  <svg style="position:absolute;width:0;height:0;">
    <defs>
      <filter id="liquid-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="1" result="noise">
          <animate attributeName="seed" from="1" to="100" dur="10s" repeatCount="indefinite"/>
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
  </svg>
  <div class="liquid-container">
    <div class="liquid-bg"></div>
    <div class="liquid-blob blob-a"></div>
    <div class="liquid-blob blob-b"></div>
    <div class="liquid-content">Liquid Background</div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך הרקע הנוזלי עובד?</h4>
<p>אפקט נוזלי מתקדם שמעוות את הרקע בצורה אורגנית באמצעות פילטרי SVG — ללא WebGL.</p>
<ul>
  <li><strong>feTurbulence:</strong> יוצר טקסטורת רעש פרקטלי. <code>baseFrequency: 0.015</code> קובע את גודל הגלים — ערך נמוך = גלים גדולים ואיטיים.</li>
  <li><strong>feDisplacementMap:</strong> משתמש ברעש כדי להזיז פיקסלים מהרקע. <code>scale="40"</code> קובע את עוצמת העיוות בפיקסלים.</li>
  <li><strong>אנימציית seed:</strong> <code>animate</code> משנה את ה-<code>seed</code> של הרעש ברציפות, מה שיוצר תנועה נוזלית מתמשכת.</li>
  <li><strong>גרדיאנט נע:</strong> <code>background-size: 400%</code> עם אנימציית <code>background-position</code> יוצר שינויי צבע זורמים.</li>
  <li><strong>כתמי צבע:</strong> שני blobs נוספים עם אותו פילטר מתעוותים גם הם, ומוסיפים צבע ותנועה נוספת.</li>
  <li><strong>שוליים שליליים:</strong> <code>inset: -20px</code> מסתיר ארטיפקטים בקצוות שנוצרים מה-displacement.</li>
</ul>`,
    proTipHe: 'שנו את numOctaves ל-4 או 5 לטקסטורה מפורטת יותר, אבל זהירות מעלות הביצועים.',
  },

  // ─── 11. Scanlines ──────────────────────────────────────────────────
  {
    id: 'scanlines',
    title: 'Scanlines',
    titleHe: 'קווי סריקה',
    description: 'CRT monitor scanlines overlay effect with optional flicker.',
    descriptionHe: 'אפקט קווי סריקה של מסך CRT ישן עם הבהוב אופציונלי.',
    categories: ['background'],
    tags: [
      { label: 'scanlines' },
      { label: 'retro' },
      { label: 'crt' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'scanlines',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Scanlines — CRT monitor scanlines overlay with vignette and flicker -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scanlines</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Courier New', monospace;
  }
  .crt-screen {
    position: relative; width: 500px; height: 320px;
    background: #0a0a0a; border-radius: 12px; overflow: hidden;
    border: 2px solid #222;
  }
  .crt-content {
    position: relative; z-index: 1; padding: 40px;
    color: #33ff33; /* classic green terminal */
    font-size: 1rem; line-height: 1.8;
  }
  .crt-content h2 { font-size: 1.4rem; margin-bottom: 12px; color: #44ff44; }
  /* Scanlines overlay */
  .scanlines {
    position: absolute; inset: 0; pointer-events: none; z-index: 10;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,          /* visible line */
      rgba(0,0,0,0.3) 2px,
      rgba(0,0,0,0.3) 4px       /* dark line, 4px total period */
    );
  }
  /* CRT vignette — dark edges */
  .vignette {
    position: absolute; inset: 0; pointer-events: none; z-index: 11;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%);
  }
  /* Subtle flicker */
  .flicker {
    position: absolute; inset: 0; pointer-events: none; z-index: 12;
    animation: crt-flicker 0.1s infinite;
    opacity: 0.03;
    background: #fff;
  }
  @keyframes crt-flicker {
    0%, 100% { opacity: 0.03; }
    50% { opacity: 0.05; }
  }
</style>
</head>
<body>
  <div class="crt-screen">
    <div class="crt-content">
      <h2>> SYSTEM ONLINE</h2>
      <p>> Initializing display...</p>
      <p>> Scanlines enabled.</p>
      <p>> Vignette active.</p>
      <p>> Ready._</p>
    </div>
    <div class="scanlines"></div>
    <div class="vignette"></div>
    <div class="flicker"></div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט קווי הסריקה עובד?</h4>
<p>אפקט רטרו שמדמה מסך CRT ישן עם קווי סריקה, כהייה בקצוות והבהוב עדין.</p>
<ul>
  <li><strong>קווי סריקה:</strong> <code>repeating-linear-gradient</code> אנכי שמחליף בין שקוף (2px) לשחור חצי-שקוף (2px), יוצר פסים כל 4 פיקסלים.</li>
  <li><strong>וינייטה:</strong> <code>radial-gradient</code> אליפטי שעובר משקוף במרכז לכהה בקצוות, מדמה את העיוות של מסך קמור.</li>
  <li><strong>הבהוב:</strong> שכבה לבנה עם <code>opacity</code> נמוך מאוד (0.03-0.05) שמתחלפת ב-0.1 שניות — כמעט לא מורגשת אבל מוסיפה אותנטיות.</li>
  <li><strong>שכבות:</strong> כל אפקט הוא שכבה נפרדת עם <code>pointer-events: none</code> ו-<code>z-index</code> עולה, כך שלא חוסמים אינטראקציה.</li>
  <li><strong>צבע ירוק:</strong> טקסט <code>#33ff33</code> מדמה טרמינל ישן — קלאסיקה של מסכי CRT.</li>
</ul>`,
    proTipHe: 'הוסיפו text-shadow: 0 0 8px #33ff33 לטקסט כדי לדמות את הזוהר האופייני של פוספור ירוק.',
  },

  // ─── 12. Pixelate ───────────────────────────────────────────────────
  {
    id: 'pixelate',
    title: 'Pixelate',
    titleHe: 'פיקסלציה',
    description: 'Content pixelates and depixelates on hover using CSS scaling trick.',
    descriptionHe: 'תוכן מתפקסל ומתבהר בהובר באמצעות טריק CSS של הקטנה והגדלה.',
    categories: ['background', 'hover'],
    tags: [
      { label: 'pixelate' },
      { label: 'hover' },
      { label: 'image' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'pixelate',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Pixelate — CSS pixelation trick using image-rendering and scale transforms -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Pixelate</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #080808; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif;
  }
  .pixel-container {
    position: relative; width: 360px; height: 240px;
    border-radius: 12px; overflow: hidden; cursor: pointer;
  }
  .pixel-content {
    width: 100%; height: 100%;
    /* Gradient as sample content to pixelate */
    background: linear-gradient(135deg, #c8f53b, #44aaff, #ff3cac, #c8f53b);
    background-size: 200% 200%;
    animation: hue-shift 6s ease infinite;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 1.5rem; font-weight: 700;
    text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  }
  @keyframes hue-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  /* Pixelation overlay: tiny scaled-down version re-scaled up */
  .pixel-overlay {
    position: absolute; inset: 0;
    background: inherit;
    /* Step 1: shrink to tiny size */
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    background: linear-gradient(135deg, #c8f53b, #44aaff, #ff3cac, #c8f53b);
    background-size: 200% 200%;
    animation: hue-shift 6s ease infinite;
    /* Pixelation via SVG filter */
    filter: url(#pixelate-filter);
    transition: opacity 0.6s ease;
    opacity: 1;
  }
  .pixel-container:hover .pixel-overlay {
    opacity: 0; /* reveal clear content on hover */
  }
  .pixel-label {
    position: absolute; bottom: 12px; width: 100%; text-align: center;
    color: rgba(255,255,255,0.7); font-size: 0.8rem; z-index: 5;
  }
</style>
</head>
<body>
  <svg style="position:absolute;width:0;height:0;">
    <defs>
      <filter id="pixelate-filter">
        <!-- Shrink to 1/10th resolution then scale back up for pixel effect -->
        <feFlood x="4" y="4" width="2" height="2"/>
        <feComposite width="10" height="10"/>
        <feTile result="tiled"/>
        <feComposite in="SourceGraphic" in2="tiled" operator="in"/>
        <feMorphology operator="dilate" radius="5"/>
      </filter>
    </defs>
  </svg>
  <div class="pixel-container">
    <div class="pixel-content">HOVER ME</div>
    <div class="pixel-overlay"></div>
    <div class="pixel-label">Hover to reveal</div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הפיקסלציה עובד?</h4>
<p>אפקט שמציג תוכן מפוקסל ומגלה את התמונה/הרקע הברור בזמן hover.</p>
<ul>
  <li><strong>שכבת פיקסלציה:</strong> <code>.pixel-overlay</code> הוא עותק של הרקע עם פילטר SVG שיוצר אפקט של פיקסלים גדולים.</li>
  <li><strong>פילטר SVG:</strong> שילוב של <code>feComposite</code>, <code>feTile</code> ו-<code>feMorphology</code> שמצמצמים את הרזולוציה ומגדילים חזרה עם קצוות חדים.</li>
  <li><strong>image-rendering:</strong> <code>pixelated</code> מבטיח שההגדלה תהיה בקצוות חדים ולא מטושטשים.</li>
  <li><strong>מעבר רך:</strong> <code>transition: opacity 0.6s</code> מעלים את שכבת הפיקסלים בהדרגה בזמן hover, וחושף את התוכן הברור.</li>
  <li><strong>גרדיאנט מונפש:</strong> <code>background-position</code> מונפש כדי שגם המצב המפוקסל יהיה דינמי ומעניין.</li>
</ul>`,
    proTipHe: 'השתמשו באפקט הזה כמסך טעינה — התחילו מפוקסל ובהדרגה חשפו את התוכן כשהוא מוכן.',
  },
];
