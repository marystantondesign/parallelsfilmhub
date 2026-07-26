import Link from "next/link";
import type { Metadata } from "next";
import PinterestBoardEmbed from "@/components/hub/PinterestBoardEmbed";

export const metadata: Metadata = {
  title: "Moodboard — Parallel",
  description: "Visual references for Parallel.",
};

// TODO(moodboard): drop in the real public Pinterest board URL, either here
// or via the NEXT_PUBLIC_PINTEREST_BOARD_URL env var (handy for swapping
// boards per-environment without a code change).
const PINTEREST_BOARD_URL = process.env.NEXT_PUBLIC_PINTEREST_BOARD_URL || "https://www.pinterest.com/USERNAME/BOARD-NAME/";

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
