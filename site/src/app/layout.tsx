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
import { SALON } from '@/lib/salon';
import WebMcpProvider from '@/components/agent/WebMcpProvider';

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
      alternateName: SALON.alternateName,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo-header.png`,
      image: [`${SITE_URL}/images/hero.jpg`, `${SITE_URL}/images/salon.jpg`],
      description: DEFAULT_DESCRIPTION,
      telephone: SALON.phoneE164,
      email: SALON.email,
      priceRange: '$$',
      currenciesAccepted: 'USD',
      address: {
        '@type': 'PostalAddress',
        streetAddress: SALON.address.street,
        addressLocality: SALON.address.city,
        addressRegion: SALON.address.region,
        postalCode: SALON.address.postalCode,
        addressCountry: SALON.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SALON.geo.latitude,
        longitude: SALON.geo.longitude,
      },
      areaServed: [
        { '@type': 'City', name: 'Rolesville' },
        { '@type': 'AdministrativeArea', name: 'Wake County' },
      ],
      sameAs: [...SALON.social],
      openingHoursSpecification: SALON.hours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.day,
        opens: h.opens,
        closes: h.closes,
      })),
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

        <WebMcpProvider />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
