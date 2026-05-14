'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '#services', label: 'Быстровозводимые здания' },
  { href: '#spa', label: 'SPA и банные комплексы' },
  { href: '#residential', label: 'Жилые комплексы' },
  { href: '#about', label: 'О компании' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-sm bg-white/90 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <Image
            src="/images/logo.svg"
            alt="ClickHome"
            width={160}
            height={36}
            className={`h-8 w-auto transition-all duration-300 ${scrolled ? 'brightness-0' : 'brightness-0 invert'}`}
            priority
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`font-sans text-sm tracking-wide transition-colors duration-200 ${
                  scrolled
                    ? 'text-[#1C1C1C] hover:text-[#2A5C1A]'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors duration-200 ${
            scrolled ? 'text-[#1C1C1C]' : 'text-white'
          }`}
          aria-label="Меню"
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-80 border-t border-[#E0DFDA]' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-[#1C1C1C] text-base hover:text-[#2A5C1A] transition-colors duration-200 block py-1"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
