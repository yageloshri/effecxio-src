import { ColorPalette } from './useColorStudio';

interface ColorPreviewProps {
  palette: ColorPalette;
}

const KEYS: { key: keyof ColorPalette; label: string }[] = [
  { key: 'bg', label: 'BG' },
  { key: 'surface', label: 'Surface' },
  { key: 'accent', label: 'Accent' },
  { key: 'accent2', label: 'Accent 2' },
  { key: 'text', label: 'Text' },
];

export function ColorPreview({ palette }: ColorPreviewProps) {
  return (
    <div className="cs-preview">
      <div className="cs-preview-swatches">
        {KEYS.map(({ key }) => (
          <div
            key={key}
            className="cs-preview-swatch"
            style={{ backgroundColor: palette[key] }}
            title={`${key}: ${palette[key]}`}
          />
        ))}
      </div>
    </div>
  );
}
