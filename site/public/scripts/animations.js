/** Optional, one-time reveals. Content stays readable if this script fails. */
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.1 });
  // Do not animate the initial viewport or delay the page's largest content.
  document.querySelectorAll('[data-reveal]').forEach((element) => {
    if (element.getBoundingClientRect().top >= window.innerHeight) observer.observe(element);
  });
  motion.addEventListener('change', () => {
    if (motion.matches) observer.disconnect();
  });
})();
