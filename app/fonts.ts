import { Hind_Madurai, Catamaran, Noto_Sans_Tamil } from 'next/font/google';

// Hind Madurai - good for headings and offers Tamil support
export const hindMadurai = Hind_Madurai({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'tamil'],
  display: 'swap',
  variable: '--font-hind-madurai',
});

// Catamaran - elegant Tamil font, good for body text
export const catamaran = Catamaran({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'tamil'],
  display: 'swap',
  variable: '--font-catamaran',
});

// Noto Sans Tamil - excellent Tamil support from Google
export const notoSansTamil = Noto_Sans_Tamil({
  weight: ['400', '500', '700'],
  subsets: ['tamil'],
  display: 'swap',
  variable: '--font-noto-tamil',
});
