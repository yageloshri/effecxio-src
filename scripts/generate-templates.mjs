import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import a1 from './anims/batch1.mjs';
import a2 from './anims/batch2.mjs';
import a3 from './anims/batch3.mjs';
import a4 from './anims/batch4.mjs';
import a5 from './anims/batch5.mjs';

const ANIM = { ...a1, ...a2, ...a3, ...a4, ...a5 };
const ROOT = join(import.meta.dirname, '..', 'public', 'tpl');

// Palettes
const P = {
  saas:        { bg:'#0a0a0f', surface:'#111118', border:'#1e1e2e', accent:'#7c3aed', accent2:'#06b6d4', text:'#f0f0f0', muted:'#666', font:'Inter' },
  ai:          { bg:'#050510', surface:'#0d0d1a', border:'#1a1a2e', accent:'#8b5cf6', accent2:'#06d6a0', text:'#f0f0f0', muted:'#666', font:'Inter' },
  startup:     { bg:'#0a0a0a', surface:'#141414', border:'#222',    accent:'#facc15', accent2:'#7c3aed', text:'#fff',    muted:'#888', font:'Inter' },
  agency:      { bg:'#0a0a0a', surface:'#141414', border:'#222',    accent:'#ff3366', accent2:'#7c3aed', text:'#fff',    muted:'#888', font:'Syne' },
  portfolio:   { bg:'#0c0c0c', surface:'#141414', border:'#222',    accent:'#22c55e', accent2:'#8b5cf6', text:'#f0f0f0', muted:'#888', font:'Space Grotesk' },
  ecommerce:   { bg:'#fafafa', surface:'#ffffff', border:'#e5e5e5', accent:'#111111', accent2:'#7c3aed', text:'#111',    muted:'#666', font:'Poppins' },
  'mobile-app':{ bg:'#0a0a1a', surface:'#111128', border:'#1e1e3e', accent:'#4f46e5', accent2:'#8b5cf6', text:'#f0f0f0', muted:'#666', font:'Inter' },
  crypto:      { bg:'#0a0118', surface:'#110228', border:'#1e0e3e', accent:'#8b5cf6', accent2:'#f59e0b', text:'#f0f0f0', muted:'#666', font:'Inter' },
  restaurant:  { bg:'#1a0f0a', surface:'#241810', border:'#3d2c1e', accent:'#d4a574', accent2:'#ef4444', text:'#f5ebe0', muted:'#998', font:'Playfair Display' },
  'real-estate':{ bg:'#0a1628', surface:'#0f1d32', border:'#1a2d4e', accent:'#2563eb', accent2:'#10b981', text:'#e0e7ef', muted:'#8899aa', font:'Inter' },
  fitness:     { bg:'#0a0a0a', surface:'#141414', border:'#222',    accent:'#ef4444', accent2:'#f59e0b', text:'#fff',    muted:'#888', font:'Inter' },
  education:   { bg:'#f8faff', surface:'#ffffff', border:'#e0e7ff', accent:'#3b82f6', accent2:'#8b5cf6', text:'#111',    muted:'#666', font:'Inter' },
  event:       { bg:'#0a0a0f', surface:'#111118', border:'#1e1e2e', accent:'#7c3aed', accent2:'#06b6d4', text:'#f0f0f0', muted:'#666', font:'Inter' },
  blog:        { bg:'#fafafa', surface:'#ffffff', border:'#e5e5e5', accent:'#7c3aed', accent2:'#3b82f6', text:'#111',    muted:'#666', font:'Merriweather' },
  sections:    { bg:'#0a0a0f', surface:'#111118', border:'#1e1e2e', accent:'#c8f53b', accent2:'#8b5cf6', text:'#f0f0f0', muted:'#666', font:'Inter' },
};

