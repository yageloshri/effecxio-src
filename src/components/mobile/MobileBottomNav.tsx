'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const PAGES = ['/', '/effects', '/templates', '/icons', '/fonts'];

const NAV_ITEMS = [
  {
    href: '/', label: 'בית',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    href: '/effects', label: 'אפקטים',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20"/><path d="M2 12h20"/></svg>,
  },
  {
    href: '/templates', label: 'תבניות',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
  },
  {
    href: '/icons', label: 'אייקונים',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  },
  {
    href: '/fonts', label: 'פונטים',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>,
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Edge-swipe navigation
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let isEdgeSwipe = false;
    let isInsideScrollable = false;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      const sw = window.innerWidth;
      isEdgeSwipe = startX <= 30 || startX >= sw - 30;
      isInsideScrollable = !!(e.target as Element)?.closest?.('[data-scroll-horizontal]');
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isEdgeSwipe || isInsideScrollable) return;
      const diffX = Math.abs(e.touches[0].clientX - startX);
      const diffY = Math.abs(e.touches[0].clientY - startY);
      if (diffX > diffY && diffX > 20) e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isEdgeSwipe || isInsideScrollable) return;
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) < 60) return;
      const idx = PAGES.indexOf(pathname);
      if (idx === -1) return;
      // RTL: swipe right = next, swipe left = prev
      if (diff > 0 && idx < PAGES.length - 1) router.push(PAGES[idx + 1]);
      else if (diff < 0 && idx > 0) router.push(PAGES[idx - 1]);
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [pathname, router]);

  return (
    <nav className="mobile-bottom-nav" role="navigation" aria-label="ניווט ראשי">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
