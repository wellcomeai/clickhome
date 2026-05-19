'use client';

import { Fragment, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Modal, { type DirectionKey } from './Modal';
import Lightbox from './Lightbox';
import MasonryGallery from './MasonryGallery';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const YC = 'https://storage.yandexcloud.net/clickhome';
const enc = (s: string) => encodeURIComponent(s);

const BVK_FOLDER = `${YC}/${enc('быстровозводимые здания')}`;
const SPA_FOLDER = `${YC}/SPA`;
const ZHK_FOLDER = `${YC}/${enc('Жилые комплексы')}`;

interface Photo {
  src: string;
  alt: string;
}

const BVK_PHOTOS: Photo[] = [
  { src: `${BVK_FOLDER}/${enc('МОПс.jpg')}`, alt: 'МОПс — объект для госзаказчиков' },
  { src: `${BVK_FOLDER}/${enc('Офисный модульный.jpg')}`, alt: 'Модульный офис' },
  { src: `${BVK_FOLDER}/${enc('офисный модульный 2.jpg')}`, alt: 'Модульный офис 2' },
  { src: `${BVK_FOLDER}/${enc('МОПс.jpg')}`, alt: 'МОПс' },
];

const SPA_PHOTOS: Photo[] = [
  'СПА.jpg',
  'Спа 2.jpg',
  'Спа 3.jpg',
  'Спа 4.jpg',
  'СПА 5.jpg',
  'спа 6.jpg',
  'СПА 7.jpg',
  'СПА 8.jpg',
].map((f, i) => ({ src: `${SPA_FOLDER}/${enc(f)}`, alt: `SPA ${i + 1}` }));

const ZHK_PHOTOS: Photo[] = [
  { src: `${ZHK_FOLDER}/${enc('Дом 111.jpg')}`, alt: 'Дом 1' },
  { src: `${ZHK_FOLDER}/${enc('дом 222.jpg')}`, alt: 'Дом 2' },
  { src: `${ZHK_FOLDER}/${enc('дом 333.jpg')}`, alt: 'Дом 3' },
  { src: `${ZHK_FOLDER}/${enc('Дом 111.jpg')}`, alt: 'Дом 4' },
];

function IconBolt() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 3v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5l8-3z" />
    </svg>
  );
}
function IconKey() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="15" r="4" />
      <path d="M10.85 12.15L19 4M16 7l3 3M14 9l3 3" />
    </svg>
  );
}
function IconPencil() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}
function IconGem() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
      <path d="M11 3L8 9l4 12 4-12-3-6" />
      <path d="M2 9h20" />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}
function IconChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

