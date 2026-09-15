import { type SchemaTypeDefinition } from "sanity";

import { postType } from "./postType";
import { authorType } from "./authorType";
import { categoryType } from "./categoryType";
import { blockContentType } from "./blockContentType";
import { seoType } from "./seoType";

// Body blocks (everything an editor can insert into a post).
import { faqType } from "./faqType";
import { videoType } from "./videoType";
import { ctaBannerType } from "./ctaBannerType";
import { linkButtonType } from "./linkButtonType";
import { calloutType } from "./calloutType";
import { pullQuoteType } from "./pullQuoteType";
import { imageGalleryType } from "./imageGalleryType";
import { dividerType } from "./dividerType";
import { htmlEmbedType } from "./htmlEmbedType";
import { tableOfContentsType } from "./tableOfContentsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    postType,
    authorType,
    categoryType,
    // Shared objects
    blockContentType,
    seoType,
    // Body blocks
    faqType,
    videoType,
    ctaBannerType,
    linkButtonType,
    calloutType,
    pullQuoteType,
    imageGalleryType,
    dividerType,
    htmlEmbedType,
    tableOfContentsType,
  ],
};
