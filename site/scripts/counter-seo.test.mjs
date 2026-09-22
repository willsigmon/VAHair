import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Run after `npm run build`. Set SITE_URL to verify a running or deployed site.
async function pageHtml(path = '/') {
  if (process.env.SITE_URL) {
    const response = await fetch(new URL(path, process.env.SITE_URL));
    assert.equal(response.status, 200, `${path} is available`);
    return response.text();
  }
  const file = path === '/' ? 'index' : path.slice(1);
  return readFile(new URL(`../.next/server/app/${file}.html`, import.meta.url), 'utf8');
}
const html = await pageHtml();
const body = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ');

test('server HTML retains the approved combined-experience value without JavaScript', () => {
  assert.match(body, /40\s*\+\s*Years Combined\s*Experience/);
  assert.doesNotMatch(body, /\b0\s*\+\s*Years Combined/);
});

test('server HTML retains all three expert stylists without JavaScript', () => {
  assert.match(body, /\b3\s*Expert\s*Stylists/);
  assert.doesNotMatch(body, /\b0\s*Expert\s*Stylists/);
});

test('stat values cannot be replaced with intermediate animation counts', () => {
  assert.doesNotMatch(html, /\bdata-counter(?:-duration)?=/);
});

for (const path of ['/', '/about', '/services', '/book', '/contact', '/faq', '/privacy', '/terms']) {
  test(`${path} retains its public canonical, metadata and primary heading`, async () => {
    const page = await pageHtml(path);
    const expected = `https://vahair.studio${path === '/' ? '' : path}`;
    const canonicals = [...page.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
    assert.equal(canonicals.length, 1);
    assert.equal(canonicals[0][1], expected);
    assert.match(page, /<meta name="description" content="[^"]+"/);
    assert.match(page, /<meta property="og:image" content="https:\/\/vahair\.studio\/og\.png/);
    assert.match(page, /<meta name="robots" content="index, follow"/);
    assert.equal([...page.matchAll(/<h1(?:\s|>)/g)].length, 1);
  });
}

test('booking embed retains the approved appointment allowlist and owner', async () => {
  const page = await pageHtml('/book');
  const iframe = page.match(/<iframe[^>]*src="([^"]+)"/);
  assert.ok(iframe, 'Public booking iframe exists');
  const url = new URL(iframe[1].replaceAll('&amp;', '&'));
  assert.equal(url.origin, 'https://app.acuityscheduling.com');
  assert.equal(url.searchParams.get('owner'), '38274584');
  const constants = await readFile(new URL('../src/lib/acuity/constants.ts', import.meta.url), 'utf8');
  const allowlist = constants.match(/PUBLIC_APPOINTMENT_TYPE_IDS = \[([\s\S]*?)\] as const/);
  assert.ok(allowlist);
  const expected = [...allowlist[1].matchAll(/\b\d{8}\b/g)].map(([id]) => id);
  assert.ok(expected.length > 0);
  assert.deepEqual(url.searchParams.getAll('appointmentType[]'), expected);
});
