import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Virginia Page & Co. Hair Studio',
    short_name: 'VA Hair',
    description: 'Hair salon in downtown Rolesville, North Carolina.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF7F2',
    theme_color: '#FAF7F2',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
