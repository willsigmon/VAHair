import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getAllStylists } from '@/lib/data/stylists';
import { ACUITY_EMBED_BASE_URL } from '@/lib/acuity';
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

      <BookPageClient
        stylists={stylists.map((s) => ({ id: s.id, name: s.name }))}
        embedBaseUrl={ACUITY_EMBED_BASE_URL}
      />

      {/* Practical notes, set like the back of an appointment card */}
      <section className="py-20 px-6 bg-[var(--color-cream-dark)]">
        <div className="book-notes max-w-5xl mx-auto">
          <div className="book-note">
            <h3>Questions?</h3>
            <p className="text-[var(--color-taupe)] mb-2">Give us a call</p>
            <a href="tel:9196718353" className="text-2xl hover:text-[var(--color-gold-dark)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
              (919) 671-8353
            </a>
          </div>

          <div className="book-note">
            <h3>Location</h3>
            <address className="text-[var(--color-taupe)] not-italic">
              104 South Main Street<br />
              Rolesville, NC 27571
            </address>
          </div>

          <div className="book-note">
            <h3>Cancellations</h3>
            <p className="text-[var(--color-taupe)]">
              Need to reschedule?<br />
              Use the link in your confirmation email.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
