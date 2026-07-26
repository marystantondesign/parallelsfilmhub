export type SynopsisBlock = { type: "heading"; text: string } | { type: "divider" } | { type: "paragraph"; text: string };

// Lightweight Markdown-ish parsing for prose pages: "## " lines are section
// headings (a "**bold**" wrapper around the heading text is stripped, since
// the heading is already styled prominently), a lone "---" line is a
// divider, and everything else is a paragraph. Inline "*italic*" markup
// within heading/paragraph text is left as-is here - the page component
// renders that part, since it needs JSX.
export function parseSynopsis(raw: string): SynopsisBlock[] {
  const blocks = raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block): SynopsisBlock => {
    if (/^-{3,}$/.test(block)) return { type: "divider" };
    if (block.startsWith("## ")) {
      const text = block.slice(3).trim().replace(/^\*\*(.+)\*\*$/, "$1");
      return { type: "heading", text };
    }
    return { type: "paragraph", text: block };
  });
}
