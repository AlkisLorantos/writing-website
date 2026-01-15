import type { MetadataRoute } from "next";
import { sanityClient } from "@/sanity/lib/client";
import { site, absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articleSlugs: { slug: string; publishedAt?: string }[] = await sanityClient.fetch(`
    *[
      _type == "article" &&
      defined(slug.current) &&
      !(_id in path("drafts.**"))
    ] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt
    }
  `);

  const noteSlugs: { slug: string; publishedAt?: string }[] = await sanityClient.fetch(`
    *[
      _type == "note" &&
      defined(slug.current) &&
      !(_id in path("drafts.**"))
    ] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt
    }
  `);

  const staticRoutes: MetadataRoute.Sitemap = [
    { 
      url: site.url, 
      lastModified: new Date(), 
      priority: 1, 
      changeFrequency: 'weekly' 
    },
    { 
      url: absoluteUrl("/about"), 
      lastModified: new Date(), 
      priority: 0.8, 
      changeFrequency: 'monthly' 
    },
    { 
      url: absoluteUrl("/articles"), 
      lastModified: new Date(), 
      priority: 0.9, 
      changeFrequency: 'daily' 
    },
    { 
      url: absoluteUrl("/notes"), 
      lastModified: new Date(), 
      priority: 0.7, 
      changeFrequency: 'daily' 
    },
    { 
      url: absoluteUrl("/tags"), 
      lastModified: new Date(), 
      priority: 0.6, 
      changeFrequency: 'weekly' 
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articleSlugs.map((a) => ({
    url: absoluteUrl(`/articles/${a.slug}`),
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
    priority: 0.8,
    changeFrequency: 'monthly',
  }));

  const noteRoutes: MetadataRoute.Sitemap = noteSlugs.map((n) => ({
    url: absoluteUrl(`/notes/${n.slug}`),
    lastModified: n.publishedAt ? new Date(n.publishedAt) : new Date(),
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  return [...staticRoutes, ...articleRoutes, ...noteRoutes];
}