import Link from "next/link";
import { sanityClient } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/queries";
import { NoteCardCompact } from "@/components/NoteCardCompact";

export const revalidate = 60;

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
  } else if (typeof content === "string") {
    text = content;
  }

  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}

function TagRow({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.slice(0, 4).map((t) => (
        <Link
          key={t}
          href={`/tags/${encodeURIComponent(t)}`}
          className="text-xs rounded-full border border-black/10 bg-[color:var(--paper)] px-2.5 py-1 text-black/70 hover:text-black transition-colors duration-200"
        >
          {t}
        </Link>
      ))}
    </div>
  );
}

export default async function HomePage() {
  const data = await sanityClient.fetch(HOME_QUERY);
  const articles = data.articles ?? [];
  const notes = data.notes ?? [];

  return (
    <main className="mx-auto max-w-[1080px] px-6 py-10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[720px_320px] lg:gap-10">
        <header className="space-y-3 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight">
            Writing on politics, society and world affairs
          </h1>

          <p className="text-black/75 leading-relaxed max-w-prose">
            [Your one-line subtitle here]
          </p>
        </header>

        <aside className="hidden lg:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[720px_320px] lg:gap-10 lg:items-start">
        <section className="space-y-8">
          <div className="mb-8 pt-8 border-t border-black/10" />

          <ul className="space-y-10">
            {articles.map((a: any, idx: number) => {
              const isLead = idx === 0;
              const readingTime = estimateReadingTime(a.content || a.body);

              return (
                <li
                  key={a.slug}
                  className={
                    isLead
                      ? "pb-12 border-b border-black/20"
                      : "pb-10 border-b border-black/10 last:border-b-0 last:pb-0"
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <Link
                      href={`/articles/${a.slug}`}
                      className={
                        isLead
                          ? "font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight hover:underline transition-all duration-200"
                          : "font-serif text-2xl sm:text-3xl leading-tight hover:underline transition-all duration-200"
                      }
                    >
                      {a.title}
                    </Link>
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-xs text-black/60">
                    <span>{formatDate(a.publishedAt)}</span>
                    <span>•</span>
                    <span>{readingTime} min read</span>
                  </div>

                  {a.summary ? (
                    <p
                      className={
                        isLead
                          ? "mt-4 text-black/80 leading-relaxed text-[18px]"
                          : "mt-3 text-black/80 leading-relaxed text-[17px]"
                      }
                    >
                      {a.summary}
                    </p>
                  ) : null}

                  <TagRow tags={a.tags} />
                </li>
              );
            })}
          </ul>

          <div className="pt-6">
            <Link
              href="/articles"
              className="text-sm text-black/50 hover:text-black underline transition-colors duration-200"
            >
              View all essays →
            </Link>
          </div>
        </section>

        <aside className="mt-12 lg:mt-0 lg:sticky lg:top-6">
          <div className="pt-2">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xs tracking-widest uppercase text-black/60">
                Quick thoughts
              </h2>
              <Link 
                className="text-xs underline text-black/50 hover:text-black transition-colors duration-200" 
                href="/notes"
              >
                All
              </Link>
            </div>

            <div className="mt-3 h-px bg-black/10" />

            <ul className="mt-4 space-y-1">
              {notes.map((n: any) => (
                <NoteCardCompact key={n._id} note={n} />
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}