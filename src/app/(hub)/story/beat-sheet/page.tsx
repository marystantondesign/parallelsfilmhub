import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { parseOutline } from "@/lib/outline";
import { OutlineArticle } from "@/components/hub/OutlineArticle";

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

      <OutlineArticle blocks={blocks} className="mt-8 font-sans text-base leading-7 text-ink" />
    </main>
  );
}
