import { defineField, defineType } from "sanity";

export const note = defineType({
  name: "note",
  title: "Note",
  type: "document",
  fields: [
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "public",
      title: "Public",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "pinned",
      title: "Pinned",
      type: "boolean",
      initialValue: false,
      description: "Pinned notes appear first on the homepage",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {
      text: "text",
      publishedAt: "publishedAt",
      pinned: "pinned",
    },
    prepare({ text, publishedAt, pinned }) {
      const firstLine =
        text?.[0]?.children?.[0]?.text?.slice(0, 60) ?? "Empty note";

      return {
        title: firstLine,
        subtitle: `${new Date(publishedAt).toLocaleString()}${
          pinned ? " • pinned" : ""
        }`,
      };
    },
  },
});