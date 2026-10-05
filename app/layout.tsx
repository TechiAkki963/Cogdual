import type { Metadata, Viewport } from 'next';
import { Inter, Lora } from 'next/font/google';
import type { ReactNode } from 'react';
import '@/app/globals.css';
import { CookieBanner } from '@/components/cookie-banner';
import { MobileNav } from '@/components/mobile-nav';
import { PwaRegister } from '@/components/pwa-register';
import { SiteHeader } from '@/components/site-header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cogdual.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cogdual Infotech Solutions · HR & Career Solutions',
    template: '%s · Cogdual',
  },
  description:
    'Recruitment, global certifications, VConnect industry–academia programmes, corporate training, payroll support and career opportunities from Cogdual Infotech Solutions.',
  applicationName: 'Cogdual' ,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Cogdual Infotech Solutions',
    description: 'Comprehensive HR, career, certification and industry–academia solutions for candidates, employers and colleges.',
    url: '/',
    siteName: 'Cogdual Infotech Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cogdual Infotech Solutions',
    description: 'Comprehensive HR & Career Solutions.',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf8f1' },
    { media: '(prefers-color-scheme: dark)', color: '#07131f' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <MobileNav />
        <CookieBanner />
        <PwaRegister />
      </body>
    </html>
  );
}
