'use client';

import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PreviewStateContext } from '@/context/PreviewStateContext';
import FilmGrain from '@/components/home/FilmGrain';
import Hero from '@/components/Hero';
import DevTestimonials from '@/components/DevTestimonials';
import SpotlightCard from '@/components/home/SpotlightCard';
import HowItWorks from '@/components/home/HowItWorks';
import CountUp from '@/components/home/CountUp';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/useIsMobile';

/* ── Lazy preview components for Section 5 ── */
const AuroraPreview = lazy(() => import('@/components/previews/AuroraPreview'));
const GlitchPreview = lazy(() => import('@/components/previews/GlitchPreview'));
const MagneticPreview = lazy(() => import('@/components/previews/MagneticPreview'));
const ParticlesbgPreview = lazy(() => import('@/components/previews/ParticlesbgPreview'));
const ParallaxPreview = lazy(() => import('@/components/previews/ParallaxPreview'));
const TiltPreview = lazy(() => import('@/components/previews/TiltPreview'));

/* ── Preview placeholder ── */
function PreviewShell() {
  return (
    <div
      style={{
        width: '100%',
        height: 220,
        borderRadius: 12,
        background: 'var(--surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 14,
      }}
    >
      טוען...
    </div>
  );
}

export default function HomePage() {
  const isMobile = useIsMobile();

  const content = (
    <>
      {!isMobile && <FilmGrain />}

      <style>{`
          @keyframes aurora-blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -40px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }
          @media (prefers-reduced-motion: reduce) {
            .aurora-blob { animation: none !important; }
          }
      `}</style>

      {/* ═══════════════ SECTION 1 — Hero + Testimonials ═══════════════ */}
      <Hero />
      <DevTestimonials />

      {/* ═══════════════ SECTION 2 — Tool Cards ═══════════════ */}
      <section style={{ background: 'var(--bg)', padding: '100px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', direction: 'rtl', textAlign: 'center' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: 12,
            }}
          >
            מה תמצאו ב-Effecxio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 16,
              color: '#fff',
              marginBottom: 48,
            }}
          >
            כל מה שצריך לבנות אתר מרשים — מאורגן, מוכן להעתקה, ועובד עם כל AI.
          </motion.p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            <SpotlightCard
              href="/effects"
              icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>}
              title="אפקטים"
              description="למעלה מ-110 אפקטי CSS ו-JS מוכנים להעתקה. אנימציות, מעברים, רקעים ועוד."
            />
            <SpotlightCard
              href="/templates"
              icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>}
              title="טמפלייטים"
              description="תבניות אתר מוכנות: Landing pages, dashboards, portfolios — העתק והתחל לבנות."
            />
            <SpotlightCard
              href="/icons"
              icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>}
              title="אייקונים"
              description="480+ אייקונים בסגנון אחיד. SVG נקי שאפשר להדביק ישר בקוד."
            />
            <SpotlightCard
              href="/fonts"
              icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>}
              title="פונטים"
              description="זוגות פונטים שעובדים יחד. עברית ואנגלית, עם הוראות שימוש."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3 — How It Works ═══════════════ */}
      <HowItWorks />

      {/* ═══════════════ SECTION 4 — Social Proof / Stats ═══════════════ */}
      <section style={{ background: 'var(--bg)', padding: '100px 32px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', direction: 'rtl', textAlign: 'center' }}>
          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              color: 'var(--text)',
              fontStyle: 'italic',
              marginBottom: 12,
              lineHeight: 1.6,
            }}
          >
            &ldquo;הכלי שחיפשתי מאז שהתחלתי לבנות עם Lovable&rdquo;
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: '#fff',
              marginBottom: 64,
            }}
          >
            — vibe coder
          </motion.p>

          {/* Stat boxes */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 20,
              marginBottom: 40,
            }}
          >
            {[
              { value: 1200, suffix: '+', label: 'אפקטים בספרייה' },
              { value: 100, suffix: '', label: 'טמפלייטים' },
              { value: 480, suffix: '', label: 'אייקונים' },
              { value: 30, suffix: '+', label: 'זוגות פונטים' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '28px 20px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 32,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: 14,
                    color: '#fff',
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Updating badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Heebo', sans-serif",
              fontSize: 13,
              color: '#fff',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'inline-block',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            מתעדכן כל שבוע
          </motion.div>
          <style>{`
            @keyframes pulse-dot {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(0.8); }
            }
          `}</style>
        </div>
      </section>

      {/* ═══════════════ SECTION 5 — Effects Teaser ═══════════════ */}
      <section style={{ background: 'var(--bg)', padding: '100px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', direction: 'rtl', textAlign: 'center' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: 12,
            }}
          >
            טעימה מהאפקטים
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 16,
              color: '#fff',
              marginBottom: 48,
            }}
          >
            כל אחד מהם מוכן להעתקה ולשימוש מיידי.
          </motion.p>

          <PreviewStateContext.Provider value="active">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 16,
              }}
            >
              {[
                { name: 'Aurora', Component: AuroraPreview },
                { name: 'Glitch', Component: GlitchPreview },
                { name: 'Magnetic', Component: MagneticPreview },
                { name: 'Particles', Component: ParticlesbgPreview },
                { name: 'Parallax', Component: ParallaxPreview },
                { name: 'Tilt', Component: TiltPreview },
              ].map(({ name, Component }) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                  }}
                >
                  <Suspense fallback={<PreviewShell />}>
                    <Component />
                  </Suspense>
                  <div
                    style={{
                      padding: '12px 16px',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 13,
                      color: '#fff',
                      borderTop: '1px solid var(--border)',
                    }}
                  >
                    {name}
                  </div>
                </motion.div>
              ))}
            </div>
          </PreviewStateContext.Provider>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link
              href="/effects"
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--accent)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              &#x2190; ראה את כל האפקטים
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 6 — Color Studio Teaser ═══════════════ */}
      <section style={{ background: 'var(--surface)', padding: '100px 32px' }}>
        <div
          style={{
            maxWidth: 700,
            margin: '0 auto',
            direction: 'rtl',
            textAlign: 'center',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: 16,
            }}
          >
            Color Studio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: '#fff',
              marginBottom: 32,
            }}
          >
            בחר מוד מוכן או בנה פלטה ידנית — וצפה בטמפלייט מתעדכן בזמן אמת.
            העתק פרומפט עם הצבעים שלך ובנה הכל בקליק.
          </motion.p>

          {/* Visual mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: 24,
              display: 'inline-block',
            }}
          >
            {/* Tab pills */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }}>
              {['Moods', 'Manual'].map((tab, i) => (
                <span
                  key={tab}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 50,
                    fontSize: 12,
                    fontFamily: "'Space Mono', monospace",
                    background: i === 0 ? 'var(--accent)' : 'var(--surface)',
                    color: i === 0 ? '#000' : '#fff',
                    fontWeight: i === 0 ? 700 : 400,
                    border: i === 0 ? 'none' : '1px solid var(--border)',
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>

            {/* Color swatches mockup */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, justifyContent: 'center' }}>
              {['#c8f53b', '#a855f7', '#38bdf8', '#ff6b6b', '#fbbf24'].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: c,
                    border: '2px solid transparent',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {['#050505', '#0a0a0a', '#1a1a1a', '#e8e8e8', '#666666'].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: c,
                    border: '1px solid var(--border)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SECTION 7 — Final CTA ═══════════════ */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '120px 32px',
          textAlign: 'center',
          direction: 'rtl',
        }}
      >
        {/* Aurora blobs */}
        <div
          className="aurora-blob"
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,245,59,0.12), transparent 70%)',
            top: '10%',
            left: '20%',
            filter: 'blur(80px)',
            animation: 'aurora-blob 12s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          className="aurora-blob"
          style={{
            position: 'absolute',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)',
            bottom: '10%',
            right: '15%',
            filter: 'blur(80px)',
            animation: 'aurora-blob 15s ease-in-out infinite reverse',
            pointerEvents: 'none',
          }}
        />
        <div
          className="aurora-blob"
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)',
            top: '40%',
            right: '40%',
            filter: 'blur(80px)',
            animation: 'aurora-blob 18s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: 'var(--text)',
              marginBottom: 24,
              background: 'linear-gradient(135deg, var(--accent) 0%, #38bdf8 50%, var(--accent2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            תבנה יפה ומהר, בלי להתפשר.
          </motion.h2>

          <style>{`
            @font-face {
              font-family: 'GveretLevin';
              src: url('/fonts/GveretLevinAlefAlefAlef-Regular.woff2') format('woff2');
              font-display: swap;
            }
            .cta-card { transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; }
            .cta-card:hover { transform: translateY(-3px); }
            .split-half {
              position: absolute; width: 100%; height: 50%; left: 0;
              display: flex; align-items: center; justify-content: center;
              background: linear-gradient(135deg, var(--accent), #a3d900);
              overflow: hidden;
              transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-radius 0.4s ease;
            }
            .split-half span { position: absolute; white-space: nowrap; font-family: 'Heebo', sans-serif; font-weight: 700; font-size: 16px; color: #000; }
            .fx-split-top { top: 0; border-radius: 14px 14px 0 0; }
            .fx-split-top span { bottom: 0; transform: translateY(50%); }
            .fx-split-bottom { top: 50%; border-radius: 0 0 14px 14px; }
            .fx-split-bottom span { top: 0; transform: translateY(-50%); }
            .cta-card-fx:hover .fx-split-top { transform: translateY(-10px) rotateX(-8deg); border-radius: 14px; }
            .cta-card-fx:hover .fx-split-bottom { transform: translateY(10px) rotateX(8deg); border-radius: 14px; }
            .split-reveal {
              position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
              color: var(--accent); font-size: 13px; font-weight: 600; font-family: 'Heebo', sans-serif;
              opacity: 0; transition: opacity 0.3s ease 0.1s; pointer-events: none;
            }
            .cta-card-fx:hover .split-reveal { opacity: 1; }
            .cta-card-fx:hover { border-color: var(--accent) !important; box-shadow: 0 0 30px rgba(200,245,59,0.15) !important; }
            .cta-card-tpl:hover { box-shadow: 0 0 30px rgba(168,85,247,0.3) !important; }
            .cta-card-ico:hover { box-shadow: 0 0 30px rgba(56,189,248,0.3) !important; }
            .cta-card-fnt:hover { box-shadow: 0 0 30px rgba(255,107,107,0.3) !important; }
            .cta-card-spc:hover { box-shadow: 0 0 30px rgba(245,158,11,0.3) !important; }
            .cta-card-lib:hover { box-shadow: 0 0 30px rgba(16,185,129,0.3) !important; }
          `}</style>

          <motion.div
            className="home-cta-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              maxWidth: 900,
              margin: '0 auto',
              direction: 'rtl',
            }}
          >
            {/* ── אפקטים — split button effect ── */}
            <Link
              href="/effects"
              className="cta-card cta-card-fx"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 72,
                borderRadius: 16,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                textDecoration: 'none',
                overflow: 'hidden',
              }}
            >
              <div className="split-half fx-split-top"><span>אפקטים</span></div>
              <div className="split-half fx-split-bottom"><span>אפקטים</span></div>
              <div className="split-reveal">✦ זו רק ההתחלה ✦</div>
            </Link>

            {/* ── תבניות — solid purple ── */}
            <Link
              href="/templates"
              className="cta-card cta-card-tpl"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 72,
                borderRadius: 16,
                border: 'none',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                textDecoration: 'none',
                overflow: 'hidden',
                gap: 10,
              }}
            >
              {/* Mini template grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '8px 8px',
                gap: 3, width: 26, height: 19,
              }}>
                <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 2, gridColumn: '1 / 3' }} />
                <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
                <div style={{ background: 'rgba(255,255,255,0.35)', borderRadius: 2 }} />
              </div>
              <span style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: 16,
                color: '#fff',
              }}>
                תבניות
              </span>
            </Link>

            {/* ── אייקונים — solid blue ── */}
            <Link
              href="/icons"
              className="cta-card cta-card-ico"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 72,
                borderRadius: 16,
                border: 'none',
                background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
                textDecoration: 'none',
                overflow: 'hidden',
                gap: 8,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" style={{ position: 'absolute', top: 10, left: 14 }}><circle cx="12" cy="12" r="10"/></svg>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" style={{ position: 'absolute', top: 12, right: 18 }}><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={{ position: 'absolute', bottom: 12, left: 24 }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
              <span style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: 16,
                color: '#fff',
              }}>
                אייקונים
              </span>
            </Link>

            {/* ── פונטים — solid red/coral ── */}
            <Link
              href="/fonts"
              className="cta-card cta-card-fnt"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 72,
                borderRadius: 16,
                border: 'none',
                background: 'linear-gradient(135deg, #ff6b6b, #ef4444)',
                textDecoration: 'none',
                overflow: 'hidden',
              }}
            >
              <span style={{
                fontFamily: "'GveretLevin', 'Heebo', sans-serif",
                fontWeight: 400, fontSize: 24,
                color: '#fff',
              }}>
                פונטים
              </span>
            </Link>

            {/* ── ספיישלים — solid amber/orange ── */}
            <Link
              href="/specials"
              className="cta-card cta-card-spc"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 72,
                borderRadius: 16,
                border: 'none',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                textDecoration: 'none',
                overflow: 'hidden',
                gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: 16,
                color: '#fff',
              }}>
                ספיישלים
              </span>
            </Link>

            {/* ── ספריות — solid emerald/green ── */}
            <Link
              href="/libraries"
              className="cta-card cta-card-lib"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 72,
                borderRadius: 16,
                border: 'none',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                textDecoration: 'none',
                overflow: 'hidden',
                gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
              </svg>
              <span style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: 16,
                color: '#fff',
              }}>
                ספריות
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );

  if (isMobile) {
    return <div className="mobile-page">{content}</div>;
  }

  return content;
}
