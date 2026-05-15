'use client';
import { useState } from 'react';
import { FloatingInput } from './FloatingInput';
import MagneticButton from './MagneticButton';

interface FormData {
  name: string;
  phone: string;
  direction: string;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    direction: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert('Заявка отправлена!');
  };

  return (
    <section
      id="lead"
      className="relative z-20 bg-white py-20 px-6 md:px-12 lg:px-20"
      style={{ borderTop: '0.5px solid #E0DFDA', borderBottom: '0.5px solid #E0DFDA' }}
    >
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div>
            <h2 className="font-serif text-[32px] md:text-[40px] text-[#1C1C1C] leading-tight mb-4">
              Обсудим ваш проект?
            </h2>
            <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-xs">
              Расскажите о задаче — предложим решение и сроки. Бесплатная консультация.
            </p>
          </div>

          {/* Right — form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
            <FloatingInput
              label="Ваше имя"
              name="name"
              type="text"
              value={formData.name}
              onChange={(v) => setFormData({ ...formData, name: v })}
            />
            <FloatingInput
              label="Телефон"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(v) => setFormData({ ...formData, phone: v })}
            />
            <FloatingInput
              as="select"
              label="Направление"
              name="direction"
              value={formData.direction}
              onChange={(v) => setFormData({ ...formData, direction: v })}
              options={[
                { value: 'mops', label: 'МОПс / Быстровозводимые здания' },
                { value: 'spa', label: 'SPA и банные комплексы' },
                { value: 'residential', label: 'Жилые комплексы' },
              ]}
            />
            <MagneticButton className="block w-full mt-1">
              <button
                type="submit"
                className="w-full font-sans text-[11px] tracking-[0.15em] uppercase text-white bg-[#1C1C1C] rounded-[10px] py-[13px] px-5 transition-opacity duration-200 hover:opacity-85"
              >
                Отправить заявку →
              </button>
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
}
