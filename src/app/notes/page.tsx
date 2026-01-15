import { sanityClient } from "@/sanity/lib/client";
import { NOTES_FEED } from "@/sanity/queries";
import { Container } from "@/components/Container";
import { NoteCard } from "@/components/NoteCard";

export const revalidate = 60;

export default async function NotesPage() {
  const notes = await sanityClient.fetch(NOTES_FEED);

  return (
    <Container>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <p className="text-neutral-700">
          Quick thoughts and observations / short form text.
        </p>
      </header>

      <ul className="mt-8 space-y-4">
        {notes.map((n: any) => <NoteCard key={n._id} note={n} />)}
      </ul>
    </Container>
  );
}