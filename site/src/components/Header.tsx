'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/$/, '') || '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu on escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header id="header" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500${scrolled ? ' scrolled' : ''}`}>
        {/* Decorative hairline to keep the header feeling intentional over photos */}
        <div className="gold-accent-line opacity-60" />
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="group relative z-10" data-magnetic="0.2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-header.png"
              alt="Virginia Page & Co. Hair Studio"
              className="h-16 md:h-24 lg:h-32 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <div className="nav-capsule flex items-center gap-10 px-8 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-widest uppercase link-underline transition-all duration-300 ${
                    currentPath === link.href
                      ? 'opacity-100 text-[var(--color-gold)]'
                      : 'opacity-80 hover:opacity-100 hover:text-[var(--color-gold)]'
                  }`}
                  aria-current={currentPath === link.href ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
            {currentPath !== '/book' && (
              <a
                href="/book"
                className="btn btn-primary btn-header-cta hover:shadow-[0_0_25px_rgba(196,169,98,0.35)] transition-shadow duration-300"
              >
                Book Now
              </a>
            )}
          </div>

          {/* Mobile Menu Button (44x44 minimum touch target for accessibility) */}
          <button
            id="mobile-menu-btn"
            ref={menuBtnRef}
            className={`md:hidden relative z-10 w-11 h-11 flex flex-col items-center justify-center gap-1.5${menuOpen ? ' active' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-line w-6 h-px bg-current transition-all duration-300" />
            <span className="menu-line w-6 h-px bg-current transition-all duration-300" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu - OUTSIDE header for proper stacking context */}
      <div id="mobile-menu" className={`md:hidden${menuOpen ? ' active' : ''}`}>
        <nav className="text-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block text-4xl mb-6 tracking-wide transition-colors ${
                currentPath === link.href ? 'text-[var(--color-gold)]' : 'hover:text-[var(--color-gold)]'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
              aria-current={currentPath === link.href ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {currentPath !== '/book' && (
            <a href="/book" className="btn btn-primary mt-8" onClick={() => setMenuOpen(false)}>
              Book Now
            </a>
          )}
        </nav>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-24" />
    </>
  );
}
