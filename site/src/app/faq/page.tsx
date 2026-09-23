import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { FAQS } from '@/lib/data/faqs';

export const metadata: Metadata = pageMetadata(
  'FAQ | Virginia Page & Co. Hair Studio',
  '/faq',
  'Frequently asked questions about appointments, services, and policies at Virginia Page & Co. Hair Studio in Rolesville, NC.'
);

const faqs = FAQS;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="pt-20 pb-28 px-6 relative overflow-hidden" data-particles="6" data-particle-color="rgba(196, 169, 98, 0.15)">
        {/* Ambient decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[var(--color-gold)]/5 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative" data-reveal>
          <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-4 block">Help Center</span>
          <h1 className="display-lg mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-[var(--color-taupe)] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about visiting our salon.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 px-6 bg-[var(--color-cream-dark)]">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-white rounded-xl overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-[var(--color-cream)]/50 transition-colors">
                  <span className="text-lg font-medium pr-4" style={{ fontFamily: 'var(--font-display)' }}>
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center group-open:bg-[var(--color-gold)] transition-colors">
                    <svg
                      className="w-3 h-3 text-[var(--color-gold)] group-open:text-white group-open:rotate-180 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[var(--color-taupe)]">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-b from-[var(--color-cream-dark)] to-[var(--color-cream)] relative overflow-hidden">
        {/* Ambient gold glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="divider mx-auto mb-8" />
          <h2 className="display-md mb-8 text-balance" style={{ fontFamily: 'var(--font-display)' }}>
            Still have questions?
          </h2>
          <p className="text-xl text-[var(--color-taupe)] mb-12 max-w-xl mx-auto">
            We&apos;re happy to help. Give us a call or send us a message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:9196718353" className="btn btn-primary text-base px-10 py-4">
              Call (919) 671-8353
            </a>
            <a href="/contact" className="btn btn-outline text-base px-10 py-4">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
