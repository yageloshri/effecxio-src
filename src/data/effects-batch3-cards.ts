import type { Effect } from '@/types';

export const effectsBatch3Cards: Effect[] = [
  /* ───────────────────── 1. Stacked Cards ───────────────────── */
  {
    id: 'stackedcards',
    title: 'Stacked Cards',
    titleHe: 'כרטיסים מוערמים',
    description: 'Cards in a stack spread on hover like a hand of cards.',
    descriptionHe: 'כרטיסים ערוכים בערימה שנפרשים כמניפה בעת ריחוף.',
    categories: ['card', 'hover'],
    tags: [
      { label: 'card' },
      { label: 'hover' },
      { label: 'transform' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'stackedcards',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Stacked Cards — Cards fan out like a hand of playing cards on hover -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .stack {
    position: relative;
    width: 200px;
    height: 280px;
    cursor: pointer;
  }
  .stack .card {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: rgba(255,255,255,0.3);
    transition: transform 0.5s cubic-bezier(.4,0,.2,1);
    transform-origin: center bottom; /* pivot at card bottom */
  }
  /* Default resting state — slight offset per card */
  .card:nth-child(1) { transform: translateY(-6px) rotate(-2deg); }
  .card:nth-child(2) { transform: translateY(-3px) rotate(-1deg); }
  .card:nth-child(3) { transform: translateY(0); }
  .card:nth-child(4) { transform: translateY(-3px) rotate(1deg); }
  .card:nth-child(5) { transform: translateY(-6px) rotate(2deg); }
  /* Fan out on hover — 16deg spread per card */
  .stack:hover .card:nth-child(1) { transform: translateX(-80px) translateY(-20px) rotate(-24deg); }
  .stack:hover .card:nth-child(2) { transform: translateX(-40px) translateY(-10px) rotate(-12deg); }
  .stack:hover .card:nth-child(3) { transform: translateY(-6px) rotate(0deg); }
  .stack:hover .card:nth-child(4) { transform: translateX(40px) translateY(-10px) rotate(12deg); }
  .stack:hover .card:nth-child(5) { transform: translateX(80px) translateY(-20px) rotate(24deg); }
  .card:nth-child(1) { background: linear-gradient(135deg, #c8f53b33, #1a1a2e); }
  .card:nth-child(2) { background: linear-gradient(135deg, #ff3cac33, #1a1a2e); }
  .card:nth-child(3) { background: linear-gradient(135deg, #44aaff33, #1a1a2e); }
  .card:nth-child(4) { background: linear-gradient(135deg, #fbbf2433, #1a1a2e); }
  .card:nth-child(5) { background: linear-gradient(135deg, #a78bfa33, #1a1a2e); }
</style>
</head>
<body>
<div class="stack">
  <div class="card">1</div>
  <div class="card">2</div>
  <div class="card">3</div>
  <div class="card">4</div>
  <div class="card">5</div>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה כמה כרטיסים שמונחים אחד על השני בערימה. ברגע שמעבירים את העכבר מעליהם, הם נפרשים כמו מניפה — כל כרטיס זז לצד שלו ומסתובב קצת. האפקט הזה עובד רק עם CSS, בלי שום קוד נוסף, וזה נראה מרשים במיוחד לתצוגת גלריה או תפריט ויזואלי.</p>`,
    proTipHe: 'הוסיפו box-shadow שונה לכל כרטיס כדי ליצור תחושת עומק מציאותית יותר.',
    promptHe: `אני רוצה ליצור אפקט של כרטיסים מוערמים באתר שלי. הכרטיסים יהיו בערימה אחת, וכשמרחפים מעליהם הם נפרשים כמו מניפה.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. כמה כרטיסים אני רוצה בערימה?\n2. מה התוכן שיופיע על כל כרטיס?\n3. מה הצבעים והסגנון של הכרטיסים?\n4. לאיזה כיוון המניפה תיפתח (ימינה, שמאלה, למעלה)?\n5. מה הגודל של כל כרטיס?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 2. Flip Card ───────────────────── */
  {
    id: 'flipcard',
    title: 'Flip Card',
    titleHe: 'כרטיס הפיך',
    description: '3D card flip on hover revealing back face.',
    descriptionHe: 'כרטיס שמתהפך ב-3D בעת ריחוף ומגלה צד אחורי.',
    categories: ['card', 'hover'],
    tags: [
      { label: 'card' },
      { label: '3D' },
      { label: 'flip' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'flipcard',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Flip Card — 3D card flip revealing a back face on hover -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .flip-container {
    perspective: 800px; /* Perspective depth for 3D */
    width: 260px;
    height: 340px;
    cursor: pointer;
  }
  .flip-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(.4,0,.2,1);
  }
  .flip-container:hover .flip-inner {
    transform: rotateY(180deg);
  }
  .flip-front, .flip-back {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
  .flip-front {
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    border: 1px solid rgba(255,255,255,0.08);
    color: #eee;
  }
  .flip-back {
    background: linear-gradient(145deg, #c8f53b, #44aaff);
    transform: rotateY(180deg);
    color: #0a0a1a;
  }
  .icon { font-size: 3rem; }
  .title { font-size: 1.3rem; font-weight: 700; }
  .subtitle { font-size: 0.85rem; opacity: 0.7; }
</style>
</head>
<body>
<div class="flip-container">
  <div class="flip-inner">
    <div class="flip-front">
      <div class="icon">&#9733;</div>
      <div class="title">צד קדמי</div>
      <div class="subtitle">רחפו כדי להפוך</div>
    </div>
    <div class="flip-back">
      <div class="icon">&#10004;</div>
      <div class="title">צד אחורי</div>
      <div class="subtitle">תוכן מוסתר נחשף!</div>
    </div>
  </div>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס עם שני צדדים — צד קדמי וצד אחורי. כשמעבירים את העכבר מעליו, הכרטיס מתהפך כמו מטבע ומגלה את הצד השני. האפקט הזה מושלם להצגת מידע נוסף, כמו פרטים על מוצר, תשובה לשאלה, או תוכן מפתיע שמוסתר מאחורה.</p>`,
    proTipHe: 'הוסיפו מעבר עם rotateX במקום rotateY כדי ליצור היפוך אנכי במקום אופקי.',
    promptHe: `אני רוצה ליצור כרטיס הפיך באתר שלי. כשמרחפים עליו, הוא מתהפך ב-3D ומגלה צד אחורי עם תוכן אחר.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה התוכן בצד הקדמי של הכרטיס?\n2. מה התוכן בצד האחורי?\n3. מה הצבעים של כל צד?\n4. באיזה כיוון הכרטיס יתהפך (אופקי או אנכי)?\n5. מה הגודל של הכרטיס?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 3. Expand Card ───────────────────── */
  {
    id: 'expandcard',
    title: 'Expand Card',
    titleHe: 'כרטיס מתרחב',
    description: 'Card expands to full screen on click.',
    descriptionHe: 'כרטיס שמתרחב למסך מלא בלחיצה.',
    categories: ['card'],
    tags: [
      { label: 'card' },
      { label: 'expand' },
      { label: 'animation' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'expandcard',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Expand Card — Card expands to fill the entire viewport on click -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .card {
    width: 280px;
    height: 360px;
    border-radius: 18px;
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: #eee;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(.4,0,.2,1);
    position: fixed;
  }
  .card.expanded {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    top: 0; left: 0;
    z-index: 100;
    box-shadow: none;
    border: none;
  }
  .card .icon {
    width: 60px; height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
    transition: all 0.6s cubic-bezier(.4,0,.2,1);
  }
  .card.expanded .icon { width: 100px; height: 100px; border-radius: 24px; }
  .title { font-size: 1.3rem; font-weight: 700; transition: font-size 0.6s ease; }
  .card.expanded .title { font-size: 2rem; }
  .hint { font-size: 0.85rem; opacity: 0.5; }
</style>
</head>
<body>
<div class="card" onclick="this.classList.toggle('expanded')">
  <div class="icon"></div>
  <div class="title">לחצו להרחבה</div>
  <div class="hint">לחצו שוב לסגירה</div>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס רגיל שכשלוחצים עליו הוא גדל בצורה חלקה וממלא את כל המסך. לחיצה נוספת מחזירה אותו לגודל הרגיל. זה מושלם לתצוגת פרטי מוצר, גלריית תמונות, או כל מקום שבו רוצים להציג תוכן מורחב בלי לעבור לדף אחר.</p>`,
    proTipHe: 'שלבו עם View Transitions API לאנימציה בין דפים שלמים.',
    promptHe: `אני רוצה ליצור כרטיס מתרחב באתר שלי. כשלוחצים עליו, הוא גדל ומתרחב למסך מלא עם אנימציה חלקה.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה התוכן של הכרטיס במצב הרגיל?\n2. מה התוכן שמוצג במצב המורחב?\n3. מה הצבעים והעיצוב של הכרטיס?\n4. האם יש כפתור סגירה או שלחיצה נוספת סוגרת?\n5. מה הגודל ההתחלתי של הכרטיס?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 4. Hover Card 3D ───────────────────── */
  {
    id: 'hovercard3d',
    title: '3D Hover Card',
    titleHe: 'כרטיס 3D hover',
    description: 'Perspective tilt with spotlight that follows cursor.',
    descriptionHe: 'הטיית פרספקטיבה עם כתם אור שעוקב אחרי הסמן.',
    categories: ['card', 'hover', 'cursor'],
    tags: [
      { label: '3D' },
      { label: 'perspective' },
      { label: 'cursor' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'hovercard3d',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- 3D Hover Card — Perspective tilt with a spotlight following the cursor -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .card-3d {
    width: 300px;
    height: 400px;
    border-radius: 20px;
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    border: 1px solid rgba(255,255,255,0.08);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: #eee;
    transform-style: preserve-3d;
    transition: box-shadow 0.3s ease;
  }
  .spotlight {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .card-3d:hover .spotlight { opacity: 1; }
  .icon3d {
    width: 60px; height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
  }
</style>
</head>
<body>
<div class="card-3d" id="card">
  <div class="spotlight" id="spot"></div>
  <div class="icon3d"></div>
  <div style="font-size:1.3rem;font-weight:700">כרטיס 3D</div>
  <div style="font-size:0.85rem;opacity:0.5">הזיזו את העכבר</div>
</div>
<script>
  const card = document.getElementById('card');
  const spot = document.getElementById('spot');
  const MAX_TILT = 15; /* Max rotation degrees */

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotateX = ((y - cy) / cy) * -MAX_TILT;
    const rotateY = ((x - cx) / cx) * MAX_TILT;

    card.style.transform = \`perspective(600px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.03,1.03,1.03)\`;
    spot.style.background = \`radial-gradient(circle at \${(x/rect.width)*100}% \${(y/rect.height)*100}%, rgba(255,255,255,0.18) 0%, transparent 55%)\`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס שמגיב לתנועת העכבר ונוטה לכיוון שבו הסמן נמצא, כאילו מחזיקים אותו ביד. בנוסף, כתם אור עדין עוקב אחרי העכבר על פני הכרטיס. זה נותן תחושה תלת-ממדית אמיתית ומשדרג כל כרטיס מוצר או פרופיל באתר.</p>`,
    proTipHe: 'הוסיפו שכבת שיקוף (glare) עם gradient נוסף למראה מבריק יותר.',
    promptHe: `אני רוצה ליצור כרטיס עם אפקט 3D באתר שלי. הכרטיס נוטה לכיוון העכבר עם כתם אור שעוקב אחרי הסמן.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה התוכן של הכרטיס (טקסט, תמונה, אייקון)?\n2. מה הצבעים והרקע של הכרטיס?\n3. מה הגודל של הכרטיס?\n4. כמה חזקה תהיה ההטייה (עדינה או דרמטית)?\n5. מה צבע כתם האור שעוקב אחרי העכבר?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 5. Image Zoom ───────────────────── */
  {
    id: 'imagezoom',
    title: 'Image Zoom',
    titleHe: 'זום תמונה',
    description: 'Image zooms into cursor position on hover.',
    descriptionHe: 'תמונה מתקרבת למיקום הסמן בעת ריחוף.',
    categories: ['card', 'hover'],
    tags: [
      { label: 'zoom' },
      { label: 'image' },
      { label: 'hover' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'imagezoom',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Image Zoom — Image zooms into the cursor position on hover -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .zoom-container {
    width: 400px;
    height: 300px;
    border-radius: 18px;
    overflow: hidden;
    cursor: zoom-in;
    position: relative;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .zoom-img {
    width: 100%;
    height: 100%;
    /* Use a gradient as placeholder image */
    background: linear-gradient(135deg, #c8f53b, #44aaff, #ff3cac, #a78bfa);
    background-size: cover;
    transition: transform 0.4s cubic-bezier(.4,0,.2,1);
    transform-origin: center center;
  }
  .zoom-container:hover .zoom-img {
    transform: scale(2.5); /* 2.5x zoom factor */
  }
  .label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    background: rgba(0,0,0,0.3);
    opacity: 1;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .zoom-container:hover .label { opacity: 0; }
</style>
</head>
<body>
<div class="zoom-container" id="zc">
  <div class="zoom-img" id="zi"></div>
  <div class="label">רחפו לזום</div>
</div>
<script>
  const container = document.getElementById('zc');
  const img = document.getElementById('zi');

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = x + '% ' + y + '%';
  });

  container.addEventListener('mouseleave', () => {
    img.style.transformOrigin = '50% 50%';
  });
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה תמונה שכשמעבירים עליה את העכבר, היא מתקרבת בדיוק למקום שבו הסמן נמצא. ככל שמזיזים את העכבר, נקודת הזום זזה איתו. זה אפקט נהדר לאתרי חנות שבהם רוצים לאפשר ללקוחות לבדוק פרטים קטנים של מוצר בלי לפתוח דף נפרד.</p>`,
    proTipHe: 'למוצרי e-commerce, שלבו עם לופה עגולה שעוקבת אחרי הסמן לחוויית בדיקת מוצר.',
    promptHe: `אני רוצה ליצור אפקט זום תמונה באתר שלי. כשמרחפים על התמונה, היא מתקרבת למיקום העכבר.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה התמונה שתוצג (קישור או תיאור)?\n2. מה הגודל של אזור התמונה?\n3. כמה חזק יהיה הזום (פי 2, פי 3)?\n4. האם רוצים מסגרת או פינות מעוגלות?\n5. האם צריך טקסט או כיתוב מעל התמונה?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 6. Reveal Card ───────────────────── */
  {
    id: 'revealcard',
    title: 'Reveal Card',
    titleHe: 'כרטיס חשיפה',
    description: 'Colored overlay wipes to reveal content underneath.',
    descriptionHe: 'שכבת צבע נמחקת וחושפת תוכן מתחתיה.',
    categories: ['card', 'hover'],
    tags: [
      { label: 'reveal' },
      { label: 'clip-path' },
      { label: 'hover' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'revealcard',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Reveal Card — Colored overlay wipes away to reveal hidden content -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .reveal-card {
    width: 300px;
    height: 380px;
    border-radius: 18px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .reveal-content {
    position: absolute;
    inset: 0;
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: #eee;
  }
  .reveal-content .icon {
    width: 64px; height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
  }
  .reveal-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #c8f53b, #ff3cac);
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: inset(0 0 0 0); /* Fully visible */
    transition: clip-path 0.6s cubic-bezier(.4,0,.2,1);
    color: #0a0a1a;
    font-weight: 700;
    font-size: 1.2rem;
  }
  .reveal-card:hover .reveal-overlay {
    clip-path: inset(0 100% 0 0); /* Wipe to right */
  }
</style>
</head>
<body>
<div class="reveal-card">
  <div class="reveal-content">
    <div class="icon"></div>
    <div style="font-size:1.3rem;font-weight:700">תוכן נחשף!</div>
    <div style="font-size:0.85rem;opacity:0.5">מוסתר מתחת לשכבה</div>
  </div>
  <div class="reveal-overlay">רחפו לחשיפה</div>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס שמכוסה בשכבת צבע. כשמעבירים את העכבר מעליו, השכבה הצבעונית נמחקת הצידה ונחשף התוכן שמתחתיה. זה אפקט מעולה ליצירת סקרנות — אפשר להשתמש בו כדי לחשוף תמונות, מידע מוסתר, או הפתעות באתר.</p>`,
    proTipHe: 'נסו clip-path עם polygon() ליצירת מחיקות באלכסון או בצורות מעניינות.',
    promptHe: `אני רוצה ליצור כרטיס חשיפה באתר שלי. שכבת צבע מכסה את הכרטיס, וכשמרחפים עליו השכבה נמחקת וחושפת את התוכן.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה התוכן המוסתר שייחשף (טקסט, תמונה)?\n2. מה הצבע של שכבת הכיסוי?\n3. מאיזה כיוון השכבה תימחק (ימין, שמאל, למעלה, למטה)?\n4. מה הגודל של הכרטיס?\n5. האם יש טקסט על שכבת הכיסוי (כמו "רחפו לחשיפה")?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 7. Skeleton Card ───────────────────── */
  {
    id: 'skeletoncard',
    title: 'Skeleton Card',
    titleHe: 'כרטיס שלד',
    description: 'Skeleton loading animation with shimmer sweep.',
    descriptionHe: 'אנימציית טעינה בסגנון שלד עם הברקה חולפת.',
    categories: ['card', 'loader'],
    tags: [
      { label: 'skeleton' },
      { label: 'loading' },
      { label: 'shimmer' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'skeletoncard',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Skeleton Card — Shimmer loading placeholder with smooth sweep animation -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    gap: 24px;
  }
  .skel-card {
    width: 280px;
    padding: 20px;
    border-radius: 18px;
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .skel {
    border-radius: 8px;
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.04) 25%,
      rgba(255,255,255,0.1) 50%,
      rgba(255,255,255,0.04) 75%
    );
    background-size: 200% 100%; /* Double width for sweep */
    animation: shimmer 1.8s ease infinite;
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .skel-avatar { width: 48px; height: 48px; border-radius: 50%; }
  .skel-row { display: flex; gap: 12px; align-items: center; }
  .skel-lines { flex: 1; display: flex; flex-direction: column; gap: 8px; }
  .skel-line { height: 10px; }
  .skel-img { width: 100%; height: 120px; }
</style>
</head>
<body>
<div class="skel-card">
  <div class="skel-row">
    <div class="skel skel-avatar"></div>
    <div class="skel-lines">
      <div class="skel skel-line" style="width:80%"></div>
      <div class="skel skel-line" style="width:50%"></div>
    </div>
  </div>
  <div class="skel skel-img"></div>
  <div class="skel skel-line" style="width:100%"></div>
  <div class="skel skel-line" style="width:65%"></div>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס שמדמה טעינה של תוכן — במקום לראות מסך ריק, המשתמש רואה צורות אפורות שמהבהבות עם אפקט הברקה. הצורות מדמות את המבנה של התוכן האמיתי (תמונת פרופיל, שורות טקסט, תמונה). ברגע שהתוכן נטען, מחליפים את השלד בתוכן האמיתי.</p>`,
    proTipHe: 'התאימו את המבנה של השלד למבנה המדויק של התוכן שייטען כדי למנוע "קפיצה" ויזואלית.',
    promptHe: `אני רוצה ליצור כרטיס שלד (Skeleton) לטעינה באתר שלי. במקום מסך ריק, יוצגו צורות מהבהבות שמדמות את מבנה התוכן.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה מבנה התוכן שהשלד מדמה (פרופיל, כרטיס מוצר, פוסט)?\n2. אילו אלמנטים צריכים להופיע (אווטר, כותרת, תמונה, שורות טקסט)?\n3. מה הצבעים של הרקע וההברקה?\n4. מה הגודל של הכרטיס?\n5. כמה כרטיסי שלד להציג בשורה?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 8. Glow Border Card ───────────────────── */
  {
    id: 'glowbordercard',
    title: 'Glow Border Card',
    titleHe: 'כרטיס זוהר',
    description: 'Animated gradient glow border follows cursor around card edges.',
    descriptionHe: 'גבול זוהר מדרג שעוקב אחרי הסמן לאורך קצוות הכרטיס.',
    categories: ['card', 'cursor'],
    tags: [
      { label: 'glow' },
      { label: 'border' },
      { label: 'cursor' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'glowbordercard',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Glow Border Card — Gradient glow border that tracks the cursor position -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .glow-wrap {
    position: relative;
    width: 300px;
    height: 380px;
    border-radius: 20px;
    padding: 2px; /* Border thickness */
    cursor: pointer;
    background: radial-gradient(circle at 50% 50%, #c8f53b, #44aaff, #ff3cac, transparent 70%);
  }
  .glow-inner {
    width: 100%;
    height: 100%;
    border-radius: 18px;
    background: #1a1a2e;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: #eee;
  }
  .glow-icon {
    width: 56px; height: 56px;
    border-radius: 14px;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
    opacity: 0.7;
  }
</style>
</head>
<body>
<div class="glow-wrap" id="gw">
  <div class="glow-inner">
    <div class="glow-icon"></div>
    <div style="font-size:1.2rem;font-weight:700">גבול זוהר</div>
    <div style="font-size:0.85rem;opacity:0.5">הזיזו את העכבר</div>
  </div>
</div>
<script>
  const wrap = document.getElementById('gw');

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    wrap.style.background = \`radial-gradient(circle at \${x}% \${y}%, #c8f53b 0%, #44aaff 30%, #ff3cac 60%, transparent 80%)\`;
  });

  wrap.addEventListener('mouseleave', () => {
    wrap.style.background = 'radial-gradient(circle at 50% 50%, #c8f53b, #44aaff, #ff3cac, transparent 70%)';
  });
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס עם גבול זוהר צבעוני שעוקב אחרי תנועת העכבר. ככל שמזיזים את הסמן סביב הכרטיס, הזוהר זז איתו לאורך הקצוות. זה נותן תחושה של אנרגיה חיה שזורמת סביב הכרטיס, ומשדרג כל ממשק בסגנון מודרני ומרשים.</p>`,
    proTipHe: 'הוסיפו conic-gradient במקום radial-gradient ליצירת אפקט סיבובי מרהיב.',
    promptHe: `אני רוצה ליצור כרטיס עם גבול זוהר באתר שלי. הגבול יהיה צבעוני וזוהר, ויעקוב אחרי תנועת העכבר.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה התוכן של הכרטיס?\n2. מה הצבעים של הזוהר (שני צבעים או יותר)?\n3. מה העובי של הגבול הזוהר?\n4. מה הגודל של הכרטיס?\n5. האם הזוהר יהיה רק בריחוף או תמיד פעיל?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 9. Stack Scroll ───────────────────── */
  {
    id: 'stackscroll',
    title: 'Stack Scroll',
    titleHe: 'גלילת stack',
    description: 'Cards stack on top of each other as you scroll.',
    descriptionHe: 'כרטיסים נערמים זה על זה בזמן גלילה.',
    categories: ['card', 'scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'stack' },
      { label: 'sticky' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'stackscroll',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Stack Scroll — Cards stack on top of each other as the user scrolls -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a1a;
    font-family: sans-serif;
    color: #eee;
  }
  .spacer { height: 50vh; }
  .stack-section {
    position: relative;
    /* Each card is 100vh, minus overlap */
    height: calc(4 * 80vh);
  }
  .stack-card {
    position: sticky;
    top: 60px; /* Offset from top of viewport */
    width: 80%;
    max-width: 600px;
    margin: 0 auto 80vh;
    height: 50vh;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.06);
  }
  .stack-card:nth-child(1) { background: linear-gradient(145deg, #c8f53b22, #1a1a2e); }
  .stack-card:nth-child(2) { background: linear-gradient(145deg, #ff3cac22, #1a1a2e); }
  .stack-card:nth-child(3) { background: linear-gradient(145deg, #44aaff22, #1a1a2e); }
  .stack-card:nth-child(4) { background: linear-gradient(145deg, #a78bfa22, #1a1a2e); }
  .num { font-size: 3rem; font-weight: 800; opacity: 0.3; }
  .label { font-size: 1.1rem; opacity: 0.6; }
</style>
</head>
<body>
<div class="spacer"></div>
<div class="stack-section">
  <div class="stack-card"><div class="num">01</div><div class="label">כרטיס ראשון</div></div>
  <div class="stack-card"><div class="num">02</div><div class="label">כרטיס שני</div></div>
  <div class="stack-card"><div class="num">03</div><div class="label">כרטיס שלישי</div></div>
  <div class="stack-card"><div class="num">04</div><div class="label">כרטיס רביעי</div></div>
</div>
<div class="spacer"></div>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיסים שנערמים זה על זה בזמן שגוללים את הדף. כל כרטיס נדבק לחלק העליון של המסך, וכשממשיכים לגלול, הכרטיס הבא עולה ומכסה את הקודם. זה יוצר אפקט של חפיסת קלפים שמתגלה בהדרגה, מושלם לסיפור שלבים, הצגת שירותים, או כל תוכן שרוצים להציג ברצף.</p>`,
    proTipHe: 'הוסיפו scale קטן יותר לכרטיסים הישנים יותר כדי ליצור תחושת עומק תלת-ממדית.',
    promptHe: `אני רוצה ליצור אפקט גלילת Stack באתר שלי. כרטיסים נערמים זה על זה בזמן גלילה, כמו חפיסת קלפים.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. כמה כרטיסים יהיו?\n2. מה התוכן של כל כרטיס?\n3. מה הצבעים והסגנון של הכרטיסים?\n4. מה הגודל של כל כרטיס?\n5. האם הכרטיסים מכסים לגמרי את הקודמים או שנשאר חלק גלוי?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 10. Carousel Snap ───────────────────── */
  {
    id: 'carouselsnap',
    title: 'Carousel Snap',
    titleHe: 'קרוסלה snap',
    description: 'Horizontal scroll carousel with snap and indicators.',
    descriptionHe: 'קרוסלה אופקית עם גלילה חלקה ואינדיקטורים.',
    categories: ['card', 'scroll'],
    tags: [
      { label: 'carousel' },
      { label: 'snap' },
      { label: 'scroll' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'carouselsnap',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Carousel Snap — Horizontal scroll carousel with snap points and indicators -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    gap: 20px;
  }
  .carousel {
    width: 400px;
    overflow-x: auto;
    scroll-snap-type: x mandatory; /* Snap horizontally */
    display: flex;
    gap: 0;
    border-radius: 18px;
    scrollbar-width: none;
  }
  .carousel::-webkit-scrollbar { display: none; }
  .slide {
    min-width: 400px;
    height: 280px;
    scroll-snap-align: start; /* Snap to start of each slide */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #eee;
  }
  .slide:nth-child(1) { background: linear-gradient(135deg, #c8f53b33, #1a1a2e); }
  .slide:nth-child(2) { background: linear-gradient(135deg, #ff3cac33, #1a1a2e); }
  .slide:nth-child(3) { background: linear-gradient(135deg, #44aaff33, #1a1a2e); }
  .slide:nth-child(4) { background: linear-gradient(135deg, #a78bfa33, #1a1a2e); }
  .slide .title { font-size: 1.4rem; font-weight: 700; }
  .slide .sub { font-size: 0.85rem; opacity: 0.5; }
  .dots { display: flex; gap: 10px; }
  .dot {
    width: 10px; height: 10px;
    border-radius: 5px;
    border: none;
    background: rgba(255,255,255,0.2);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .dot.active { width: 24px; background: #c8f53b; }
</style>
</head>
<body>
<div class="carousel" id="carousel">
  <div class="slide"><div class="title">שקופית 1</div><div class="sub">גלילת snap</div></div>
  <div class="slide"><div class="title">שקופית 2</div><div class="sub">גלילת snap</div></div>
  <div class="slide"><div class="title">שקופית 3</div><div class="sub">גלילת snap</div></div>
  <div class="slide"><div class="title">שקופית 4</div><div class="sub">גלילת snap</div></div>
</div>
<div class="dots" id="dots">
  <button class="dot active"></button>
  <button class="dot"></button>
  <button class="dot"></button>
  <button class="dot"></button>
</div>
<script>
  const carousel = document.getElementById('carousel');
  const dots = document.querySelectorAll('.dot');
  const SLIDE_W = 400; /* px per slide */

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      carousel.scrollTo({ left: i * SLIDE_W, behavior: 'smooth' });
    });
  });

  carousel.addEventListener('scroll', () => {
    const idx = Math.round(carousel.scrollLeft / SLIDE_W);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  });
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה קרוסלה אופקית שאפשר לגלול בה ימינה ושמאלה, והיא "ננעלת" אוטומטית על כל שקופית כדי שתמיד תראו שקופית שלמה. למטה יש נקודות שמראות באיזו שקופית אתם, ואפשר גם ללחוץ עליהן כדי לקפוץ ישירות לשקופית מסוימת.</p>`,
    proTipHe: 'הוסיפו IntersectionObserver במקום scroll event לביצועים טובים יותר על מובייל.',
    promptHe: `אני רוצה ליצור קרוסלה עם Snap באתר שלי. שקופיות שגוללים ביניהן אופקית עם נעילה אוטומטית ואינדיקטורים.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. כמה שקופיות יהיו בקרוסלה?\n2. מה התוכן של כל שקופית?\n3. מה הגודל של הקרוסלה?\n4. האם צריך חיצי ניווט בנוסף לאינדיקטורים?\n5. האם הקרוסלה צריכה לחזור מההתחלה אחרי השקופית האחרונה?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 11. Accordion Smooth ───────────────────── */
  {
    id: 'accordionsmooth',
    title: 'Smooth Accordion',
    titleHe: 'אקורדיון חלק',
    description: 'Smooth height transition accordion using CSS grid.',
    descriptionHe: 'אקורדיון עם מעבר גובה חלק באמצעות CSS grid.',
    categories: ['card', 'interaction'],
    tags: [
      { label: 'accordion' },
      { label: 'CSS grid' },
      { label: 'interaction' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'accordionsmooth',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Smooth Accordion — Animated height transitions using the CSS grid 0fr/1fr trick -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .accordion {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .acc-item {
    border-radius: 12px;
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
  }
  .acc-header {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #eee;
    font-weight: 600;
  }
  .acc-header:hover { background: rgba(255,255,255,0.03); }
  .acc-arrow {
    transition: transform 0.3s ease;
    color: #c8f53b;
  }
  .acc-item.open .acc-arrow { transform: rotate(180deg); }
  .acc-body {
    display: grid;
    grid-template-rows: 0fr; /* Collapsed: 0fr */
    transition: grid-template-rows 0.35s ease;
  }
  .acc-item.open .acc-body {
    grid-template-rows: 1fr; /* Expanded: 1fr */
  }
  .acc-body-inner {
    overflow: hidden;
  }
  .acc-body-inner p {
    padding: 0 20px 16px;
    color: rgba(255,255,255,0.5);
    font-size: 0.9rem;
    line-height: 1.6;
  }
</style>
</head>
<body>
<div class="accordion">
  <div class="acc-item open">
    <div class="acc-header" onclick="toggle(this)">
      <span>מה זה Effects Lab?</span>
      <span class="acc-arrow">&#9660;</span>
    </div>
    <div class="acc-body"><div class="acc-body-inner"><p>ספריית אפקטים מוכנים לשימוש עם קוד נקי וקל להתאמה.</p></div></div>
  </div>
  <div class="acc-item">
    <div class="acc-header" onclick="toggle(this)">
      <span>האם זה בחינם?</span>
      <span class="acc-arrow">&#9660;</span>
    </div>
    <div class="acc-body"><div class="acc-body-inner"><p>כן! כל האפקטים זמינים בקוד פתוח ללא הגבלה.</p></div></div>
  </div>
  <div class="acc-item">
    <div class="acc-header" onclick="toggle(this)">
      <span>איך מתחילים?</span>
      <span class="acc-arrow">&#9660;</span>
    </div>
    <div class="acc-body"><div class="acc-body-inner"><p>בחרו אפקט, העתיקו את הקוד, והדביקו אותו בפרויקט שלכם.</p></div></div>
  </div>
</div>
<script>
  function toggle(header) {
    const item = header.parentElement;
    /* Close all others first (single open mode) */
    document.querySelectorAll('.acc-item').forEach(el => {
      if (el !== item) el.classList.remove('open');
    });
    item.classList.toggle('open');
  }
</script>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה רשימת שאלות ותשובות (אקורדיון) שבה לוחצים על שאלה והתשובה נפתחת בצורה חלקה. כשפותחים פריט אחד, הפריטים האחרים נסגרים אוטומטית. האפקט הזה מושלם לעמוד שאלות נפוצות, תפריטים מתקפלים, או כל מקום שרוצים לחסוך מקום במסך.</p>`,
    proTipHe: 'טריק ה-grid-template-rows: 0fr/1fr עובד גם עם details/summary לגרסה ללא JavaScript.',
    promptHe: `אני רוצה ליצור אקורדיון חלק באתר שלי. פריטים שנפתחים ונסגרים בלחיצה עם אנימציה חלקה.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. כמה פריטים יהיו באקורדיון?\n2. מה הכותרות והתוכן של כל פריט?\n3. האם רק פריט אחד יכול להיות פתוח בו-זמנית?\n4. מה הצבעים והסגנון של האקורדיון?\n5. האם הפריט הראשון צריך להיות פתוח כברירת מחדל?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  /* ───────────────────── 12. Pricing Card ───────────────────── */
  {
    id: 'pricingcard',
    title: 'Pricing Card',
    titleHe: 'כרטיס מחיר',
    description: 'Pricing card with hover highlight and feature reveal.',
    descriptionHe: 'כרטיס תמחור עם הדגשה בריחוף וחשיפת תכונות.',
    categories: ['card', 'hover'],
    tags: [
      { label: 'pricing' },
      { label: 'hover' },
      { label: 'card' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'pricingcard',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<!-- Pricing Card — Three-tier pricing with hover highlight and feature reveal -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    gap: 20px;
  }
  .pricing-card {
    width: 220px;
    padding: 32px 24px;
    border-radius: 20px;
    background: #1a1a2e;
    border: 1.5px solid rgba(255,255,255,0.06);
    text-align: center;
    color: #eee;
    transition: all 0.35s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }
  .pricing-card:hover {
    transform: scale(1.06);
    box-shadow: 0 16px 50px rgba(0,0,0,0.4);
    border-color: var(--clr);
    background: #16213e;
  }
  .plan-name { font-size: 0.9rem; font-weight: 700; text-transform: uppercase; }
  .price { font-size: 2.2rem; font-weight: 800; }
  .features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  .features li {
    font-size: 0.85rem;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  .pricing-card:hover .features li { opacity: 1; }
  .cta {
    padding: 10px 28px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    color: #0a0a1a;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.3s ease;
  }
  .pricing-card:hover .cta {
    opacity: 1;
    transform: translateY(0);
  }
</style>
</head>
<body>
<div class="pricing-card" style="--clr:#888">
  <div class="plan-name" style="color:#888">בסיסי</div>
  <div class="price">חינם</div>
  <ul class="features">
    <li>5 פרויקטים</li><li>1GB אחסון</li>
  </ul>
  <button class="cta" style="background:#888">בחר</button>
</div>
<div class="pricing-card" style="--clr:#c8f53b">
  <div class="plan-name" style="color:#c8f53b">פרו</div>
  <div class="price">49&#8362;</div>
  <ul class="features">
    <li>50 פרויקטים</li><li>20GB אחסון</li><li>תמיכה מועדפת</li><li>API גישה</li>
  </ul>
  <button class="cta" style="background:#c8f53b">בחר</button>
</div>
<div class="pricing-card" style="--clr:#44aaff">
  <div class="plan-name" style="color:#44aaff">עסקי</div>
  <div class="price">99&#8362;</div>
  <ul class="features">
    <li>פרויקטים ללא הגבלה</li><li>100GB אחסון</li><li>תמיכה 24/7</li>
  </ul>
  <button class="cta" style="background:#44aaff">בחר</button>
</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש פה שלושה כרטיסי תמחור זה לצד זה. כשמעבירים את העכבר על אחד מהם, הוא מתרומם קצת, מקבל גבול צבעוני, רשימת התכונות מתבהרת, וכפתור "בחר" מופיע בצורה חלקה. כל כרטיס בצבע אחר כדי ליצור הבדל ברור בין המסלולים.</p>`,
    proTipHe: 'הוסיפו תגית "מומלץ" לכרטיס המרכזי עם position absolute ליצירת היררכיה חזותית.',
    promptHe: `אני רוצה ליצור כרטיסי תמחור באתר שלי. כרטיסים עם מסלולים שונים שמתעוררים לחיים בריחוף.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. כמה מסלולי תמחור יש?\n2. מה השם, המחיר והתכונות של כל מסלול?\n3. מה הצבע של כל מסלול?\n4. האם יש מסלול "מומלץ" שצריך להיות בולט יותר?\n5. מה הטקסט בכפתור הפעולה (CTA)?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },
];