interface Advantage {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface DirectionData {
  key: DirectionKey;
  number: string;
  title: string;
  tagline: string;
  description: string;
  about: string;
  photos: Photo[];
  photoAspect: 'landscape' | 'portrait';
  advantages: Advantage[];
  phrase: { lines: string[]; accent: string };
  types: string[];
  zIndex: number;
}

const DATA: DirectionData[] = [
  {
    key: 'bvk',
    number: '01',
    title: 'БВК',
    tagline: 'Быстровозводимые модульные здания для бизнеса и государства',
    description:
      'Проектируем и возводим здания любого назначения — собственное производство полного цикла. Реализуем любой проект под запрос: от технического задания до сдачи объекта под ключ.',
    about:
      'БВК — это современные модульные здания, которые мы проектируем и строим для предприятий, логистики, социальных и административных объектов.',
    photos: BVK_PHOTOS,
    photoAspect: 'landscape',
    advantages: [
      { icon: <IconBolt />, title: 'Быстро', desc: 'Сроки возведения от 30 дней' },
      { icon: <IconShield />, title: 'Надёжно', desc: 'Соответствие ГОСТ и СНиП' },
      { icon: <IconKey />, title: 'Под ключ', desc: 'От проектирования до ввода в эксплуатацию' },
    ],
    phrase: {
      lines: ['Технологичность.', 'Скорость.', 'Надёжность.'],
      accent: 'Надёжность.',
    },
    types: [
      'Производственные здания',
      'Административные здания',
      'Складские комплексы',
      'Социальные объекты',
    ],
    zIndex: 22,
  },
  {
    key: 'spa',
    number: '02',
    title: 'SPA',
    tagline: 'Пространство для тишины и восстановления',
    description:
      'У нас есть собственное видение того, каким должно быть место для расслабления. Проектируем и строим SPA и банные комплексы с нуля: от архитектуры до оснащения.',
    about:
      'SPA — это среда, где каждая деталь работает на ощущение покоя. Мы создаём продуманные пространства премиального уровня — от концепции до сдачи под ключ.',
    photos: SPA_PHOTOS,
    photoAspect: 'portrait',
    advantages: [
      { icon: <IconPencil />, title: 'Концепция', desc: 'Авторское проектирование среды' },
      { icon: <IconGem />, title: 'Материалы', desc: 'Премиальные решения и отделка' },
      { icon: <IconKey />, title: 'Под ключ', desc: 'От архитектуры до оснащения' },
    ],
    phrase: {
      lines: ['Пространство.', 'Тишина.', 'Детали.'],
      accent: 'Детали.',
    },
    types: ['Банные комплексы', 'SPA-центры', 'Хаммамы и термы', 'Бассейны и аквазоны'],
    zIndex: 21,
  },
  {
    key: 'house',
    number: '03',
    title: 'Жильё',
    tagline: 'Любой материал. Любая технология. Под ваш проект.',
    description:
      'Строим жилые объекты из чего угодно и как угодно — под ваш бюджет, участок и пожелания. Каркасные технологии, металлоконструкции, камень, кирпич. Реализуем именно то, что нужно вам.',
    about:
      'Жильё — это персональный проект под клиента: от подбора материала и технологии до архитектурного решения и характера дома.',
    photos: ZHK_PHOTOS,
    photoAspect: 'landscape',
    advantages: [
      { icon: <IconLayers />, title: 'Любой материал', desc: 'Каркас, металл, кирпич, брус' },
      { icon: <IconGear />, title: 'Любая технология', desc: 'Подбираем под проект и участок' },
      { icon: <IconKey />, title: 'Под ключ', desc: 'От проектирования до отделки' },
    ],
    phrase: {
      lines: ['Материал.', 'Архитектура.', 'Характер.'],
      accent: 'Характер.',
    },
    types: [
      'Каркасные дома',
      'Дома из металлоконструкций',
      'Кирпич и камень',
      'Клеёный брус',
    ],
    zIndex: 20,
  },
];

function PhotoGallery({
  photos,
  aspect,
  onPhotoClick,
}: {
  photos: Photo[];
  aspect: 'landscape' | 'portrait';
  onPhotoClick: (index: number) => void;
}) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(0);
  const len = photos.length;
  const isPortrait = aspect === 'portrait';

  const mainClass = isPortrait
    ? 'aspect-[4/3] max-h-[70vh] w-full bg-[#1C1C1C]'
    : 'aspect-[16/9] bg-black';
  const thumbAspectClass = isPortrait
    ? 'aspect-[3/4] bg-[#1C1C1C]'
    : 'aspect-[16/9]';
  const fitClass = isPortrait ? 'object-contain' : 'object-cover';

  const go = (next: number) => {
    const n = ((next % len) + len) % len;
    setDir(next > active ? 1 : -1);
    setActive(n);
  };

  const thumbs = useMemo(() => photos.slice(0, 4), [photos]);

