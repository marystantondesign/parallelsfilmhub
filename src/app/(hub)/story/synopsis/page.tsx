import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synopsis — Parallel",
  description: "The one-page synopsis for Parallel.",
};

function readSynopsis(): string {
  const filePath = path.join(process.cwd(), "content", "story", "synopsis.md");
  return fs.readFileSync(filePath, "utf8");
}

function paragraphs(raw: string): string[] {
  return raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default function SynopsisPage() {
  const blocks = paragraphs(readSynopsis());

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-5 py-10 sm:px-10 sm:py-16">
      <Link
        href="/story"
        className="inline-flex min-h-11 items-center text-sm text-stone transition-colors hover:text-ink"
      >
        ← Back
      </Link>

      <h1 className="mt-8 font-display text-3xl text-ink sm:text-4xl">Synopsis</h1>

      <article className="mt-8 font-serif-body text-base leading-8 text-ink sm:text-lg">
        {blocks.map((p, i) => (
          <p key={i} className="mt-4 whitespace-pre-line first:mt-0">
            {p}
          </p>
        ))}
      </article>
    </main>
  );
}
