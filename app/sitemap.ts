import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://cogdual.com';
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/certifications`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/employers`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/colleges`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
