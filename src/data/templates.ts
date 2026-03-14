export interface Template {
  id: string;
  title: string;
  titleEn: string;
  category: TemplateCategory;
  tags: string[];
  difficulty: '\u05e7\u05dc' | '\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9' | '\u05de\u05ea\u05e7\u05d3\u05dd';
  sections: string[];
  previewFile: string;
  prompts: { lovable: string; base44: string; claudeCode: string };
}

export type TemplateCategory =
  | 'saas' | 'startup' | 'agency' | 'portfolio' | 'ecommerce'
  | 'mobile-app' | 'ai' | 'crypto' | 'restaurant' | 'real-estate'
  | 'fitness' | 'education' | 'event' | 'blog' | 'sections';

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  saas: 'SaaS', startup: '\u05e1\u05d8\u05d0\u05e8\u05d8\u05d0\u05e4', agency: '\u05e1\u05d5\u05db\u05e0\u05d5\u05ea',
  portfolio: '\u05e4\u05d5\u05e8\u05d8\u05e4\u05d5\u05dc\u05d9\u05d5', ecommerce: '\u05d7\u05e0\u05d5\u05ea',
  'mobile-app': '\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d4', ai: '\u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea',
  crypto: '\u05e7\u05e8\u05d9\u05e4\u05d8\u05d5 / Web3', restaurant: '\u05de\u05e1\u05e2\u05d3\u05d4 / \u05d0\u05d5\u05db\u05dc',
  'real-estate': '\u05e0\u05d3\u05dc\u05df', fitness: '\u05e1\u05e4\u05d5\u05e8\u05d8 / \u05db\u05d5\u05e9\u05e8',
  education: '\u05d7\u05d9\u05e0\u05d5\u05da', event: '\u05d0\u05d9\u05e8\u05d5\u05e2',
  blog: '\u05d1\u05dc\u05d5\u05d2', sections: '\u05e1\u05e7\u05e9\u05e0\u05d9\u05dd',
};

