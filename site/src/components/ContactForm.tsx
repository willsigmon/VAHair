'use client';

/**
 * Contact form that opens the visitor's email client via mailto:
 * (port of the inline script from the old contact.astro page).
 */
import { useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const subject = encodeURIComponent(`Website Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:vacohairstudio@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm tracking-widest uppercase text-[var(--color-taupe)] mb-2">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-white border border-[var(--color-blush)] text-[var(--color-charcoal)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm tracking-widest uppercase text-[var(--color-taupe)] mb-2">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-white border border-[var(--color-blush)] text-[var(--color-charcoal)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm tracking-widest uppercase text-[var(--color-taupe)] mb-2">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 bg-white border border-[var(--color-blush)] text-[var(--color-charcoal)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm tracking-widest uppercase text-[var(--color-taupe)] mb-2">Message *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-white border border-[var(--color-blush)] text-[var(--color-charcoal)] focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-vertical"
          style={{ fontFamily: 'var(--font-body)' }}
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </div>

      <div id="form-success" className={`text-center py-8${submitted ? '' : ' hidden'}`}>
        <p className="text-xl text-[var(--color-gold)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>Message sent!</p>
        <p className="text-[var(--color-taupe)]">Your email client should have opened. We&rsquo;ll get back to you soon.</p>
      </div>
    </form>
  );
}
