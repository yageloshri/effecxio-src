'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Upload, Check, Film, AlertCircle, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
type Stage = 'idle' | 'extracting' | 'uploading' | 'done' | 'error';

interface ScrollVideoToolProps {
  onClose: () => void;
  onCopy: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const IMGBB_API_KEY = '25b04553339a4a409b2c07eb1f9ca8a4';

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Detect actual FPS using requestVideoFrameCallback, fallback to 24fps
async function detectFps(video: HTMLVideoElement): Promise<number> {
  if (!('requestVideoFrameCallback' in video)) return 24;

  return new Promise((resolve) => {
    let count = 0;
    let startTime = 0;
    const sampleMs = 600;

    const saved = video.currentTime;
    video.muted = true;
    video.currentTime = 0;

    const onFrame = (_now: number, metadata: { mediaTime: number }) => {
      if (count === 0) startTime = metadata.mediaTime;
      count++;

      const elapsed = metadata.mediaTime - startTime;
      if (elapsed < sampleMs / 1000) {
        video.requestVideoFrameCallback(onFrame);
      } else {
        video.pause();
        const fps = elapsed > 0 ? Math.round(count / elapsed) : 24;
        video.currentTime = saved;
        resolve(Math.max(1, fps));
      }
    };

    video.requestVideoFrameCallback(onFrame);
    video.play().catch(() => resolve(24));
  });
}

// ─── Code Template ────────────────────────────────────────────────────────────
// Uses var/function syntax for maximum browser compatibility.
// All 6 mobile bug fixes are baked in.
const CODE_TEMPLATE = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scroll Video — Effects Lab</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; }

    /* Total scroll distance = frames * 20px per frame + full viewport */
    .scroll-video-section {
      height: calc(var(--frame-count, 60) * 20px + 100dvh);
      position: relative;
    }
    @supports not (height: 100dvh) {
      .scroll-video-section {
        height: calc(var(--frame-count, 60) * 20px + 100vh);
      }
    }

    /* BUG FIX #1 — iOS Safari: 100dvh adjusts with address bar */
    .scroll-video-sticky {
      position: sticky;
      top: 0;
      height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: #000;
    }
    @supports not (height: 100dvh) {
      .scroll-video-sticky { height: 100vh; }
    }

    #scrollCanvas {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      display: block;
      will-change: contents;
    }

    .scroll-video-loader {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 3px;
      background: rgba(255,255,255,0.1);
    }
    .scroll-video-loader-fill {
      height: 100%;
      background: #c8f53b;
      width: 0%;
      transition: width 0.3s;
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
      /* URLS_PLACEHOLDER */
    ];

    var TOTAL_FRAMES = FRAME_URLS.length;
    var canvas = document.getElementById('scrollCanvas');
    var ctx = canvas.getContext('2d');
    var section = document.getElementById('scrollVideoSection');
    var loaderFill = document.getElementById('loaderFill');
    var images = [];
    var currentFrame = 0;
    var ticking = false;
    var decodedCount = 0;

    /* BUG FIX #1 — dynamic viewport height for iOS Safari */
    function setVh() {
      document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
      section.style.setProperty('--frame-count', TOTAL_FRAMES);
    }
    setVh();
    /* Do NOT listen to resize — causes jumpy scroll on iOS when address bar hides */
    window.addEventListener('orientationchange', setVh);

    /* BUG FIX #6 — Preload with img.decode() for flicker-free canvas */
    function preloadAll() {
      images = FRAME_URLS.map(function (url) {
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;
        return img;
      });

      var priority = images.slice(0, Math.min(10, TOTAL_FRAMES));
      Promise.all(priority.map(function (img) {
        return img.decode
          ? img.decode().catch(function () {})
          : new Promise(function (r) { img.onload = r; img.onerror = r; });
      })).then(function () {
        if (images[0] && images[0].naturalWidth) {
          canvas.width = images[0].naturalWidth;
          canvas.height = images[0].naturalHeight;
        }
        fitCanvasToContainer();
        ctx.drawImage(images[0], 0, 0);
        canvas.classList.remove('loading');
        canvas.classList.add('ready');
        loaderFill.style.width = '100%';

        images.slice(10).forEach(function (img) {
          if (img.decode) {
            img.decode().catch(function () {}).then(function () {
              decodedCount++;
              var pct = Math.round(10 + (decodedCount / Math.max(1, TOTAL_FRAMES - 10)) * 90);
              loaderFill.style.width = pct + '%';
            });
          }
        });
      });
    }

    /* BUG FIX #5 — Canvas CSS sizing for orientation change */
    function fitCanvasToContainer() {
      if (!canvas.width || !canvas.height) return;
      var maxW = window.innerWidth;
      var maxH = window.innerHeight;
      var ratio = canvas.width / canvas.height;
      if (maxW / maxH > ratio) {
        canvas.style.height = maxH + 'px';
        canvas.style.width = Math.round(maxH * ratio) + 'px';
      } else {
        canvas.style.width = maxW + 'px';
        canvas.style.height = Math.round(maxW / ratio) + 'px';
      }
    }

    var resizeTimer;
    window.addEventListener('orientationchange', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        fitCanvasToContainer();
        drawFrame(currentFrame);
      }, 200);
    });

    function drawFrame(index) {
      var img = images[index];
      if (!img || !img.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    }

    /* BUG FIX #2 — getBoundingClientRect updates during iOS momentum scroll */
    function getProgress() {
      var rect = section.getBoundingClientRect();
      var total = section.offsetHeight - window.innerHeight;
      return total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
    }

    function updateFrame() {
      var progress = getProgress();
      var frameIndex = Math.min(Math.floor(progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);
      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        drawFrame(currentFrame);
      }
    }

    /* BUG FIX #4 — rAF ticking flag: one draw per animation frame max */
    function scheduleUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updateFrame();
        ticking = false;
      });
    }

    /* BUG FIX #2 + #3 — scroll + touchmove, always passive: true */
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('touchmove', scheduleUpdate, { passive: true });

    preloadAll();
  })();
  </script>
