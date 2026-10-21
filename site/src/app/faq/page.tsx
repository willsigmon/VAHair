import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { FAQS } from '@/lib/data/faqs';
import FaqList from '@/components/FaqList';

export const metadata: Metadata = pageMetadata(
  'FAQ | Virginia Page & Co. Hair Studio',
  '/faq',
  'Frequently asked questions about appointments, services, and policies at Virginia Page & Co. Hair Studio in Rolesville, NC.'
);

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-28 px-6 relative overflow-hidden">
        {/* Ambient decoration */}
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
          <FaqList faqs={FAQS} />
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-b from-[var(--color-cream-dark)] to-[var(--color-cream)] relative overflow-hidden">
        {/* Ambient gold glow background */}
        <div className="absolute inset-0 pointer-events-none">
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
