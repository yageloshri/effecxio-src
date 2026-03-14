import type { Effect } from '@/types';

export const effectsBatch6Cursor: Effect[] = [
  // ─── 1. Custom Cursor ──────────────────────────────────────────────
  {
    id: 'customcursor',
    title: 'Custom Cursor',
    titleHe: 'קורסור מותאם',
    description: 'Custom cursor that replaces the default, morphs on hover over interactive elements.',
    descriptionHe: 'קורסור מותאם אישית שמחליף את ברירת המחדל ומשנה צורה בעת ריחוף על אלמנטים אינטראקטיביים.',
    categories: ['cursor'],
    tags: [
      { label: 'cursor' },
      { label: 'custom' },
      { label: 'morph' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'customcursor',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Custom Cursor</title>
<!-- Custom Cursor — replaces default cursor with a morphing dot + ring -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; cursor: none; }
  body {
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
  }
  /* Small inner dot */
  .cursor-dot {
    position: fixed; top: 0; left: 0; z-index: 9999;
    width: 8px; height: 8px; border-radius: 50%;
    background: #c8f53b; pointer-events: none;
    transform: translate(-50%, -50%);
    transition: width 0.25s, height 0.25s, background 0.25s;
  }
  /* Outer ring */
  .cursor-ring {
    position: fixed; top: 0; left: 0; z-index: 9998;
    width: 36px; height: 36px; border-radius: 50%;
    border: 2px solid rgba(200,245,59,0.5);
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, border-color 0.3s, border-radius 0.3s;
  }
  /* Morph state when hovering interactive elements */
  .cursor-dot.hover { width: 0; height: 0; }
  .cursor-ring.hover {
    width: 56px; height: 56px;
    border-color: #ff3cac;
    background: rgba(255,60,172,0.1);
  }
  .demo-box {
    padding: 2rem 3rem; border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.1);
    color: #fff; font-size: 1rem;
    transition: border-color 0.3s;
  }
  .demo-box:hover { border-color: #ff3cac; }
  .demo-link {
    color: #c8f53b; text-decoration: underline;
    font-size: 1.1rem;
  }
</style>
</head>
<body>
  <div class="cursor-dot" id="dot"></div>
  <div class="cursor-ring" id="ring"></div>

  <div class="demo-box" data-cursor="hover">Hover me</div>
  <a href="#" class="demo-link" data-cursor="hover">Link</a>

  <script>
    const dot = document.getElementById('dot');
    const ring = document.getElementById('ring');
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    const LERP = 0.15; /* ring follow speed */

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animate() {
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animate);
    }
    animate();

    /* Morph on hover targets */
    document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
      });
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>הסמן הרגיל של הדפדפן נעלם, ובמקומו מופיעים שני אלמנטים — נקודה קטנה שצמודה לעכבר וטבעת גדולה שעוקבת אחריו בהשהייה קלה. כשמרחפים על כפתור או לינק, הנקודה נעלמת והטבעת מתרחבת ומשנה צבע. השילוב של תנועה מהירה עם תנועה איטית נותן תחושה חלקה ואלגנטית.</p>`,
    proTipHe: 'הוסיפו mix-blend-mode: difference על הטבעת כדי שהקורסור ייראה טוב על כל צבע רקע.',
    promptHe: `אני רוצה ליצור קורסור מותאם אישית לאתר שלי — נקודה קטנה וטבעת חיצונית שעוקבים אחרי העכבר ומשנים צורה בריחוף על אלמנטים.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הצבע של הנקודה ושל הטבעת?\n2. מה הגודל של הנקודה ושל הטבעת?\n3. כמה מהירה העקיבה של הטבעת (חלקה ואיטית או צמודה ומהירה)?\n4. מה קורה כשמרחפים על כפתורים — שינוי צבע, הגדלה, אפקט אחר?\n5. האם להציג את הקורסור בכל הדף או רק באזור מסוים?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  // ─── 2. Cursor Blob ────────────────────────────────────────────────
  {
    id: 'cursorblob',
    title: 'Cursor Blob',
    titleHe: 'קורסור blob',
    description: 'Large blob cursor that follows the mouse with smooth lerp easing and blur effect.',
    descriptionHe: 'קורסור blob גדול שעוקב אחרי העכבר עם החלקת lerp ואפקט טשטוש.',
    categories: ['cursor'],
    tags: [
      { label: 'cursor' },
      { label: 'blob' },
      { label: 'lerp' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'cursorblob',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cursor Blob</title>
<!-- Cursor Blob — large gooey blob follows mouse with lerp smoothing -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif; color: #fff;
  }
  .blob {
    position: fixed; top: 0; left: 0; z-index: 0;
    width: 250px; height: 250px; /* blob diameter */
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,245,59,0.35) 0%, transparent 70%);
    filter: blur(60px); /* heavy blur for gooey look */
    pointer-events: none;
    transform: translate(-50%, -50%);
    will-change: transform;
  }
  .content {
    position: relative; z-index: 1;
    text-align: center;
  }
  .content h1 {
    font-size: 3rem; margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .content p { opacity: 0.5; font-size: 1rem; }
  .card {
    margin-top: 2rem; padding: 1.5rem 2.5rem;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(8px);
  }
</style>
</head>
<body>
  <div class="blob" id="blob"></div>
  <div class="content">
    <h1>Blob Cursor</h1>
    <p>Move your mouse around</p>
    <div class="card">The blob follows with smooth lerp</div>
  </div>

  <script>
    const blob = document.getElementById('blob');
    let bx = window.innerWidth / 2, by = window.innerHeight / 2;
    let mx = bx, my = by;
    const EASE = 0.08; /* lerp factor — lower = more lag */

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animate() {
      bx += (mx - bx) * EASE;
      by += (my - by) * EASE;
      blob.style.left = bx + 'px';
      blob.style.top = by + 'px';
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כתם צבע גדול ומטושטש עוקב אחרי העכבר בתנועה איטית ועדינה, כמו בועה שצפה מאחורי התוכן. הכתם זז רק חלק קטן מהמרחק בכל פריים, מה שנותן לו תחושה רכה ואורגנית. הוא יושב מתחת לכל התוכן בדף כך שהוא לא מסתיר שום דבר, אלא פשוט מוסיף שכבת אור דינמית שמגיבה לתנועה שלכם.</p>`,
    proTipHe: 'הוסיפו blob שני בצבע אחר עם ערך lerp שונה ליצירת אפקט שכבות צבעוני.',
    promptHe: `אני רוצה ליצור אפקט blob — כתם צבע גדול ומטושטש שעוקב אחרי העכבר ברקע האתר שלי.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הצבע של הכתם (ירוק, כחול, סגול, או שילוב)?\n2. מה הגודל של הכתם?\n3. כמה מטושטש הוא צריך להיות?\n4. כמה איטית או מהירה העקיבה אחרי העכבר?\n5. האם להוסיף כתם נוסף בצבע אחר ליצירת שכבות?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  // ─── 3. Magnetic Field ─────────────────────────────────────────────
  {
    id: 'magneticfield',
    title: 'Magnetic Field',
    titleHe: 'שדה מגנטי',
    description: 'Multiple elements attracted and repelled by the cursor based on proximity.',
    descriptionHe: 'מספר אלמנטים שנמשכים ונדחים על ידי הסמן בהתאם לקרבה.',
    categories: ['cursor'],
    tags: [
      { label: 'cursor' },
      { label: 'magnetic' },
      { label: 'physics' },
      { label: 'interaction' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'magneticfield',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Magnetic Field</title>
<!-- Magnetic Field — particles attract/repel from cursor based on distance -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a; overflow: hidden;
    font-family: sans-serif;
  }
  .field { position: fixed; inset: 0; }
  .node {
    position: absolute;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: rgba(200,245,59,0.6);
    transition: background 0.3s;
    will-change: transform;
  }
  .node::after {
    content: '';
    position: absolute; inset: -4px;
    border-radius: 50%;
    border: 1px solid rgba(200,245,59,0.15);
  }
</style>
</head>
<body>
  <div class="field" id="field"></div>
  <script>
    const field = document.getElementById('field');
    const COLS = 10, ROWS = 6;
    const RADIUS = 180; /* influence radius in px */
    const STRENGTH = 45; /* max displacement in px */
    const nodes = [];
    let mx = -999, my = -999;

    /* Create grid of nodes */
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const el = document.createElement('div');
        el.className = 'node';
        const ox = ((c + 0.5) / COLS) * 100;
        const oy = ((r + 0.5) / ROWS) * 100;
        el.style.left = ox + '%';
        el.style.top = oy + '%';
        field.appendChild(el);
        nodes.push({ el, ox, oy });
      }
    }

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
    });

    function animate() {
      const w = window.innerWidth, h = window.innerHeight;
      nodes.forEach(({ el, ox, oy }) => {
        const nx = (ox / 100) * w;
        const ny = (oy / 100) * h;
        const dx = mx - nx, dy = my - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          const angle = Math.atan2(dy, dx);
          /* Repel: push away from cursor */
          const tx = -Math.cos(angle) * force;
          const ty = -Math.sin(angle) * force;
          el.style.transform = \`translate(\${tx}px, \${ty}px) scale(\${1 + force / 80})\`;
          el.style.background = \`rgba(255, 60, 172, \${0.4 + force / 60})\`;
        } else {
          el.style.transform = 'translate(0,0) scale(1)';
          el.style.background = 'rgba(200,245,59,0.6)';
        }
      });
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>יש רשת של נקודות פזורות על המסך, וכשהסמן מתקרב אליהן — הן נדחות ממנו, כמו מגנט שדוחה חתיכות מתכת. ככל שהסמן קרוב יותר לנקודה, הדחייה חזקה יותר. הנקודות גם משנות צבע ומתרחבות קצת באזור ההשפעה, וכשהסמן מתרחק הכל חוזר למקום.</p>`,
    proTipHe: 'שנו את הסימן מ-minus ל-plus בחישוב tx/ty כדי להפוך מדחייה למשיכה.',
    promptHe: `אני רוצה ליצור אפקט שדה מגנטי באתר שלי — רשת של נקודות שנדחות מהסמן כשהוא מתקרב אליהן.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. כמה נקודות אני רוצה ברשת (צפוף או מרווח)?\n2. מה הצבע של הנקודות במצב רגיל ובמצב השפעה?\n3. האם הנקודות צריכות להידחות מהסמן או להימשך אליו?\n4. מה הרדיוס של אזור ההשפעה סביב הסמן?\n5. האם להוסיף אפקטים נוספים כמו קווים מחברים בין הנקודות?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  // ─── 4. Cursor Lens ────────────────────────────────────────────────
  {
    id: 'cursorlens',
    title: 'Cursor Lens',
    titleHe: 'עדשת קורסור',
    description: 'A magnifying glass effect that follows the cursor and enlarges content underneath.',
    descriptionHe: 'אפקט זכוכית מגדלת שעוקב אחרי הסמן ומגדיל את התוכן שמתחתיו.',
    categories: ['cursor'],
    tags: [
      { label: 'cursor' },
      { label: 'lens' },
      { label: 'magnify' },
      { label: 'zoom' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'cursorlens',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cursor Lens</title>
<!-- Cursor Lens — magnifying glass follows cursor, enlarges page content -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    display: flex; align-items: center; justify-content: center;
    cursor: none;
  }
  .content {
    text-align: center; color: #fff; padding: 2rem;
  }
  .content h1 {
    font-size: 3rem; margin-bottom: 1rem;
    background: linear-gradient(90deg, #c8f53b, #44aaff, #ff3cac);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .content p { color: #888; font-size: 1rem; max-width: 500px; line-height: 1.8; }
  .grid {
    display: grid; grid-template-columns: repeat(4, 60px);
    gap: 8px; margin-top: 1.5rem; justify-content: center;
  }
  .grid span {
    height: 60px; border-radius: 8px;
    background: rgba(200,245,59,0.15);
    border: 1px solid rgba(200,245,59,0.2);
  }
  .grid span:nth-child(even) { background: rgba(68,170,255,0.15); border-color: rgba(68,170,255,0.2); }
  /* Lens element */
  .lens {
    position: fixed; top: 0; left: 0; z-index: 100;
    width: 150px; height: 150px; /* lens diameter */
    border-radius: 50%;
    border: 2px solid rgba(200,245,59,0.4);
    box-shadow: 0 0 30px rgba(200,245,59,0.1);
    pointer-events: none;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }
  .lens-inner {
    position: absolute;
    width: 100vw; height: 100vh;
    transform-origin: 0 0;
    transform: scale(2); /* 2x magnification */
  }
</style>
</head>
<body>
  <div class="content" id="source">
    <h1>Lens Effect</h1>
    <p>Move your cursor to magnify. The lens clones the page and scales it 2x inside a clipped circle that follows the mouse.</p>
    <div class="grid">
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
    </div>
  </div>

  <div class="lens" id="lens">
    <div class="lens-inner" id="lensInner"></div>
  </div>

  <script>
    const lens = document.getElementById('lens');
    const inner = document.getElementById('lensInner');
    const ZOOM = 2; /* magnification factor */
    const SIZE = 150; /* must match CSS .lens width/height */

    /* Clone page content into lens */
    inner.innerHTML = document.getElementById('source').outerHTML;

    document.addEventListener('mousemove', (e) => {
      const x = e.clientX, y = e.clientY;
      lens.style.left = x + 'px';
      lens.style.top = y + 'px';
      /* Offset the inner clone so the lens shows the correct area */
      inner.style.transform = \`scale(\${ZOOM}) translate(\${-x + SIZE / (2 * ZOOM)}px, \${-y + SIZE / (2 * ZOOM)}px)\`;
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>עיגול שעוקב אחרי הסמן עובד כמו זכוכית מגדלת — הוא מראה גרסה מוגדלת של מה שנמצא מתחתיו בדף. בפועל, תוכן הדף משוכפל לתוך העיגול ומוגדל פי 2, והמיקום מתעדכן כל הזמן כדי שמה שרואים דרך העדשה יתאים בדיוק למה שמתחת לסמן.</p>`,
    proTipHe: 'שנו את ערך ה-ZOOM ל-3 או 4 להגדלה חזקה יותר, או הוסיפו filter: brightness(1.2) לעדשה להדגשת האזור המוגדל.',
    promptHe: `אני רוצה ליצור אפקט עדשה מגדלת באתר שלי — עיגול שעוקב אחרי הסמן ומגדיל את התוכן שמתחתיו.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הגודל של העדשה (קוטר בפיקסלים)?\n2. מה רמת ההגדלה (פי 2, פי 3, וכו׳)?\n3. מה הסגנון של מסגרת העדשה (צבע, עובי, צל)?\n4. האם העדשה פעילה תמיד או רק בלחיצה/ריחוף?\n5. על איזה תוכן העדשה צריכה לעבוד (תמונות, טקסט, כל הדף)?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  // ─── 5. Cursor Trail Color ─────────────────────────────────────────
  {
    id: 'cursortrailcolor',
    title: 'Cursor Trail Color',
    titleHe: 'שובל צבעוני',
    description: 'Color-changing cursor trail using HSL rotation for a rainbow effect.',
    descriptionHe: 'שובל קורסור צבעוני עם סיבוב HSL ליצירת אפקט קשת בענן.',
    categories: ['cursor'],
    tags: [
      { label: 'cursor' },
      { label: 'trail' },
      { label: 'HSL' },
      { label: 'rainbow' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'cursortrailcolor',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cursor Trail Color</title>
<!-- Cursor Trail Color — rainbow trail using HSL hue rotation on canvas -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif; cursor: crosshair;
  }
  canvas {
    position: fixed; inset: 0; z-index: 0;
  }
  .label {
    position: relative; z-index: 1;
    color: #fff; font-size: 1.2rem; opacity: 0.5;
  }
</style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <div class="label">Move your cursor</div>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const trail = []; /* stores {x, y, hue, alpha} */
    const MAX = 50; /* max trail points */
    let hue = 0;
    let mx = -100, my = -100;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Add new point */
      hue = (hue + 2) % 360; /* rotate hue 2deg per frame */
      trail.push({ x: mx, y: my, hue, alpha: 1 });
      if (trail.length > MAX) trail.shift();

      /* Draw trail */
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const progress = i / trail.length;
        const radius = 4 + progress * 10; /* grow from 4 to 14 */
        p.alpha -= 0.015; /* fade each frame */
        if (p.alpha <= 0) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = \`hsla(\${p.hue}, 80%, 60%, \${p.alpha})\`;
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כל תנועה של העכבר משאירה שובל של עיגולים צבעוניים שמשנים צבע כל הזמן כמו קשת. כל עיגול חדש מקבל גוון קצת שונה מהקודם, ועיגולים ישנים דועכים ונעלמים בהדרגה. הגודל של העיגולים גדל לכיוון הסמן, מה שנותן צורת זנב יפה. הכל מצויר על קנבס כדי שזה ירוץ חלק גם עם הרבה עיגולים.</p>`,
    proTipHe: 'שנו את קצב סיבוב ה-hue (2 מעלות) לערך גבוה יותר לקשת מהירה, או נמוך יותר למעבר צבעים עדין.',
    promptHe: `אני רוצה ליצור שובל צבעוני שעוקב אחרי העכבר באתר שלי — אפקט קשת בענן שדועך ונעלם.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה סגנון השובל (עיגולים, כוכבים, קווים)?\n2. מה טווח הצבעים (קשת מלאה, גווני כחול, צבע אחיד שדועך)?\n3. כמה ארוך השובל (כמה נקודות)?\n4. מה המהירות של שינוי הצבעים?\n5. מה הגודל של הנקודות בשובל?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },

  // ─── 6. Follow Eyes ────────────────────────────────────────────────
  {
    id: 'followeyes',
    title: 'Follow Eyes',
    titleHe: 'עיניים עוקבות',
    description: 'Illustrated eyes on screen that follow the cursor movement with smooth animation.',
    descriptionHe: 'עיניים מאויירות על המסך שעוקבות אחרי תנועת הסמן באנימציה חלקה.',
    categories: ['cursor'],
    tags: [
      { label: 'cursor' },
      { label: 'eyes' },
      { label: 'follow' },
      { label: 'fun' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'followeyes',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Follow Eyes</title>
<!-- Follow Eyes — two illustrated eyes that track cursor position -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    gap: 3rem; font-family: sans-serif;
  }
  .eye {
    width: 120px; height: 120px;
    background: radial-gradient(circle, #f0f0f0 60%, #d0d0d0 100%);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: inset 0 4px 12px rgba(0,0,0,0.2),
                0 0 40px rgba(200,245,59,0.08);
    position: relative;
    overflow: hidden;
  }
  .eye::before {
    content: '';
    position: absolute; top: 8px; left: 25%;
    width: 50%; height: 20px;
    background: rgba(255,255,255,0.5);
    border-radius: 50%;
    filter: blur(6px);
  }
  .pupil {
    width: 44px; height: 44px;
    background: radial-gradient(circle at 35% 35%, #333 50%, #111 100%);
    border-radius: 50%;
    position: relative;
    transition: transform 0.1s ease-out;
  }
  .pupil::after {
    content: '';
    position: absolute; top: 8px; left: 10px;
    width: 12px; height: 12px;
    background: #fff; border-radius: 50%;
  }
</style>
</head>
<body>
  <div class="eye" id="eye1"><div class="pupil" id="pupil1"></div></div>
  <div class="eye" id="eye2"><div class="pupil" id="pupil2"></div></div>

  <script>
    const eyes = [
      { eye: document.getElementById('eye1'), pupil: document.getElementById('pupil1') },
      { eye: document.getElementById('eye2'), pupil: document.getElementById('pupil2') },
    ];
    const MAX_OFFSET = 28; /* max pupil movement in px */

    document.addEventListener('mousemove', (e) => {
      eyes.forEach(({ eye, pupil }) => {
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 300);
        const offset = (dist / 300) * MAX_OFFSET;
        const tx = Math.cos(angle) * offset;
        const ty = Math.sin(angle) * offset;
        pupil.style.transform = \`translate(\${tx}px, \${ty}px)\`;
      });
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>שתי עיניים מאויירות מופיעות על המסך, והאישונים שלהן זזים לכיוון הסמן בכל פעם שמזיזים את העכבר. האישונים מוגבלים לטווח תנועה כדי שהם לא ייצאו מהעין. ככל שהסמן רחוק יותר מהעין, האישון נמשך יותר לכיוונו. הרעיון פשוט אבל נותן תחושה חיה ומשעשעת — כאילו מישהו באתר מסתכל עליכם.</p>`,
    proTipHe: 'הוסיפו אנימציית "מצמוץ" עם keyframes שמשנה את scaleY של העין ל-0.1 ובחזרה ל-1 כל כמה שניות.',
    promptHe: `אני רוצה ליצור אפקט עיניים עוקבות באתר שלי — עיניים מאויירות שהאישונים שלהן עוקבים אחרי הסמן.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. כמה עיניים אני רוצה (2, יותר, או עין אחת)?\n2. מה הגודל של העיניים?\n3. מה הצבע של האישונים והעיניים?\n4. האם להוסיף אפקט מצמוץ אוטומטי?\n5. איפה העיניים יופיעו בדף (מרכז, פינה, לצד תוכן)?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },
];
