'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { SALON } from '@/lib/salon';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const bookingHref = pathname === '/book' ? '#scheduler' : '/book';

  useEffect(() => {
    if (menuOpen) dialog.current?.showModal();
    else dialog.current?.close();
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <>
      <header id="header">
        <div className="gold-accent-line" />
        <nav className="header-nav" aria-label="Main navigation">
          <a href="/" aria-label={`${SALON.name} home`} className="header-logo">
            <Image src="/images/logo-header.png" alt={SALON.name} width={400} height={400} priority sizes="(min-width: 768px) 88px, 64px" />
          </a>
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="header-link" aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={bookingHref} className="btn btn-primary btn-header-cta">Book Now</a>
            <button ref={menuButton} type="button" className="menu-toggle md:hidden" aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M3 8h18M3 16h18" /></svg>
            </button>
          </div>
        </nav>
      </header>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-navigation" aria-label="Navigation menu" onCancel={() => setMenuOpen(false)} onClose={() => { setMenuOpen(false); menuButton.current?.focus(); }}>
        <button type="button" className="menu-close" onClick={() => setMenuOpen(false)} autoFocus>Close <span aria-hidden="true">×</span></button>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a href={bookingHref} className="btn btn-primary" onClick={() => setMenuOpen(false)}>Book Now</a>
        </nav>
      </dialog>
      <div className="header-spacer" aria-hidden="true" />
      <nav className="mobile-booking-bar" aria-label="Quick booking">
        <a href={`tel:${SALON.phoneE164}`} className="mobile-call">Call the studio</a>
        <a href={bookingHref} className="btn btn-primary">Book Now</a>
      </nav>
    </>
  );
}
