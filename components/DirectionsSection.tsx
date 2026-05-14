'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from 'framer-motion';

type ModalKey = 'mops' | 'spa' | 'residential';

type ModalData = {
  title: string;
  tagline: string;
  description: string;
  stats: { value: string; label: string }[];
  bullets?: string[];
  technologies?: { icon: string; label: string }[];
  cta: string;
  image: string;
};

const CARDS = [
  {
    key: 'mops' as ModalKey,
    number: '01',
    title: 'Быстровозводимые здания',
    desc: 'МОПс — собственное производство. Полный цикл от проекта до сдачи объекта.',
    tag: 'Госзаказы',
    gradient: 'linear-gradient(135deg, #2a3018, #4a5a28)',
    image:
      'https://pub-b1e3de631e544c69b0ad6587f740e140.r2.dev/%D0%9C%D0%9E%D0%9F%D0%A1.jpg',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 14h14M2 14V7l6-5 6 5v7M6 14v-4h4v4" />
      </svg>
    ),
  },
  {
    key: 'spa' as ModalKey,
    number: '02',
    title: 'SPA и банные комплексы',
    desc: 'Премиальные оздоровительные пространства. Кейс — отель History, Иркутск.',
    tag: 'Премиум',
    gradient: 'linear-gradient(135deg, #1a2a2a, #2a4a4a)',
    image:
      'https://pub-b1e3de631e544c69b0ad6587f740e140.r2.dev/%D0%A1%D0%9F%D0%90.jpg',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2C8 2 4 6 4 9.5a4 4 0 0 0 8 0C12 6 8 2 8 2z" />
      </svg>
    ),
  },
  {
    key: 'residential' as ModalKey,
    number: '03',
    title: 'Жилые комплексы',
    desc: 'Любая технология под ваш бюджет: каркас, кирпич, металлокаркас, брус.',
    tag: 'Под бюджет',
    gradient: 'linear-gradient(135deg, #1a1818, #3a2a1a)',
    image:
      'https://pub-b1e3de631e544c69b0ad6587f740e140.r2.dev/%D0%96%D0%B8%D0%BB%D0%BE%D0%B9.jpg',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="4" width="14" height="10" rx="1" />
        <path d="M4 4V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1" />
        <path d="M5 8h2M9 8h2M5 11h2M9 11h2" />
      </svg>
    ),
  },
];

const MODAL_DATA: Record<ModalKey, ModalData> = {
  mops: {
    title: 'Быстровозводимые здания',
    tagline: 'Модульные здания собственного производства',
    description:
      'МОПс — быстровозводимые модульные здания собственного производства ClickHome. Мы проектируем, изготавливаем и монтируем автономные архитектурные системы для государственных заказчиков. Полный цикл от проекта до сдачи объекта под ключ.',
    stats: [
      { value: '28', label: 'объектов · 2024' },
      { value: '7 лет', label: 'опыта' },
      { value: '50', label: 'план 2026' },
    ],
    bullets: [
      'Собственное производство — контроль качества на каждом этапе',
      'Срок ввода в эксплуатацию от 3 месяцев',
      'Полный пакет разрешительной документации',
      'Автономная инженерная инфраструктура',
      'Масштабируемость — модульная архитектура под любую задачу',
    ],
    cta: 'Обсудить МОПс-проект →',
    image:
      'https://pub-b1e3de631e544c69b0ad6587f740e140.r2.dev/%D0%9C%D0%9E%D0%9F%D0%A1.jpg',
  },
  spa: {
    title: 'SPA и банные комплексы',
    tagline: 'Премиальные оздоровительные пространства',
    description:
      'Уникальный SPA-комплекс на 6 этаже отеля History в центре Иркутска. Этаж был дополнительно надстроен под SPA-инфраструктуру с нуля. Сложные инженерные решения и интеграция в структуру действующего отеля.',
    stats: [
      { value: '420 кв.м', label: 'площадь' },
      { value: '6-й этаж', label: 'надстройка' },
      { value: 'Иркутск', label: 'город' },
    ],
    bullets: [
      'Интеграция SPA-зоны в структуру действующего объекта',
      'Сложные инженерные решения и надстройка уровня',
      'Премиальная архитектура, атмосфера и приватность',
      'Полный цикл — проект, строительство, оснащение',
    ],
    cta: 'Обсудить SPA-проект →',
    image:
      'https://pub-b1e3de631e544c69b0ad6587f740e140.r2.dev/%D0%A1%D0%9F%D0%90.jpg',
  },
  residential: {
    title: 'Жилые комплексы',
    tagline: 'Любая технология под ваш бюджет',
    description:
      'Строим современные жилые пространства под любую строительную технологию и бюджет. Каркасные дома, кирпич, металлокаркас или клеёный брус — полный цикл от проекта до ключей.',
    stats: [
      { value: '800 кв.м', label: 'до площади' },
      { value: '4+', label: 'технологии' },
      { value: 'Под ключ', label: 'формат' },
    ],
    technologies: [
      { icon: '⬛', label: 'Каркасные технологии' },
      { icon: '🧱', label: 'Камень и кирпич' },
      { icon: '⚙️', label: 'Металлокаркас' },
      { icon: '🪵', label: 'Клеёный брус' },
    ],
    cta: 'Обсудить проект жилья →',
    image:
      'https://pub-b1e3de631e544c69b0ad6587f740e140.r2.dev/%D0%96%D0%B8%D0%BB%D0%BE%D0%B9.jpg',
  },
};

