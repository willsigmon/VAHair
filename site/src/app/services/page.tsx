import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import PriceList from '@/components/PriceList';
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

interface MenuSectionProps {
  id: string;
  title: string;
  subtitle: string;
  aside?: ReactNode;
  tone?: 'plain' | 'tinted';
  children: ReactNode;
}

/** One page of the printed menu: heading in the margin, prices on the right. */
function MenuSection({ id, title, subtitle, aside, tone = 'plain', children }: MenuSectionProps) {
  return (
    <section id={id} className={`menu-section py-24 px-6 scroll-mt-24${tone === 'tinted' ? ' bg-[var(--color-cream-dark)]' : ''}`}>
      <div className="menu-section-grid max-w-6xl mx-auto">
        <header className="menu-section-head" data-reveal>
          <h2>{title}</h2>
          <p className="menu-subtitle">{subtitle}</p>
          {aside}
        </header>
        <div className="menu-section-body">{children}</div>
      </div>
    </section>
  );
}

function BookLink({ href, label, text }: { href: string; label: string; text: string }) {
  return (
    <div className="mt-10">
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="btn btn-outline">
        {text}
      </a>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="services-hero pt-20 pb-28 px-6">
        <div className="max-w-6xl mx-auto" data-reveal>
          <span className="eyebrow">Menu</span>
          <h1 className="display-lg mb-8">Our Services</h1>
          <p className="text-xl text-[var(--color-taupe)] max-w-2xl leading-relaxed">
            Cuts, color, styling, and finishing touches. Browse starting prices below; final pricing is discussed during your consultation.
          </p>
        </div>
      </section>

      <MenuSection id="haircuts" title="Haircuts" subtitle="Precision cuts tailored to you">
        <PriceList items={haircuts} />
        <BookLink href={acuityBookingUrlForCategory('Haircuts')} label="Book a Haircut (opens in new window)" text="Book a Haircut" />
      </MenuSection>

      <MenuSection
        id="color"
        tone="tinted"
        title="Hair Color"
        subtitle="From subtle to stunning"
        aside={
          <figure className="menu-photo menu-photo-tilt">
            <div className="relative aspect-[4/5]">
              <Image src="/images/salon-styling.jpg" alt="A stylist blow-dries a client's hair at a styling station in a bright, cream-toned salon" fill sizes="(min-width: 1024px) 300px, 240px" className="object-cover object-[center_55%]" />
            </div>
          </figure>
        }
      >
        <PriceList items={colorServices} />
        <p className="menu-footnote">
          * Color services do not include haircut or blowdry. These may be added as separate services.
        </p>
        <BookLink href={acuityBookingUrlForCategory('Color')} label="Book Color Service (opens in new window)" text="Book Color Service" />
      </MenuSection>

      <MenuSection id="extras" title="Extras" subtitle="Treatments & finishing touches">
        <PriceList items={extras} />
        <BookLink href={acuityBookingUrlForCategory('Extras')} label="Book Extras (opens in new window)" text="Book Extras" />
      </MenuSection>

      <MenuSection
        id="alyssa"
        tone="tinted"
        title="Alyssa's Services"
        subtitle="Lived-in color & dimensional blonding specialist"
        aside={
          <>
            <figure className="menu-photo">
              <div className="relative aspect-[4/5]">
                <Image src="/images/alyssa.jpg" alt="Alyssa Valdes at Virginia Page & Co." fill sizes="(min-width: 1024px) 28vw, 80vw" className="object-cover object-[center_15%]" />
              </div>
            </figure>
            <p className="menu-footnote">
              Alyssa specializes in adult women&apos;s hair services only. All lightening services include a glaze. Add root coverage to any lightening appointment for additional $50.
            </p>
          </>
        }
      >
        <h3 className="menu-group">Lightening Services</h3>
        <PriceList items={alyssaLightening} />

        <h3 className="menu-group">Color Services</h3>
        <PriceList items={alyssaColor} />

        <h3 className="menu-group">Haircuts</h3>
        <PriceList items={alyssaHaircuts} />

        <h3 className="menu-group">Treatments</h3>
        <PriceList items={alyssaTreatments} />

        <h3 className="menu-group">Extensions</h3>
        <PriceList items={alyssaExtensions} />
        <p className="menu-footnote">* New extension installs require a consultation first.</p>

        <BookLink href={acuityBookingUrlForCalendar(13484805)} label="Book with Alyssa (opens in new window)" text="Book with Alyssa" />
      </MenuSection>

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
