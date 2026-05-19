'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Carousel from './Carousel';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const VIEWPORT = { once: true, margin: '-80px' } as const;

const YC = 'https://storage.yandexcloud.net/clickhome';

const BG = '#F4F3EF';
const TOP_HAIRLINE = '0.5px solid #E0DFDA';

const enc = (s: string) => encodeURIComponent(s);

const MOPS_FOLDER = `${YC}/${enc('быстровозводимые здания')}`;
const MOPS_GALLERY = [
  { src: `${MOPS_FOLDER}/${enc('МОПс.jpg')}`, alt: 'МОПс — объект для госзаказчиков' },
  { src: `${MOPS_FOLDER}/${enc('Офисный модульный.jpg')}`, alt: 'Модульный офис' },
  { src: `${MOPS_FOLDER}/${enc('офисный модульный 2.jpg')}`, alt: 'Модульный офис 2' },
];
const MOPS_VIDEO = `${MOPS_FOLDER}/${enc('Установка офиса модульного.MP4')}`;

const SPA_GALLERY = [
  'СПА.jpg',
  'Спа 2.jpg',
  'Спа 3.jpg',
  'Спа 4.jpg',
  'СПА 5.jpg',
  'спа 6.jpg',
  'СПА 7.jpg',
  'СПА 8.jpg',
].map((f, i) => ({ src: `${YC}/SPA/${enc(f)}`, alt: `SPA ${i + 1}` }));
const SPA_VIDEO = `${YC}/SPA/${enc('Обзор SPA.MOV')}`;
const SPA_POSTER = SPA_GALLERY[0].src;

const ZHK_FOLDER = `${YC}/${enc('Жилые комплексы')}`;
const ZHK_IMAGES = {
  tall: { src: `${ZHK_FOLDER}/${enc('Дом 111.jpg')}`, alt: 'Дом 1' },
  topRight: { src: `${ZHK_FOLDER}/${enc('дом 222.jpg')}`, alt: 'Дом 2' },
  botRight: { src: `${ZHK_FOLDER}/${enc('дом 333.jpg')}`, alt: 'Дом 3' },
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE }}
      className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#6B6B6B] flex items-center gap-3"
    >
      <span className="block w-5 h-px bg-[#E0DFDA]" aria-hidden />
      <span>{children}</span>
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
      className="font-serif text-[32px] md:text-[40px] leading-[1.08] text-[#1C1C1C] mt-3 max-w-[18ch]"
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
      className="font-sans text-[13px] text-[#6B6B6B] leading-relaxed mt-3 max-w-[320px]"
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

