import type { MetadataRoute } from 'next';
import { PORTFOLIO_PROJECTS } from '@/lib/project-catalog';

const siteUrl = 'https://code-akarshmishra.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    ...PORTFOLIO_PROJECTS.map(({ slug }) => ({
      url: `${siteUrl}/projects/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];
}
