import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Design — Parallel",
  description: "Screens and visual design for the Parallel app.",
};

// TODO(app-design): plug in the real destination once it exists. Pick ONE:
//   1) Image gallery (default): drop screenshots into /public/app-design/
//      (.png/.jpg/.jpeg/.webp). They're auto-discovered and rendered below —
//      no code changes needed.
//   2) External link/embed: set EXTERNAL_DESIGN_URL below to a Figma file
//      (or other design tool) URL. When set, it's shown as a prominent link;
//      swap the `<a>` below for an `<iframe src={EXTERNAL_DESIGN_URL} />` if
//      you'd rather embed it directly.
const EXTERNAL_DESIGN_URL = "";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function readScreenshots(): string[] {
  const dir = path.join(process.cwd(), "public", "app-design");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort()
    .map((name) => `/app-design/${name}`);
}

export default function AppDesignPage() {
  const screenshots = readScreenshots();

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-10 sm:px-10 sm:py-16">
      <Link href="/" className="inline-flex min-h-11 items-center text-sm text-stone transition-colors hover:text-ink">
        ← Back
      </Link>

      <h1 className="mt-8 font-display text-3xl text-ink sm:text-4xl">App Design</h1>

      {screenshots.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {screenshots.map((src) => (
            <div key={src} className="overflow-hidden rounded-xl border border-stone/40 bg-butter">
              <Image src={src} alt="" width={800} height={1600} className="h-auto w-full" unoptimized />
            </div>
          ))}
        </div>
      ) : EXTERNAL_DESIGN_URL ? (
        <a
          href={EXTERNAL_DESIGN_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-11 items-center rounded-xl border border-stone/40 bg-butter px-5 py-3 text-ink transition-colors hover:shadow-[0_6px_20px_-8px_rgba(10,10,10,0.25)]"
        >
          Open design file ↗
        </a>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-stone/50 px-6 py-10 text-center">
          <p className="text-ink">No screens yet.</p>
          <p className="mt-2 text-sm text-stone">
            Drop screenshots into <code className="font-mono text-amber">/public/app-design/</code>, or set{" "}
            <code className="font-mono text-amber">EXTERNAL_DESIGN_URL</code> in this page to link out to a design
            file.
          </p>
        </div>
      )}
    </main>
  );
}