function Stats({
  items,
  withDivider = false,
}: {
  items: { value: string; label: string }[];
  withDivider?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className={`flex flex-wrap gap-6 ${
        withDivider ? 'pt-4 mt-4 border-t border-[#E0DFDA]' : 'mt-4'
      }`}
    >
      {items.map((s) => (
        <motion.div
          key={s.label}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
          }}
        >
          <p className="font-serif text-[22px] text-[#1C1C1C] leading-tight">{s.value}</p>
          <p className="font-sans text-[9px] tracking-[0.12em] uppercase text-[#6B6B6B] mt-1">
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
      className="mt-5"
    >
      <a
        href="#lead"
        className="group inline-flex items-center gap-2 bg-[#1C1C1C] text-white font-sans text-[11px] tracking-[0.12em] uppercase rounded-[12px] px-6 py-3 hover:opacity-85 transition-opacity"
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

function Block01() {
  return (
    <div
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{ background: BG }}
    >
      <div className="max-w-content mx-auto w-full grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 items-start">
        <div>
          <Label>01 — Быстровозводимые здания</Label>
          <Heading>Строим быстро. Строим надёжно.</Heading>
          <Description>
            Проектируем и возводим здания любого назначения — собственное производство полного цикла.
            Реализуем любой проект под запрос: от технического задания до сдачи объекта под ключ.
          </Description>
          <Tags items={['Собственное производство', 'Любой проект под запрос', 'Полный цикл']} />
          <Stats
            withDivider
            items={[
              { value: '30+', label: 'объектов МОПс' },
              { value: '7 лет', label: 'опыта' },
              { value: '50', label: 'план 2026' },
            ]}
          />
          <CTA>Обсудить проект</CTA>
          <div className="bg-white border border-[#E0DFDA] rounded-[12px] p-4 mt-4 max-w-[360px]">
            <p className="font-sans text-[12px] font-medium text-[#1C1C1C] mb-1">
              Кейс — МОПс для государственных заказчиков
            </p>
            <p className="font-sans text-[12px] text-[#6B6B6B]">
              Более 30 объектов сдано по государственным контрактам.
            </p>
          </div>
        </div>

        <div>
          <MediaWrap delay={0.2}>
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <Carousel
                items={MOPS_GALLERY}
                className="relative w-full h-full"
                aspectRatio={3 / 4}
              />
            </div>
          </MediaWrap>
          <MediaWrap delay={0.3}>
            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black mt-3">
              <video
                controls
                playsInline
                preload="none"
                poster={MOPS_GALLERY[0].src}
                className="absolute inset-0 w-full h-full object-cover"
                src={MOPS_VIDEO}
              />
            </div>
          </MediaWrap>
        </div>
      </div>
    </div>
  );
}

function Block02() {
  return (
    <div
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{ background: BG, borderTop: TOP_HAIRLINE }}
    >
      <div className="max-w-content mx-auto w-full grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-10 items-start">
        <div className="order-2 md:order-1">
          <MediaWrap>
            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black max-w-[480px]">
              <video
                controls
                playsInline
                preload="none"
                poster={SPA_POSTER}
                className="absolute inset-0 w-full h-full object-cover"
                src={SPA_VIDEO}
              />
            </div>
          </MediaWrap>
          <MediaWrap delay={0.2}>
            <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
              {SPA_GALLERY.map((it) => (
                <div
                  key={it.src}
                  className="relative shrink-0 w-[72px] aspect-[3/4] rounded-lg overflow-hidden"
                >
                  <Image src={it.src} alt={it.alt} fill sizes="72px" className="object-cover" />
                </div>
              ))}
            </div>
          </MediaWrap>
        </div>

        <div className="order-1 md:order-2">
          <Label>02 — SPA и Банные комплексы</Label>
          <Heading>Пространство для тишины и восстановления</Heading>
          <Description>
            У нас есть своё видение того, каким должно быть место для расслабления. Не просто набор
            помещений — а продуманная среда, где каждая деталь работает на ощущение покоя.
            Проектируем и строим SPA и банные комплексы с нуля: от архитектуры до оснащения.
          </Description>
          <Tags items={['Собственная концепция', 'Премиальные материалы', 'Под ключ']} />
          <Stats
            withDivider
            items={[
              { value: '420 м²', label: 'площадь' },
              { value: '6-й этаж', label: 'надстройка' },
              { value: 'Иркутск', label: 'локация' },
            ]}
          />
          <CTA>Обсудить SPA-проект</CTA>
          <div className="bg-white border border-[#E0DFDA] rounded-[12px] p-4 mt-4 max-w-[360px]">
            <p className="font-sans text-[12px] font-medium text-[#1C1C1C] mb-1">
              Кейс — SPA-комплекс отеля Hystory, Иркутск
            </p>
            <p className="font-sans text-[12px] text-[#6B6B6B]">
              Надстроили 6-й этаж действующего отеля под SPA-инфраструктуру с нуля. 420 м²
              премиальных оздоровительных пространств в самом центре города.
            </p>
          </div>
        </div>
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
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{ background: BG, borderTop: TOP_HAIRLINE }}
    >
      <div className="max-w-content mx-auto w-full grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 items-start">
        <div>
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
            className="grid grid-cols-2 gap-2 mt-6 max-w-[360px]"
          >
            {TECHS.map((t) => (
              <motion.div
                key={t.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
                className="bg-white border border-[#E0DFDA] rounded-[12px] p-3 flex items-center gap-2"
              >
                <span className="text-base" aria-hidden>
                  {t.icon}
                </span>
                <span className="font-sans text-[12px] text-[#1C1C1C]">{t.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <Stats
            withDivider
            items={[
              { value: '800 м²', label: 'крупнейший объект' },
              { value: '40+', label: 'реализованных проектов' },
            ]}
          />

          <CTA>Обсудить проект жилья</CTA>
        </div>

        <MediaWrap delay={0.2}>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={ZHK_IMAGES.tall.src}
                alt={ZHK_IMAGES.tall.alt}
                fill
                sizes="(min-width: 768px) 30vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={ZHK_IMAGES.topRight.src}
                  alt={ZHK_IMAGES.topRight.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={ZHK_IMAGES.botRight.src}
                  alt={ZHK_IMAGES.botRight.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </MediaWrap>
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
