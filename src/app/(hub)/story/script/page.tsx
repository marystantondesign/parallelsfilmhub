import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { extractTitlePage, parseScreenplay } from "@/lib/screenplay";

export const metadata: Metadata = {
  title: "Script — Parallel",
  description: "Read the Parallel script.",
};

function readScreenplay(): string {
  const filePath = path.join(process.cwd(), "content", "story", "script.md");
  return fs.readFileSync(filePath, "utf8");
}

export default function ScriptPage() {
  const { titlePage, body } = extractTitlePage(readScreenplay());
  const elements = parseScreenplay(body);

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-5 py-10 sm:px-10 sm:py-16">
      <Link
        href="/story"
        className="inline-flex min-h-11 items-center text-sm text-stone transition-colors hover:text-ink"
      >
        ← Back
      </Link>

      {(titlePage.title || titlePage.byline) && (
        <div className="mt-10 flex flex-col items-center text-center font-screenplay text-ink">
          {titlePage.title && <h1 className="text-2xl uppercase tracking-wide">{titlePage.title}</h1>}
          {titlePage.subtitle && <p className="mt-2 text-sm italic text-stone">{titlePage.subtitle}</p>}
          {titlePage.byline && <p className="mt-4 text-sm text-stone">{titlePage.byline}</p>}
        </div>
      )}

      <article className="mt-10 font-screenplay text-[15px] leading-7 text-ink sm:text-base">
        {elements.map((el, i) => {
          switch (el.type) {
            case "heading":
              return (
                <p key={i} className="mt-8 mb-2 font-bold uppercase tracking-wide first:mt-0">
                  {el.text}
                </p>
              );
            case "transition":
              return (
                <p key={i} className="mt-6 mb-2 text-right uppercase text-stone">
                  {el.text}
                </p>
              );
            case "character":
              return (
                <p key={i} className="mt-6 text-center uppercase">
                  {el.text}
                </p>
              );
            case "parenthetical":
              return (
                <p key={i} className="mx-auto max-w-xs text-center italic text-stone">
                  {el.text}
                </p>
              );
            case "dialogue":
              return (
                <p key={i} className="mx-auto mt-1 mb-2 max-w-sm whitespace-pre-line text-center sm:text-left">
                  {el.text}
                </p>
              );
            case "action":
            default:
              return (
                <p key={i} className="mt-4 whitespace-pre-line first:mt-0">
                  {el.text}
                </p>
              );
          }
        })}
      </article>
    </main>
  );
}
