'use client';

import { useState, useId, useMemo, useRef, useCallback, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { allSets } from '@/data/icons';
import type { IconSet, Icon, IconVariant } from '@/data/icons';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobilePageHeader from '@/components/mobile/MobilePageHeader';
import MobileCopyToast from '@/components/mobile/MobileCopyToast';
import { LIBRARY_NAMES_HE, translateIconName } from '@/data/icon-translations';

const VARIANT_LABELS: { key: IconVariant; label: string }[] = [
  { key: 'outline', label: 'קו' },
  { key: 'filled', label: 'מלא' },
  { key: 'gradient', label: 'גרדיאנט' },
  { key: 'glow', label: 'זוהר' },
  { key: 'duotone', label: 'דואוטון' },
  { key: 'twotone', label: 'טוטון' },
];

const COLOR_PALETTE: { color: string; color2: string }[] = [
  { color: '#ffffff', color2: '#b0b0b0' },
  { color: '#ef4444', color2: '#b91c1c' },
  { color: '#f97316', color2: '#c2410c' },
  { color: '#eab308', color2: '#a16207' },
  { color: '#22c55e', color2: '#15803d' },
  { color: '#06b6d4', color2: '#0e7490' },
  { color: '#3b82f6', color2: '#1d4ed8' },
  { color: '#8b5cf6', color2: '#6d28d9' },
  { color: '#ec4899', color2: '#be185d' },
  { color: '#d4af37', color2: '#a68b28' },
  { color: '#c8f53b', color2: '#84cc16' },
  { color: '#ff6fd8', color2: '#cd45ff' },
];

const LIBRARY_DISPLAY_NAMES = LIBRARY_NAMES_HE;

type ExternalLibraryData = Record<string, { count: number; icons: string[] }>;

function darkenHex(hex: string, factor = 0.3): string {
  const h = hex.replace('#', '');
  const r = Math.round(parseInt(h.substring(0, 2), 16) * (1 - factor));
  const g = Math.round(parseInt(h.substring(2, 4), 16) * (1 - factor));
  const b = Math.round(parseInt(h.substring(4, 6), 16) * (1 - factor));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function IconRenderer({
  icon,
  size = 24,
  set,
  variant,
}: {
  icon: Icon;
  size?: number;
  set: IconSet;
  variant: IconVariant;
}) {
  const uid = useId().replace(/:/g, '');

  const commonProps = {
    viewBox: '0 0 24 24',
    width: size,
    height: size,
  };

  switch (variant) {
    case 'outline':
      return (
        <svg
          {...commonProps}
          fill="none"
          stroke={set.color}
          strokeWidth={set.dna.strokeWidth}
          strokeLinecap={set.dna.strokeLinecap}
          strokeLinejoin={set.dna.strokeLinejoin}
          dangerouslySetInnerHTML={{ __html: icon.paths.outline }}
        />
      );

    case 'filled':
      return (
        <svg
          {...commonProps}
          fill={set.color}
          stroke="none"
          dangerouslySetInnerHTML={{ __html: icon.paths.filled }}
        />
      );

    case 'gradient': {
      const gradId = `grad-${uid}`;
      return (
        <svg {...commonProps}>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={set.color} />
              <stop offset="100%" stopColor={set.color2} />
            </linearGradient>
          </defs>
          <g
            fill={`url(#${gradId})`}
            stroke="none"
            dangerouslySetInnerHTML={{ __html: icon.paths.filled }}
          />
        </svg>
      );
    }

    case 'glow': {
      const filterId = `glow-${uid}`;
      return (
        <svg {...commonProps}>
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g
            fill="none"
            stroke={set.color}
            strokeWidth={set.dna.strokeWidth}
            strokeLinecap={set.dna.strokeLinecap}
            strokeLinejoin={set.dna.strokeLinejoin}
            filter={`url(#${filterId})`}
            dangerouslySetInnerHTML={{ __html: icon.paths.outline }}
          />
        </svg>
      );
    }

    case 'duotone':
      return (
        <svg {...commonProps}>
          <g
            fill={set.color2}
            opacity={0.3}
            stroke="none"
            dangerouslySetInnerHTML={{ __html: icon.paths.filled }}
          />
          <g
            fill="none"
            stroke={set.color}
            strokeWidth={set.dna.strokeWidth}
            strokeLinecap={set.dna.strokeLinecap}
            strokeLinejoin={set.dna.strokeLinejoin}
            dangerouslySetInnerHTML={{ __html: icon.paths.outline }}
          />
        </svg>
      );

    case 'twotone': {
      const parser = typeof DOMParser !== 'undefined' ? new DOMParser() : null;
      if (!parser) {
        return (
          <svg
            {...commonProps}
            fill="none"
            stroke={set.color}
            strokeWidth={set.dna.strokeWidth}
            strokeLinecap={set.dna.strokeLinecap}
            strokeLinejoin={set.dna.strokeLinejoin}
            dangerouslySetInnerHTML={{ __html: icon.paths.outline }}
          />
        );
      }
      const doc = parser.parseFromString(
        `<svg xmlns="http://www.w3.org/2000/svg">${icon.paths.outline}</svg>`,
        'image/svg+xml'
      );
      const children = Array.from(doc.documentElement.children);
      const coloredPaths = children
        .map((el, i) => {
          const clone = el.cloneNode(true) as Element;
          clone.setAttribute('stroke', i === 0 ? set.color : set.color2);
          return clone.outerHTML;
        })
        .join('');
      return (
        <svg
          {...commonProps}
          fill="none"
          strokeWidth={set.dna.strokeWidth}
          strokeLinecap={set.dna.strokeLinecap}
          strokeLinejoin={set.dna.strokeLinejoin}
          dangerouslySetInnerHTML={{ __html: coloredPaths }}
        />
      );
    }

    default:
      return null;
  }
}

function buildVariantSVG(
  icon: Icon,
  set: IconSet,
  variant: IconVariant,
  format: 'svg' | 'react'
): string {
  const sw = set.dna.strokeWidth;
  const slc = set.dna.strokeLinecap;
  const slj = set.dna.strokeLinejoin;

  const componentName = icon.id
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('');

  if (format === 'svg') {
    switch (variant) {
      case 'outline':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="${set.color}" stroke-width="${sw}" stroke-linecap="${slc}" stroke-linejoin="${slj}" xmlns="http://www.w3.org/2000/svg">${icon.paths.outline}</svg>`;

      case 'filled':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="${set.color}" stroke="none" xmlns="http://www.w3.org/2000/svg">${icon.paths.filled}</svg>`;

      case 'gradient':
        return `<svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${set.color}"/><stop offset="100%" stop-color="${set.color2}"/></linearGradient></defs><g fill="url(#grad)" stroke="none">${icon.paths.filled}</g></svg>`;

      case 'glow':
        return `<svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g fill="none" stroke="${set.color}" stroke-width="${sw}" stroke-linecap="${slc}" stroke-linejoin="${slj}" filter="url(#glow)">${icon.paths.outline}</g></svg>`;

      case 'duotone':
        return `<svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="${set.color2}" opacity="0.3" stroke="none">${icon.paths.filled}</g><g fill="none" stroke="${set.color}" stroke-width="${sw}" stroke-linecap="${slc}" stroke-linejoin="${slj}">${icon.paths.outline}</g></svg>`;

      case 'twotone': {
        const parser = typeof DOMParser !== 'undefined' ? new DOMParser() : null;
        if (!parser) return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="${set.color}" stroke-width="${sw}" stroke-linecap="${slc}" stroke-linejoin="${slj}" xmlns="http://www.w3.org/2000/svg">${icon.paths.outline}</svg>`;
        const doc = parser.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${icon.paths.outline}</svg>`, 'image/svg+xml');
        const children = Array.from(doc.documentElement.children);
        const coloredPaths = children.map((el, i) => {
          const clone = el.cloneNode(true) as Element;
          clone.setAttribute('stroke', i === 0 ? set.color : set.color2);
          return clone.outerHTML;
        }).join('');
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke-width="${sw}" stroke-linecap="${slc}" stroke-linejoin="${slj}" xmlns="http://www.w3.org/2000/svg">${coloredPaths}</svg>`;
      }
    }
  }

  // React format
  switch (variant) {
    case 'outline':
      return `// ${icon.nameHe} — ${set.name} style (outline)
export function Icon${componentName}({ size = 24, color = '${set.color}' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={${sw}} strokeLinecap="${slc}" strokeLinejoin="${slj}">
      ${icon.paths.outline.trim()}
    </svg>
  );
}`;

    case 'filled':
      return `// ${icon.nameHe} — ${set.name} style (filled)
export function Icon${componentName}({ size = 24, color = '${set.color}' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} stroke="none">
      ${icon.paths.filled.trim()}
    </svg>
  );
}`;

    case 'gradient':
      return `// ${icon.nameHe} — ${set.name} style (gradient)
export function Icon${componentName}({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="${set.color}" />
          <stop offset="100%" stopColor="${set.color2}" />
        </linearGradient>
      </defs>
      <g fill="url(#grad)" stroke="none">
        ${icon.paths.filled.trim()}
      </g>
    </svg>
  );
}`;

    case 'glow':
      return `// ${icon.nameHe} — ${set.name} style (glow)
export function Icon${componentName}({ size = 24, color = '${set.color}' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" stroke={color} strokeWidth={${sw}} strokeLinecap="${slc}" strokeLinejoin="${slj}" filter="url(#glow)">
        ${icon.paths.outline.trim()}
      </g>
    </svg>
  );
}`;

    case 'duotone':
      return `// ${icon.nameHe} — ${set.name} style (duotone)
export function Icon${componentName}({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <g fill="${set.color2}" opacity={0.3} stroke="none">
        ${icon.paths.filled.trim()}
      </g>
      <g fill="none" stroke="${set.color}" strokeWidth={${sw}} strokeLinecap="${slc}" strokeLinejoin="${slj}">
        ${icon.paths.outline.trim()}
      </g>
    </svg>
  );
}`;

    case 'twotone':
      return `// ${icon.nameHe} — ${set.name} style (twotone)
// First child uses ${set.color}, rest use ${set.color2}
export function Icon${componentName}({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" strokeWidth={${sw}} strokeLinecap="${slc}" strokeLinejoin="${slj}">
      ${icon.paths.outline.trim()}
    </svg>
  );
}`;
  }
}

function useColumns(isMobile: boolean) {
  const [cols, setCols] = useState(isMobile ? 5 : 8);
  useEffect(() => {
    if (isMobile) { setCols(5); return; }
    const update = () => {
      const available = Math.min(window.innerWidth - 120, 1400 - 120);
      setCols(Math.max(1, Math.floor(available / 108)));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [isMobile]);
  return cols;
}

function VirtualizedIconGrid({
  icons,
  set,
  variant,
  activeColor,
  copied,
  onCopy,
  isMobile = false,
}: {
  icons: Icon[];
  set: IconSet;
  variant: IconVariant;
  activeColor: string;
  copied: string | null;
  onCopy: (icon: Icon) => void;
  isMobile?: boolean;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const cols = useColumns(isMobile);
  const rowCount = Math.ceil(icons.length / cols);
  const ROW_HEIGHT = isMobile ? 80 : 110;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 4,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: isMobile ? 'calc(100vh - 180px)' : 'calc(100vh - 200px)',
        overflow: 'auto',
        padding: isMobile ? '0 16px 80px' : '0 60px 80px',
        maxWidth: isMobile ? undefined : 1400,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIdx = virtualRow.index * cols;
          const rowIcons = icons.slice(startIdx, startIdx + cols);
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: 8,
              }}
            >
              {rowIcons.map((icon) => {
                const isCopied = copied === icon.id;
                const cardBg = isCopied
                  ? `${activeColor}1a`
                  : variant === 'glow'
                    ? `radial-gradient(circle at center, ${activeColor}08 0%, transparent 70%)`
                    : 'rgba(255,255,255,0.03)';
                const cardBorder = isCopied
                  ? `${activeColor}66`
                  : `${activeColor}15`;

                return (
                  <button
                    key={icon.id}
                    onClick={() => onCopy(icon)}
                    style={{
                      background: cardBg,
                      border: `1px solid ${cardBorder}`,
                      borderRadius: 12,
                      padding: '20px 12px 12px',
                      cursor: 'pointer',
                      transition: 'all .15s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 10,
                      color: isCopied ? activeColor : 'var(--text)',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => {
                      if (!isCopied) {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = `${activeColor}12`;
                        el.style.transform = 'translateY(-2px)';
                        el.style.boxShadow = `0 4px 20px ${activeColor}22`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCopied) {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background =
                          variant === 'glow'
                            ? `radial-gradient(circle at center, ${activeColor}08 0%, transparent 70%)`
                            : 'rgba(255,255,255,0.03)';
                        el.style.transform = 'translateY(0)';
                        el.style.boxShadow = 'none';
                      }
                    }}
                  >
                    <IconRenderer icon={icon} size={28} set={set} variant={variant} />
                    <div
                      style={{
                        fontSize: 10,
                        opacity: 0.45,
                        textAlign: 'center',
                        lineHeight: 1.3,
                      }}
                    >
                      {icon.nameHe}
                    </div>
                    {isCopied && (
                      <div
                        style={{
                          fontSize: 9,
                          color: activeColor,
                          fontWeight: 700,
                        }}
                      >
                        הועתק
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VirtualizedExternalGrid({
  icons,
  library,
  copied,
  onCopy,
  isMobile = false,
}: {
  icons: string[];
  library: string;
  copied: string | null;
  onCopy: (lib: string, name: string) => void;
  isMobile?: boolean;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const cols = useColumns(isMobile);
  const rowCount = Math.ceil(icons.length / cols);
  const ROW_HEIGHT = isMobile ? 80 : 110;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 4,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: isMobile ? 'calc(100vh - 260px)' : 'calc(100vh - 340px)',
        overflow: 'auto',
        padding: isMobile ? '0 16px 80px' : '0 60px 80px',
        maxWidth: isMobile ? undefined : 1400,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIdx = virtualRow.index * cols;
          const rowIcons = icons.slice(startIdx, startIdx + cols);
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: 8,
              }}
            >
              {rowIcons.map((name) => {
                const iconKey = `${library}/${name}`;
                const isCopied = copied === iconKey;

                return (
                  <button
                    key={name}
                    onClick={() => onCopy(library, name)}
                    style={{
                      background: isCopied
                        ? 'rgba(200,245,59,0.1)'
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isCopied ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 12,
                      padding: '16px 8px 10px',
                      cursor: 'pointer',
                      transition: 'all .15s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      color: isCopied ? 'var(--accent)' : 'var(--text)',
                      fontFamily: 'inherit',
                      overflow: 'hidden',
                      minWidth: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (!isCopied) {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = 'rgba(255,255,255,0.07)';
                        el.style.transform = 'translateY(-2px)';
                        el.style.boxShadow = '0 4px 20px rgba(255,255,255,0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCopied) {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = 'rgba(255,255,255,0.03)';
                        el.style.transform = 'translateY(0)';
                        el.style.boxShadow = 'none';
                      }
                    }}
                  >
                    <img
                      src={`/icon-libraries/${library}/${name}.svg`}
                      alt={name}
                      width={28}
                      height={28}
                      style={{ filter: 'brightness(0) invert(1)' }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        fontSize: 10,
                        opacity: 0.45,
                        textAlign: 'center',
                        lineHeight: 1.3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                      }}
                    >
                      {translateIconName(name)}
                    </div>
                    {isCopied && (
                      <div
                        style={{
                          fontSize: 9,
                          color: 'var(--accent)',
                          fontWeight: 700,
                        }}
                      >
                        הועתק
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function IconsPage() {
  const [activeSet, setActiveSet] = useState('sharp');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [copyFormat, setCopyFormat] = useState<'svg' | 'react'>('svg');
  const [variant, setVariant] = useState<IconVariant>('outline');
  const [customColor, setCustomColor] = useState<string | null>(null);
  const [customColor2, setCustomColor2] = useState<string | null>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const color2InputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const [mobileSearch, setMobileSearch] = useState('');

  // Tab state
  const [activeTab, setActiveTab] = useState<'ours' | 'external'>('ours');

  // External libraries state
  const [extLibraries, setExtLibraries] = useState<ExternalLibraryData | null>(null);
  const [extLoading, setExtLoading] = useState(false);
  const [extSelectedLib, setExtSelectedLib] = useState<string>('bootstrap');
  const [extSearch, setExtSearch] = useState('');
  const [extCopied, setExtCopied] = useState<string | null>(null);

  // Fetch external libraries data on mount
  useEffect(() => {
    if (extLibraries) return;
    setExtLoading(true);
    fetch('/icon-libraries/index.json')
      .then((r) => r.json())
      .then((data: ExternalLibraryData) => {
        setExtLibraries(data);
        const keys = Object.keys(data);
        if (keys.length > 0) setExtSelectedLib(keys[0]);
      })
      .catch(() => {})
      .finally(() => setExtLoading(false));
  }, [extLibraries]);

  // Filtered external icons
  const extFilteredIcons = useMemo(() => {
    if (!extLibraries || !extLibraries[extSelectedLib]) return [];
    const icons = extLibraries[extSelectedLib].icons;
    if (!extSearch.trim()) return icons;
    const q = extSearch.toLowerCase().trim();
    return icons.filter((name) => name.toLowerCase().includes(q));
  }, [extLibraries, extSelectedLib, extSearch]);

  // Copy external icon SVG
  const handleExtCopy = useCallback((lib: string, name: string) => {
    const url = `/icon-libraries/${lib}/${name}.svg`;
    fetch(url)
      .then((r) => r.text())
      .then((svgText) => {
        navigator.clipboard.writeText(svgText).catch(() => {
          const el = document.createElement('textarea');
          el.value = svgText;
          el.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
          document.body.appendChild(el);
          el.focus();
          el.select();
          try {
            document.execCommand('copy');
          } finally {
            document.body.removeChild(el);
          }
        });
        const key = `${lib}/${name}`;
        setExtCopied(key);
        setTimeout(() => setExtCopied(null), 2000);
      });
  }, []);

  const currentSet = allSets.find((s) => s.id === activeSet);

  // Build an effective set with overridden colors
  const effectiveSet = useMemo<IconSet | undefined>(() => {
    if (!currentSet) return undefined;
    if (!customColor) return currentSet;
    return {
      ...currentSet,
      color: customColor,
      color2: customColor2 ?? darkenHex(customColor),
    };
  }, [currentSet, customColor, customColor2]);

  const filtered = effectiveSet?.icons.filter(
    (icon) =>
      icon.nameHe.includes(search) ||
      icon.id.includes(search.toLowerCase()) ||
      icon.tags.some((t) => t.includes(search.toLowerCase()))
  );

  const handleCopy = (icon: Icon) => {
    if (!effectiveSet) return;
    const text = buildVariantSVG(icon, effectiveSet, variant, copyFormat);
    navigator.clipboard.writeText(text).catch(() => {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      document.body.appendChild(el);
      el.focus();
      el.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(el);
      }
    });
    setCopied(icon.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePaletteSelect = (c: string, c2: string) => {
    setCustomColor(c);
    setCustomColor2(c2);
  };

  const handleResetColor = () => {
    setCustomColor(null);
    setCustomColor2(null);
  };

  const activeColor = effectiveSet?.color ?? '#c8f53b';
  const activeColor2 = effectiveSet?.color2 ?? '#888888';
  const isCustom = customColor !== null;

  if (isMobile) {
    const mobileFiltered = effectiveSet?.icons.filter(
      (icon) =>
        icon.nameHe.includes(mobileSearch) ||
        icon.id.includes(mobileSearch.toLowerCase()) ||
        icon.tags.some((t) => t.includes(mobileSearch.toLowerCase()))
    ) ?? [];

    return (
      <div className="mobile-page">
        <MobilePageHeader
          title="אייקונים"
          onSearch={activeTab === 'ours' ? setMobileSearch : (q) => setExtSearch(q)}
          searchPlaceholder={activeTab === 'ours' ? 'חפש אייקון...' : 'חפש אייקון...'}
        />

        {/* Tab pills — mobile */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            padding: '8px 16px 4px',
          }}
        >
          {([
            { key: 'ours' as const, label: 'הסטים שלנו' },
            { key: 'external' as const, label: 'ספריות חיצוניות' },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '8px 20px',
                borderRadius: 100,
                background: activeTab === tab.key ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeTab === tab.key ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                color: activeTab === tab.key ? '#000' : 'rgba(255,255,255,0.6)',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all .2s',
                fontFamily: 'inherit',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'ours' && (
          <>
            <div className="mobile-filter-pills" data-scroll-horizontal>
              {allSets.map((set) => (
                <button
                  key={set.id}
                  className={`filter-pill-mobile ${activeSet === set.id ? 'active' : ''}`}
                  onClick={() => setActiveSet(set.id)}
                >
                  {set.nameHe}
                </button>
              ))}
            </div>

            <div className="variant-selector-mobile" data-scroll-horizontal>
              {VARIANT_LABELS.map((v) => (
                <button
                  key={v.key}
                  className={`filter-pill-mobile ${variant === v.key ? 'active' : ''}`}
                  onClick={() => setVariant(v.key)}
                  style={{ padding: '6px 14px', fontSize: 12 }}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {effectiveSet && (
              <VirtualizedIconGrid
                icons={mobileFiltered}
                set={effectiveSet}
                variant={variant}
                activeColor={activeColor}
                copied={copied}
                onCopy={handleCopy}
                isMobile
              />
            )}
          </>
        )}

        {activeTab === 'external' && (
          <>
            {/* Library pills — mobile, horizontally scrollable */}
            <div
              className="mobile-filter-pills"
              data-scroll-horizontal
              style={{ padding: '8px 16px' }}
            >
              {extLibraries && Object.keys(extLibraries).map((lib) => (
                <button
                  key={lib}
                  className={`filter-pill-mobile ${extSelectedLib === lib ? 'active' : ''}`}
                  onClick={() => { setExtSelectedLib(lib); setExtSearch(''); }}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {LIBRARY_DISPLAY_NAMES[lib] ?? lib}
                  <span style={{ opacity: 0.5, fontSize: 10, marginRight: 4 }}>
                    {extLibraries[lib].count}
                  </span>
                </button>
              ))}
            </div>

            {extLoading ? (
              <div style={{ textAlign: 'center', padding: 40, opacity: 0.4 }}>טוען...</div>
            ) : extLibraries ? (
              <>
                <div style={{ padding: '4px 16px 8px', opacity: 0.3, fontSize: 12, textAlign: 'center' }}>
                  {extFilteredIcons.length} אייקונים
                </div>
                <VirtualizedExternalGrid
                  icons={extFilteredIcons}
                  library={extSelectedLib}
                  copied={extCopied}
                  onCopy={handleExtCopy}
                  isMobile
                />
              </>
            ) : null}
          </>
        )}

        <MobileCopyToast show={(activeTab === 'ours' ? copied : extCopied) !== null} message="✓ SVG הועתק!" />
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      {/* Header */}
      <div style={{ padding: '100px 60px 0', maxWidth: 1400, margin: '0 auto' }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          בנק האייקונים
        </h1>
        <p style={{ color: '#fff', marginTop: 8, fontSize: 15, textAlign: 'center' }}>
          {allSets.length} סטים &times; 60 אייקונים &mdash; {allSets.length * 60} SVG מקוריים
        </p>
      </div>

      {/* Tab Pills */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          padding: '28px 60px 0',
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        {([
          { key: 'ours' as const, label: 'הסטים שלנו' },
          { key: 'external' as const, label: 'ספריות חיצוניות' },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '12px 32px',
              borderRadius: 100,
              background: activeTab === tab.key ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${activeTab === tab.key ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
              color: activeTab === tab.key ? '#000' : 'rgba(255,255,255,0.6)',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              transition: 'all .2s',
              fontFamily: 'inherit',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== Tab: הסטים שלנו ===== */}
      {activeTab === 'ours' && (
        <>
          {/* Set Selector */}
          <div
            style={{
              padding: '32px 60px',
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 1400,
              margin: '0 auto',
            }}
          >
            {allSets.map((set) => (
              <button
                key={set.id}
                onClick={() => setActiveSet(set.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 100,
                  background:
                    activeSet === set.id ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${activeSet === set.id ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                  color: activeSet === set.id ? '#000' : 'rgba(255,255,255,0.6)',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all .2s',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {set.nameHe}
                <span style={{ opacity: 0.5, fontSize: 11 }}>{set.name}</span>
              </button>
            ))}
          </div>

          {/* Set Description */}
          {effectiveSet && (
            <div
              style={{
                padding: '0 60px 24px',
                maxWidth: 1400,
                margin: '0 auto',
                display: 'flex',
                gap: 40,
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{effectiveSet.descriptionHe}</div>
                <div style={{ fontSize: 12, opacity: 0.4, marginTop: 4 }}>
                  מתאים ל: {effectiveSet.useCases.join(' · ')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, opacity: 0.6 }}>
                {effectiveSet.icons.slice(0, 8).map((icon) => (
                  <IconRenderer key={icon.id} icon={icon} size={20} set={effectiveSet} variant={variant} />
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div
            style={{
              padding: '0 60px 16px',
              maxWidth: 1400,
              margin: '0 auto',
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <input
              placeholder="חפש אייקון..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: '10px 16px',
                color: 'var(--text)',
                fontSize: 14,
                width: 240,
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
            <div
              style={{
                display: 'flex',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 10,
                padding: 4,
              }}
            >
              {(['svg', 'react'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setCopyFormat(fmt)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 7,
                    border: 'none',
                    background:
                      copyFormat === fmt ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color:
                      copyFormat === fmt ? 'var(--text)' : 'rgba(255,255,255,0.4)',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {fmt === 'svg' ? 'SVG' : 'React'}
                </button>
              ))}
            </div>
            <div style={{ opacity: 0.3, fontSize: 13 }}>
              {filtered?.length} אייקונים
            </div>
          </div>

          {/* Variant Selector */}
          <div
            style={{
              padding: '0 60px 16px',
              maxWidth: 1400,
              margin: '0 auto',
              display: 'flex',
              gap: 6,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 10,
                padding: 4,
                gap: 2,
              }}
            >
              {VARIANT_LABELS.map((v) => (
                <button
                  key={v.key}
                  onClick={() => setVariant(v.key)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 7,
                    border: 'none',
                    background:
                      variant === v.key
                        ? `${activeColor}22`
                        : 'transparent',
                    color:
                      variant === v.key
                        ? activeColor
                        : 'rgba(255,255,255,0.4)',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all .15s',
                    ...(variant === v.key
                      ? { boxShadow: `0 0 8px ${activeColor}33` }
                      : {}),
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div
            style={{
              padding: '0 60px 32px',
              maxWidth: 1400,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 12, opacity: 0.4, marginLeft: 4 }}>צבע:</span>

            {/* Default (set original) */}
            <button
              onClick={handleResetColor}
              title="ברירת מחדל"
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: !isCustom ? `2px solid ${activeColor}` : '2px solid rgba(255,255,255,0.15)',
                background: `linear-gradient(135deg, ${currentSet?.color ?? '#888'} 50%, ${currentSet?.color2 ?? '#444'} 50%)`,
                cursor: 'pointer',
                transition: 'all .15s',
                padding: 0,
                boxShadow: !isCustom ? `0 0 8px ${activeColor}44` : 'none',
                transform: !isCustom ? 'scale(1.15)' : 'scale(1)',
              }}
            />

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />

            {/* Palette swatches */}
            {COLOR_PALETTE.map((p) => {
              const isActive = isCustom && customColor === p.color && customColor2 === p.color2;
              return (
                <button
                  key={p.color}
                  onClick={() => handlePaletteSelect(p.color, p.color2)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: isActive ? `2px solid ${p.color}` : '2px solid rgba(255,255,255,0.1)',
                    background: p.color,
                    cursor: 'pointer',
                    transition: 'all .15s',
                    padding: 0,
                    boxShadow: isActive ? `0 0 8px ${p.color}66` : 'none',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                />
              );
            })}

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />

            {/* Custom color picker (primary) */}
            <button
              onClick={() => colorInputRef.current?.click()}
              title="בחר צבע ראשי"
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: '2px dashed rgba(255,255,255,0.3)',
                background: isCustom
                  ? customColor!
                  : 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
                cursor: 'pointer',
                padding: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <input
                ref={colorInputRef}
                type="color"
                value={customColor ?? '#ffffff'}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setCustomColor2(null);
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  border: 'none',
                  padding: 0,
                }}
              />
            </button>

            {/* Custom color2 picker (secondary) — only shown when custom is active */}
            {isCustom && (
              <>
                <button
                  onClick={() => color2InputRef.current?.click()}
                  title="בחר צבע משני"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: '1.5px dashed rgba(255,255,255,0.25)',
                    background: activeColor2,
                    cursor: 'pointer',
                    padding: 0,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <input
                    ref={color2InputRef}
                    type="color"
                    value={activeColor2}
                    onChange={(e) => setCustomColor2(e.target.value)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      border: 'none',
                      padding: 0,
                    }}
                  />
                </button>
                <span style={{ fontSize: 10, opacity: 0.3 }}>משני</span>
              </>
            )}
          </div>

          {/* Icons Grid — Virtualized */}
          <VirtualizedIconGrid
            icons={filtered ?? []}
            set={effectiveSet!}
            variant={variant}
            activeColor={activeColor}
            copied={copied}
            onCopy={handleCopy}
          />
        </>
      )}

      {/* ===== Tab: ספריות חיצוניות ===== */}
      {activeTab === 'external' && (
        <>
          {/* Library Selector */}
          <div
            style={{
              padding: '32px 60px 16px',
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 1400,
              margin: '0 auto',
            }}
          >
            {extLibraries && Object.keys(extLibraries).map((lib) => (
              <button
                key={lib}
                onClick={() => { setExtSelectedLib(lib); setExtSearch(''); }}
                style={{
                  padding: '10px 20px',
                  borderRadius: 100,
                  background:
                    extSelectedLib === lib ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${extSelectedLib === lib ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                  color: extSelectedLib === lib ? '#000' : 'rgba(255,255,255,0.6)',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all .2s',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {LIBRARY_DISPLAY_NAMES[lib] ?? lib}
                <span style={{ opacity: 0.5, fontSize: 11 }}>{extLibraries[lib].count}</span>
              </button>
            ))}
          </div>

          {/* Search + Count */}
          <div
            style={{
              padding: '0 60px 24px',
              maxWidth: 1400,
              margin: '0 auto',
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <input
              placeholder="חפש אייקון..."
              value={extSearch}
              onChange={(e) => setExtSearch(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: '10px 16px',
                color: 'var(--text)',
                fontSize: 14,
                width: 240,
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
            <div style={{ opacity: 0.3, fontSize: 13 }}>
              {extFilteredIcons.length} אייקונים
            </div>
          </div>

          {/* External Grid */}
          {extLoading ? (
            <div style={{ textAlign: 'center', padding: 80, opacity: 0.4, fontSize: 16 }}>
              טוען ספריות...
            </div>
          ) : extLibraries ? (
            <VirtualizedExternalGrid
              icons={extFilteredIcons}
              library={extSelectedLib}
              copied={extCopied}
              onCopy={handleExtCopy}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
