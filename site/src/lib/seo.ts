import type { Metadata } from 'next';

export const SITE_URL = 'https://vahair.studio';
export const SITE_NAME = 'Virginia Page & Co. Hair Studio';
export const DEFAULT_DESCRIPTION =
  'Experienced hair stylists in downtown Rolesville, NC offering cuts, color, highlights, styling, and facial waxing. View pricing and book online.';

/**
 * Builds per-page metadata mirroring the old Astro Layout head:
 * canonical URL, Open Graph, Twitter card, and dynamic /og.png preview.
 */
export function pageMetadata(
  title: string,
  path: string,
  description: string = DEFAULT_DESCRIPTION
): Metadata {
  const ogImageURL = new URL('/og.png', SITE_URL);
  ogImageURL.searchParams.set('title', title);
  ogImageURL.searchParams.set('description', description);

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
      images: [
        {
          url: ogImageURL.href,
          width: 1200,
          height: 630,
          alt: `${title} social preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: ogImageURL.href, alt: `${title} social preview` }],
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
