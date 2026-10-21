import type { Metadata } from 'next';
import Image from 'next/image';
import { pageMetadata } from '@/lib/seo';
import { getHomepageStylists } from '@/lib/data/stylists';
import PriceList from '@/components/PriceList';

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
      <section className="home-hero relative flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Long blonde hair styled in loose waves"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Content */}
        <div className="hero-copy relative z-10 text-center px-6 max-w-5xl">
          <p className="text-lg md:text-xl tracking-widest uppercase mb-6 animate-fade-up hero-text-shadow" style={{ animationDelay: '0.2s' }}>
            Rolesville, NC
          </p>
          <h1 className="display-xl mb-6 animate-fade-up hero-text-shadow leading-[0.9]" style={{ animationDelay: '0.4s', fontFamily: 'var(--font-display)' }}>
            <span className="italic font-light">If it makes you</span><br />
            <span className="font-medium">feel beautiful</span>
          </h1>
          <p className="text-4xl md:text-6xl font-light tracking-wide mb-12 animate-fade-up" style={{ animationDelay: '0.6s', fontFamily: 'var(--font-display)' }}>
            <span className="hero-signoff" >Do it.</span>
          </p>
          <div className="animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <a href="/book" className="btn btn-primary btn-hero-cta bg-[var(--color-cream)] text-[var(--color-charcoal)] border-[var(--color-cream)] hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] text-base px-8 py-4">
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof: a single printed line, not a stat grid */}
      <section className="proof-line bg-[var(--color-charcoal)] text-[var(--color-cream)] px-6">
        <p className="max-w-6xl mx-auto">
          <span><strong>40<span className="text-[var(--color-gold)]">+</span></strong> Years Combined Experience</span>
          <span><strong>3</strong> Expert Stylists</span>
          <span><span className="proof-stars" role="img" aria-label="5 out of 5 stars">★★★★★</span> 5-Star Reviews</span>
          <span>Downtown Rolesville</span>
        </p>
      </section>

      {/* Services: a printed price card beside a photograph */}
      <section className="home-menu py-32 px-6 bg-[var(--color-cream-dark)]">
        <div className="home-menu-grid max-w-6xl mx-auto">
          <figure className="home-menu-photo" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/hero.jpg"
                alt="Long blonde hair styled in loose waves"
                fill
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="object-cover object-[65%_80%] scale-[1.5] origin-[65%_85%]"
              />
            </div>
            <figcaption className="hand-note">Rolesville, NC</figcaption>
          </figure>

          <div className="menu-card" data-reveal>
            <span className="eyebrow">Our Services</span>
            <h2 className="display-md mb-4">Crafted with care, tailored to you</h2>
            <p className="text-[var(--color-taupe)] text-lg mb-10">
              From precision cuts to stunning color transformations
            </p>

            <PriceList
              className="price-list-lg"
              items={[
                { href: '/services#haircuts', name: 'Haircuts', detail: 'Cuts and styling', price: 'From $25+' },
                { href: '/services#color', name: 'Hair Color', detail: 'Color, highlights & toning', price: 'From $75+' },
                { href: '/services#extras', name: 'Finishing Touches', detail: 'Brow tinting & facial waxing', price: 'From $20' },
              ]}
            />

            <a href="/services" className="btn btn-outline mt-12">
              View Full Menu
            </a>
          </div>
        </div>
      </section>

      {/* Stylists: three equal portraits, names set beneath like a program */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="display-md mb-16 lg:mb-20">Book with your stylist</h2>
          <div className="stylist-row">
            {stylists.map((stylist) => (
              <article key={stylist.id} className="stylist-portrait">
                <div className="stylist-photo relative">
                  <Image
                    src={stylist.image}
                    alt={`Portrait of ${stylist.fullName}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`object-cover ${stylist.imagePosition ?? ''}`.trim()}
                  />
                </div>
                <div className="stylist-caption">
                  <h3>{stylist.name}</h3>
                  <a
                    href={stylist.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Book appointment with ${stylist.name} (opens in new window)`}
                    className="btn btn-outline stylist-book"
                  >
                    Book with {stylist.name}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials: one lead pull-quote, two set in the margin */}
      <section className="testimonials py-32 px-6 bg-[var(--color-cream-dark)]">
        <div className="max-w-6xl mx-auto">
          <div className="testimonials-head" data-reveal>
            <span className="eyebrow">What Clients Say</span>
            <h2 className="display-md">Loved by our community</h2>
          </div>

          <div className="testimonials-grid">
            <figure className="quote quote-lead">
              <span className="quote-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </span>
              <div className="quote-stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>
                &quot;Virginia is amazing! She listens to what you want and delivers every time. I&apos;ve been coming here for years and wouldn&apos;t go anywhere else.&quot;
              </blockquote>
              <figcaption><strong>Sarah M.</strong> Loyal client</figcaption>
            </figure>

            <div className="quote-aside">
              <figure className="quote">
                <div className="quote-stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>
                  &quot;Best salon in Rolesville! Kim did an incredible job with my highlights. The atmosphere is so welcoming and relaxing.&quot;
                </blockquote>
                <figcaption><strong>Jennifer L.</strong> Loyal client</figcaption>
              </figure>
              <figure className="quote">
                <div className="quote-stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>
                  &quot;Alyssa transformed my hair! Her color work is truly artistic. I get compliments everywhere I go now.&quot;
                </blockquote>
                <figcaption><strong>Michelle R.</strong> Loyal client</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-32 px-6 bg-[var(--color-charcoal)] text-[var(--color-cream)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-16 lg:gap-24">
            {/* Hours */}
            <div data-reveal>
              <span className="eyebrow text-[var(--color-gold)]">Hours</span>
              <h2 className="display-md mb-12">When to find us</h2>

              <PriceList
                className="price-list-dark text-lg"
                items={[
                  { name: 'Monday', price: 'Closed' },
                  { name: 'Tuesday', price: '9:30 AM – 5:00 PM' },
                  { name: 'Wednesday', price: '9:30 AM – 5:00 PM' },
                  { name: 'Thursday', price: '9:30 AM – 4:00 PM' },
                  { name: 'Friday', price: '9:30 AM – 2:00 PM' },
                  { name: 'Saturday', price: 'Alternating weeks · 9 AM – 5 PM' },
                  { name: 'Sunday', price: 'Closed' },
                ]}
              />
            </div>

            {/* Location */}
            <div className="lg:pt-24" data-reveal>
              <span className="eyebrow text-[var(--color-gold)]">Location</span>
              <h2 className="display-md mb-12">Where to find us</h2>

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
            <a href="https://instagram.com/vahairco" target="_blank" rel="noopener noreferrer" className="btn btn-outline" aria-label="Follow Virginia Page & Co. on Instagram (opens in new window)">
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-b from-[var(--color-cream-dark)] to-[var(--color-cream)] relative overflow-hidden">
        {/* Ambient gold glow background */}
        <div className="absolute inset-0 pointer-events-none">
        </div>
        <div className="max-w-3xl mx-auto relative" data-reveal>
          <div className="divider mx-auto mb-8" />
          <h2 className="display-lg mb-8 text-balance" style={{ fontFamily: 'var(--font-display)' }}>
            Ready for your transformation?
          </h2>
          <p className="text-xl text-[var(--color-taupe)] mb-12 max-w-xl mx-auto">
            Book your appointment today and let us help you feel beautiful.
          </p>
          <a href="/book" className="btn btn-primary text-base px-10 py-4">
            Book Your Appointment
          </a>
        </div>
      </section>
    </>
  );
}
