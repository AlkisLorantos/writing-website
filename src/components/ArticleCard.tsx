import Link from "next/link";

export function ArticleCard({ article }: { article: any }) {
  return (
    <li className="rounded-2xl border border-black/10 bg-white/60 p-6">
      <div className="flex items-start justify-between gap-4">
        <Link className="font-serif text-2xl leading-tight hover:underline" href={`/articles/${article.slug}`}>
          {article.title}
        </Link>
        <div className="text-xs text-black/60 shrink-0 pt-1">
          {new Date(article.publishedAt).toLocaleDateString()}
        </div>
      </div>

      {article.summary ? (
        <p className="mt-3 text-black/80 leading-relaxed">{article.summary}</p>
      ) : null}

      {article.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((t: string) => (
            <span
              key={t}
              className="text-xs rounded-full border border-black/10 bg-[color:var(--paper)] px-2.5 py-1 text-black/70"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </li>
  );
}