interface Palette { bg: string; surface: string; border: string; accent: string; accent2: string; text: string; muted: string; font: string }
const P: Record<TemplateCategory, Palette> = {
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

const OV: Record<string, Partial<Palette>> = {
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

function pal(id: string, cat: TemplateCategory): Palette {
  return { ...P[cat], ...(OV[id] || {}) };
}

export function getTemplatePalette(template: Template): Palette {
  return pal(template.id, template.category);
}

function genLovable(id: string, cat: TemplateCategory, titleEn: string, sections: string[]): string {
  const p = pal(id, cat);
  return `Build a complete, production-ready ${titleEn} landing page.

DESIGN TOKENS:
- Background: ${p.bg}
- Surface: ${p.surface}
- Border: ${p.border}
- Accent: ${p.accent}
- Secondary accent: ${p.accent2}
- Text: ${p.text}
- Muted text: ${p.muted}
- Font: ${p.font} (Google Fonts)

SECTIONS TO BUILD (in this exact order):
${sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

REQUIREMENTS:
- Fully responsive (mobile-first with breakpoints at 768px and 1024px)
- RTL Hebrew layout (dir="rtl", lang="he")
- All content text in Hebrew
- Intersection Observer for scroll-reveal animations (fade up)
- Hover effects: cards lift translateY(-4px), buttons glow with box-shadow
- Smooth transitions on all interactive elements
- Sticky navbar with backdrop-filter blur
- Use React + Tailwind CSS. Export as single page component.
- Zero external dependencies except Google Fonts`;
}

function genBase44(id: string, cat: TemplateCategory, title: string, sections: string[]): string {
  const p = pal(id, cat);
  return `\u05d1\u05e0\u05d4 \u05d3\u05e3 \u05e0\u05d7\u05d9\u05ea\u05d4 ${title} \u05e2\u05dd \u05d4\u05e1\u05e7\u05e9\u05e0\u05d9\u05dd \u05d4\u05d1\u05d0\u05d9\u05dd:

${sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

\u05e2\u05d9\u05e6\u05d5\u05d1: \u05e8\u05e7\u05e2 ${p.bg}, \u05d0\u05e7\u05e1\u05e0\u05d8 ${p.accent}, \u05e4\u05d5\u05e0\u05d8 ${p.font}
RTL \u05e2\u05d1\u05e8\u05d9\u05ea, \u05e8\u05e1\u05e4\u05d5\u05e0\u05e1\u05d9\u05d1\u05d9 \u05de\u05dc\u05d0, \u05d0\u05e0\u05d9\u05de\u05e6\u05d9\u05d5\u05ea reveal \u05d1\u05d2\u05dc\u05d9\u05dc\u05d4, hover \u05e2\u05dc \u05db\u05e8\u05d8\u05d9\u05e1\u05d9\u05dd`;
}

function genClaude(id: string, cat: TemplateCategory, titleEn: string, sections: string[]): string {
  const p = pal(id, cat);
  return `Create a ${titleEn} landing page.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS
File: src/app/page.tsx

Design system:
- bg: ${p.bg}, surface: ${p.surface}, border: ${p.border}
- accent: ${p.accent}, accent2: ${p.accent2}
- text: ${p.text}, muted: ${p.muted}
- Font: ${p.font} (Google Fonts @import)

Build these component sections:
${sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Use framer-motion for reveal animations (fade-up on scroll via useInView).
All text content in Hebrew (RTL direction).
Responsive: mobile-first with md: and lg: breakpoints.
Export default function HomePage().`;
}

interface TC { id: string; title: string; titleEn: string; category: TemplateCategory; tags: string[]; difficulty: '\u05e7\u05dc'|'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9'|'\u05de\u05ea\u05e7\u05d3\u05dd'; sections: string[] }

const CONFIGS: TC[] = [
  // SaaS (12)
  { id:'saas-dark', title:'SaaS \u05db\u05d4\u05d4 \u05de\u05d5\u05d3\u05e8\u05e0\u05d9', titleEn:'Dark SaaS Landing', category:'saas', tags:['dark','modern','animated'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Sticky navbar with blur backdrop','Hero with dot grid bg, badge pill, gradient headline, 2 buttons','Logo cloud - trusted by companies','Features bento grid - 5 cards (2 large spanning 2 cols)','Pricing 3 cards with monthly/yearly toggle','Testimonials 3 cards with star ratings','FAQ accordion 5 questions','CTA section with gradient bg','Footer 4 columns with links'] },
  { id:'saas-light', title:'SaaS \u05d1\u05d4\u05d9\u05e8 \u05e0\u05e7\u05d9', titleEn:'Clean Light SaaS', category:'saas', tags:['light','clean','minimal'], difficulty:'\u05e7\u05dc', sections:['Navbar clean','Hero with dashboard mockup graphic','Features 3 columns with icons','Pricing toggle monthly/yearly','Testimonials carousel','CTA with email input'] },
  { id:'saas-gradient', title:'SaaS \u05d2\u05e8\u05d3\u05d9\u05d0\u05e0\u05d8 \u05e6\u05d1\u05e2\u05d5\u05e0\u05d9', titleEn:'Gradient SaaS', category:'saas', tags:['gradient','colorful','bold'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with mesh gradient background','Stats 4 animated counters','Features tabs UI','Pricing 3 tiers','CTA with gradient button'] },
  { id:'saas-minimal', title:'SaaS \u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\u05e1\u05d8\u05d9', titleEn:'Minimal SaaS', category:'saas', tags:['minimal','typography','whitespace'], difficulty:'\u05e7\u05dc', sections:['Minimal navbar','Hero typography only','Features simple list','Pricing 2 cards','Footer minimal'] },
  { id:'saas-dashboard', title:'SaaS \u05e2\u05dd Dashboard Preview', titleEn:'Dashboard SaaS', category:'saas', tags:['dashboard','3d','product'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with CSS dashboard mockup showing charts','Features animated cards','Integrations grid logos','Pricing 3 tiers','Testimonials slider'] },
  { id:'saas-glassmorphism', title:'SaaS \u05d6\u05db\u05d5\u05db\u05d9\u05ea', titleEn:'Glassmorphism SaaS', category:'saas', tags:['glass','blur','premium'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Glass navbar','Hero with glass card overlay','Features glass grid','Pricing glass cards','CTA section'] },
  { id:'saas-analytics', title:'SaaS \u05d0\u05e0\u05dc\u05d9\u05d8\u05d9\u05e7\u05e1', titleEn:'Analytics SaaS', category:'saas', tags:['analytics','data','charts'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with CSS chart preview','Features data visualization cards','Stats counter section','Integrations logos','Pricing','CTA'] },
  { id:'saas-security', title:'SaaS \u05d0\u05d1\u05d8\u05d7\u05d4 / Cybersecurity', titleEn:'Security SaaS', category:'saas', tags:['security','dark','professional'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with matrix dots bg and shield icon','Features security icons','Trust badges SOC2 ISO','Pricing 3 tiers','CTA'] },
  { id:'saas-productivity', title:'SaaS \u05e4\u05e8\u05d5\u05d3\u05e7\u05d8\u05d9\u05d1\u05d9\u05d8\u05d9', titleEn:'Productivity SaaS', category:'saas', tags:['productivity','tasks','workflow'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with task board mockup','Before/after comparison section','Features grid','Testimonials','Pricing','FAQ'] },
  { id:'saas-crm', title:'SaaS CRM', titleEn:'CRM SaaS', category:'saas', tags:['crm','business','enterprise'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with pipeline visualization','Features tabs','Integrations logos grid','Pricing enterprise with contact sales','Testimonials','Demo CTA'] },
  { id:'saas-finance', title:'SaaS \u05e4\u05d9\u05e0\u05e0\u05e1\u05d9', titleEn:'Fintech SaaS', category:'saas', tags:['finance','fintech','trust'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with money/chart mockup','Security and compliance section','Stats counters','Pricing','CTA'] },
  { id:'saas-hr', title:'SaaS HR / \u05d2\u05d9\u05d5\u05e1', titleEn:'HR SaaS', category:'saas', tags:['hr','hiring','people'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with team/people mockup','Features grid','Social proof section','Pricing','CTA'] },
  // AI (10)
  { id:'ai-chatbot', title:'AI \u05e6\u05f3\u05d0\u05d8\u05d1\u05d5\u05d8', titleEn:'AI Chatbot Landing', category:'ai', tags:['ai','chat','futuristic'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with animated chat bubbles demo','Features 3 cards','Use cases grid','Pricing','CTA'] },
  { id:'ai-agent', title:'AI Agent \u05e1\u05d8\u05d0\u05e8\u05d8\u05d0\u05e4', titleEn:'AI Agent Startup', category:'ai', tags:['agent','automation','dark'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with neural network bg','Agent workflow steps visual','Features','Integrations','Pricing','CTA'] },
  { id:'ai-image', title:'AI \u05d9\u05e6\u05d9\u05e8\u05ea \u05ea\u05de\u05d5\u05e0\u05d5\u05ea', titleEn:'AI Image Generator', category:'ai', tags:['image-gen','creative','colorful'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with gallery grid showcase','Prompt demo section','Styles grid','Pricing','CTA'] },
  { id:'ai-writing', title:'AI \u05db\u05ea\u05d9\u05d1\u05d4 / \u05e7\u05d5\u05e4\u05d9\u05e8\u05d9\u05d9\u05d8\u05d9\u05e0\u05d2', titleEn:'AI Writing Tool', category:'ai', tags:['writing','copy','content'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with typewriter text animation','Before/after text comparison','Features','Templates gallery 6 cards','Pricing','CTA'] },
  { id:'ai-voice', title:'AI \u05e7\u05d5\u05dc / Podcast', titleEn:'AI Voice Tool', category:'ai', tags:['voice','audio','wave'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with animated CSS waveform','Demo audio player UI','Voices grid 6 cards','Pricing','CTA'] },
  { id:'ai-video', title:'AI \u05d5\u05d9\u05d3\u05d0\u05d5', titleEn:'AI Video Generator', category:'ai', tags:['video','generation','media'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with video reel frames','Prompt to video demo','Features','Examples grid','Pricing'] },
  { id:'ai-code', title:'AI \u05db\u05dc\u05d9 \u05e7\u05d5\u05d3', titleEn:'AI Code Tool', category:'ai', tags:['code','developer','dark'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with code editor mockup','Features IDE layout','Languages grid','Pricing','Testimonials developers'] },
  { id:'ai-data', title:'AI \u05d0\u05e0\u05dc\u05d9\u05d6\u05ea \u05d3\u05d0\u05d8\u05d4', titleEn:'AI Data Analysis', category:'ai', tags:['data','analytics','enterprise'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with data visualization','Features','Integrations','Security section','Pricing enterprise'] },
  { id:'ai-minimal', title:'AI \u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\u05e1\u05d8\u05d9', titleEn:'Minimal AI Landing', category:'ai', tags:['minimal','clean','elegant'], difficulty:'\u05e7\u05dc', sections:['Minimal navbar','Hero typography only','Features 3 simple cards','Pricing 2 cards','CTA'] },
  { id:'ai-search', title:'AI \u05d7\u05d9\u05e4\u05d5\u05e9 / Perplexity \u05e1\u05d2\u05e0\u05d5\u05df', titleEn:'AI Search Engine', category:'ai', tags:['search','query','results'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with big search bar animated placeholder','Example queries 3 cards','Features','Pricing','CTA'] },
  // Startup (8)
  { id:'startup-bold', title:'\u05e1\u05d8\u05d0\u05e8\u05d8\u05d0\u05e4 \u05d1\u05d5\u05dc\u05d3', titleEn:'Bold Startup', category:'startup', tags:['bold','big-text','impact'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with HUGE headline','Problem/solution split','Features grid','Team section','Investors logos','CTA'] },
  { id:'startup-waitlist', title:'\u05e1\u05d8\u05d0\u05e8\u05d8\u05d0\u05e4 Waitlist', titleEn:'Waitlist Startup', category:'startup', tags:['waitlist','launch','email'], difficulty:'\u05e7\u05dc', sections:['Navbar','Hero with countdown and email input','Social proof counter','Feature preview','CTA'] },
  { id:'startup-product-hunt', title:'Launch / Product Hunt', titleEn:'Product Hunt Launch', category:'startup', tags:['launch','ph','vote'], difficulty:'\u05e7\u05dc', sections:['Navbar','Hero product screenshot','Features','Makers section','Comments/reviews','CTA upvote'] },
  { id:'startup-mvp', title:'MVP \u05de\u05d4\u05d9\u05e8', titleEn:'Quick MVP', category:'startup', tags:['mvp','simple','fast'], difficulty:'\u05e7\u05dc', sections:['Navbar','Hero simple','Features 3 cards','Pricing 2 plans','CTA'] },
  { id:'startup-b2b', title:'B2B Enterprise', titleEn:'B2B Enterprise', category:'startup', tags:['b2b','enterprise','professional'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero professional','Clients logos','Features','Case studies','Pricing enterprise','Contact form'] },
  { id:'startup-community', title:'\u05e7\u05d4\u05d9\u05dc\u05d4 / Community', titleEn:'Community Platform', category:'startup', tags:['community','social','members'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with stacked avatars','Features','Testimonials','Pricing','CTA join'] },
  { id:'startup-mobile', title:'Mobile App Startup', titleEn:'Mobile App Landing', category:'startup', tags:['mobile','app','download'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero phone mockup','Features scroll','Screenshots carousel','Reviews','Download CTA'] },
  { id:'startup-open-source', title:'Open Source / Dev Tool', titleEn:'Open Source Tool', category:'startup', tags:['open-source','github','developer'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero terminal block','npm install command','Features code-focused','GitHub stats','Contributors grid','CTA star'] },
  // Agency (8)
  { id:'agency-creative', title:'\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05e7\u05e8\u05d9\u05d0\u05d8\u05d9\u05d1', titleEn:'Creative Agency', category:'agency', tags:['creative','bold','portfolio'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with custom cursor text','Work grid with hover reveal','Services','Team','Contact form'] },
  { id:'agency-digital', title:'\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05d3\u05d9\u05d2\u05d9\u05d8\u05dc', titleEn:'Digital Agency', category:'agency', tags:['digital','marketing','results'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with results stats','Services grid','Work showcase','Results numbers','Clients logos','CTA'] },
  { id:'agency-motion', title:'\u05e1\u05d5\u05db\u05e0\u05d5\u05ea Motion / \u05d5\u05d9\u05d3\u05d0\u05d5', titleEn:'Motion Agency', category:'agency', tags:['motion','video','reel'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with video frame bg','Work reel horizontal scroll','Services','Clients','Contact'] },
  { id:'agency-branding', title:'\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05de\u05d9\u05ea\u05d5\u05d2', titleEn:'Branding Agency', category:'agency', tags:['branding','identity','elegant'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero editorial asymmetric layout','Work showcase','Process 4 steps','Clients logos','Contact'] },
  { id:'agency-seo', title:'\u05e1\u05d5\u05db\u05e0\u05d5\u05ea SEO / PPC', titleEn:'SEO Agency', category:'agency', tags:['seo','marketing','growth'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with growth chart','Services','Process timeline','Case studies','Pricing 3 plans','CTA'] },
  { id:'agency-social', title:'\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05e1\u05d5\u05e9\u05d9\u05d0\u05dc', titleEn:'Social Media Agency', category:'agency', tags:['social','content','viral'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with social mockups','Services','Results stats','Pricing','CTA'] },
  { id:'agency-web', title:'\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05e4\u05d9\u05ea\u05d5\u05d7 \u05d0\u05ea\u05e8\u05d9\u05dd', titleEn:'Web Dev Agency', category:'agency', tags:['webdev','code','build'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero with browser mockup','Services','Tech stack icons','Portfolio 4 projects','Pricing','Contact'] },
  { id:'agency-ai', title:'\u05e1\u05d5\u05db\u05e0\u05d5\u05ea AI \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4', titleEn:'AI Automation Agency', category:'agency', tags:['ai','automation','n8n'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with workflow diagram animated','Services automation','Tools logos','Case studies','Pricing','CTA'] },
  // Portfolio (8)
  { id:'portfolio-developer', title:'\u05e4\u05d5\u05e8\u05d8\u05e4\u05d5\u05dc\u05d9\u05d5 \u05de\u05e4\u05ea\u05d7', titleEn:'Developer Portfolio', category:'portfolio', tags:['developer','code','dark'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero terminal typing animation','About section','Skills progress bars','Projects grid 4 cards','Experience timeline','Contact form'] },
  { id:'portfolio-designer', title:'\u05e4\u05d5\u05e8\u05d8\u05e4\u05d5\u05dc\u05d9\u05d5 \u05de\u05e2\u05e6\u05d1', titleEn:'Designer Portfolio', category:'portfolio', tags:['designer','visual','creative'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero big name with hover effects','Work masonry grid','About','Services','Contact'] },
  { id:'portfolio-photographer', title:'\u05e4\u05d5\u05e8\u05d8\u05e4\u05d5\u05dc\u05d9\u05d5 \u05e6\u05dc\u05dd', titleEn:'Photographer Portfolio', category:'portfolio', tags:['photo','gallery','visual'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero full screen image','Gallery grid with hover zoom','About','Services','Contact'] },
  { id:'portfolio-freelancer', title:'\u05e4\u05d5\u05e8\u05d8\u05e4\u05d5\u05dc\u05d9\u05d5 \u05e4\u05e8\u05d9\u05dc\u05e0\u05e1\u05e8', titleEn:'Freelancer Portfolio', category:'portfolio', tags:['freelancer','hire','services'], difficulty:'\u05e7\u05dc', sections:['Navbar','Hero available for hire badge','Services 4 cards','Work 3 projects','Testimonials','Pricing','Contact'] },
  { id:'portfolio-minimal', title:'\u05e4\u05d5\u05e8\u05d8\u05e4\u05d5\u05dc\u05d9\u05d5 \u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\u05e1\u05d8\u05d9', titleEn:'Minimal Portfolio', category:'portfolio', tags:['minimal','clean','typography'], difficulty:'\u05e7\u05dc', sections:['Hero huge name text','Selected work list with hover','About short','Contact'] },
  { id:'portfolio-motion', title:'\u05e4\u05d5\u05e8\u05d8\u05e4\u05d5\u05dc\u05d9\u05d5 \u05d0\u05e0\u05d9\u05de\u05d8\u05d5\u05e8', titleEn:'Motion Designer Portfolio', category:'portfolio', tags:['motion','animation','reel'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Hero video reel autoplay','Work grid with video hover','Skills','Contact'] },
  { id:'portfolio-consultant', title:'\u05e4\u05d5\u05e8\u05d8\u05e4\u05d5\u05dc\u05d9\u05d5 \u05d9\u05d5\u05e2\u05e5', titleEn:'Consultant Portfolio', category:'portfolio', tags:['consultant','professional','trust'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero professional photo + title','About credentials','Services','Testimonials','Calendar booking CTA','Contact'] },
  { id:'portfolio-3d', title:'\u05e4\u05d5\u05e8\u05d8\u05e4\u05d5\u05dc\u05d9\u05d5 3D \u05d0\u05d9\u05e0\u05d8\u05e8\u05e7\u05d8\u05d9\u05d1\u05d9', titleEn:'3D Interactive Portfolio', category:'portfolio', tags:['3d','threejs','immersive'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Hero 3D perspective cards','Work 3D flip cards','Skills','Contact'] },
  // Ecommerce (8)
  { id:'ecommerce-fashion', title:'\u05d7\u05e0\u05d5\u05ea \u05d0\u05d5\u05e4\u05e0\u05d4', titleEn:'Fashion Store', category:'ecommerce', tags:['fashion','luxury','visual'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero editorial full width','New arrivals grid 4 products','Categories','Featured product','Instagram feed mockup'] },
  { id:'ecommerce-product', title:'\u05e2\u05de\u05d5\u05d3 \u05de\u05d5\u05e6\u05e8 \u05d9\u05d7\u05d9\u05d3', titleEn:'Single Product Landing', category:'ecommerce', tags:['product','single','conversion'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero product image + features','Features scroll sections','Social proof reviews','Sticky buy CTA at bottom'] },
  { id:'ecommerce-digital', title:'\u05d7\u05e0\u05d5\u05ea \u05de\u05d5\u05e6\u05e8\u05d9\u05dd \u05d3\u05d9\u05d2\u05d9\u05d8\u05dc\u05d9\u05d9\u05dd', titleEn:'Digital Products Store', category:'ecommerce', tags:['digital','download','templates'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero preview mockup','Products grid 6 items','Features','Testimonials','Pricing bundles'] },
  { id:'ecommerce-food', title:'\u05d7\u05e0\u05d5\u05ea \u05d0\u05d5\u05db\u05dc / Delivery', titleEn:'Food Delivery', category:'ecommerce', tags:['food','delivery','menu'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero food photography','Menu categories 4 cards','Popular items','How it works','App download buttons'] },
  { id:'ecommerce-beauty', title:'\u05d7\u05e0\u05d5\u05ea \u05d9\u05d5\u05e4\u05d9 / \u05e7\u05d5\u05e1\u05de\u05d8\u05d9\u05e7\u05d4', titleEn:'Beauty Store', category:'ecommerce', tags:['beauty','cosmetics','feminine'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero luxury aesthetic','Bestsellers 4 products','Ingredients section','Reviews','Bundle offer CTA'] },
  { id:'ecommerce-subscription', title:'Box Subscription', titleEn:'Subscription Box', category:'ecommerce', tags:['subscription','box','recurring'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero unboxing visual','Whats inside 4 items','How it works 3 steps','Pricing tiers','Reviews'] },
  { id:'ecommerce-course', title:'\u05e7\u05d5\u05e8\u05e1 / \u05de\u05d5\u05e6\u05e8 \u05d3\u05d9\u05d2\u05d9\u05d8\u05dc\u05d9', titleEn:'Digital Product', category:'ecommerce', tags:['course','education','funnel'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero video sales letter area','What you get checklist','Curriculum expandable','Instructor bio','Testimonials','Pricing','FAQ'] },
  { id:'ecommerce-saas-trial', title:'Free Trial Funnel', titleEn:'Free Trial Funnel', category:'ecommerce', tags:['trial','funnel','conversion'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero free trial CTA big button','Social proof counter','Features 3 cards','How it works 3 steps','Pricing','FAQ'] },
  // Mobile App (6)
  { id:'app-ios', title:'\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d4 iOS', titleEn:'iOS App Landing', category:'mobile-app', tags:['ios','iphone','apple'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero iPhone mockup CSS','Features scroll 3 features','Screenshots 3 phone mockups','Reviews app store style','Download App Store button'] },
  { id:'app-android', title:'\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d4 Android', titleEn:'Android App Landing', category:'mobile-app', tags:['android','material','google'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero Android phone mockup','Features','Screenshots carousel','Ratings stars','Google Play button'] },
  { id:'app-game', title:'\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d9\u05ea \u05de\u05e9\u05d7\u05e7', titleEn:'Mobile Game Landing', category:'mobile-app', tags:['game','gaming','fun'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero gameplay screenshot area','Features','Screenshots','Leaderboard top 5','Download'] },
  { id:'app-fitness', title:'\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d9\u05ea \u05db\u05d5\u05e9\u05e8', titleEn:'Fitness App', category:'mobile-app', tags:['fitness','health','workout'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero athlete silhouette','Features','App screenshots','Community stats','Pricing','Download'] },
  { id:'app-finance', title:'\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d9\u05ea \u05e4\u05d9\u05e0\u05e0\u05e1\u05d9\u05dd', titleEn:'Finance App', category:'mobile-app', tags:['finance','banking','money'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero wallet/card mockup','Security features','How it works 3 steps','Reviews','Download'] },
  { id:'app-social', title:'\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d4 \u05d7\u05d1\u05e8\u05ea\u05d9\u05ea', titleEn:'Social App', category:'mobile-app', tags:['social','community','connect'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero community vibe stacked avatars','Features','User feed mockup','Stats counters','Download'] },
  // Crypto (6)
  { id:'crypto-nft', title:'NFT Collection', titleEn:'NFT Collection', category:'crypto', tags:['nft','art','mint'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar with connect wallet','Hero NFT grid showcase','Mint section price + count','Roadmap 4 phases','Team 4 members','FAQ'] },
  { id:'crypto-defi', title:'DeFi Protocol', titleEn:'DeFi Protocol', category:'crypto', tags:['defi','protocol','web3'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero TVL stats big numbers','How it works 3 steps','Features','Tokenomics pie chart','Roadmap','CTA'] },
  { id:'crypto-exchange', title:'Exchange / \u05d0\u05e8\u05e0\u05e7', titleEn:'Crypto Exchange', category:'crypto', tags:['exchange','trading','wallet'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero trading chart mockup','Features security','Supported coins grid','Fees table','Download app'] },
  { id:'crypto-token', title:'Token Launch', titleEn:'Token Launch', category:'crypto', tags:['token','ico','launch'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero countdown timer','Tokenomics chart distribution','Roadmap timeline','Team','Whitepaper button','Buy CTA'] },
  { id:'crypto-dao', title:'DAO / Governance', titleEn:'DAO Landing', category:'crypto', tags:['dao','governance','community'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero community focused','Mission statement','How to join 3 steps','Proposals preview 3 cards','CTA'] },
  { id:'crypto-minimal', title:'Web3 \u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\u05e1\u05d8\u05d9', titleEn:'Minimal Web3', category:'crypto', tags:['minimal','clean','web3'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero simple bold text','Features 3 cards','Roadmap simple','Team 3 members','Connect wallet CTA'] },
  // Restaurant (5)
  { id:'restaurant-luxury', title:'\u05de\u05e1\u05e2\u05d3\u05ea \u05d9\u05d5\u05e7\u05e8\u05d4', titleEn:'Luxury Restaurant', category:'restaurant', tags:['luxury','fine-dining','elegant'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar elegant','Hero full screen photo overlay','Menu categories + items','Chef section','Gallery grid','Reservation form'] },
  { id:'restaurant-fast', title:'\u05de\u05e1\u05e2\u05d3\u05d4 \u05de\u05d4\u05d9\u05e8\u05d4 / Takeaway', titleEn:'Fast Food / Takeaway', category:'restaurant', tags:['fast-food','delivery','order'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar bold','Hero bold colors','Menu categories 4 cards','Popular items 3','Order online CTA','App download'] },
  { id:'restaurant-cafe', title:'\u05d1\u05d9\u05ea \u05e7\u05e4\u05d4', titleEn:'Cafe Landing', category:'restaurant', tags:['cafe','coffee','cozy'], difficulty:'\u05e7\u05dc', sections:['Navbar','Hero cozy atmosphere','Menu coffee + pastries','Our story','Location and hours','Instagram feed mockup'] },
  { id:'restaurant-vegan', title:'\u05de\u05e1\u05e2\u05d3\u05d4 \u05d8\u05d1\u05e2\u05d5\u05e0\u05d9\u05ea', titleEn:'Vegan Restaurant', category:'restaurant', tags:['vegan','healthy','green'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero green aesthetic','Menu','Ingredients story','Blog section 2 posts','Location'] },
  { id:'restaurant-bakery', title:'\u05de\u05d0\u05e4\u05d9\u05d9\u05d4 / \u05e7\u05d5\u05e0\u05d3\u05d9\u05d8\u05d5\u05e8\u05d9\u05d4', titleEn:'Bakery', category:'restaurant', tags:['bakery','sweet','artisan'], difficulty:'\u05e7\u05dc', sections:['Navbar','Hero warm photography','Menu','Custom orders','Our story','Contact'] },
  // Real Estate (5)
  { id:'realestate-agency', title:'\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05e0\u05d3\u05dc\u05df', titleEn:'Real Estate Agency', category:'real-estate', tags:['realtor','properties','search'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero with search bar','Featured properties 3 cards','Services','Agents 3 cards','Testimonials','Contact'] },
  { id:'realestate-luxury', title:'\u05e0\u05db\u05e1 \u05d9\u05d5\u05e7\u05e8\u05d4', titleEn:'Luxury Property', category:'real-estate', tags:['luxury','villa','premium'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero full screen property','Features amenities','Gallery grid','Floor plan area','Location','Contact'] },
  { id:'realestate-rental', title:'\u05d4\u05e9\u05db\u05e8\u05ea \u05e0\u05db\u05e1\u05d9\u05dd', titleEn:'Rental Platform', category:'real-estate', tags:['rental','airbnb','short-term'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero search with dates','Featured rentals 3','How it works 3 steps','Become a host CTA','App download'] },
  { id:'realestate-invest', title:'\u05d4\u05e9\u05e7\u05e2\u05d5\u05ea \u05e0\u05d3\u05dc\u05df', titleEn:'Real Estate Investment', category:'real-estate', tags:['investment','roi','finance'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero ROI stats','How it works 3 steps','Properties preview 3','Returns calculator mockup','Testimonials','CTA'] },
  { id:'realestate-newdev', title:'\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8 \u05d1\u05e0\u05d9\u05d9\u05d4 \u05d7\u05d3\u05e9', titleEn:'New Development', category:'real-estate', tags:['new-build','project','presale'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero 3D render placeholder','Floor plans 3 types','Amenities icons grid','Location section','Register interest form'] },
  // Fitness (4)
  { id:'fitness-gym', title:'\u05d7\u05d3\u05e8 \u05db\u05d5\u05e9\u05e8', titleEn:'Gym Landing', category:'fitness', tags:['gym','muscle','dark'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero bold athlete text','Programs 4 cards','Trainers 3 cards','Schedule table','Pricing 3 plans','CTA'] },
  { id:'fitness-coach', title:'\u05de\u05d0\u05de\u05df \u05d0\u05d9\u05e9\u05d9', titleEn:'Personal Trainer', category:'fitness', tags:['coach','personal','transformation'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero before/after comparison','About coach','Programs 3 cards','Results stats','Testimonials','Booking CTA'] },
  { id:'fitness-yoga', title:'\u05d9\u05d5\u05d2\u05d4 / \u05de\u05d3\u05d9\u05d8\u05e6\u05d9\u05d4', titleEn:'Yoga Studio', category:'fitness', tags:['yoga','wellness','calm'], difficulty:'\u05e7\u05dc', sections:['Navbar','Hero calm peaceful aesthetic','Classes 4 cards','Teachers 2 cards','Schedule','Pricing 2 plans','Contact'] },
  { id:'fitness-nutrition', title:'\u05ea\u05d6\u05d5\u05e0\u05d4 / \u05d3\u05d9\u05d0\u05d8\u05d4', titleEn:'Nutrition Coach', category:'fitness', tags:['nutrition','diet','health'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero transformation focus','Programs 3 cards','Meal plans section','Testimonials','Booking CTA'] },
  // Education (4)
  { id:'edu-online-course', title:'\u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05ea \u05e7\u05d5\u05e8\u05e1\u05d9\u05dd', titleEn:'Online Course Platform', category:'education', tags:['courses','learning','platform'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero search courses bar','Featured courses 3 cards','Categories 6 pills','Instructors 2 cards','Pricing','CTA'] },
  { id:'edu-bootcamp', title:'Bootcamp / School', titleEn:'Coding Bootcamp', category:'education', tags:['bootcamp','coding','career'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero outcome focused','Curriculum expandable','Outcomes salary stats','Testimonials grads','Pricing','Apply CTA'] },
  { id:'edu-kids', title:'\u05d7\u05d9\u05e0\u05d5\u05da \u05d9\u05dc\u05d3\u05d9\u05dd', titleEn:'Kids Education', category:'education', tags:['kids','fun','colorful'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero playful colorful','Subjects 4 cards','How it works','Parents testimonials','Pricing'] },
  { id:'edu-tutor', title:'\u05de\u05d5\u05e8\u05d4 \u05e4\u05e8\u05d8\u05d9 / Tutoring', titleEn:'Private Tutor', category:'education', tags:['tutor','private','lessons'], difficulty:'\u05e7\u05dc', sections:['Navbar','Hero simple','Subjects list','About tutor','Testimonials','Pricing per hour','Booking CTA'] },
  // Event (4)
  { id:'event-conference', title:'\u05db\u05e0\u05e1 / Conference', titleEn:'Conference Event', category:'event', tags:['conference','speakers','tickets'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero date countdown timer','Speakers grid 4','Schedule 2 days','Sponsors logos','Tickets pricing 3 tiers','Register CTA'] },
  { id:'event-wedding', title:'\u05d7\u05ea\u05d5\u05e0\u05d4 / \u05d0\u05d9\u05e8\u05d5\u05e2', titleEn:'Wedding / Event', category:'event', tags:['wedding','romantic','elegant'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero couple names + date','Our story timeline','Details date/time/location','RSVP form','Gallery grid','Registry link'] },
  { id:'event-music', title:'\u05d4\u05d5\u05e4\u05e2\u05d4 / Festival', titleEn:'Music Event / Festival', category:'event', tags:['music','festival','concert'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Navbar','Hero artist name big','Lineup 6 artists','Schedule 2 stages','Tickets 3 tiers','Venue info','FAQ'] },
  { id:'event-hackathon', title:'\u05d4\u05d0\u05e7\u05ea\u05d5\u05df', titleEn:'Hackathon Event', category:'event', tags:['hackathon','tech','developer'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero terminal aesthetic','Prizes 3 tiers','Schedule 24h timeline','Judges 3 cards','Sponsors logos','Register CTA'] },
  // Blog (3)
  { id:'blog-tech', title:'\u05d1\u05dc\u05d5\u05d2 \u05d8\u05db\u05e0\u05d5\u05dc\u05d5\u05d2\u05d9\u05d4', titleEn:'Tech Blog', category:'blog', tags:['blog','tech','articles'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Navbar','Hero featured post card','Latest posts grid 6','Categories sidebar pills','Newsletter signup'] },
  { id:'blog-personal', title:'\u05d1\u05dc\u05d5\u05d2 \u05d0\u05d9\u05e9\u05d9', titleEn:'Personal Blog', category:'blog', tags:['personal','writing','minimal'], difficulty:'\u05e7\u05dc', sections:['Navbar','Hero author intro avatar','Latest posts list 3','About section','Newsletter'] },
  { id:'blog-newsletter', title:'Newsletter / Substack', titleEn:'Newsletter Landing', category:'blog', tags:['newsletter','substack','email'], difficulty:'\u05e7\u05dc', sections:['Navbar','Hero big subscribe input','Past issues preview 3','Who its for section','Testimonials readers','Subscribe CTA'] },
  // Sections (12)
  { id:'section-hero-animated', title:'Hero \u05de\u05d5\u05e0\u05e4\u05e9', titleEn:'Animated Hero Section', category:'sections', tags:['hero','animated','particles'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['Particle dots background CSS','Headline with typewriter effect','2 CTA buttons','Badge pill'] },
  { id:'section-pricing', title:'Pricing \u05e2\u05dd Toggle', titleEn:'Pricing Section', category:'sections', tags:['pricing','toggle','cards'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Monthly/yearly toggle switch','3 pricing cards side by side','Feature comparison checkmarks','CTA per plan'] },
  { id:'section-testimonials', title:'Testimonials Slider', titleEn:'Testimonials Section', category:'sections', tags:['testimonials','reviews','social-proof'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Infinite marquee review cards','Star ratings','Avatar + name + company'] },
  { id:'section-features-bento', title:'Features Bento Grid', titleEn:'Features Bento Grid', category:'sections', tags:['features','bento','grid'], difficulty:'\u05de\u05ea\u05e7\u05d3\u05dd', sections:['CSS grid bento layout varying sizes','Animated feature cards with icons','Hover effects','5-6 cards'] },
  { id:'section-cta', title:'CTA \u05de\u05e0\u05e6\u05d7', titleEn:'High-Converting CTA', category:'sections', tags:['cta','conversion','email'], difficulty:'\u05e7\u05dc', sections:['Gradient background','Big headline','Sub-headline','Email input + submit button','Social proof small'] },
  { id:'section-faq', title:'FAQ \u05d0\u05d9\u05e0\u05d8\u05e8\u05e7\u05d8\u05d9\u05d1\u05d9', titleEn:'Interactive FAQ', category:'sections', tags:['faq','accordion','questions'], difficulty:'\u05e7\u05dc', sections:['Accordion with smooth animation','5 questions expand/collapse','Optional search input'] },
  { id:'section-logo-marquee', title:'Logo Marquee', titleEn:'Logo Marquee', category:'sections', tags:['logos','clients','marquee'], difficulty:'\u05e7\u05dc', sections:['Infinite scroll logos CSS animation','Grayscale by default','Color on hover'] },
  { id:'section-stats', title:'Stats Counter', titleEn:'Stats / Numbers Section', category:'sections', tags:['stats','numbers','counter'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Animated count-up JS','4 stat cards','Icon per stat'] },
  { id:'section-navbar', title:'Navbar \u05de\u05ea\u05e7\u05d3\u05dd', titleEn:'Advanced Navbar', category:'sections', tags:['navbar','navigation','sticky'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Sticky on scroll','Blur background','Mega menu dropdown','Mobile hamburger','CTA button'] },
  { id:'section-footer', title:'Footer \u05de\u05dc\u05d0', titleEn:'Full Footer', category:'sections', tags:['footer','links','newsletter'], difficulty:'\u05e7\u05dc', sections:['Logo + tagline','Links columns','Newsletter signup','Social icons','Legal copyright'] },
  { id:'section-how-it-works', title:'How It Works', titleEn:'How It Works Section', category:'sections', tags:['process','steps','timeline'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['3 steps with connecting line CSS','Numbered circles','Icons','Descriptions animated reveal'] },
  { id:'section-contact', title:'Contact Form', titleEn:'Contact Section', category:'sections', tags:['contact','form','map'], difficulty:'\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9', sections:['Split layout form left info right','Form with validation styling','Contact info phone email','Social links'] },
];

export function generateUniversalPrompt(template: Template, htmlCode: string): string {
  return `# ${template.titleEn} — Build Prompt

## מה לבנות
${template.title} — דף נחיתה מלא עם ${template.sections.length} סקשנים.
קטגוריה: ${CATEGORY_LABELS[template.category]}

## הקוד המלא
העתק את הקוד הזה **כמו שהוא** לקובץ index.html:
\`\`\`html
${htmlCode}
\`\`\`

## אם אתה ב-Next.js/React
המר את הקוד כך:
- CSS → globals.css או CSS modules
- JS → useEffect hooks
- HTML → JSX ב-page.tsx

## אם אתה ב-Lovable/Base44/v0
פשוט הדבק את הקוד ואמור: "המר את זה ל-React component עם אותו עיצוב מדויק"`;
}

export const TEMPLATES: Template[] = CONFIGS.map(t => ({
  ...t,
  previewFile: `/tpl/${t.id}/index.html`,
  prompts: {
    lovable: genLovable(t.id, t.category, t.titleEn, t.sections),
    base44: genBase44(t.id, t.category, t.title, t.sections),
    claudeCode: genClaude(t.id, t.category, t.titleEn, t.sections),
  },
}));
