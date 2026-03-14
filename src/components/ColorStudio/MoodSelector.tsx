import { ColorPalette } from './useColorStudio';

const MOODS: { id: string; name: string; nameHe: string; palette: ColorPalette; preview: string[] }[] = [
  {
    id: 'dark-luxury', name: 'Dark Luxury', nameHe: 'לוקסוס כהה',
    preview: ['#0d0900', '#c8a96e', '#f5efe0', '#1a1208'],
    palette: { bg: '#0d0900', surface: '#1a1208', accent: '#c8a96e', accent2: '#d4b896', text: '#f5efe0', muted: 'rgba(245,239,224,0.4)', border: 'rgba(200,169,110,0.2)' },
  },
  {
    id: 'neon-tokyo', name: 'Neon Tokyo', nameHe: 'ניאון טוקיו',
    preview: ['#04040a', '#ff2d78', '#00f0ff', '#0d0d18'],
    palette: { bg: '#04040a', surface: '#0d0d18', accent: '#ff2d78', accent2: '#00f0ff', text: '#ffffff', muted: 'rgba(255,255,255,0.4)', border: 'rgba(255,45,120,0.2)' },
  },
  {
    id: 'earthy-cafe', name: 'Earthy Cafe', nameHe: 'ארתי קפה',
    preview: ['#faf6ef', '#78350f', '#4d7c0f', '#fff8f0'],
    palette: { bg: '#faf6ef', surface: '#fff8f0', accent: '#78350f', accent2: '#4d7c0f', text: '#1c1917', muted: '#78716c', border: 'rgba(120,53,15,0.15)' },
  },
  {
    id: 'ocean-deep', name: 'Ocean Deep', nameHe: 'עומק הים',
    preview: ['#020d1a', '#0ea5e9', '#06b6d4', '#041424'],
    palette: { bg: '#020d1a', surface: '#041424', accent: '#0ea5e9', accent2: '#06b6d4', text: '#f0f9ff', muted: 'rgba(240,249,255,0.4)', border: 'rgba(14,165,233,0.2)' },
  },
  {
    id: 'nordic', name: 'Nordic', nameHe: 'נורדי',
    preview: ['#f8f9fa', '#2d3748', '#4a5568', '#edf2f7'],
    palette: { bg: '#f8f9fa', surface: '#edf2f7', accent: '#2d3748', accent2: '#4a5568', text: '#1a202c', muted: '#718096', border: 'rgba(45,55,72,0.1)' },
  },
  {
    id: 'electric-purple', name: 'Electric Purple', nameHe: 'סגול חשמלי',
    preview: ['#06050f', '#7f5af0', '#2cb67d', '#100f1f'],
    palette: { bg: '#06050f', surface: '#100f1f', accent: '#7f5af0', accent2: '#2cb67d', text: '#fffffe', muted: 'rgba(255,255,254,0.4)', border: 'rgba(127,90,240,0.2)' },
  },
  {
    id: 'sunset', name: 'Sunset', nameHe: 'שקיעה',
    preview: ['#0f0a00', '#f97316', '#ec4899', '#1a1000'],
    palette: { bg: '#0f0a00', surface: '#1a1000', accent: '#f97316', accent2: '#ec4899', text: '#fff7ed', muted: 'rgba(255,247,237,0.4)', border: 'rgba(249,115,22,0.2)' },
  },
  {
    id: 'matrix', name: 'Matrix', nameHe: 'מטריקס',
    preview: ['#000000', '#00ff41', '#00bb3b', '#0a0a0a'],
    palette: { bg: '#000000', surface: '#0a0a0a', accent: '#00ff41', accent2: '#00cc33', text: '#e0ffe0', muted: 'rgba(0,255,65,0.4)', border: 'rgba(0,255,65,0.15)' },
  },
  {
    id: 'rose-gold', name: 'Rose Gold', nameHe: 'רוז גולד',
    preview: ['#fdf4f4', '#c4714f', '#d4a0a0', '#fef0f0'],
    palette: { bg: '#fdf4f4', surface: '#fef0f0', accent: '#c4714f', accent2: '#e8927c', text: '#2d1515', muted: 'rgba(45,21,21,0.4)', border: 'rgba(196,113,79,0.15)' },
  },
  {
    id: 'midnight-blue', name: 'Midnight Blue', nameHe: 'כחול חצות',
    preview: ['#020818', '#3b82f6', '#8b5cf6', '#040d24'],
    palette: { bg: '#020818', surface: '#040d24', accent: '#3b82f6', accent2: '#8b5cf6', text: '#f8fafc', muted: 'rgba(248,250,252,0.4)', border: 'rgba(59,130,246,0.2)' },
  },
  {
    id: 'forest', name: 'Forest', nameHe: 'יער',
    preview: ['#0a110a', '#22c55e', '#84cc16', '#111a11'],
    palette: { bg: '#0a110a', surface: '#111a11', accent: '#22c55e', accent2: '#84cc16', text: '#f0fdf4', muted: 'rgba(240,253,244,0.4)', border: 'rgba(34,197,94,0.2)' },
  },
  {
    id: 'brutalist', name: 'Brutalist', nameHe: 'ברוטליסט',
    preview: ['#ffffff', '#000000', '#ff0000', '#f0f0f0'],
    palette: { bg: '#ffffff', surface: '#f0f0f0', accent: '#000000', accent2: '#ff0000', text: '#000000', muted: 'rgba(0,0,0,0.5)', border: '#000000' },
  },
];

interface MoodSelectorProps {
  currentPalette: ColorPalette;
  onSelect: (palette: ColorPalette) => void;
}

export function MoodSelector({ onSelect }: MoodSelectorProps) {
  return (
    <div className="mood-grid">
      {MOODS.map(mood => (
        <button
          key={mood.id}
          className="mood-card"
          onClick={() => onSelect(mood.palette)}
          title={mood.name}
        >
          <div className="mood-swatches">
            {mood.preview.map((color, i) => (
              <div key={i} className="mood-swatch" style={{ backgroundColor: color }} />
            ))}
          </div>
          <div className="mood-name">{mood.nameHe}</div>
          <div className="mood-name-en">{mood.name}</div>
        </button>
      ))}
    </div>
  );
}
