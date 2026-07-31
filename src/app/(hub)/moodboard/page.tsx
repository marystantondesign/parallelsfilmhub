import Link from "next/link";
import type { Metadata } from "next";
import PinterestBoardEmbed from "@/components/hub/PinterestBoardEmbed";
import { PINTEREST_BOARD_URL } from "@/lib/pinterest";

export const metadata: Metadata = {
  title: "Moodboard — Parallels",
  description: "Visual references for Parallels.",
};

export default function MoodboardPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-16">
      <Link href="/" className="inline-flex min-h-11 items-center text-sm text-stone transition-colors hover:text-ink">
        ← Back
      </Link>

      <div className="mt-8">
        <PinterestBoardEmbed boardUrl={PINTEREST_BOARD_URL} />
      </div>
    </main>
  );
}
