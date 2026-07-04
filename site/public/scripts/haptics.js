/**
 * Native 0-dependency haptics tactile engine
 * (extracted from the old Astro Layout inline script)
 */
function haptic(style) {
  if (!navigator.vibrate) return;
  switch (style) {
    case 'light': navigator.vibrate(10); break;
    case 'medium': navigator.vibrate(20); break;
    case 'heavy': navigator.vibrate([15, 30, 15]); break;
    case 'success': navigator.vibrate([10, 30, 10, 30]); break;
    case 'error': navigator.vibrate([20, 50, 20, 50]); break;
    case 'nudge': navigator.vibrate([10, 10]); break;
    default: navigator.vibrate(10);
  }
}

function initHaptics() {
  // Wire tactile click vibrations on mobile devices for standard actions
  const select = 'button, a, .btn';
  document.querySelectorAll(select).forEach((el) => {
    el.addEventListener('touchstart', () => {
      const style = el.getAttribute('data-haptic') || 'light';
      haptic(style);
    }, { passive: true });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHaptics);
} else {
  initHaptics();
}
