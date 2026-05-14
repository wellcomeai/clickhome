import Image from 'next/image';

const NAV_LINKS = [
  { href: '#mops', label: 'Быстровозводимые здания' },
  { href: '#spa', label: 'SPA и банные комплексы' },
  { href: '#residential', label: 'Жилые комплексы' },
  { href: '#about', label: 'О компании' },
];

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#0D0D0C] text-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Logo + tagline */}
          <div className="md:col-span-2">
            <Image
              src="/images/logo.svg"
              alt="ClickHome"
              width={160}
              height={36}
              className="h-8 w-auto brightness-0 invert mb-6"
            />
            <p className="font-serif text-xl md:text-2xl text-white/80 leading-relaxed max-w-xs">
              Строим объекты,
              <br />
              которым доверяют.
            </p>
            <p className="font-sans text-xs text-white/30 mt-4 tracking-wide">
              ClickHome • Est. 2017
            </p>
          </div>

          {/* Nav links */}
          <nav>
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/30 mb-5">
              Навигация
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} ClickHome. Все права защищены.
          </p>
          <p className="font-sans text-xs text-white/20">
            40+ объектов по всей России
          </p>
        </div>
      </div>
    </footer>
  );
}
