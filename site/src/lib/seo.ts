import type { Metadata } from 'next';

export const SITE_URL = 'https://vahair.studio';
export const SITE_NAME = 'Virginia Page & Co. Hair Studio';
export const DEFAULT_DESCRIPTION =
  'Experienced hair stylists in downtown Rolesville, NC offering cuts, color, highlights, styling, and facial waxing. View pricing and book online.';

const SHARE_SIZE = { width: 1200, height: 630 } as const;

// Homepage share animation: a short looping video plus its poster frame, in
// public/share. Filenames are versioned (og-v1, og-v2, …) because link
// scrapers cache these URLs hard; bump the version when either file changes.
const SHARE_POSTER_URL = new URL('/share/og-v1.jpg', SITE_URL).href;
const SHARE_VIDEO_URL = new URL('/share/og-v1.mp4', SITE_URL).href;
const SHARE_POSTER_ALT = `${SITE_NAME}, Rolesville, NC. If it makes you feel beautiful, do it.`;

interface PageMetadataOptions {
  /** Share the looping og:video and its poster instead of the generated /og.png card. */
  animatedShare?: boolean;
}

/**
 * Builds per-page metadata mirroring the old Astro Layout head:
 * canonical URL, Open Graph, Twitter card, and dynamic /og.png preview.
 */
export function pageMetadata(
  title: string,
  path: string,
  description: string = DEFAULT_DESCRIPTION,
  { animatedShare = false }: PageMetadataOptions = {}
): Metadata {
  const ogImageURL = new URL('/og.png', SITE_URL);
  ogImageURL.searchParams.set('title', title);
  ogImageURL.searchParams.set('description', description);

  const shareImage = animatedShare
    ? { url: SHARE_POSTER_URL, alt: SHARE_POSTER_ALT }
    : { url: ogImageURL.href, alt: `${title} social preview` };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: 'website',
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [{ ...shareImage, ...SHARE_SIZE }],
      ...(animatedShare && {
        videos: [
          { url: SHARE_VIDEO_URL, secureUrl: SHARE_VIDEO_URL, type: 'video/mp4', ...SHARE_SIZE },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shareImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}
