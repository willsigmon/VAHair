import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Terms of Service | Virginia Page & Co. Hair Studio',
  '/terms',
  'Terms of Service for Virginia Page & Co. Hair Studio, including cancellation policy, service disclaimers, and booking terms.'
);

export default function TermsPage() {
  return (
    <section className="pt-16 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <span className="text-xs tracking-widest uppercase text-[--color-gold] mb-4 block">Legal</span>
        <h1 className="display-lg mb-8" style={{ fontFamily: 'var(--font-display)' }}>Terms of Service</h1>
        <p className="text-[--color-taupe] mb-12">Last updated: February 2026</p>

        <div className="space-y-12 text-[--color-charcoal] leading-relaxed">
          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Appointments & Booking</h2>
            <p className="text-[--color-taupe] mb-4">
              All appointments are booked through our online scheduling system powered by Acuity Scheduling. By booking an appointment, you agree to the following terms.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[--color-taupe]">
              <li>Appointments are confirmed upon successful online booking</li>
              <li>Please arrive on time. Late arrivals may result in a shortened service</li>
              <li>We reserve the right to refuse service at our discretion</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Cancellation Policy</h2>
            <p className="text-[--color-taupe] mb-4">
              We understand that plans change. If you need to cancel or reschedule:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[--color-taupe]">
              <li>Please provide at least <strong>24 hours notice</strong> for cancellations or rescheduling</li>
              <li>Use the link in your confirmation email to manage your appointment</li>
              <li>Repeated no-shows may require a deposit for future bookings</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Pricing</h2>
            <p className="text-[--color-taupe]">
              All prices listed on our website are starting prices and subject to change based on consultation. Final pricing may vary depending on hair length, thickness, condition, and the specific techniques required. Your stylist will discuss pricing before beginning any service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Service Disclaimers</h2>
            <ul className="list-disc pl-6 space-y-2 text-[--color-taupe]">
              <li>Color results may vary based on your hair&apos;s current condition and history</li>
              <li>Color and other consultation-based services require an assessment for accurate pricing</li>
              <li>We may recommend alternative services if the requested service could damage your hair</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Intellectual Property</h2>
            <p className="text-[--color-taupe]">
              All content on this website, including text, images, logos, and design elements, is the property of Virginia Page & Co. Hair Studio. Photos of our work may be shared on our social media with client consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Contact</h2>
            <p className="text-[--color-taupe]">
              For questions about these terms, contact us at{' '}
              <a href="mailto:vacohairstudio@gmail.com" className="text-[--color-gold] hover:underline">vacohairstudio@gmail.com</a>{' '}
              or call <a href="tel:9196718353" className="text-[--color-gold] hover:underline">(919) 671-8353</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
