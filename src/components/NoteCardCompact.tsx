import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { Note } from "@/types";

export function NoteCardCompact({ note }: { note: Note }) {
  const date = new Date(note.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <li className="group">
      <Link 
        href={`/notes/${note.slug?.current || note._id}`}
        className="block"
      >
        <div className="text-[11px] text-black/50 mb-1.5">
          {date}
        </div>
        <div className="text-sm leading-relaxed text-black/75 group-hover:text-black transition-colors duration-200">
          <PortableText
            value={note.text}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="m-0 line-clamp-3">{children}</p>
                ),
              },
            }}
          />
        </div>
      </Link>
    </li>
  );
}