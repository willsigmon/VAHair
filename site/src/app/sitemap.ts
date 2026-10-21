import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const routes = ['', '/about', '/services', '/book', '/contact', '/faq', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === '' || route === '/services' ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : route === '/book' || route === '/services' ? 0.9 : 0.6,
  }));
}
