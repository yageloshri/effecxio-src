import { useState } from 'react';
import { ColorPalette } from './useColorStudio';

const PRESETS = [
  { name: 'Apple', url: 'apple.com', colors: ['#000000', '#ffffff', '#0071e3', '#f5f5f7'] },
  { name: 'Airbnb', url: 'airbnb.com', colors: ['#ffffff', '#ff5a5f', '#484848', '#f7f7f7'] },
  { name: 'Notion', url: 'notion.so', colors: ['#ffffff', '#000000', '#2eaadc', '#f7f6f3'] },
  { name: 'Linear', url: 'linear.app', colors: ['#101012', '#5e6ad2', '#ffffff', '#1c1c1f'] },
  { name: 'Stripe', url: 'stripe.com', colors: ['#0a2540', '#635bff', '#00d4ff', '#ffffff'] },
  { name: 'Vercel', url: 'vercel.com', colors: ['#000000', '#ffffff', '#0070f3', '#111111'] },
];

interface BrandStealerProps {
  isLoading: boolean;
  onExtract: (palette: ColorPalette) => void;
  setLoading: (v: boolean) => void;
}

function getLightness(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return ((Math.max(r, g, b) + Math.min(r, g, b)) / 2) * 100;
}

function getSaturation(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  return max === min ? 0 : ((max - min) / (1 - Math.abs(2 * l - 1))) * 100;
}

function colorsToPalette(colors: string[]): ColorPalette {
  const sorted = [...colors].sort((a, b) => getLightness(a) - getLightness(b));
  const darkest = sorted[0] || '#080808';
  const lightest = sorted[sorted.length - 1] || '#f0f0f0';
  const vivid = colors.find(c => getSaturation(c) > 50) || sorted[Math.floor(sorted.length / 2)];
  const vivid2 = colors.find((c, i) => i > 0 && getSaturation(c) > 40 && c !== vivid) || sorted[Math.floor(sorted.length / 2) + 1] || vivid;
  const isDark = getLightness(darkest) < 50;

  return {
    bg: isDark ? darkest : lightest,
    surface: sorted[isDark ? 1 : sorted.length - 2] || darkest,
    accent: vivid,
    accent2: vivid2,
    text: isDark ? lightest : darkest,
    muted: isDark ? 'rgba(240,240,240,0.45)' : 'rgba(17,17,17,0.45)',
    border: `${vivid}22`,
  };
}

export function BrandStealer({ isLoading, onExtract, setLoading }: BrandStealerProps) {
  const [url, setUrl] = useState('');
  const [extracted, setExtracted] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const extract = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;
    setLoading(true);
    setError('');
    setExtracted([]);
    setSelected(new Set());

    try {
      const res = await fetch('/api/extract-colors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });
      if (!res.ok) throw new Error('Failed');
      const { colors } = await res.json();
      setExtracted(colors);
    } catch {
      setError('לא הצלחנו לחלץ צבעים. נסה URL אחר.');
    } finally {
      setLoading(false);
    }
  };

  const applySelected = () => {
    const colors = [...selected].map(i => extracted[i]);
    if (colors.length < 2) return;
    onExtract(colorsToPalette(colors));
  };

  return (
    <div className="brand-stealer">
      <p className="bs-description">
        הכנס URL של אתר — נחלץ את הצבעים שלו ונחיל על הטמפלייט.
      </p>

      <div className="bs-input-wrap">
        <input
          className="bs-input"
          placeholder="apple.com"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && extract(url)}
        />
        <button
          className="bs-submit"
          onClick={() => extract(url)}
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? '\u27F3' : 'חלץ'}
        </button>
      </div>

      <div className="bs-presets">
        {PRESETS.map(preset => (
          <button
            key={preset.name}
            className="bs-preset"
            onClick={() => {
              setUrl(preset.url);
              setExtracted(preset.colors);
            }}
          >
            <div className="bs-preset-swatches">
              {preset.colors.slice(0, 3).map((c, i) => (
                <div key={i} style={{ background: c, width: 10, height: 10, borderRadius: 2 }} />
              ))}
            </div>
            {preset.name}
          </button>
        ))}
      </div>

      {error && <div className="bs-error">{error}</div>}

      {extracted.length > 0 && (
        <div className="bs-extracted">
          <div className="bs-extracted-label">בחר צבעים להחיל:</div>
          <div className="bs-colors">
            {extracted.map((color, i) => (
              <button
                key={i}
                className={`bs-color ${selected.has(i) ? 'selected' : ''}`}
                style={{ background: color }}
                onClick={() => {
                  const next = new Set(selected);
                  next.has(i) ? next.delete(i) : next.add(i);
                  setSelected(next);
                }}
                title={color}
              >
                {selected.has(i) && <span className="bs-check">{'\u2713'}</span>}
              </button>
            ))}
          </div>
          <button
            className="bs-apply"
            onClick={applySelected}
            disabled={selected.size < 2}
          >
            {`החל ${selected.size} צבעים \u2192`}
          </button>
        </div>
      )}
    </div>
  );
}
