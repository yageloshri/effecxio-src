import type { CategoryMeta, EffectCategory, Effect } from '@/types';

export const CATEGORY_ORDER: CategoryMeta[] = [
  { id: 'text', label: 'טקסט', tagline: 'כל מה שצריך כדי שהטקסט באתר שלך יהיה חי ונושם', order: 1 },
  { id: 'button', label: 'כפתורים', tagline: 'כפתורים שהמשתמשים שלך לא יפסיקו ללחוץ עליהם', order: 2 },
  { id: 'card', label: 'כרטיסים', tagline: 'כרטיסים שגורמים למשתמש לרצות לגעת במסך', order: 3 },
  { id: 'scroll', label: 'גלילה', tagline: 'הפוך את הגלילה לחוויה, לא לדרך', order: 4 },
  { id: 'background', label: 'רקעים', tagline: 'רקעים שהופכים כל דף למשהו שאי אפשר לעזוב', order: 5 },
  { id: 'media', label: 'מדיה', tagline: 'תמונות ווידאו שזזים, נחשפים ומפתיעים', order: 6 },
  { id: 'cursor', label: 'עכבר', tagline: 'הפוך את העכבר לחלק מהעיצוב', order: 7 },
  { id: 'loader', label: 'טעינה', tagline: 'גם ההמתנה יכולה להיות יפה', order: 8 },
  { id: 'hover', label: 'hover', tagline: 'אינטראקציות ריחוף שנותנות חיים לממשק', order: 9 },
  { id: 'interaction', label: 'אינטראקציה', tagline: 'אינטראקציות שהופכות את הממשק לחוויה', order: 10 },
];

export function getEffectsByCategory(effects: Effect[]): Map<EffectCategory, Effect[]> {
  const map = new Map<EffectCategory, Effect[]>();
  for (const meta of CATEGORY_ORDER) {
    const filtered = effects.filter(e => e.categories.includes(meta.id));
    if (filtered.length > 0) {
      map.set(meta.id, filtered);
    }
  }
  return map;
}
