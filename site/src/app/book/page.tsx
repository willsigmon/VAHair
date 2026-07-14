import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getAllStylists } from '@/lib/data/stylists';
import { ACUITY_EMBED_BASE_URL, ACUITY_EMBED_JS_URL } from '@/lib/acuity';
import BookPageClient from '@/components/booking/BookPageClient';

export const metadata: Metadata = pageMetadata(
  'Book Online | Virginia Page & Co. Hair Studio',
  '/book',
  'Schedule your next hair appointment online. Choose your stylist and service for instant booking.'
);

export default function BookPage() {
  // Use centralized stylist data
  const stylists = getAllStylists();

  return (
    <>
      {/* Acuity embed preconnects + embed.js (React hoists link tags to <head>) */}
      <link rel="preconnect" href="https://embed.acuityscheduling.com" />
      <link rel="dns-prefetch" href="https://embed.acuityscheduling.com" />
      <link rel="preconnect" href="https://app.acuityscheduling.com" />
      <script src={ACUITY_EMBED_JS_URL} defer />

      <BookPageClient
        stylists={stylists.map((s) => ({ id: s.id, name: s.name }))}
        embedBaseUrl={ACUITY_EMBED_BASE_URL}
      />

      {/* Info Cards with icons */}
      <section className="py-20 px-6 bg-[var(--color-cream-dark)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8" data-stagger="0.1">
            {/* Questions */}
            <div className="info-card group text-center p-8 bg-white rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-tilt="5">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/10 to-[var(--color-blush)]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-7 h-7 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 transition-colors duration-300 group-hover:text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-display)' }}>Questions?</h3>
              <p className="text-[var(--color-taupe)] mb-4">Give us a call</p>
              <a href="tel:9196718353" className="text-lg font-medium hover:text-[var(--color-gold)] transition-colors inline-flex items-center gap-2">
                (919) 671-8353
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Location */}
            <div className="info-card group text-center p-8 bg-white rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-tilt="5">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/10 to-[var(--color-blush)]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-7 h-7 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 transition-colors duration-300 group-hover:text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-display)' }}>Location</h3>
              <address className="text-[var(--color-taupe)] not-italic">
                104 South Main Street<br />
                Rolesville, NC 27571
              </address>
            </div>

            {/* Cancellations */}
            <div className="info-card group text-center p-8 bg-white rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-tilt="5">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/10 to-[var(--color-blush)]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-7 h-7 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 transition-colors duration-300 group-hover:text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-display)' }}>Cancellations</h3>
              <p className="text-[var(--color-taupe)]">
                Need to reschedule?<br />
                Use the link in your confirmation email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
