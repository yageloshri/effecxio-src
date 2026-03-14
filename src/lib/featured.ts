export const FEATURED_IDS = ['splitbutton', 'stackedcards', 'scrollvideo', 'hovercard3d', 'flipcard'] as const;

export type FeaturedSize = 'large' | 'regular';

export const FEATURED_LAYOUT: { id: string; size: FeaturedSize }[] = [
  { id: 'splitbutton', size: 'large' },
  { id: 'stackedcards', size: 'regular' },
  { id: 'scrollvideo', size: 'regular' },
  { id: 'hovercard3d', size: 'regular' },
  { id: 'flipcard', size: 'large' },
];
