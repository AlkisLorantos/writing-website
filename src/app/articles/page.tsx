import Link from "next/link";
import { sanityClient } from "@/sanity/lib/client";
import { ARTICLES_INDEX } from "@/sanity/queries";
import { Article } from "@/types";
import { PortableTextBlock } from "@portabletext/react";

export const revalidate = 60;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function estimateReadingTime(content?: PortableTextBlock[] | string) {
  if (!content) return 5;

  let text = "";
  if (Array.isArray(content)) {
    text = content
      .filter((block) => block._type === "block")
      .map((block) => {
        const children = block.children || [];
        return children
          .map((child: unknown) => {
            const typedChild = child as { text?: string };
            return typedChild.text || "";
          })
          .join(" ");
      })
      .join(" ");
  } else if (typeof content === "string") {
    text = content;
  }

  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}

export default async function ArticlesPage() {
  const articles: Article[] = await sanityClient.fetch(ARTICLES_INDEX);

  return (
    <main className="mx-auto max-w-[1080px] px-6 py-10 min-h-screen">
      <div className="max-w-[720px]">
        <header className="space-y-3 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight">
            Essays
          </h1>
          <p className="text-black/75 leading-relaxed">
            Writing on politics, society, and world affairs
          </p>
        </header>

        <div className="pt-8 border-t border-black/10" />

        <ul className="mt-8 space-y-10">
          {articles.map((a: Article) => {
            const readingTime = estimateReadingTime(a.content || a.body);
            
            return (
              <li key={a.slug} className="pb-10 border-b border-black/10 last:border-b-0 last:pb-0">
                <Link
                  href={`/articles/${a.slug}`}
                  className="font-serif text-2xl sm:text-3xl leading-tight hover:underline transition-all duration-200"
                >
                  {a.title}
                </Link>

                <div className="mt-2 flex items-center gap-3 text-xs text-black/60">
                  <span>{formatDate(a.publishedAt)}</span>
                  <span>•</span>
                  <span>{readingTime} min read</span>
                </div>

                {a.summary ? (
                  <p className="mt-3 text-black/80 leading-relaxed text-[17px]">
                    {a.summary}
                  </p>
                ) : null}

                {a.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {a.tags.map((t: string) => (
                      <Link
                        key={t}
                        href={`/tags/${encodeURIComponent(t)}`}
                        className="text-xs rounded-full border border-black/10 bg-[color:var(--paper)] px-2.5 py-1 text-black/70 hover:text-black transition-colors duration-200"
                      >
                        {t}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}