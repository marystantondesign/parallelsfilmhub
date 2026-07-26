export type ScreenplayElement =
  | { type: "heading"; text: string }
  | { type: "character"; text: string }
  | { type: "parenthetical"; text: string }
  | { type: "dialogue"; text: string }
  | { type: "transition"; text: string }
  | { type: "action"; text: string };

function isAllCaps(line: string): boolean {
  const letters = line.replace(/[^A-Za-z]/g, "");
  return letters.length > 0 && letters === letters.toUpperCase();
}

const HEADING_RE = /^(INT|EXT|INT\/EXT|I\/E)[.\s]/i;
const TRANSITION_RE = /(TO:$|^FADE IN\.?$|^FADE OUT\.?$)/i;

export function parseScreenplay(raw: string): ScreenplayElement[] {
  const withoutComments = raw.replace(/<!--[\s\S]*?-->/g, "");
  const blocks = withoutComments
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const elements: ScreenplayElement[] = [];
  let expectingDialogue = false;

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim());
    const singleLine = lines.length === 1 ? lines[0] : null;

    if (singleLine && isAllCaps(singleLine) && HEADING_RE.test(singleLine)) {
      elements.push({ type: "heading", text: singleLine });
      expectingDialogue = false;
      continue;
    }

    if (singleLine && isAllCaps(singleLine) && TRANSITION_RE.test(singleLine)) {
      elements.push({ type: "transition", text: singleLine });
      expectingDialogue = false;
      continue;
    }

    if (singleLine && singleLine.startsWith("(") && singleLine.endsWith(")")) {
      elements.push({ type: "parenthetical", text: singleLine });
      expectingDialogue = true;
      continue;
    }

    if (singleLine && singleLine.length <= 40 && isAllCaps(singleLine)) {
      elements.push({ type: "character", text: singleLine });
      expectingDialogue = true;
      continue;
    }

    if (expectingDialogue) {
      elements.push({ type: "dialogue", text: block });
      expectingDialogue = false;
      continue;
    }

    elements.push({ type: "action", text: block });
  }

  return elements;
}
