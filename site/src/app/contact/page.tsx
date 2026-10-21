import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = pageMetadata(
  'Contact & Hours | Virginia Page & Co. Hair Studio',
  '/contact',
  'Visit us at 104 South Main Street, Rolesville NC. Open Tuesday–Friday and alternating Saturdays. Call (919) 671-8353 or email us.'
);

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-28 px-6 relative overflow-hidden">
        {/* Ambient decoration */}
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-4 block">Get in Touch</span>
          <h1 className="display-lg mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Contact Us
          </h1>
          <p className="text-xl text-[var(--color-taupe)] max-w-2xl mx-auto leading-relaxed">
            We&apos;d love to hear from you. Reach out or stop by!
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl mb-12" style={{ fontFamily: 'var(--font-display)' }}>
                Reach Out
              </h2>

              <div className="space-y-12">
                {/* Phone */}
                <div className="contact-entry">
                  <div>
                    <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-2 block">Phone</span>
                    <a
                      href="tel:9196718353"
                      className="text-3xl hover:text-[var(--color-gold)] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      (919) 671-8353
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-entry">
                  <div>
                    <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-2 block">Email</span>
                    <a
                      href="mailto:vacohairstudio@gmail.com"
                      className="break-all text-xl sm:text-2xl hover:text-[var(--color-gold)] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      vacohairstudio@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="contact-entry">
                  <div>
                    <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-2 block">Location</span>
                    <address className="not-italic text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                      104 South Main Street<br />
                      Rolesville, NC 27571
                    </address>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=104+South+Main+Street+Rolesville+NC+27571"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Get directions to Virginia Page & Co. on Google Maps (opens in new window)"
                      className="btn btn-ghost"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h2 className="text-3xl mb-12" style={{ fontFamily: 'var(--font-display)' }}>
                Business Hours
              </h2>

              <div className="hours-panel bg-white p-6 md:p-10 rounded-md">
                <div className="space-y-4">
                  <div className="flex justify-between gap-4 items-baseline py-3 border-b border-[var(--color-cream-dark)] text-[var(--color-taupe)]">
                    <span>Monday</span>
                    <span>Closed</span>
                  </div>
                  <div className="flex justify-between gap-4 items-baseline py-3 border-b border-[var(--color-cream-dark)]">
                    <span className="font-medium">Tuesday</span>
                    <span>9:30 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-4 items-baseline py-3 border-b border-[var(--color-cream-dark)]">
                    <span className="font-medium">Wednesday</span>
                    <span>9:30 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-4 items-baseline py-3 border-b border-[var(--color-cream-dark)]">
                    <span className="font-medium">Thursday</span>
                    <span>9:30 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-4 items-baseline py-3 border-b border-[var(--color-cream-dark)]">
                    <span className="font-medium">Friday</span>
                    <span>9:30 AM – 2:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-4 items-baseline py-3 border-b border-[var(--color-cream-dark)]">
                    <span className="font-medium">Saturday</span>
                    <span className="text-sm text-right">Alternating weeks · 9 AM – 5 PM</span>
                  </div>
                  <div className="flex justify-between gap-4 items-baseline py-3 text-[var(--color-taupe)]">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>

                <div className="mt-10">
                  <a href="/book" className="btn btn-primary w-full justify-center">
                    Book an Appointment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-[var(--color-cream-dark)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-4 block">Send a Message</span>
            <h2 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Drop Us a Line
            </h2>
            <p className="text-[var(--color-taupe)]">
              Have a question? We&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Map */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden aspect-video max-h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.8!2d-78.4577758!3d35.9232013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f0c4f4e5d0d%3A0x0!2s104%20S%20Main%20St%2C%20Rolesville%2C%20NC%2027571!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(50%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Virginia Page & Co. Hair Studio Location"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-b from-[var(--color-cream-dark)] to-[var(--color-cream)] relative overflow-hidden">
        {/* Ambient gold glow background */}
        <div className="absolute inset-0 pointer-events-none">
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="divider mx-auto mb-8" />
          <h2 className="display-md mb-8 text-balance" style={{ fontFamily: 'var(--font-display)' }}>
            Ready to book?
          </h2>
          <p className="text-xl text-[var(--color-taupe)] mb-12 max-w-xl mx-auto">
            Schedule your appointment online and let us help you feel beautiful.
          </p>
          <a href="/book" className="btn btn-primary text-base px-10 py-4">
            Book Your Appointment
          </a>
        </div>
      </section>
    </>
  );
}
