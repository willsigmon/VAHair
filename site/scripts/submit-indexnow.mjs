import { readdir } from "node:fs/promises";

// Usage: node scripts/submit-indexnow.mjs [--dry-run]
// The key comes from INDEXNOW_KEY, or from the verification file in public/.
// URLs come from the live sitemap, so they always match what the site serves.
const dryRun = process.argv.includes("--dry-run");
const siteUrl = process.env.SITE_URL || "https://vahair.studio";
const host = new URL(siteUrl).host;

async function resolveKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY;
  const files = await readdir(new URL("../public/", import.meta.url));
  const keys = files
    .map((file) => file.match(/^([a-f0-9]{32})\.txt$/)?.[1])
    .filter(Boolean);
  if (keys.length !== 1) {
    throw new Error(`Expected one IndexNow key file in public/, found ${keys.length}. Set INDEXNOW_KEY.`);
  }
  return keys[0];
}

async function sitemapUrls() {
  const sitemapUrl = new URL("/sitemap.xml", siteUrl);
  const response = await fetch(sitemapUrl);
  if (!response.ok) {
    throw new Error(`Could not read ${sitemapUrl}: ${response.status}`);
  }
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map(([, url]) => url)
    .filter((url) => new URL(url).host === host);
  if (urls.length === 0) {
    throw new Error(`No ${host} URLs found in ${sitemapUrl}`);
  }
  return urls;
}

const indexNowKey = await resolveKey();
const keyLocation = `${siteUrl}/${indexNowKey}.txt`;
const urlList = await sitemapUrls();

console.log(`Submitting ${urlList.length} URLs to IndexNow for host ${host}...`);

if (dryRun) {
  console.log(JSON.stringify({ dryRun: true, host, keyLocation, urlList }, null, 2));
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    host,
    key: indexNowKey,
    keyLocation,
    urlList,
  }),
});

const body = await response.text();

if (!response.ok) {
  console.error("IndexNow submission failed");
  console.error("Status:", response.status);
  console.error(body);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      status: response.status,
      host,
      keyLocation,
      submitted: urlList.length,
      body: body || "OK",
    },
    null,
    2,
  ),
);
