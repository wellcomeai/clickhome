'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

const STATS = [
  { value: '2017', label: 'Год основания' },
  { value: '40+', label: 'Реализованных объектов' },
  { value: '3', label: 'Направления строительства' },
  { value: 'По всей России', label: 'География' },
];

export default function HeroVideo() {
  const { scrollY } = useScroll();

  const clipPath = useTransform(
    scrollY,
    [0, 600],
    ['inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)']
  );
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <motion.section
      style={{ clipPath, opacity }}
      className="sticky top-0 h-screen w-full overflow-hidden z-10"
    >
      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://pub-b1e3de631e544c69b0ad6587f740e140.r2.dev/%D0%94%D0%BE%D0%BC%20%D1%81%D0%B6%D0%B0%D1%82%D1%82%D1%82%D1%82%D1%8B%D0%B9.MP4"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Text block — shifted up to leave room for stats */}
      <div className="absolute bottom-48 md:bottom-44 left-6 md:left-20 text-white max-w-3xl z-10">
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/70 mb-5">
          Инженерия будущего
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
          Строим
          <br />
          спокойно.
          <br />
          Потому что
          <br />
          умеем.
        </h1>
        <p className="font-sans text-base md:text-lg text-white/75 mb-8 max-w-md">
          Архитектурные и модульные решения
          <br />
          для современного девелопмента
        </p>
        <a
          href="#services"
          className="inline-flex items-center gap-3 font-sans text-sm tracking-[0.15em] uppercase text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors duration-300 group"
        >
          Смотреть проекты
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      {/* Stats — bottom of screen */}
      <div className="absolute bottom-10 left-6 right-6 z-10 border-t border-white/10 pt-5">
        <div className="grid grid-cols-2 md:flex md:flex-row gap-5 md:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`md:flex-1 ${
                i < STATS.length - 1 ? 'md:border-r md:border-white/10' : ''
              } md:pr-8`}
            >
              <p className="font-serif text-3xl text-white leading-none">{stat.value}</p>
              <p className="font-sans text-[9px] uppercase tracking-[0.1em] text-white/40 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-10 right-6 md:right-12 hidden md:flex flex-col items-center gap-3 z-10">
        <span
          className="font-sans text-white/50 text-[10px] tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="relative w-px h-14 bg-white/20 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white/60"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ height: '50%' }}
          />
        </div>
      </div>
    </motion.section>
  );
}