  return (
    <div className="w-full">
      {/* Mobile: horizontal scroll-snap */}
      <div className="flex md:hidden gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6">
        {photos.map((p, i) => (
          <button
            key={`m-${i}`}
            type="button"
            onClick={() => onPhotoClick(i)}
            className={`snap-start flex-shrink-0 w-[80vw] ${
              isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'
            } rounded-xl overflow-hidden ${isPortrait ? 'bg-[#1C1C1C]' : 'bg-black'}`}
            aria-label={`Открыть фото ${i + 1}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={800}
              height={isPortrait ? 1067 : 600}
              sizes="80vw"
              className={`${fitClass} w-full h-full`}
              draggable={false}
            />
          </button>
        ))}
      </div>

      {/* Desktop: slider with thumbs */}
      <div className="hidden md:block">
        <div
          className={`relative w-full ${mainClass} rounded-xl overflow-hidden cursor-zoom-in`}
          onClick={() => onPhotoClick(active)}
        >
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={active}
              custom={dir}
              initial={{ x: dir > 0 ? '6%' : '-6%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir > 0 ? '-6%' : '6%', opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={fitClass}
                priority={active === 0}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-4 right-4 md:top-5 md:right-5 font-sans text-[11px] tracking-[0.18em] text-white/85 bg-black/35 backdrop-blur-sm rounded-full px-3 py-1.5 z-10">
            {String(active + 1).padStart(2, '0')} / {String(len).padStart(2, '0')}
          </div>

          <button
            type="button"
            aria-label="Предыдущее"
            onClick={(e) => {
              e.stopPropagation();
              go(active - 1);
            }}
            className="absolute top-1/2 -translate-y-1/2 left-3 md:left-5 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-10"
          >
            <IconChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Следующее"
            onClick={(e) => {
              e.stopPropagation();
              go(active + 1);
            }}
            className="absolute top-1/2 -translate-y-1/2 right-3 md:right-5 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-10"
          >
            <IconChevronRight />
          </button>
        </div>

        <div className="mt-3 flex gap-2 md:gap-3">
          {thumbs.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDir(i > active ? 1 : -1);
                  setActive(i);
                }}
                className={`relative flex-shrink-0 ${thumbAspectClass} w-[24%] min-w-[100px] rounded-md overflow-hidden transition-all ${
                  isActive ? 'ring-2 ring-white shadow-lg' : 'opacity-80 hover:opacity-100'
                }`}
                aria-label={`Слайд ${i + 1}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="120px"
                  className={fitClass}
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const REVEAL_VIEWPORT = { once: true, margin: '-15% 0px' } as const;

function RevealText({
  text,
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(' ');

  return (
    <motion.span
      style={{ display: 'inline-block' }}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={`${i}-${word}`}>
          <motion.span
            style={{ display: 'inline-block', willChange: 'opacity, filter, transform' }}
            variants={{
              hidden: { opacity: 0, y: 8, filter: 'blur(6px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.55, ease: EASE },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.span>
  );
}

function DirectionBlock({
  data,
  onOpenForm,
  onOpenLightbox,
}: {
  data: DirectionData;
  onOpenForm: (key: DirectionKey) => void;
  onOpenLightbox: (photos: Photo[], index: number) => void;
}) {
  const isPortrait = data.photoAspect === 'portrait';
  return (
    <div className="relative w-full overflow-hidden bg-[#F4F3EF] flex flex-col">
      <div className="flex-1 max-w-content w-full mx-auto px-6 md:px-10 lg:px-16 pt-24 md:pt-28 pb-10 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-12 items-start">
        {/* Left column */}
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-serif text-[88px] md:text-[120px] lg:text-[140px] leading-[0.85] text-[#2A5C1A]"
          >
            {data.number}
          </motion.p>

          <div className="mt-8 md:mt-10">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#6B6B6B] flex items-center gap-3">
              <span className="block w-5 h-px bg-[#E0DFDA]" aria-hidden />
              Направление
            </p>
            <h2 className="font-serif text-[44px] md:text-[56px] text-[#1C1C1C] leading-[1.05] mt-3">
              <RevealText text={data.title} delay={0.15} stagger={0.06} />
            </h2>
            <p className="font-sans text-[14px] text-[#6B6B6B] leading-relaxed mt-4 max-w-[360px]">
              <RevealText text={data.tagline} delay={0.35} stagger={0.03} />
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => onOpenForm(data.key)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
            className="group mt-7 inline-flex items-center gap-3 self-start bg-[#2A5C1A] text-white font-sans text-[12px] tracking-[0.08em] rounded-[10px] px-6 py-3.5 hover:bg-[#1f4513] transition-colors"
          >
            Получить КП
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <IconArrowRight />
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
            className="mt-10 pt-7 border-t border-[#E0DFDA] grid grid-cols-3 gap-4 md:gap-6"
          >
            {data.advantages.map((a) => (
              <div key={a.title} className="flex flex-col">
                <span className="mb-3">{a.icon}</span>
                <p className="font-sans text-[13px] font-medium text-[#1C1C1C]">
                  {a.title}
                </p>
                <p className="font-sans text-[11px] text-[#6B6B6B] leading-snug mt-1.5">
                  {a.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — gallery */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="lg:pt-4"
        >
          {isPortrait ? (
            <>
              {/* Mobile: horizontal scroll-snap */}
              <div className="md:hidden">
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6">
                  {data.photos.map((p, i) => (
                    <button
                      key={`m-${i}`}
                      type="button"
                      onClick={() => onOpenLightbox(data.photos, i)}
                      className="snap-start flex-shrink-0 w-[80vw] aspect-[3/4] rounded-xl overflow-hidden bg-[#1C1C1C]"
                      aria-label={`Открыть фото ${i + 1}`}
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        width={800}
                        height={1067}
                        sizes="80vw"
                        className="object-cover w-full h-full"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              </div>
              {/* Desktop: masonry */}
              <div className="hidden md:block">
                <MasonryGallery
                  photos={data.photos}
                  onPhotoClick={(i) => onOpenLightbox(data.photos, i)}
                />
              </div>
            </>
          ) : (
            <PhotoGallery
              photos={data.photos}
              aspect={data.photoAspect}
              onPhotoClick={(i) => onOpenLightbox(data.photos, i)}
            />
          )}
        </motion.div>
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        className="max-w-content w-full mx-auto px-6 md:px-10 lg:px-16 pb-16 md:pb-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-[#E0DFDA] pt-8 md:pt-10"
      >
        <div>
          <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#6B6B6B] mb-3">
            О направлении
          </p>
          <p className="font-sans text-[13px] text-[#1C1C1C] leading-relaxed max-w-[300px]">
            {data.about}
          </p>
        </div>

        <div>
          <h3 className="font-serif text-[28px] md:text-[32px] text-[#1C1C1C] leading-[1.15]">
            {data.phrase.lines.map((line) => (
              <span
                key={line}
                className="block"
                style={line === data.phrase.accent ? { color: '#2A5C1A' } : undefined}
              >
                {line}
              </span>
            ))}
          </h3>
        </div>

        <div>
          <ul className="flex flex-col gap-2.5">
            {data.types.map((t, i) => (
              <li
                key={t}
                className="font-sans text-[13px] text-[#1C1C1C] flex items-baseline gap-3"
              >
                <span className="font-sans text-[11px] text-[#6B6B6B] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t}
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.15em] uppercase text-[#1C1C1C] border-b border-[#1C1C1C]/30 hover:border-[#1C1C1C] pb-0.5 transition-colors"
          >
            Скачать презентацию направления
            <IconDownload />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function DirectionsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<DirectionKey | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);

  const openForm = (key: DirectionKey) => {
    setActiveKey(key);
    setModalOpen(true);
  };

  const openLightbox = (photos: Photo[], index: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section id="services" className="relative">
        {DATA.map((d) => (
          <DirectionBlock
            key={d.key}
            data={d}
            onOpenForm={openForm}
            onOpenLightbox={openLightbox}
          />
        ))}
      </section>

      <Modal
        open={modalOpen}
        direction={activeKey}
        onClose={() => setModalOpen(false)}
      />

      {lightboxOpen && (
        <Lightbox
          photos={lightboxPhotos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
