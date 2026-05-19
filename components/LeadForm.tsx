'use client';
import { useState } from 'react';
import { FloatingInput } from './FloatingInput';

interface FormData {
  name: string;
  phone: string;
  direction: string;
}

const PERKS = [
  'Ответим в течение часа',
  'Бесплатный расчёт',
  'Выезд на объект',
];

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A8A2E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    direction: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSent(true);
  };

  return (
    <section
      id="lead"
      className="relative z-30 bg-[#111110] py-20 md:py-28 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Left */}
        <div>
          <h2 className="font-serif text-[36px] md:text-[48px] text-white leading-[1.05] mb-5">
            Обсудим ваш проект?
          </h2>
          <p className="font-sans text-[14px] text-white/60 leading-relaxed max-w-[400px] mb-10">
            Расскажите о задаче — предложим решение. Бесплатная консультация.
          </p>

          <ul className="flex flex-col gap-4">
            {PERKS.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 font-sans text-[14px] text-white/70"
              >
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Check />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[10px] md:pt-2">
            <FloatingInput
              dark
              label="Имя"
              name="name"
              value={formData.name}
              onChange={(v) => setFormData({ ...formData, name: v })}
            />
            <FloatingInput
              dark
              label="Телефон"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(v) => setFormData({ ...formData, phone: v })}
            />
            <FloatingInput
              dark
              as="select"
              label="Направление"
              name="direction"
              value={formData.direction}
              onChange={(v) => setFormData({ ...formData, direction: v })}
              options={[
                { value: 'bvk', label: 'БВК — Быстровозводимые здания' },
                { value: 'spa', label: 'SPA и банные комплексы' },
                { value: 'house', label: 'Жильё' },
              ]}
            />
            <button
              type="submit"
              className="w-full font-sans text-[11px] tracking-[0.15em] uppercase text-[#111110] bg-white rounded-[10px] py-[14px] px-5 hover:bg-white/90 transition-colors mt-2"
            >
              Отправить заявку →
            </button>
          </form>
        ) : (
          <div className="md:pt-2 py-10 px-6 bg-white/5 rounded-[12px] text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Check />
            </div>
            <h3 className="font-serif text-[22px] text-white mb-2">Спасибо!</h3>
            <p className="font-sans text-[13px] text-white/60">
              Мы свяжемся с вами в течение часа.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
