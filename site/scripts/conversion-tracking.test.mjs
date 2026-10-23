import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import test from 'node:test';

const source = readFileSync(new URL('../src/components/ConversionTracking.ts', import.meta.url), 'utf8');
const executable = stripTypeScriptTypes(source)
  .replace(/^import .*;$/gm, '')
  .replace('export default function', 'function');

function mount() {
  const events = [];
  let listener;
  let cleanup;
  class Element {
    constructor(href, placement = 'content', bookingButton = false, disabled = false) {
      Object.assign(this, { href, placement, bookingButton, disabled });
    }
    closest(selector) {
      if (selector === 'a[href], button') return this;
      const selectors = {
        header: '#header, #mobile-navigation',
        'mobile-booking-bar': '.mobile-booking-bar', footer: 'footer',
        scheduler: '#scheduler', hero: '.home-hero, .services-hero',
      };
      return selector === selectors[this.placement] ? this : null;
    }
    getAttribute() { return this.href; }
    matches(selector) { return selector === ':disabled' ? this.disabled : this.bookingButton; }
  }
  const document = {
    addEventListener(type, callback, capture) {
      assert.equal(type, 'click'); assert.equal(capture, true); listener = callback;
    },
    removeEventListener(type, callback, capture) {
      assert.equal(type, 'click'); assert.equal(callback, listener); assert.equal(capture, true);
      listener = null;
    },
  };
  new Function('useEffect', 'track', 'document', 'window', 'Element',
    `${executable}; ConversionTracking();`)(
    (effect) => { cleanup = effect(); }, (name, data) => events.push({ name, data }),
    document, { location: { href: 'https://vahair.studio/book', origin: 'https://vahair.studio' } }, Element,
  );
  return { events, click: (...args) => listener({ target: new Element(...args) }), cleanup };
}

test('tracks conversion types and fixed placements without URL or personal data', () => {
  const app = mount();
  const cases = [
    ['tel:+15555550100', 'header', false, 'Call Tap'],
    ['sms:+15555550100', 'scheduler', false, 'Text Tap'],
    ['/book', 'footer', false, 'Book Tap'],
    ['#scheduler', 'mobile-booking-bar', false, 'Book Tap'],
    ['https://app.acuityscheduling.com/schedule.php?calendarID=1', 'hero', false, 'Book Tap'],
    [null, 'content', true, 'Book Tap'],
  ];
  for (const [href, location, button, name] of cases) {
    app.click(href, location, button);
    assert.deepEqual(app.events.at(-1), { name, data: { location } });
  }
  app.click('/about');
  app.click('mailto:visitor@example.com');
  app.click('https://example.com/book');
  app.click('https://acuityscheduling.com.example.com/');
  app.click(null, 'content', true, true);
  assert.equal(app.events.length, cases.length);
  app.cleanup();
});
