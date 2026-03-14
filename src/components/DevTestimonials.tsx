'use client';

const QUOTES = [
  'חסך לי שעות של עבודה. פשוט העתקתי והדבקתי.',
  'האפקטים פה ברמה של ספריות בתשלום, בחינם.',
  'הלקוחות שלי חושבים שאני קוסם.',
  'סוף סוף אפקטים שעובדים מהקופסה בלי להתקין כלום.',
  'כל אפקט לקח לי 30 שניות להטמיע. מטורף.',
  'האתר שלי נראה כמו מיליון דולר עכשיו.',
];

function QuoteSet() {
  return (
    <>
      {QUOTES.map((quote, i) => (
        <span key={i} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
          <span
            style={{
              color: 'var(--accent)',
              margin: '0 20px',
              fontSize: 10,
            }}
          >
            ✦
          </span>
          &ldquo;{quote}&rdquo;
        </span>
      ))}
    </>
  );
}

export default function DevTestimonials() {
  return (
    <section
      style={{
        overflow: 'hidden',
        padding: '80px 0',
        direction: 'ltr',
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-10%, 0, 0); }
        }
      `}</style>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animation: 'marquee-scroll 60s linear infinite',
          willChange: 'transform',
          fontSize: 16,
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 500,
          color: '#ffffff',
        }}
      >
        {/* 10 copies — translate -10% loops one set seamlessly */}
        <QuoteSet />
        <QuoteSet />
        <QuoteSet />
        <QuoteSet />
        <QuoteSet />
        <QuoteSet />
        <QuoteSet />
        <QuoteSet />
        <QuoteSet />
        <QuoteSet />
      </div>
    </section>
  );
}
