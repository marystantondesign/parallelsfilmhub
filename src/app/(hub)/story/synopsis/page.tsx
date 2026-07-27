import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { parseSynopsis } from "@/lib/synopsis";
import { renderInline } from "@/components/hub/inline";

export const metadata: Metadata = {
  title: "Synopsis — Parallel",
  description: "The one-page synopsis for Parallel.",
};

function readSynopsis(): string {
  const filePath = path.join(process.cwd(), "content", "story", "synopsis.md");
  return fs.readFileSync(filePath, "utf8");
}

export default function SynopsisPage() {
  const blocks = parseSynopsis(readSynopsis());

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Synopsis</h1>

      <article className="mt-8 font-serif-body text-base leading-8 text-ink sm:text-lg">
        {blocks.map((block, i) => {
          if (block.type === "divider") {
            return <hr key={i} className="my-8 border-t border-stone/30" />;
          }
          if (block.type === "heading") {
            return (
              <h2 key={i} className="mt-8 font-display text-xl not-italic text-ink first:mt-0">
                {renderInline(block.text, `h${i}`)}
              </h2>
            );
          }
          return (
            <p key={i} className="mt-4 whitespace-pre-line first:mt-0">
              {renderInline(block.text, `p${i}`)}
            </p>
          );
        })}
      </article>
    </div>
  );
}
