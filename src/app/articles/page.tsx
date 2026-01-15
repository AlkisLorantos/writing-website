import Link from "next/link";
import { sanityClient } from "@/sanity/lib/client";
import { ARTICLES_INDEX } from "@/sanity/queries";

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await sanityClient.fetch(ARTICLES_INDEX);

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <p className="text-neutral-600">Longer pieces.</p>
      </header>

      <ul className="space-y-4">
        {articles.map((a: any) => (
          <li key={a.slug} className="rounded-2xl border p-5">
            <Link className="text-lg font-semibold underline" href={`/articles/${a.slug}`}>
              {a.title}
            </Link>
            <div className="text-xs text-neutral-600 mt-1">
              {new Date(a.publishedAt).toLocaleDateString()}
            </div>
            {a.summary ? <p className="text-neutral-700 mt-3">{a.summary}</p> : null}
            {a.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {a.tags.map((t: string) => (
                  <span key={t} className="text-xs rounded-full border px-2 py-1 text-neutral-600">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}