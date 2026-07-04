import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/global.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  other: {
    'geo.region': 'US-NC',
    'geo.placename': 'Rolesville',
    'geo.position': '35.9232013;-78.4577758',
  },
};

const hairSalonSchema = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'Virginia Page & Co. Hair Studio',
  url: 'https://vahair.studio',
  telephone: '+1-919-671-8353',
  email: 'vacohairstudio@gmail.com',
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
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '09:30', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '09:30', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '09:30', closes: '16:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:30', closes: '14:00' },
  ],
  priceRange: '$$',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font preloading for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.acuityscheduling.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hairSalonSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
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

        {/* Animations (deferred for better performance) */}
        <script src="/scripts/animations.js" defer />

        {/* Native 0-dependency haptics tactile engine */}
        <script src="/scripts/haptics.js" defer />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