</body>
</html>`;

function generateCode(urls: string[]): string {
  const urlLines = urls.map(u => "      '" + u + "'").join(',\n');
  return CODE_TEMPLATE.replace('      /* URLS_PLACEHOLDER */', urlLines);
}

// ─── Prompt Generators ───────────────────────────────────────────────────────

function generateLovablePrompt(urls: string[]): string {
  const urlList = urls.map(u => `  "${u}"`).join(',\n');
  const totalScroll = urls.length * 20;

  return `Create a full-screen scroll-driven video hero section component.

## Component: ScrollVideoHero

Create ScrollVideoHero.tsx as a default export React component.
No external libraries. React hooks + vanilla canvas API only.

---

## What it does

As the user scrolls, a video plays frame by frame across the full screen.
Text overlays fade in and out at different scroll stages — like Apple's product pages.
The video fills the entire screen (cover mode, no black bars).

---

## Frame URLs (${urls.length} frames)

\`\`\`ts
const FRAME_URLS = [
${urlList}
];
\`\`\`

---

## Text overlays — YOU decide the content

Read the existing app to understand its purpose, product, and tone.
Then write 3 short text overlays that feel like they belong on this site:

- **TITLE**: A short powerful headline (3-6 words). Shown centered at scroll start.
- **LEFT**: A supporting line for the left side (5-10 words). Shown at scroll middle-left.
- **RIGHT**: A supporting line for the right side (5-10 words). Shown at scroll middle-right.

Make them sound like real marketing copy for this specific product/brand.
Use the same language as the rest of the site (Hebrew or English, match the site).

Define them as constants at the top of the file:
\`\`\`ts
const TEXT_TITLE = "..."; // your choice
const TEXT_LEFT  = "..."; // your choice
const TEXT_RIGHT = "..."; // your choice
\`\`\`

---

## Layout structure

\`\`\`tsx
<div ref={sectionRef} style={{ height: \`calc(${totalScroll}px + var(--svh, 100vh))\`, position: 'relative' }}>

  {/* Sticky fullscreen container */}
  <div style={{
    position: 'sticky', top: 0,
    width: '100vw',
    height: 'var(--svh, 100vh)',
    overflow: 'hidden',
    background: '#000',
  }}>
    {/* Canvas — fullscreen cover, no black bars */}
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      objectFit: 'cover',      // hint only — actual cover done in drawCover()
    }} />

    {/* TITLE — centered, fades in at 0% scroll, fades out at 30% */}
    <div ref={titleRef} style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: 0,
      pointerEvents: 'none',
      textAlign: 'center', padding: '0 2rem',
    }}>
      <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 900,
        textShadow: '0 2px 40px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>
        {TEXT_TITLE}
      </h1>
    </div>

    {/* LEFT text — fades in at 30%, fades out at 60% */}
    <div ref={leftRef} style={{
      position: 'absolute', left: '5%', top: '50%',
      transform: 'translateY(-50%)',
      opacity: 0,
      pointerEvents: 'none', maxWidth: '30%',
    }}>
      <p style={{ color: '#fff', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 600,
        textShadow: '0 2px 20px rgba(0,0,0,0.6)', lineHeight: 1.4 }}>
        {TEXT_LEFT}
      </p>
    </div>

    {/* RIGHT text — fades in at 55%, fades out at 85% */}
    <div ref={rightRef} style={{
      position: 'absolute', right: '5%', top: '50%',
      transform: 'translateY(-50%)',
      opacity: 0,
      pointerEvents: 'none', maxWidth: '30%', textAlign: 'right',
    }}>
      <p style={{ color: '#fff', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 600,
        textShadow: '0 2px 20px rgba(0,0,0,0.6)', lineHeight: 1.4 }}>
        {TEXT_RIGHT}
      </p>
    </div>

  </div>
</div>
\`\`\`

---

## Canvas cover drawing — NO black bars

The canvas pixel dimensions stay equal to the video's original size.
CSS width/height both 100% so it stretches to fill the container.
Use drawImage with source crop to implement cover behavior:

\`\`\`ts
function drawCover(img: HTMLImageElement) {
  const vw = canvas.offsetWidth  || window.innerWidth;
  const vh = canvas.offsetHeight || window.innerHeight;

  const imgRatio  = img.naturalWidth / img.naturalHeight;
  const viewRatio = vw / vh;

  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

  if (viewRatio > imgRatio) {
    // viewport is wider than image — crop top and bottom
    sh = img.naturalWidth / viewRatio;
    sy = (img.naturalHeight - sh) / 2;
  } else {
    // viewport is taller than image — crop left and right
    sw = img.naturalHeight * viewRatio;
    sx = (img.naturalWidth - sw) / 2;
  }

  // Set canvas pixel size to match viewport for sharp rendering
  if (canvas.width !== vw || canvas.height !== vh) {
    canvas.width  = vw;
    canvas.height = vh;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
}
\`\`\`

Call drawCover(images[currentFrame]) instead of ctx.drawImage.
Also call drawCover on orientationchange after fitCanvas.

---

## Text opacity & position — scroll-driven

Calculate these values inside the rAF update loop (not with useState — too slow):

\`\`\`ts
// progress = 0 to 1 across the full scroll section

function getTextValues(progress: number) {
  // Helper: fade a value in/out between two scroll points
  const fade = (start: number, inEnd: number, outStart: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress < inEnd)   return (progress - start) / (inEnd - start);
    if (progress > outStart) return 1 - (progress - outStart) / (end - outStart);
    return 1;
  };

  return {
    titleOpacity: fade(0,    0.15, 0.25, 0.38),
    titleY:       -progress * 30,

    leftOpacity:  fade(0.30, 0.44, 0.54, 0.64),
    leftY:        progress < 0.44 ? (1 - (progress - 0.30) / 0.14) * 30 : 0,

    rightOpacity: fade(0.58, 0.70, 0.80, 0.90),
    rightY:       progress < 0.70 ? (1 - (progress - 0.58) / 0.12) * 30 : 0,
  };
}
\`\`\`

Apply these values by writing directly to element.style (not React state):

\`\`\`ts
const titleEl = titleRef.current;
const leftEl  = leftRef.current;
const rightEl = rightRef.current;

const v = getTextValues(progress);
if (titleEl) {
  titleEl.style.opacity   = String(v.titleOpacity);
  titleEl.style.transform = \`translateY(\${v.titleY}px)\`;
}
if (leftEl) {
  leftEl.style.opacity   = String(v.leftOpacity);
  leftEl.style.transform = \`translateY(calc(-50% + \${v.leftY}px))\`;
}
if (rightEl) {
  rightEl.style.opacity   = String(v.rightOpacity);
  rightEl.style.transform = \`translateY(calc(-50% + \${v.rightY}px))\`;
}
\`\`\`

Use refs (titleRef, leftRef, rightRef) for direct DOM manipulation —
this is intentional and critical for 60fps performance.
Do NOT use useState or useReducer for opacity/transform values.

---

## Scroll & mobile logic

\`\`\`ts
// iOS Safari viewport fix
const setVh = () =>
  document.documentElement.style.setProperty('--svh', window.innerHeight + 'px');
setVh();
window.addEventListener('orientationchange', setVh);

// getBoundingClientRect — works during iOS momentum scroll
function getProgress() {
  const rect  = sectionRef.current!.getBoundingClientRect();
  const total = sectionRef.current!.offsetHeight - window.innerHeight;
  return total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
}

// rAF ticking — one update per frame
let ticking = false;
const schedule = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const progress   = getProgress();
    const frameIndex = Math.min(Math.floor(progress * FRAME_URLS.length), FRAME_URLS.length - 1);

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      drawCover(images[frameIndex]);
    }

    // Update text overlays directly on DOM
    updateTextOverlays(progress);

    ticking = false;
  });
};

// Both listeners passive — required for Chrome, catches iOS momentum
window.addEventListener('scroll',    schedule, { passive: true });
window.addEventListener('touchmove', schedule, { passive: true });
\`\`\`

---

## Preloading

\`\`\`ts
// Decode first 10 frames before showing canvas
const priority = images.slice(0, Math.min(10, FRAME_URLS.length));
await Promise.all(priority.map(img =>
  img.decode ? img.decode().catch(() => {}) : new Promise(r => { img.onload = r; })
));
// Draw first frame with cover crop
drawCover(images[0]);
canvas.style.opacity = '1';
// Decode rest in background
images.slice(10).forEach(img => img.decode?.().catch(() => {}));
\`\`\`

---

## Cleanup

\`\`\`ts
return () => {
  window.removeEventListener('scroll',    schedule);
  window.removeEventListener('touchmove', schedule);
  window.removeEventListener('orientationchange', setVh);
};
\`\`\`

---

## Final notes

- Use <ScrollVideoHero /> anywhere in the app — fully self-contained
- Three text strings (TEXT_TITLE, TEXT_LEFT, TEXT_RIGHT) are defined at the top — easy to change
- No black bars — video always fills the full screen
- 60fps on mobile — no React state updates during scroll, only direct DOM writes
- Works on iOS Safari, Android Chrome, desktop`;
}

