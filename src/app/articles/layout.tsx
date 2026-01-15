import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Articles",
    template: "%s — Articles",
  },
  description:
    "Long-form essays on media, power, narratives, and world affairs.",
  openGraph: {
    type: "article",
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}