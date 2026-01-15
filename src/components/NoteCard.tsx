import { PortableText } from "@portabletext/react";

export function NoteCard({ note }: { note: any }) {
  return (
    <li className="relative rounded-2xl border border-black/10 bg-white/60 px-5 py-4">
      <div className="absolute left-0 top-4 bottom-4 w-px bg-black/10" />
      <div className="text-xs text-black/60 mb-2">
        {new Date(note.publishedAt).toLocaleString()}
      </div>
      <div className="prose max-w-none prose-p:leading-relaxed prose-a:underline">
        <PortableText value={note.text} />
      </div>
    </li>
  );
}