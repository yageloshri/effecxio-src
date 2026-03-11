export const FEATURED_IDS = ['aurora', 'glitch', 'parallax', 'particlesbg', 'morphtext'] as const;

export type FeaturedSize = 'large' | 'regular';

export const FEATURED_LAYOUT: { id: string; size: FeaturedSize }[] = [
  { id: 'aurora', size: 'large' },
  { id: 'glitch', size: 'regular' },
  { id: 'parallax', size: 'regular' },
  { id: 'particlesbg', size: 'regular' },
  { id: 'morphtext', size: 'large' },
];