function generateBase44Prompt(urls: string[]): string {
  const urlList = urls.map(u => `"${u}"`).join(', ');
  const totalScroll = urls.length * 20;

  return `בנה סקשן hero מלא מסך עם אנימציית גלילה — סגנון Apple AirPods.

## מה לבנות
קומפוננטת ScrollVideoHero — וידאו שמתנגן פריים אחר פריים בזמן גלילה.
הוידאו ממלא את כל המסך ללא פסים שחורים.
טקסטים מופיעים ונעלמים בצדדים בזמן הגלילה.

---

## פריימים (${urls.length} במספר)
const FRAME_URLS = [${urlList}];

---

## טקסטים — אתה בוחר את התוכן

קרא את האתר הקיים כדי להבין את המוצר, המותג והטון.
כתוב 3 טקסטים קצרים שמרגישים חלק מהאתר:

TEXT_TITLE — כותרת חזקה (3-6 מילים). מוצגת במרכז בתחילת הגלילה.
TEXT_LEFT  — משפט תומך שמאל (5-10 מילים). מופיע באמצע הגלילה בצד שמאל.
TEXT_RIGHT — משפט תומך ימין (5-10 מילים). מופיע מאוחר יותר בצד ימין.

השתמש בשפה של שאר האתר (עברית או אנגלית — תתאם).
הגדר אותם בראש הקובץ:
const TEXT_TITLE = "...";
const TEXT_LEFT  = "...";
const TEXT_RIGHT = "...";

---

## Canvas — cover מלא, ללא פסים שחורים

אל תשתמש ב-CSS לבד. חשב crop ידנית עם drawImage:

function drawCover(img) {
  const vw = canvas.offsetWidth  || window.innerWidth;
  const vh = canvas.offsetHeight || window.innerHeight;
  const imgRatio  = img.naturalWidth / img.naturalHeight;
  const viewRatio = vw / vh;
  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
  if (viewRatio > imgRatio) {
    sh = img.naturalWidth / viewRatio;
    sy = (img.naturalHeight - sh) / 2;
  } else {
    sw = img.naturalHeight * viewRatio;
    sx = (img.naturalWidth - sw) / 2;
  }
  if (canvas.width !== vw || canvas.height !== vh) {
    canvas.width  = vw;
    canvas.height = vh;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
}

קרא ל-drawCover בכל עדכון פריים ובכל שינוי orientation.

---

## מבנה HTML/CSS

div חיצוני: גובה ${totalScroll}px + גובה המסך האמיתי (לא 100vh — ראה למטה)
div sticky פנימי: position sticky, top 0, רוחב 100vw, גובה מסך אמיתי, overflow hidden, רקע שחור
canvas: position absolute, inset 0, width 100%, height 100%
3 div טקסט: position absolute, pointer-events none

---

## מיקום הטקסטים

TITLE: מרכז המסך, אנכי ואופקי
LEFT: 5% מהשמאל, 50% גובה
RIGHT: 5% מהימין, 50% גובה, text-align right

---

## אנימציית טקסט לפי גלילה (progress = 0 עד 1)

חשב opacity ו-translateY ישירות על ה-DOM element (לא useState — זה איטי מדי ל-60fps):

element.style.opacity   = String(opacityValue);
element.style.transform = \`translateY(\${yValue}px)\`;

לוח זמנים:
TITLE: נכנס 0-0.15, יציב 0.15-0.25, יוצא 0.25-0.38
LEFT:  נכנס 0.30-0.44, יציב 0.44-0.54, יוצא 0.54-0.64
RIGHT: נכנס 0.58-0.70, יציב 0.70-0.80, יוצא 0.80-0.90

כשנכנס: translateY מ-30px ל-0px
כשיוצא: translateY מ-0px ל--30px

---

## גובה מסך נכון — תיקון iOS Safari

אל תשתמש ב-100vh — כולל את ה-address bar ו-sticky canvas קופץ.
במקום:
document.documentElement.style.setProperty('--svh', window.innerHeight + 'px');
הרץ פעם אחת בטעינה ושוב ב-orientationchange בלבד (לא ב-resize).

---

## חישוב progress

השתמש ב-getBoundingClientRect ולא ב-scrollY.
סיבה: scrollY לא מתעדכן במהלך momentum scroll ב-iOS Safari.
progress = -sectionEl.getBoundingClientRect().top / (sectionHeight - windowHeight)

---

## scroll listeners

האזן גם ל-scroll וגם ל-touchmove.
שניהם חייבים להיות passive: true.
השתמש ב-requestAnimationFrame עם ticking flag — עדכון אחד לכל פריים.

---

## ניקוי

הסר את כל ה-event listeners ב-unmount / cleanup.

---

## חשוב

- ללא ספריות חיצוניות
- ללא useState/useReducer לאנימציות — רק DOM ישיר
- וידאו ממלא מסך מלא, ללא פסים שחורים
- 60fps במובייל
- עובד ב-iOS Safari, Android Chrome, דסקטופ`;
}

