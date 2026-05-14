'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FEATURES = [
  { icon: '⏱', text: 'Срок ввода в эксплуатацию — 3 месяца' },
  { icon: '🏭', text: 'Собственное производство' },
  { icon: '🏆', text: 'Более 30 построенных МОПс' },
];

const BARS = [
  { year: '2024', value: 27, label: '27 объектов', note: 'Лучший год', color: 'bg-[#9E9E9E]' },
  { year: '2025', value: 7, label: '7 объектов', note: 'Подготовка к масштабированию', color: 'bg-[#BDBDBD]' },
  { year: '2026', value: 50, label: '50 объектов', note: 'Цель подтверждена контрактами', color: 'bg-[#2A5C1A]' },
];

const maxBar = 50;

const BOTTOM_ICONS = [
  { icon: '🛡', title: 'Надёжная конструкция', desc: 'Металлокаркас с инженерными гарантиями' },
  { icon: '⚡', title: 'Автономность', desc: 'Независимая инженерная инфраструктура' },
  { icon: '📋', title: 'Соответствие нормам', desc: 'Полный пакет разрешительной документации' },
  { icon: '⊞', title: 'Масштабируемость', desc: 'Модульная архитектура под любую задачу' },
];

export default function MopsSection() {
  return (
    <section
      id="mops"
      className="relative z-20 bg-[#F4F3EF] py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-content mx-auto">
        {/* Top 2-col block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B] mb-4">
              04 — МОПс — Флагманский продукт
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-[#1C1C1C]">
              Инженерный
              <br />
              интеллект для
              <br />
              гос.заказов
            </h2>
            <p className="font-sans text-[#6B6B6B] text-base leading-relaxed mb-10 max-w-md">
              Автономные архитектурные системы, спроектированные как инфраструктура
              будущего. Полный цикл от проекта до сдачи объекта.
            </p>
            <ul className="flex flex-col gap-4">
              {FEATURES.map((f) => (
                <li key={f.text} className="flex items-center gap-4 font-sans text-[#1C1C1C] text-sm">
                  <span className="text-xl w-8 flex-shrink-0">{f.icon}</span>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — photo */}
          <div className="relative h-80 md:h-[460px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80"
              alt="МОПс объект"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Bar chart block */}
        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16">
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B] mb-2">
            МОПс — Рост в 2026
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-10">
            Динамика строительства
          </h3>

          <div className="flex items-end gap-6 md:gap-10 h-48">
            {BARS.map((bar, i) => (
              <div key={bar.year} className="flex flex-col items-start gap-3 flex-1">
                <div className="w-full flex items-end h-36 bg-[#F4F3EF] rounded-lg overflow-hidden">
                  <motion.div
                    className={`w-full origin-bottom rounded-lg ${bar.color}`}
                    style={{ height: `${(bar.value / maxBar) * 100}%` }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                  />
                </div>
                <div>
                  <p className="font-serif text-xl text-[#1C1C1C]">{bar.year}</p>
                  <p className="font-sans text-sm font-semibold text-[#1C1C1C]">{bar.label}</p>
                  <p className="font-sans text-xs text-[#6B6B6B]">{bar.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 4 icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BOTTOM_ICONS.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <span className="text-2xl">{item.icon}</span>
              <h4 className="font-sans font-semibold text-sm text-[#1C1C1C]">{item.title}</h4>
              <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
