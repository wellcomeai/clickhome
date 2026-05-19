'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export interface LightboxPhoto {
  src: string;
  alt: string;
}

interface LightboxProps {
  photos: LightboxPhoto[];
  initialIndex: number;
  onClose: () => void;
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
function IconChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const len = photos.length;

  const go = useCallback(
    (next: number) => {
      const n = ((next % len) + len) % len;
      setIndex(n);
    },
    [len],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'ArrowRight') go(index + 1);
    };
    window.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [go, index, onClose]);

  const photo = photos[index];

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="absolute top-4 right-4 md:top-6 md:right-6 font-sans text-[11px] tracking-[0.18em] text-white/85 bg-black/35 backdrop-blur-sm rounded-full px-3 py-1.5 z-10">
          {String(index + 1).padStart(2, '0')} / {String(len).padStart(2, '0')}
        </div>

        <button
          type="button"
          aria-label="Закрыть"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 rounded-full bg-white/95 text-[#1C1C1C] shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-10"
        >
          <IconClose />
        </button>

        <button
          type="button"
          aria-label="Предыдущее"
          onClick={(e) => {
            e.stopPropagation();
            go(index - 1);
          }}
          className="absolute top-1/2 -translate-y-1/2 left-3 md:left-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-10"
        >
          <IconChevronLeft />
        </button>
        <button
          type="button"
          aria-label="Следующее"
          onClick={(e) => {
            e.stopPropagation();
            go(index + 1);
          }}
          className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-10"
        >
          <IconChevronRight />
        </button>

        <motion.div
          key={index}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] max-w-[90vw] w-full h-full flex items-center justify-center"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
