import type { Metadata } from 'next';

export const SITE_URL = 'https://vahair.studio';
export const SITE_NAME = 'Virginia Page & Co. Hair Studio';
export const DEFAULT_DESCRIPTION =
  'Expert hair services in downtown Rolesville, NC. Cuts, color, highlights, Brazilian blowouts & more. Book online today.';

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
  };
}
