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

const MODAL_TITLES: Record<ModalKey, string> = {
  mops: 'Быстровозводимые здания',
  spa: 'SPA и банные комплексы',
  residential: 'Жилые комплексы',
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

function ModalContent({
  modalKey,
  onClose,
}: {
  modalKey: ModalKey;
  onClose: () => void;
}) {
  if (modalKey === 'mops') {
    return (
      <div className="p-6 md:p-8">
        <div
          className="h-40 rounded-xl mb-6 flex items-end p-4"
          style={{ background: 'linear-gradient(135deg, #2a3018, #4a5a28)' }}
        >
          <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/50">
            Объект МОПс · собственное производство
          </p>
        </div>

        <p className="font-sans text-[13px] text-[#6B6B6B] leading-relaxed mb-6">
          МОПс — быстровозводимые модульные здания собственного производства
          ClickHome. Мы проектируем, изготавливаем и монтируем автономные
          архитектурные системы для государственных заказчиков. Полный цикл от
          проекта до сдачи объекта под ключ.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { value: '28', label: 'объектов 2024' },
            { value: '7 лет', label: 'опыта' },
            { value: '50', label: 'план 2026' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#F4F3EF] rounded-[10px] p-3 text-center"
            >
              <p className="font-serif text-xl text-[#1C1C1C]">{s.value}</p>

              <p className="font-sans text-[9px] uppercase tracking-[0.1em] text-[#6B6B6B] mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <ul className="flex flex-col gap-3 mb-6">
          {[
            'Собственное производство — контроль качества на каждом этапе',
            'Срок ввода в эксплуатацию от 3 месяцев',
            'Полный пакет разрешительной документации',
            'Автономная инженерная инфраструктура',
            'Масштабируемость — модульная архитектура под любую задачу',
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 font-sans text-[12px] text-[#1C1C1C] leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2A5C1A] flex-shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>

        <a
          href="#lead"
          onClick={onClose}
          className="inline-flex items-center gap-2 bg-[#1C1C1C] text-white font-sans text-[11px] tracking-[0.12em] uppercase rounded-[10px] px-5 py-3 hover:opacity-85 transition-opacity"
        >
          Обсудить МОПс-проект →
        </a>
      </div>
    );
  }

  if (modalKey === 'spa') {
    return (
      <div className="p-6 md:p-8">
        <div
          className="h-40 rounded-xl mb-6 flex items-end p-4"
          style={{ background: 'linear-gradient(135deg, #1a2a2a, #2a4a4a)' }}
        >
          <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/50">
            SPA-комплекс · отель History · Иркутск
          </p>
        </div>

        <p className="font-sans text-[13px] text-[#6B6B6B] leading-relaxed mb-6">
          Уникальный SPA-комплекс на 6 этаже отеля History в центре Иркутска.
          Этаж был дополнительно надстроен под SPA-инфраструктуру с нуля.
          Сложные инженерные решения и интеграция в структуру действующего
          отеля.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { value: '420', label: 'кв.м' },
            { value: '6', label: 'этаж' },
            { value: 'Иркутск', label: 'город' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#F4F3EF] rounded-[10px] p-3 text-center"
            >
              <p className="font-serif text-xl text-[#1C1C1C]">{s.value}</p>

              <p className="font-sans text-[9px] uppercase tracking-[0.1em] text-[#6B6B6B] mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-[8px] flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, #1a2a2a, #2a4a4a)',
                opacity: 0.6 + i * 0.06,
              }}
            >
              <p className="font-sans text-[9px] text-white/50">
                Фото {i + 1}
              </p>
            </div>
          ))}
        </div>

        <ul className="flex flex-col gap-3 mb-6">
          {[
            'Интеграция SPA-зоны в структуру действующего объекта',
            'Сложные инженерные решения и надстройка уровня',
            'Премиальная архитектура, атмосфера и приватность',
            'Полный цикл — проект, строительство, оснащение',
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 font-sans text-[12px] text-[#1C1C1C] leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2A5C1A] flex-shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>

        <a
          href="#lead"
          onClick={onClose}
          className="inline-flex items-center gap-2 bg-[#1C1C1C] text-white font-sans text-[11px] tracking-[0.12em] uppercase rounded-[10px] px-5 py-3 hover:opacity-85 transition-opacity"
        >
          Обсудить SPA-проект →
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div
        className="h-40 rounded-xl mb-6 flex items-end p-4"
        style={{ background: 'linear-gradient(135deg, #1a1818, #3a2a1a)' }}
      >
        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/50">
          Жилые комплексы · любая технология
        </p>
      </div>

      <p className="font-sans text-[13px] text-[#6B6B6B] leading-relaxed mb-6">
        Строим современные жилые пространства под любую строительную технологию
        и бюджет. Каркасные дома, кирпич, металлокаркас или клеёный брус —
        полный цикл от проекта до ключей.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: '800', label: 'кв.м' },
          { value: '4+', label: 'технологии' },
          { value: 'Под ключ', label: 'формат' },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#F4F3EF] rounded-[10px] p-3 text-center"
          >
            <p className="font-serif text-xl text-[#1C1C1C]">{s.value}</p>

            <p className="font-sans text-[9px] uppercase tracking-[0.1em] text-[#6B6B6B] mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#6B6B6B] mb-3">
          Технологии
        </p>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '⬛', label: 'Каркасные технологии' },
            { icon: '🧱', label: 'Камень и кирпич' },
            { icon: '⚙️', label: 'Металлокаркас' },
            { icon: '🪵', label: 'Клеёный брус' },
          ].map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-2 bg-[#F4F3EF] rounded-[8px] px-3 py-2.5"
            >
              <span className="text-base">{t.icon}</span>

              <span className="font-sans text-[12px] text-[#1C1C1C]">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#lead"
        onClick={onClose}
        className="inline-flex items-center gap-2 bg-[#1C1C1C] text-white font-sans text-[11px] tracking-[0.12em] uppercase rounded-[10px] px-5 py-3 hover:opacity-85 transition-opacity"
      >
        Обсудить проект жилья →
      </a>
    </div>
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
              className="fixed inset-0 bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenModal(null)}
            />

            <motion.div
              className="fixed z-50 bg-white overflow-hidden inset-x-0 bottom-0 top-[44px] rounded-t-[24px] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:bottom-0 md:w-full md:max-w-[640px] md:top-auto md:max-h-[90vh] md:rounded-t-[24px]"
              style={{ border: '0.5px solid rgba(0,0,0,0.12)' }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setOpenModal(null);
                }
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-[#E0DFDA]" />
              </div>

              <div
                className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '0.5px solid #E0DFDA' }}
              >
                <h2 className="font-serif text-[22px] text-[#1C1C1C]">
                  {MODAL_TITLES[openModal]}
                </h2>

                <button
                  onClick={() => setOpenModal(null)}
                  className="w-7 h-7 flex items-center justify-center rounded-[8px] font-sans text-sm text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors flex-shrink-0"
                  style={{ border: '0.5px solid #E0DFDA' }}
                  aria-label="Закрыть"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto h-full pb-safe">
                <ModalContent
                  modalKey={openModal}
                  onClose={() => setOpenModal(null)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
