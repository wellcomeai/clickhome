'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PRINCIPLES = [
  'Инженерная точность',
  'Контроль качества на каждом этапе',
  'Современные строительные технологии',
  'Ответственность за результат',
];

export default function PhilosophySection() {
  return (
    <section
      id="about"
      className="relative z-20 bg-[#111110] py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-content mx-auto">
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/40 mb-16">
          Философия
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Left — tagline */}
          <motion.div
            className="text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              Технологичность.
              <br />
              Системность.
              <br />
              Архитектурная
              <br />
              эстетика.
            </h2>
            <p className="font-sans text-white/50 text-sm leading-relaxed mb-8">
              С 2017 года мы строим объекты, которым доверяют. Каждый проект —
              это инженерное решение высшего класса с вниманием к деталям.
            </p>
            <a
              href="#services"
              className="font-sans text-[#2A5C1A] text-sm tracking-[0.15em] uppercase inline-flex items-center gap-2 hover:text-[#4A8A2E] transition-colors duration-200 group"
            >
              О компании
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Center — large photo */}
          <motion.div
            className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80"
              alt="Архитектура ClickHome"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </motion.div>

          {/* Right — principles */}
          <motion.div
            className="text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/40 mb-6">
              Наши принципы
            </p>
            <ul className="flex flex-col gap-5">
              {PRINCIPLES.map((p) => (
                <li key={p} className="flex items-start gap-4 font-sans text-sm text-white/80 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A5C1A] flex-shrink-0 mt-2" />
                  {p}
                </li>
              ))}
            </ul>

            {/* Company stats snippet */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex gap-8">
                <div>
                  <p className="font-serif text-3xl text-white">2017</p>
                  <p className="font-sans text-xs text-white/40 mt-1">Год основания</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-white">40+</p>
                  <p className="font-sans text-xs text-white/40 mt-1">Объектов</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-white">3</p>
                  <p className="font-sans text-xs text-white/40 mt-1">Направления</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
