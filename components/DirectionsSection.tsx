'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const VIEWPORT = { once: true, margin: '-80px' } as const;

const R2 = 'https://pub-b1e3de631e544c69b0ad6587f740e140.r2.dev';

const BG = '#F4F3EF';
const STACK_SHADOW = '0 -8px 40px rgba(0,0,0,0.08)';
const TOP_HAIRLINE = '0.5px solid #E0DFDA';

function Label({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE }}
      className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B]"
    >
      {children}
    </motion.div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
      className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-[1.05] text-[#1C1C1C] mt-4 max-w-[18ch]"
    >
      {children}
    </motion.h2>
  );
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      className="font-sans text-[14px] md:text-[16px] text-[#6B6B6B] leading-relaxed mt-5 max-w-[60ch]"
    >
      {children}
    </motion.p>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <motion.ul
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
      className="flex flex-wrap gap-2 mt-6"
    >
      {items.map((t) => (
        <li
          key={t}
          className="font-sans text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(42,92,26,0.08)', color: '#2A5C1A' }}
        >
          {t}
        </li>
      ))}
    </motion.ul>
  );
}

function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="grid grid-cols-3 gap-3 md:gap-4 mt-6"
    >
      {items.map((s) => (
        <motion.div
          key={s.label}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
          }}
          className="bg-white border border-[#E0DFDA] rounded-[12px] p-4 md:p-5"
        >
          <p className="font-serif text-[22px] md:text-[28px] text-[#1C1C1C] leading-tight">
            {s.value}
          </p>
          <p className="font-sans text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[#6B6B6B] mt-2">
            {s.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CTA({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
      className="mt-10"
    >
      <a
        href="#lead"
        className="group inline-flex items-center gap-2 bg-[#1C1C1C] text-white font-sans text-[11px] tracking-[0.12em] uppercase rounded-[12px] px-6 py-3.5 hover:opacity-85 transition-opacity"
      >
        {children}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
    </motion.div>
  );
}

function MediaWrap({
  children,
  delay = 0.15,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function CaseHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE }}
      className="font-serif text-[22px] md:text-[28px] text-[#1C1C1C] leading-snug"
    >
      {children}
    </motion.h3>
  );
}

function Block01() {
  return (
    <div
      className="sticky top-0 z-10 min-h-screen w-full py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{ background: BG }}
    >
      <div className="max-w-content mx-auto w-full">
        <Label>01 — Быстровозводимые здания</Label>
        <Heading>Строим быстро. Строим надёжно.</Heading>
        <Description>
          Проектируем и возводим здания любого назначения — собственное производство полного цикла.
          Реализуем любой проект под запрос: от технического задания до сдачи объекта под ключ.
        </Description>
        <Tags items={['Собственное производство', 'Любой проект под запрос', 'Полный цикл']} />

        <MediaWrap>
          <div className="mt-12 relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src={`${R2}/0306fa953bedf01ee001d98ae09729f6_1_1778753479_1109.mp4`}
            />
          </div>
        </MediaWrap>

        <MediaWrap delay={0.2}>
          <div className="mt-3 flex md:grid md:grid-cols-3 gap-3 overflow-x-auto md:overflow-visible no-scrollbar snap-x">
            <div className="relative shrink-0 snap-start w-[78%] md:w-auto aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={`${R2}/%D0%9C%D0%9E%D0%9F%D0%A1.jpg`}
                alt="МОПс"
                fill
                sizes="(min-width: 768px) 33vw, 78vw"
                className="object-cover"
              />
            </div>
            <div className="relative shrink-0 snap-start w-[78%] md:w-auto aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={`${R2}/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D0%BE%D1%84%D0%B8%D1%81%D0%BD%D1%8B%D0%B9.jpg`}
                alt="Модульный офисный"
                fill
                sizes="(min-width: 768px) 33vw, 78vw"
                className="object-cover"
              />
            </div>
            <div className="relative shrink-0 snap-start w-[78%] md:w-auto aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={`${R2}/%D0%BE%D1%84%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%202.jpg`}
                alt="Офисный модульный 2"
                fill
                sizes="(min-width: 768px) 33vw, 78vw"
                className="object-cover"
              />
            </div>
          </div>
        </MediaWrap>

        <div className="mt-16 max-w-[60ch]">
          <CaseHeading>Кейс — МОПс для государственных заказчиков</CaseHeading>
          <Description>
            Один из ключевых форматов — модульные объекты питания и сервиса (МОПс) для
            госзаказчиков. Более 30 объектов сдано, работаем по государственным контрактам.
          </Description>
        </div>
        <Stats
          items={[
            { value: '30+', label: 'объектов МОПс' },
            { value: '7 лет', label: 'опыта' },
            { value: '50', label: 'план 2026' },
          ]}
        />

        <CTA>Обсудить проект</CTA>
      </div>
    </div>
  );
}