type FormatKey = 'html' | 'lovable' | 'base44';

interface Formats {
  html: string;
  lovable: string;
  base44: string;
}

function generateAllFormats(urls: string[]): Formats {
  return {
    html: generateCode(urls),
    lovable: generateLovablePrompt(urls),
    base44: generateBase44Prompt(urls),
  };
}

const FORMAT_LABELS: Record<FormatKey, { label: string; icon: string; color: string; bg: string }> = {
  lovable: { label: 'העתק פרומפט ל-Lovable', icon: '\u{1F49C}', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)' },
  base44:  { label: 'העתק פרומפט ל-Base44',  icon: '\u{1F7E0}', color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)' },
  html:    { label: 'קוד HTML גולמי',         icon: '</>',       color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.1)' },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ScrollVideoTool({ onClose, onCopy }: ScrollVideoToolProps) {
  const [stage, setStage] = useState<Stage>('idle');
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [totalFrames, setTotalFrames] = useState(0);
  const [formats, setFormats] = useState<Formats | null>(null);
  const [activeFormat, setActiveFormat] = useState<FormatKey>('lovable');
  const [error, setError] = useState('');
  const [copiedFormat, setCopiedFormat] = useState<FormatKey | null>(null);
  const [videoInfo, setVideoInfo] = useState<{ name: string; duration: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Frame extraction
  const extractFrames = useCallback(async (file: File): Promise<Blob[]> => {
    return new Promise((resolve, reject) => {
      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      const frames: Blob[] = [];
      const objectUrl = URL.createObjectURL(file);

      video.src = objectUrl;
      video.muted = true;
      video.preload = 'auto';

      const onMeta = async () => {
        const duration = video.duration;
        const fps = await detectFps(video);
        const count = Math.round(duration * fps);
        setTotalFrames(count);
        setVideoInfo({ name: file.name, duration });

        const MAX_W = 1280;
        const scale = Math.min(1, MAX_W / video.videoWidth);
        canvas.width = Math.floor(video.videoWidth * scale);
        canvas.height = Math.floor(video.videoHeight * scale);

        setStage('extracting');

        for (let i = 0; i < count; i++) {
          video.currentTime = (i / Math.max(1, count - 1)) * duration;
          await new Promise<void>(res => {
            video.addEventListener('seeked', () => res(), { once: true });
          });

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const blob = await new Promise<Blob>((res, rej) => {
            canvas.toBlob(
              b => b ? res(b) : rej(new Error('blob failed')),
              'image/jpeg',
              0.82
            );
          });

          frames.push(blob);
          setProgress(Math.floor(((i + 1) / count) * 50));
          setProgressLabel('מחלץ פריימים... ' + (i + 1) + '/' + count);
        }

        URL.revokeObjectURL(objectUrl);
        resolve(frames);
      };

      video.addEventListener('loadedmetadata', onMeta, { once: true });
      video.addEventListener('error', () => reject(new Error('שגיאה בטעינת הוידאו')), { once: true });
    });
  }, []);

  // Upload single frame to imgbb
  const uploadFrame = useCallback(async (blob: Blob, index: number): Promise<string> => {
    const base64 = await new Promise<string>(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(blob);
    });

    const form = new FormData();
    form.append('key', IMGBB_API_KEY);
    form.append('image', base64);
    form.append('name', 'frame_' + String(index).padStart(3, '0'));

    const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: form });
    const data = await res.json();

    if (!data.success) throw new Error(data.error?.message ?? 'Upload failed');
    return data.data.url;
  }, []);

  // Upload all frames in batches of 4
  const uploadAllFrames = useCallback(async (frames: Blob[]): Promise<string[]> => {
    setStage('uploading');
    const urls: string[] = new Array(frames.length);
    const BATCH = 4;

    for (let i = 0; i < frames.length; i += BATCH) {
      const batch = frames.slice(i, i + BATCH);
      const results = await Promise.all(batch.map((b, j) => uploadFrame(b, i + j)));
      results.forEach((url, j) => { urls[i + j] = url; });
      const done = Math.min(i + BATCH, frames.length);
      setProgress(50 + Math.floor((done / frames.length) * 50));
      setProgressLabel('מעלה ל-imgbb... ' + done + '/' + frames.length);
    }

    return urls;
  }, [uploadFrame]);

  // Main handler
  const handleVideoFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('video/')) {
      setError('נא להעלות קובץ וידאו (MP4, MOV, WEBM)');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('הקובץ גדול מדי — מקסימום 50MB');
      return;
    }

    setError('');
    setFormats(null);
    setProgress(0);
    setCopiedFormat(null);

    try {
      const frames = await extractFrames(file);
      const urls = await uploadAllFrames(frames);
      const allFormats = generateAllFormats(urls);
      setFormats(allFormats);
      setActiveFormat('lovable');
      setStage('done');
      setProgress(100);
      setProgressLabel(urls.length + ' פריימים הועלו בהצלחה');
    } catch (err: unknown) {
      setStage('error');
      setError(err instanceof Error ? err.message : 'שגיאה לא ידועה — נסה שוב');
    }
  }, [extractFrames, uploadAllFrames]);

  // Drag & drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleVideoFile(file);
  }, [handleVideoFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleVideoFile(file);
  }, [handleVideoFile]);

  // Copy a specific format
  const handleCopyFormat = useCallback((format: FormatKey) => {
    if (!formats) return;
    copyToClipboard(formats[format]);
    setCopiedFormat(format);
    setActiveFormat(format);
    onCopy();
    setTimeout(() => setCopiedFormat(null), 2000);
  }, [formats, onCopy]);

  // Reset
  const handleReset = useCallback(() => {
    setStage('idle');
    setProgress(0);
    setProgressLabel('');
    setTotalFrames(0);
    setFormats(null);
    setError('');
    setCopiedFormat(null);
    setVideoInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const isProcessing = stage === 'extracting' || stage === 'uploading';

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="scroll-video-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 50,
        }}
      />

      {/* Panel */}
      <motion.div
        key="scroll-video-panel"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 51,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          pointerEvents: 'none',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: 720,
            maxHeight: '85vh',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--text)',
                fontFamily: "'Heebo', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Film size={20} style={{ color: 'var(--accent)' }} />
              סרטון גלילה — כלי יצירה
            </h2>
            <button
              onClick={onClose}
              aria-label="סגור"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                padding: 4,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'; }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable content */}
          <div style={{ overflowY: 'auto', padding: 20, flex: 1 }}>

            {/* Upload Area */}
            {stage === 'idle' && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed ' + (isDragging ? 'var(--accent)' : 'var(--border)'),
                  borderRadius: 12,
                  padding: '40px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: isDragging ? 'rgba(200, 245, 59, 0.05)' : 'transparent',
                  transition: 'all 0.2s',
                  marginBottom: 20,
                }}
              >
                <Upload
                  size={32}
                  style={{
                    color: isDragging ? 'var(--accent)' : 'var(--muted)',
                    marginBottom: 12,
                    margin: '0 auto 12px',
                    display: 'block',
                  }}
                />
                <p
                  style={{
                    color: 'var(--text)',
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "'Heebo', sans-serif",
                    marginBottom: 6,
                  }}
                >
                  גרור וידאו לכאן
                </p>
                <p
                  style={{
                    color: 'var(--muted)',
                    fontSize: 13,
                    fontFamily: "'Heebo', sans-serif",
                  }}
                >
                  או לחץ לבחירת קובץ — MP4, MOV, WEBM (עד 50MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </div>
            )}

            {/* Video Info */}
            {videoInfo && stage !== 'idle' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                }}
              >
                <Film size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'var(--text)',
                      fontFamily: "'Space Mono', monospace",
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      direction: 'ltr',
                    }}
                  >
                    {videoInfo.name}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'Heebo', sans-serif" }}>
                    {videoInfo.duration.toFixed(1)} שניות — {totalFrames} פריימים
                  </p>
                </div>
              </div>
            )}

            {/* Progress */}
            {isProcessing && (
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    height: 6,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      borderRadius: 3,
                      background: 'var(--accent)',
                      width: progress + '%',
                      transition: 'width 0.3s ease-out',
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--muted)',
                    fontFamily: "'Heebo', sans-serif",
                    textAlign: 'center',
                  }}
                >
                  {progressLabel}
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  marginBottom: 16,
                }}
              >
                <AlertCircle size={16} style={{ color: '#ef4444', flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: '#ef4444', fontFamily: "'Heebo', sans-serif" }}>
                  {error}
                </p>
              </div>
            )}

            {/* Done — Format Buttons + Prompt Preview */}
            {stage === 'done' && formats && (
              <div>
                {/* Status + Reset */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 14,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--accent)',
                      fontFamily: "'Heebo', sans-serif",
                    }}
                  >
                    {progressLabel}
                  </p>
                  <button
                    onClick={handleReset}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 6,
                      border: '1px solid var(--border)',
                      background: 'transparent',
                      color: 'var(--muted)',
                      fontSize: 12,
                      fontFamily: "'Heebo', sans-serif",
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--muted)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <RotateCcw size={12} />
                    וידאו חדש
                  </button>
                </div>

                {/* 3 Format Buttons */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  {(Object.keys(FORMAT_LABELS) as FormatKey[]).map(key => {
                    const fmt = FORMAT_LABELS[key];
                    const isCopied = copiedFormat === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleCopyFormat(key)}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          padding: '10px 8px',
                          borderRadius: 8,
                          border: `1px solid ${activeFormat === key ? fmt.color : 'var(--border)'}`,
                          background: isCopied ? fmt.bg : activeFormat === key ? fmt.bg : 'transparent',
                          color: isCopied ? '#22c55e' : fmt.color,
                          fontSize: 13,
                          fontWeight: 600,
                          fontFamily: "'Heebo', sans-serif",
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {isCopied ? (
                          <>
                            <Check size={14} />
                            <span>הועתק!</span>
                          </>
                        ) : (
                          <>
                            <span>{fmt.icon}</span>
                            <span>{fmt.label}</span>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Prompt Preview */}
                <div
                  style={{
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    maxHeight: 280,
                    overflowY: 'auto',
                  }}
                >
                  <pre
                    style={{
                      margin: 0,
                      padding: 16,
                      background: 'var(--code-bg)',
                      fontSize: 12,
                      lineHeight: 1.6,
                      direction: 'ltr',
                      textAlign: 'left',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      color: 'var(--muted)',
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {formats[activeFormat]}
                  </pre>
                </div>

                <p
                  style={{
                    fontSize: 12,
                    color: 'var(--muted)',
                    marginTop: 10,
                    fontFamily: "'Heebo', sans-serif",
                    opacity: 0.7,
                    textAlign: 'center',
                  }}
                >
                  העתק את הפרומפט &larr; פתח את Lovable/Base44 &larr; הדבק בשורת ה-chat
                </p>
              </div>
            )}

            {/* Error reset */}
            {stage === 'error' && (
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <button
                  onClick={handleReset}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 20px',
                    borderRadius: 8,
                    border: '1px solid var(--accent)',
                    background: 'transparent',
                    color: 'var(--accent)',
                    fontSize: 14,
                    fontFamily: "'Heebo', sans-serif",
                    cursor: 'pointer',
                  }}
                >
                  <RotateCcw size={14} />
                  נסה שוב
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hidden video + canvas for frame extraction */}
      <video ref={videoRef} style={{ display: 'none' }} playsInline />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </AnimatePresence>
  );
}
