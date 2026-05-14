'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 2017, suffix: '', label: 'Год основания' },
  { value: 40, suffix: '+', label: 'Реализованных объектов' },
  { value: 3, suffix: '', label: 'Направления строительства' },
  { value: 2244, suffix: ' кв.м', label: 'Построено суммарно' },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="relative z-20 bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-content mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
          {/* Label */}
          <div className="md:flex-shrink-0 md:w-56 md:pr-8">
            <a
              href="#about"
              className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#2A5C1A] hover:text-[#4A8A2E] transition-colors duration-200 inline-flex items-center gap-2"
            >
              О нас в цифрах
              <span className="text-base">→</span>
            </a>
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-0 w-full">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-2 py-4 md:py-0 px-6 md:px-8 ${
                  i > 0 ? 'border-l border-[#E0DFDA]' : ''
                }`}
              >
                <span className="font-serif text-4xl md:text-5xl lg:text-[56px] text-[#1C1C1C] leading-none tabular-nums">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-sans text-xs text-[#6B6B6B] leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
