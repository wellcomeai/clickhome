'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export type MediaItem =
  | { type: 'video'; src: string; poster?: string }
  | { type: 'image'; src: string; alt: string };

export interface MediaCarouselProps {
  items: MediaItem[];
  className?: string;
  autoRotate?: boolean;
  intervalMs?: number;
}

function sortItems(items: MediaItem[]): MediaItem[] {
  const videos: MediaItem[] = [];
  const images: MediaItem[] = [];
  for (const it of items) {
    if (it.type === 'video') videos.push(it);
    else images.push(it);
  }
  return [...videos, ...images];
}

export default function MediaCarousel({
  items,
  className,
  autoRotate = true,
  intervalMs = 5000,
}: MediaCarouselProps) {
  const sorted = useMemo(() => sortItems(items), [items]);
  const len = sorted.length;
  const [active, setActive] = useState(0);
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    sorted.forEach((it, i) => {
      if (it.type === 'image') {
        const img = new window.Image();
        img.src = it.src;
        img.onload = () => {
          if (cancelled) return;
          if (img.naturalWidth && img.naturalHeight) {
            setRatios((r) => ({ ...r, [i]: img.naturalWidth / img.naturalHeight }));
          }
        };
      } else {
        const v = document.createElement('video');
        v.preload = 'metadata';
        v.muted = true;
        v.src = it.src;
        const onMeta = () => {
          if (cancelled) return;
          if (v.videoWidth && v.videoHeight) {
            setRatios((r) => ({ ...r, [i]: v.videoWidth / v.videoHeight }));
          }
        };
        v.addEventListener('loadedmetadata', onMeta);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [sorted]);

  const go = useCallback(
    (next: number) => {
      if (len === 0) return;
      const n = ((next % len) + len) % len;
      setActive(n);
    },
    [len],
  );

  useEffect(() => {
    if (!autoRotate || paused || len <= 1) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % len);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [autoRotate, paused, len, intervalMs]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i !== active && !v.paused) v.pause();
    });
  }, [active]);

  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -300) go(active + 1);
    else if (info.offset.x > 50 || info.velocity.x > 300) go(active - 1);
  };

  const activeRatio = ratios[active] ?? 4 / 3;

  return (
    <div
      tabIndex={0}
      aria-roledescription="carousel"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(active + 1);
        if (e.key === 'ArrowLeft') go(active - 1);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      className={`relative w-full select-none outline-none ${className ?? ''}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        onPanEnd={onPanEnd}
        className="relative mx-auto w-[82vw] md:w-[62vw] max-w-[640px]"
        animate={{ aspectRatio: activeRatio }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {sorted.map((it, i) => {
          const off = i - active;
          const abs = Math.abs(off);
          const x = off === 0 ? '0%' : `${off * 62}%`;
          const scale = off === 0 ? 1 : abs === 1 ? 0.82 : 0.7;
          const blur = off === 0 ? 0 : abs === 1 ? 3 : 6;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.75 : 0;
          const z = off === 0 ? 30 : abs === 1 ? 20 : 10;

          return (
            <motion.div
              key={`${it.type}-${it.src}`}
              className={`absolute inset-0 rounded-2xl overflow-hidden bg-black ${
                off === 0 ? '' : 'cursor-pointer'
              }`}
              style={{
                zIndex: z,
                pointerEvents: abs <= 1 ? 'auto' : 'none',
              }}
              animate={{ x, scale, filter: `blur(${blur}px)`, opacity }}
              transition={{ duration: 0.55, ease: EASE }}
              onClick={() => off !== 0 && go(i)}
              aria-hidden={off !== 0}
            >
              {it.type === 'image' ? (
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes="(min-width: 768px) 62vw, 82vw"
                  className="object-cover pointer-events-none"
                  priority={i === 0}
                  draggable={false}
                />
              ) : off !== 0 && it.poster ? (
                <Image
                  src={it.poster}
                  alt="video preview"
                  fill
                  sizes="(min-width: 768px) 62vw, 82vw"
                  className="object-cover pointer-events-none"
                  draggable={false}
                />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={it.src}
                  poster={it.poster}
                  controls={off === 0}
                  playsInline
                  preload="auto"
                  style={{ pointerEvents: off === 0 ? 'auto' : 'none' }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {len > 1 && (
        <>
          <button
            type="button"
            aria-label="Предыдущее"
            onClick={() => go(active - 1)}
            className="absolute top-1/2 -translate-y-1/2 left-2 md:left-6 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center z-40 hover:scale-105 transition-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Следующее"
            onClick={() => go(active + 1)}
            className="absolute top-1/2 -translate-y-1/2 right-2 md:right-6 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center z-40 hover:scale-105 transition-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <div className="mt-5 flex justify-center gap-1.5">
            {sorted.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`К слайду ${i + 1}`}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? 'w-5 bg-[#1C1C1C]' : 'w-1.5 bg-[#1C1C1C]/30'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
