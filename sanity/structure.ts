import type { StructureResolver } from "sanity/structure";
import { DocumentTextIcon, TagIcon, UserIcon } from "@sanity/icons";

/**
 * Studio desk layout. Posts first (the main thing an editor touches), then the
 * supporting Authors and Categories.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Blog posts")
        .icon(DocumentTextIcon)
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog posts")),
      S.divider(),
      S.listItem()
        .title("Authors")
        .icon(UserIcon)
        .schemaType("author")
        .child(S.documentTypeList("author").title("Authors")),
      S.listItem()
        .title("Categories")
        .icon(TagIcon)
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
    ]);
