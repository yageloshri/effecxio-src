'use client';

import { useEffect, useRef, useState } from 'react';

// ═══════════════════════════════
// STEPS DATA
// ═══════════════════════════════

interface Step {
  number: string;
  title: string;
  description: string;
  tag: string;
  code: string;
  codeLanguage: string;
  accentColor: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'בחר רכיב',
    description: 'דפדף בספריית Effecxio — אפקטים, טמפלייטים, אייקונים ופונטים. הכל מאורגן לפי קטגוריות עם תצוגה מקדימה חיה.',
    tag: 'BROWSE',
    code: `import { useEffect, useRef } from 'react'

export function AuroraBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')

    // Aurora mesh shader
    const vertexShader = \`
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0, 1);
      }
    \`

    const fragmentShader = \`
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        float aurora = sin(uv.x * 3.0 + time);
        gl_FragColor = vec4(aurora, 0.2, 0.8, 1.0);
      }
    \`

    // Start render loop
    let frame = 0
    const render = () => {
      frame++
      gl.uniform1f(timeLoc, frame * 0.01)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      requestAnimationFrame(render)
    }
    render()
  }, [])

  return <canvas ref={canvasRef} />
}`,
    codeLanguage: 'typescript',
    accentColor: '#c8f53b',
  },
  {
    number: '02',
    title: 'העתק פרומפט',
    description: 'לחץ "העתק פרומפט" — הפרומפט מותאם לצבעים ולסגנון שלך. עובד עם Lovable, Base44, ו-Claude Code.',
    tag: 'COPY PROMPT',
    code: `# Effecxio Prompt — Aurora Background
# Generated for: Lovable / Base44 / Claude Code

Build an Aurora background effect for my website.

## Design tokens (my brand):
--bg: #0a0a0a
--accent: #6366f1
--accent2: #8b5cf6

## Implementation:
- WebGL fragment shader for color blending
- Performance: requestAnimationFrame with
  RAF throttle
- Must work on mobile (fallback to CSS gradient)
- File: src/components/AuroraBackground.tsx

## Expected output:
Animated mesh gradient that shifts between
--accent and --accent2 every 4 seconds.
Canvas fills parent container.
Cleanup on unmount.`,
    codeLanguage: 'markdown',
    accentColor: '#44aaff',
  },
  {
    number: '03',
    title: 'הדבק ובנה',
    description: 'הדבק בכלי שלך — Lovable, Base44, Claude Code, או כל AI אחר. קבל קוד מושלם ועובד.',
    tag: 'BUILD',
    code: `✓ Prompt received
✓ Analyzing design tokens...
✓ Generating WebGL shader...
✓ Creating React component...
✓ Adding mobile fallback...
✓ TypeScript types added...

// Output: src/components/AuroraBackground.tsx
// Lines of code: 127
// Build time: 8 seconds

> Component ready.
> Import and use anywhere:

import { AuroraBackground } from
  './components/AuroraBackground'

// Your site now looks premium. ✦`,
    codeLanguage: 'bash',
    accentColor: '#c8f53b',
  },
];

// ═══════════════════════════════
// TYPEWRITER HOOK
// ═══════════════════════════════

function useTypewriter(text: string, active: boolean, speed = 18) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      setDone(false);
      indexRef.current = 0;
      return;
    }

    indexRef.current = 0;
    setDisplayed('');
    setDone(false);

    const tick = () => {
      if (indexRef.current < text.length) {
        indexRef.current++;
        setDisplayed(text.slice(0, indexRef.current));
        timerRef.current = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };

    timerRef.current = setTimeout(tick, 300);
    return () => clearTimeout(timerRef.current);
  }, [active, text, speed]);

  return { displayed, done };
}

// ═══════════════════════════════
// CODE PANEL
// ═══════════════════════════════

