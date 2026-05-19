'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FloatingInput } from './FloatingInput';

export type DirectionKey = 'bvk' | 'spa' | 'house';

type FieldDef =
  | { name: string; label: string; type: 'text' }
  | { name: string; label: string; type: 'select'; options: string[] };

const FIELDS: Record<DirectionKey, FieldDef[]> = {
  bvk: [
    { name: 'area', label: 'Площадь объекта, м²', type: 'text' },
    {
      name: 'type',
      label: 'Тип объекта',
      type: 'select',
      options: ['Производство', 'Склад', 'Офис', 'Социальный объект', 'Другое'],
    },
    {
      name: 'deadline',
      label: 'Желаемые сроки',
      type: 'select',
      options: ['До 1 месяца', '1–3 месяца', '3–6 месяцев', 'Не определились'],
    },
  ],
  spa: [
    { name: 'area', label: 'Площадь, м²', type: 'text' },
    {
      name: 'workType',
      label: 'Тип работ',
      type: 'select',
      options: ['Строительство с нуля', 'Надстройка этажа', 'Реконструкция'],
    },
    {
      name: 'concept',
      label: 'Концепция',
      type: 'select',
      options: ['Баня / сауна', 'Хаммам', 'SPA-центр', 'Бассейн', 'Комплекс'],
    },
  ],
  house: [
    { name: 'area', label: 'Площадь дома, м²', type: 'text' },
    {
      name: 'material',
      label: 'Материал',
      type: 'select',
      options: ['Каркас', 'Металлоконструкции', 'Кирпич / камень', 'Клеёный брус', 'Не определились'],
    },
    {
      name: 'floors',
      label: 'Этажность',
      type: 'select',
      options: ['1 этаж', '2 этажа', '3+ этажа'],
    },
    {
      name: 'hasLand',
      label: 'Участок',
      type: 'select',
      options: ['Есть', 'В поиске', 'Нужна помощь с выбором'],
    },
  ],
};

const TITLE: Record<DirectionKey, string> = {
  bvk: 'Получить КП — БВК',
  spa: 'Получить КП — SPA',
  house: 'Получить КП — Жильё',
};

interface ModalProps {
  open: boolean;
  direction: DirectionKey | null;
  onClose: () => void;
}

export default function Modal({ open, direction, onClose }: ModalProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setValues({});
      setSent(false);
    }
  }, [open, direction]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ direction, ...values });
    setSent(true);
  };

  const fields = direction ? FIELDS[direction] : [];
  const title = direction ? TITLE[direction] : '';

  return (
    <AnimatePresence>
      {open && direction && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full md:max-w-[520px] mx-auto bg-white rounded-t-2xl md:rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              aria-label="Закрыть"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[#1C1C1C] hover:bg-[#F4F3EF] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {!sent ? (
              <>
                <h3 className="font-serif text-[26px] md:text-[30px] text-[#1C1C1C] leading-tight pr-10 mb-2">
                  {title}
                </h3>
                <p className="font-sans text-[13px] text-[#6B6B6B] mb-6">
                  Заполните форму — мы свяжемся с вами в течение часа.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
                  <FloatingInput
                    label="Имя"
                    name="name"
                    value={values.name ?? ''}
                    onChange={(v) => set('name', v)}
                  />
                  <FloatingInput
                    label="Телефон"
                    name="phone"
                    type="tel"
                    value={values.phone ?? ''}
                    onChange={(v) => set('phone', v)}
                  />
                  <FloatingInput
                    label="Регион"
                    name="region"
                    value={values.region ?? ''}
                    onChange={(v) => set('region', v)}
                  />

                  {fields.map((f) =>
                    f.type === 'text' ? (
                      <FloatingInput
                        key={f.name}
                        label={f.label}
                        name={f.name}
                        value={values[f.name] ?? ''}
                        onChange={(v) => set(f.name, v)}
                      />
                    ) : (
                      <FloatingInput
                        key={f.name}
                        as="select"
                        label={f.label}
                        name={f.name}
                        value={values[f.name] ?? ''}
                        onChange={(v) => set(f.name, v)}
                        options={f.options.map((o) => ({ value: o, label: o }))}
                      />
                    ),
                  )}

                  <button
                    type="submit"
                    className="w-full font-sans text-[11px] tracking-[0.15em] uppercase text-white bg-[#1C1C1C] rounded-[10px] py-[14px] px-5 hover:opacity-85 transition-opacity mt-2"
                  >
                    Отправить заявку →
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#2A5C1A]/10 flex items-center justify-center mx-auto mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A5C1A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-serif text-[24px] text-[#1C1C1C] mb-2">
                  Спасибо!
                </h3>
                <p className="font-sans text-[13px] text-[#6B6B6B] max-w-[300px] mx-auto">
                  Мы свяжемся с вами в течение часа.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 font-sans text-[11px] tracking-[0.15em] uppercase text-[#1C1C1C] border-b border-[#1C1C1C]/40 hover:border-[#1C1C1C] transition-colors pb-0.5"
                >
                  Закрыть
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
