import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata = {
  title: "About",
  description:
    "About this site and its approach to media, narratives, and world affairs.",
};

export default function AboutPage() {
  return (
    <Container>
      <div className="max-w-prose space-y-12">

        <header className="space-y-3">
          <p className="text-xs tracking-widest text-black/60 uppercase">
            About
          </p>
          <h1 className="font-serif text-4xl leading-tight tracking-tight">
            Why this site exists
          </h1>
        </header>

        <section className="space-y-5 text-black/85 leading-relaxed">
          <p>
            This site is a place to think in public about media, narratives,
            and world affairs. It functions primarily as a working notebook:
            a space to examine claims, trace incentives, and clarify what is
            often obscured in contemporary coverage.
          </p>

          <p>
            Much of modern political and international reporting is shaped less
            by events themselves than by framing, repetition, and selective
            emphasis. The goal here is not to promote a position, but to slow
            things down — to separate facts from narratives, and narratives
            from incentives.
          </p>
        </section>

        <section className="space-y-5 text-black/85 leading-relaxed">
          <h2 className="font-serif text-2xl leading-tight tracking-tight">
            How I approach information
          </h2>

          <p>
            I focus on primary claims, incentives, and omissions. That means
            paying attention not only to what is said, but to what is left out,
            simplified, or taken for granted.
          </p>

          <p>
            Where possible, I link to original sources, official statements,
            or raw material rather than commentary. When something is speculative
            or uncertain, it should be treated as such.
          </p>
        </section>

        <section className="space-y-5 text-black/85 leading-relaxed">
          <h2 className="font-serif text-2xl leading-tight tracking-tight">
            What this is not
          </h2>

          <p>
            This is not a news site, and it is not a platform for outrage,
            tribal signaling, or constant reaction. The aim is clarity rather
            than speed, and understanding rather than alignment.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl">Elsewhere</h2>

          <ul className="space-y-2 text-black/85">
            <li>
              <Link
                href="/articles"
                className="underline hover:text-black"
              >
                Articles
              </Link>{" "}
              — longer essays
            </li>
            <li>
              <Link
                href="/notes"
                className="underline hover:text-black"
              >
                Notes
              </Link>{" "}
              — short observations
            </li>
            <li>
              <a
                href="/rss.xml"
                className="underline hover:text-black"
              >
                RSS feed
              </a>
            </li>
          </ul>
        </section>

      </div>
    </Container>
  );
}

