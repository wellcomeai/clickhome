'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ModalKey = 'mops' | 'spa' | 'residential';

const CARDS = [
  {
    key: 'mops' as ModalKey,
    number: '01',
    title: 'Быстровозводимые здания',
    desc: 'МОПс — собственное производство. Полный цикл от проекта до сдачи объекта.',
    tag: 'Госзаказы',
    gradient: 'linear-gradient(135deg, #2a3018, #4a5a28)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="14" height="10" rx="1" />
        <path d="M4 4V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1" />
        <path d="M5 8h2M9 8h2M5 11h2M9 11h2" />
      </svg>
    ),
  },
];

const MODAL_CONTENT: Record<ModalKey, React.ReactNode> = {
  mops: (
    <div className="p-6 md:p-8">
      {/* Photo placeholder */}
      <div
        className="h-40 rounded-xl mb-6 flex items-end p-4"
        style={{ background: 'linear-gradient(135deg, #2a3018, #4a5a28)' }}
      >
        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/50">
          Объект МОПс · собственное производство
        </p>
      </div>

      {/* Description */}
      <p className="font-sans text-[13px] text-[#6B6B6B] leading-relaxed mb-6">
        МОПс — быстровозводимые модульные здания собственного производства ClickHome.
        Мы проектируем, изготавливаем и монтируем автономные архитектурные системы для
        государственных заказчиков. Полный цикл от проекта до сдачи объекта под ключ.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: '28', label: 'объектов 2024' },
          { value: '7 лет', label: 'опыта' },
          { value: '50', label: 'план 2026' },
        ].map((s) => (
          <div key={s.label} className="bg-[#F4F3EF] rounded-[10px] p-3 text-center">
            <p className="font-serif text-xl text-[#1C1C1C]">{s.value}</p>
            <p className="font-sans text-[9px] uppercase tracking-[0.1em] text-[#6B6B6B] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Advantages */}
      <ul className="flex flex-col gap-3 mb-6">
        {[
          'Собственное производство — контроль качества на каждом этапе',
          'Срок ввода в эксплуатацию от 3 месяцев',
          'Полный пакет разрешительной документации',
          'Автономная инженерная инфраструктура',
          'Масштабируемость — модульная архитектура под любую задачу',
        ].map((item) => (
          <li key={item} className="flex items-start gap-3 font-sans text-[12px] text-[#1C1C1C] leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A5C1A] flex-shrink-0 mt-1.5" />
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#lead"
        className="inline-flex items-center gap-2 bg-[#1C1C1C] text-white font-sans text-[11px] tracking-[0.12em] uppercase rounded-[10px] px-5 py-3 hover:opacity-85 transition-opacity"
      >
        Обсудить МОПс-проект →
      </a>
    </div>
  ),

  spa: (
    <div className="p-6 md:p-8">
      {/* Photo placeholder */}
      <div
        className="h-40 rounded-xl mb-6 flex items-end p-4"
        style={{ background: 'linear-gradient(135deg, #1a2a2a, #2a4a4a)' }}
      >
        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/50">
          SPA-комплекс · отель History · Иркутск
        </p>
      </div>

      {/* Description */}
      <p className="font-sans text-[13px] text-[#6B6B6B] leading-relaxed mb-6">
        Уникальный SPA-комплекс на 6 этаже отеля History в центре Иркутска. Этаж был
        дополнительно надстроен под SPA-инфраструктуру с нуля. Сложные инженерные
        решения и интеграция в структуру действующего отеля.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: '420', label: 'кв.м' },
          { value: '6', label: 'этаж' },
          { value: 'Иркутск', label: 'город' },
        ].map((s) => (
          <div key={s.label} className="bg-[#F4F3EF] rounded-[10px] p-3 text-center">
            <p className="font-serif text-xl text-[#1C1C1C]">{s.value}</p>
            <p className="font-sans text-[9px] uppercase tracking-[0.1em] text-[#6B6B6B] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Photo grid placeholder */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-[8px] flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, #1a2a2a, #2a4a4a)`, opacity: 0.6 + i * 0.06 }}
          >
            <p className="font-sans text-[9px] text-white/50">Фото {i + 1}</p>
          </div>
        ))}
      </div>

      {/* Advantages */}
      <ul className="flex flex-col gap-3 mb-6">
        {[
          'Интеграция SPA-зоны в структуру действующего объекта',
          'Сложные инженерные решения и надстройка уровня',
          'Премиальная архитектура, атмосфера и приватность',
          'Полный цикл — проект, строительство, оснащение',
        ].map((item) => (
          <li key={item} className="flex items-start gap-3 font-sans text-[12px] text-[#1C1C1C] leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A5C1A] flex-shrink-0 mt-1.5" />
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#lead"
        className="inline-flex items-center gap-2 bg-[#1C1C1C] text-white font-sans text-[11px] tracking-[0.12em] uppercase rounded-[10px] px-5 py-3 hover:opacity-85 transition-opacity"
      >
        Обсудить SPA-проект →
      </a>
    </div>
  ),

  residential: (
    <div className="p-6 md:p-8">
      {/* Photo placeholder */}
      <div
        className="h-40 rounded-xl mb-6 flex items-end p-4"
        style={{ background: 'linear-gradient(135deg, #1a1818, #3a2a1a)' }}
      >
        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/50">
          Жилые комплексы · любая технология
        </p>
      </div>

      {/* Description */}
      <p className="font-sans text-[13px] text-[#6B6B6B] leading-relaxed mb-6">
        Строим современные жилые пространства под любую строительную технологию
        и бюджет. Каркасные дома, кирпич, металлокаркас или клеёный брус — полный цикл
        от проекта до ключей.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: '800', label: 'кв.м' },
          { value: '4+', label: 'технологии' },
          { value: 'Под ключ', label: 'формат' },
        ].map((s) => (
          <div key={s.label} className="bg-[#F4F3EF] rounded-[10px] p-3 text-center">
            <p className="font-serif text-xl text-[#1C1C1C]">{s.value}</p>
            <p className="font-sans text-[9px] uppercase tracking-[0.1em] text-[#6B6B6B] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Technologies */}
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
            <div key={t.label} className="flex items-center gap-2 bg-[#F4F3EF] rounded-[8px] px-3 py-2.5">
              <span className="text-base">{t.icon}</span>
              <span className="font-sans text-[12px] text-[#1C1C1C]">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#lead"
        className="inline-flex items-center gap-2 bg-[#1C1C1C] text-white font-sans text-[11px] tracking-[0.12em] uppercase rounded-[10px] px-5 py-3 hover:opacity-85 transition-opacity"
      >
        Обсудить проект жилья →
      </a>
    </div>
  ),
};

const MODAL_TITLES: Record<ModalKey, string> = {
  mops: 'Быстровозводимые здания',
  spa: 'SPA и банные комплексы',
  residential: 'Жилые комплексы',
};

export default function DirectionsSection() {
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);

  return (
    <section
      id="services"
      className="relative z-20 bg-[#F4F3EF] py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-content mx-auto">
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B] mb-12">
          Направления
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CARDS.map((card) => (
            <motion.div
              key={card.key}
              className="bg-white border border-[#E0DFDA] rounded-[14px] overflow-hidden cursor-pointer"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpenModal(card.key)}
            >
              {/* Top image zone */}
              <div
                className="relative h-40 flex flex-col justify-between p-4"
                style={{ background: card.gradient }}
              >
                {/* Icon — top right */}
                <div className="flex justify-end">
                  <div
                    className="w-7 h-7 flex items-center justify-center rounded-[8px]"
                    style={{
                      background: 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {card.icon}
                  </div>
                </div>

                {/* Number — bottom left */}
                <p className="font-sans text-[9px] tracking-[0.2em] text-white/40">
                  {card.number}
                </p>
              </div>

              {/* Bottom content */}
              <div className="p-[14px_14px_16px]" style={{ padding: '14px 14px 16px' }}>
                <h3 className="font-serif text-[17px] text-[#1C1C1C] leading-tight mb-2">
                  {card.title}
                </h3>
                <p className="font-sans text-[11px] text-[#6B6B6B] leading-relaxed mb-4">
                  {card.desc}
                </p>
                {/* Bottom row: tag + arrow */}
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
          ))}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {openModal && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center md:p-4"
            onClick={() => setOpenModal(null)}
          >
            <motion.div
              className="bg-white w-full md:max-w-[560px] md:rounded-[20px] rounded-t-[20px] max-h-[85vh] overflow-y-auto"
              style={{ border: '0.5px solid rgba(0,0,0,0.12)' }}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4 sticky top-0 bg-white z-10" style={{ borderBottom: '0.5px solid #E0DFDA' }}>
                <h2 className="font-serif text-[20px] text-[#1C1C1C]">
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

              {/* Modal body */}
              {MODAL_CONTENT[openModal]}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
