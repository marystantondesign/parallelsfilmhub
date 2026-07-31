import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { parseOutline } from "@/lib/outline";
import { OutlineArticle } from "@/components/hub/OutlineArticle";

export const metadata: Metadata = {
  title: "Shot List — Parallels",
  description: "The full shot breakdown for Parallels.",
};

function readShotList(): string {
  const filePath = path.join(process.cwd(), "content", "story", "shot-list.md");
  return fs.readFileSync(filePath, "utf8");
}

export default function ShotListPage() {
  const blocks = parseOutline(readShotList());

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Shot List</h1>

      <OutlineArticle blocks={blocks} className="mt-8 font-sans text-base leading-7 text-ink" />
    </div>
  );
}
