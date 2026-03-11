'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const LINES = [
  '$ npm install effects-lab',
  '> Installing dependencies...',
  '> Build successful!',
  '$ echo "Ready!"',
];

const TYPE_SPEED = 50;
const LINE_PAUSE = 800;

const KEYFRAMES = `
@keyframes typingcursor-blink {
  50% { opacity: 0; }
}
`;

function TypingcursorPreview() {
  const prefersReduced = useReducedMotion();
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const lineIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setCompletedLines(LINES);
      setCurrentLine('');
      return;
    }

    function tick() {
      const li = lineIdxRef.current;
      const ci = charIdxRef.current;

      if (li >= LINES.length) {
        // restart
        lineIdxRef.current = 0;
        charIdxRef.current = 0;
        setCompletedLines([]);
        setCurrentLine('');
        timerRef.current = setTimeout(tick, LINE_PAUSE);
        return;
      }

      const line = LINES[li];
      if (ci <= line.length) {
        setCurrentLine(line.slice(0, ci));
        charIdxRef.current = ci + 1;
        timerRef.current = setTimeout(tick, TYPE_SPEED);
      } else {
        // line complete
        setCompletedLines((prev) => [...prev, line]);
        setCurrentLine('');
        lineIdxRef.current = li + 1;
        charIdxRef.current = 0;
        timerRef.current = setTimeout(tick, LINE_PAUSE);
      }
    }

    tick();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [prefersReduced]);

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        padding: '0 16px',
      }}
    >
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 10,
          padding: '14px 20px',
          minWidth: 300,
          maxWidth: 380,
          border: '1px solid var(--border)',
        }}
      >
        {/* Terminal dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
        </div>
        {/* Output */}
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            color: '#4ade80',
            lineHeight: 1.7,
            minHeight: 100,
          }}
        >
          {completedLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          {currentLine !== '' && (
            <div>
              {currentLine}
              <span
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: '1.1em',
                  background: '#4ade80',
                  verticalAlign: 'text-bottom',
                  marginLeft: 1,
                  animation: 'typingcursor-blink 1s step-end infinite',
                }}
              />
            </div>
          )}
          {currentLine === '' && completedLines.length < LINES.length && (
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: '1.1em',
                background: '#4ade80',
                verticalAlign: 'text-bottom',
                animation: 'typingcursor-blink 1s step-end infinite',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(TypingcursorPreview);
