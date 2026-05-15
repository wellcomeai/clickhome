'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { href: '#services', label: 'Быстровозводимые здания' },
  { href: '#services', label: 'SPA и банные комплексы' },
  { href: '#services', label: 'Жилые комплексы' },
  { href: '#about', label: 'О компании' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const glassStyle = scrolled
    ? {
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'rgba(255, 255, 255, 0.92)',
        border: '0.5px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '14px',
        margin: '12px 16px',
      }
    : {
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(255, 255, 255, 0.08)',
        border: '0.5px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '14px',
        margin: '12px 16px',
      };

  const handleEnter = (i: number) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    const el = navRefs.current[i];
    const parent = ulRef.current;
    if (el && parent) {
      const parentRect = parent.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - parentRect.left - 8,
        width: elRect.width + 16,
      });
    }
    setHoveredIndex(i);
  };

  const handleListLeave = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 150);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="transition-all duration-300" style={glassStyle}>
        <div className="flex items-center justify-between h-14 px-4 md:px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="ClickHome"
              width={140}
              height={32}
              className={`h-7 w-auto transition-all duration-300 ${
                scrolled ? 'brightness-0' : 'brightness-0 invert'
              }`}
              priority
            />
            <span className={`font-sans font-medium text-[15px] tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-[#1C1C1C]' : 'text-white'
            }`}>
              Click<span className="font-light">home</span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul
            ref={ulRef}
            className="hidden md:flex items-center gap-6 relative"
            onMouseLeave={handleListLeave}
          >
            <motion.div
              className="absolute pointer-events-none rounded-[20px]"
              style={{
                height: '28px',
                top: '50%',
                y: '-50%',
                background: scrolled
                  ? 'rgba(42,92,26,0.10)'
                  : 'rgba(255,255,255,0.18)',
                border: scrolled
                  ? '0.5px solid rgba(42,92,26,0.25)'
                  : '0.5px solid rgba(255,255,255,0.30)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              animate={{
                left: pillStyle.left,
                width: pillStyle.width,
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />

            {NAV_LINKS.map((link, i) => (
              <li key={i} onMouseEnter={() => handleEnter(i)}>
                <a
                  ref={el => { navRefs.current[i] = el; }}
                  href={link.href}
                  className={`font-sans text-[12px] tracking-wide transition-colors duration-200 relative z-10 ${
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

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            {/* CTA — desktop only */}
            <MagneticButton className="hidden md:inline-block">
              <a
                href="#lead"
                className={`inline-flex items-center font-sans text-[11px] tracking-[0.1em] uppercase transition-colors duration-300 rounded-[20px] px-[18px] py-[6px] ${
                  scrolled
                    ? 'text-[#1C1C1C] border border-[#1C1C1C]/30 hover:border-[#1C1C1C]/60'
                    : 'text-white border border-white/60 hover:border-white'
                }`}
              >
                Связаться
              </a>
            </MagneticButton>

            {/* Hamburger — mobile only */}
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
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? 'max-h-80' : 'max-h-0'
          }`}
          style={{
            borderTop: menuOpen ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
          }}
        >
          <ul className="flex flex-col px-4 py-4 gap-4 bg-white/95">
            {NAV_LINKS.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-[#1C1C1C] text-base hover:text-[#2A5C1A] transition-colors duration-200 block py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#lead"
                onClick={() => setMenuOpen(false)}
                className="font-sans text-[#2A5C1A] text-base font-medium block py-1"
              >
                Связаться →
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
