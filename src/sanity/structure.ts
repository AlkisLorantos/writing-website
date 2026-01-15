import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("note").title("Notes"),
      S.documentTypeListItem("article").title("Articles"),
      S.divider(),
      // Keep the rest of document types accessible (handy later)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "note" && item.getId() !== "article"
      ),
    ]);