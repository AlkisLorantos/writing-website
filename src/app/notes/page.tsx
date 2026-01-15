import { sanityClient } from "@/sanity/lib/client";
import { NOTES_FEED } from "@/sanity/queries";
import { NoteCard } from "@/components/NoteCard";
import { Note } from "@/types";

export const revalidate = 60;

export default async function NotesPage() {
  const notes: Note[] = await sanityClient.fetch(NOTES_FEED);

  return (
    <main className="mx-auto max-w-[720px] px-6 py-10 min-h-screen">
      <header className="space-y-3 mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight">
          Quick thoughts
        </h1>
        <p className="text-black/75 leading-relaxed">
          Short observations and passing notes
        </p>
      </header>

      <div className="pt-8 border-t border-black/10" />

      <ul className="mt-8 space-y-6">
        {notes.map((n: Note) => <NoteCard key={n._id} note={n} />)}
      </ul>
    </main>
  );
}