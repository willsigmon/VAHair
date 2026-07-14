import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/global.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION } from '@/lib/seo';

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: '/manifest.webmanifest',
  category: 'beauty',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  other: {
    'geo.region': 'US-NC',
    'geo.placename': 'Rolesville',
    'geo.position': '35.9232013;-78.4577758',
    ICBM: '35.9232013, -78.4577758',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF7F2',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['HairSalon', 'LocalBusiness'],
      '@id': `${SITE_URL}/#salon`,
      name: SITE_NAME,
      alternateName: 'Virginia & Co. Hair Studio',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo-header.png`,
      image: [`${SITE_URL}/images/hero.jpg`, `${SITE_URL}/images/salon.jpg`],
      description: DEFAULT_DESCRIPTION,
      telephone: '+1-919-671-8353',
      email: 'vacohairstudio@gmail.com',
      priceRange: '$$',
      currenciesAccepted: 'USD',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '104 South Main Street',
        addressLocality: 'Rolesville',
        addressRegion: 'NC',
        postalCode: '27571',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 35.9232013,
        longitude: -78.4577758,
      },
      areaServed: [
        { '@type': 'City', name: 'Rolesville' },
        { '@type': 'AdministrativeArea', name: 'Wake County' },
      ],
      sameAs: [
        'https://instagram.com/vahairco',
        'https://facebook.com/vahairco',
      ],
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '09:30', closes: '17:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '09:30', closes: '17:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '09:30', closes: '16:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:30', closes: '14:00' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Salon services',
        itemListElement: ['Haircuts', 'Hair color', 'Highlights', 'Hair styling', 'Hair treatments', 'Facial waxing'].map((name) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name,
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#salon` },
      inLanguage: 'en-US',
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://app.acuityscheduling.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} min-h-screen flex flex-col`}>
        {/* Skip Navigation Link (Accessibility) */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Scroll Progress Bar */}
        <div
          data-scroll-progress
          className="fixed top-0 left-0 h-[2px] bg-[var(--color-gold)] z-[9999] pointer-events-none"
          style={{ width: '0%' }}
        />

        <Header />
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          {children}
        </main>
        <Footer />

        {/* Run DOM-enhancement scripts only after React hydration. */}
        <Script src="/scripts/animations.js" strategy="afterInteractive" />
        <Script src="/scripts/haptics.js" strategy="afterInteractive" />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
