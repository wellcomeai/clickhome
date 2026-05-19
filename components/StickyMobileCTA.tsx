'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 300;
      const leadEl = document.getElementById('lead');
      let pastLead = false;
      if (leadEl) {
        const rect = leadEl.getBoundingClientRect();
        pastLead = rect.top < window.innerHeight * 0.6;
      }
      setVisible(scrolled && !pastLead);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed bottom-0 left-0 right-0 z-[90] md:hidden pb-safe bg-white/95 backdrop-blur-md border-t border-[#E0DFDA] px-4 py-3"
        >
          <a
            href="#lead"
            className="block w-full text-center bg-[#2A5C1A] text-white font-sans text-[12px] tracking-[0.1em] uppercase rounded-[10px] py-[14px]"
          >
            Получить КП →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