function CodePanel({ step, active }: { step: Step; active: boolean }) {
  const { displayed, done } = useTypewriter(step.code, active, 12);

  const highlight = (code: string) => {
    return code
      .split('\n')
      .map((line) => {
        const escaped = line
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

        const colored = escaped
          // Comments
          .replace(/(\/\/.*$|#.*$)/gm, '<span style="color:rgba(255,255,255,0.3)">$1</span>')
          // Strings
          .replace(/(`[^`]*`|'[^']*'|"[^"]*")/g, '<span style="color:#c8f53b">$1</span>')
          // Keywords
          .replace(/\b(import|export|from|const|function|return|useEffect|useRef|void|let|var|if|precision|attribute|uniform|float|vec2|vec4)\b/g,
            '<span style="color:#44aaff">$1</span>')
          // Success lines
          .replace(/(✓.*$)/gm, '<span style="color:#4ade80">$1</span>')
          // Prompt lines
          .replace(/^(&gt;)(.*)/, '<span style="color:#c8f53b">›</span><span style="color:rgba(255,255,255,0.7)">$2</span>');

        return `<span style="display:block;min-height:1.5em">${colored}</span>`;
      })
      .join('');
  };

  const glowRgb = step.accentColor === '#44aaff' ? '68,170,255' : '200,245,59';

  return (
    <div style={{
      background: '#0d0d0d',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: active
        ? `0 0 60px rgba(${glowRgb}, 0.08)`
        : 'none',
      transition: 'box-shadow 0.5s ease',
    }}>
      {/* Editor header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(255,255,255,0.02)',
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <div key={c} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: c, opacity: active ? 1 : 0.3,
              transition: 'opacity .3s',
            }} />
          ))}
        </div>
        <div style={{
          flex: 1, textAlign: 'center',
          fontSize: 11, color: 'rgba(255,255,255,0.25)',
          fontFamily: "'Space Mono', monospace",
        }}>
          {step.codeLanguage === 'markdown' ? 'effecxio-prompt.md' :
           step.codeLanguage === 'bash' ? 'terminal' : 'component.tsx'}
        </div>
        {/* Tag */}
        <div style={{
          fontSize: 9, padding: '2px 8px', borderRadius: 100,
          background: `${step.accentColor}20`,
          border: `1px solid ${step.accentColor}40`,
          color: step.accentColor,
          fontFamily: "'Space Mono', monospace",
          letterSpacing: '.05em',
        }}>
          {step.tag}
        </div>
      </div>

      {/* Code content */}
      <div style={{
        flex: 1, padding: '20px 20px 20px 0',
        fontFamily: "'Space Mono', JetBrains Mono, monospace",
        fontSize: 12, lineHeight: 1.7,
        color: 'rgba(255,255,255,0.75)',
        overflow: 'hidden',
        position: 'relative',
        direction: 'ltr',
        textAlign: 'left',
      }}>
        {/* Line numbers */}
        <div style={{
          position: 'absolute', left: 0, top: 20,
          width: 36, textAlign: 'right',
          color: 'rgba(255,255,255,0.12)',
          fontSize: 11, lineHeight: 1.7,
          userSelect: 'none', paddingRight: 12,
          fontFamily: "'Space Mono', monospace",
        }}>
          {displayed.split('\n').map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code */}
        <div
          style={{ marginLeft: 40 }}
          dangerouslySetInnerHTML={{ __html: highlight(displayed) }}
        />

        {/* Cursor */}
        {!done && active && (
          <span style={{
            display: 'inline-block',
            width: 2, height: '1.2em',
            background: step.accentColor,
            marginLeft: 42,
            verticalAlign: 'middle',
            animation: 'hiw-blink 1s step-end infinite',
          }} />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════
// MAIN SECTION
// ═══════════════════════════════

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowMid = window.innerHeight / 2;

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        const rect = step.getBoundingClientRect();
        const stepMid = rect.top + rect.height / 2;

        if (Math.abs(stepMid - windowMid) < rect.height / 2) {
          setActiveStep(i);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--surface)',
        padding: '100px 32px',
        direction: 'rtl',
        position: 'relative',
      }}
    >
      {/* Section title */}
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <div style={{
          fontSize: 11, letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: 16,
          fontFamily: "'Space Mono', monospace",
        }}>
          ✦ THE PROCESS
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 900,
          fontFamily: "'Heebo', sans-serif",
          lineHeight: 1.1,
          color: 'var(--text)',
        }}>
          איך מקבלים אתר מושלם
          <br />
          <span style={{ color: 'var(--accent)' }}>ב-3 צעדים</span>
        </h2>
      </div>

      {/* Steps container — 2 column grid */}
      <div className="hiw-grid" style={{
        maxWidth: 1300,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 60,
        alignItems: 'start',
      }}>
        {/* RIGHT (RTL) — steps list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={el => { stepsRef.current[i] = el; }}
              onClick={() => setActiveStep(i)}
              style={{
                padding: '48px 40px',
                borderRadius: 20,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                background: activeStep === i ? 'rgba(255,255,255,0.04)' : 'transparent',
                border: `1px solid ${activeStep === i ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
                position: 'relative',
                marginBottom: 8,
              }}
            >
              {/* Accent side border */}
              <div style={{
                position: 'absolute',
                right: 0, top: '50%',
                transform: 'translateY(-50%)',
                width: 3,
                height: activeStep === i ? '60%' : '0%',
                background: step.accentColor,
                borderRadius: 2,
                transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />

              {/* Step number */}
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1,
                color: activeStep === i ? step.accentColor : 'rgba(255,255,255,0.06)',
                transition: 'color 0.4s ease',
                marginBottom: 16,
                letterSpacing: '-0.02em',
              }}>
                {step.number}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: 28,
                fontWeight: 700,
                fontFamily: "'Heebo', sans-serif",
                color: activeStep === i ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'color 0.4s ease',
                marginBottom: 12,
              }}>
                {step.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: 15,
                lineHeight: 1.7,
                fontFamily: "'Heebo', sans-serif",
                color: activeStep === i ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)',
                transition: 'color 0.4s ease',
                maxWidth: 360,
              }}>
                {step.description}
              </p>

              {/* Progress bar */}
              {activeStep === i && (
                <div style={{
                  position: 'absolute',
                  bottom: 0, right: 40, left: 40,
                  height: 1,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 1,
                }}>
                  <div style={{
                    height: '100%',
                    background: step.accentColor,
                    borderRadius: 1,
                    width: '100%',
                    animation: 'hiw-progress-fill 5s linear forwards',
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* LEFT (RTL) — sticky code panel */}
        <div style={{
          position: 'sticky',
          top: '15vh',
          height: '70vh',
        }}>
          <div style={{ position: 'relative', height: '100%' }}>
            {/* Thought bubble — desktop only */}
            <div className="hiw-bubble-desktop" style={{
              position: 'absolute',
              bottom: -20,
              left: -30,
              transform: 'translateX(-100%)',
              zIndex: 10,
              background: '#ffffff',
              borderRadius: 20,
              padding: '14px 22px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.28), 0 1px 6px rgba(0,0,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              direction: 'rtl',
            }}>
              <div style={{
                position: 'absolute', right: -10, top: '50%', marginTop: -3,
                width: 6, height: 6, borderRadius: '50%',
                background: '#ffffff', boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
              }} />
              <div style={{
                position: 'absolute', right: -20, top: '50%', marginTop: -5,
                width: 4, height: 4, borderRadius: '50%',
                background: '#ffffff', boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
              }} />
              <span style={{ fontSize: 18, lineHeight: 1 }}>✨</span>
              <span style={{
                fontSize: 15, fontWeight: 700, color: '#111111',
                fontFamily: "'Heebo', sans-serif", lineHeight: 1.3, whiteSpace: 'nowrap',
              }}>גם האפקט הזה נמצא אצלנו</span>
            </div>

            {STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: activeStep === i ? 1 : 0,
                  transform: activeStep === i
                    ? 'translateY(0) scale(1)'
                    : activeStep > i
                      ? 'translateY(-20px) scale(0.98)'
                      : 'translateY(20px) scale(0.98)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: activeStep === i ? 'auto' : 'none',
                }}
              >
                <CodePanel step={step} active={activeStep === i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thought bubble — mobile only, below the section */}
      <div className="hiw-bubble-mobile" style={{
        display: 'none',
        justifyContent: 'center',
        padding: '20px 0 0',
      }}>
        <div style={{
          position: 'relative',
          background: '#ffffff',
          borderRadius: 20,
          padding: '12px 20px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.28), 0 1px 6px rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          direction: 'rtl',
        }}>
          <div style={{
            position: 'absolute', top: -8, right: '50%',
            width: 6, height: 6, borderRadius: '50%',
            background: '#ffffff', boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
          }} />
          <div style={{
            position: 'absolute', top: -18, right: 'calc(50% + 6px)',
            width: 4, height: 4, borderRadius: '50%',
            background: '#ffffff', boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
          }} />
          <span style={{ fontSize: 16, lineHeight: 1 }}>✨</span>
          <span style={{
            fontSize: 14, fontWeight: 700, color: '#111111',
            fontFamily: "'Heebo', sans-serif", lineHeight: 1.3, whiteSpace: 'nowrap',
          }}>גם האפקט הזה נמצא אצלנו</span>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        @keyframes hiw-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes hiw-progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (max-width: 900px) {
          .hiw-grid {
            grid-template-columns: 1fr !important;
          }
          .hiw-grid > div:last-child {
            position: relative !important;
            top: auto !important;
            height: 400px !important;
          }
          .hiw-bubble-desktop { display: none !important; }
          .hiw-bubble-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
