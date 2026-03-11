'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message?: string;
}

export default function Toast({ show, message }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50" dir="rtl">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg"
            style={{
              background: 'var(--accent)',
              color: '#000',
              fontWeight: 700,
              fontFamily: "'Space Mono', monospace",
              fontSize: 14,
            }}
          >
            <Check size={16} strokeWidth={3} />
            <span>{message ?? '\u2713 \u05D4\u05E7\u05D5\u05D3 \u05D4\u05D5\u05E2\u05EA\u05E7!'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
