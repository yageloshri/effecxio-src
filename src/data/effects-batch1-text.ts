import type { Effect } from '@/types';

export const effectsBatch1Text: Effect[] = [
  // ─── 1. Scramble Text ────────────────────────────────────────────────
  {
    id: 'scrambletext',
    title: 'Scramble Text',
    titleHe: 'טקסט מתערבב',
    description: 'Random character scramble animates to final text on hover — each letter cycles through random chars before settling.',
    descriptionHe: 'תווים אקראיים מתערבבים ומתייצבים לטקסט הסופי בעת ריחוף — כל אות עוברת מחזור של תווים רנדומליים.',
    categories: ['text'],
    tags: [{ label: 'scramble' }, { label: 'text' }, { label: 'hover' }],
    difficulty: 'intermediate' as const,
    previewComponent: 'scrambletext',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scramble Text</title>
<!-- Scramble Text — Random chars cycle through before resolving to final text on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: monospace;
  }
  .scramble {
    font-size: 3rem; font-weight: 700; color: #fff;
    cursor: pointer; letter-spacing: 4px;
    padding: 1rem 2rem; border-radius: 12px;
    transition: background 0.3s;
  }
  .scramble:hover { background: rgba(108,99,255,0.08); }
  .label { color: #555; font-size: 0.85rem; margin-top: 1rem; text-align: center; }
</style>
</head>
<body>
  <div style="text-align:center">
    <div class="scramble" id="scramble">EFFECTS</div>
    <div class="label">Hover to scramble</div>
  </div>
  <script>
    const el = document.getElementById('scramble');
    const original = el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let animId = null;

    el.addEventListener('mouseenter', () => {
      let iteration = 0;
      const totalIterations = original.length * 3; /* 3 cycles per letter */
      clearInterval(animId);
      animId = setInterval(() => {
        el.textContent = original
          .split('')
          .map((ch, i) => {
            if (i < Math.floor(iteration / 3)) return original[i]; /* settled */
            return chars[Math.floor(Math.random() * chars.length)]; /* scrambling */
          })
          .join('');
        iteration++;
        if (iteration > totalIterations) clearInterval(animId);
      }, 40); /* 40ms per frame */
    });

    el.addEventListener('mouseleave', () => {
      clearInterval(animId);
      el.textContent = original;
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הטקסט המתערבב עובד?</h4>
<p>בעת ריחוף מעל הטקסט, כל אות מוחלפת בתווים אקראיים שמתחלפים במהירות, ובהדרגה כל אות "מתייצבת" לערך הסופי שלה משמאל לימין.</p>
<ul>
  <li><strong>מחזור תווים:</strong> כל אות עוברת 3 סבבים של תווים אקראיים לפני שהיא מתקבעת על הערך הנכון, מה שנותן תחושה של "פענוח".</li>
  <li><strong>setInterval:</strong> כל 40 מילישניות הטקסט המוצג מתעדכן — אותיות שכבר "נפתרו" מציגות את הערך הנכון, והשאר ממשיכות לרנדום.</li>
  <li><strong>מערך תווים:</strong> מחרוזת <code>chars</code> מכילה אותיות, מספרים וסימנים מיוחדים ליצירת אפקט "האקרים".</li>
  <li><strong>ניקוי:</strong> כשהעכבר עוזב, <code>clearInterval</code> עוצר את האנימציה והטקסט חוזר למקור.</li>
</ul>
<p>האפקט הזה נפוץ מאוד בעיצובים טכנולוגיים ונותן תחושה של פענוח קוד סודי או מטריקס.</p>`,
    proTipHe: 'שנו את מספר הסבבים לכל אות (3) כדי לשלוט במהירות ההתייצבות — ערך גבוה יותר = אנימציה ארוכה יותר.',
  },

  // ─── 2. Split Char ───────────────────────────────────────────────────
  {
    id: 'splitchar',
    title: 'Split Char',
    titleHe: 'פיצול תווים',
    description: 'Each letter flies in from a random position on load with staggered delays for a dramatic entrance.',
    descriptionHe: 'כל אות עפה ממיקום אקראי ומתייצבת במקומה עם השהיה מדורגת ליצירת כניסה דרמטית.',
    categories: ['text'],
    tags: [{ label: 'split' }, { label: 'text' }, { label: 'animation' }],
    difficulty: 'intermediate' as const,
    previewComponent: 'splitchar',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Split Char</title>
<!-- Split Char — Each letter flies in from a random off-screen position -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .split-container { display: flex; gap: 4px; perspective: 600px; }
  .split-char {
    font-size: 4rem; font-weight: 900; color: #fff;
    display: inline-block;
    opacity: 0;
    animation: fly-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  }
  @keyframes fly-in {
    from {
      opacity: 0;
      transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.3);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translate(0, 0) rotate(0deg) scale(1);
      filter: blur(0px);
    }
  }
  .replay-btn {
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    padding: 10px 28px; background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.4); border-radius: 8px;
    color: #fff; cursor: pointer; font-size: 0.9rem;
  }
</style>
</head>
<body>
  <div class="split-container" id="container"></div>
  <button class="replay-btn" id="replay">Replay</button>
  <script>
    const text = 'EFFECTS';
    const container = document.getElementById('container');

    function render() {
      container.innerHTML = '';
      text.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.textContent = ch;
        /* Random origin between -300px and 300px */
        span.style.setProperty('--tx', (Math.random() * 600 - 300) + 'px');
        span.style.setProperty('--ty', (Math.random() * 600 - 300) + 'px');
        span.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
        span.style.animationDelay = (i * 0.1) + 's'; /* 100ms stagger */
        container.appendChild(span);
      });
    }

    render();
    document.getElementById('replay').addEventListener('click', render);
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט פיצול התווים עובד?</h4>
<p>כל אות מקבלת מיקום התחלתי אקראי מחוץ למסך, ועפה למקומה הסופי עם אנימציית CSS חלקה ו-stagger timing.</p>
<ul>
  <li><strong>CSS Custom Properties:</strong> לכל אות מוגדרים <code>--tx</code>, <code>--ty</code> ו-<code>--rot</code> אקראיים שמגדירים מאיפה היא "עפה".</li>
  <li><strong>animation-delay מדורג:</strong> כל אות מתחילה 100ms אחרי הקודמת (<code>i * 0.1s</code>), מה שיוצר גל כניסה מסודר.</li>
  <li><strong>cubic-bezier:</strong> עקומת התזמון <code>(0.23, 1, 0.32, 1)</code> יוצרת תחושת "האטה" בסוף הנחיתה, כמו פיזיקה אמיתית.</li>
  <li><strong>blur transition:</strong> כל אות מתחילה מטושטשת (<code>blur(8px)</code>) ומתחדדת תוך כדי תנועה ליצירת תחושת עומק.</li>
</ul>
<p>האפקט מתאים מצוין לכותרות hero ודפי נחיתה שרוצים ליצור רושם ראשוני חזק.</p>`,
    proTipHe: 'הוסיפו perspective ל-container כדי לקבל תחושת תלת-מימד כשהאותיות עפות.',
  },

  // ─── 3. Stroke Text ──────────────────────────────────────────────────
  {
    id: 'stroketext',
    title: 'Stroke Text',
    titleHe: 'קו מתאר טקסט',
    description: 'SVG text stroke-dashoffset draw-on animation that traces the outline of each letter.',
    descriptionHe: 'אנימציית ציור קו מתאר טקסט באמצעות SVG stroke-dashoffset שמשרטטת את המתאר של כל אות.',
    categories: ['text'],
    tags: [{ label: 'stroke' }, { label: 'SVG' }, { label: 'draw' }],
    difficulty: 'intermediate' as const,
    previewComponent: 'stroketext',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Stroke Text</title>
<!-- Stroke Text — SVG text stroke draws on with dashoffset animation -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  svg { overflow: visible; }
  .stroke-text {
    font-size: 80px; font-weight: 900; font-family: Arial, sans-serif;
    fill: none;
    stroke: #6c63ff;
    stroke-width: 2;
    stroke-dasharray: 500; /* total path length estimate */
    stroke-dashoffset: 500;
    animation: draw-stroke 3s ease forwards;
  }
  .fill-text {
    font-size: 80px; font-weight: 900; font-family: Arial, sans-serif;
    fill: #fff; opacity: 0;
    animation: fade-fill 1s ease 2.5s forwards; /* starts near end of stroke */
  }
  @keyframes draw-stroke {
    to { stroke-dashoffset: 0; }
  }
  @keyframes fade-fill {
    to { opacity: 1; }
  }
  .replay-btn {
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    padding: 10px 28px; background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.4); border-radius: 8px;
    color: #fff; cursor: pointer; font-size: 0.9rem;
  }
</style>
</head>
<body>
  <svg id="svg" viewBox="0 0 420 100" width="420" height="100">
    <text class="stroke-text" x="50%" y="75" text-anchor="middle" id="strokeEl">EFFECT</text>
    <text class="fill-text" x="50%" y="75" text-anchor="middle" id="fillEl">EFFECT</text>
  </svg>
  <button class="replay-btn" id="replay">Replay</button>
  <script>
    document.getElementById('replay').addEventListener('click', () => {
      const svg = document.getElementById('svg');
      const clone = svg.cloneNode(true);
      svg.parentNode.replaceChild(clone, svg);
      /* re-bind replay */
      document.getElementById('replay').addEventListener('click', arguments.callee);
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט קו המתאר עובד?</h4>
<p>האפקט משתמש בטכניקת <code>stroke-dasharray</code> ו-<code>stroke-dashoffset</code> של SVG כדי ליצור אשליה שהטקסט "מצויר" על המסך.</p>
<ul>
  <li><strong>stroke-dasharray:</strong> מגדיר אורך "מקפים" בקו — כשהערך גדול מאורך הנתיב כולו, נוצר מקף אחד ארוך שמכסה הכל.</li>
  <li><strong>stroke-dashoffset:</strong> מזיז את תחילת המקף — כשהערך שווה ל-dasharray, הקו לא נראה. כשהוא 0, הקו נראה במלואו.</li>
  <li><strong>אנימציית draw:</strong> אנימציה שמשנה את ה-offset מ-500 ל-0 יוצרת אפקט של ציור — כאילו יד מציירת את האותיות.</li>
  <li><strong>מילוי מושהה:</strong> שכבת טקסט שנייה עם <code>fill</code> מתחילה להופיע רק בסוף ציור הקו, מה שיוצר מעבר חלק מקו מתאר לטקסט מלא.</li>
</ul>
<p>הטריק המרכזי הוא לחשב את <code>stroke-dasharray</code> הנכון — ערך גדול מדי בסדר, אבל קטן מדי יגרום לחלקים חסרים.</p>`,
    proTipHe: 'השתמשו ב-getTotalLength() ב-JavaScript כדי לחשב את אורך הנתיב המדויק של כל אות.',
  },

  // ─── 4. Blur Reveal ──────────────────────────────────────────────────
  {
    id: 'blurreveal',
    title: 'Blur Reveal',
    titleHe: 'חשיפת טשטוש',
    description: 'Text reveals by animating blur from 20px to 0 with a fade-in for a dreamy entrance.',
    descriptionHe: 'טקסט נחשף באנימציית טשטוש מ-20px ל-0 עם דהייה-פנימה ליצירת כניסה חלומית.',
    categories: ['text'],
    tags: [{ label: 'blur' }, { label: 'reveal' }, { label: 'fade' }],
    difficulty: 'beginner' as const,
    previewComponent: 'blurreveal',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Blur Reveal</title>
<!-- Blur Reveal — Text fades in while blur animates from 20px to 0 -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 1.5rem;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .blur-word {
    font-size: 3.5rem; font-weight: 900; color: #fff;
    opacity: 0;
    filter: blur(20px); /* start fully blurred */
    animation: blur-reveal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  .blur-word:nth-child(2) { animation-delay: 0.3s; font-size: 1.5rem; color: #888; }
  .blur-word:nth-child(3) { animation-delay: 0.6s; font-size: 1.1rem; color: #555; }
  @keyframes blur-reveal {
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }
  .replay-btn {
    padding: 10px 28px; background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.4); border-radius: 8px;
    color: #fff; cursor: pointer; font-size: 0.9rem;
    animation: blur-reveal 0.8s 1s forwards; opacity: 0; filter: blur(10px);
  }
</style>
</head>
<body>
  <div id="container">
    <div class="blur-word">BLUR REVEAL</div>
    <div class="blur-word">Smooth text entrance</div>
    <div class="blur-word">From foggy to crystal clear</div>
  </div>
  <button class="replay-btn" id="replay" onclick="replay()">Replay</button>
  <script>
    function replay() {
      const c = document.getElementById('container');
      const html = c.innerHTML;
      c.innerHTML = '';
      /* Force reflow then re-insert to re-trigger animations */
      requestAnimationFrame(() => { c.innerHTML = html; });
    }
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט חשיפת הטשטוש עובד?</h4>
<p>כל שורת טקסט מתחילה בלתי נראית ומטושטשת, ובהדרגה מתחדדת ומופיעה עם <code>filter: blur()</code> ו-<code>opacity</code> מונפשים.</p>
<ul>
  <li><strong>מצב התחלתי:</strong> כל אלמנט מתחיל עם <code>opacity: 0</code> ו-<code>filter: blur(20px)</code> — בלתי נראה ומטושטש לחלוטין.</li>
  <li><strong>אנימציית blur-reveal:</strong> מעבירה את שני הערכים ל-<code>opacity: 1</code> ו-<code>blur(0px)</code> בו-זמנית ליצירת אפקט "התגלות מהערפל".</li>
  <li><strong>השהיה מדורגת:</strong> <code>animation-delay</code> שונה לכל שורה (0, 0.3s, 0.6s) יוצר גל חשיפה מלמעלה למטה.</li>
  <li><strong>cubic-bezier:</strong> עקומת התזמון יוצרת האצה עדינה — מתחיל לאט ומאיץ בסוף, מה שנראה טבעי יותר.</li>
</ul>
<p>אפקט פשוט מאוד ליישום אבל מרשים מאוד ויזואלית — מתאים לכותרות, סלוגנים ודפי נחיתה.</p>`,
    proTipHe: 'שלבו את האפקט עם translateY קל כדי שהטקסט גם יעלה מלמטה תוך כדי התגלות.',
  },

  // ─── 5. Wavy Text ────────────────────────────────────────────────────
  {
    id: 'wavytext',
    title: 'Wavy Text',
    titleHe: 'טקסט גלי',
    description: 'Each letter animates up and down in a continuous sine wave loop with staggered delays.',
    descriptionHe: 'כל אות מתנודדת למעלה ולמטה בלולאת גל סינוסי רציפה עם השהיות מדורגות.',
    categories: ['text'],
    tags: [{ label: 'wave' }, { label: 'text' }, { label: 'loop' }],
    difficulty: 'beginner' as const,
    previewComponent: 'wavytext',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Wavy Text</title>
<!-- Wavy Text — Each letter bobs up and down in a sine wave loop -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .wavy-container { display: flex; }
  .wavy-char {
    font-size: 3.5rem; font-weight: 900; color: #fff;
    display: inline-block;
    animation: wave 1.5s ease-in-out infinite;
  }
  .wavy-char.space { width: 16px; } /* visible space */
  @keyframes wave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); } /* 20px peak height */
  }
</style>
</head>
<body>
  <div class="wavy-container" id="wavy"></div>
  <script>
    const text = 'WAVE EFFECT';
    const container = document.getElementById('wavy');
    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'wavy-char' + (ch === ' ' ? ' space' : '');
      span.textContent = ch === ' ' ? '' : ch;
      span.style.animationDelay = (i * 0.08) + 's'; /* 80ms stagger per letter */
      container.appendChild(span);
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הטקסט הגלי עובד?</h4>
<p>כל אות מקבלת אנימציית <code>translateY</code> מחזורית שמעלה ומורידה אותה, כאשר <code>animation-delay</code> מדורג יוצר את אפקט הגל.</p>
<ul>
  <li><strong>אנימציית wave:</strong> כל אות עולה 20px ב-50% של המחזור וחוזרת ל-0 — תנועה חלקה למעלה ולמטה.</li>
  <li><strong>animation-delay מדורג:</strong> כל אות מתחילה 80ms אחרי הקודמת, מה שיוצר "גל" שעובר מהאות הראשונה לאחרונה.</li>
  <li><strong>infinite loop:</strong> האנימציה רצה ללא הפסקה וחוזרת על עצמה, כך שהגל ממשיך לזרום כל הזמן.</li>
  <li><strong>ease-in-out:</strong> עקומת התזמון יוצרת האטה בשיא ובתחתית, מה שמדמה תנועה סינוסית טבעית.</li>
</ul>
<p>האפקט פופולרי מאוד בלוגואים ודפי loading ויוצר תחושה עליזה ודינמית.</p>`,
    proTipHe: 'הוסיפו שינוי צבע לכל אות לפי האינדקס כדי ליצור אפקט קשת בענן גלית.',
  },

  // ─── 6. Highlight Text ───────────────────────────────────────────────
  {
    id: 'highlighttext',
    title: 'Highlight Text',
    titleHe: 'הדגשת טקסט',
    description: 'A colored highlight sweeps under text like a marker pen on load or scroll.',
    descriptionHe: 'הדגשה צבעונית גולשת מתחת לטקסט כמו טוש מרקר בזמן טעינה או גלילה.',
    categories: ['text'],
    tags: [{ label: 'highlight' }, { label: 'marker' }, { label: 'underline' }],
    difficulty: 'beginner' as const,
    previewComponent: 'highlighttext',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Highlight Text</title>
<!-- Highlight Text — Marker-style highlight sweeps under text -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .highlight-line {
    font-size: 2.5rem; font-weight: 700; color: #fff;
    line-height: 1.8; text-align: center; max-width: 600px;
  }
  .highlight {
    position: relative; display: inline;
    background: linear-gradient(
      transparent 55%,                /* top 55% is transparent */
      rgba(108, 99, 255, 0.35) 55%    /* bottom 45% is the highlight */
    );
    background-size: 0% 100%;         /* start with zero width */
    background-repeat: no-repeat;
    animation: sweep 1.2s ease forwards;
  }
  .highlight:nth-child(2) { animation-delay: 0.5s; }
  .highlight:nth-child(3) {
    animation-delay: 1s;
    background: linear-gradient(transparent 55%, rgba(236,72,153,0.3) 55%);
    background-size: 0% 100%;
    background-repeat: no-repeat;
  }
  @keyframes sweep {
    to { background-size: 100% 100%; } /* expand to full width */
  }
</style>
</head>
<body>
  <div class="highlight-line">
    <span class="highlight">This is important</span><br/>
    <span class="highlight">text that gets</span><br/>
    <span class="highlight">highlighted like a marker</span>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט ההדגשה עובד?</h4>
<p>האפקט משתמש ב-<code>background</code> עם <code>linear-gradient</code> שמכסה רק את החלק התחתון של הטקסט, ומנפיש את <code>background-size</code> מ-0% ל-100%.</p>
<ul>
  <li><strong>gradient trick:</strong> הגרדיאנט שקוף ב-55% העליונים וצבעוני ב-45% התחתונים, מה שיוצר "הדגשה" שלא מסתירה את הטקסט.</li>
  <li><strong>background-size:</strong> מתחיל ב-<code>0% 100%</code> (אפס רוחב) ומונפש ל-<code>100% 100%</code>, מה שיוצר אפקט "מריחה" משמאל לימין.</li>
  <li><strong>השהיות:</strong> כל שורה מתחילה אחרי הקודמת כדי ליצור אפקט קריאה מדורג.</li>
  <li><strong>צבעים שונים:</strong> ניתן לשנות את צבע ההדגשה לכל שורה בנפרד ליצירת מגוון ויזואלי.</li>
</ul>
<p>האפקט מושלם להדגשת טקסט חשוב — מקנה תחושת אותנטיות כמו מרקר אמיתי על נייר.</p>`,
    proTipHe: 'השתמשו ב-background-position: right במקום left כדי שההדגשה תגלוש מימין — מתאים יותר לעברית.',
  },

  // ─── 7. Flip Word ────────────────────────────────────────────────────
  {
    id: 'flipword',
    title: 'Flip Word',
    titleHe: 'מילים מתהפכות',
    description: 'Words flip on the Y axis to reveal the next word in a rotating list with 3D perspective.',
    descriptionHe: 'מילים מתהפכות על ציר ה-Y לחשוף את המילה הבאה ברשימה מסתובבת עם פרספקטיבה תלת-ממדית.',
    categories: ['text'],
    tags: [{ label: 'flip' }, { label: '3D' }, { label: 'rotate' }],
    difficulty: 'intermediate' as const,
    previewComponent: 'flipword',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Flip Word</title>
<!-- Flip Word — Words flip on Y axis to reveal the next word in a list -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    color: #fff;
  }
  .flip-container {
    font-size: 2.5rem; font-weight: 700;
    display: flex; align-items: center; gap: 16px;
  }
  .flip-slot {
    perspective: 600px; /* depth for 3D flip */
    display: inline-block; position: relative;
    height: 1.3em; overflow: hidden;
    min-width: 200px; text-align: center;
  }
  .flip-word {
    display: block;
    backface-visibility: hidden;
    color: #6c63ff;
    animation: flipIn 0.6s ease forwards;
  }
  .flip-word.exit {
    animation: flipOut 0.6s ease forwards;
    position: absolute; top: 0; left: 0; width: 100%;
  }
  @keyframes flipIn {
    from { transform: rotateX(-90deg); opacity: 0; }
    to   { transform: rotateX(0deg);   opacity: 1; }
  }
  @keyframes flipOut {
    from { transform: rotateX(0deg);   opacity: 1; }
    to   { transform: rotateX(90deg);  opacity: 0; }
  }
</style>
</head>
<body>
  <div class="flip-container">
    <span>We build</span>
    <div class="flip-slot" id="slot"></div>
  </div>
  <script>
    const words = ['websites', 'products', 'dreams', 'brands', 'futures'];
    const slot = document.getElementById('slot');
    let idx = 0;

    function showWord() {
      /* Exit current */
      const current = slot.querySelector('.flip-word:not(.exit)');
      if (current) {
        current.classList.add('exit');
        setTimeout(() => current.remove(), 600); /* remove after flip-out */
      }
      /* Enter new */
      const span = document.createElement('span');
      span.className = 'flip-word';
      span.textContent = words[idx];
      slot.appendChild(span);
      idx = (idx + 1) % words.length;
    }

    showWord();
    setInterval(showWord, 2500); /* switch every 2.5 seconds */
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט המילים המתהפכות עובד?</h4>
<p>מילה אחת "מתהפכת" החוצה על ציר X, ומילה חדשה "מתהפכת" פנימה מהכיוון הנגדי, ביצירת אשליה של קוביה מסתובבת.</p>
<ul>
  <li><strong>perspective:</strong> <code>perspective: 600px</code> על המכיל יוצר עומק תלת-ממדי שגורם ל-<code>rotateX</code> להיראות כמו סיבוב אמיתי.</li>
  <li><strong>flipOut / flipIn:</strong> שתי אנימציות — האחת מסובבת את המילה הנוכחית 90 מעלות החוצה, והשנייה מכניסה מילה חדשה מ-90 מעלות הנגדיות.</li>
  <li><strong>backface-visibility:</strong> מסתיר את הצד האחורי של המילה בזמן הסיבוב כדי שלא נראה טקסט הפוך.</li>
  <li><strong>overflow: hidden:</strong> על המכיל מסתיר חלקים של המילה שיוצאים מהמסגרת בזמן הסיבוב.</li>
</ul>
<p>האפקט מושלם לסלוגנים דינמיים בדף הבית — "אנחנו בונים [אתרים / מוצרים / חלומות]".</p>`,
    proTipHe: 'הוסיפו text-shadow עדין בזמן ה-flip כדי להעצים את אפקט התלת-מימד.',
  },

  // ─── 8. Stacked Text ─────────────────────────────────────────────────
  {
    id: 'stackedtext',
    title: 'Stacked Text',
    titleHe: 'טקסט מוערם',
    description: 'Multiple text layers with different opacities that spread apart on hover for a depth effect.',
    descriptionHe: 'מספר שכבות טקסט עם שקיפויות שונות שנפרדות בריחוף ליצירת אפקט עומק.',
    categories: ['text'],
    tags: [{ label: 'stack' }, { label: 'layers' }, { label: 'hover' }],
    difficulty: 'beginner' as const,
    previewComponent: 'stackedtext',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Stacked Text</title>
<!-- Stacked Text — Layered text copies spread apart on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .stack-wrap {
    position: relative; cursor: pointer;
    font-size: 4rem; font-weight: 900;
  }
  .stack-layer {
    position: absolute; top: 0; left: 0;
    transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1),
                opacity 0.5s ease;
    user-select: none;
  }
  .stack-layer:nth-child(1) { color: rgba(108,99,255,0.15); } /* deepest */
  .stack-layer:nth-child(2) { color: rgba(108,99,255,0.30); }
  .stack-layer:nth-child(3) { color: rgba(108,99,255,0.50); }
  .stack-front { position: relative; color: #fff; z-index: 4; }

  .stack-wrap:hover .stack-layer:nth-child(1) {
    transform: translate(-12px, -12px); /* offset back layer */
  }
  .stack-wrap:hover .stack-layer:nth-child(2) {
    transform: translate(-8px, -8px);
  }
  .stack-wrap:hover .stack-layer:nth-child(3) {
    transform: translate(-4px, -4px);
  }
  .label { color: #555; font-size: 0.85rem; text-align: center; margin-top: 2rem; }
</style>
</head>
<body>
  <div style="text-align:center">
    <div class="stack-wrap">
      <span class="stack-layer">STACK</span>
      <span class="stack-layer">STACK</span>
      <span class="stack-layer">STACK</span>
      <span class="stack-front">STACK</span>
    </div>
    <div class="label">Hover to expand layers</div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הטקסט המוערם עובד?</h4>
<p>מספר עותקים של אותו טקסט מונחים אחד על השני עם שקיפויות שונות, ובריחוף הם נפרדים ליצירת אפקט עומק תלת-ממדי.</p>
<ul>
  <li><strong>שכבות:</strong> 3 עותקים עם <code>position: absolute</code> ושקיפויות הולכות ועולות (15%, 30%, 50%), ושכבה קדמית לבנה.</li>
  <li><strong>hover transform:</strong> בריחוף, כל שכבה זזה במרחק שונה — השכבה העמוקה ביותר זזה הכי הרבה (-12px), ויוצרת פרספקטיבה.</li>
  <li><strong>cubic-bezier:</strong> עקומת תזמון חלקה עם האטה בסוף נותנת תחושה אלגנטית של "פתיחה".</li>
  <li><strong>z-index:</strong> השכבה הקדמית עם <code>position: relative</code> ו-<code>z-index: 4</code> תמיד נשארת מעל.</li>
</ul>
<p>אפקט פשוט ואלגנטי שמוסיף ממד של עומק לכותרות בלי צורך בתלת-מימד אמיתי.</p>`,
    proTipHe: 'נסו לשנות את כיוון ה-translate לכל שכבה בנפרד ליצירת אפקט "התפוצצות" מעניין.',
  },

  // ─── 9. Gradient Text ────────────────────────────────────────────────
  {
    id: 'gradienttext',
    title: 'Gradient Text',
    titleHe: 'טקסט גרדיאנט',
    description: 'Animated moving gradient inside text using background-clip and background-position animation.',
    descriptionHe: 'גרדיאנט נע מונפש בתוך טקסט באמצעות background-clip ואנימציית background-position.',
    categories: ['text'],
    tags: [{ label: 'gradient' }, { label: 'color' }, { label: 'clip' }],
    difficulty: 'beginner' as const,
    previewComponent: 'gradienttext',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Gradient Text</title>
<!-- Gradient Text — Moving gradient clipped to text shape -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 1rem;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .gradient-text {
    font-size: 4.5rem; font-weight: 900;
    background: linear-gradient(
      90deg,
      #6c63ff, #ec4899, #06b6d4, #a855f7, #6c63ff
    );
    background-size: 300% 100%; /* 3x width for smooth travel */
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 4s linear infinite;
  }
  .sub { color: #555; font-size: 0.9rem; }
  @keyframes gradient-shift {
    0%   { background-position: 0% 50%; }
    100% { background-position: 300% 50%; } /* travel full 300% width */
  }
</style>
</head>
<body>
  <div class="gradient-text">GRADIENT</div>
  <div class="sub">Animated gradient clipped to text</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט הגרדיאנט בטקסט עובד?</h4>
<p>גרדיאנט צבעוני רחב שנחתך לצורת הטקסט באמצעות <code>background-clip: text</code>, ותנועתו מונפשת דרך <code>background-position</code>.</p>
<ul>
  <li><strong>background-clip: text:</strong> גורם לרקע להיות גלוי רק בתוך צורת האותיות — השאר שקוף. חייבים <code>-webkit-text-fill-color: transparent</code> כדי שזה יעבוד.</li>
  <li><strong>background-size: 300%:</strong> הגרדיאנט רחב פי 3 מהטקסט כדי שתהיה מספיק "דרך" לנוע — ככה האנימציה חלקה ולא קופצת.</li>
  <li><strong>gradient-shift:</strong> אנימציה שמזיזה את <code>background-position</code> מ-0% ל-300%, מה שגורם לצבעים "לזרום" דרך הטקסט.</li>
  <li><strong>חזרה על צבעים:</strong> הגרדיאנט מתחיל ומסתיים באותו צבע (#6c63ff) כך שהלולאה חלקה בלי "קפיצה".</li>
</ul>
<p>אפקט קלאסי ופופולרי מאוד — מתאים לכותרות, לוגואים וכל טקסט שרוצים להדגיש בצורה דינמית.</p>`,
    proTipHe: 'הוסיפו הרבה צבעים לגרדיאנט ושנו את המהירות כדי ליצור אפקט קשת בענן נעה.',
  },

  // ─── 10. Glow Pulse ──────────────────────────────────────────────────
  {
    id: 'glowpulse',
    title: 'Glow Pulse',
    titleHe: 'פולס זוהר',
    description: 'Text glows and pulses with layered text-shadow animation for a neon breathing effect.',
    descriptionHe: 'טקסט זוהר ופועם עם אנימציית text-shadow בשכבות ליצירת אפקט ניאון נושם.',
    categories: ['text'],
    tags: [{ label: 'glow' }, { label: 'pulse' }, { label: 'neon' }],
    difficulty: 'beginner' as const,
    previewComponent: 'glowpulse',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Glow Pulse</title>
<!-- Glow Pulse — Layered text-shadow creates pulsing neon glow -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .glow-text {
    font-size: 4rem; font-weight: 900; color: #fff;
    animation: glow-pulse 2s ease-in-out infinite alternate;
  }
  @keyframes glow-pulse {
    0% {
      text-shadow:
        0 0 4px rgba(108,99,255,0.5),    /* tight glow */
        0 0 11px rgba(108,99,255,0.3),   /* medium spread */
        0 0 19px rgba(108,99,255,0.15);  /* wide ambient */
    }
    100% {
      text-shadow:
        0 0 8px rgba(108,99,255,0.8),    /* intensified tight */
        0 0 25px rgba(108,99,255,0.5),   /* intensified medium */
        0 0 46px rgba(108,99,255,0.3),   /* intensified wide */
        0 0 80px rgba(108,99,255,0.15);  /* extra ambient ring */
    }
  }
  .sub-glow {
    font-size: 1rem; color: #666; margin-top: 1rem; text-align: center;
    animation: glow-sub 2s ease-in-out infinite alternate;
  }
  @keyframes glow-sub {
    0% { text-shadow: 0 0 4px rgba(236,72,153,0.3); }
    100% { text-shadow: 0 0 20px rgba(236,72,153,0.4); }
  }
</style>
</head>
<body>
  <div style="text-align:center">
    <div class="glow-text">GLOW</div>
    <div class="sub-glow">Pulsing neon text shadow</div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט פולס הזוהר עובד?</h4>
<p>מספר שכבות של <code>text-shadow</code> ברדיוסים שונים מונפשות בין עוצמה נמוכה לגבוהה, מה שיוצר אפקט "נשימה" של ניאון.</p>
<ul>
  <li><strong>text-shadow מרובה:</strong> שלוש עד ארבע שכבות צל עם רדיוס טשטוש הולך וגדל (4px, 11px, 19px, 80px) יוצרות זוהר "שופע".</li>
  <li><strong>alternate:</strong> מילת המפתח <code>alternate</code> באנימציה גורמת לה לנוע הלוך וחזור — מזוהר חלש לחזק ובחזרה.</li>
  <li><strong>opacity layers:</strong> כל שכבת צל עם שקיפות שונה — הקרובה חזקה (0.8), הרחוקה עדינה (0.15), מה שמדמה הילה אמיתית.</li>
  <li><strong>ease-in-out:</strong> האטה בשתי הקצוות יוצרת תחושת "נשימה" טבעית ולא מכנית.</li>
</ul>
<p>אפקט קלאסי של שלטי ניאון דיגיטליים — מתאים מצוין לכותרות hero על רקע כהה.</p>`,
    proTipHe: 'שלבו מספר צבעים בשכבות text-shadow שונות (למשל כחול וורוד) ליצירת זוהר ניאון דו-גוני.',
  },

  // ─── 11. Text Mask ───────────────────────────────────────────────────
  {
    id: 'textmask',
    title: 'Text Mask',
    titleHe: 'מסכת טקסט',
    description: 'A video or animated gradient plays inside text letters using mix-blend-mode masking.',
    descriptionHe: 'וידאו או גרדיאנט מונפש מופעל בתוך אותיות טקסט באמצעות מיסוך mix-blend-mode.',
    categories: ['text'],
    tags: [{ label: 'mask' }, { label: 'blend' }, { label: 'video' }],
    difficulty: 'advanced' as const,
    previewComponent: 'textmask',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Mask</title>
<!-- Text Mask — Animated gradient visible only inside text via mix-blend-mode -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #000; font-family: sans-serif;
  }
  .mask-container {
    position: relative; width: 600px; height: 200px;
    overflow: hidden;
    background: #000; /* must be black for multiply blend */
  }
  .gradient-bg {
    position: absolute; inset: 0;
    background: linear-gradient(
      135deg, #6c63ff, #ec4899, #06b6d4, #a855f7
    );
    background-size: 400% 400%;
    animation: gradient-move 6s ease infinite;
    z-index: 1;
  }
  @keyframes gradient-move {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .mask-text {
    position: absolute; inset: 0; z-index: 2;
    display: flex; align-items: center; justify-content: center;
    font-size: 7rem; font-weight: 900;
    color: #000;                    /* black text */
    background: #000;               /* black fill around text */
    mix-blend-mode: multiply;       /* black stays, text reveals gradient */
    letter-spacing: 6px;
    user-select: none;
  }
  /* Blend explanation:
     multiply: black * anything = black (hides gradient)
               white * anything = that color (but we use knockout text)
     Since text is black on black bg, the text area shows the gradient underneath. */
</style>
</head>
<body>
  <div class="mask-container">
    <div class="gradient-bg"></div>
    <div class="mask-text">MASK</div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט מסכת הטקסט עובד?</h4>
<p>הטריק משתמש ב-<code>mix-blend-mode: multiply</code> כדי שרק אזור הטקסט יחשוף את הגרדיאנט המונפש שמתחתיו.</p>
<ul>
  <li><strong>multiply blend:</strong> במצב multiply, שחור * כל צבע = שחור (מסתיר), אבל האזור שבו הטקסט שחור על רקע שחור נהפך לשקוף ומגלה את מה שמתחת.</li>
  <li><strong>מבנה שכבות:</strong> שכבת גרדיאנט מונפש למטה (z-index: 1), ושכבת טקסט שחור על רקע שחור למעלה (z-index: 2).</li>
  <li><strong>animated gradient:</strong> הגרדיאנט נע באלכסון עם <code>background-size: 400%</code> ו-<code>background-position</code> מונפש ליצירת תנועת צבע חיה.</li>
  <li><strong>knockout effect:</strong> התוצאה — הטקסט "חותך" חור בשכבה השחורה ומגלה את הגרדיאנט הצבעוני רק בתוך האותיות.</li>
</ul>
<p>ניתן להחליף את הגרדיאנט בוידאו HTML5 לקבלת אפקט דרמטי עוד יותר של סרטון שמופעל בתוך אותיות.</p>`,
    proTipHe: 'החליפו את הגרדיאנט בוידאו עם autoplay ו-loop לקבלת אפקט מרהיב של וידאו בתוך טקסט.',
  },

  // ─── 12. Bounce Letters ──────────────────────────────────────────────
  {
    id: 'bounceletters',
    title: 'Bounce Letters',
    titleHe: 'אותיות קופצות',
    description: 'Letters bounce in sequence with spring physics feel using cubic-bezier easing.',
    descriptionHe: 'אותיות קופצות ברצף עם תחושת פיזיקת קפיץ באמצעות עקומת cubic-bezier.',
    categories: ['text'],
    tags: [{ label: 'bounce' }, { label: 'spring' }, { label: 'sequence' }],
    difficulty: 'beginner' as const,
    previewComponent: 'bounceletters',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Bounce Letters</title>
<!-- Bounce Letters — Each letter drops in with spring-like bounce -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .bounce-container { display: flex; }
  .bounce-char {
    font-size: 4rem; font-weight: 900; color: #fff;
    display: inline-block; opacity: 0;
    animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .bounce-char.space { width: 18px; }
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: translateY(-80px) scale(0.6); /* start above */
    }
    60% {
      opacity: 1;
      transform: translateY(8px) scale(1.05);  /* overshoot below */
    }
    80% {
      transform: translateY(-4px) scale(0.98);  /* small rebound */
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);        /* settle */
    }
  }
  .replay-btn {
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    padding: 10px 28px; background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.4); border-radius: 8px;
    color: #fff; cursor: pointer; font-size: 0.9rem;
  }
</style>
</head>
<body>
  <div class="bounce-container" id="container"></div>
  <button class="replay-btn" id="replay">Replay</button>
  <script>
    const text = 'BOUNCE';
    const container = document.getElementById('container');

    function render() {
      container.innerHTML = '';
      text.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'bounce-char' + (ch === ' ' ? ' space' : '');
        span.textContent = ch === ' ' ? '' : ch;
        span.style.animationDelay = (i * 0.08) + 's'; /* 80ms stagger */
        container.appendChild(span);
      });
    }

    render();
    document.getElementById('replay').addEventListener('click', render);
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט האותיות הקופצות עובד?</h4>
<p>כל אות "נופלת" מלמעלה ועוברת overshoot קל כמו קפיץ — מעבר למיקום הסופי, ריבאונד קטן, ואז התייצבות.</p>
<ul>
  <li><strong>cubic-bezier(0.34, 1.56, 0.64, 1):</strong> עקומה עם ערך Y גדול מ-1 שיוצרת אפקט "קפיצה מעבר" (overshoot) — זה הסוד של תחושת הקפיץ.</li>
  <li><strong>keyframes מרובים:</strong> 4 שלבים — נפילה מלמעלה (0%), חריגה קלה למטה (60%), ריבאונד קטן למעלה (80%), והתייצבות (100%).</li>
  <li><strong>scale:</strong> שינוי scale קל (0.6 → 1.05 → 0.98 → 1) מעצים את תחושת הקפיציות.</li>
  <li><strong>stagger:</strong> השהיה של 80ms בין כל אות יוצרת אפקט גל של "קפיצות".</li>
</ul>
<p>אפקט מצוין לכותרות ולוגואים — נותן אנרגיה עליזה ותחושת חיות לטקסט סטטי.</p>`,
    proTipHe: 'שחקו עם ערכי ה-cubic-bezier — ערך Y מעל 1 יוצר overshoot חזק יותר.',
  },

  // ─── 13. Rotate Words ────────────────────────────────────────────────
  {
    id: 'rotatewords',
    title: 'Rotate Words',
    titleHe: 'מילים מסתובבות',
    description: 'One word rotates out on X axis while the next word rotates in — a 3D word carousel.',
    descriptionHe: 'מילה אחת מסתובבת החוצה על ציר X בזמן שהבאה מסתובבת פנימה — קרוסלת מילים תלת-ממדית.',
    categories: ['text'],
    tags: [{ label: 'rotate' }, { label: '3D' }, { label: 'carousel' }],
    difficulty: 'intermediate' as const,
    previewComponent: 'rotatewords',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Rotate Words</title>
<!-- Rotate Words — Words rotate in/out on X axis like a vertical carousel -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif; color: #fff;
  }
  .rotate-container {
    text-align: center;
    font-size: 2.5rem; font-weight: 700;
  }
  .rotate-slot {
    display: inline-block; position: relative;
    height: 1.4em; overflow: hidden;
    perspective: 400px; /* 3D depth */
    vertical-align: bottom;
    min-width: 220px;
  }
  .rotate-word {
    display: block; color: #6c63ff;
    transform-origin: center bottom;
    position: absolute; width: 100%;
    top: 0; left: 0;
    animation: rotate-in 0.6s ease forwards;
  }
  .rotate-word.exiting {
    animation: rotate-out 0.6s ease forwards;
  }
  @keyframes rotate-in {
    from { transform: rotateX(-80deg); opacity: 0; }
    to   { transform: rotateX(0deg);   opacity: 1; }
  }
  @keyframes rotate-out {
    from { transform: rotateX(0deg);   opacity: 1; }
    to   { transform: rotateX(80deg);  opacity: 0; }
  }
</style>
</head>
<body>
  <div class="rotate-container">
    <div>Think</div>
    <div class="rotate-slot" id="slot"></div>
  </div>
  <script>
    const words = ['different', 'creative', 'bigger', 'forward', 'boldly'];
    const slot = document.getElementById('slot');
    let idx = 0;

    function next() {
      const prev = slot.querySelector('.rotate-word:not(.exiting)');
      if (prev) {
        prev.classList.add('exiting');
        setTimeout(() => prev.remove(), 600);
      }
      const el = document.createElement('span');
      el.className = 'rotate-word';
      el.textContent = words[idx];
      slot.appendChild(el);
      idx = (idx + 1) % words.length;
    }

    next();
    setInterval(next, 2500); /* rotate every 2.5s */
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט המילים המסתובבות עובד?</h4>
<p>כל מילה מסתובבת פנימה על ציר X מלמטה, ומסתובבת החוצה למעלה כשהבאה מגיעה — כמו קרוסלה אנכית.</p>
<ul>
  <li><strong>rotateX:</strong> סיבוב על ציר X גורם לטקסט "להתהפך" כמו לוח מודעות ישן — המילה נעלמת ככל שמסתובבת מעבר ל-90 מעלות.</li>
  <li><strong>perspective:</strong> <code>perspective: 400px</code> על המכיל נותן עומק לסיבוב — בלעדיו האנימציה תיראה שטוחה.</li>
  <li><strong>transform-origin:</strong> <code>center bottom</code> גורם לסיבוב להיות מנקודת הבסיס, כאילו המילה נופלת קדימה.</li>
  <li><strong>overflow: hidden:</strong> מסתיר את חלקי המילה שנמצאים מחוץ לתיבה בזמן הסיבוב.</li>
</ul>
<p>אפקט אלגנטי ומקצועי שמתאים לסלוגנים משתנים כמו "חשבו [אחרת / גדול / קדימה]".</p>`,
    proTipHe: 'שנו את transform-origin ל-center top כדי שהמילה תסתובב לכיוון ההפוך — למטה במקום למעלה.',
  },

  // ─── 14. Text Fill Hover ─────────────────────────────────────────────
  {
    id: 'textfillhover',
    title: 'Text Fill Hover',
    titleHe: 'מילוי טקסט hover',
    description: 'Outlined text fills with color on hover using a sliding background-clip technique.',
    descriptionHe: 'טקסט מקווקו מתמלא בצבע בריחוף באמצעות טכניקת background-clip נגללת.',
    categories: ['text'],
    tags: [{ label: 'fill' }, { label: 'hover' }, { label: 'outline' }],
    difficulty: 'intermediate' as const,
    previewComponent: 'textfillhover',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Fill Hover</title>
<!-- Text Fill Hover — Outlined text fills with color on hover via clip -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 2rem;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .fill-text {
    font-size: 4rem; font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 2px rgba(255,255,255,0.4); /* outline */
    position: relative; cursor: pointer;
    display: inline-block;
  }
  .fill-text::after {
    content: attr(data-text);
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    color: #6c63ff;
    -webkit-text-stroke: 0;
    clip-path: inset(0 100% 0 0);   /* hidden: clip from right */
    transition: clip-path 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .fill-text:hover::after {
    clip-path: inset(0 0 0 0);       /* fully visible */
  }
  .label { color: #555; font-size: 0.85rem; }
</style>
</head>
<body>
  <span class="fill-text" data-text="HOVER ME">HOVER ME</span>
  <span class="fill-text" data-text="FILL EFFECT">FILL EFFECT</span>
  <div class="label">Hover over the text</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט מילוי הטקסט עובד?</h4>
<p>הטקסט מוצג כקו מתאר בלבד, ובריחוף שכבת צבע מלא "נחשפת" מצד אחד באמצעות אנימציית <code>clip-path</code>.</p>
<ul>
  <li><strong>-webkit-text-stroke:</strong> יוצר קו מתאר סביב האותיות בלי מילוי — הטקסט עצמו שקוף (<code>color: transparent</code>).</li>
  <li><strong>pseudo-element:</strong> <code>::after</code> עם <code>attr(data-text)</code> מכיל עותק צבעוני (מלא) של הטקסט שמכוסה ב-<code>clip-path</code>.</li>
  <li><strong>clip-path: inset:</strong> <code>inset(0 100% 0 0)</code> חותך את כל הטקסט הצבעוני מימין. בריחוף משתנה ל-<code>inset(0 0 0 0)</code> — חשיפה מלאה.</li>
  <li><strong>transition:</strong> המעבר החלק של clip-path יוצר אנימציית "מילוי" מלאה משמאל לימין.</li>
</ul>
<p>אפקט hover מרשים שעובד מצוין על תפריטי ניווט, כותרות וכפתורי call-to-action.</p>`,
    proTipHe: 'שנו את כיוון ה-clip-path (למשל inset(100% 0 0 0)) כדי שהמילוי יגיע מלמעלה למטה.',
  },

  // ─── 15. Text Flicker ────────────────────────────────────────────────
  {
    id: 'textflicker',
    title: 'Text Flicker',
    titleHe: 'טקסט מהבהב',
    description: 'Random flicker and noise on text like an old CRT monitor with glitch artifacts.',
    descriptionHe: 'הבהוב ורעש אקראי על טקסט כמו מסך CRT ישן עם ארטיפקטים של תקלה.',
    categories: ['text'],
    tags: [{ label: 'flicker' }, { label: 'CRT' }, { label: 'retro' }],
    difficulty: 'intermediate' as const,
    previewComponent: 'textflicker',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Flicker</title>
<!-- Text Flicker — CRT-style random opacity flicker on text -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: 'Courier New', monospace;
  }
  .flicker-text {
    font-size: 3.5rem; font-weight: 700; color: #fff;
    text-shadow: 0 0 8px rgba(108,99,255,0.6);
    animation: flicker 0.15s infinite; /* fast flicker cycle */
  }
  @keyframes flicker {
    0%  { opacity: 1; }
    5%  { opacity: 0.85; }
    10% { opacity: 1; }
    15% { opacity: 0.4;  text-shadow: 0 0 12px rgba(108,99,255,0.8); }
    20% { opacity: 1; }
    50% { opacity: 1; }
    55% { opacity: 0.7; }
    60% { opacity: 1; }
    80% { opacity: 0.9; }
    85% { opacity: 0.3;  transform: translateX(2px); } /* slight jitter */
    90% { opacity: 1;    transform: translateX(0); }
    100%{ opacity: 1; }
  }
  .scanlines {
    position: fixed; inset: 0; pointer-events: none;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px
    );
    z-index: 10;
  }
  .vignette {
    position: fixed; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6));
    z-index: 9;
  }
