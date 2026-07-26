import Link from "next/link";
import type { Metadata } from "next";
import { BookIcon, DocumentIcon, ImageIcon, ListIcon, TableIcon } from "@/components/hub/icons";

export const metadata: Metadata = {
  title: "Story Development — Parallel",
  description: "Synopsis, script, beat sheet, storyboard, and shot list for Parallel.",
};

const ITEMS = [
  { href: "/story/synopsis", label: "Synopsis", description: "The one-page synopsis.", Icon: BookIcon },
  { href: "/story/script", label: "Script", description: "The full screenplay.", Icon: DocumentIcon },
  { href: "/story/beat-sheet", label: "Beat Sheet", description: "The story beat by beat.", Icon: ListIcon },
  { href: "/story/storyboard", label: "Storyboard", description: "Key frames, shot by shot.", Icon: ImageIcon },
  { href: "/story/shot-list", label: "Shot List", description: "The full shot breakdown.", Icon: TableIcon },
];

export default function StoryIndexPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-14 sm:px-10 sm:py-20">
      <Link href="/" className="inline-flex min-h-11 items-center text-sm text-stone transition-colors hover:text-ink">
        ← Back
      </Link>

      <h1 className="mt-8 text-center font-display text-4xl text-ink sm:text-5xl">Story Development</h1>

      <nav aria-label="Story development items" className="mt-10 flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex min-h-[4.5rem] flex-row items-center gap-4 rounded-xl border border-stone/40 bg-butter p-4 text-left transition-shadow hover:shadow-[0_6px_20px_-8px_rgba(10,10,10,0.25)] sm:min-h-[9rem] sm:flex-col sm:items-center sm:gap-2 sm:p-6 sm:text-center"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink sm:h-12 sm:w-12">
              <item.Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </span>
            <span className="flex flex-1 flex-col sm:items-center">
              <span className="font-display text-lg text-ink sm:text-xl">{item.label}</span>
              <span className="mt-0.5 font-serif-body text-sm italic text-stone">{item.description}</span>
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