const SPA_GALLERY = [
  '%D0%A1%D0%9F%D0%90.jpg',
  '%D0%A1%D0%BF%D0%B0%202.jpg',
  '%D0%A1%D0%BF%D0%B0%203.jpg',
  '%D0%A1%D0%BF%D0%B0%204.jpg',
  '%D0%A1%D0%9F%D0%90%205.jpg',
  '%D1%81%D0%BF%D0%B0%206.jpg',
  '%D0%A1%D0%9F%D0%90%207.jpg',
  '%D0%A1%D0%9F%D0%90%208.jpg',
];

function Block02() {
  return (
    <div
      className="sticky top-0 z-20 min-h-screen w-full py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{
        background: BG,
        borderTop: TOP_HAIRLINE,
        boxShadow: STACK_SHADOW,
      }}
    >
      <div className="max-w-content mx-auto w-full">
        <Label>02 — SPA и Банные комплексы</Label>
        <Heading>Пространство для тишины и восстановления</Heading>
        <Description>
          У нас есть своё видение того, каким должно быть место для расслабления. Не просто набор
          помещений — а продуманная среда, где каждая деталь работает на ощущение покоя.
          Проектируем и строим SPA и банные комплексы с нуля: от архитектуры до оснащения.
        </Description>
        <Tags items={['Собственная концепция', 'Премиальные материалы', 'Под ключ']} />

        <MediaWrap>
          <div className="mt-12 relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
            <video
              controls
              playsInline
              preload="none"
              poster={`${R2}/%D0%A1%D0%9F%D0%90.jpg`}
              className="absolute inset-0 w-full h-full object-cover"
              src={`${R2}/%D0%9E%D0%B1%D0%B7%D0%BE%D1%80%20SPA.MOV`}
            />
          </div>
        </MediaWrap>

        <MediaWrap delay={0.2}>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto snap-x">
            {SPA_GALLERY.map((file, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={file}
                src={`${R2}/${file}`}
                alt={`SPA ${i + 1}`}
                className="snap-start shrink-0 h-[420px] md:h-[520px] w-auto aspect-[3/4] rounded-[12px] object-cover bg-black/5"
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        </MediaWrap>

        <div className="mt-16 max-w-[60ch]">
          <CaseHeading>Кейс — SPA-комплекс отеля History, Иркутск</CaseHeading>
          <Description>
            Надстроили 6-й этаж действующего отеля под SPA-инфраструктуру с нуля. 420 кв.м
            премиальных оздоровительных пространств в самом центре города. Сложная инженерия,
            интеграция в структуру работающего объекта.
          </Description>
        </div>
        <Stats
          items={[
            { value: '420 кв.м', label: 'площадь' },
            { value: '6-й этаж', label: 'надстройка' },
            { value: 'Иркутск', label: 'локация' },
          ]}
        />

        <CTA>Обсудить SPA-проект</CTA>
      </div>
    </div>
  );
}

const TECHS: { icon: string; label: string }[] = [
  { icon: '⬛', label: 'Каркасные технологии' },
  { icon: '⚙️', label: 'Металлоконструкции' },
  { icon: '🧱', label: 'Камень и кирпич' },
  { icon: '🪵', label: 'Клеёный брус' },
];

function Block03() {
  return (
    <div
      className="sticky top-0 z-30 min-h-screen w-full py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{
        background: BG,
        borderTop: TOP_HAIRLINE,
        boxShadow: STACK_SHADOW,
      }}
    >
      <div className="max-w-content mx-auto w-full">
        <Label>03 — Жилые комплексы</Label>
        <Heading>Любой материал. Любая технология.</Heading>
        <Description>
          Строим жилые объекты из чего угодно и как угодно — под ваш бюджет, участок и пожелания.
          Каркасные технологии, металлоконструкции, камень, кирпич. Не навязываем решения —
          реализуем то, что нужно именно вам.
        </Description>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 gap-3 mt-8 max-w-[640px]"
        >
          {TECHS.map((t) => (
            <motion.div
              key={t.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="bg-white border border-[#E0DFDA] rounded-[12px] p-4 md:p-5 flex items-center gap-3"
            >
              <span className="text-xl md:text-2xl" aria-hidden>
                {t.icon}
              </span>
              <span className="font-sans text-[13px] md:text-[14px] text-[#1C1C1C]">
                {t.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <MediaWrap delay={0.2}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid grid-rows-2 gap-3">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src={`${R2}/%D0%94%D0%BE%D0%BC%20111.jpg`}
                  alt="Дом 1"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src={`${R2}/%D0%B4%D0%BE%D0%BC%20222.jpg`}
                  alt="Дом 2"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-full rounded-2xl overflow-hidden">
              <Image
                src={`${R2}/%D0%B4%D0%BE%D0%BC%20333.jpg`}
                alt="Дом 3"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </MediaWrap>

        <CTA>Обсудить проект жилья</CTA>
      </div>
    </div>
  );
}

export default function DirectionsSection() {
  return (
    <section id="services" className="relative">
      <Block01 />
      <Block02 />
      <Block03 />
    </section>
  );
}