const OV = {
  'saas-light': { bg:'#fafafa', surface:'#fff', border:'#e5e5e5', text:'#111', muted:'#666' },
  'saas-gradient': { accent:'#ec4899', accent2:'#8b5cf6' },
  'saas-security': { accent:'#00ff88', bg:'#050510' },
  'saas-crm': { accent:'#3b82f6' },
  'saas-finance': { accent:'#10b981', accent2:'#6366f1' },
  'saas-hr': { accent:'#8b5cf6', accent2:'#ec4899' },
  'ai-image': { accent:'#ec4899' },
  'ai-video': { accent:'#f97316' },
  'ai-code': { bg:'#0a0a0a', accent:'#22c55e' },
  'ai-data': { accent:'#3b82f6' },
  'startup-waitlist': { accent:'#c8f53b' },
  'startup-product-hunt': { bg:'#fafafa', surface:'#fff', border:'#e5e5e5', accent:'#ff6154', text:'#111' },
  'startup-b2b': { bg:'#0a1628', surface:'#0f1d32', accent:'#2563eb' },
  'startup-community': { accent:'#ec4899', accent2:'#8b5cf6' },
  'startup-mobile': { bg:'#0a0a1a', accent:'#4f46e5' },
  'startup-open-source': { accent:'#22c55e' },
  'agency-digital': { accent:'#7c3aed', accent2:'#06b6d4' },
  'agency-motion': { accent:'#f97316' },
  'agency-branding': { accent:'#e2e8f0' },
  'agency-seo': { accent:'#22c55e' },
  'agency-web': { accent:'#3b82f6' },
  'agency-ai': { bg:'#050510', accent:'#8b5cf6', accent2:'#06d6a0' },
  'portfolio-designer': { accent:'#ec4899' },
  'portfolio-photographer': { accent:'#f5f5f5' },
  'portfolio-freelancer': { bg:'#fafafa', surface:'#fff', border:'#e5e5e5', accent:'#7c3aed', text:'#111' },
  'portfolio-motion': { accent:'#f97316' },
  'portfolio-consultant': { bg:'#0a1628', accent:'#2563eb' },
  'portfolio-3d': { bg:'#050510', accent:'#8b5cf6', accent2:'#06d6a0' },
  'ecommerce-digital': { bg:'#0a0a0f', surface:'#111118', border:'#1e1e2e', accent:'#8b5cf6', text:'#f0f0f0' },
  'ecommerce-food': { bg:'#faf8f5', accent:'#ef4444', accent2:'#f97316' },
  'ecommerce-beauty': { bg:'#faf5f0', accent:'#d4a574', accent2:'#ec4899', font:'Playfair Display' },
  'ecommerce-subscription': { bg:'#0a0a0f', surface:'#111118', border:'#1e1e2e', accent:'#f59e0b', text:'#f0f0f0' },
  'ecommerce-course': { bg:'#fafafa', accent:'#7c3aed' },
  'ecommerce-saas-trial': { bg:'#0a0a0f', surface:'#111118', border:'#1e1e2e', accent:'#3b82f6', text:'#f0f0f0' },
  'app-android': { accent:'#34a853' },
  'app-game': { bg:'#0a0118', accent:'#f59e0b', accent2:'#ef4444' },
  'app-fitness': { bg:'#0a0a0a', accent:'#ef4444' },
  'app-finance': { bg:'#0a1628', accent:'#10b981', accent2:'#3b82f6' },
  'crypto-nft': { accent2:'#ec4899' },
  'crypto-defi': { accent:'#06d6a0' },
  'crypto-exchange': { accent:'#f59e0b', accent2:'#22c55e' },
  'crypto-token': { accent:'#f59e0b' },
  'restaurant-fast': { bg:'#faf8f5', accent:'#ef4444', accent2:'#f59e0b', text:'#111', muted:'#666' },
  'restaurant-cafe': { bg:'#faf8f5', accent:'#8b6f47', text:'#3d2c1e', muted:'#886' },
  'restaurant-vegan': { bg:'#f0f9f4', accent:'#16a34a', text:'#1a3a2a' },
  'restaurant-bakery': { bg:'#fdf6f0', accent:'#d97706', text:'#3d2610' },
  'realestate-luxury': { bg:'#0a0a0a', accent:'#d4a574', text:'#f5f5f5' },
  'realestate-rental': { bg:'#fafafa', surface:'#fff', border:'#e5e5e5', accent:'#ef4444', text:'#111' },
  'realestate-invest': { accent:'#10b981', accent2:'#2563eb' },
  'realestate-newdev': { bg:'#fafafa', surface:'#fff', border:'#e5e5e5', text:'#111' },
  'fitness-yoga': { bg:'#faf8f5', accent:'#8b5cf6', text:'#2d1f4e' },
  'fitness-nutrition': { bg:'#f0f9f4', accent:'#16a34a', text:'#1a3a2a' },
  'edu-bootcamp': { bg:'#0a0a0a', surface:'#141414', border:'#222', accent:'#22c55e', text:'#fff' },
  'edu-kids': { bg:'#fffbeb', accent:'#f59e0b', accent2:'#8b5cf6', text:'#111' },
  'event-wedding': { bg:'#fdf6f0', accent:'#d4a574', text:'#3d2c1e', font:'Playfair Display' },
  'event-music': { bg:'#0a0118', accent:'#f59e0b', accent2:'#ec4899' },
  'event-hackathon': { bg:'#0a0a0a', accent:'#22c55e', text:'#fff' },
  'blog-personal': { font:'Merriweather' },
  'blog-newsletter': { accent:'#f59e0b' },
};

function pal(id, cat) { return { ...P[cat], ...(OV[id] || {}) }; }

function isDark(bg) {
  const h = bg.replace('#','');
  const r = parseInt(h.substring(0,2),16), g = parseInt(h.substring(2,4),16), b = parseInt(h.substring(4,6),16);
  return (r*0.299 + g*0.587 + b*0.114) < 128;
}

function rgba(hex, a) {
  const h = hex.replace('#','');
  return `rgba(${parseInt(h.substring(0,2),16)},${parseInt(h.substring(2,4),16)},${parseInt(h.substring(4,6),16)},${a})`;
}

// ========== HTML SECTION GENERATORS ==========

function navbarHTML(p, title) {
  return `<nav class="navbar"><div class="nav-inner">
    <a href="#" class="logo">${title}</a>
    <div class="nav-links"><a href="#features">תכונות</a><a href="#pricing">תמחור</a><a href="#contact">צור קשר</a><a href="#" class="nav-cta">התחל עכשיו</a></div>
    <button class="hamburger" onclick="this.classList.toggle('active');document.querySelector('.nav-links').classList.toggle('open')"><span></span><span></span><span></span></button>
  </div></nav>`;
}

function heroHTML(p, title, subtitle, variant) {
  const badges = { default:'✦ הפתרון המושלם', ai:'🤖 מונע בינה מלאכותית', startup:'🚀 הדבר הגדול הבא', crypto:'⛓ Web3 מוכן', fitness:'💪 שנה את עצמך', restaurant:'🍽 טעם של מצוינות', education:'📚 למד בקצב שלך', event:'🎉 אל תפספס', blog:'✍ תוכן שמעניין', sections:'⚡ קומפוננטה מוכנה' };
  return `<section class="hero" id="hero"><div class="container">
    <div class="badge reveal">${badges[variant]||badges.default}</div>
    <h1 class="reveal">${title}</h1>
    <p class="hero-sub reveal">${subtitle}</p>
    <div class="hero-buttons reveal"><a href="#" class="btn btn-primary">התחל בחינם</a><a href="#" class="btn btn-secondary">למד עוד</a></div>
  </div></section>`;
}

