import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Privacy Policy | Virginia Page & Co. Hair Studio',
  '/privacy',
  'Privacy Policy for Virginia Page & Co. Hair Studio. Learn how we collect, use, and protect your information.'
);

export default function PrivacyPage() {
  return (
    <section className="pt-16 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <span className="text-xs tracking-widest uppercase text-[--color-gold] mb-4 block">Legal</span>
        <h1 className="display-lg mb-8" style={{ fontFamily: 'var(--font-display)' }}>Privacy Policy</h1>
        <p className="text-[--color-taupe] mb-12">Last updated: February 2026</p>

        <div className="space-y-12 text-[--color-charcoal] leading-relaxed">
          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Information We Collect</h2>
            <p className="text-[--color-taupe] mb-4">
              When you book an appointment or contact us, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[--color-taupe]">
              <li>Name, email address, and phone number</li>
              <li>Appointment preferences and service history</li>
              <li>Payment information (processed securely by our scheduling provider)</li>
              <li>Any information you provide in messages or forms</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Third-Party Services</h2>
            <p className="text-[--color-taupe] mb-4">
              Our website uses the following third-party services that may collect data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[--color-taupe]">
              <li><strong>Acuity Scheduling</strong> &mdash; Online appointment booking and payment processing</li>
              <li><strong>Google Maps</strong> &mdash; Embedded map on our Contact page</li>
              <li><strong>Instagram</strong> &mdash; Links to our social media portfolio</li>
            </ul>
            <p className="text-[--color-taupe] mt-4">
              Each service operates under its own privacy policy. We encourage you to review their policies for details on how they handle your data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-[--color-taupe]">
              <li>To schedule and manage your appointments</li>
              <li>To communicate with you about your bookings</li>
              <li>To improve our services and website experience</li>
              <li>To respond to your inquiries</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Data Sharing</h2>
            <p className="text-[--color-taupe]">
              We do not sell or rent your personal information to third parties. We only share your data with the service providers listed above as necessary to operate our business.
            </p>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Data Retention</h2>
            <p className="text-[--color-taupe]">
              We retain your appointment and contact information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Your Rights</h2>
            <p className="text-[--color-taupe] mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[--color-taupe]">
              <li>Access the personal information we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Contact Us</h2>
            <p className="text-[--color-taupe]">
              For questions about this policy or to exercise your data rights, contact us at{' '}
              <a href="mailto:vacohairstudio@gmail.com" className="text-[--color-gold] hover:underline">vacohairstudio@gmail.com</a>{' '}
              or call <a href="tel:9196718353" className="text-[--color-gold] hover:underline">(919) 671-8353</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