</style>
</head>
<body>
  <div class="scanlines"></div>
  <div class="vignette"></div>
  <div class="flicker-text">SIGNAL LOST</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט ההבהוב עובד?</h4>
<p>אנימציית <code>@keyframes</code> מהירה (150ms) שמשנה את <code>opacity</code> של הטקסט בערכים אקראיים, בשילוב עם קווי סריקה וויניט.</p>
<ul>
  <li><strong>flicker keyframes:</strong> שינויי opacity לא-סדירים (1 → 0.85 → 0.4 → 1 → 0.3) יוצרים הבהוב שנראה אקראי למרות שהוא מוגדר מראש.</li>
  <li><strong>translateX jitter:</strong> תזוזה קטנה של 2px בנקודה אחת יוצרת "רעידה" שמוסיפה לתחושת התקלה.</li>
  <li><strong>text-shadow דינמי:</strong> הזוהר מתחזק ברגעי הבהוב מסוימים, כמו שלט ניאון שמפספס חשמל.</li>
  <li><strong>scanlines:</strong> <code>repeating-linear-gradient</code> יוצר קווים אופקיים דקים כמו במסך CRT ישן.</li>
  <li><strong>vignette:</strong> <code>radial-gradient</code> שמחשיך את הפינות כמו מסך טלוויזיה ישן.</li>
