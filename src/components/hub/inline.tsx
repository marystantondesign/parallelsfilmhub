import type { ReactNode } from "react";

// Renders inline "*italic*" markup within a block of text as <em> spans.
// Shared by the prose-ish story pages (synopsis, beat sheet, storyboard,
// shot list) that otherwise render plain text blocks.
export function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, i) => {
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return <em key={`${keyPrefix}-${i}`}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
