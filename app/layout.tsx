import type { Metadata } from 'next';
import { Playfair_Display, Golos_Text } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ScrollProgress';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
});

const golos = Golos_Text({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-golos',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ClickHome — Строим объекты, которым доверяют',
  description:
    'Строительная компания ClickHome с 2017 года. Быстровозводимые здания (МОПс), SPA и банные комплексы, жилые комплексы. 40+ объектов по всей России.',
  keywords:
    'строительство, МОПс, SPA, жилые комплексы, быстровозводимые здания, ClickHome',
  openGraph: {
    title: 'ClickHome',
    description: 'Архитектурные и модульные решения для современного девелопмента',
    url: 'https://clickhome.ru',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${golos.variable}`}>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
