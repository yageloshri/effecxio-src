import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Effects Lab — ספריית אפקטים לאתרים',
  description: 'כל האפקטים שיהפכו את האתר שלך לבלתי נשכח',
  openGraph: { title: 'Effects Lab', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
