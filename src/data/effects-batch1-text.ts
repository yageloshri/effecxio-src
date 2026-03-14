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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כשמעבירים את העכבר מעל הטקסט, האותיות מתחילות לקפוץ ולהשתנות לתווים רנדומליים — כאילו מישהו מפענח קוד סודי. אחרי שנייה הכל מתייצב חזרה למילים המקוריות. האפקט הזה עובד עם JavaScript פשוט שמחליף כל אות באות אקראית כל 40 אלפיות שנייה, ובהדרגה מחזיר את האותיות הנכונות משמאל לימין.</p>`,
    proTipHe: 'שנו את מספר הסבבים לכל אות (3) כדי לשלוט במהירות ההתייצבות — ערך גבוה יותר = אנימציה ארוכה יותר.',
    promptHe: `אני רוצה ליצור אפקט טקסט מתערבב (Scramble Text) באתר שלי. כשמרחפים עם העכבר מעל טקסט, האותיות מתחלפות באופן אקראי ואז מתייצבות חזרה למילה המקורית.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה שיתערבב?\n2. מה גודל הפונט?\n3. מה צבע הטקסט והרקע?\n4. כמה מהר האותיות מתייצבות?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כשהדף נטען, כל אות עפה ממיקום אקראי על המסך ונוחתת בדיוק במקום שלה — כמו חתיכות פאזל שמתאספות. כל אות מגיעה עם השהייה קצרה אחרי הקודמת, מה שיוצר אפקט גלי ומסודר. בזמן הטיסה האותיות גם מטושטשות קצת ומסתובבות, וכשהן מגיעות למקום הן מתחדדות ומתיישרות.</p>`,
    proTipHe: 'הוסיפו perspective ל-container כדי לקבל תחושת תלת-מימד כשהאותיות עפות.',
    promptHe: `אני רוצה ליצור אפקט פיצול תווים (Split Char) באתר שלי. כשהדף נטען, כל אות עפה ממיקום אקראי ונוחתת במקום שלה עם אנימציה דרמטית.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה שיוצג?\n2. מה גודל הפונט והצבע?\n3. מה צבע הרקע?\n4. כמה מהירה האנימציה?\n5. האם להוסיף כפתור Replay?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>הטקסט נצייר על המסך כאילו מישהו משרטט אותו ביד — קו דק סגול שעוקב אחרי צורת האותיות לאט לאט. בסוף הציור הטקסט מתמלא בצבע לבן ונהיה מוצק. הכל נעשה עם SVG ואנימציית CSS שמזיזה את נקודת ההתחלה של הקו עד שהוא נראה במלואו.</p>`,
    proTipHe: 'השתמשו ב-getTotalLength() ב-JavaScript כדי לחשב את אורך הנתיב המדויק של כל אות.',
    promptHe: `אני רוצה ליצור אפקט קו מתאר טקסט (Stroke Text) באתר שלי. הטקסט נצייר על המסך כאילו מישהו משרטט אותו ביד, ואז מתמלא בצבע.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה?\n2. מה צבע הקו המתאר ומה צבע המילוי?\n3. מה גודל הפונט?\n4. כמה מהירה האנימציה?\n5. מה צבע הרקע?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>הטקסט מתחיל מטושטש לגמרי ובלתי נראה, כאילו מסתתר בתוך ערפל. בהדרגה הוא מתחדד ומתגלה — קודם השורה הראשונה, אחר כך השנייה, ואז השלישית. זה עובד עם אנימציית CSS פשוטה שמשנה את רמת הטשטוש מגבוהה לאפס ובמקביל מעלה את השקיפות.</p>`,
    proTipHe: 'שלבו את האפקט עם translateY קל כדי שהטקסט גם יעלה מלמטה תוך כדי התגלות.',
    promptHe: `אני רוצה ליצור אפקט חשיפת טשטוש (Blur Reveal) באתר שלי. טקסט שמתחיל מטושטש ובלתי נראה ובהדרגה מתחדד ומתגלה.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט (אפשר כמה שורות)?\n2. מה גודל הפונט לכל שורה?\n3. מה צבע הטקסט והרקע?\n4. כמה מהירה ההתגלות?\n5. האם להוסיף כפתור Replay?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כל אות בטקסט קופצת למעלה ולמטה בלולאה אינסופית, אבל כל אות מתחילה רגע אחרי הקודמת — וככה נוצר גל שעובר מהאות הראשונה עד האחרונה. האפקט כולו נעשה עם CSS בלבד, בלי JavaScript, באמצעות אנימציה שמזיזה כל אות למעלה ולמטה עם השהייה מדורגת.</p>`,
    proTipHe: 'הוסיפו שינוי צבע לכל אות לפי האינדקס כדי ליצור אפקט קשת בענן גלית.',
    promptHe: `אני רוצה ליצור אפקט טקסט גלי (Wavy Text) באתר שלי. כל אות מתנודדת למעלה ולמטה וזה יוצר גל שעובר לאורך המילה.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה?\n2. מה גודל הפונט והצבע?\n3. מה צבע הרקע?\n4. כמה גבוה הגל (כמה פיקסלים כל אות קופצת)?\n5. מה מהירות הגל?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>הדגשה צבעונית גולשת מתחת לטקסט, כמו שמישהו מעביר טוש מרקר בזמן אמת. ההדגשה מופיעה משמאל לימין, שורה אחרי שורה. הטריק הוא שימוש ברקע מדורג שמכסה רק את החלק התחתון של כל שורה, ואנימציה שמרחיבה אותו מאפס לרוחב מלא.</p>`,
    proTipHe: 'השתמשו ב-background-position: right במקום left כדי שההדגשה תגלוש מימין — מתאים יותר לעברית.',
    promptHe: `אני רוצה ליצור אפקט הדגשת טקסט (Highlight Text) באתר שלי. הדגשה צבעונית שגולשת מתחת לטקסט כמו טוש מרקר.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה להדגיש?\n2. מה צבע ההדגשה (אפשר כמה צבעים לשורות שונות)?\n3. מה גודל הפונט?\n4. מה צבע הטקסט והרקע?\n5. כמה מהירה אנימציית ההדגשה?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>מילה אחת מתהפכת ונעלמת, ובמקומה מגיעה מילה חדשה שמתהפכת פנימה — כמו לוח מודעות מתגלגל. זה מושלם לסלוגנים כמו "אנחנו בונים אתרים / מוצרים / חלומות". האפקט עובד עם אנימציית CSS שמסובבת את המילה ב-90 מעלות כדי שתיעלם, ומכניסה את המילה הבאה מהכיוון הנגדי עם תחושה תלת-ממדית.</p>`,
    proTipHe: 'הוסיפו text-shadow עדין בזמן ה-flip כדי להעצים את אפקט התלת-מימד.',
    promptHe: `אני רוצה ליצור אפקט מילים מתהפכות (Flip Word) באתר שלי. מילה אחת מתהפכת ונעלמת ומילה חדשה מגיעה במקומה באנימציה תלת-ממדית.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה המשפט הקבוע (למשל "אנחנו בונים")?\n2. מה רשימת המילים שמתחלפות?\n3. מה גודל הפונט והצבעים?\n4. כמה זמן כל מילה מוצגת לפני שמתחלפת?\n5. מה צבע הרקע?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כמה עותקים של אותו טקסט מונחים אחד על השני בשקיפויות שונות. כשמעבירים את העכבר מעל, השכבות נפרדות ונחשף אפקט עומק — כאילו הטקסט עשוי מכמה שכבות שפתאום נפתחות כמו מניפה. הכל נעשה עם CSS בלבד, בלי JavaScript, באמצעות שכבות עם שקיפות שונה שזזות בריחוף.</p>`,
    proTipHe: 'נסו לשנות את כיוון ה-translate לכל שכבה בנפרד ליצירת אפקט "התפוצצות" מעניין.',
    promptHe: `אני רוצה ליצור אפקט טקסט מוערם (Stacked Text) באתר שלי. כמה שכבות של אותו טקסט מונחות אחת על השנייה, ובריחוף הן נפרדות ויוצרות אפקט עומק.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה?\n2. מה גודל הפונט?\n3. כמה שכבות ומה הצבעים שלהן?\n4. מה צבע הרקע?\n5. לאיזה כיוון השכבות נפרדות בריחוף?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>הטקסט מלא בצבעי קשת שזורמים ומתנועעים בתוך האותיות — כאילו יש סרטון צבעוני שמנגן רק בתוך צורת האותיות. האפקט עובד עם רקע גרדיאנט שנחתך לצורת הטקסט, כך שרואים את הצבעים רק דרך האותיות. אנימציה פשוטה מזיזה את הצבעים כל הזמן כדי שייראה שהם זורמים.</p>`,
    proTipHe: 'הוסיפו הרבה צבעים לגרדיאנט ושנו את המהירות כדי ליצור אפקט קשת בענן נעה.',
    promptHe: `אני רוצה ליצור אפקט טקסט גרדיאנט (Gradient Text) באתר שלי. צבעים שזורמים ומתנועעים בתוך האותיות כמו קשת נעה.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה?\n2. מה הצבעים לגרדיאנט?\n3. מה גודל הפונט?\n4. כמה מהירה תנועת הצבעים?\n5. מה צבע הרקע?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>הטקסט זוהר כמו שלט ניאון ו"נושם" — הזוהר מתחזק ונחלש בלולאה אינסופית. התחושה היא של שלט ניאון שפועם באור. האפקט נעשה עם כמה שכבות של צל סביב הטקסט ברדיוסים שונים, ואנימציה שמשנה את העוצמה שלהם הלוך וחזור.</p>`,
    proTipHe: 'שלבו מספר צבעים בשכבות text-shadow שונות (למשל כחול וורוד) ליצירת זוהר ניאון דו-גוני.',
    promptHe: `אני רוצה ליצור אפקט פולס זוהר (Glow Pulse) באתר שלי. טקסט שזוהר כמו שלט ניאון ופועם באור לסירוגין.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה?\n2. מה צבע הזוהר?\n3. מה גודל הפונט?\n4. כמה חזק הזוהר ומה מהירות הפעימה?\n5. מה צבע הרקע?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>גרדיאנט צבעוני נע ומשתנה כל הזמן, אבל אפשר לראות אותו רק דרך צורת האותיות — כאילו הטקסט הוא חלון שדרכו רואים את הצבעים. הטריק הוא שכבה שחורה עם הטקסט שמונחת מעל הגרדיאנט, ומצב ערבוב מיוחד שגורם לאזור הטקסט להיות שקוף ולחשוף את מה שמתחת.</p>`,
    proTipHe: 'החליפו את הגרדיאנט בוידאו עם autoplay ו-loop לקבלת אפקט מרהיב של וידאו בתוך טקסט.',
    promptHe: `אני רוצה ליצור אפקט מסכת טקסט (Text Mask) באתר שלי. גרדיאנט צבעוני או וידאו שנראה רק דרך צורת האותיות.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה?\n2. מה הצבעים לגרדיאנט (או האם להשתמש בוידאו)?\n3. מה גודל הפונט?\n4. מה מהירות תנועת הצבעים?\n5. מה גודל האזור שמציג את האפקט?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כל אות נופלת מלמעלה ונוחתת במקומה עם קפיצה קטנה, כמו כדור שנופל על הרצפה וקופץ פעם-פעמיים לפני שמתייצב. כל אות מגיעה רגע אחרי הקודמת, מה שיוצר אפקט גל עליז של קפיצות. הכל נעשה עם אנימציית CSS שכוללת נפילה, חריגה קלה מעבר למיקום, קפיצה קטנה חזרה, והתייצבות.</p>`,
    proTipHe: 'שחקו עם ערכי ה-cubic-bezier — ערך Y מעל 1 יוצר overshoot חזק יותר.',
    promptHe: `אני רוצה ליצור אפקט אותיות קופצות (Bounce Letters) באתר שלי. כל אות נופלת מלמעלה ונוחתת עם קפיצה כמו קפיץ.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה?\n2. מה גודל הפונט והצבע?\n3. מה צבע הרקע?\n4. כמה חזקה הקפיצה?\n5. האם להוסיף כפתור Replay?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>מילה מסתובבת ונעלמת למעלה, ומילה חדשה מגיעה מלמטה ומסתובבת למקומה — כמו קרוסלה אנכית של מילים. מושלם לסלוגנים כמו "חשבו אחרת / גדול / קדימה". האפקט עובד עם אנימציית CSS שמסובבת את המילה על הציר האופקי עם תחושה תלת-ממדית, ו-JavaScript שמחליף מילים כל כמה שניות.</p>`,
    proTipHe: 'שנו את transform-origin ל-center top כדי שהמילה תסתובב לכיוון ההפוך — למטה במקום למעלה.',
    promptHe: `אני רוצה ליצור אפקט מילים מסתובבות (Rotate Words) באתר שלי. מילים שמתחלפות באנימציית סיבוב תלת-ממדית כמו קרוסלה אנכית.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה המשפט הקבוע?\n2. מה רשימת המילים שמסתובבות?\n3. מה גודל הפונט והצבעים?\n4. כמה זמן כל מילה מוצגת?\n5. מה צבע הרקע?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>הטקסט מוצג רק כקו מתאר ריק, וכשמעבירים את העכבר מעליו הוא מתמלא בצבע בהדרגה משמאל לימין — כמו שמישהו צובע את האותיות בזמן אמת. האפקט עובד עם שתי שכבות — אחת עם קו מתאר בלבד, ומעליה עותק צבעוני שמוסתר ונחשף בהדרגה בריחוף.</p>`,
    proTipHe: 'שנו את כיוון ה-clip-path (למשל inset(100% 0 0 0)) כדי שהמילוי יגיע מלמעלה למטה.',
    promptHe: `אני רוצה ליצור אפקט מילוי טקסט בריחוף (Text Fill Hover) באתר שלי. טקסט עם קו מתאר בלבד שמתמלא בצבע כשמעבירים עליו את העכבר.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט?\n2. מה צבע קו המתאר ומה צבע המילוי?\n3. מה גודל הפונט?\n4. מאיזה כיוון המילוי מגיע (שמאל, ימין, למעלה, למטה)?\n5. מה צבע הרקע?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>הטקסט מהבהב ורועד כמו שלט ניאון ישן שמאבד חשמל, או כמו מסך טלוויזיה ישנה עם תקלות. יש גם קווים אופקיים דקים שרצים על המסך וכהייה בפינות — בדיוק כמו מסכי CRT מפעם. האפקט נעשה עם אנימציית CSS מהירה מאוד שמשנה את רמת השקיפות של הטקסט בערכים לא-סדירים, ושכבות נוספות שמדמות קווי סריקה.</p>`,
    proTipHe: 'האטו את האנימציה (0.5s במקום 0.15s) לאפקט הבהוב עדין יותר שמתאים לשילוב עם טקסט רגיל.',
    promptHe: `אני רוצה ליצור אפקט טקסט מהבהב (Text Flicker) באתר שלי. טקסט שמהבהב כמו שלט ניאון ישן או מסך CRT עם קווי סריקה.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה?\n2. מה צבע הטקסט והזוהר?\n3. מה גודל הפונט?\n4. כמה חזק ההבהוב?\n5. האם להוסיף קווי סריקה וכהייה בפינות?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>טקסט נכתב על המסך אות אחרי אות כאילו מישהו מקליד אותו בזמן אמת, עם קורסור מהבהב בסוף. כשהשורה נגמרת, יש הפסקה קצרה ואז מתחילה שורה חדשה — בדיוק כמו בחלון טרמינל. הכל נעשה עם JavaScript שמוסיף תו אחד כל 50 אלפיות שנייה, וקורסור CSS שמהבהב כל שנייה.</p>`,
    proTipHe: 'הוסיפו צבעים שונים לכל שורה (למשל ירוק לפלט, לבן לפקודות) לתחושת טרמינל אותנטית.',
    promptHe: `אני רוצה ליצור אפקט קורסור הקלדה (Typing Cursor) באתר שלי. טקסט שנכתב אות אחרי אות עם קורסור מהבהב כמו בטרמינל.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה השורות שאני רוצה שייכתבו?\n2. מה מהירות ההקלדה?\n3. מה צבע הטקסט והרקע?\n4. האם לעטוף את זה בעיצוב של חלון טרמינל?\n5. מה גודל הפונט?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>כל אות בטקסט מתקפלת קדימה ואחורה בתנועה תלת-ממדית, וכיוון שכל אות מגיבה רגע אחרי הקודמת, נוצר גל תלת-ממדי שעובר לאורך הטקסט — כמו גל בים. בזמן הקיפול הצבע גם משתנה, מה שמוסיף לאפקט הויזואלי. הכל נעשה עם CSS ופרספקטיבה שנותנת תחושת עומק אמיתית.</p>`,
    proTipHe: 'הוסיפו text-shadow שמשתנה עם הסיבוב כדי לדמות תאורה תלת-ממדית אמיתית.',
    promptHe: `אני רוצה ליצור אפקט גל טקסט תלת-ממדי (Text Wave 3D) באתר שלי. אותיות שמתקפלות קדימה ואחורה בגל תלת-ממדי.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה?\n2. מה גודל הפונט?\n3. מה הצבעים (צבע רגיל + צבעים בזמן הסיבוב)?\n4. כמה מהיר הגל?\n5. מה צבע הרקע?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
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
    explanationHe: `<p><strong>מה קורה פה?</strong></p><p>האותיות "מרגישות" את העכבר — כשמקרבים אותו לאות מסוימת, היא נהיית עבה יותר ומשנה צבע. ככל שהעכבר רחוק יותר, האות דקה ורגילה. זה יוצר אפקט כאילו לוחצים על הטקסט. האפקט עובד עם JavaScript שמחשב את המרחק בין העכבר לכל אות ומשנה את עובי הפונט בהתאם, בשילוב עם פונט משתנה שתומך בכל העוביים.</p>`,
    proTipHe: 'נסו להוסיף font-variation-settings כדי לשלוט גם ברוחב ובנטייה של הפונט לפי מרחק הסמן.',
    promptHe: `אני רוצה ליצור אפקט לחץ טקסט (Text Pressure) באתר שלי. אותיות שמגיבות לעכבר ומשנות עובי לפי המרחק ממנו.\n\nלפני שתיצור את הקוד, תשאל אותי:\n1. מה הטקסט שאני רוצה?\n2. מה גודל הפונט?\n3. מה צבע הטקסט הרגיל ומה הצבע כשהעכבר קרוב?\n4. מה רדיוס ההשפעה של העכבר?\n5. מה צבע הרקע?\n\nאחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`,
  },
];
