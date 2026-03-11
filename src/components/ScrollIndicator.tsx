'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      onClick={() => {
        const featured = document.getElementById('featured');
        featured?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span
        style={{
          color: 'var(--muted)',
          fontSize: 13,
          fontFamily: "'Heebo', sans-serif",
        }}
      >
        גלול לגלות
      </span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M4 7L10 13L16 7"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}
