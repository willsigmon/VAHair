import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = pageMetadata(
  'Contact & Hours | Virginia Page & Co. Hair Studio',
  '/contact',
  'Visit us at 104 South Main Street, Rolesville NC. Open Tue-Fri. Call (919) 671-8353 or email us.'
);

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-28 px-6 relative overflow-hidden">
        {/* Ambient decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[var(--color-gold)]/5 blur-3xl" />
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
                <div className="group flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/15 to-[var(--color-gold)]/5 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg className="w-6 h-6 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
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
                <div className="group flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/15 to-[var(--color-gold)]/5 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg className="w-6 h-6 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs tracking-widest uppercase text-[var(--color-gold-dark)] mb-2 block">Email</span>
                    <a
                      href="mailto:vacohairstudio@gmail.com"
                      className="text-2xl hover:text-[var(--color-gold)] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      vacohairstudio@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="group flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/15 to-[var(--color-gold)]/5 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg className="w-6 h-6 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
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

              <div className="bg-white p-10 rounded-2xl shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[var(--color-cream-dark)] text-[var(--color-taupe)]">
                    <span>Monday</span>
                    <span>Closed</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[var(--color-cream-dark)]">
                    <span className="font-medium">Tuesday</span>
                    <span>9:30 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[var(--color-cream-dark)]">
                    <span className="font-medium">Wednesday</span>
                    <span>9:30 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[var(--color-cream-dark)]">
                    <span className="font-medium">Thursday</span>
                    <span>9:30 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[var(--color-cream-dark)]">
                    <span className="font-medium">Friday</span>
                    <span>9:30 AM – 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[var(--color-cream-dark)]">
                    <span className="font-medium">Saturday</span>
                    <span className="text-sm">Alternating weeks · 9 AM – 5 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 text-[var(--color-taupe)]">
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="divider mx-auto mb-8" />
          <h2 className="display-md mb-8 text-balance" style={{ fontFamily: 'var(--font-display)' }}>
            Ready to book?
          </h2>
          <p className="text-xl text-[var(--color-taupe)] mb-12 max-w-xl mx-auto">
            Schedule your appointment online and let us help you feel beautiful.
          </p>
          <a href="/book" className="btn btn-primary text-base px-10 py-4 glow-pulse hover:shadow-[0_0_40px_rgba(196,169,98,0.5)]">
            Book Your Appointment
          </a>
        </div>
      </section>
    </>
  );
}
