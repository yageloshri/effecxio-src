'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LEFT_LINKS = [
  { href: '/effects', label: 'אפקטים' },
  { href: '/templates', label: 'תבניות' },
  { href: '/specials', label: 'ספיישלים' },
];

const RIGHT_LINKS = [
  { href: '/icons', label: 'אייקונים' },
  { href: '/fonts', label: 'פונטים' },
  { href: '/libraries', label: 'ספריות' },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

export default function Header() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [ready, setReady] = useState(false);
  const [beamActive, setBeamActive] = useState(false);
  const [beamFlip, setBeamFlip] = useState(false);

  const indicatorX = useMotionValue(0);
  const indicatorW = useMotionValue(0);
  const springX = useSpring(indicatorX, { stiffness: 300, damping: 30, mass: 0.8 });
  const springW = useSpring(indicatorW, { stiffness: 300, damping: 30, mass: 0.8 });

  // Beam width for the energy trail
  const beamWidth = useMotionValue(0);
  const beamOpacity = useMotionValue(0);

  const getActiveHref = useCallback(() => {
    return ALL_LINKS.find(l => pathname.startsWith(l.href))?.href || '';
  }, [pathname]);

  const measureLink = useCallback((href: string) => {
    const el = linkRefs.current.get(href);
    const nav = navRef.current;
    if (!el || !nav) return null;
    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    return {
      x: elRect.left - navRect.left + (elRect.width - 36) / 2,
      w: 36,
      center: elRect.left - navRect.left + elRect.width / 2,
    };
  }, []);

  // Position indicator on mount and pathname change
  useEffect(() => {
    const activeHref = getActiveHref();
    if (!activeHref) {
      setReady(false);
      return;
    }

    const raf = requestAnimationFrame(() => {
      const pos = measureLink(activeHref);
      if (!pos) return;

      if (!ready) {
        // First mount — snap without animation
        indicatorX.set(pos.x);
        indicatorW.set(pos.w);
        setReady(true);
      } else {
        // Route change — animate with beam
        const oldX = indicatorX.get();
        const newX = pos.x;

        if (Math.abs(oldX - newX) > 5) {
          setBeamFlip(newX < oldX);
          setBeamActive(true);

          // Animate beam trail
          const dist = Math.abs(newX - oldX);
          animate(beamWidth, dist, { duration: 0.3, ease: 'easeOut' });
          animate(beamOpacity, 1, { duration: 0.1 });

          setTimeout(() => {
            animate(beamWidth, 0, { duration: 0.25, ease: 'easeIn' });
            animate(beamOpacity, 0, { duration: 0.3, delay: 0.1 });
            setTimeout(() => setBeamActive(false), 400);
          }, 300);
        }

        indicatorX.set(newX);
        indicatorW.set(pos.w);
      }
    });

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const activeHref = getActiveHref();

  const renderLink = (link: { href: string; label: string }) => {
    const isActive = pathname.startsWith(link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        ref={(el: HTMLAnchorElement | null) => {
          if (el) linkRefs.current.set(link.href, el);
        }}
        style={{
          color: isActive ? 'var(--accent)' : '#fff',
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: isActive ? 600 : 500,
          transition: 'color 0.25s, opacity 0.2s',
          position: 'relative',
          padding: '4px 0',
        }}
        onMouseEnter={e => {
          if (!isActive) e.currentTarget.style.opacity = '0.6';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        background: 'rgba(5, 5, 5, 0.85)',
        borderBottom: '1px solid var(--border)',
        height: 64,
      }}
    >
      <div
        ref={navRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '0 32px',
          gap: '28px',
          direction: 'ltr',
          position: 'relative',
        }}
      >
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {LEFT_LINKS.map(renderLink)}
        </nav>

        <motion.a
          href="/"
          className="no-underline"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: 22,
            color: '#fff',
            letterSpacing: '-0.5px',
            textDecoration: 'none',
          }}
        >
          Effec<span style={{ color: 'var(--accent)' }}>x</span>io
        </motion.a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {RIGHT_LINKS.map(renderLink)}
        </nav>

        {/* Active indicator bar */}
        {ready && activeHref && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 3,
              borderRadius: 2,
              background: 'var(--accent)',
              x: springX,
              width: springW,
              boxShadow: '0 0 8px rgba(200,245,59,0.6), 0 0 20px rgba(200,245,59,0.3)',
            }}
          />
        )}

        {/* Energy beam trail */}
        {beamActive && activeHref && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: 1,
              height: 1,
              borderRadius: 1,
              background: 'linear-gradient(90deg, transparent, var(--accent), #fff, var(--accent), transparent)',
              opacity: beamOpacity,
              width: beamWidth,
              left: 0,
              x: springX,
              transformOrigin: beamFlip ? 'right center' : 'left center',
              filter: 'blur(1px) drop-shadow(0 0 6px rgba(200,245,59,0.8)) drop-shadow(0 0 12px rgba(200,245,59,0.4))',
              transform: beamFlip ? 'scaleX(-1)' : 'none',
            }}
          />
        )}
      </div>
    </header>
  );
}
