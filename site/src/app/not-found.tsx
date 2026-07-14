import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Virginia Page & Co. Hair Studio',
};

export default function NotFound() {
  return (
    <section className="py-32 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <span className="text-8xl font-light text-[--color-gold] block mb-8" style={{ fontFamily: 'var(--font-display)' }}>404</span>
        <h1 className="display-md mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Page Not Found
        </h1>
        <p className="text-xl text-[--color-taupe] mb-12 max-w-lg mx-auto">
          We couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/" className="btn btn-primary">
            Back to Home
          </a>
          <a href="/book" className="btn btn-outline">
            Book an Appointment
          </a>
        </div>
      </div>
    </section>
  );
}
