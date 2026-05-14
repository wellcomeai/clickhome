'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TECHNOLOGIES = [
  'Каркасные технологии',
  'Камень и кирпич',
  'Металлокаркас',
  'Клеёный брус',
];

const PRINCIPLES = [
  { icon: '🛡', label: 'Любая технология' },
  { icon: '🌿', label: 'Экологичные материалы' },
  { icon: '⏱', label: 'Соблюдение сроков' },
  { icon: '✓', label: 'Контроль качества' },
  { icon: '🏠', label: 'Авторская архитектура' },
];

export default function ResidentialSection() {
  return (
    <section
      id="residential"
      className="relative z-20 bg-[#F4F3EF] py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-content mx-auto">
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B] mb-12">
          Жилые комплексы
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 text-[#1C1C1C]">
              Жилые
              <br />
              <span className="text-[#2A5C1A]">комплексы</span>
            </h2>
            <p className="font-sans text-[#6B6B6B] text-base leading-relaxed mb-8 max-w-sm">
              Строим современные жилые пространства под любую строительную технологию.
              От проекта до ключей — полный цикл.
            </p>

            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#1C1C1C] font-semibold mb-4">
              Наши направления:
            </p>
            <ul className="flex flex-col gap-3">
              {TECHNOLOGIES.map((tech) => (
                <li key={tech} className="flex items-center gap-3 font-sans text-sm text-[#1C1C1C]">
                  <span className="w-4 h-px bg-[#2A5C1A] flex-shrink-0" />
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right photo mosaic */}
          <motion.div
            className="grid grid-cols-2 grid-rows-2 gap-4 h-[480px] md:h-[560px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            {/* Large photo spans 2 rows */}
            <div className="relative row-span-2 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80"
                alt="Жилой комплекс"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Top-right small photo */}
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80"
                alt="Терраса"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Bottom-right small photo */}
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80"
                alt="Фасад вечером"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom 5 principles */}
        <div className="border-t border-[#E0DFDA] pt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {PRINCIPLES.map((p) => (
            <div key={p.label} className="flex items-center gap-3 font-sans text-sm text-[#1C1C1C]">
              <span className="text-xl">{p.icon}</span>
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