const cardVariants: Record<ModalKey, Variants> = {
  mops: {
    hidden: { x: -120, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  spa: {
    hidden: { y: -120, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  residential: {
    hidden: { x: 120, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
};

type Card = (typeof CARDS)[number];

function DirectionCard({
  card,
  index,
  isInView,
  onOpen,
}: {
  card: Card;
  index: number;
  isInView: boolean;
  onOpen: () => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const photoX = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });
  const photoY = useSpring(useTransform(mouseY, [-1, 1], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });
  const photoScale = useMotionValue(1);
  const photoScaleSpring = useSpring(photoScale, {
    stiffness: 150,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-4, 4]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [4, -4]), {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
    photoScale.set(1.06);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    photoScale.set(1);
  };

  return (
    <motion.div
      data-cursor="card"
      variants={cardVariants[card.key]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="bg-white border border-[#E0DFDA] rounded-[16px] overflow-hidden cursor-pointer flex flex-col h-full min-h-[380px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
    >
      <div
        className="relative flex-1 min-h-[200px] overflow-hidden"
        style={{ background: card.gradient }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            x: photoX,
            y: photoY,
            scale: photoScaleSpring,
          }}
        >
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        <div className="relative z-[1] flex flex-col justify-between h-full p-5">
          <div className="flex justify-end">
            <div
              className="w-7 h-7 flex items-center justify-center rounded-[8px]"
              style={{
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            >
              {card.icon}
            </div>
          </div>

          <p className="font-sans text-[9px] tracking-[0.2em] text-white/70">
            {card.number}
          </p>
        </div>
      </div>

      <div className="p-[14px_14px_16px]">
        <h3 className="font-serif text-[17px] text-[#1C1C1C] leading-tight mb-2">
          {card.title}
        </h3>

        <p className="font-sans text-[11px] text-[#6B6B6B] leading-relaxed mb-4">
          {card.desc}
        </p>

        <div className="flex items-center justify-between">
          <span
            className="font-sans text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(42,92,26,0.08)',
              color: '#2A5C1A',
            }}
          >
            {card.tag}
          </span>

          <span className="text-[#6B6B6B] text-base">→</span>
        </div>
      </div>
    </motion.div>
  );
}

function DirectionModal({
  modalKey,
  onClose,
}: {
  modalKey: ModalKey;
  onClose: () => void;
}) {
  const data = MODAL_DATA[modalKey];

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-white flex flex-col overflow-hidden"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 20 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.15}
      dragSnapToOrigin
      onDragEnd={(_, info) => {
        if (info.offset.y > 80) {
          onClose();
        }
      }}
    >
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-4 bg-white"
        style={{ borderBottom: '0.5px solid #E0DFDA' }}
      >
        <h2 className="font-serif text-[20px] md:text-[22px] text-[#1C1C1C]">
          {data.title}
        </h2>

        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full text-[#1C1C1C] hover:bg-[#F4F3EF] transition-colors flex-shrink-0"
          style={{ border: '0.5px solid #E0DFDA' }}
          aria-label="Закрыть"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="relative w-full" style={{ height: '55vh' }}>
          <Image
            src={data.image}
            alt={data.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <p className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-white/70">
              {data.title}
            </p>
          </div>
        </div>

        <div className="px-6 md:px-10 py-8 md:py-10 max-w-[920px] mx-auto pb-safe">
          <h3 className="font-serif text-[28px] md:text-[40px] text-[#1C1C1C] leading-[1.1] mb-6">
            {data.tagline}
          </h3>

          <p className="font-sans text-[14px] md:text-[15px] text-[#6B6B6B] leading-relaxed mb-10 max-w-2xl">
            {data.description}
          </p>

          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
            {data.stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#F4F3EF] rounded-[12px] p-4 md:p-5 text-center"
              >
                <p className="font-serif text-xl md:text-3xl text-[#1C1C1C] leading-tight">
                  {s.value}
                </p>
                <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mt-1.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {data.bullets && (
            <ul className="flex flex-col gap-3 mb-10">
              {data.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-sans text-[13px] md:text-[14px] text-[#1C1C1C] leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A5C1A] flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {data.technologies && (
            <div className="mb-10">
              <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">
                Технологии
              </p>
              <div className="grid grid-cols-2 gap-3">
                {data.technologies.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-3 bg-[#F4F3EF] rounded-[10px] px-4 py-3.5"
                  >
                    <span className="text-lg">{t.icon}</span>
                    <span className="font-sans text-[13px] text-[#1C1C1C]">
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <a
            href="#lead"
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-[#1C1C1C] text-white font-sans text-[11px] tracking-[0.12em] uppercase rounded-[12px] px-6 py-3.5 hover:opacity-85 transition-opacity"
          >
            {data.cta}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function DirectionsSection() {
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [openModal]);

  useEffect(() => {
    if (!openModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenModal(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openModal]);

  return (
    <section
      id="services"
      className="relative z-20 bg-[#F4F3EF] min-h-screen flex flex-col justify-center py-16 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-content mx-auto w-full">
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B] mb-12">
          Направления
        </p>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ perspective: '1000px' }}
        >
          {CARDS.map((card, index) => (
            <DirectionCard
              key={card.key}
              card={card}
              index={index}
              isInView={isInView}
              onOpen={() => setOpenModal(card.key)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openModal && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-black/70 z-[55] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenModal(null)}
            />
            <DirectionModal
              key="modal"
              modalKey={openModal}
              onClose={() => setOpenModal(null)}
            />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
