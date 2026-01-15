import { PortableText } from "@portabletext/react";

export function NoteCardCompact({ note }: { note: any }) {
  const date = new Date(note.publishedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <li className="py-3 border-b border-black/10 last:border-b-0">
      <div className="flex items-baseline gap-2">
        <span className="text-[11px] text-black/50 shrink-0">{date}</span>
        <span className="text-[11px] text-black/30">—</span>
        <div className="text-[13px] leading-relaxed text-black/70">
          <PortableText
            value={note.text}
            components={{
              block: {
                normal: ({ children }) => <p className="m-0">{children}</p>,
              },
            }}
          />
        </div>
      </div>
    </li>
  );
}