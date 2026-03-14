export type EffectCategory =
  | 'text' | 'background' | 'button'
  | 'scroll' | 'cursor' | 'card' | 'hover'
  | 'loader' | 'media' | 'interaction';

export interface EffectTag {
  label: string;
}

export interface CodeTab {
  label: string;
  language: string;
  code: string;
}

export interface CategoryMeta {
  id: EffectCategory;
  label: string;
  tagline: string;
  order: number;
}

export interface Effect {
  id: string;
  title: string;
  titleHe: string;
  description: string;
  descriptionHe: string;
  categories: EffectCategory[];
  tags: EffectTag[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  previewComponent: string;
  codeTabs: CodeTab[];
  explanationHe: string;
  proTipHe?: string;
  promptHe?: string;
}
