import type { Metadata } from 'next';
import Image from 'next/image';
import { pageMetadata } from '@/lib/seo';
import { getHomepageStylists } from '@/lib/data/stylists';

export const metadata: Metadata = pageMetadata(
  'Virginia Page & Co. Hair Studio | Rolesville, NC Hair Salon',
  '/'
);

export default function HomePage() {
  // Use centralized stylist data
  const stylists = getHomepageStylists();

  return (
    <>
      {/* Hero Section - Full Viewport */}
      <section className="relative min-h-[100svh] flex items-center justify-center -mt-24">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Virginia Page & Co. Hair Studio - professional styling environment"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <p className="text-lg md:text-xl tracking-widest uppercase mb-6 animate-fade-up hero-text-shadow" style={{ animationDelay: '0.2s' }}>
            Rolesville, NC
          </p>
          <h1 className="display-xl mb-6 animate-fade-up hero-text-shadow leading-[0.9]" style={{ animationDelay: '0.4s', fontFamily: 'var(--font-display)' }}>
            <span className="italic font-light">If it makes you</span><br />
            <span className="font-medium">feel beautiful</span>
          </h1>
          <p className="text-4xl md:text-6xl font-light tracking-wide mb-12 animate-fade-up" style={{ animationDelay: '0.6s', fontFamily: 'var(--font-display)' }}>
            <span className="text-glow-breathe" style={{ color: '#C4A962' }}>Do it.</span>
          </p>
          <div className="animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <a href="/book" className="btn btn-primary btn-hero-cta bg-[var(--color-cream)] text-[var(--color-charcoal)] border-[var(--color-cream)] hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] text-base px-8 py-4">
              Book Your Appointment
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-cream)]/60">
          <div className="w-px h-16 bg-gradient-to-b from-current to-transparent mx-auto mb-2" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-16 md:py-20 px-6 bg-[var(--color-charcoal)] text-[var(--color-cream)] relative overflow-hidden" data-particles="8" data-particle-color="rgba(196, 169, 98, 0.2)">
        {/* Subtle ambient glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--color-gold)]/5 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--color-gold)]/5 blur-3xl" />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center" data-stagger="0.15">
            <div className="group">
              <p className="text-4xl md:text-5xl font-light mb-2 text-[var(--color-cream)] group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}><span>40</span><span className="text-[var(--color-gold)]">+</span></p>
              <p className="text-xs text-[var(--color-cream)]/60 uppercase tracking-widest">Years Combined<br className="hidden md:block" /> Experience</p>
            </div>
            <div className="group">
              <p className="text-4xl md:text-5xl font-light mb-2 text-[var(--color-cream)] group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}><span>3</span></p>
              <p className="text-xs text-[var(--color-cream)]/60 uppercase tracking-widest">Expert<br className="hidden md:block" /> Stylists</p>
            </div>
            <div className="group">
              <p className="text-2xl md:text-3xl font-light mb-2 text-[var(--color-gold)] tracking-wider" role="img" aria-label="5 out of 5 stars">★★★★★</p>
              <p className="text-xs text-[var(--color-cream)]/60 uppercase tracking-widest">5-Star<br className="hidden md:block" /> Reviews</p>
            </div>
            <div className="group">
              <p className="text-4xl md:text-5xl font-light mb-2 text-[var(--color-cream)] group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>♥</p>
              <p className="text-xs text-[var(--color-cream)]/60 uppercase tracking-widest">Downtown<br className="hidden md:block" /> Rolesville</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 bg-[var(--color-cream-dark)]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20" data-reveal>
            <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-4 block">Our Services</span>
            <h2 className="display-md mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Crafted with care, tailored to you
            </h2>
            <p className="text-[var(--color-taupe)] text-lg">
              From precision cuts to stunning color transformations
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-10 mb-16" data-stagger="0.15">
            {/* Haircuts */}
            <a href="/services#haircuts" className="group card card-shine p-12 text-center hover-lift rounded-2xl relative overflow-hidden" data-tilt="8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/15 to-[var(--color-gold)]/5 flex items-center justify-center icon-ring-gold transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-10 h-10 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
              </div>
              <h3 className="text-2xl mb-4 group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>Haircuts</h3>
              <p className="text-[var(--color-taupe)] mb-8 leading-relaxed">Precision cuts tailored to your unique style, face shape, and lifestyle.</p>
              <p className="text-3xl font-light text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>From <span className="font-medium">$30</span></p>
            </a>

            {/* Color */}
            <a href="/services#color" className="group card card-shine p-12 text-center hover-lift rounded-2xl relative overflow-hidden md:translate-y-6" data-tilt="8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-blush)] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[var(--color-blush)]/30 to-[var(--color-blush)]/10 flex items-center justify-center icon-ring-gold transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-10 h-10 text-[var(--color-taupe)] group-hover:text-[var(--color-gold)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl mb-4 group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>Hair Color</h3>
              <p className="text-[var(--color-taupe)] mb-8 leading-relaxed">From subtle highlights to bold transformations that turn heads.</p>
              <p className="text-3xl font-light text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>From <span className="font-medium">$95</span></p>
            </a>

            {/* Treatments */}
            <a href="/services#extras" className="group card card-shine p-12 text-center hover-lift rounded-2xl relative overflow-hidden" data-tilt="8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-taupe)] to-transparent opacity-40 group-hover:opacity-80 transition-opacity" />
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[var(--color-taupe)]/15 to-[var(--color-taupe)]/5 flex items-center justify-center icon-ring-gold transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-10 h-10 text-[var(--color-taupe)] group-hover:text-[var(--color-gold)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl mb-4 group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>Finishing Touches</h3>
              <p className="text-[var(--color-taupe)] mb-8 leading-relaxed">Polished styling, brow tinting, and facial waxing to complete your look.</p>
              <p className="text-3xl font-light text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>From <span className="font-medium">$20</span></p>
            </a>
          </div>

          <div className="text-center" data-reveal>
            <a href="/services" className="btn btn-outline" data-magnetic>
              View Full Menu
            </a>
          </div>
        </div>
      </section>

      {/* Stylists Preview */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stylists.map((stylist) => (
              <div key={stylist.id} className="group relative overflow-hidden bg-[var(--color-cream-dark)] border-glow-gold rounded-3xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={stylist.image}
                    alt={`Portrait of ${stylist.fullName}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${stylist.imagePosition ?? ''}`.trim()}
                  />
                </div>
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-40% to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-4xl mb-6 text-white leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                    {stylist.name}
                  </h3>
                  <a
                    href={stylist.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Book appointment with ${stylist.name} (opens in new window)`}
                    className="btn bg-[var(--color-gold)] text-[var(--color-charcoal)] border-[var(--color-gold)] hover:bg-[var(--color-gold-light)] hover:border-[var(--color-gold-light)] hover:shadow-[0_0_30px_rgba(196,169,98,0.4)] transition-all duration-300"
                  >
                    Book {stylist.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-[var(--color-cream-dark)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20" data-reveal>
            <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-4 block">What Clients Say</span>
            <h2 className="display-md" style={{ fontFamily: 'var(--font-display)' }}>
              Loved by our community
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10" data-stagger="0.2">
            <div className="group card-shine bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative">
              {/* Decorative quote */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-[var(--color-gold)] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="flex gap-1 mb-6 text-[var(--color-gold)] text-xl" role="img" aria-label="5 out of 5 stars">
                <span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span>
              </div>
              <p className="text-[var(--color-charcoal-light)] mb-8 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-display)' }}>
                &quot;Virginia is amazing! She listens to what you want and delivers every time. I&apos;ve been coming here for years and wouldn&apos;t go anywhere else.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                  <span className="text-[var(--color-gold)] font-medium">S</span>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-charcoal)]">Sarah M.</p>
                  <p className="text-sm text-[var(--color-taupe)]">Loyal client</p>
                </div>
              </div>
            </div>

            <div className="group card-shine bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative md:translate-y-4">
              {/* Decorative quote */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-[var(--color-gold)] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="flex gap-1 mb-6 text-[var(--color-gold)] text-xl" role="img" aria-label="5 out of 5 stars">
                <span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span>
              </div>
              <p className="text-[var(--color-charcoal-light)] mb-8 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-display)' }}>
                &quot;Best salon in Rolesville! Kim did an incredible job with my highlights. The atmosphere is so welcoming and relaxing.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                  <span className="text-[var(--color-gold)] font-medium">J</span>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-charcoal)]">Jennifer L.</p>
                  <p className="text-sm text-[var(--color-taupe)]">Loyal client</p>
                </div>
              </div>
            </div>

            <div className="group card-shine bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative">
              {/* Decorative quote */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-[var(--color-gold)] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="flex gap-1 mb-6 text-[var(--color-gold)] text-xl" role="img" aria-label="5 out of 5 stars">
                <span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span>
              </div>
              <p className="text-[var(--color-charcoal-light)] mb-8 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-display)' }}>
                &quot;Alyssa transformed my hair! Her color work is truly artistic. I get compliments everywhere I go now.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                  <span className="text-[var(--color-gold)] font-medium">M</span>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-charcoal)]">Michelle R.</p>
                  <p className="text-sm text-[var(--color-taupe)]">Loyal client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-32 px-6 bg-[var(--color-charcoal)] text-[var(--color-cream)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Hours */}
            <div data-reveal="left">
              <span className="text-xs tracking-widest uppercase text-[var(--color-gold)] mb-4 block">Hours</span>
              <h2 className="display-md mb-12" style={{ fontFamily: 'var(--font-display)' }}>
                When to find us
              </h2>

              <div className="space-y-4 text-lg">
                <div className="flex justify-between py-3 border-b border-[var(--color-charcoal-light)] text-[var(--color-taupe)]">
                  <span>Monday</span>
                  <span>Closed</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--color-charcoal-light)]">
                  <span>Tuesday</span>
                  <span>9:30 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--color-charcoal-light)]">
                  <span>Wednesday</span>
                  <span>9:30 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--color-charcoal-light)]">
                  <span>Thursday</span>
                  <span>9:30 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--color-charcoal-light)]">
                  <span>Friday</span>
                  <span>9:30 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--color-charcoal-light)]">
                  <span>Saturday</span>
                  <span className="text-sm">Alternating weeks · 9 AM – 5 PM</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--color-charcoal-light)] text-[var(--color-taupe)]">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div data-reveal="right">
              <span className="text-xs tracking-widest uppercase text-[var(--color-gold)] mb-4 block">Location</span>
              <h2 className="display-md mb-12" style={{ fontFamily: 'var(--font-display)' }}>
                Where to find us
              </h2>

              <address className="not-italic text-xl text-[var(--color-cream)]/80 mb-8 leading-relaxed">
                104 South Main Street<br />
                Rolesville, NC 27571
              </address>

              <div className="space-y-4 mb-10">
                <a href="tel:9196718353" className="block text-xl hover:text-[var(--color-gold)] transition-colors">
                  (919) 671-8353
                </a>
                <a href="mailto:vacohairstudio@gmail.com" className="block text-xl hover:text-[var(--color-gold)] transition-colors">
                  vacohairstudio@gmail.com
                </a>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=104+South+Main+Street+Rolesville+NC+27571"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Virginia Page & Co. on Google Maps (opens in new window)"
                className="btn btn-outline border-[var(--color-cream)] text-[var(--color-cream)] hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)]"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Transition */}
      <div className="h-24 bg-gradient-to-b from-[var(--color-charcoal)] to-[var(--color-cream-dark)]" />

      {/* Instagram Section */}
      <section className="py-24 px-6 bg-[var(--color-cream-dark)]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16" data-reveal>
            <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-4 block">Follow Along</span>
            <h2 className="display-md mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              @vahairco
            </h2>
            <p className="text-[var(--color-taupe)] text-lg">
              See our latest work and get inspired for your next look
            </p>
          </div>

          <div className="text-center">
            <a href="https://instagram.com/vahairco" target="_blank" rel="noopener noreferrer" className="btn btn-outline" data-magnetic aria-label="Follow Virginia Page & Co. on Instagram (opens in new window)">
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-b from-[var(--color-cream-dark)] to-[var(--color-cream)] relative overflow-hidden" data-particles="10" data-particle-color="rgba(196, 169, 98, 0.25)">
        {/* Ambient gold glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto relative" data-reveal>
          <div className="divider mx-auto mb-8" />
          <h2 className="display-lg mb-8 text-balance text-glow-gold" style={{ fontFamily: 'var(--font-display)' }}>
            Ready for your transformation?
          </h2>
          <p className="text-xl text-[var(--color-taupe)] mb-12 max-w-xl mx-auto">
            Book your appointment today and let us help you feel beautiful.
          </p>
          <a href="/book" className="btn btn-primary text-base px-10 py-4 glow-pulse hover:shadow-[0_0_40px_rgba(196,169,98,0.5)]">
            Book Your Appointment
          </a>
        </div>
      </section>
    </>
  );
}
