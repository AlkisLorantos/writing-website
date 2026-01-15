import { sanityClient } from "@/sanity/lib/client";

export const revalidate = 300; 

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const articles = await sanityClient.fetch(`
    *[
      _type == "article" &&
      defined(slug.current) &&
      !(_id in path("drafts.**"))
    ]
    | order(publishedAt desc)[0...30]{
      title,
      "slug": slug.current,
      publishedAt,
      summary
    }
  `);

  const items = articles
    .map((article: any) => {
      const url = `${siteUrl}/articles/${article.slug}`;

      return `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(
            article.publishedAt
          ).toUTCString()}</pubDate>
          <description>${escapeXml(article.summary || "")}</description>
        </item>
      `.trim();
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Notes on narratives</title>
    <link>${siteUrl}</link>
    <description>
      Essays and notes on media, narratives, propaganda, and confusion.
    </description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}