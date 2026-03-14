export type IconVariant = 'outline' | 'filled' | 'gradient' | 'glow' | 'duotone' | 'twotone';

export interface Icon {
  id: string;
  nameHe: string;
  tags: string[];
  paths: { outline: string; filled: string };
}

export interface IconSet {
  id: string;
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  useCases: string[];
  color: string;
  color2: string;
  dna: {
    strokeWidth: number;
    strokeLinecap: 'round' | 'square' | 'butt';
    strokeLinejoin: 'round' | 'miter' | 'bevel';
    cornerRadius: string;
    personality: string;
  };
  icons: Icon[];
}
