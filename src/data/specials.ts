import manifest from './_specials-manifest.json';

export interface Special {
  slug: string;
  title: string;
  titleHe: string;
  previewUrl: string;
}

export const specials: Special[] = manifest.map((item: { slug: string; title: string }) => ({
  slug: item.slug,
  title: item.title,
  titleHe: item.title,
  previewUrl: `/specials-demos/${item.slug}.html`,
}));
