import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { parseOutline } from "@/lib/outline";

export const metadata: Metadata = {
  title: "Beat Sheet — Parallel",
  description: "The Parallel story, beat by beat.",
};

function readBeatSheet(): string {
  const filePath = path.join(process.cwd(), "content", "story", "beat-sheet.md");
  return fs.readFileSync(filePath, "utf8");
}

export default function BeatSheetPage() {
  const blocks = parseOutline(readBeatSheet());

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-5 py-10 sm:px-10 sm:py-16">
      <Link
        href="/story"
        className="inline-flex min-h-11 items-center text-sm text-stone transition-colors hover:text-ink"
      >
        ← Back
      </Link>

      <h1 className="mt-8 font-display text-3xl text-ink sm:text-4xl">Beat Sheet</h1>

      <article className="mt-8 font-sans text-base leading-7 text-ink">
        {blocks.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h2 key={i} className="mt-8 font-display text-xl text-ink first:mt-0">
                {block.text}
              </h2>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="mt-3 list-disc space-y-2 pl-5">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="mt-3">
              {block.text}
            </p>
          );
        })}
      </article>
    </main>
  );
}
