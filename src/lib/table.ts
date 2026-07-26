export type ParsedTable = { headers: string[]; rows: string[][] };

// A minimal GFM-style Markdown table parser: header row, a separator row
// of dashes, then one data row per line. Falls back to null if the content
// doesn't look like a table (so the page can render it as plain text).
export function parseTable(raw: string): ParsedTable | null {
  const lines = raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && l.includes("|"));

  if (lines.length < 2) return null;

  const splitRow = (line: string) =>
    line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const isSeparatorRow = (line: string) => /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?$/.test(line);

  if (!isSeparatorRow(lines[1])) return null;

  const headers = splitRow(lines[0]);
  const rows = lines.slice(2).map(splitRow);

  return { headers, rows };
}
