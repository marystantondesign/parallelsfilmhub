export type ScreenplayElement =
  | { type: "heading"; text: string }
  | { type: "character"; text: string }
  | { type: "parenthetical"; text: string }
  | { type: "dialogue"; text: string }
  | { type: "transition"; text: string }
  | { type: "action"; text: string };

export type TitlePage = {
  title: string | null;
  subtitle: string | null;
  byline: string | null;
};

function isAllCaps(line: string): boolean {
  // Ignore decade tokens like "1930s" - the trailing lowercase "s" doesn't
  // make an otherwise-all-caps slugline/cue stop counting as one.
  const withoutDecades = line.replace(/\d+s\b/g, "");
  const letters = withoutDecades.replace(/[^A-Za-z]/g, "");
  return letters.length > 0 && letters === letters.toUpperCase();
}

const SLUGLINE_RE = /^(INT|EXT|INT\/EXT|I\/E)[.\s]/i;
// Mini scene/shot cues (not full sluglines) that read as their own beat, e.g.
// "CLOSE ON: PHONE SCREEN", "BACK TO MILA", "VISION SEQUENCE - ...".
const SHOT_CUE_RE =
  /^(CLOSE (ON|UP)|ON SCREEN|BACK TO|ANGLE ON|INSERT|WIDE SHOT|VISION SEQUENCE|END VISION SEQUENCE|INTERCUT|MONTAGE|SERIES OF SHOTS|POV)\b/i;
// Mini interface/scene cues written as "LABEL — DETAIL", e.g.
// "CHAT — MILA #8", "PHONE — PARALLEL APP", "VISION — 1930s STUDIO".
const INTERFACE_CUE_RE = /\s[—-]\s/;
const TRANSITION_RE = /(TO:$|TO BLACK\.?$|^FADE (IN|OUT)\.?:?$)/i;

// A character cue's name may be followed by a parenthetical extension, e.g.
// "MILA (V.O.)" or "PARALLEL MILA #8 (TEXT - 3 weeks ago)" - only the name
// portion before the parenthetical needs to be in all caps. A single
// trailing colon (a chat-label style, e.g. "SISTER:") is stripped before
// validating rather than rejected outright.
function characterName(line: string): string | null {
  const match = line.match(/^([^(]+?)\s*(\([^)]*\))?$/);
  if (!match) return null;
  let namePart = match[1].trim();
  if (!namePart || namePart.length > 60) return null;
  namePart = namePart.replace(/:$/, "").trim();
  // Reject on-screen UI readouts like "SIMILARITY: 78%" or menus with
  // brackets - these are all caps like a cue but are never followed by
  // dialogue, so treating them as one would misclassify the next block.
  if (/[:%[\]]/.test(namePart)) return null;
  if (namePart.split(/\s+/).length > 3) return null;
  const letters = namePart.replace(/[^A-Za-z]/g, "");
  if (!letters || letters !== letters.toUpperCase()) return null;
  return line;
}

export function parseScreenplay(raw: string): ScreenplayElement[] {
  const blocks = stripComments(raw)
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const elements: ScreenplayElement[] = [];
  let expectingDialogue = false;

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim());
    const singleLine = lines.length === 1 ? lines[0] : null;

    if (singleLine && isAllCaps(singleLine) && SLUGLINE_RE.test(singleLine)) {
      elements.push({ type: "heading", text: singleLine });
      expectingDialogue = false;
      continue;
    }

    if (singleLine && isAllCaps(singleLine) && SHOT_CUE_RE.test(singleLine)) {
      elements.push({ type: "heading", text: singleLine });
      expectingDialogue = false;
      continue;
    }

    if (singleLine && isAllCaps(singleLine) && INTERFACE_CUE_RE.test(singleLine)) {
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

    if (singleLine && characterName(singleLine)) {
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

function stripComments(raw: string): string {
  return raw.replace(/<!--[\s\S]*?-->/g, "");
}

// Optional title page: a leading "# Title" line, an optional "*subtitle*"
// line right after it, and an optional "Written by ..." byline line. Any of
// the three may be omitted. Everything else is passed through to the parser.
export function extractTitlePage(raw: string): { titlePage: TitlePage; body: string } {
  const lines = stripComments(raw).replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  const skipBlank = () => {
    while (i < lines.length && lines[i].trim() === "") i++;
  };

  let title: string | null = null;
  let subtitle: string | null = null;
  let byline: string | null = null;

  skipBlank();
  if (lines[i]?.trim().startsWith("# ")) {
    title = lines[i].trim().slice(2).trim();
    i++;
  }

  skipBlank();
  const subtitleMatch = lines[i]?.trim().match(/^\*(.+)\*$/);
  if (subtitleMatch) {
    subtitle = subtitleMatch[1].trim();
    i++;
  }

  skipBlank();
  if (/^written by/i.test(lines[i]?.trim() ?? "")) {
    byline = lines[i].trim();
    i++;
  }

  skipBlank();
  return { titlePage: { title, subtitle, byline }, body: lines.slice(i).join("\n") };
}
