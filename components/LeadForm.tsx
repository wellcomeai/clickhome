'use client';
import { useState } from 'react';

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

  const inputClass =
    'w-full font-sans text-[13px] text-[#1C1C1C] bg-[#F9F8F5] rounded-[10px] px-[14px] py-[12px] outline-none transition-colors duration-200 focus:border-[#2A5C1A] placeholder:text-[#6B6B6B]/60';
  const inputStyle = { border: '0.5px solid #D0CFCA' };

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
            <input
              type="text"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
            <select
              value={formData.direction}
              onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
              className={inputClass}
              style={{ ...inputStyle, appearance: 'none', WebkitAppearance: 'none' }}
            >
              <option value="">Выбрать направление</option>
              <option value="mops">МОПс / Быстровозводимые здания</option>
              <option value="spa">SPA и банные комплексы</option>
              <option value="residential">Жилые комплексы</option>
            </select>
            <button
              type="submit"
              className="w-full font-sans text-[11px] tracking-[0.15em] uppercase text-white bg-[#1C1C1C] rounded-[10px] py-[13px] px-5 cursor-pointer transition-opacity duration-200 hover:opacity-85 mt-1"
            >
              Отправить заявку →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
