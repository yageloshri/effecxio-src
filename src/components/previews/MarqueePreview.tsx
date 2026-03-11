'use client';
import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const items = ['אפקטים מדהימים', '✦', 'עיצוב מודרני', '✦', 'אנימציות חלקות', '✦', 'קוד נקי', '✦', 'חוויה אינטראקטיבית', '✦'];
const repeatedItems = [...items, ...items, ...items];

const MarqueePreview = memo(function MarqueePreview() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes marquee-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.333%); }
      }
      @keyframes marquee-scroll-reverse {
        0% { transform: translateX(-33.333%); }
        100% { transform: translateX(0); }
      }
    `;
    el.appendChild(styleEl);

    return () => {
      styleEl.remove();
    };
  }, []);

  const rowStyle = (reverse: boolean): React.CSSProperties => ({
    display: 'flex',
    gap: 16,
    whiteSpace: 'nowrap',
    animation: shouldReduceMotion
      ? 'none'
      : `${reverse ? 'marquee-scroll-reverse' : 'marquee-scroll'} ${reverse ? '18s' : '22s'} linear infinite`,
    willChange: 'transform',
  });

  const itemStyle = (isSymbol: boolean): React.CSSProperties => ({
    fontSize: isSymbol ? 14 : 15,
    fontWeight: isSymbol ? 400 : 700,
    color: isSymbol ? 'var(--accent2)' : 'var(--text)',
    opacity: isSymbol ? 0.7 : 0.9,
    flexShrink: 0,
    letterSpacing: isSymbol ? 0 : 0.5,
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 220,
        overflow: 'hidden',
        borderRadius: 12,
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
        direction: 'ltr',
      }}
    >
      {/* Row 1 */}
      <div style={{ overflow: 'hidden', padding: '4px 0' }}>
        <div style={rowStyle(false)}>
          {repeatedItems.map((item, i) => (
            <span key={`r1-${i}`} style={itemStyle(item === '✦')}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 - reverse */}
      <div style={{ overflow: 'hidden', padding: '4px 0' }}>
        <div style={rowStyle(true)}>
          {repeatedItems.map((item, i) => (
            <span
              key={`r2-${i}`}
              style={{
                ...itemStyle(item === '✦'),
                color: item === '✦' ? 'var(--accent3)' : 'var(--accent)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 3 */}
      <div style={{ overflow: 'hidden', padding: '4px 0' }}>
        <div style={rowStyle(false)}>
          {repeatedItems.map((item, i) => (
            <span
              key={`r3-${i}`}
              style={{
                ...itemStyle(item === '✦'),
                opacity: 0.4,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default MarqueePreview;
