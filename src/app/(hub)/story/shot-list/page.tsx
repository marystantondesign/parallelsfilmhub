import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { parseTable } from "@/lib/table";

export const metadata: Metadata = {
  title: "Shot List — Parallel",
  description: "The full shot breakdown for Parallel.",
};

function readShotList(): string {
  const filePath = path.join(process.cwd(), "content", "story", "shot-list.md");
  return fs.readFileSync(filePath, "utf8");
}

export default function ShotListPage() {
  const raw = readShotList();
  const table = parseTable(raw);

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-5 py-10 sm:px-10 sm:py-16">
      <Link
        href="/story"
        className="inline-flex min-h-11 items-center text-sm text-stone transition-colors hover:text-ink"
      >
        ← Back
      </Link>

      <h1 className="mt-8 font-display text-3xl text-ink sm:text-4xl">Shot List</h1>

      {table ? (
        <div className="mt-8 overflow-x-auto rounded-xl border border-stone/40">
          <table className="w-full min-w-[480px] border-collapse font-sans text-sm">
            <thead>
              <tr className="bg-butter">
                {table.headers.map((h, i) => (
                  <th key={i} className="border-b border-stone/40 px-4 py-3 text-left font-medium text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i} className="odd:bg-butter/40">
                  {row.map((cell, j) => (
                    <td key={j} className="border-b border-stone/20 px-4 py-3 align-top text-ink">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8 whitespace-pre-line font-sans text-base text-ink">{raw.replace(/<!--[\s\S]*?-->/g, "").trim()}</p>
      )}
    </main>
  );
}
