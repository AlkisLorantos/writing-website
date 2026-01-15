import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { Note } from "@/types";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function NoteCard({ note }: { note: Note }) {
  return (
    <li className="group pb-6 border-b border-black/10 last:border-b-0 last:pb-0">
      <Link 
        href={`/notes/${note.slug?.current || note._id}`}
        className="block"
      >
        <div className="text-xs text-black/50 mb-3">
          {formatDate(note.publishedAt)}
        </div>
        <div className="prose prose-sm max-w-none text-black/75 leading-relaxed group-hover:text-black transition-colors duration-200">
          <PortableText value={note.text} />
        </div>
      </Link>
    </li>
  );
}