function featuresHTML(p, features) {
  const icons = ['⚡','🎯','🔒','📊','🚀','💡','🔧','🎨','📱','🌐'];
  const cards = features.map((f, i) => `<div class="feature-card reveal"${i<2?' style="grid-column:span 2"':''}><div class="feature-icon">${icons[i%icons.length]}</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join('');
  return `<section class="features" id="features"><div class="container">
    <h2 class="section-title reveal">למה לבחור בנו?</h2><p class="section-sub reveal">הכלים שיעזרו לך לצמוח</p>
    <div class="features-grid">${cards}</div></div></section>`;
}

function pricingHTML(p) {
  const d = isDark(p.bg);
  const plans = [
    { n:'בסיסי', pr:'49', f:['עד 5 משתמשים','10GB אחסון','תמיכה באימייל','גישה בסיסית'] },
    { n:'מקצועי', pr:'99', pop:true, f:['עד 25 משתמשים','100GB אחסון','תמיכה 24/7','כל התכונות','API גישה'] },
    { n:'עסקי', pr:'199', f:['ללא הגבלה','ללא הגבלת אחסון','מנהל חשבון','SLA מותאם','אינטגרציות'] },
  ];
  return `<section class="pricing" id="pricing"><div class="container">
    <h2 class="section-title reveal">תוכניות ומחירים</h2><p class="section-sub reveal">בחר את התוכנית המתאימה לך</p>
    <div class="pricing-grid">${plans.map(pl=>`<div class="pricing-card${pl.pop?' popular':''} reveal">${pl.pop?'<div class="popular-badge">הכי פופולרי</div>':''}<h3>${pl.n}</h3><div class="price">₪${pl.pr}<span>/חודש</span></div><ul>${pl.f.map(f=>`<li>✓ ${f}</li>`).join('')}</ul><a href="#" class="btn btn-primary">בחר תוכנית</a></div>`).join('')}</div></div></section>`;
}

function testimonialsHTML(p) {
  const items = [
    { n:'שרה כהן', r:'מנכ"לית, TechFlow', t:'המוצר שינה לנו את הדרך שבה אנחנו עובדים. פשוט מדהים!' },
    { n:'דוד לוי', r:'מפתח בכיר', t:'הכלי הכי טוב שהשתמשתי בו. חוסך לי שעות של עבודה כל יום.' },
    { n:'מיכל אברהם', r:'מעצבת UX', t:'ממשק נהדר וחוויית משתמש מעולה. ממליצה בחום!' },
  ];
  return `<section class="testimonials" id="testimonials"><div class="container">
    <h2 class="section-title reveal">מה הלקוחות אומרים</h2>
    <div class="testimonials-grid">${items.map(t=>`<div class="testimonial-card reveal"><div class="stars">★★★★★</div><p>"${t.t}"</p><div class="testimonial-author"><div class="avatar">${t.n[0]}</div><div><strong>${t.n}</strong><br><span>${t.r}</span></div></div></div>`).join('')}</div></div></section>`;
}

function faqHTML() {
  const items = [
    { q:'איך מתחילים?', a:'פשוט נרשמים בחינם ומתחילים תוך דקות. לא צריך כרטיס אשראי.' },
    { q:'האם יש תקופת ניסיון?', a:'כן! 14 יום ניסיון חינם לכל התוכניות, ללא התחייבות.' },
    { q:'אפשר לבטל בכל עת?', a:'בהחלט. ביטול בלחיצת כפתור, ללא שאלות.' },
    { q:'האם יש תמיכה בעברית?', a:'כמובן! כל המערכת בעברית מלאה כולל תמיכה.' },
    { q:'מה קורה עם הנתונים שלי?', a:'הנתונים שלך מוצפנים ומאובטחים בסטנדרטים הגבוהים ביותר.' },
  ];
  return `<section class="faq" id="faq"><div class="container"><h2 class="section-title reveal">שאלות נפוצות</h2>
    <div class="faq-list">${items.map(i=>`<div class="faq-item reveal"><button class="faq-q" onclick="this.parentElement.classList.toggle('open')"><span>${i.q}</span><span class="faq-icon">+</span></button><div class="faq-a"><p>${i.a}</p></div></div>`).join('')}</div></div></section>`;
}

function ctaHTML() {
  return `<section class="cta-section" id="cta"><div class="container"><h2 class="reveal">מוכנים להתחיל?</h2><p class="reveal">הצטרפו לאלפי לקוחות מרוצים עוד היום</p><div class="cta-buttons reveal"><a href="#" class="btn btn-primary btn-lg">התחל בחינם</a></div></div></section>`;
}

function footerHTML(p, title) {
  return `<footer><div class="container"><div class="footer-grid">
    <div><div class="footer-logo">${title}</div><p>הפתרון המושלם לצמיחה דיגיטלית</p></div>
    <div><h4>מוצר</h4><a href="#">תכונות</a><a href="#">תמחור</a><a href="#">אינטגרציות</a></div>
    <div><h4>חברה</h4><a href="#">אודות</a><a href="#">בלוג</a><a href="#">קריירה</a></div>
    <div><h4>תמיכה</h4><a href="#">מרכז עזרה</a><a href="#">צור קשר</a><a href="#">מדיניות פרטיות</a></div>
  </div><div class="footer-bottom">© 2024 ${title}. כל הזכויות שמורות.</div></div></footer>`;
}

function logosHTML() {
  const logos = ['TechCorp','DataFlow','CloudAI','BuildX','ScaleUp','DevPro'];
  return `<section class="logos"><div class="container"><p class="logos-label reveal">נבחרו על ידי חברות מובילות</p>
    <div class="logos-track"><div class="logos-slide">${logos.concat(logos).map(l=>`<span class="logo-item">${l}</span>`).join('')}</div></div></div></section>`;
}

function statsHTML() {
  const s = [{n:'10K+',l:'לקוחות פעילים'},{n:'50M+',l:'פעולות בחודש'},{n:'99.9%',l:'זמן פעילות'},{n:'4.9',l:'דירוג ממוצע'}];
  return `<section class="stats"><div class="container"><div class="stats-grid">${s.map(x=>`<div class="stat-item reveal"><div class="stat-num">${x.n}</div><div class="stat-label">${x.l}</div></div>`).join('')}</div></div></section>`;
}

function contactHTML() {
  return `<section class="contact" id="contact"><div class="container"><h2 class="section-title reveal">צור קשר</h2>
    <div class="contact-grid"><form class="contact-form reveal" onsubmit="event.preventDefault()"><input type="text" placeholder="שם מלא" required><input type="email" placeholder="אימייל" required><textarea placeholder="הודעה" rows="4" required></textarea><button type="submit" class="btn btn-primary">שלח הודעה</button></form>
    <div class="contact-info reveal"><div class="info-item">📧 hello@example.com</div><div class="info-item">📱 050-1234567</div><div class="info-item">📍 תל אביב, ישראל</div></div></div></div></section>`;
}

// ========== CATEGORY CONTENT ==========
const CC = {
  saas: () => ({ title:'הפלטפורמה שתשנה את העסק שלך', sub:'כלי ניהול חכם שעוזר לצוותים לעבוד יותר טוב, יותר מהר, ויותר חכם.', hv:'default', features:[{title:'אוטומציה חכמה',desc:'חסוך שעות עבודה עם תהליכים אוטומטיים מבוססי AI'},{title:'דשבורד בזמן אמת',desc:'עקוב אחר כל המדדים החשובים במקום אחד'},{title:'אבטחה מתקדמת',desc:'הצפנה מקצה לקצה ועמידה בתקני SOC2'},{title:'אינטגרציות',desc:'חיבור ליותר מ-100 כלים פופולריים'},{title:'API פתוח',desc:'בנה הרחבות מותאמות אישית בקלות'}] }),
  ai: () => ({ title:'בינה מלאכותית שעובדת בשבילך', sub:'טכנולוגיית AI מתקדמת שמבינה מה אתה צריך ומספקת תוצאות מדהימות.', hv:'ai', features:[{title:'עיבוד שפה טבעית',desc:'הבנת טקסט בעברית ו-30 שפות נוספות'},{title:'למידה מתמדת',desc:'המודל משתפר עם כל אינטראקציה'},{title:'מהירות בזק',desc:'תשובות תוך אלפיות שנייה'},{title:'פרטיות מובנית',desc:'הנתונים שלך לעולם לא משותפים'},{title:'API גמיש',desc:'שלב AI בכל מערכת קיימת'}] }),
  startup: () => ({ title:'הרעיון שישנה את הכללים', sub:'אנחנו בונים את העתיד של הטכנולוגיה, צעד אחד בכל פעם.', hv:'startup', features:[{title:'חדשנות',desc:'גישה חדשנית לפתרון בעיות ישנות'},{title:'קנה מידה',desc:'תשתית שצומחת איתך מ-10 ל-10 מיליון'},{title:'מהירות',desc:'מיום ראשון עד השקה תוך שבועות'},{title:'קהילה',desc:'הצטרף לקהילה של אלפי יזמים'}] }),
  agency: () => ({ title:'אנחנו יוצרים חוויות דיגיטליות', sub:'סוכנות קריאטיב שמביאה תוצאות. עיצוב, פיתוח, שיווק.', hv:'default', features:[{title:'אסטרטגיה',desc:'תכנון מדויק לפני כל פרויקט'},{title:'עיצוב',desc:'עיצוב שמושך את העין ומניע לפעולה'},{title:'פיתוח',desc:'קוד נקי ותחזוקתי בטכנולוגיות מתקדמות'},{title:'שיווק',desc:'קמפיינים שמביאים ROI אמיתי'}] }),
  portfolio: () => ({ title:'שלום, אני יוצר דיגיטלי', sub:'מעצב ומפתח עם תשוקה ליצירת חוויות דיגיטליות יוצאות דופן.', hv:'default', features:[{title:'עיצוב UI/UX',desc:'ממשקים אינטואיטיביים ויפהפיים'},{title:'פיתוח Full-Stack',desc:'מ-Frontend ל-Backend, הכל'},{title:'מיתוג',desc:'זהות ויזואלית שמספרת סיפור'},{title:'אנימציה',desc:'מושן דיזיין שמחיה את העיצוב'}] }),
  ecommerce: () => ({ title:'קניות בסטייל', sub:'המוצרים הכי חמים עם משלוח מהיר עד הבית.', hv:'default', features:[{title:'משלוח חינם',desc:'על כל הזמנה מעל ₪200'},{title:'החזרות חינם',desc:'30 יום להחזרה ללא שאלות'},{title:'תשלום מאובטח',desc:'כל אמצעי התשלום המובילים'},{title:'שירות VIP',desc:'תמיכה אישית ללקוחות נאמנים'}] }),
  'mobile-app': () => ({ title:'האפליקציה שחיכית לה', sub:'חוויה מושלמת בכף היד. הורד עכשיו ותתחיל.', hv:'default', features:[{title:'עיצוב אינטואיטיבי',desc:'ממשק פשוט שכל אחד יכול להשתמש'},{title:'מצב אופליין',desc:'עובד גם בלי אינטרנט'},{title:'סנכרון ענן',desc:'כל המידע מסונכרן בכל המכשירים'},{title:'התראות חכמות',desc:'רק מה שרלוונטי אליך'}] }),
  crypto: () => ({ title:'העתיד של הפיננסים כאן', sub:'פלטפורמה מבוזרת, מאובטחת, ונגישה לכולם.', hv:'crypto', features:[{title:'מאובטח',desc:'הצפנה צבאית ואימות דו-שלבי'},{title:'מבוזר',desc:'אין גוף מרכזי, אתה השולט'},{title:'מהיר',desc:'עסקאות תוך שניות ברחבי העולם'},{title:'שקוף',desc:'כל פעולה מתועדת ב-Blockchain'}] }),
  restaurant: () => ({ title:'טעם של מצוינות', sub:'חוויה קולינרית שתזכרו. מרכיבים טריים, אהבה בכל מנה.', hv:'restaurant', features:[{title:'מרכיבים טריים',desc:'ירקות מהחווה ישירות למטבח'},{title:'שף מוביל',desc:'שנים של ניסיון בינלאומי'},{title:'אווירה מיוחדת',desc:'עיצוב פנים ייחודי ומזמין'},{title:'שירות אישי',desc:'צוות מסור שדואג לכל פרט'}] }),
  'real-estate': () => ({ title:'מצא את הבית המושלם', sub:'אלפי נכסים, כלי חיפוש חכם, ליווי מקצועי לאורך כל הדרך.', hv:'default', features:[{title:'חיפוש חכם',desc:'סנן לפי מיקום, מחיר, וגודל'},{title:'סיורים וירטואליים',desc:'צפה בנכס מכל מקום'},{title:'ליווי מקצועי',desc:'סוכנים מנוסים שמלווים אותך'},{title:'מימון',desc:'עזרה במשכנתא ובמימון'}] }),
  fitness: () => ({ title:'שנה את עצמך עוד היום', sub:'אימונים מותאמים אישית, תזונה חכמה, ותוצאות אמיתיות.', hv:'fitness', features:[{title:'תוכניות אימון',desc:'מותאם לרמה ולמטרות שלך'},{title:'תזונה מותאמת',desc:'תפריטים אישיים מדיאטנית'},{title:'מעקב התקדמות',desc:'גרפים ונתונים בזמן אמת'},{title:'קהילה תומכת',desc:'אלפי מתאמנים שתומכים אחד בשני'}] }),
  education: () => ({ title:'למד כל דבר, מכל מקום', sub:'פלטפורמת לימודים מתקדמת עם קורסים מהמרצים הטובים ביותר.', hv:'education', features:[{title:'קורסים מגוונים',desc:'מאות קורסים בכל נושא'},{title:'מרצים מובילים',desc:'למד מהמומחים הכי טובים'},{title:'תעודות',desc:'קבל הכרה על ההישגים שלך'},{title:'למידה גמישה',desc:'בקצב שלך, מכל מכשיר'}] }),
  event: () => ({ title:'האירוע שכולם מדברים עליו', sub:'חוויה בלתי נשכחת מחכה לך. שריינו כרטיסים עכשיו.', hv:'event', features:[{title:'מיקום מושלם',desc:'אולם ייחודי עם נוף מרהיב'},{title:'ספיקרים מובילים',desc:'מיטב המומחים בתחום'},{title:'נטוורקינג',desc:'הזדמנות להכיר אנשים מעניינים'},{title:'כיבוד מלא',desc:'קייטרינג איכותי לאורך כל האירוע'}] }),
  blog: () => ({ title:'מילים שמשנות חשיבה', sub:'בלוג עם תוכן מעמיק, תובנות מקוריות, ורעיונות שמעוררים השראה.', hv:'blog', features:[{title:'תוכן מעמיק',desc:'מאמרים מחקריים ומעמיקים'},{title:'טור שבועי',desc:'תוכן חדש כל שבוע'},{title:'קהילת קוראים',desc:'דיונים ותגובות מעניינים'},{title:'ניוזלטר',desc:'קבל את הפוסטים ישירות למייל'}] }),
  sections: () => ({ title:'קומפוננטה מוכנה לשימוש', sub:'סקשן מקצועי שאפשר לשלב בכל פרויקט. העתק, התאם, שגר.', hv:'sections', features:[{title:'גמיש',desc:'מתאים לכל פרויקט ועיצוב'},{title:'רספונסיבי',desc:'נראה מעולה בכל גודל מסך'},{title:'מונפש',desc:'אנימציות חלקות ומרשימות'},{title:'נגיש',desc:'עומד בתקני נגישות'}] }),
};

// ========== TEMPLATE CONFIGS ==========
const CONFIGS = [
  { id:'saas-dark', title:'SaaS כהה מודרני', cat:'saas' },
  { id:'saas-light', title:'SaaS בהיר נקי', cat:'saas' },
  { id:'saas-gradient', title:'SaaS גרדיאנט צבעוני', cat:'saas' },
  { id:'saas-minimal', title:'SaaS מינימליסטי', cat:'saas' },
  { id:'saas-dashboard', title:'SaaS עם Dashboard', cat:'saas' },
  { id:'saas-glassmorphism', title:'SaaS זכוכית', cat:'saas' },
  { id:'saas-analytics', title:'SaaS אנליטיקס', cat:'saas' },
  { id:'saas-security', title:'SaaS אבטחה', cat:'saas' },
  { id:'saas-productivity', title:'SaaS פרודקטיביטי', cat:'saas' },
  { id:'saas-crm', title:'SaaS CRM', cat:'saas' },
  { id:'saas-finance', title:'SaaS פיננסי', cat:'saas' },
  { id:'saas-hr', title:'SaaS HR / גיוס', cat:'saas' },
  { id:'ai-chatbot', title:'AI צ׳אטבוט', cat:'ai' },
  { id:'ai-agent', title:'AI Agent סטארטאפ', cat:'ai' },
  { id:'ai-image', title:'AI יצירת תמונות', cat:'ai' },
  { id:'ai-writing', title:'AI כתיבה', cat:'ai' },
  { id:'ai-voice', title:'AI קול', cat:'ai' },
  { id:'ai-video', title:'AI וידאו', cat:'ai' },
  { id:'ai-code', title:'AI כלי קוד', cat:'ai' },
  { id:'ai-data', title:'AI אנליזת דאטה', cat:'ai' },
  { id:'ai-minimal', title:'AI מינימליסטי', cat:'ai' },
  { id:'ai-search', title:'AI חיפוש', cat:'ai' },
  { id:'startup-bold', title:'סטארטאפ בולד', cat:'startup' },
  { id:'startup-waitlist', title:'סטארטאפ Waitlist', cat:'startup' },
  { id:'startup-product-hunt', title:'Product Hunt Launch', cat:'startup' },
  { id:'startup-mvp', title:'MVP מהיר', cat:'startup' },
  { id:'startup-b2b', title:'B2B Enterprise', cat:'startup' },
  { id:'startup-community', title:'קהילה / Community', cat:'startup' },
  { id:'startup-mobile', title:'Mobile App Startup', cat:'startup' },
  { id:'startup-open-source', title:'Open Source Tool', cat:'startup' },
  { id:'agency-creative', title:'סוכנות קריאטיב', cat:'agency' },
  { id:'agency-digital', title:'סוכנות דיגיטל', cat:'agency' },
  { id:'agency-motion', title:'סוכנות Motion', cat:'agency' },
  { id:'agency-branding', title:'סוכנות מיתוג', cat:'agency' },
  { id:'agency-seo', title:'סוכנות SEO', cat:'agency' },
  { id:'agency-social', title:'סוכנות סושיאל', cat:'agency' },
  { id:'agency-web', title:'סוכנות פיתוח אתרים', cat:'agency' },
  { id:'agency-ai', title:'סוכנות AI אוטומציה', cat:'agency' },
  { id:'portfolio-developer', title:'פורטפוליו מפתח', cat:'portfolio' },
  { id:'portfolio-designer', title:'פורטפוליו מעצב', cat:'portfolio' },
  { id:'portfolio-photographer', title:'פורטפוליו צלם', cat:'portfolio' },
  { id:'portfolio-freelancer', title:'פורטפוליו פרילנסר', cat:'portfolio' },
  { id:'portfolio-minimal', title:'פורטפוליו מינימליסטי', cat:'portfolio' },
  { id:'portfolio-motion', title:'פורטפוליו אנימטור', cat:'portfolio' },
  { id:'portfolio-consultant', title:'פורטפוליו יועץ', cat:'portfolio' },
  { id:'portfolio-3d', title:'פורטפוליו 3D', cat:'portfolio' },
  { id:'ecommerce-fashion', title:'חנות אופנה', cat:'ecommerce' },
  { id:'ecommerce-product', title:'עמוד מוצר יחיד', cat:'ecommerce' },
  { id:'ecommerce-digital', title:'חנות דיגיטלית', cat:'ecommerce' },
  { id:'ecommerce-food', title:'חנות אוכל', cat:'ecommerce' },
  { id:'ecommerce-beauty', title:'חנות יופי', cat:'ecommerce' },
  { id:'ecommerce-subscription', title:'Box Subscription', cat:'ecommerce' },
  { id:'ecommerce-course', title:'קורס דיגיטלי', cat:'ecommerce' },
  { id:'ecommerce-saas-trial', title:'Free Trial Funnel', cat:'ecommerce' },
  { id:'app-ios', title:'אפליקציה iOS', cat:'mobile-app' },
  { id:'app-android', title:'אפליקציה Android', cat:'mobile-app' },
  { id:'app-game', title:'אפליקציית משחק', cat:'mobile-app' },
  { id:'app-fitness', title:'אפליקציית כושר', cat:'mobile-app' },
  { id:'app-finance', title:'אפליקציית פיננסים', cat:'mobile-app' },
  { id:'app-social', title:'אפליקציה חברתית', cat:'mobile-app' },
  { id:'crypto-nft', title:'NFT Collection', cat:'crypto' },
  { id:'crypto-defi', title:'DeFi Protocol', cat:'crypto' },
  { id:'crypto-exchange', title:'Exchange ארנק', cat:'crypto' },
  { id:'crypto-token', title:'Token Launch', cat:'crypto' },
  { id:'crypto-dao', title:'DAO Governance', cat:'crypto' },
  { id:'crypto-minimal', title:'Web3 מינימליסטי', cat:'crypto' },
  { id:'restaurant-luxury', title:'מסעדת יוקרה', cat:'restaurant' },
  { id:'restaurant-fast', title:'מסעדה מהירה', cat:'restaurant' },
  { id:'restaurant-cafe', title:'בית קפה', cat:'restaurant' },
  { id:'restaurant-vegan', title:'מסעדה טבעונית', cat:'restaurant' },
  { id:'restaurant-bakery', title:'מאפייה', cat:'restaurant' },
  { id:'realestate-agency', title:'סוכנות נדלן', cat:'real-estate' },
  { id:'realestate-luxury', title:'נכס יוקרה', cat:'real-estate' },
  { id:'realestate-rental', title:'השכרת נכסים', cat:'real-estate' },
  { id:'realestate-invest', title:'השקעות נדלן', cat:'real-estate' },
  { id:'realestate-newdev', title:'פרויקט בנייה חדש', cat:'real-estate' },
  { id:'fitness-gym', title:'חדר כושר', cat:'fitness' },
  { id:'fitness-coach', title:'מאמן אישי', cat:'fitness' },
  { id:'fitness-yoga', title:'יוגה / מדיטציה', cat:'fitness' },
  { id:'fitness-nutrition', title:'תזונה / דיאטה', cat:'fitness' },
  { id:'edu-online-course', title:'פלטפורמת קורסים', cat:'education' },
  { id:'edu-bootcamp', title:'Bootcamp', cat:'education' },
  { id:'edu-kids', title:'חינוך ילדים', cat:'education' },
  { id:'edu-tutor', title:'מורה פרטי', cat:'education' },
  { id:'event-conference', title:'כנס / Conference', cat:'event' },
  { id:'event-wedding', title:'חתונה / אירוע', cat:'event' },
  { id:'event-music', title:'הופעה / Festival', cat:'event' },
  { id:'event-hackathon', title:'האקתון', cat:'event' },
  { id:'blog-tech', title:'בלוג טכנולוגיה', cat:'blog' },
  { id:'blog-personal', title:'בלוג אישי', cat:'blog' },
  { id:'blog-newsletter', title:'Newsletter', cat:'blog' },
  { id:'section-hero-animated', title:'Hero מונפש', cat:'sections' },
  { id:'section-pricing', title:'Pricing עם Toggle', cat:'sections' },
  { id:'section-testimonials', title:'Testimonials Slider', cat:'sections' },
  { id:'section-features-bento', title:'Features Bento Grid', cat:'sections' },
  { id:'section-cta', title:'CTA מנצח', cat:'sections' },
  { id:'section-faq', title:'FAQ אינטרקטיבי', cat:'sections' },
  { id:'section-logo-marquee', title:'Logo Marquee', cat:'sections' },
  { id:'section-stats', title:'Stats Counter', cat:'sections' },
  { id:'section-navbar', title:'Navbar מתקדם', cat:'sections' },
  { id:'section-footer', title:'Footer מלא', cat:'sections' },
  { id:'section-how-it-works', title:'How It Works', cat:'sections' },
  { id:'section-contact', title:'Contact Form', cat:'sections' },
];

// ========== CSS GENERATOR ==========
function generateCSS(p) {
  const d = isDark(p.bg);
  return `
    *{margin:0;padding:0;box-sizing:border-box;}
    :root{--bg:${p.bg};--surface:${p.surface};--border:${p.border};--accent:${p.accent};--accent2:${p.accent2};--text:${p.text};--muted:${p.muted};}
    body{font-family:'${p.font}',sans-serif;background:var(--bg);color:var(--text);direction:rtl;line-height:1.6;overflow-x:hidden;}
    .container{max-width:1100px;margin:0 auto;padding:0 24px;}
    a{color:var(--accent);text-decoration:none;}

    .navbar{position:fixed;top:0;left:0;right:0;z-index:100;backdrop-filter:blur(20px);background:${rgba(p.bg,0.85)};border-bottom:1px solid var(--border);}
    .nav-inner{max-width:1100px;margin:0 auto;padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;}
    .logo{font-weight:700;font-size:20px;color:var(--text);text-decoration:none;}
    .nav-links{display:flex;align-items:center;gap:24px;}
    .nav-links a{color:var(--muted);font-size:14px;transition:color .2s;text-decoration:none;}
    .nav-links a:hover{color:var(--text);}
    .nav-cta{background:var(--accent)!important;color:${d?'#000':'#fff'}!important;padding:8px 20px;border-radius:8px;font-weight:600;font-size:14px!important;transition:all .2s;}
    .nav-cta:hover{opacity:0.9;transform:translateY(-1px);}
    .hamburger{display:none;background:none;border:none;cursor:pointer;padding:4px;}
    .hamburger span{display:block;width:24px;height:2px;background:var(--text);margin:5px 0;transition:all .3s;}

    .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;padding:120px 24px 80px;overflow:hidden;}
    .hero h1{font-size:clamp(32px,6vw,64px);font-weight:800;line-height:1.1;margin:16px 0;letter-spacing:-1px;}
    .hero-sub{font-size:clamp(16px,2vw,20px);color:var(--muted);max-width:600px;margin:0 auto 32px;}
    .badge{display:inline-block;background:${rgba(p.accent,0.12)};color:var(--accent);padding:6px 16px;border-radius:100px;font-size:13px;font-weight:500;border:1px solid ${rgba(p.accent,0.2)};}
    .hero-buttons{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}

    .btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 28px;border-radius:10px;font-weight:600;font-size:15px;transition:all .25s;cursor:pointer;border:none;text-decoration:none;}
    .btn-primary{background:var(--accent);color:${d?'#000':'#fff'};}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px ${rgba(p.accent,0.35)};}
    .btn-secondary{background:var(--surface);color:var(--text);border:1px solid var(--border);}
    .btn-secondary:hover{border-color:var(--accent);}
    .btn-lg{padding:16px 36px;font-size:17px;}

    section{padding:80px 0;}
    .section-title{font-size:clamp(28px,4vw,42px);font-weight:700;text-align:center;margin-bottom:12px;}
    .section-sub{text-align:center;color:var(--muted);font-size:17px;margin-bottom:48px;}

    .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
    .feature-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .3s;}
    .feature-card:hover{transform:translateY(-4px);border-color:var(--accent);box-shadow:0 8px 30px ${rgba(p.accent,0.1)};}
    .feature-icon{font-size:28px;margin-bottom:12px;}
    .feature-card h3{font-size:18px;margin-bottom:8px;}
    .feature-card p{color:var(--muted);font-size:14px;line-height:1.6;}

    .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;margin:0 auto;}
    .pricing-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:32px;text-align:center;transition:all .3s;position:relative;}
    .pricing-card:hover{transform:translateY(-4px);}
    .pricing-card.popular{border-color:var(--accent);transform:scale(1.05);}
    .pricing-card.popular:hover{transform:scale(1.05) translateY(-4px);}
    .popular-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--accent);color:${d?'#000':'#fff'};padding:4px 16px;border-radius:100px;font-size:12px;font-weight:600;}
    .price{font-size:42px;font-weight:800;margin:16px 0;}
    .price span{font-size:16px;color:var(--muted);font-weight:400;}
    .pricing-card h3{font-size:20px;}
    .pricing-card ul{list-style:none;margin:20px 0;text-align:right;}
    .pricing-card li{padding:8px 0;color:var(--muted);font-size:14px;border-bottom:1px solid var(--border);}
    .pricing-card .btn{width:100%;margin-top:12px;}

    .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
    .testimonial-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:28px;}
    .stars{color:#f59e0b;font-size:16px;margin-bottom:12px;}
    .testimonial-card p{font-size:15px;line-height:1.7;margin-bottom:16px;font-style:italic;}
    .testimonial-author{display:flex;align-items:center;gap:12px;}
    .avatar{width:40px;height:40px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;color:${d?'#000':'#fff'};font-weight:700;font-size:16px;}
    .testimonial-author span{color:var(--muted);font-size:13px;}

    .faq-list{max-width:700px;margin:0 auto;}
    .faq-item{border-bottom:1px solid var(--border);}
    .faq-q{width:100%;background:none;border:none;color:var(--text);padding:20px 0;font-size:16px;font-weight:600;cursor:pointer;display:flex;justify-content:space-between;align-items:center;text-align:right;font-family:inherit;}
    .faq-icon{font-size:20px;transition:transform .3s;color:var(--accent);}
    .faq-item.open .faq-icon{transform:rotate(45deg);}
    .faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease;}
    .faq-item.open .faq-a{max-height:200px;}
    .faq-a p{padding:0 0 20px;color:var(--muted);font-size:15px;line-height:1.7;}

    .cta-section{text-align:center;padding:100px 24px;background:linear-gradient(135deg,${rgba(p.accent,0.08)},${rgba(p.accent2,0.08)});border-radius:24px;margin:40px auto;max-width:1100px;}
    .cta-section h2{font-size:clamp(28px,5vw,48px);font-weight:800;margin-bottom:16px;}
    .cta-section p{color:var(--muted);font-size:18px;margin-bottom:32px;}

    footer{border-top:1px solid var(--border);padding:60px 0 30px;}
    .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px;}
    .footer-logo{font-weight:700;font-size:20px;margin-bottom:8px;}
    footer h4{font-size:14px;text-transform:uppercase;color:var(--muted);margin-bottom:16px;letter-spacing:1px;}
    footer a{display:block;color:var(--muted);font-size:14px;margin-bottom:8px;text-decoration:none;transition:color .2s;}
    footer a:hover{color:var(--text);}
    .footer-bottom{border-top:1px solid var(--border);padding-top:20px;text-align:center;color:var(--muted);font-size:13px;}

    .logos{padding:40px 0;overflow:hidden;}
    .logos-label{text-align:center;color:var(--muted);font-size:14px;margin-bottom:24px;}
    .logos-track{overflow:hidden;}
    .logos-slide{display:flex;gap:48px;animation:marquee 20s linear infinite;width:max-content;}
    .logo-item{font-size:18px;font-weight:700;color:var(--muted);opacity:0.5;white-space:nowrap;}
    @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

    .stats{padding:60px 0;}
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center;}
    .stat-num{font-size:42px;font-weight:800;color:var(--accent);}
    .stat-label{color:var(--muted);font-size:14px;margin-top:4px;}

    .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;}
    .contact-form{display:flex;flex-direction:column;gap:12px;}
    .contact-form input,.contact-form textarea{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 16px;color:var(--text);font-size:15px;font-family:inherit;direction:rtl;}
    .contact-form input:focus,.contact-form textarea:focus{outline:none;border-color:var(--accent);}
    .contact-info{display:flex;flex-direction:column;gap:16px;justify-content:center;}
    .info-item{font-size:16px;padding:12px 0;}

    .reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;}
    .reveal.visible{opacity:1;transform:translateY(0);}

    @media(max-width:768px){
      .nav-links{display:none;position:fixed;top:60px;left:0;right:0;background:var(--bg);border-bottom:1px solid var(--border);flex-direction:column;padding:20px;gap:16px;}
      .nav-links.open{display:flex;}
      .hamburger{display:block;}
      .features-grid{grid-template-columns:1fr;}
      .feature-card{grid-column:span 1!important;}
      .pricing-grid{grid-template-columns:1fr;}
      .pricing-card.popular{transform:none;}
      .testimonials-grid{grid-template-columns:1fr;}
      .stats-grid{grid-template-columns:repeat(2,1fr);}
      .footer-grid{grid-template-columns:1fr 1fr;}
      .contact-grid{grid-template-columns:1fr;}
    }`;
}

// ========== HTML ASSEMBLY ==========
function generateHTML(config) {
  const p = pal(config.id, config.cat);
  const content = CC[config.cat]();
  const animCode = ANIM[config.id] || '';
  const needsThree = animCode.includes('THREE.');

  const sections = [
    navbarHTML(p, config.title),
    heroHTML(p, content.title, content.sub, content.hv),
    logosHTML(),
    featuresHTML(p, content.features),
    statsHTML(),
    pricingHTML(p),
    testimonialsHTML(p),
    faqHTML(),
    ctaHTML(),
    contactHTML(),
    footerHTML(p, config.title),
  ].join('\n');

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${config.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${p.font.replace(/ /g,'+')}:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>${generateCSS(p)}</style>
</head>
<body>
<canvas id="bg-canvas" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;"></canvas>
<div id="content" style="position:relative;z-index:1;">
${sections}
</div>
${needsThree ? '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>' : ''}
<script>
${animCode}
</script>
<script>
var ro=new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){en.target.classList.add('visible');ro.unobserve(en.target);}});},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(function(el){ro.observe(el);});
</script>
</body>
</html>`;
}

// ========== GENERATE ALL ==========
let count = 0;
const missing = [];
for (const config of CONFIGS) {
  const dir = join(ROOT, config.id);
  mkdirSync(dir, { recursive: true });
  if (!ANIM[config.id]) missing.push(config.id);
  writeFileSync(join(dir, 'index.html'), generateHTML(config), 'utf-8');
  count++;
  process.stdout.write(`\r✓ ${count}/${CONFIGS.length} - ${config.id}`);
}
console.log(`\n\nDone! Generated ${count} template HTML files.`);
if (missing.length) console.log(`⚠ ${missing.length} templates missing animation: ${missing.join(', ')}`);
