import type { IconSet } from '../types';

export const warmSet: IconSet = {
  id: 'warm',
  name: 'Warm',
  nameHe: 'חם',
  description:
    'Round, human, inviting. Like a hug. Generous curves, thick rounded strokes, and plump friendly proportions inspired by Notion, Airbnb, and Headspace.',
  descriptionHe: 'עגול, אנושי, מזמין. כמו חיבוק.',
  useCases: ['קפה', 'בריאות', 'ילדים', 'אוכל', 'אפליקציות consumer'],
  color: '#ff8c42',
  color2: '#ff3cac',
  dna: {
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    cornerRadius: 'rx="4" minimum on every shape',
    personality:
      'Every line feels friendly. Nothing scary. Rounded corners everywhere. Like Notion.',
  },
  icons: [
    // ── 1. home ──
    {
      id: 'home',
      nameHe: 'בית',
      tags: ['home', 'house', 'main'],
      paths: { outline: `<path d="M4 10.5L12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 20V10.5z"/><path d="M9.5 21.5V14.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7"/>`, filled: `<path d="M4 10.5L12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 20V10.5z"/><path d="M9.5 21.5V14.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7"/>` },
    },
    // ── 2. menu ──
    {
      id: 'menu',
      nameHe: 'תפריט',
      tags: ['menu', 'hamburger', 'navigation'],
      paths: { outline: `<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>`, filled: `<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>` },
    },
    // ── 3. arrow-right ──
    {
      id: 'arrow-right',
      nameHe: 'חץ ימינה',
      tags: ['arrow', 'right', 'next', 'forward'],
      paths: { outline: `<path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>`, filled: `<path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>` },
    },
    // ── 4. settings ──
    {
      id: 'settings',
      nameHe: 'הגדרות',
      tags: ['settings', 'gear', 'preferences'],
      paths: { outline: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`, filled: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>` },
    },
    // ── 5. plus ──
    {
      id: 'plus',
      nameHe: 'פלוס',
      tags: ['plus', 'add', 'new'],
      paths: { outline: `<path d="M12 5v14"/><path d="M5 12h14"/>`, filled: `<path d="M12 5v14"/><path d="M5 12h14"/>` },
    },
    // ── 6. minus ──
    {
      id: 'minus',
      nameHe: 'מינוס',
      tags: ['minus', 'remove', 'subtract'],
      paths: { outline: `<path d="M5 12h14"/>`, filled: `<path d="M5 12h14"/>` },
    },
    // ── 7. check ──
    {
      id: 'check',
      nameHe: 'וי',
      tags: ['check', 'done', 'complete'],
      paths: { outline: `<path d="M5 13l4 4L19 7"/>`, filled: `<path d="M5 13l4 4L19 7"/>` },
    },
    // ── 8. check-circle ──
    {
      id: 'check-circle',
      nameHe: 'אישור',
      tags: ['check', 'circle', 'confirm', 'success'],
      paths: { outline: `<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>`, filled: `<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>` },
    },
    // ── 9. alert ──
    {
      id: 'alert',
      nameHe: 'התראה',
      tags: ['alert', 'warning', 'caution'],
      paths: { outline: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/>`, filled: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/>` },
    },
    // ── 10. eye ──
    {
      id: 'eye',
      nameHe: 'עין',
      tags: ['eye', 'view', 'visible'],
      paths: { outline: `<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>`, filled: `<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>` },
    },
    // ── 11. eye-off ──
    {
      id: 'eye-off',
      nameHe: 'עין סגורה',
      tags: ['eye', 'hidden', 'invisible'],
      paths: { outline: `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-6.5 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="M3 3l18 18"/>`, filled: `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-6.5 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="M3 3l18 18"/>` },
    },
    // ── 12. edit ──
    {
      id: 'edit',
      nameHe: 'עריכה',
      tags: ['edit', 'pencil', 'write'],
      paths: { outline: `<path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>`, filled: `<path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>` },
    },
    // ── 13. trash ──
    {
      id: 'trash',
      nameHe: 'מחיקה',
      tags: ['trash', 'delete', 'remove'],
      paths: { outline: `<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><rect x="5" y="6" width="14" height="15" rx="4"/><path d="M10 11v6"/><path d="M14 11v6"/>`, filled: `<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><rect x="5" y="6" width="14" height="15" rx="4"/><path d="M10 11v6"/><path d="M14 11v6"/>` },
    },
    // ── 14. copy ──
    {
      id: 'copy',
      nameHe: 'העתקה',
      tags: ['copy', 'duplicate', 'clipboard'],
      paths: { outline: `<rect x="9" y="9" width="13" height="13" rx="4"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`, filled: `<rect x="9" y="9" width="13" height="13" rx="4"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>` },
    },
    // ── 15. download ──
    {
      id: 'download',
      nameHe: 'הורדה',
      tags: ['download', 'save', 'export'],
      paths: { outline: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M12 3v12"/><path d="M7 12l5 5 5-5"/>`, filled: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M12 3v12"/><path d="M7 12l5 5 5-5"/>` },
    },
    // ── 16. upload ──
    {
      id: 'upload',
      nameHe: 'העלאה',
      tags: ['upload', 'import', 'send'],
      paths: { outline: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M12 17V5"/><path d="M7 10l5-5 5 5"/>`, filled: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M12 17V5"/><path d="M7 10l5-5 5 5"/>` },
    },
    // ── 17. share ──
    {
      id: 'share',
      nameHe: 'שיתוף',
      tags: ['share', 'social', 'send'],
      paths: { outline: `<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98"/><path d="M15.41 6.51l-6.82 3.98"/>`, filled: `<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98"/><path d="M15.41 6.51l-6.82 3.98"/>` },
    },
    // ── 18. link ──
    {
      id: 'link',
      nameHe: 'קישור',
      tags: ['link', 'chain', 'url'],
      paths: { outline: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`, filled: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>` },
    },
    // ── 19. external-link ──
    {
      id: 'external-link',
      nameHe: 'קישור חיצוני',
      tags: ['external', 'link', 'open'],
      paths: { outline: `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/>`, filled: `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/>` },
    },
    // ── 20. filter ──
    {
      id: 'filter',
      nameHe: 'סינון',
      tags: ['filter', 'funnel', 'sort'],
      paths: { outline: `<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>`, filled: `<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>` },
    },
    // ── 21. grid ──
    {
      id: 'grid',
      nameHe: 'רשת',
      tags: ['grid', 'layout', 'tiles'],
      paths: { outline: `<rect x="3" y="3" width="7" height="7" rx="4"/><rect x="14" y="3" width="7" height="7" rx="4"/><rect x="3" y="14" width="7" height="7" rx="4"/><rect x="14" y="14" width="7" height="7" rx="4"/>`, filled: `<rect x="3" y="3" width="7" height="7" rx="4"/><rect x="14" y="3" width="7" height="7" rx="4"/><rect x="3" y="14" width="7" height="7" rx="4"/><rect x="14" y="14" width="7" height="7" rx="4"/>` },
    },
    // ── 22. list ──
    {
      id: 'list',
      nameHe: 'רשימה',
      tags: ['list', 'rows', 'lines'],
      paths: { outline: `<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/>`, filled: `<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/>` },
    },
    // ── 23. lock ──
    {
      id: 'lock',
      nameHe: 'נעילה',
      tags: ['lock', 'security', 'private'],
      paths: { outline: `<rect x="3" y="11" width="18" height="11" rx="4"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16.5" r="1.5" fill="currentColor"/>`, filled: `<rect x="3" y="11" width="18" height="11" rx="4"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16.5" r="1.5" fill="currentColor"/>` },
    },
    // ── 24. unlock ──
    {
      id: 'unlock',
      nameHe: 'שחרור',
      tags: ['unlock', 'open', 'access'],
      paths: { outline: `<rect x="3" y="11" width="18" height="11" rx="4"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/><circle cx="12" cy="16.5" r="1.5" fill="currentColor"/>`, filled: `<rect x="3" y="11" width="18" height="11" rx="4"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/><circle cx="12" cy="16.5" r="1.5" fill="currentColor"/>` },
    },
    // ── 25. bell ──
    {
      id: 'bell',
      nameHe: 'פעמון',
      tags: ['bell', 'notification', 'alert'],
      paths: { outline: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`, filled: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>` },
    },
    // ── 26. refresh ──
    {
      id: 'refresh',
      nameHe: 'רענון',
      tags: ['refresh', 'reload', 'sync'],
      paths: { outline: `<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/>`, filled: `<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/>` },
    },
    // ── 27. zoom-in ──
    {
      id: 'zoom-in',
      nameHe: 'הגדלה',
      tags: ['zoom', 'magnify', 'enlarge'],
      paths: { outline: `<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/>`, filled: `<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/>` },
    },
    // ── 28. zoom-out ──
    {
      id: 'zoom-out',
      nameHe: 'הקטנה',
      tags: ['zoom', 'shrink', 'reduce'],
      paths: { outline: `<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 11h6"/>`, filled: `<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 11h6"/>` },
    },
    // ── 29. star ──
    {
      id: 'star',
      nameHe: 'כוכב',
      tags: ['star', 'favorite', 'rating'],
      paths: { outline: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>`, filled: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>` },
    },
    // ── 30. heart ──
    {
      id: 'heart',
      nameHe: 'לב',
      tags: ['heart', 'love', 'favorite'],
      paths: { outline: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`, filled: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>` },
    },
    // ── 31. bookmark ──
    {
      id: 'bookmark',
      nameHe: 'סימניה',
      tags: ['bookmark', 'save', 'flag'],
      paths: { outline: `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>`, filled: `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>` },
    },
    // ── 32. tag ──
    {
      id: 'tag',
      nameHe: 'תגית',
      tags: ['tag', 'label', 'price'],
      paths: { outline: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/>`, filled: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/>` },
    },
    // ── 33. percent ──
    {
      id: 'percent',
      nameHe: 'אחוז',
      tags: ['percent', 'discount', 'sale'],
      paths: { outline: `<path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>`, filled: `<path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>` },
    },
    // ── 34. user ──
    {
      id: 'user',
      nameHe: 'משתמש',
      tags: ['user', 'person', 'profile'],
      paths: { outline: `<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/>`, filled: `<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/>` },
    },
    // ── 35. users ──
    {
      id: 'users',
      nameHe: 'משתמשים',
      tags: ['users', 'group', 'team'],
      paths: { outline: `<circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="19" cy="7" r="3"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>`, filled: `<circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="19" cy="7" r="3"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>` },
    },
    // ── 36. user-plus ──
    {
      id: 'user-plus',
      nameHe: 'הוספת משתמש',
      tags: ['user', 'add', 'invite'],
      paths: { outline: `<circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><path d="M20 8v6"/><path d="M17 11h6"/>`, filled: `<circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><path d="M20 8v6"/><path d="M17 11h6"/>` },
    },
    // ── 37. message ──
    {
      id: 'message',
      nameHe: 'הודעה',
      tags: ['message', 'chat', 'comment'],
      paths: { outline: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>`, filled: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>` },
    },
    // ── 38. mail ──
    {
      id: 'mail',
      nameHe: 'דואר',
      tags: ['mail', 'email', 'envelope'],
      paths: { outline: `<rect x="2" y="4" width="20" height="16" rx="4"/><path d="M22 7l-10 7L2 7"/>`, filled: `<rect x="2" y="4" width="20" height="16" rx="4"/><path d="M22 7l-10 7L2 7"/>` },
    },
    // ── 39. phone ──
    {
      id: 'phone',
      nameHe: 'טלפון',
      tags: ['phone', 'call', 'contact'],
      paths: { outline: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`, filled: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>` },
    },
    // ── 40. camera ──
    {
      id: 'camera',
      nameHe: 'מצלמה',
      tags: ['camera', 'photo', 'capture'],
      paths: { outline: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11z"/><circle cx="12" cy="13" r="4"/>`, filled: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11z"/><circle cx="12" cy="13" r="4"/>` },
    },
    // ── 41. image ──
    {
      id: 'image',
      nameHe: 'תמונה',
      tags: ['image', 'picture', 'photo'],
      paths: { outline: `<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5L5 21"/>`, filled: `<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5L5 21"/>` },
    },
    // ── 42. video ──
    {
      id: 'video',
      nameHe: 'וידאו',
      tags: ['video', 'film', 'record'],
      paths: { outline: `<rect x="2" y="6" width="15" height="12" rx="4"/><path d="M17 9.5l5-3v11l-5-3"/>`, filled: `<rect x="2" y="6" width="15" height="12" rx="4"/><path d="M17 9.5l5-3v11l-5-3"/>` },
    },
    // ── 43. music ──
    {
      id: 'music',
      nameHe: 'מוזיקה',
      tags: ['music', 'audio', 'note'],
      paths: { outline: `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`, filled: `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>` },
    },
    // ── 44. play ──
    {
      id: 'play',
      nameHe: 'נגן',
      tags: ['play', 'start', 'media'],
      paths: { outline: `<path d="M6 4l14 8-14 8V4z"/>`, filled: `<path d="M6 4l14 8-14 8V4z"/>` },
    },
    // ── 45. pause ──
    {
      id: 'pause',
      nameHe: 'השהה',
      tags: ['pause', 'stop', 'media'],
      paths: { outline: `<rect x="6" y="4" width="4" height="16" rx="2"/><rect x="14" y="4" width="4" height="16" rx="2"/>`, filled: `<rect x="6" y="4" width="4" height="16" rx="2"/><rect x="14" y="4" width="4" height="16" rx="2"/>` },
    },
    // ── 46. search ──
    {
      id: 'search',
      nameHe: 'חיפוש',
      tags: ['search', 'find', 'lookup'],
      paths: { outline: `<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>`, filled: `<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>` },
    },
    // ── 47. calendar ──
    {
      id: 'calendar',
      nameHe: 'יומן',
      tags: ['calendar', 'date', 'schedule'],
      paths: { outline: `<rect x="3" y="4" width="18" height="18" rx="4"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>`, filled: `<rect x="3" y="4" width="18" height="18" rx="4"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>` },
    },
    // ── 48. clock ──
    {
      id: 'clock',
      nameHe: 'שעון',
      tags: ['clock', 'time', 'watch'],
      paths: { outline: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`, filled: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>` },
    },
    // ── 49. credit-card ──
    {
      id: 'credit-card',
      nameHe: 'כרטיס אשראי',
      tags: ['credit-card', 'payment', 'money'],
      paths: { outline: `<rect x="1" y="4" width="22" height="16" rx="4"/><path d="M1 10h22"/>`, filled: `<rect x="1" y="4" width="22" height="16" rx="4"/><path d="M1 10h22"/>` },
    },
    // ── 50. wallet ──
    {
      id: 'wallet',
      nameHe: 'ארנק',
      tags: ['wallet', 'money', 'finance'],
      paths: { outline: `<rect x="2" y="5" width="20" height="16" rx="4"/><path d="M2 9h20"/><circle cx="18" cy="15" r="1.5" fill="currentColor"/>`, filled: `<rect x="2" y="5" width="20" height="16" rx="4"/><path d="M2 9h20"/><circle cx="18" cy="15" r="1.5" fill="currentColor"/>` },
    },
    // ── 51. shopping-cart ──
    {
      id: 'shopping-cart',
      nameHe: 'עגלת קניות',
      tags: ['cart', 'shopping', 'buy'],
      paths: { outline: `<circle cx="9" cy="21" r="1.5"/><circle cx="20" cy="21" r="1.5"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>`, filled: `<circle cx="9" cy="21" r="1.5"/><circle cx="20" cy="21" r="1.5"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>` },
    },
    // ── 52. package ──
    {
      id: 'package',
      nameHe: 'חבילה',
      tags: ['package', 'box', 'delivery'],
      paths: { outline: `<path d="M16.5 9.4l-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><path d="M12 22.08V12"/>`, filled: `<path d="M16.5 9.4l-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><path d="M12 22.08V12"/>` },
    },
    // ── 53. truck ──
    {
      id: 'truck',
      nameHe: 'משאית',
      tags: ['truck', 'shipping', 'delivery'],
      paths: { outline: `<rect x="1" y="3" width="15" height="13" rx="4"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>`, filled: `<rect x="1" y="3" width="15" height="13" rx="4"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>` },
    },
    // ── 54. chart-bar ──
    {
      id: 'chart-bar',
      nameHe: 'גרף',
      tags: ['chart', 'bar', 'analytics'],
      paths: { outline: `<rect x="3" y="12" width="4" height="9" rx="2"/><rect x="10" y="6" width="4" height="15" rx="2"/><rect x="17" y="2" width="4" height="19" rx="2"/>`, filled: `<rect x="3" y="12" width="4" height="9" rx="2"/><rect x="10" y="6" width="4" height="15" rx="2"/><rect x="17" y="2" width="4" height="19" rx="2"/>` },
    },
    // ── 55. trending-up ──
    {
      id: 'trending-up',
      nameHe: 'מגמה עולה',
      tags: ['trending', 'growth', 'increase'],
      paths: { outline: `<path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>`, filled: `<path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>` },
    },
    // ── 56. dollar ──
    {
      id: 'dollar',
      nameHe: 'דולר',
      tags: ['dollar', 'money', 'currency'],
      paths: { outline: `<path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`, filled: `<path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>` },
    },
    // ── 57. briefcase ──
    {
      id: 'briefcase',
      nameHe: 'תיק עסקים',
      tags: ['briefcase', 'work', 'business'],
      paths: { outline: `<rect x="2" y="7" width="20" height="14" rx="4"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 13h20"/>`, filled: `<rect x="2" y="7" width="20" height="14" rx="4"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 13h20"/>` },
    },
    // ── 58. globe ──
    {
      id: 'globe',
      nameHe: 'גלובוס',
      tags: ['globe', 'world', 'international'],
      paths: { outline: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/>`, filled: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/>` },
    },
    // ── 59. x ──
    {
      id: 'x',
      nameHe: 'סגירה',
      tags: ['close', 'cancel', 'remove'],
      paths: { outline: `<path d="M18 6L6 18"/><path d="M6 6l12 12"/>`, filled: `<path d="M18 6L6 18"/><path d="M6 6l12 12"/>` },
    },
    // ── 60. info ──
    {
      id: 'info',
      nameHe: 'מידע',
      tags: ['info', 'information', 'help'],
      paths: { outline: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/>`, filled: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/>` },
    },
  ],
};
