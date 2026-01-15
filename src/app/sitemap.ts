import type { MetadataRoute } from "next";
import { sanityClient } from "@/sanity/lib/client";
import { site, absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs: { slug: string; publishedAt?: string }[] = await sanityClient.fetch(`
    *[
      _type == "article" &&
      defined(slug.current) &&
      !(_id in path("drafts.**"))
    ] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt
    }
  `);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: new Date() },
    { url: absoluteUrl("/about"), lastModified: new Date() },
    { url: absoluteUrl("/articles"), lastModified: new Date() },
    { url: absoluteUrl("/notes"), lastModified: new Date() },

  ];

  const articleRoutes: MetadataRoute.Sitemap = slugs.map((a) => ({
    url: absoluteUrl(`/articles/${a.slug}`),
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
  }));

  return [...staticRoutes, ...articleRoutes];
}