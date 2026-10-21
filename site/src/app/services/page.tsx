import type { Metadata } from 'next';
import { haircuts, colorServices, extras, alyssaLightening, alyssaColor, alyssaHaircuts, alyssaTreatments, alyssaExtensions } from '@/lib/data/services';
import { SERVICE_FAQS } from '@/lib/data/faqs';
import FaqList from '@/components/FaqList';
import { pageMetadata } from '@/lib/seo';
import { acuityBookingUrlForCalendar, acuityBookingUrlForCategory } from '@/lib/acuity';

export const metadata: Metadata = pageMetadata(
  'Hair Services & Pricing | Virginia Page & Co. Hair Studio',
  '/services',
  'View starting prices for haircuts, color, highlights, styling, treatments, and facial waxing in downtown Rolesville, NC.'
);

interface ServiceItem {
  name: string;
  price: string;
}

function ServiceRows({ services, border }: { services: ServiceItem[]; border: 'cream' | 'blush' }) {
  const borderClass = border === 'blush' ? 'border-[var(--color-blush)]' : 'border-[var(--color-cream-dark)]';
  return (
    <>
      {services.map((service) => (
        <div
          key={service.name}
          className={`service-row group flex justify-between gap-6 items-baseline py-5 border-b ${borderClass} hover:border-[var(--color-gold)] transition-colors`}
        >
          <span className="text-lg group-hover:text-[var(--color-charcoal)] transition-colors">{service.name}</span>
          <span className="shrink-0 tabular-nums text-lg text-[var(--color-taupe)] transition-colors">{service.price}</span>
        </div>
      ))}
    </>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-28 px-6 relative overflow-hidden">
        {/* Ambient decoration */}
        <div className="max-w-4xl mx-auto text-center relative" data-reveal>
          <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-4 block">Menu</span>
          <h1 className="display-lg mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Our Services
          </h1>
          <p className="text-xl text-[var(--color-taupe)] max-w-2xl mx-auto leading-relaxed">
            Cuts, color, styling, and finishing touches. Browse starting prices below; final pricing is discussed during your consultation.
          </p>
        </div>
      </section>

      {/* Haircuts */}
      <section id="haircuts" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-12" data-reveal>
            <span aria-hidden="true" className="text-6xl font-light text-[var(--color-gold-dark)]" style={{ fontFamily: 'var(--font-display)' }}>01</span>
            <div>
              <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>Haircuts</h2>
              <p className="text-[var(--color-taupe)]">Precision cuts tailored to you</p>
            </div>
          </div>

          <div className="space-y-0">
            <ServiceRows services={haircuts} border="cream" />
          </div>

          <div className="mt-10">
            <a
              href={acuityBookingUrlForCategory('Haircuts')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a Haircut (opens in new window)"
              className="btn btn-outline"
            >
              Book a Haircut
            </a>
          </div>
        </div>
      </section>

      {/* Color */}
      <section id="color" className="py-24 px-6 bg-[var(--color-cream-dark)] scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-12" data-reveal>
            <span aria-hidden="true" className="text-6xl font-light text-[var(--color-gold-dark)]" style={{ fontFamily: 'var(--font-display)' }}>02</span>
            <div>
              <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>Hair Color</h2>
              <p className="text-[var(--color-taupe)]">From subtle to stunning</p>
            </div>
          </div>

          <div className="space-y-0">
            <ServiceRows services={colorServices} border="blush" />
          </div>

          <p className="mt-6 text-sm text-[var(--color-taupe)] italic">
            * Color services do not include haircut or blowdry. These may be added as separate services.
          </p>

          <div className="mt-10">
            <a
              href={acuityBookingUrlForCategory('Color')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book Color Service (opens in new window)"
              className="btn btn-outline"
            >
              Book Color Service
            </a>
          </div>
        </div>
      </section>

      {/* Extras */}
      <section id="extras" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-12" data-reveal>
            <span aria-hidden="true" className="text-6xl font-light text-[var(--color-gold-dark)]" style={{ fontFamily: 'var(--font-display)' }}>03</span>
            <div>
              <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>Extras</h2>
              <p className="text-[var(--color-taupe)]">Treatments & finishing touches</p>
            </div>
          </div>

          <div className="space-y-0">
            <ServiceRows services={extras} border="cream" />
          </div>

          <div className="mt-10">
            <a
              href={acuityBookingUrlForCategory('Extras')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book Extras (opens in new window)"
              className="btn btn-outline"
            >
              Book Extras
            </a>
          </div>
        </div>
      </section>

      {/* Alyssa's Services */}
      <section id="alyssa" className="py-24 px-6 bg-[var(--color-cream-dark)] scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-6" data-reveal>
            <span aria-hidden="true" className="text-6xl font-light text-[var(--color-gold-dark)]" style={{ fontFamily: 'var(--font-display)' }}>04</span>
            <div>
              <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>Alyssa&apos;s Services</h2>
              <p className="text-[var(--color-taupe)]">Lived-in color & dimensional blonding specialist</p>
            </div>
          </div>

          <p className="text-sm text-[var(--color-taupe)] italic mb-12">
            Alyssa specializes in adult women&apos;s hair services only. All lightening services include a glaze. Add root coverage to any lightening appointment for additional $50.
          </p>

          {/* Lightening Services */}
          <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>Lightening Services</h3>
          <div className="space-y-0 mb-12">
            <ServiceRows services={alyssaLightening} border="blush" />
          </div>

          {/* Color Services */}
          <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>Color Services</h3>
          <div className="space-y-0 mb-12">
            <ServiceRows services={alyssaColor} border="blush" />
          </div>

          {/* Haircuts */}
          <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>Haircuts</h3>
          <div className="space-y-0 mb-12">
            <ServiceRows services={alyssaHaircuts} border="blush" />
          </div>

          {/* Treatments */}
          <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>Treatments</h3>
          <div className="space-y-0 mb-12">
            <ServiceRows services={alyssaTreatments} border="blush" />
          </div>

          {/* Extensions */}
          <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>Extensions</h3>
          <div className="space-y-0">
            <ServiceRows services={alyssaExtensions} border="blush" />
          </div>
          <p className="mt-4 text-sm text-[var(--color-taupe)] italic">
            * New extension installs require a consultation first.
          </p>

          <div className="mt-10">
            <a
              href={acuityBookingUrlForCalendar(13484805)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book with Alyssa (opens in new window)"
              className="btn btn-outline"
            >
              Book with Alyssa
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="display-md mb-8">Before you book</h2>
          <FaqList faqs={SERVICE_FAQS} />
        </div>
      </section>

      {/* Disclaimer & CTA */}
      <section className="py-28 px-6 bg-[var(--color-charcoal)] text-[var(--color-cream)] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="max-w-3xl mx-auto text-center relative" data-reveal>
          <div className="divider mx-auto mb-10" style={{ background: 'linear-gradient(90deg, var(--color-gold), transparent)' }} />
          <p className="text-lg text-[var(--color-cream)]/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            All prices are subject to change per consultation before service. Final pricing may vary based on hair length, thickness, and condition.
          </p>
          <a
            href="/book"
            className="btn btn-primary bg-[var(--color-cream)] text-[var(--color-charcoal)] border-[var(--color-cream)] hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] text-base px-10 py-4"
          >
            Book Your Appointment
          </a>
        </div>
      </section>
    </>
  );
}
