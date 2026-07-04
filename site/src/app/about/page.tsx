import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import SmartBookButton from '@/components/booking/SmartBookButton';

export const metadata: Metadata = pageMetadata(
  'About Us | Virginia Page & Co. Hair Studio',
  '/about',
  'Meet Virginia, Kim, and Alyssa - over 40 years combined experience bringing out your best look in Rolesville, NC.'
);

export default function AboutPage() {
  const virginiaYears = new Date().getFullYear() - 2009;

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-28 px-6 relative overflow-hidden" data-particles="6" data-particle-color="rgba(196, 169, 98, 0.15)">
        {/* Ambient decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[var(--color-gold)]/5 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative" data-reveal>
          <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-4 block">Our Story</span>
          <h1 className="display-lg mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Meet Your Stylists
          </h1>
          <p className="text-xl text-[var(--color-taupe)] max-w-2xl mx-auto text-balance leading-relaxed">
            Three talented stylists, one shared passion: helping you feel beautiful.
          </p>
        </div>
      </section>

      {/* Virginia */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="img-frame aspect-square bg-[var(--color-cream-dark)]" data-tilt="5" data-reveal="left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/virginia.jpg"
                alt="Virginia Page Watkins"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>

            {/* Content */}
            <div className="max-w-xl" data-reveal="right">
              <h2 className="text-4xl lg:text-5xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Virginia Page Watkins
              </h2>
              <div className="divider mb-8" />

              <p className="text-[var(--color-taupe)] text-lg leading-relaxed mb-6">
                Virginia has been doing hair for {virginiaYears} years, starting her career at age 19 at Mitchell&apos;s Hairstyling in Raleigh. Today, she owns her own salon in her hometown of Rolesville.
              </p>

              <p className="text-[var(--color-taupe)] text-lg leading-relaxed mb-8">
                As a mother of two daughters, Olivia and Jacklyn, Virginia believes in setting an example of female entrepreneurship for the next generation.
              </p>

              <blockquote className="border-l-2 border-[var(--color-gold)] pl-6 mb-8">
                <p className="text-xl italic" style={{ fontFamily: 'var(--font-display)' }}>
                  &quot;Everyone deserves to express themselves through their hair and feel beautiful in it.&quot;
                </p>
              </blockquote>

              <p className="text-sm text-[var(--color-taupe)] italic mb-10">
                Proverbs 31:13 — &quot;She selects wool and flax and works with willing hands.&quot;
              </p>

              <div>
                <SmartBookButton calendarId={13484734} stylistName="Virginia" variant="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kim */}
      <section className="py-24 px-6 bg-[var(--color-cream-dark)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content (order swapped on desktop) */}
            <div className="max-w-xl lg:order-1 order-2" data-reveal="left">
              <h2 className="text-4xl lg:text-5xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Kim Latham
              </h2>
              <div className="divider mb-8" />

              <p className="text-[var(--color-taupe)] text-lg leading-relaxed mb-6">
                With 20 years of hair styling experience, Kim brings unmatched expertise and artistry to every client. She previously worked alongside Virginia at Mitchell&apos;s Hairstyling in Raleigh.
              </p>

              <p className="text-[var(--color-taupe)] text-lg leading-relaxed mb-10">
                Kim and Virginia have been friends for 15 years, sharing not just a profession but a genuine bond. Kim is married to Joe and has one son, Joseph, who is 9 years old.
              </p>

              <div>
                <SmartBookButton calendarId={13484780} stylistName="Kim" variant="primary" />
              </div>
            </div>

            {/* Image */}
            <div className="img-frame aspect-square bg-[var(--color-blush)] lg:order-2 order-1" data-tilt="5" data-reveal="right">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/kim.jpg"
                alt="Kim Latham"
                className="w-full h-full object-cover object-[center_25%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Alyssa */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="img-frame aspect-square bg-[var(--color-cream-dark)]" data-tilt="5" data-reveal="left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/alyssa.jpg"
                alt="Alyssa Valdes at Virginia Page & Co."
                className="w-full h-full object-cover object-[center_15%]"
              />
            </div>

            {/* Content */}
            <div className="max-w-xl" data-reveal="right">
              <h2 className="text-4xl lg:text-5xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Alyssa
              </h2>
              <div className="divider mb-8" />

              <p className="text-[var(--color-taupe)] text-lg leading-relaxed mb-6">
                With six years behind the chair, Alyssa specializes in lived-in color and dimensional blonding designed to grow out effortlessly. Her work is all about natural brightness, soft blends, and modern, low-maintenance looks.
              </p>

              <p className="text-[var(--color-taupe)] text-lg leading-relaxed mb-6">
                Alyssa brings a calm, intentional approach to every appointment, creating a relaxed experience from consultation to finish. She&apos;s extension-certified and detail-oriented in her craft.
              </p>

              <p className="text-[var(--color-taupe)] text-lg leading-relaxed mb-8">
                Outside the salon, you&apos;ll find her traveling, gardening, enjoying good coffee, or lost in a book.
              </p>

              {/* Alyssa's Hours */}
              <div className="bg-[var(--color-cream-dark)] p-6 rounded-lg mb-8">
                <h3 className="text-lg font-medium mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  Hours <span className="text-sm font-normal text-[var(--color-taupe)]">(rotating schedule)</span>
                </h3>
                <p className="text-sm text-[var(--color-taupe)] mb-4">
                  Alyssa alternates weeks - Week A starts Tuesday; Week B starts Wednesday.
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-[var(--color-taupe)] mb-3">Week A</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[var(--color-taupe)]">Tuesday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-taupe)]">Thursday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-taupe)]">Friday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs tracking-widest uppercase text-[var(--color-taupe)] mb-3">Week B</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[var(--color-taupe)]">Wednesday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-taupe)]">Thursday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-taupe)]">Friday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-taupe)]">Saturday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[var(--color-taupe)]/70 italic mb-10">
                Note: Alyssa specializes in adult women&apos;s hair services only.
              </p>

              <div>
                <SmartBookButton calendarId={13484805} stylistName="Alyssa" variant="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 px-6 bg-[var(--color-cream-dark)] relative overflow-hidden" data-particles="8" data-particle-color="rgba(196, 169, 98, 0.18)">
        {/* Ambient decoration */}
        <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-[var(--color-gold)]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-[var(--color-gold)]/5 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative" data-reveal>
          <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-4 block">Since 2020</span>
          <h2 className="display-md mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Our Story
          </h2>
          <p className="text-xl text-[var(--color-taupe)] leading-relaxed mb-6 max-w-3xl mx-auto">
            Virginia Page & Co. Hair Studio was born from a dream: to create a space in downtown Rolesville where clients feel welcomed, valued, and confident in their appearance.
          </p>
          <p className="text-xl text-[var(--color-taupe)] leading-relaxed mb-12 max-w-3xl mx-auto">
            With over 40 years of combined experience, we&apos;ve had the privilege of helping countless clients discover styles that make them feel like the best version of themselves.
          </p>
          <a href="/book" className="btn btn-primary text-base px-10 py-4">
            Book Your Appointment
          </a>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-28 px-6 bg-[var(--color-charcoal)] text-[var(--color-cream)] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="divider mx-auto mb-10" style={{ background: 'linear-gradient(90deg, var(--color-gold), transparent)' }} />
          <blockquote>
            <p className="display-md italic text-glow-gold" style={{ fontFamily: 'var(--font-display)' }}>
              &quot;If it makes you feel beautiful<span className="text-[var(--color-gold)]">...</span> do it.&quot;
            </p>
          </blockquote>
        </div>
      </section>
    </>
  );
}