</ul>
<p>השילוב של הבהוב, קווי סריקה וויניט יוצר אסתטיקת רטרו אותנטית של מסכי CRT.</p>`,
    proTipHe: 'האטו את האנימציה (0.5s במקום 0.15s) לאפקט הבהוב עדין יותר שמתאים לשילוב עם טקסט רגיל.',
  },

  // ─── 16. Typing Cursor ───────────────────────────────────────────────
  {
    id: 'typingcursor',
    title: 'Typing Cursor',
    titleHe: 'קורסור הקלדה',
    description: 'Multi-line typing effect with blinking cursor that types, erases, and moves to next line.',
    descriptionHe: 'אפקט הקלדה רב-שורתי עם קורסור מהבהב שמקליד, מוחק ועובר לשורה הבאה.',
    categories: ['text'],
    tags: [{ label: 'typing' }, { label: 'cursor' }, { label: 'terminal' }],
    difficulty: 'beginner' as const,
    previewComponent: 'typingcursor',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Typing Cursor</title>
<!-- Typing Cursor — Multi-line JS typing with blinking caret -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: 'Courier New', monospace;
  }
  .terminal {
    background: #111; border-radius: 12px; padding: 24px 32px;
    min-width: 420px; border: 1px solid #222;
  }
  .terminal-bar {
    display: flex; gap: 8px; margin-bottom: 16px;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot-r { background: #ff5f56; }
  .dot-y { background: #ffbd2e; }
  .dot-g { background: #27c93f; }
  #output {
    color: #0f0; font-size: 1rem; line-height: 1.7;
    min-height: 80px;
  }
  .cursor {
    display: inline-block; width: 8px; height: 1.1em;
    background: #0f0; vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
</style>
</head>
<body>
  <div class="terminal">
    <div class="terminal-bar">
      <div class="dot dot-r"></div>
      <div class="dot dot-y"></div>
      <div class="dot dot-g"></div>
    </div>
    <div id="output"><span class="cursor"></span></div>
  </div>
  <script>
    const lines = [
      '$ npm install effects-lab',
      '> Installing dependencies...',
      '> Build successful!',
      '$ echo "Ready to go!"',
    ];
    const output = document.getElementById('output');
    let lineIdx = 0, charIdx = 0;

    function type() {
      if (lineIdx >= lines.length) { lineIdx = 0; output.innerHTML = ''; }
      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        /* rebuild all completed lines + current partial line + cursor */
        const prev = lines.slice(0, lineIdx).join('<br/>');
        const curr = line.slice(0, charIdx);
        output.innerHTML = (prev ? prev + '<br/>' : '') + curr + '<span class="cursor"></span>';
        charIdx++;
        setTimeout(type, 50); /* 50ms per character */
      } else {
        charIdx = 0;
        lineIdx++;
        setTimeout(type, 800); /* 800ms pause between lines */
      }
    }
    type();
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט קורסור ההקלדה עובד?</h4>
<p>סקריפט JavaScript מדמה הקלדה אות-אות עם קורסור מהבהב, עם תמיכה במעבר אוטומטי בין שורות.</p>
<ul>
  <li><strong>type function:</strong> פונקציה רקורסיבית שמוסיפה תו אחד בכל קריאה באמצעות <code>slice(0, charIdx)</code> ומתקדמת.</li>
  <li><strong>multi-line:</strong> כשמגיעים לסוף שורה, <code>lineIdx</code> עולה ו-<code>charIdx</code> מתאפס — מתחילים שורה חדשה.</li>
  <li><strong>cursor blink:</strong> אלמנט <code>span.cursor</code> עם אנימציית <code>step-end</code> שמפחיתה opacity ל-0 כל 50% — הבהוב חד.</li>
  <li><strong>timing:</strong> 50ms בין תווים (מהירות הקלדה), 800ms הפסקה בין שורות (שנראית כמו "חשיבה").</li>
  <li><strong>loop:</strong> כשכל השורות הושלמו, חוזרים להתחלה ומנקים את המסך.</li>
</ul>
<p>אפקט קלאסי לדפי portfolio של מפתחים ודפי נחיתה טכנולוגיים.</p>`,
    proTipHe: 'הוסיפו צבעים שונים לכל שורה (למשל ירוק לפלט, לבן לפקודות) לתחושת טרמינל אותנטית.',
  },

  // ─── 17. Text Wave 3D ────────────────────────────────────────────────
  {
    id: 'textwave3d',
    title: 'Text Wave 3D',
    titleHe: 'גל טקסט 3D',
    description: 'Text letters rotate on X axis in a wave sequence with perspective for a 3D ribbon effect.',
    descriptionHe: 'אותיות טקסט מסתובבות על ציר X בגל רצוף עם פרספקטיבה ליצירת אפקט סרט תלת-ממדי.',
    categories: ['text'],
    tags: [{ label: '3D' }, { label: 'wave' }, { label: 'perspective' }],
    difficulty: 'advanced' as const,
    previewComponent: 'textwave3d',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Wave 3D</title>
<!-- Text Wave 3D — Letters rotate on X axis in a wave with perspective -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .wave3d-container {
    display: flex;
    perspective: 500px; /* 3D depth for all children */
  }
  .wave3d-char {
    font-size: 4rem; font-weight: 900; color: #fff;
    display: inline-block;
    transform-style: preserve-3d;
    animation: wave3d 2s ease-in-out infinite;
  }
  @keyframes wave3d {
    0%, 100% {
      transform: rotateX(0deg);
      color: #fff;
    }
    25% {
      transform: rotateX(40deg);  /* tilt forward */
      color: #6c63ff;
    }
    50% {
      transform: rotateX(0deg);
    }
    75% {
      transform: rotateX(-40deg); /* tilt backward */
      color: #ec4899;
    }
  }
</style>
</head>
<body>
  <div class="wave3d-container" id="wave3d"></div>
  <script>
    const text = '3D WAVE';
    const container = document.getElementById('wave3d');
    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'wave3d-char';
      if (ch === ' ') {
        span.style.width = '20px'; /* visible space width */
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = ch;
      }
      span.style.animationDelay = (i * 0.12) + 's'; /* 120ms stagger */
      container.appendChild(span);
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט גל הטקסט התלת-ממדי עובד?</h4>
<p>כל אות מסתובבת על ציר X קדימה ואחורה בתזמון מדורג, מה שיוצר גל תלת-ממדי שעובר לאורך הטקסט.</p>
<ul>
  <li><strong>perspective:</strong> <code>perspective: 500px</code> על המכיל נותן עומק תלת-ממדי — ככל שהערך קטן יותר, האפקט דרמטי יותר.</li>
  <li><strong>rotateX:</strong> סיבוב על ציר X גורם לאות "להתקפל" קדימה (40deg) ואחורה (-40deg) — כמו גל בים.</li>
  <li><strong>preserve-3d:</strong> <code>transform-style: preserve-3d</code> שומר על ההקשר התלת-ממדי של כל אות.</li>
  <li><strong>color shift:</strong> הצבע משתנה בזמן הסיבוב — סגול כשמסתובבת קדימה, ורוד כשאחורה — מוסיף ממד ויזואלי.</li>
  <li><strong>stagger 120ms:</strong> ההשהיה המדורגת יוצרת את הגל — כל אות מגיבה מעט אחרי הקודמת.</li>
</ul>
<p>אפקט מרשים שמשלב טקסט עם תנועה תלת-ממדית — מתאים לכותרות גדולות ופרזנטציות.</p>`,
    proTipHe: 'הוסיפו text-shadow שמשתנה עם הסיבוב כדי לדמות תאורה תלת-ממדית אמיתית.',
  },

  // ─── 18. Text Pressure ───────────────────────────────────────────────
  {
    id: 'textpressure',
    title: 'Text Pressure',
    titleHe: 'לחץ טקסט',
    description: 'Variable font weight changes dynamically based on cursor distance from each letter.',
    descriptionHe: 'משקל הפונט המשתנה נשלט דינמית לפי מרחק הסמן מכל אות.',
    categories: ['text'],
    tags: [{ label: 'variable-font' }, { label: 'cursor' }, { label: 'interactive' }],
    difficulty: 'advanced' as const,
    previewComponent: 'textpressure',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Pressure</title>
<!-- Text Pressure — Font weight reacts to cursor proximity per letter -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a;
    font-family: 'Inter', sans-serif;
  }
  .pressure-container { display: flex; flex-wrap: wrap; justify-content: center; }
  .pressure-char {
    font-size: 4rem;
    color: #fff;
    display: inline-block;
    transition: font-weight 0.15s ease, color 0.15s ease;
    font-weight: 100; /* minimum weight */
    line-height: 1.1;
  }
  .pressure-char.space { width: 20px; }
  .label {
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    color: #555; font-size: 0.85rem;
  }
</style>
</head>
<body>
  <div class="pressure-container" id="container"></div>
  <div class="label">Move your cursor near the text</div>
  <script>
    const text = 'PRESSURE';
    const container = document.getElementById('container');
    const spans = [];
    const maxDist = 150; /* px — influence radius */

    text.split('').forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'pressure-char' + (ch === ' ' ? ' space' : '');
      span.textContent = ch === ' ' ? '' : ch;
      container.appendChild(span);
      spans.push(span);
    });

    document.addEventListener('mousemove', (e) => {
      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        const ratio = Math.max(0, 1 - dist / maxDist); /* 0..1 */
        const weight = Math.round(100 + ratio * 800);   /* 100..900 */
        span.style.fontWeight = weight;
        /* color shifts from white to accent as weight increases */
        const r = Math.round(255 - ratio * 147); /* 255→108 */
        const g = Math.round(255 - ratio * 156); /* 255→99 */
        const b = Math.round(255 - ratio * 0);   /* stays 255 */
        span.style.color = \`rgb(\${r},\${g},\${b})\`;
      });
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך אפקט לחץ הטקסט עובד?</h4>
<p>כל אות "מרגישה" את הסמן — ככל שהוא קרוב יותר, המשקל (font-weight) עולה מ-100 (דק) ל-900 (עבה), ביצירת אפקט "לחץ".</p>
<ul>
  <li><strong>Variable Font:</strong> פונט משתנה כמו Inter תומך ב-font-weight רציף (100-900), מה שמאפשר מעבר חלק בלי "קפיצות".</li>
  <li><strong>חישוב מרחק:</strong> <code>Math.hypot</code> מחשב את המרחק בין הסמן למרכז כל אות.</li>
  <li><strong>ratio:</strong> <code>1 - dist/maxDist</code> נותן ערך בין 0 (רחוק) ל-1 (על האות). מכפילים ב-800 ומוסיפים 100 לקבלת משקל 100-900.</li>
  <li><strong>color shift:</strong> הצבע משתנה מלבן לסגול כשהמשקל עולה, מה שמחזק את האפקט הויזואלי.</li>
  <li><strong>transition:</strong> <code>transition: 0.15s</code> מחליק את שינויי המשקל כך שהם לא קופצים.</li>
</ul>
<p>אפקט אינטראקטיבי ייחודי שמשלב טיפוגרפיה דינמית עם מעקב אחר הסמן — מרשים מאוד בפורטפוליו.</p>`,
    proTipHe: 'נסו להוסיף font-variation-settings כדי לשלוט גם ברוחב ובנטייה של הפונט לפי מרחק הסמן.',
  },
];
