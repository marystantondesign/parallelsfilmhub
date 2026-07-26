import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storyboard — Parallel",
  description: "Key frames for Parallel, shot by shot.",
};

// TODO(storyboard): drop frames into /public/story/storyboard/
// (.png/.jpg/.jpeg/.webp), named so they sort in shot order (e.g.
// 01-int-bedroom.png, 02-phone-app.png, ...). They're auto-discovered and
// rendered below - no code changes needed.
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function readFrames(): string[] {
  const dir = path.join(process.cwd(), "public", "story", "storyboard");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort()
    .map((name) => `/story/storyboard/${name}`);
}

export default function StoryboardPage() {
  const frames = readFrames();

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-5 py-10 sm:px-10 sm:py-16">
      <Link
        href="/story"
        className="inline-flex min-h-11 items-center text-sm text-stone transition-colors hover:text-ink"
      >
        ← Back
      </Link>

      <h1 className="mt-8 font-display text-3xl text-ink sm:text-4xl">Storyboard</h1>

      {frames.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {frames.map((src) => (
            <div key={src} className="overflow-hidden rounded-xl border border-stone/40 bg-butter">
              <Image src={src} alt="" width={800} height={450} className="h-auto w-full" unoptimized />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-stone/50 px-6 py-10 text-center">
          <p className="text-ink">No frames yet.</p>
          <p className="mt-2 text-sm text-stone">
            Drop frames into <code className="font-mono text-amber">/public/story/storyboard/</code> to have them
            appear here automatically.
          </p>
        </div>
      )}
    </main>
  );
}
