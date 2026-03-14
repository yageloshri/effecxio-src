import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/mobile/MobileBottomNav';

export const metadata: Metadata = {
  title: 'Effecxio — ספריית אפקטים לאתרים',
  description: 'כל האפקטים שיהפכו את האתר שלך לבלתי נשכח',
  openGraph: { title: 'Effecxio', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <base href="/" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var b=document.querySelector('base');if(b)b.href='/';})()` }} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Heebo:wght@300;400;700;900&display=swap"
        />
      </head>
      <body>
        <div className="desktop-only">
          <Header />
        </div>
        {children}
        <div className="mobile-only">
          <MobileBottomNav />
        </div>
      </body>
    </html>
  );
}
