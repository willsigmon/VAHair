'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function ConversionTracking() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest('a[href], button');
      if (!target || target.matches(':disabled')) return;

      const href = target.getAttribute('href');
      const url = href ? new URL(href, window.location.href) : null;
      const name = url?.protocol === 'tel:' ? 'Call Tap'
        : url?.protocol === 'sms:' ? 'Text Tap'
        : (url && ((url.origin === window.location.origin &&
            (url.pathname === '/book' || url.hash === '#scheduler')) ||
            url.hostname === 'acuityscheduling.com' || url.hostname.endsWith('.acuityscheduling.com'))) ||
          target.matches('button[data-stylist], #book-recommended') ? 'Book Tap'
        : null;
      if (!name) return;

      // Only fixed placement labels are sent, never URLs or visitor-entered data.
      const location = target.closest('#header, #mobile-navigation') ? 'header'
        : target.closest('.mobile-booking-bar') ? 'mobile-booking-bar'
        : target.closest('footer') ? 'footer'
        : target.closest('#scheduler') ? 'scheduler'
        : target.closest('.home-hero, .services-hero') ? 'hero'
        : 'content';
      track(name, { location });
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
