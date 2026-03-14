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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה ארבעה כתמי צבע גדולים ומטושטשים שמרחפים על רקע כהה. כל כתם הוא עיגול עם גרדיאנט שנמוג לשקוף, והטשטוש הכבד גורם להם להתמזג אחד עם השני בצורה חלקה. התנועה נראית טבעית כי כל כתם זז במסלול אחר ובמהירות שונה, וכשהצבעים נפגשים הם מתערבבים ויוצרים גוונים חדשים.</p>`,
    proTipHe: 'הוסיפו opacity נמוך (0.3-0.5) לכתמים לאפקט עדין יותר שלא מסיח תשומת לב מהתוכן.',
    promptHe: 'אני רוצה רקע של גרדיאנט רשת (Mesh Gradient) — כתמי צבע גדולים ומטושטשים שמרחפים ומתמזגים על רקע כהה. לפני שאתה כותב קוד, תשאל אותי: אילו צבעים אני רוצה לכתמים? כמה כתמים? באיזו מהירות הם יזוזו? כמה חזק הטשטוש? האם הרקע לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>בתחתית המסך יש שלושה גלים מונפשים שנעים כל אחד בכיוון ובמהירות אחרים, וזה יוצר תחושה של ים. כל גל הוא נתיב SVG ברוחב כפול מהמסך שגולל את עצמו בלופ אינסופי, ככה שאין קפיצה. שלוש השכבות בשקיפויות שונות נותנות תחושת עומק.</p>`,
    proTipHe: 'שנו את ערכי ה-path כדי לקבל גלים חדים יותר או רכים יותר. כלי כמו SVG Wave Generator יכולים לעזור.',
    promptHe: 'אני רוצה רקע עם גלים מונפשים (Waves Background) בתחתית העמוד, בסגנון גלי ים עדינים שנעים לצדדים. לפני שאתה כותב קוד, תשאל אותי: אילו צבעים לגלים? כמה שכבות של גלים? באיזו מהירות הם יזוזו? כמה גבוהים הגלים? מה צבע הרקע מאחוריהם? האם הגלים בתחתית העמוד או במקום אחר? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>זה משטח רשת שנראה תלת-ממדי, כאילו אתם מסתכלים על רצפה עם קווים שרצה לכיוונכם. הטריק הוא הטיית המשטח עם פרספקטיבה כדי ליצור עומק, בזמן שהרקע של הקווים זז כלפי מטה בלופ. זוהר עדין בתחתית מוסיף תחושה של נקודת היעלמות באופק.</p>`,
    proTipHe: 'הוסיפו שכבת radial-gradient עם mask כדי שהרשת תדעך בהדרגה לכיוון האופק.',
    promptHe: 'אני רוצה רקע של קווי רשת בפרספקטיבה (Grid Lines) שנראה תלת-ממדי, בסגנון רטרו-פיוצ\'ריסטי עם קווים שזזים קדימה. לפני שאתה כותב קוד, תשאל אותי: איזה צבע לקווים? מה גודל המשבצות? באיזו מהירות הקווים זזים? האם להוסיף זוהר בנקודת ההיעלמות? מה צבע הרקע? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כל המסך מלא ברשת של נקודות קטנות, וכשמזיזים את העכבר הנקודות הקרובות אליו גדלות ומשנות צבע. ככל שהנקודה קרובה יותר לסמן היא יותר גדולה ובוהקת, וככל שהיא רחוקה היא חוזרת להיות קטנה ומעומעמת. הכל מצויר על Canvas כי זה הרבה יותר יעיל מאלפי אלמנטים ב-HTML.</p>`,
    proTipHe: 'הגבילו את טווח הלולאה רק לנקודות בתוך אזור ההשפעה של הסמן לשיפור ביצועים משמעותי ברזולוציות גבוהות.',
    promptHe: 'אני רוצה רקע של מטריצת נקודות (Dot Matrix) אינטראקטיבית — רשת נקודות שמגיבה לתנועת העכבר עם שינויי גודל וצבע. לפני שאתה כותב קוד, תשאל אותי: איזה צבע לנקודות? מה הגודל הבסיסי ומה הגודל המקסימלי? כמה צפופה הרשת? מה רדיוס ההשפעה של העכבר? מה צבע הרקע? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>על רקע שמיים כהים צפים עננים רכים ומטושטשים משמאל לימין. כל ענן הוא בעצם אליפסה עם גרדיאנט לבן שדועך וטשטוש חזק שנותן לו מראה טבעי. חמישה עננים בגדלים ומהירויות שונות יוצרים תחושת עומק, וחלקם מתחילים באמצע האנימציה כדי שהמסך לא יהיה ריק בהתחלה.</p>`,
    proTipHe: 'הוסיפו box-shadow פנימי לעננים עם צבע כחלחל עדין לאפקט של אור ירח.',
    promptHe: 'אני רוצה רקע עם עננים צפים (Cloud Background) — עננים רכים ומטושטשים שנעים לאט על רקע שמיים כהים. לפני שאתה כותב קוד, תשאל אותי: מה צבע השמיים? מה צבע העננים ומה רמת השקיפות? כמה עננים? באיזו מהירות הם צפים? האם להוסיף ירח או כוכבים? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>סימולציית גשם על Canvas — מאתיים טיפות נופלות מלמעלה למטה במהירויות שונות, וכשטיפה פוגעת בתחתית המסך נוצרים חלקיקי מתיזה קטנים שעפים הצידה ולמעלה. הטיפות שיורדות מהמסך חוזרות למעלה במיקום אקראי, ככה שהגשם לעולם לא נגמר. הכל מצויר על Canvas כי זה הרבה יותר יעיל מאות אלמנטים נעים ב-HTML.</p>`,
    proTipHe: 'הוסיפו רוח באמצעות הזזת d.x קלה בכל פריים — זה נותן מראה גשם אלכסוני יותר ריאליסטי.',
    promptHe: 'אני רוצה רקע עם אפקט גשם (Raindrop) — טיפות גשם שנופלות עם אפקט מתיזה כשהן פוגעות בתחתית. לפני שאתה כותב קוד, תשאל אותי: כמה טיפות? באיזו מהירות הן נופלות? מה צבע הטיפות? האם להוסיף רוח (גשם אלכסוני)? מה עוצמת המתיזה? מה צבע הרקע? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>חלקיקים עולים מתחתית המסך ומדמים להבות אש. כל חלקיק מתחיל צהוב-לבן, עובר לכתום ואדום, ולבסוף דועך ונעלם. יש להם תזוזה קטנה הצידה שנותנת תנועה ריאלית של אש, וזוהר סביב כל חלקיק. כשחלקיק דועך לגמרי הוא מתחיל מחדש מלמטה, ככה שהאש לעולם לא נכבית.</p>`,
    proTipHe: 'הוסיפו שכבה שנייה של חלקיקי עשן (אפור, איטיים יותר, גדולים יותר) מעל האש לריאליזם.',
    promptHe: 'אני רוצה רקע עם אפקט אש (Fire Effect) — חלקיקי אש שעולים מלמטה עם מעבר צבעים מצהוב לאדום וזוהר. לפני שאתה כותב קוד, תשאל אותי: כמה חלקיקים? באיזו מהירות הם עולים? מאיפה האש יוצאת (מרכז, תחתית, מנקודה מסוימת)? מה טווח הצבעים? האם להוסיף עשן? מה צבע הרקע? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כרטיס עם שכבת קשת צבעים שקופה מעליו שנראית רק כשמעבירים עליו את העכבר. הקשת זזה בעקבות הסמן, מה שיוצר אפקט של הולוגרמה נוצצת. הצבעים מתערבבים עם הרקע הכהה בצורה שגורמת להם להיראות כמו אור מוחזר, ממש כמו כרטיס הולוגרפי אמיתי.</p>`,
    proTipHe: 'הוסיפו transform: perspective(600px) rotateX/Y קל לפי מיקום הסמן ליצירת אפקט כרטיס תלת-ממדי מלא.',
    promptHe: 'אני רוצה אפקט הולוגרפי (Holographic) על כרטיס או אלמנט — קשת צבעים נוצצת שעוקבת אחרי העכבר. לפני שאתה כותב קוד, תשאל אותי: מה גודל האלמנט? אילו צבעים בקשת? כמה חזק האפקט? האם להוסיף גם הטיה תלת-ממדית? מה צבע הרקע של הכרטיס? האם האפקט רק בהובר או תמיד פעיל? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>שמיים מלאים בכוכבים מנצנצים, וכשכוכבים קרובים מספיק אחד לשני נמתח ביניהם קו עדין שיוצר צורה של קבוצת כוכבים. כל כוכב מנצנץ בקצב אחר שנותן תחושה טבעית. הקווים נעלמים ככל שהמרחק גדל, וככה מקבלים מראה של שמי לילה אמיתיים עם קבוצות כוכבים.</p>`,
    proTipHe: 'הוסיפו כוכב שביט מדי פעם (חלקיק מהיר עם שובל דועך) כדי להפתיע את המשתמש.',
    promptHe: 'אני רוצה רקע של כוכבים עם קבוצות כוכבים (Constellations) — כוכבים מנצנצים עם קווי חיבור בין כוכבים קרובים. לפני שאתה כותב קוד, תשאל אותי: כמה כוכבים? מה המרחק המקסימלי לקווי חיבור? מה צבע הכוכבים והקווים? באיזה קצב הם מנצנצים? מה צבע הרקע? האם להוסיף כוכב שביט מדי פעם? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>הרקע נראה כמו נוזל זורם שמתעוות כל הזמן. הטריק הוא פילטר SVG שיוצר רעש אקראי ומשתמש בו כדי להזיז פיקסלים מהמקום שלהם, מה שנותן תחושה של מים או לבה. הרעש משתנה כל הזמן ויוצר תנועה נוזלית רציפה. מעל זה יש גרדיאנט צבעוני שזז לאט וכתמי צבע נוספים שמתעוותים גם הם.</p>`,
    proTipHe: 'שנו את numOctaves ל-4 או 5 לטקסטורה מפורטת יותר, אבל זהירות מעלות הביצועים.',
    promptHe: 'אני רוצה רקע נוזלי (Liquid Background) — אפקט של נוזל זורם עם עיוות אורגני באמצעות פילטרי SVG. לפני שאתה כותב קוד, תשאל אותי: אילו צבעים לרקע? כמה חזק העיוות? באיזו מהירות הנוזל זז? האם להוסיף כתמי צבע נוספים? מה רמת הפירוט של הטקסטורה? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>המסך נראה כמו מסך מחשב ישן מהשנות ה-80 עם שלושה אפקטים שנערמים זה על זה. יש פסים אופקיים דקיקים שמדמים קווי סריקה של מסך CRT, כהייה בפינות שמדמה מסך קמור, והבהוב עדין שכמעט לא מורגש אבל מוסיף אותנטיות. הטקסט ירוק בסגנון טרמינל קלאסי.</p>`,
    proTipHe: 'הוסיפו text-shadow: 0 0 8px #33ff33 לטקסט כדי לדמות את הזוהר האופייני של פוספור ירוק.',
    promptHe: 'אני רוצה אפקט קווי סריקה (Scanlines) בסגנון מסך CRT ישן — עם קווי סריקה, כהייה בקצוות והבהוב עדין. לפני שאתה כותב קוד, תשאל אותי: מה צבע הטקסט (ירוק קלאסי, כתום, לבן)? כמה חזקים קווי הסריקה? האם להוסיף הבהוב? מה צבע הרקע? מה גודל ה"מסך"? האם זה על כל העמוד או על אלמנט ספציפי? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>התוכן מוצג מפוקסל, כאילו הורידו לו את הרזולוציה. כשמעבירים את העכבר מעל, שכבת הפיקסלציה נעלמת בהדרגה וחושפת את התוכן הברור. הפיקסלציה נעשית באמצעות פילטר SVG שמצמצם את הרזולוציה ומגדיל חזרה עם קצוות חדים, ומעבר רך של שקיפות עושה את החשיפה אלגנטית.</p>`,
    proTipHe: 'השתמשו באפקט הזה כמסך טעינה — התחילו מפוקסל ובהדרגה חשפו את התוכן כשהוא מוכן.',
    promptHe: 'אני רוצה אפקט פיקסלציה (Pixelate) — תוכן שמוצג מפוקסל ומתבהר בהובר או באנימציה. לפני שאתה כותב קוד, תשאל אותי: מה גודל הפיקסלים? מה מהירות החשיפה? האם החשיפה בהובר או אוטומטית? מה התוכן שמאחורי הפיקסלציה (תמונה, גרדיאנט, טקסט)? מה גודל האלמנט? האם להוסיף אנימציה לרקע גם במצב המפוקסל? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.',
  },
];
