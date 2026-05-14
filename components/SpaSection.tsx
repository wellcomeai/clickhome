'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FEATURES = [
  { icon: '≡', text: 'Сложные инженерные решения и надстройка уровня' },
  { icon: '◻', text: 'Интеграция SPA-зоны в структуру действующего отеля' },
  { icon: '◻', text: 'Премиальная архитектура, атмосфера и приватность' },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
];

export default function SpaSection() {
  return (
    <section
      id="spa"
      className="relative z-20 bg-[#1C1C1C] py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left text — 2/5 */}
          <motion.div
            className="lg:col-span-2 text-white"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/50 mb-4">
              SPA и банные комплексы
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              Премиальный
              <br />
              SPA-комплекс
              <br />
              в отеле History
            </h2>
            <p className="font-sans text-white/60 text-base leading-relaxed mb-8">
              Уникальный SPA-комплекс на 6 этаже в центре Иркутска. Этаж был «достроен»
              специально под SPA-инфраструктуру.
            </p>
            <ul className="flex flex-col gap-4 mb-10">
              {FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-4 font-sans text-white/80 text-sm leading-relaxed">
                  <span className="text-[#2A5C1A] text-lg flex-shrink-0 mt-0.5">{f.icon}</span>
                  {f.text}
                </li>
              ))}
            </ul>
            <div className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 flex gap-4 flex-wrap">
              <span>📍 Иркутск</span>
              <span>•</span>
              <span>Отель History</span>
              <span>•</span>
              <span>6 этаж</span>
            </div>
          </motion.div>

          {/* Right gallery — 3/5 */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            {/* Large main photo */}
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80"
                alt="SPA комплекс отель History"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* 3 gallery photos */}
            <div className="grid grid-cols-3 gap-4">
              {GALLERY.map((src, i) => (
                <div key={i} className="relative h-32 md:h-40 rounded-xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`SPA галерея ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
