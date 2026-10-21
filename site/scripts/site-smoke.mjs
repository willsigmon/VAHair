// Run against a production server: SITE_URL=http://127.0.0.1:3100 node scripts/site-smoke.mjs
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
const base = process.env.SITE_URL || 'http://127.0.0.1:3100';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH, args: ['--no-sandbox'] });
await mkdir('output/polish', { recursive: true });
const routes = ['/', '/about', '/services', '/book', '/contact', '/faq', '/privacy', '/terms'];
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  // Network-independent page checks: booking errors have dedicated cases below.
  await page.route(/acuityscheduling\.com/, route => route.abort());
  for (const route of routes) {
    await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1, route + ' h1');
    assert.ok(await page.locator('#header a', { hasText: 'Book Now' }).isVisible(), route + ' header booking');
    assert.ok(await page.locator('.mobile-booking-bar').isVisible(), route + ' sticky booking');
    const overflow = await page.evaluate(() => [...document.querySelectorAll('main *')].filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1) && getComputedStyle(el).position !== 'absolute';
    }).map(el => ({ tag: el.tagName, cls: el.className, text: el.textContent.slice(0, 45) })));
    assert.deepEqual(overflow, [], route + ' mobile overflow');
    const a11y = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    assert.deepEqual(a11y.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), [], route + ' accessibility');
    await page.evaluate(async () => { for (const img of document.images) { img.loading = 'eager'; } await Promise.all([...document.images].map(img => img.decode().catch(() => {}))); });
    await page.screenshot({ path: `output/polish/${route === '/' ? 'home' : route.slice(1)}-390.png`, fullPage: true });
    console.log('PASS mobile, metadata heading, accessibility:', route);
  }
  await page.goto(base);
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  assert.ok(await page.locator('dialog').isVisible());
  await page.keyboard.press('Escape');
  assert.ok(!await page.locator('dialog').isVisible());
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Open navigation menu');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: 'output/polish/home-1440.png', fullPage: true });
  assert.deepEqual(errors, [], 'Browser runtime errors');
  await page.close();

  // Cross-origin fixtures never submit appointments or contact the salon.
  async function bookingCase({ mode, scriptFails = false, immediateError = false }) {
    const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await p.route('https://embed.acuityscheduling.com/**', route => scriptFails ? route.abort() : route.fulfill({ contentType: 'application/javascript', body: '/* scheduler helper fixture */' }));
    await p.route('https://app.acuityscheduling.com/**', route => immediateError ? route.abort() : route.fulfill({ contentType: 'text/html', body: mode === 'ready' ? '<script>setTimeout(()=>parent.postMessage("sizing:900", "*"),100)</script><p>Scheduler fixture</p>' : '<p>Silent error page</p>' }));
    await p.goto(base + '/book');
    if (mode === 'ready' && !scriptFails) {
      await p.locator('#acuity-loader').waitFor({ state: 'detached' });
      assert.equal(await p.locator('.scheduler-fallback').count(), 0);
      for (const [name, id] of [['Virginia', '13484734'], ['Kim', '13484780'], ['Alyssa', '13484805']]) {
        await p.getByRole('button', { name: `Book appointment with ${name}`, exact: true }).click();
        await p.locator('#acuity-loader').waitFor({ state: 'detached' });
        const url = new URL(await p.locator('#acuity-embed').getAttribute('src'));
        assert.equal(url.searchParams.get('calendarID'), id);
        assert.equal(url.searchParams.get('owner'), '38274584');
        await p.getByRole('button', { name: `Book appointment with ${name}`, exact: true }).click();
        assert.equal(await p.locator('#acuity-loader').count(), 0, 'Repeated selection must not restart loader');
      }
    } else {
      // A load event or a message with a spoofed source must not dismiss the timeout.
      await p.evaluate(() => window.dispatchEvent(new MessageEvent('message', { origin: 'https://app.acuityscheduling.com', data: 'sizing:900', source: window })));
      await p.locator('.scheduler-fallback').waitFor({ timeout: 11000 });
      assert.equal(await p.locator('.scheduler-fallback a[href^="tel:"]').getAttribute('href'), 'tel:+1-919-671-8353');
      assert.equal(await p.locator('.scheduler-fallback a[href^="sms:"]').getAttribute('href'), 'sms:+1-919-671-8353');
      assert.ok(await p.locator('.scheduler-fallback a[href^="https://app.acuity"]').isVisible());
    }
    console.log('PASS booking:', { mode, scriptFails, immediateError });
    await p.close();
  }
  await bookingCase({ mode: 'ready' });
  await bookingCase({ mode: 'silent' });
  await bookingCase({ mode: 'ready', scriptFails: true });
  await bookingCase({ mode: 'silent', immediateError: true });

  const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await nojs.goto(base + '/services');
  assert.ok(await nojs.getByRole('heading', { name: 'Our Services', exact: true }).isVisible());
  assert.ok(await nojs.getByText("Women's Haircut", { exact: true }).isVisible());
  await nojs.goto(base + '/book');
  assert.ok(await nojs.locator('.booking-help a[href^="sms:"]').isVisible());
  console.log('PASS no-JavaScript content and booking contact links');
} finally { await browser.close(); }
