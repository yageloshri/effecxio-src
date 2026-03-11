import type { Effect } from '@/types';

export const effectsBatch4Scroll: Effect[] = [
  // ─── 1. Horizontal Scroll ─────────────────────────────────────────────
  {
    id: 'horizontalscroll',
    title: 'Horizontal Scroll',
    titleHe: 'גלילה אופקית',
    description: 'Section scrolls content horizontally while page scrolls vertically.',
    descriptionHe: 'סקשן שגולל תוכן אופקית בזמן שהעמוד גולל אנכית.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'horizontal' },
      { label: 'layout' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'horizontalscroll',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Horizontal Scroll</title>
<!-- Horizontal Scroll — Converts vertical page scroll into horizontal content movement -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: sans-serif; background: #0a0a0a; color: #fff; }
  .spacer {
    height: 100vh; display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; color: #555;
  }
  .horizontal-section {
    position: relative;
    height: 400vh; /* 4x viewport = 4 panels worth of scroll */
  }
  .horizontal-sticky {
    position: sticky; top: 0;
    height: 100vh; overflow: hidden;
  }
  .horizontal-track {
    display: flex; height: 100%;
    will-change: transform;
  }
  .panel {
    min-width: 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center;
    font-size: 3rem; font-weight: 800;
  }
  .panel:nth-child(1) { background: linear-gradient(135deg, #1a1a2e, #16213e); }
  .panel:nth-child(2) { background: linear-gradient(135deg, #0f3460, #1a1a2e); }
  .panel:nth-child(3) { background: linear-gradient(135deg, #16213e, #0f3460); }
  .panel:nth-child(4) { background: linear-gradient(135deg, #1a1a2e, #16213e); }
</style>
</head>
<body>
  <div class="spacer">Scroll down for horizontal section</div>

  <div class="horizontal-section" id="hSection">
    <div class="horizontal-sticky">
      <div class="horizontal-track" id="track">
        <div class="panel">Panel One</div>
        <div class="panel">Panel Two</div>
        <div class="panel">Panel Three</div>
        <div class="panel">Panel Four</div>
      </div>
    </div>
  </div>

  <div class="spacer">End of horizontal section</div>

  <script>
    const section = document.getElementById('hSection');
    const track = document.getElementById('track');
    const panelCount = 4;

    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(sectionTop / sectionHeight, 1));
      /* Move track left by progress * (panelCount - 1) viewports */
      const translateX = progress * (panelCount - 1) * window.innerWidth;
      track.style.transform = \`translateX(-\${translateX}px)\`;
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך גלילה אופקית עובדת?</h4>
<p>האפקט ממיר גלילה אנכית רגילה לתנועה אופקית של פאנלים באמצעות <code>position: sticky</code> וטרנספורם דינמי.</p>
<ul>
  <li><strong>מכיל גבוה:</strong> ה-<code>horizontal-section</code> מקבל גובה של <code>400vh</code> (4 פאנלים), מה שיוצר מספיק מרחב גלילה אנכי.</li>
  <li><strong>sticky wrapper:</strong> <code>position: sticky; top: 0</code> מדביק את האזור הנראה למסך בזמן שהמכיל ממשיך לזוז.</li>
  <li><strong>חישוב progress:</strong> מחשבים כמה מרחק גלילה עבר ביחס לגובה הכולל של הסקשן, מה שנותן ערך בין 0 ל-1.</li>
  <li><strong>translateX:</strong> ערך ה-progress מוכפל ברוחב הפאנלים כדי להזיז את הטראק שמאלה.</li>
</ul>
<p>הטריק המרכזי הוא ש-sticky מחזיק את התצוגה במקום בזמן שהגלילה האנכית מתורגמת לתנועה אופקית.</p>`,
    proTipHe: 'הוסיפו snap points עם scroll-snap-type כדי שכל פאנל ייעצר בדיוק במרכז המסך.',
  },

  // ─── 2. Sticky Header ─────────────────────────────────────────────────
  {
    id: 'stickyheader',
    title: 'Sticky Header',
    titleHe: 'כותרת sticky',
    description: 'Header shrinks and changes style when scrolling past hero section.',
    descriptionHe: 'כותרת שמתכווצת ומשנה סגנון כשגוללים מעבר לסקשן ההירו.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'header' },
      { label: 'sticky' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'stickyheader',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Sticky Header</title>
<!-- Sticky Header — Header shrinks on scroll with smooth transitions -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: sans-serif; background: #0a0a0a; color: #fff; }
  .header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 40px; /* tall padding initially */
    background: transparent;
    transition: padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  }
  .header.scrolled {
    padding: 12px 40px; /* shrunk padding */
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(12px);
    box-shadow: 0 2px 20px rgba(0,0,0,0.5);
  }
  .header .logo {
    font-size: 1.5rem; font-weight: 800;
    transition: font-size 0.3s ease;
  }
  .header.scrolled .logo { font-size: 1.1rem; }
  .header nav a {
    color: #aaa; text-decoration: none; margin-left: 24px;
    font-size: 0.95rem; transition: color 0.3s;
  }
  .header nav a:hover { color: #fff; }
  .hero {
    height: 100vh; display: flex; align-items: center; justify-content: center;
    font-size: 3rem; font-weight: 800;
    background: linear-gradient(135deg, #1a1a2e, #0a0a0a);
  }
  .content {
    max-width: 700px; margin: 0 auto; padding: 4rem 2rem;
    color: #aaa; line-height: 1.8; font-size: 1.1rem;
  }
  .content p { margin-bottom: 2rem; }
</style>
</head>
<body>
  <header class="header" id="header">
    <div class="logo">MySite</div>
    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </header>
  <div class="hero">Scroll Down</div>
  <div class="content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
  <script>
    const header = document.getElementById('header');
    const threshold = 100; /* pixels before header shrinks */
    window.addEventListener('scroll', () => {
      if (window.scrollY > threshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך כותרת sticky עובדת?</h4>
<p>הכותרת ממוקמת עם <code>position: fixed</code> ומשנה את הסגנון שלה בהתאם למיקום הגלילה באמצעות מחלקת CSS דינמית.</p>
<ul>
  <li><strong>position: fixed:</strong> הכותרת תמיד נשארת בראש המסך, ללא קשר לגלילה.</li>
  <li><strong>מאזין scroll:</strong> כשהמשתמש גולל מעבר ל-<code>threshold</code> (100px), מוסיפים מחלקת <code>scrolled</code>.</li>
  <li><strong>transition חלק:</strong> כל השינויים — padding, background, font-size — עוברים עם <code>transition</code> חלק של 0.3 שניות.</li>
  <li><strong>backdrop-filter:</strong> רקע מטושטש שנראה מודרני ומאפשר לראות מה מאחורי הכותרת.</li>
</ul>
<p>הטריק הוא שהכותרת מתחילה שקופה וגדולה, ומתכווצת רק כשהמשתמש מתחיל לגלול.</p>`,
    proTipHe: 'הוסיפו transform: translateY(-100%) כשגוללים למטה ו-translateY(0) כשגוללים למעלה כדי ליצור header שמתחבא ומופיע.',
  },

  // ─── 3. Reveal on Scroll ──────────────────────────────────────────────
  {
    id: 'revealonscrool',
    title: 'Reveal on Scroll',
    titleHe: 'חשיפה בגלילה',
    description: 'Elements fade and slide in when entering viewport using IntersectionObserver.',
    descriptionHe: 'אלמנטים נכנסים עם fade ותנועה כשהם מופיעים באזור הנראה באמצעות IntersectionObserver.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'reveal' },
      { label: 'intersection-observer' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'revealonscrool',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Reveal on Scroll</title>
<!-- Reveal on Scroll — Elements fade+slide in when entering the viewport -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 300vh; background: #0a0a0a;
    font-family: sans-serif; color: #fff;
  }
  .spacer {
    height: 60vh; display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.2rem;
  }
  .reveal-item {
    max-width: 600px; margin: 80px auto;
    padding: 2rem; border-radius: 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal-item.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-item.from-left {
    transform: translateX(-40px) translateY(0);
    opacity: 0;
  }
  .reveal-item.from-left.visible {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }
  .reveal-item h3 { font-size: 1.3rem; margin-bottom: 0.5rem; }
  .reveal-item p { color: #aaa; line-height: 1.6; }
</style>
</head>
<body>
  <div class="spacer">Scroll down to reveal elements</div>
  <div class="reveal-item"><h3>Card One</h3><p>This card fades up from below when it enters the viewport.</p></div>
  <div class="reveal-item from-left"><h3>Card Two</h3><p>This one slides in from the left side.</p></div>
  <div class="reveal-item"><h3>Card Three</h3><p>Each element animates independently with IntersectionObserver.</p></div>
  <div class="reveal-item from-left"><h3>Card Four</h3><p>No scroll event listener needed — all handled by the browser.</p></div>
  <div class="spacer"></div>
  <script>
    const items = document.querySelectorAll('.reveal-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 }); /* trigger when 15% visible */
    items.forEach(item => observer.observe(item));
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך חשיפה בגלילה עובדת?</h4>
<p>אלמנטים מתחילים שקופים ומוזזים, ונחשפים עם אנימציה חלקה כשהם נכנסים לאזור הנראה באמצעות <code>IntersectionObserver</code>.</p>
<ul>
  <li><strong>מצב התחלתי:</strong> כל אלמנט מקבל <code>opacity: 0</code> ו-<code>translateY(40px)</code> — בלתי נראה ומוזז למטה.</li>
  <li><strong>IntersectionObserver:</strong> ה-API המודרני של הדפדפן שמזהה מתי אלמנט נכנס לאזור הנראה. יעיל הרבה יותר ממאזין scroll.</li>
  <li><strong>threshold: 0.15:</strong> האנימציה מתחילה כש-15% מהאלמנט נראה — מספיק מוקדם שהמשתמש יראה את התנועה.</li>
  <li><strong>unobserve:</strong> אחרי שהאלמנט נחשף, מפסיקים לעקוב אחריו כדי שהאנימציה לא תחזור.</li>
  <li><strong>כיווני כניסה:</strong> מחלקת <code>from-left</code> משנה את כיוון הכניסה ל-<code>translateX</code> במקום <code>translateY</code>.</li>
</ul>
<p>IntersectionObserver הוא הגישה המומלצת — הוא לא חוסם את ה-main thread כמו scroll events.</p>`,
    proTipHe: 'הוסיפו stagger effect עם transition-delay שונה לכל אלמנט כדי ליצור אפקט גל מרשים.',
  },

  // ─── 4. Parallax Image ────────────────────────────────────────────────
  {
    id: 'parallaximage',
    title: 'Parallax Image',
    titleHe: 'תמונת parallax',
    description: 'Image moves slower than scroll creating a depth effect within its container.',
    descriptionHe: 'תמונה שנעה לאט יותר מהגלילה ויוצרת אפקט עומק בתוך המכיל שלה.',
    categories: ['scroll'],
    tags: [
      { label: 'parallax' },
      { label: 'image' },
      { label: 'scroll' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'parallaximage',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Parallax Image</title>
<!-- Parallax Image — Image moves at slower speed than scroll for depth illusion -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: sans-serif; background: #0a0a0a; color: #fff; }
  .content-block {
    max-width: 700px; margin: 0 auto; padding: 4rem 2rem;
    color: #aaa; line-height: 1.8;
  }
  .parallax-container {
    position: relative; height: 60vh;
    overflow: hidden;
  }
  .parallax-img {
    position: absolute;
    top: -20%; left: 0; right: 0;
    height: 140%; /* 40% taller for parallax room */
    width: 100%; object-fit: cover;
    will-change: transform;
  }
  .parallax-overlay {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.3);
    font-size: 2.5rem; font-weight: 800;
  }
</style>
</head>
<body>
  <div class="content-block">
    <h1>Parallax Image Demo</h1>
    <p>Scroll down to see the parallax effect on the image below. The image moves slower than the page, creating a sense of depth.</p>
  </div>

  <div class="parallax-container" id="pxContainer">
    <img class="parallax-img" id="pxImg"
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0' stop-color='%231a1a2e'/%3E%3Cstop offset='0.5' stop-color='%230f3460'/%3E%3Cstop offset='1' stop-color='%236c63ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1200' height='800'/%3E%3Ccircle cx='300' cy='200' r='120' fill='%23ffffff10'/%3E%3Ccircle cx='900' cy='500' r='200' fill='%23ffffff08'/%3E%3C/svg%3E"
      alt="Parallax background" />
    <div class="parallax-overlay">Depth Effect</div>
  </div>

  <div class="content-block">
    <p>The image is 140% the height of its container, positioned at -20% top. As you scroll, it translates at 0.4x speed creating the parallax illusion.</p>
    <p>Keep scrolling to see it fully...</p>
  </div>

  <script>
    const container = document.getElementById('pxContainer');
    const img = document.getElementById('pxImg');
    const speed = 0.4; /* parallax speed factor: lower = slower movement */

    window.addEventListener('scroll', () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return; /* skip if off screen */
      const offset = rect.top * speed;
      img.style.transform = \`translateY(\${offset}px)\`;
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך תמונת parallax עובדת?</h4>
<p>התמונה גדולה יותר מהמכיל שלה ונעה בקצב איטי יותר מהגלילה, מה שיוצר אשליית עומק תלת-ממדית.</p>
<ul>
  <li><strong>תמונה גדולה:</strong> התמונה בגובה 140% מהמכיל, ממוקמת ב-<code>top: -20%</code> — זה נותן מרחב תמרון לתנועה.</li>
  <li><strong>overflow: hidden:</strong> המכיל מסתיר את החלקים שחורגים, כך שרק החלק הנכון נראה.</li>
  <li><strong>מקדם מהירות:</strong> <code>speed = 0.4</code> — התמונה זזה ב-40% מהמהירות של הגלילה, מה שיוצר את אפקט העומק.</li>
  <li><strong>אופטימיזציה:</strong> בדיקה שהמכיל נראה על המסך לפני חישוב — חוסך ביצועים כשהאלמנט מחוץ לתצוגה.</li>
</ul>
<p>ככל שמקדם המהירות נמוך יותר, אפקט העומק חזק יותר. ערך של 0 יהפוך את התמונה לסטטית לחלוטין.</p>`,
    proTipHe: 'השתמשו ב-will-change: transform ו-transform: translateY במקום שינוי top/margin לביצועים מיטביים.',
  },

  // ─── 5. Pinned Section ────────────────────────────────────────────────
  {
    id: 'pinnedsection',
    title: 'Pinned Section',
    titleHe: 'סקשן מוצמד',
    description: 'Content stays pinned to the viewport while background content changes behind it.',
    descriptionHe: 'תוכן נשאר מוצמד למסך בזמן שתוכן הרקע משתנה מאחוריו.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'sticky' },
      { label: 'pin' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'pinnedsection',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Pinned Section</title>
<!-- Pinned Section — Text stays pinned while background panels scroll behind -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: sans-serif; background: #0a0a0a; color: #fff; }
  .spacer {
    height: 100vh; display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.5rem;
  }
  .pinned-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 300vh; /* room for 3 panels */
  }
  .pinned-left {
    position: sticky; top: 0;
    height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 3rem;
  }
  .pinned-left h2 {
    font-size: 2.5rem; font-weight: 800;
    line-height: 1.3;
  }
  .pinned-left h2 span { color: #6c63ff; }
  .right-panels { display: flex; flex-direction: column; }
  .right-panel {
    height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 3rem; font-size: 1.2rem;
    border-left: 1px solid rgba(255,255,255,0.06);
  }
  .right-panel:nth-child(1) { background: rgba(108,99,255,0.05); }
  .right-panel:nth-child(2) { background: rgba(236,72,153,0.05); }
  .right-panel:nth-child(3) { background: rgba(6,182,212,0.05); }
  .right-panel .card {
    max-width: 350px; padding: 2rem;
    background: rgba(255,255,255,0.03);
    border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);
    color: #ccc; line-height: 1.7;
  }
  .right-panel .card h3 { color: #fff; margin-bottom: 0.5rem; }
</style>
</head>
<body>
  <div class="spacer">Scroll to see pinned section</div>
  <div class="pinned-wrapper">
    <div class="pinned-left">
      <h2>Content stays<br/><span>pinned</span> here<br/>while you scroll</h2>
    </div>
    <div class="right-panels">
      <div class="right-panel"><div class="card"><h3>Step 1</h3><p>The left column stays fixed in place using CSS sticky positioning.</p></div></div>
      <div class="right-panel"><div class="card"><h3>Step 2</h3><p>The right column scrolls normally, revealing new content panels.</p></div></div>
      <div class="right-panel"><div class="card"><h3>Step 3</h3><p>No JavaScript needed — pure CSS sticky does all the work.</p></div></div>
    </div>
  </div>
  <div class="spacer">End of pinned section</div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך סקשן מוצמד עובד?</h4>
<p>האפקט משתמש ב-CSS Grid עם <code>position: sticky</code> כדי להדביק צד אחד בזמן שהצד השני גולל.</p>
<ul>
  <li><strong>Grid דו-עמודי:</strong> <code>grid-template-columns: 1fr 1fr</code> מחלק את הסקשן לשני חצאים שווים.</li>
  <li><strong>sticky על שמאל:</strong> העמודה השמאלית מקבלת <code>position: sticky; top: 0; height: 100vh</code> — נדבקת לראש המסך.</li>
  <li><strong>פאנלים גוללים:</strong> הצד הימני מכיל מספר פאנלים בגובה 100vh כל אחד שגוללים בחופשיות.</li>
  <li><strong>ללא JavaScript:</strong> כל האפקט מתבצע ב-CSS בלבד — sticky עושה את כל העבודה.</li>
</ul>
<p>הגובה הכולל של המכיל נקבע על ידי הצד הגולל (3 פאנלים = 300vh), וה-sticky מפסיק להידבק כשהמכיל מסתיים.</p>`,
    proTipHe: 'שנו את התוכן הפינאלי בצד השמאלי בהתאם לפאנל הנראה בימין עם IntersectionObserver ליצירת אפקט דינמי יותר.',
  },

  // ─── 6. Scroll Progress ───────────────────────────────────────────────
  {
    id: 'scrollprogress',
    title: 'Scroll Progress',
    titleHe: 'פס גלילה',
    description: 'Thin progress bar at top of page showing scroll percentage.',
    descriptionHe: 'פס התקדמות דק בראש העמוד שמראה את אחוז הגלילה.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'progress' },
      { label: 'indicator' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'scrollprogress',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Progress</title>
<!-- Scroll Progress — Top bar that fills based on scroll position -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 400vh; background: #0a0a0a;
    font-family: sans-serif; color: #fff;
  }
  .progress-bar {
    position: fixed; top: 0; left: 0; z-index: 9999;
    height: 3px; /* thin bar */
    width: 0%;
    background: linear-gradient(90deg, #6c63ff, #a855f7, #ec4899);
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
    box-shadow: 0 0 10px rgba(108, 99, 255, 0.5);
  }
  .header {
    position: fixed; top: 3px; left: 0; right: 0;
    padding: 16px 40px; background: rgba(10,10,10,0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    z-index: 100;
  }
  .content {
    max-width: 700px; margin: 0 auto;
    padding: 120px 2rem 4rem;
  }
  .content h1 { font-size: 2.5rem; margin-bottom: 2rem; }
  .content p {
    color: #aaa; line-height: 1.8; font-size: 1.05rem;
    margin-bottom: 2rem;
  }
</style>
</head>
<body>
  <div class="progress-bar" id="progressBar"></div>
  <div class="header">Scroll Progress Demo</div>
  <div class="content">
    <h1>Reading Progress Bar</h1>
    <p>Scroll down to see the progress bar fill up at the top of the page. It shows how far you've scrolled through the content.</p>
    <p>This is commonly used on blog posts and long-form articles to give readers a sense of how much content remains.</p>
    <p>The bar uses a gradient from purple to pink, with a subtle glow effect for extra visual appeal.</p>
    <p>Implementation is simple: listen to scroll events, calculate the percentage, and update the width.</p>
    <p>For better performance, you can use requestAnimationFrame to throttle updates.</p>
    <p>The bar is position: fixed so it stays at the very top of the viewport as you scroll.</p>
  </div>
  <script>
    const bar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (scrollTop / docHeight) * 100;
      bar.style.width = pct + '%';
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך פס ההתקדמות עובד?</h4>
<p>פס צר ממוקם ב-<code>position: fixed</code> בראש העמוד, ורוחבו מתעדכן לפי אחוז הגלילה.</p>
<ul>
  <li><strong>חישוב אחוז:</strong> <code>scrollY / (scrollHeight - innerHeight)</code> נותן ערך בין 0 ל-1 שמייצג את מיקום הגלילה.</li>
  <li><strong>width דינמי:</strong> הרוחב מתעדכן באחוזים — מ-0% (ללא גלילה) עד 100% (סוף העמוד).</li>
  <li><strong>gradient:</strong> גרדיאנט מסגול לורוד נותן לפס מראה מודרני ודינמי.</li>
  <li><strong>box-shadow:</strong> צל זוהר עדין מדגיש את הפס ומוסיף עומק ויזואלי.</li>
</ul>
<p>הפס ב-<code>z-index: 9999</code> כדי שיישאר מעל כל תוכן אחר בעמוד.</p>`,
    proTipHe: 'עטפו את עדכון הרוחב ב-requestAnimationFrame לחוויה חלקה יותר בעמודים כבדים.',
  },

  // ─── 7. Scroll Trigger ────────────────────────────────────────────────
  {
    id: 'scrolltrigger',
    title: 'Scroll Trigger',
    titleHe: 'טריגר גלילה',
    description: 'Elements animate with staggered timing when they scroll into view.',
    descriptionHe: 'אלמנטים מונפשים בתזמון מדורג כשהם נגללים לאזור הנראה.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'trigger' },
      { label: 'stagger' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'scrolltrigger',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Trigger</title>
<!-- Scroll Trigger — Staggered animations triggered by scroll position -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 300vh; background: #0a0a0a;
    font-family: sans-serif; color: #fff;
  }
  .spacer {
    height: 70vh; display: flex; align-items: center;
    justify-content: center; color: #555; font-size: 1.2rem;
  }
  .trigger-grid {
    max-width: 800px; margin: 0 auto; padding: 2rem;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  }
  .trigger-card {
    padding: 2rem; border-radius: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    text-align: center;
    opacity: 0; transform: translateY(60px) scale(0.9);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .trigger-card.active {
    opacity: 1; transform: translateY(0) scale(1);
  }
  .trigger-card .icon {
    width: 48px; height: 48px; margin: 0 auto 1rem;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem;
  }
  .trigger-card:nth-child(3n+1) .icon { background: rgba(108,99,255,0.15); }
  .trigger-card:nth-child(3n+2) .icon { background: rgba(236,72,153,0.15); }
  .trigger-card:nth-child(3n+3) .icon { background: rgba(6,182,212,0.15); }
  .trigger-card h3 { font-size: 1rem; margin-bottom: 0.5rem; }
  .trigger-card p { color: #888; font-size: 0.85rem; line-height: 1.5; }
  .stats-row {
    max-width: 800px; margin: 80px auto; padding: 2rem;
    display: flex; justify-content: space-around;
  }
  .stat {
    text-align: center;
    opacity: 0; transform: scale(0.8);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .stat.active { opacity: 1; transform: scale(1); }
  .stat .num { font-size: 2.5rem; font-weight: 800; color: #6c63ff; }
  .stat .label { color: #888; font-size: 0.9rem; margin-top: 0.25rem; }
</style>
</head>
<body>
  <div class="spacer">Scroll down for triggered animations</div>
  <div class="trigger-grid" id="grid">
    <div class="trigger-card"><div class="icon">&#9733;</div><h3>Design</h3><p>Beautiful interfaces</p></div>
    <div class="trigger-card"><div class="icon">&#9889;</div><h3>Speed</h3><p>Lightning fast</p></div>
    <div class="trigger-card"><div class="icon">&#9881;</div><h3>Build</h3><p>Solid architecture</p></div>
    <div class="trigger-card"><div class="icon">&#9752;</div><h3>Scale</h3><p>Grows with you</p></div>
    <div class="trigger-card"><div class="icon">&#9829;</div><h3>Quality</h3><p>Pixel perfect</p></div>
    <div class="trigger-card"><div class="icon">&#9830;</div><h3>Support</h3><p>Always here</p></div>
  </div>
  <div class="stats-row" id="stats">
    <div class="stat"><div class="num">250+</div><div class="label">Projects</div></div>
    <div class="stat"><div class="num">99%</div><div class="label">Satisfaction</div></div>
    <div class="stat"><div class="num">50K</div><div class="label">Users</div></div>
  </div>
  <div class="spacer"></div>
  <script>
    function triggerStagger(container, selector, staggerMs) {
      const items = container.querySelectorAll(selector);
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            items.forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * staggerMs);
            });
            obs.disconnect();
          }
        });
      }, { threshold: 0.2 });
      obs.observe(container);
    }
    triggerStagger(document.getElementById('grid'), '.trigger-card', 120);
    triggerStagger(document.getElementById('stats'), '.stat', 200);
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך טריגר גלילה עובד?</h4>
<p>כשמכיל נכנס לאזור הנראה, כל הילדים שלו מונפשים בזה אחר זה עם השהייה מדורגת — אפקט "stagger".</p>
<ul>
  <li><strong>IntersectionObserver על המכיל:</strong> במקום לעקוב אחרי כל אלמנט בנפרד, עוקבים אחרי המכיל — כשהוא נראה, כל הילדים מונפשים.</li>
  <li><strong>stagger timing:</strong> <code>setTimeout</code> עם כפולה של אינדקס ושהייה (120ms) יוצר אפקט גל — אלמנט אחרי אלמנט.</li>
  <li><strong>transform משולב:</strong> <code>translateY(60px) scale(0.9)</code> יוצר כניסה מלמטה עם הגדלה קלה — יותר דרמטי מ-fade בלבד.</li>
  <li><strong>disconnect:</strong> אחרי ההפעלה, <code>obs.disconnect()</code> מפסיק את המעקב לחלוטין.</li>
</ul>
<p>הפונקציה <code>triggerStagger</code> גנרית — אפשר להשתמש בה על כל מכיל עם ילדים.</p>`,
    proTipHe: 'שנו את כיוון ה-stagger לפי מיקום הגלילה — מימין לשמאל או מהמרכז החוצה לאפקטים מעניינים יותר.',
  },

  // ─── 8. Infinite Scroll ───────────────────────────────────────────────
  {
    id: 'infinitescroll',
    title: 'Infinite Scroll',
    titleHe: 'גלילה אינסופית',
    description: 'Auto-load more content when user reaches the bottom of the page.',
    descriptionHe: 'טעינה אוטומטית של תוכן נוסף כשהמשתמש מגיע לתחתית העמוד.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'infinite' },
      { label: 'loading' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'infinitescroll',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Infinite Scroll</title>
<!-- Infinite Scroll — Loads more content when nearing page bottom -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; font-family: sans-serif; color: #fff; }
  .feed { max-width: 600px; margin: 0 auto; padding: 2rem; }
  .feed h1 { text-align: center; margin-bottom: 2rem; font-size: 1.5rem; }
  .feed-item {
    padding: 1.5rem; margin-bottom: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    animation: fadeUp 0.4s ease forwards;
  }
  .feed-item h3 { font-size: 1rem; margin-bottom: 0.3rem; }
  .feed-item p { color: #888; font-size: 0.9rem; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .sentinel {
    height: 1px; /* invisible trigger element at bottom */
  }
  .loader {
    text-align: center; padding: 2rem; color: #555;
    display: none;
  }
  .loader.visible { display: block; }
  .loader .spinner {
    width: 24px; height: 24px; margin: 0 auto 8px;
    border: 2px solid rgba(108,99,255,0.3);
    border-top-color: #6c63ff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>
  <div class="feed" id="feed">
    <h1>Infinite Feed</h1>
  </div>
  <div class="loader" id="loader">
    <div class="spinner"></div>
    <span>Loading more...</span>
  </div>
  <div class="sentinel" id="sentinel"></div>

  <script>
    const feed = document.getElementById('feed');
    const loader = document.getElementById('loader');
    const sentinel = document.getElementById('sentinel');
    let page = 0;
    let loading = false;
    const maxPages = 10; /* cap for demo */

    function loadItems() {
      if (loading || page >= maxPages) return;
      loading = true;
      loader.classList.add('visible');
      /* Simulate async fetch with 800ms delay */
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          const n = page * 5 + i + 1;
          const item = document.createElement('div');
          item.className = 'feed-item';
          item.innerHTML = '<h3>Item #' + n + '</h3><p>Auto-loaded content block number ' + n + '.</p>';
          feed.appendChild(item);
        }
        page++;
        loading = false;
        loader.classList.remove('visible');
      }, 800);
    }

    /* Load initial batch */
    loadItems();

    /* Watch sentinel element at bottom */
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadItems();
    }, { rootMargin: '200px' }); /* trigger 200px before visible */
    obs.observe(sentinel);
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך גלילה אינסופית עובדת?</h4>
<p>אלמנט "זקיף" בלתי נראה בתחתית העמוד נצפה על ידי <code>IntersectionObserver</code>. כשהוא קרוב לתצוגה, נטען תוכן חדש.</p>
<ul>
  <li><strong>Sentinel element:</strong> <code>div</code> בגובה 1px בתחתית. כשה-observer מזהה אותו — מפעילים טעינה.</li>
  <li><strong>rootMargin:</strong> ערך של <code>200px</code> גורם לטריגר 200px לפני שהזקיף נראה — כך התוכן נטען מראש.</li>
  <li><strong>מנגנון נעילה:</strong> דגל <code>loading</code> מונע טעינות כפולות כשה-observer מזהה שוב במהלך טעינה.</li>
  <li><strong>הגבלה:</strong> <code>maxPages</code> מגביל את מספר הטעינות כדי למנוע אינסוף אמיתי.</li>
  <li><strong>אנימציית כניסה:</strong> כל פריט חדש מקבל <code>fadeUp</code> אנימציה ליצירת חוויה חלקה.</li>
</ul>
<p>IntersectionObserver עדיף על מאזין scroll כי הוא אסינכרוני ולא חוסם את ה-main thread.</p>`,
    proTipHe: 'הוסיפו skeleton loading במקום ספינר כדי ליצור תחושה שהתוכן כמעט מוכן.',
  },

  // ─── 9. Sticky Column ─────────────────────────────────────────────────
  {
    id: 'stickycolumn',
    title: 'Sticky Column',
    titleHe: 'עמודה sticky',
    description: 'Two-column layout where one column stays sticky while the other scrolls.',
    descriptionHe: 'פריסה דו-עמודית שבה עמודה אחת נשארת sticky בזמן שהשנייה גוללת.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'sticky' },
      { label: 'layout' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'stickycolumn',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Sticky Column</title>
<!-- Sticky Column — Left column sticks while right column scrolls freely -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; font-family: sans-serif; color: #fff; }
  .two-col {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 0;
    max-width: 1100px; margin: 0 auto;
    min-height: 100vh;
  }
  .col-sticky {
    position: sticky; top: 0;
    height: 100vh;
    padding: 3rem 2rem;
    display: flex; flex-direction: column; justify-content: center;
    border-right: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.01);
  }
  .col-sticky h1 { font-size: 2rem; margin-bottom: 1rem; }
  .col-sticky p { color: #888; line-height: 1.6; margin-bottom: 1.5rem; }
  .col-sticky .tag {
    display: inline-block; padding: 6px 14px;
    background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.3);
    border-radius: 20px; font-size: 0.8rem;
    margin-right: 6px; margin-bottom: 6px;
  }
  .col-scroll { padding: 3rem 2rem; }
  .scroll-card {
    padding: 2rem; margin-bottom: 24px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
  }
  .scroll-card h3 { margin-bottom: 0.5rem; }
  .scroll-card p { color: #888; line-height: 1.7; font-size: 0.95rem; }
</style>
</head>
<body>
  <div class="two-col">
    <div class="col-sticky">
      <h1>Sticky Sidebar</h1>
      <p>This column stays in place while you scroll through the content on the right. Perfect for navigation, table of contents, or product details.</p>
      <div>
        <span class="tag">CSS</span>
        <span class="tag">Sticky</span>
        <span class="tag">Layout</span>
        <span class="tag">Grid</span>
      </div>
    </div>
    <div class="col-scroll">
      <div class="scroll-card"><h3>Section 1</h3><p>The sticky column uses position: sticky with top: 0 and height: 100vh. It stays fixed within the grid container.</p></div>
      <div class="scroll-card"><h3>Section 2</h3><p>CSS Grid makes the two-column layout simple. The left column has a fixed width while the right takes remaining space.</p></div>
      <div class="scroll-card"><h3>Section 3</h3><p>The sticky behavior automatically stops when the grid container ends, so no JavaScript is needed to handle the un-sticking.</p></div>
      <div class="scroll-card"><h3>Section 4</h3><p>This pattern works great for documentation sites, product pages, and dashboards where persistent navigation is needed.</p></div>
      <div class="scroll-card"><h3>Section 5</h3><p>You can add scroll-linked highlighting to the sidebar items by tracking which section is currently in view.</p></div>
      <div class="scroll-card"><h3>Section 6</h3><p>For responsive design, switch to a single column on mobile with the sticky element at the top instead of the side.</p></div>
    </div>
  </div>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך עמודה sticky עובדת?</h4>
<p>פריסת CSS Grid עם <code>position: sticky</code> מאפשרת לעמודה אחת להידבק למסך בזמן שהשנייה גוללת בחופשיות.</p>
<ul>
  <li><strong>CSS Grid:</strong> <code>grid-template-columns: 350px 1fr</code> — עמודה שמאלית ברוחב קבוע, ימנית גמישה.</li>
  <li><strong>sticky + height:</strong> <code>position: sticky; top: 0; height: 100vh</code> — העמודה נדבקת וממלאת את כל גובה המסך.</li>
  <li><strong>גבול טבעי:</strong> ה-sticky מפסיק אוטומטית כשמגיעים לסוף ה-Grid container — ללא צורך ב-JS.</li>
  <li><strong>border-right:</strong> קו דק מפריד ויזואלית בין שתי העמודות ליצירת מבנה ברור.</li>
</ul>
<p>זהו פטרן נפוץ מאוד באתרי תיעוד, דפי מוצר ודשבורדים — נקי, יעיל, וללא JavaScript.</p>`,
    proTipHe: 'הוסיפו media query שמחליף ל-column layout על מסכים צרים, עם ה-sticky element בראש במקום בצד.',
  },

  // ─── 10. Scroll Color ─────────────────────────────────────────────────
  {
    id: 'scrollcolor',
    title: 'Scroll Color',
    titleHe: 'שינוי צבע גלילה',
    description: 'Page background color transitions smoothly as the user scrolls.',
    descriptionHe: 'צבע הרקע של העמוד משתנה בצורה חלקה בזמן שהמשתמש גולל.',
    categories: ['scroll', 'background'],
    tags: [
      { label: 'scroll' },
      { label: 'color' },
      { label: 'background' },
    ],
    difficulty: 'beginner' as const,
    previewComponent: 'scrollcolor',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Color</title>
<!-- Scroll Color — Background interpolates between colors as user scrolls -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 500vh; font-family: sans-serif;
    transition: background-color 0.1s linear;
    background-color: #0a0a1a;
  }
  .section {
    height: 100vh;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; font-weight: 800; color: #fff;
  }
  .section span {
    background: rgba(0,0,0,0.3); padding: 1rem 2rem;
    border-radius: 12px; backdrop-filter: blur(8px);
  }
</style>
</head>
<body>
  <div class="section"><span>Section 1 — Deep Blue</span></div>
  <div class="section"><span>Section 2 — Purple</span></div>
  <div class="section"><span>Section 3 — Magenta</span></div>
  <div class="section"><span>Section 4 — Teal</span></div>
  <div class="section"><span>Section 5 — Dark</span></div>
  <script>
    /* Color stops: one per viewport height */
    const colors = [
      [10, 10, 26],    /* deep blue-black */
      [30, 15, 60],    /* purple */
      [60, 10, 50],    /* magenta */
      [10, 40, 50],    /* teal */
      [8, 8, 8],       /* near black */
    ];

    function lerp(a, b, t) { return a + (b - a) * t; }

    function interpolateColor(t) {
      const segment = Math.min(Math.floor(t * (colors.length - 1)), colors.length - 2);
      const local = (t * (colors.length - 1)) - segment;
      const c1 = colors[segment];
      const c2 = colors[segment + 1];
      const r = Math.round(lerp(c1[0], c2[0], local));
      const g = Math.round(lerp(c1[1], c2[1], local));
      const b = Math.round(lerp(c1[2], c2[2], local));
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const t = Math.max(0, Math.min(scrollTop / docHeight, 1));
      document.body.style.backgroundColor = interpolateColor(t);
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך שינוי צבע בגלילה עובד?</h4>
<p>מערך של צבעים מוגדר מראש, ובכל גלילה מחשבים אינטרפולציה לינארית בין הצבע הנוכחי לבא.</p>
<ul>
  <li><strong>עצירות צבע:</strong> מערך <code>colors</code> מגדיר צבעי RGB — אחד לכל סקשן בעמוד.</li>
  <li><strong>אינטרפולציה (lerp):</strong> פונקציית <code>lerp</code> מחשבת ערך ביניים בין שני מספרים לפי פרמטר t (0 עד 1).</li>
  <li><strong>חישוב segment:</strong> מזהים באיזה קטע של צבעים נמצאים (לפי אחוז הגלילה) ומחשבים את המיקום המקומי בתוך הקטע.</li>
  <li><strong>transition חלק:</strong> <code>transition: background-color 0.1s</code> מחליק את השינויים הקטנים בין עדכוני scroll.</li>
</ul>
<p>התוצאה היא מעבר צבעים זורם שנותן תחושה של מסע דרך סביבות שונות בזמן הגלילה.</p>`,
    proTipHe: 'הוסיפו שינוי צבע טקסט מקביל (לבן על רקע כהה, כהה על רקע בהיר) כדי לשמור על נגישות.',
  },

  // ─── 11. Scroll Zoom ──────────────────────────────────────────────────
  {
    id: 'scrollzoom',
    title: 'Scroll Zoom',
    titleHe: 'זום גלילה',
    description: 'Element scales from small to large as it scrolls into viewport center.',
    descriptionHe: 'אלמנט גדל מקטן לגדול כשהוא נגלל למרכז אזור הצפייה.',
    categories: ['scroll'],
    tags: [
      { label: 'scroll' },
      { label: 'zoom' },
      { label: 'scale' },
    ],
    difficulty: 'intermediate' as const,
    previewComponent: 'scrollzoom',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Zoom</title>
<!-- Scroll Zoom — Elements scale up as they approach viewport center -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 400vh; background: #0a0a0a;
    font-family: sans-serif; color: #fff;
  }
  .spacer {
    height: 80vh; display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.2rem;
  }
  .zoom-item {
    max-width: 500px; margin: 120px auto;
    padding: 3rem; border-radius: 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    text-align: center;
    will-change: transform, opacity;
  }
  .zoom-item h2 { font-size: 1.8rem; margin-bottom: 0.5rem; }
  .zoom-item p { color: #888; line-height: 1.6; }
  .zoom-item .badge {
    display: inline-block; margin-top: 1rem;
    padding: 6px 18px; border-radius: 20px;
    background: rgba(108,99,255,0.2);
    font-size: 0.85rem; color: #a99bff;
  }
</style>
</head>
<body>
  <div class="spacer">Scroll down for zoom effect</div>
  <div class="zoom-item" id="z1"><h2>Zoom In</h2><p>This element grows as you scroll it into view.</p><span class="badge">scale(0.6) → scale(1)</span></div>
  <div class="zoom-item" id="z2"><h2>Keep Going</h2><p>The scale is mapped to how close the element is to the viewport center.</p><span class="badge">Scroll-linked</span></div>
  <div class="zoom-item" id="z3"><h2>Smooth Zoom</h2><p>No transition jitter — direct scroll-to-scale mapping.</p><span class="badge">will-change</span></div>
  <div class="spacer">End</div>
  <script>
    const items = document.querySelectorAll('.zoom-item');
    const minScale = 0.6;  /* scale when far from center */
    const maxScale = 1;     /* scale when at center */

    function update() {
      const viewH = window.innerHeight;
      const center = viewH / 2;
      items.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - center);
        const maxDist = viewH; /* normalize against viewport height */
        const t = Math.max(0, 1 - dist / maxDist);
        const scale = minScale + (maxScale - minScale) * t;
        const opacity = 0.3 + 0.7 * t;
        el.style.transform = 'scale(' + scale.toFixed(3) + ')';
        el.style.opacity = opacity.toFixed(3);
      });
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך זום גלילה עובד?</h4>
<p>כל אלמנט משנה את ה-scale שלו בהתאם למרחק ממרכז המסך — ככל שהוא קרוב יותר למרכז, הוא גדול יותר.</p>
<ul>
  <li><strong>חישוב מרחק:</strong> מחשבים את המרחק בין מרכז האלמנט למרכז ה-viewport באמצעות <code>getBoundingClientRect</code>.</li>
  <li><strong>נרמול:</strong> המרחק מנורמל ביחס לגובה ה-viewport, כך ש-t=1 כשהאלמנט במרכז ו-t=0 כשהוא רחוק.</li>
  <li><strong>scale דינמי:</strong> ערך ה-scale נע בין <code>minScale (0.6)</code> ל-<code>maxScale (1)</code> — הגדלה של 40%.</li>
  <li><strong>requestAnimationFrame:</strong> לולאת אנימציה רציפה במקום scroll event — חלק ויעיל יותר.</li>
</ul>
<p>השילוב של scale עם opacity יוצר אפקט "פוקוס" — האלמנט הנוכחי בולט והשאר מעומעמים.</p>`,
    proTipHe: 'הוסיפו filter: blur() קל לאלמנטים הרחוקים מהמרכז לחיזוק אפקט העומק.',
  },

  // ─── 12. Depth Scroll ─────────────────────────────────────────────────
  {
    id: 'depthscroll',
    title: 'Depth Scroll',
    titleHe: 'גלילת עומק',
    description: 'Multiple layers move at different scroll speeds to create a 3D depth feel.',
    descriptionHe: 'שכבות מרובות נעות במהירויות גלילה שונות ליצירת תחושת עומק תלת-ממדית.',
    categories: ['scroll', 'background'],
    tags: [
      { label: 'scroll' },
      { label: 'depth' },
      { label: 'parallax' },
      { label: '3D' },
    ],
    difficulty: 'advanced' as const,
    previewComponent: 'depthscroll',
    codeTabs: [
      {
        label: 'מלא',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Depth Scroll</title>
<!-- Depth Scroll — Multiple layers at different speeds for 3D parallax depth -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 400vh; background: #050510;
    font-family: sans-serif; color: #fff;
    overflow-x: hidden;
  }
  .depth-scene {
    position: fixed; inset: 0;
    pointer-events: none; overflow: hidden;
  }
  .depth-layer {
    position: absolute; inset: 0;
    will-change: transform;
    display: flex; align-items: center; justify-content: center;
  }
  .shape {
    position: absolute; border-radius: 50%;
    opacity: 0.15;
  }
  /* Layer 1: far background — slowest */
  .layer-1 .shape { background: #6c63ff; }
  .layer-1 .s1 { width: 400px; height: 400px; top: 10%; left: 5%; }
  .layer-1 .s2 { width: 300px; height: 300px; top: 60%; right: 10%; }

  /* Layer 2: mid — medium speed */
  .layer-2 .shape { background: #ec4899; opacity: 0.12; }
  .layer-2 .s1 { width: 200px; height: 200px; top: 30%; left: 40%; }
  .layer-2 .s2 { width: 250px; height: 250px; top: 70%; left: 15%; }
  .layer-2 .s3 { width: 150px; height: 150px; top: 15%; right: 20%; }

  /* Layer 3: near — fastest */
  .layer-3 .shape { background: #06b6d4; opacity: 0.1; }
  .layer-3 .s1 { width: 100px; height: 100px; top: 20%; left: 70%; }
  .layer-3 .s2 { width: 120px; height: 120px; top: 50%; left: 25%; }

  .content {
    position: relative; z-index: 10;
    max-width: 700px; margin: 0 auto;
    padding: 15vh 2rem;
  }
  .content h1 {
    font-size: 3rem; font-weight: 800;
    margin-bottom: 2rem;
  }
  .content p {
    color: #aaa; line-height: 1.8; font-size: 1.1rem;
    margin-bottom: 3rem;
  }
</style>
</head>
<body>
  <div class="depth-scene">
    <div class="depth-layer layer-1" data-speed="0.1">
      <div class="shape s1"></div>
      <div class="shape s2"></div>
    </div>
    <div class="depth-layer layer-2" data-speed="0.3">
      <div class="shape s1"></div>
      <div class="shape s2"></div>
      <div class="shape s3"></div>
    </div>
    <div class="depth-layer layer-3" data-speed="0.6">
      <div class="shape s1"></div>
      <div class="shape s2"></div>
    </div>
  </div>

  <div class="content">
    <h1>Depth Scroll</h1>
    <p>Watch the shapes in the background move at different speeds as you scroll, creating a 3D depth illusion.</p>
    <p>Three layers of shapes — far (slow), mid (medium), and near (fast) — simulate distance through parallax movement.</p>
    <p>This technique is used in hero sections and storytelling pages to add visual depth without actual 3D rendering.</p>
    <p>The key is subtle speed differences — dramatic parallax can feel disorienting, but gentle movement adds polish.</p>
  </div>

  <script>
    const layers = document.querySelectorAll('.depth-layer');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      layers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed);
        layer.style.transform = 'translateY(' + (-scrollY * speed) + 'px)';
      });
    });
  </script>
</body>
</html>`,
      },
    ],
    explanationHe: `<h4>איך גלילת עומק עובדת?</h4>
<p>שלוש שכבות של צורות נעות במהירויות שונות בזמן גלילה — שכבות "רחוקות" איטיות ו"קרובות" מהירות, מה שיוצר אשליית עומק.</p>
<ul>
  <li><strong>שלוש שכבות:</strong> כל שכבה מקבלת <code>data-speed</code> שונה — 0.1 (רחוקה), 0.3 (אמצעית), 0.6 (קרובה).</li>
  <li><strong>position: fixed:</strong> השכבות ממוקמות fixed על כל המסך כרקע, עם <code>pointer-events: none</code> שלא יפריעו לאינטראקציה.</li>
  <li><strong>translateY:</strong> בכל גלילה, כל שכבה זזה למעלה לפי <code>scrollY * speed</code> — המהירויות השונות יוצרות את העומק.</li>
  <li><strong>צורות עם opacity נמוך:</strong> opacity של 0.1-0.15 שומר על הצורות כרמזים עדינים ולא כמוקד ויזואלי.</li>
</ul>
<p>הרקע ב-<code>z-index</code> נמוך והתוכן ב-<code>z-index: 10</code> — כך התוכן תמיד קריא מעל שכבות העומק.</p>`,
    proTipHe: 'השתמשו ב-filter: blur() על השכבות הרחוקות כדי לדמות depth-of-field אמיתי.',
  },
];
