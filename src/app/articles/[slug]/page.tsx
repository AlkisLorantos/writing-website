import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

import { sanityClient } from "@/sanity/lib/client";
import { ARTICLE_BY_SLUG } from "@/sanity/queries";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

async function getSlug(params: PageProps["params"]) {
  const p = await Promise.resolve(params);
  return p.slug;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function estimateReadingTime(content: any) {
  if (!content) return 5;

  let text = "";
  if (Array.isArray(content)) {
    text = content
      .filter((block: any) => block._type === "block")
      .map(
        (block: any) =>
          block.children?.map((child: any) => child.text).join(" ") || ""
      )
      .join(" ");
  }

  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const slug = await getSlug(params);

  const article = await sanityClient.fetch(ARTICLE_BY_SLUG, { slug });
  if (!article) return {};

  const title = article.title as string;
  const description =
    (article.summary as string) || "Writing on politics, society and world affairs.";

  const url = `${siteUrl}/articles/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = await getSlug(params);

  const article = await sanityClient.fetch(ARTICLE_BY_SLUG, { slug });
  if (!article) return notFound();

  const readingTime = estimateReadingTime(article.body);

  return (
    <main className="mx-auto max-w-[720px] px-6 py-10 min-h-screen">
      <article>
        <header className="space-y-4 mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-black/60">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>

          {article.summary ? (
            <p className="text-lg text-black/80 leading-relaxed border-l-2 border-black/10 pl-4 italic">
              {article.summary}
            </p>
          ) : null}
        </header>

        <div className="prose prose-lg max-w-none">
          <PortableText value={article.body} />
        </div>

        {article.tags?.length ? (
          <div className="mt-12 pt-8 border-t border-black/10">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((t: string) => (
                <Link
                  key={t}
                  href={`/tags/${encodeURIComponent(t)}`}
                  className="text-xs rounded-full border border-black/10 bg-[color:var(--paper)] px-2.5 py-1 text-black/70 hover:text-black transition-colors duration-200"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 pt-8 border-t border-black/10">
          <Link
            href="/articles"
            className="text-sm text-black/50 hover:text-black underline transition-colors duration-200"
          >
            ← Back to all essays
          </Link>
        </div>
      </article>
    </main>
  );
}