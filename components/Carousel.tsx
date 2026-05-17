'use client';
import { useEffect, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export interface CarouselProps {
  items: { src: string; alt: string }[];
}

export default function Carousel({ items }: CarouselProps) {
  const [active, setActive] = useState(0);
  const [ratio, setRatio] = useState(4 / 3);

  useEffect(() => {
    if (!items[0]) return;
    const img = new window.Image();
    img.src = items[0].src;
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setRatio(img.naturalWidth / img.naturalHeight);
      }
    };
  }, [items]);

  const go = (next: number) => {
    if (next < 0 || next >= items.length) return;
    setActive(next);
  };

  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -300) go(active + 1);
    else if (info.offset.x > 50 || info.velocity.x > 300) go(active - 1);
  };

  return (
    <div
      tabIndex={0}
      aria-roledescription="carousel"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(active + 1);
        if (e.key === 'ArrowLeft') go(active - 1);
      }}
      className="relative w-full select-none outline-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        onPanEnd={onPanEnd}
        className="relative mx-auto w-[78vw] md:w-[60vw] max-w-[720px]"
        style={{ aspectRatio: ratio }}
      >
        {items.map((it, i) => {
          const off = i - active;
          const abs = Math.abs(off);
          const x = off === 0 ? '0%' : `${off * 62}%`;
          const scale = off === 0 ? 1 : abs === 1 ? 0.85 : 0.7;
          const blur = off === 0 ? 0 : abs === 1 ? 3 : 6;
          const opacity = abs <= 1 ? (off === 0 ? 1 : 0.85) : 0;
          const z = off === 0 ? 30 : abs === 1 ? 20 : 10;
          return (
            <motion.div
              key={it.src}
              className={`absolute left-1/2 top-0 -translate-x-1/2 w-full rounded-2xl overflow-hidden ${off === 0 ? '' : 'cursor-pointer'}`}
              style={{
                aspectRatio: ratio,
                zIndex: z,
                pointerEvents: abs <= 1 ? 'auto' : 'none',
              }}
              animate={{ x, scale, filter: `blur(${blur}px)`, opacity }}
              transition={{ duration: 0.55, ease: EASE }}
              onClick={() => off !== 0 && go(i)}
              aria-hidden={off !== 0}
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(min-width: 768px) 60vw, 78vw"
                className="object-cover pointer-events-none"
                priority={i === 0}
                draggable={false}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <button
        type="button"
        aria-label="Предыдущее"
        onClick={() => go(active - 1)}
        disabled={active === 0}
        className="absolute top-1/2 -translate-y-1/2 left-2 md:left-6 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none z-40 hover:scale-105 transition-transform"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Следующее"
        onClick={() => go(active + 1)}
        disabled={active === items.length - 1}
        className="absolute top-1/2 -translate-y-1/2 right-2 md:right-6 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none z-40 hover:scale-105 transition-transform"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
