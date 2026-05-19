'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TELEGRAM_URL } from '@/lib/config';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function IconTelegram() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M21.94 4.21c.32-1.32-.49-1.86-1.34-1.54L2.86 9.6c-1.26.49-1.24 1.2-.21 1.52l4.59 1.43 10.65-6.71c.5-.33.96-.15.58.18L9.85 14.04l-.33 4.71c.5 0 .72-.22.98-.48l2.36-2.28 4.89 3.6c.9.5 1.54.24 1.77-.83l3.2-15.05.22.5z" />
    </svg>
  );
}

export default function TelegramButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[80] w-14 h-14 rounded-full bg-[#2AABEE] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        >
          <IconTelegram />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
