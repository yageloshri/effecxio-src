export type FontSource = 'google' | 'kolmus' | 'aaa' | 'other';
export type FontCategory = 'sans' | 'serif' | 'display' | 'handwritten' | 'decorative';

export interface HebrewFont {
  id: string;
  name: string;
  nameEn: string;
  designer?: string;
  source: FontSource;
  category: FontCategory;
  tags: string[];
  weights: number[];
  hasLatin: boolean;
  downloadUrl: string;
  /** Path to local font file in /public/fonts/ */
  localFile: string;
  /** CSS font-family name for @font-face */
  fontFamily: string;
  previewText: string;
  description: string;
}

export const hebrewFonts: HebrewFont[] = [

  // ═══════════════════════
  // GOOGLE FONTS
  // ═══════════════════════

  {
    id: 'assistant',
    name: 'אסיסטנט',
    nameEn: 'Assistant',
    designer: 'Ben Nathan Borik',
    source: 'google',
    category: 'sans',
    tags: ['מודרני', 'נקי', 'UI', 'אתרים'],
    weights: [200, 300, 400, 500, 600, 700, 800],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Assistant',
    localFile: '/fonts/Assistant-Regular.woff2',
    fontFamily: 'Assistant-Local',
    previewText: 'עיצוב ישראלי מודרני',
    description: 'פונט sans-serif נקי ומודרני. מושלם לממשקי משתמש ואתרים.',
  },

  {
    id: 'heebo',
    name: 'היבו',
    nameEn: 'Heebo',
    designer: 'Oded Ezer',
    source: 'google',
    category: 'sans',
    tags: ['מודרני', 'נקי', 'UI', 'פופולרי'],
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Heebo',
    localFile: '/fonts/Heebo-Regular.woff2',
    fontFamily: 'Heebo-Local',
    previewText: 'כותרת עם אופי',
    description: 'אחד הפונטים הפופולריים ביותר לאתרים בעברית. גמיש ונקי.',
  },

  {
    id: 'rubik',
    name: 'רוביק',
    nameEn: 'Rubik',
    designer: 'Philipp Hubert, Sebastian Fischer',
    source: 'google',
    category: 'sans',
    tags: ['עגול', 'ידידותי', 'מודרני'],
    weights: [300, 400, 500, 600, 700, 800, 900],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Rubik',
    localFile: '/fonts/Rubik-Regular.woff2',
    fontFamily: 'Rubik-Local',
    previewText: 'עיצוב עם פינות עגולות',
    description: 'פינות עגולות ומראה ידידותי. פופולרי לאפליקציות ואתרי consumer.',
  },

  {
    id: 'frank-ruhl-libre',
    name: 'פרנק ריהל ליברה',
    nameEn: 'Frank Ruhl Libre',
    designer: 'Ben Nathan Borik',
    source: 'google',
    category: 'serif',
    tags: ['קלסי', 'ספרים', 'פורמלי', 'עיתונות'],
    weights: [300, 400, 500, 700, 900],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Frank+Ruhl+Libre',
    localFile: '/fonts/FrankRuhlLibre-Regular.woff2',
    fontFamily: 'FrankRuhlLibre-Local',
    previewText: 'קלסיקה עברית מודרנית',
    description: 'פונט serif קלסי עם מגע מודרני. מושלם לתוכן ארוך ועיתונות.',
  },

  {
    id: 'david-libre',
    name: 'דוד ליבר',
    nameEn: 'David Libre',
    designer: 'Ismar David',
    source: 'google',
    category: 'serif',
    tags: ['קלסי', 'מסורתי', 'ספרים'],
    weights: [400, 500, 700],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/David+Libre',
    localFile: '/fonts/DavidLibre-Regular.woff2',
    fontFamily: 'DavidLibre-Local',
    previewText: 'עיצוב בסגנון קלסי',
    description: 'גרסה חופשית של פונט דוד הקלסי. מתאים לתוכן מסורתי.',
  },

  {
    id: 'alef',
    name: 'אלף',
    nameEn: 'Alef',
    designer: 'Hagilda',
    source: 'google',
    category: 'sans',
    tags: ['פשוט', 'קריא', 'בסיסי'],
    weights: [400, 700],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Alef',
    localFile: '/fonts/Alef-Regular.woff2',
    fontFamily: 'Alef-Local',
    previewText: 'פשוט וקריא',
    description: 'פונט פשוט וקריא. מתאים לטקסטים ארוכים.',
  },

  {
    id: 'suez-one',
    name: 'סואץ 1',
    nameEn: 'Suez One',
    designer: 'Yanek Iontef',
    source: 'google',
    category: 'display',
    tags: ['כותרות', 'חזק', 'display'],
    weights: [400],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Suez+One',
    localFile: '/fonts/SuezOne-Regular.woff2',
    fontFamily: 'SuezOne-Local',
    previewText: 'כותרות שצועקות',
    description: 'פונט display חזק לכותרות גדולות. נוכחות חזקה.',
  },

  {
    id: 'varela-round',
    name: 'וארלה מעוגל',
    nameEn: 'Varela Round',
    designer: 'Avraham Cornfeld',
    source: 'google',
    category: 'sans',
    tags: ['עגול', 'נעים', 'ידידותי', 'צעיר'],
    weights: [400],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Varela+Round',
    localFile: '/fonts/VarelaRound-Regular.woff2',
    fontFamily: 'VarelaRound-Local',
    previewText: 'עיצוב עגול ונעים',
    description: 'פינות עגולות ומראה ידידותי. מאוד פופולרי באתרי סטארטאפים.',
  },

  {
    id: 'miriam-libre',
    name: 'מרים ליברה',
    nameEn: 'Miriam Libre',
    designer: 'Michal Sahar',
    source: 'google',
    category: 'sans',
    tags: ['נקי', 'מקצועי', 'דו-לשוני'],
    weights: [400, 700],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Miriam+Libre',
    localFile: '/fonts/MiriamLibre-Regular.woff2',
    fontFamily: 'MiriamLibre-Local',
    previewText: 'מקצועי ונקי',
    description: 'פונט דו-לשוני מקצועי. Hebrew ו-Latin מאוזנים בצורה מושלמת.',
  },

  {
    id: 'amatic',
    name: 'אמטיקה',
    nameEn: 'Amatic SC',
    source: 'google',
    category: 'handwritten',
    tags: ['יד', 'אורגני', 'כיף', 'קפה'],
    weights: [400, 700],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Amatic+SC',
    localFile: '/fonts/AmaticSC-Regular.woff2',
    fontFamily: 'AmaticSC-Local',
    previewText: 'כתוב ביד עם אהבה',
    description: 'פונט בסגנון כתב יד. מושלם לקפה, בוטיקים ועיצוב אורגני.',
  },

  {
    id: 'tinos',
    name: 'טינוס',
    nameEn: 'Tinos',
    source: 'google',
    category: 'serif',
    tags: ['קלסי', 'פורמלי', 'Times'],
    weights: [400, 700],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Tinos',
    localFile: '/fonts/Tinos-Regular.woff2',
    fontFamily: 'Tinos-Local',
    previewText: 'קריא ומסורתי',
    description: 'חלופה חינמית ל-Times New Roman עם תמיכה מלאה בעברית.',
  },

  {
    id: 'cousine',
    name: 'קוזין',
    nameEn: 'Cousine',
    source: 'google',
    category: 'display',
    tags: ['monospace', 'קוד', 'טכני'],
    weights: [400, 700],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Cousine',
    localFile: '/fonts/Cousine-Regular.woff2',
    fontFamily: 'Cousine-Local',
    previewText: 'טכני ומדויק',
    description: 'פונט monospace עם תמיכה בעברית. מושלם לממשקים טכניים.',
  },

  {
    id: 'arimo',
    name: 'ארימו',
    nameEn: 'Arimo',
    source: 'google',
    category: 'sans',
    tags: ['Arial alternative', 'נקי', 'נגיש'],
    weights: [400, 500, 600, 700],
    hasLatin: true,
    downloadUrl: 'https://fonts.google.com/specimen/Arimo',
    localFile: '/fonts/Arimo-Regular.woff2',
    fontFamily: 'Arimo-Local',
    previewText: 'קריא בכל גודל',
    description: 'חלופה חינמית ל-Arial. קריאות מעולה בכל גדלי טקסט.',
  },

  // ═══════════════════════
  // פרויקט קולמוס
  // ═══════════════════════

  {
    id: 'shofar',
    name: 'שופר',
    nameEn: 'Shofar',
    source: 'kolmus',
    category: 'display',
    tags: ['מסורתי', 'דתי', 'display', 'כותרות'],
    weights: [400],
    hasLatin: false,
    downloadUrl: 'http://culmus.sourceforge.net/',
    localFile: '/fonts/Shofar-Regular.ttf',
    fontFamily: 'Shofar-Local',
    previewText: 'עיצוב עם שורשים',
    description: 'פונט בסגנון מסורתי עם אופי ייחודי. מפרויקט קולמוס.',
  },

  {
    id: 'david-clm',
    name: 'דוד CLM',
    nameEn: 'David CLM',
    source: 'kolmus',
    category: 'serif',
    tags: ['קלסי', 'מסורתי', 'ספרים', 'ישראלי'],
    weights: [400, 700],
    hasLatin: false,
    downloadUrl: 'http://culmus.sourceforge.net/',
    localFile: '/fonts/DavidCLM-Medium.otf',
    fontFamily: 'DavidCLM-Local',
    previewText: 'דוד המלך של הפונטים',
    description: 'גרסת הקוד הפתוח של פונט דוד הקלסי. serif ישראלי מסורתי.',
  },

  {
    id: 'nachlieli-clm',
    name: 'נחליאלי CLM',
    nameEn: 'Nachlieli CLM',
    source: 'kolmus',
    category: 'sans',
    tags: ['מודרני', 'נקי', 'ישראלי'],
    weights: [300, 700],
    hasLatin: false,
    downloadUrl: 'http://culmus.sourceforge.net/',
    localFile: '/fonts/NachlieliCLM-Light.otf',
    fontFamily: 'NachlieliCLM-Local',
    previewText: 'מודרני וישראלי',
    description: 'פונט sans-serif ישראלי קלאסי. נקי ומקצועי, מפרויקט קולמוס.',
  },

  {
    id: 'simple-clm',
    name: 'סימפל CLM',
    nameEn: 'Simple CLM',
    source: 'kolmus',
    category: 'sans',
    tags: ['פשוט', 'נקי', 'בסיסי'],
    weights: [400, 700],
    hasLatin: false,
    downloadUrl: 'http://culmus.sourceforge.net/',
    localFile: '/fonts/SimpleCLM-Medium.ttf',
    fontFamily: 'SimpleCLM-Local',
    previewText: 'פשוט וקריא',
    description: 'פונט sans-serif פשוט ונקי. מתאים לכל שימוש בסיסי.',
  },

  {
    id: 'frank-ruehl-clm',
    name: 'פרנק ריהל CLM',
    nameEn: 'Frank Ruehl CLM',
    source: 'kolmus',
    category: 'serif',
    tags: ['קלסי', 'עיתון', 'ספרים', 'פורמלי'],
    weights: [400],
    hasLatin: false,
    downloadUrl: 'http://culmus.sourceforge.net/',
    localFile: '/fonts/FrankRuehlCLM-Medium.ttf',
    fontFamily: 'FrankRuehlCLM-Local',
    previewText: 'קלסיקה ישראלית',
    description: 'פונט serif ישראלי קלסי. מזוהה עם עיתונות ועם הדפוס העברי.',
  },

  {
    id: 'miriam-clm',
    name: 'מרים CLM',
    nameEn: 'Miriam CLM',
    source: 'kolmus',
    category: 'sans',
    tags: ['קלסי', 'ישראלי', 'נוסטלגי'],
    weights: [400],
    hasLatin: false,
    downloadUrl: 'http://culmus.sourceforge.net/',
    localFile: '/fonts/MiriamCLM-Book.ttf',
    fontFamily: 'MiriamCLM-Local',
    previewText: 'נוסטלגיה ישראלית',
    description: 'פונט מרים הקלאסי בגרסת קוד פתוח. סימן היכר של הדפוס הישראלי.',
  },

  {
    id: 'hadasim-clm',
    name: 'חדסים CLM',
    nameEn: 'Hadasim CLM',
    source: 'kolmus',
    category: 'serif',
    tags: ['מעוצב', 'אלגנטי', 'serif'],
    weights: [400, 700],
    hasLatin: false,
    downloadUrl: 'http://culmus.sourceforge.net/',
    localFile: '/fonts/HadasimCLM-Regular.ttf',
    fontFamily: 'HadasimCLM-Local',
    previewText: 'אלגנטיות שקטה',
    description: 'פונט serif אלגנטי ועדין. מושלם לכותרות ותוכן ארוך.',
  },

  {
    id: 'keter-yg',
    name: 'כתר YG',
    nameEn: 'Keter YG',
    source: 'kolmus',
    category: 'serif',
    tags: ['מסורתי', 'דתי', 'ספרים', 'סת"ם'],
    weights: [400, 700],
    hasLatin: false,
    downloadUrl: 'http://culmus.sourceforge.net/',
    localFile: '/fonts/KeterYG-Medium.ttf',
    fontFamily: 'KeterYG-Local',
    previewText: 'כתיבה עם נשמה',
    description: 'פונט בהשראת כתב סת"ם. מושלם לתוכן מסורתי ודתי.',
  },

  // ═══════════════════════
  // AlefAlefAlef (אאא)
  // ═══════════════════════

  {
    id: 'gveret-levin',
    name: 'גברת לוין',
    nameEn: 'Gveret Levin',
    designer: 'AlefAlefAlef',
    source: 'aaa',
    category: 'handwritten',
    tags: ['כתב יד', 'נוסטלגי', 'חם', 'קלסי'],
    weights: [400],
    hasLatin: false,
    downloadUrl: 'https://alefalefalef.co.il/%D7%92%D7%91%D7%A8%D7%AA-%D7%9C%D7%95%D7%99%D7%9F-%D7%A4%D7%95%D7%A0%D7%98-%D7%9B%D7%AA%D7%91%D6%BE%D7%99%D7%93-%D7%97%D7%99%D7%A0%D7%9E%D7%99/',
    localFile: '/fonts/GveretLevin-Regular.woff2',
    fontFamily: 'GveretLevin-Local',
    previewText: 'נוסטלגיה ישראלית',
    description: 'פונט כתב יד נוסטלגי ואהוב. מאת AlefAlefAlef — קוד פתוח.',
  },

  {
    id: 'dana-yad',
    name: 'דנה יד',
    nameEn: 'Dana Yad',
    designer: 'AlefAlefAlef',
    source: 'aaa',
    category: 'handwritten',
    tags: ['כתב יד', 'עדין', 'נשי', 'אישי'],
    weights: [400],
    hasLatin: false,
    downloadUrl: 'https://alefalefalef.co.il/%D7%93%D7%A0%D7%94-%D7%99%D7%93-%D7%A4%D7%95%D7%A0%D7%98-%D7%97%D7%99%D7%A0%D7%9E%D7%99/',
    localFile: '/fonts/DanaYad-Normal.ttf',
    fontFamily: 'DanaYad-Local',
    previewText: 'כתב יד עדין ויפה',
    description: 'פונט כתב יד עדין של דנה נוף. עדינות ואישיות. מאת AlefAlefAlef.',
  },

];

export const CATEGORIES = [
  { id: 'all', label: 'הכל' },
  { id: 'sans', label: 'Sans-Serif' },
  { id: 'serif', label: 'Serif' },
  { id: 'display', label: 'Display' },
  { id: 'handwritten', label: 'כתב יד' },
] as const;

export const SOURCES = [
  { id: 'all', label: 'כל המקורות' },
  { id: 'google', label: 'Google Fonts' },
  { id: 'kolmus', label: 'פרויקט קולמוס' },
  { id: 'aaa', label: 'AlefAlefAlef' },
] as const;
