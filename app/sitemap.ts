import type { MetadataRoute } from 'next';
import { DOCTRINES, APOLOGETICS_CATEGORIES, RELIGIONS } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://christcornerstone.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/start-here`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/doctrine`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/apologetics`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/religions`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/scripture`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/library`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/quotes`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const doctrineRoutes: MetadataRoute.Sitemap = DOCTRINES.map((d) => ({
    url: `${SITE_URL}/doctrine/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const apologeticsRoutes: MetadataRoute.Sitemap = APOLOGETICS_CATEGORIES.map((c) => ({
    url: `${SITE_URL}/apologetics/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const religionRoutes: MetadataRoute.Sitemap = RELIGIONS.map((r) => ({
    url: `${SITE_URL}/religions/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...doctrineRoutes, ...apologeticsRoutes, ...religionRoutes];
}

