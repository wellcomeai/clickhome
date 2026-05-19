'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface Photo {
  src: string;
  alt: string;
}

interface MasonryGalleryProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

function IconZoom() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}

export default function MasonryGallery({ photos, onPhotoClick }: MasonryGalleryProps) {
  return (
    <div className="columns-1 md:columns-2 gap-3 md:gap-4 [column-fill:_balance]">
      {photos.map((photo, i) => (
        <motion.button
          key={`${i}-${photo.src}`}
          type="button"
          onClick={() => onPhotoClick(i)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.08 }}
          className="group relative w-full mb-3 md:mb-4 inline-block overflow-hidden rounded-xl bg-[#1C1C1C] break-inside-avoid"
          aria-label={`Открыть фото ${i + 1}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={800}
            height={1067}
            sizes="(min-width: 768px) 40vw, 90vw"
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <IconZoom />
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
