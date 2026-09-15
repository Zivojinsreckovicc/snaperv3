export type DividerValue = { style?: "line" | "dots" | "space" };

/** Visual break between sections of an article. */
export function BlogDivider({ value }: { value: DividerValue }) {
  const style = value?.style ?? "line";

  if (style === "space") {
    return <div aria-hidden="true" className="h-10 sm:h-14" />;
  }

  if (style === "dots") {
    return (
      <div
        role="separator"
        className="my-12 flex items-center justify-center gap-2.5"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent/60"
          />
        ))}
      </div>
    );
  }

  return (
    <hr className="my-12 h-px border-0 bg-gradient-to-r from-transparent via-border-strong to-transparent" />
  );
}
