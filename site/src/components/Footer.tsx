export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-charcoal)] text-[var(--color-cream)]">
      {/* Gold accent line at top */}
      <div className="gold-accent-line" />
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <h3 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Virginia Page & Co.
            </h3>
            <p className="text-[var(--color-taupe)] max-w-sm leading-relaxed mb-8">
              Where every client leaves feeling confident, beautiful, and like the best version of themselves.
            </p>

            {/* Social Links (44x44 touch targets) */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/vahairco"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-[var(--color-charcoal-light)] flex items-center justify-center hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
                aria-label="Follow us on Instagram (opens in new window)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/vahairco"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-[var(--color-charcoal-light)] flex items-center justify-center hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
                aria-label="Follow us on Facebook (opens in new window)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-widest uppercase text-[var(--color-taupe)] mb-6">Navigate</h4>
            <nav className="space-y-3">
              <a href="/about" className="block text-[var(--color-cream)]/80 hover:text-[var(--color-gold)] transition-colors">About</a>
              <a href="/services" className="block text-[var(--color-cream)]/80 hover:text-[var(--color-gold)] transition-colors">Services</a>
              <a href="/contact" className="block text-[var(--color-cream)]/80 hover:text-[var(--color-gold)] transition-colors">Contact</a>
              <a href="/book" className="block text-[var(--color-cream)]/80 hover:text-[var(--color-gold)] transition-colors">Book Now</a>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs tracking-widest uppercase text-[var(--color-taupe)] mb-6">Contact</h4>
            <div className="space-y-3 text-[var(--color-cream)]/80">
              <a href="tel:9196718353" className="block hover:text-[var(--color-gold)] transition-colors">
                (919) 671-8353
              </a>
              <a href="mailto:vacohairstudio@gmail.com" className="block hover:text-[var(--color-gold)] transition-colors">
                vacohairstudio@gmail.com
              </a>
              <p className="pt-2">
                104 South Main Street<br />
                Rolesville, NC 27571
              </p>
            </div>
          </div>

          {/* Hours Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-widest uppercase text-[var(--color-taupe)] mb-6">Hours</h4>
            <div className="space-y-2 text-sm text-[var(--color-cream)]/80">
              <p>Tue 9:30 AM – 5:00 PM</p>
              <p>Wed 9:30 AM – 5:00 PM</p>
              <p>Thu 9:30 AM – 4:00 PM</p>
              <p>Fri 9:30 AM – 2:00 PM</p>
              <p>Sat Alternating weeks</p>
              <p className="text-[var(--color-taupe)]">Sun–Mon Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-charcoal-light)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-taupe)]">
          <p>&copy; {currentYear} Virginia Page & Co. Hair Studio</p>
          <div className="flex items-center gap-4 text-xs">
            <a href="/privacy" className="hover:text-[--color-gold] transition-colors">Privacy Policy</a>
            <span className="text-[--color-charcoal-light]">|</span>
            <a href="/terms" className="hover:text-[--color-gold] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
