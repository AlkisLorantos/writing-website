import { sanityClient } from "@/sanity/lib/client";
import { ARTICLE_BY_SLUG } from "@/sanity/queries";

export default async function DebugSlugPage() {
  const article = await sanityClient.fetch(ARTICLE_BY_SLUG, {
    slug: "article-number-2",
  });

  return <pre>{JSON.stringify(article, null, 2)}</pre>;
}