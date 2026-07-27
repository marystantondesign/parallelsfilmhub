import Image from "next/image";
import Link from "next/link";
import StoryTabs from "@/components/hub/StoryTabs";

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-14 sm:px-10 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center text-sm font-bold text-[#3d4a33] transition-colors hover:opacity-80 sm:justify-self-start"
        >
          ← Go Back
        </Link>
        <Image
          src="/storytitle.png"
          alt="Story Development"
          width={508}
          height={76}
          priority
          className="mx-auto h-auto w-64 sm:w-80"
        />
        <div aria-hidden className="hidden sm:block" />
      </div>

      <StoryTabs />

      <div className="mt-10 sm:mt-12">{children}</div>
    </main>
  );
}
