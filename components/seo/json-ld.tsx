/**
 * Renders a JSON-LD <script> for structured data. Server component.
 * `<` is escaped so CMS text (e.g. FAQ answers) can't close the script tag.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
