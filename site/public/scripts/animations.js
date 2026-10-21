/** Optional, one-time reveals. Content stays readable if this script fails. */
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const reveal = (element) => {
    element.classList.remove('reveal-pending');
    element.classList.add('revealed');
  };
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      reveal(entry.target);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.1 });
  // Only content still below the fold is hidden, and it is hidden before it is ever
  // seen, so nothing that is already on screen blinks out and slides back in.
  document.querySelectorAll('[data-reveal]').forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add('reveal-pending');
    observer.observe(element);
  });
  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    observer.disconnect();
    document.querySelectorAll('[data-reveal].reveal-pending').forEach(reveal);
  });
})();
