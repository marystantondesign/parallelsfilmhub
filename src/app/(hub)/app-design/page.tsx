import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { Metadata } from "next";
import PhoneFrame from "@/components/hub/PhoneFrame";

export const metadata: Metadata = {
  title: "App Design — Parallel",
  description: "Screens and visual design for the Parallel app.",
};

// The live app design prototype - embedded below in a phone-sized frame
// rather than linked out to, so it reads as a phone screen instead of a
// browser tab. Drop screenshots into /public/app-design/ instead if you'd
// rather show a static gallery (auto-discovered, takes priority over this).
const EXTERNAL_DESIGN_URL = "https://pull-cute-64529839.figma.site";

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
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 pt-6 sm:px-10">
      {screenshots.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {screenshots.map((src) => (
            <div key={src} className="overflow-hidden rounded-xl border border-stone/40 bg-butter">
              <Image src={src} alt="" width={800} height={1600} className="h-auto w-full" unoptimized />
            </div>
          ))}
        </div>
      ) : EXTERNAL_DESIGN_URL ? (
        <PhoneFrame src={EXTERNAL_DESIGN_URL} title="Parallel app design" />
      ) : (
        <div className="rounded-2xl border border-dashed border-stone/50 px-6 py-10 text-center">
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
