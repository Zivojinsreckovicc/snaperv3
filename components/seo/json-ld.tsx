/**
 * Renders a JSON-LD <script> for structured data. Server component.
 * The payload is trusted (built from our own config), not user input.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
