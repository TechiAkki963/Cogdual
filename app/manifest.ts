import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cogdual Infotech Solutions',
    short_name: 'Cogdual',
    description: 'Comprehensive HR & Career Solutions',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbf8f1',
    theme_color: '#0b1f33',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/maskable-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
