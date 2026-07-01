import { type SchemaTypeDefinition } from "sanity";

import { postType } from "./postType";
import { authorType } from "./authorType";
import { categoryType } from "./categoryType";
import { blockContentType } from "./blockContentType";
import { faqType } from "./faqType";
import { seoType } from "./seoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, authorType, categoryType, blockContentType, faqType, seoType],
};
