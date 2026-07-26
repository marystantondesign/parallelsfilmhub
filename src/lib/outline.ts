export type OutlineBlock = { type: "heading"; text: string } | { type: "list"; items: string[] } | { type: "paragraph"; text: string };

// A light outline convention: "## " lines are section headings, "- "/"* "
// lines are list items (stacked with no blank line between them), and any
// other non-blank line is a plain paragraph. Blank lines end whatever
// block is currently open.
export function parseOutline(raw: string): OutlineBlock[] {
  const lines = raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\r\n/g, "\n")
    .split("\n");

  const blocks: OutlineBlock[] = [];
  let listItems: string[] = [];
  let paragraphLines: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  };
  const flushParagraph = () => {
    if (paragraphLines.length) {
      blocks.push({ type: "paragraph", text: paragraphLines.join(" ").trim() });
      paragraphLines = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("## ")) {
      flushList();
      flushParagraph();
      blocks.push({ type: "heading", text: line.slice(3).trim() });
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      listItems.push(line.slice(2).trim());
    } else if (line === "") {
      flushList();
      flushParagraph();
    } else {
      flushList();
      paragraphLines.push(line);
    }
  }
  flushList();
  flushParagraph();

  return blocks;
}
