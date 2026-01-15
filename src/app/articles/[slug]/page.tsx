// src/app/articles/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { sanityClient } from "@/sanity/lib/client";
import { ARTICLE_BY_SLUG } from "@/sanity/queries";
import { Container } from "@/components/Container";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

async function getSlug(params: PageProps["params"]) {
  const p = await Promise.resolve(params);
  return p.slug;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const slug = await getSlug(params);

  const article = await sanityClient.fetch(ARTICLE_BY_SLUG, { slug });
  if (!article) return {};

  const title = article.title as string;
  const description =
    (article.summary as string) || "Writing on media framing and world affairs.";

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

  return (
    <Container>
      <header className="space-y-3 mb-10">
        <p className="text-xs tracking-widest text-black/60 uppercase">Article</p>

        <h1 className="font-serif text-4xl leading-tight tracking-tight">
          {article.title}
        </h1>

        <div className="text-xs text-black/60">
          {new Date(article.publishedAt).toLocaleDateString()}
        </div>

        {article.summary ? (
          <p className="font-prose text-black/85 leading-relaxed max-w-prose">
            {article.summary}
          </p>
        ) : null}
      </header>

      <article className="prose prose-lg measure-wide">
        <PortableText value={article.body} />
      </article>
    </Container>
  );
}