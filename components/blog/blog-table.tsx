type TableValue = {
  rows?: { _key: string; cells?: string[] }[];
};

/**
 * Renders a @sanity/table value as a styled, horizontally-scrollable table.
 * The first row is treated as the header.
 */
export function BlogTable({ value }: { value: TableValue }) {
  const rows = value?.rows?.filter((r) => r?.cells?.length) ?? [];
  if (!rows.length) return null;

  const [headRow, ...bodyRows] = rows;

  return (
    <div className="my-8 overflow-x-auto rounded-card border border-border">
      <table className="w-full border-collapse text-left text-[0.9375rem]">
        {headRow ? (
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {headRow.cells?.map((cell, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-4 py-3 font-display text-sm font-semibold tracking-tight text-foreground"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {bodyRows.map((row) => (
            <tr
              key={row._key}
              className="border-b border-border/60 last:border-0 transition-colors hover:bg-muted/30"
            >
              {row.cells?.map((cell, i) => (
                <td
                  key={i}
                  className="px-4 py-3 align-top leading-relaxed text-muted-foreground"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
