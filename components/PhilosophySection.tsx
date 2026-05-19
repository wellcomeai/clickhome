'use client';
import { motion } from 'framer-motion';

const PRINCIPLES = [
  'Инженерная точность во всём',
  'Контроль качества на каждом этапе',
  'Современные строительные технологии',
  'Ответственность за результат',
];

const STATS = [
  { value: '2017', label: 'год' },
  { value: '40+', label: 'объектов' },
  { value: '3', label: 'направления' },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const VIEWPORT = { once: true, margin: '-80px' } as const;

export default function PhilosophySection() {
  return (
    <section
      id="about"
      className="relative z-30 bg-[#111110] py-28 md:py-36 px-6 md:px-12 lg:px-20"
    >
      <div className="relative max-w-content mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-14 lg:gap-20 items-start">
        {/* Left — quote + stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/40 mb-10">
            Философия
          </p>

          <h2 className="font-serif text-white text-[40px] md:text-[52px] leading-[1.08]">
            «С 2017 года мы строим
            <br />
            объекты, которым доверяют»
          </h2>

          <div className="mt-12 pt-10 border-t border-white/10 flex flex-wrap gap-10 md:gap-14">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-white text-[44px] md:text-[52px] leading-none">
                  {s.value}
                </p>
                <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-white/40 mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/40 mb-6">
            Наши принципы
          </p>
          <ul className="flex flex-col gap-5">
            {PRINCIPLES.map((p) => (
              <li
                key={p}
                className="flex items-start gap-4 font-sans text-[15px] text-white/70 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2A5C1A] flex-shrink-0 mt-2.5" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
