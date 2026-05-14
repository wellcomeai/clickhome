'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SERVICES = [
  {
    number: '01',
    title: 'Быстровозводимые здания',
    desc: 'Автономные архитектурные системы для государственных заказов. Собственное производство, срок ввода — 3 месяца.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    href: '#mops',
  },
  {
    number: '02',
    title: 'SPA и банные комплексы',
    desc: 'Премиальные оздоровительные пространства. Сложные инженерные решения и архитектурная эстетика.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    href: '#spa',
  },
  {
    number: '03',
    title: 'Жилые комплексы',
    desc: 'Современные жилые пространства под любую строительную технологию. Каркас, кирпич, металлокаркас, брус.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    href: '#residential',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-20 bg-[#F4F3EF] py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-content mx-auto">
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B] mb-16">
          Направления
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SERVICES.map((service) => (
            <motion.article
              key={service.number}
              variants={cardVariants}
              className="group rounded-2xl border border-[#E0DFDA] overflow-hidden bg-white cursor-pointer transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <a href={service.href} className="block">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <span className="font-sans text-xs text-[#6B6B6B] tracking-widest">
                    {service.number}
                  </span>
                  <h3 className="font-serif text-2xl md:text-[28px] leading-tight mt-2 mb-3 text-[#1C1C1C]">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <span className="font-sans text-[#2A5C1A] text-lg transition-transform duration-300 inline-block group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
