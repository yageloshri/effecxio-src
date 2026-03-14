import { ColorPalette } from './useColorStudio';

const COLOR_KEYS: { key: keyof ColorPalette; label: string; labelEn: string }[] = [
  { key: 'bg', label: 'רקע', labelEn: 'Background' },
  { key: 'surface', label: 'משטח', labelEn: 'Surface' },
  { key: 'accent', label: 'אקסנט', labelEn: 'Accent' },
  { key: 'accent2', label: 'אקסנט 2', labelEn: 'Accent 2' },
  { key: 'text', label: 'טקסט', labelEn: 'Text' },
];

interface ManualPickerProps {
  palette: ColorPalette;
  onChange: (key: keyof ColorPalette, value: string) => void;
}

export function ManualPicker({ palette, onChange }: ManualPickerProps) {
  return (
    <div className="manual-picker">
      {COLOR_KEYS.map(({ key, label, labelEn }) => {
        const value = palette[key];
        const hexValue = value.startsWith('#') ? value : '#888888';

        return (
          <div key={key} className="mp-row">
            <div className="mp-swatch" style={{ background: value }} />
            <div className="mp-info">
              <div className="mp-label">{label}</div>
              <div className="mp-label-en">{labelEn}</div>
            </div>
            <div className="mp-value">{value}</div>
            <label className="mp-input-wrap">
              <input
                type="color"
                value={hexValue}
                onChange={e => onChange(key, e.target.value)}
                className="mp-color-input"
              />
              <span className="mp-edit-btn">{'\u270E'}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
