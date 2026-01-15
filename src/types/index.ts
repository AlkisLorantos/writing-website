import { PortableTextBlock } from "@portabletext/react";

export type Article = {
  _id: string;
  slug: string;
  title: string;
  publishedAt: string;
  summary?: string;
  tags?: string[];
  content?: PortableTextBlock[];
  body?: PortableTextBlock[];
};

export type Note = {
  _id: string;
  publishedAt: string;
  text: PortableTextBlock[];
  slug?: {
    current: string;
  };
};