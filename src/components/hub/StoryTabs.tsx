"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/story/script", label: "Script" },
  { href: "/story/synopsis", label: "Synopsis" },
  { href: "/story/beat-sheet", label: "Beat Sheet" },
  { href: "/story/storyboard", label: "Storyboard" },
  { href: "/story/shot-list", label: "Shot List" },
];

export default function StoryTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Story development sections"
      className="mt-10 flex gap-3 overflow-x-auto pb-2 sm:mt-12 sm:justify-center sm:gap-6 sm:overflow-visible sm:pb-0"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`flex h-16 w-32 shrink-0 items-center justify-center rounded-xl border border-parchment px-4 py-6 text-center font-display text-lg text-paper transition-colors sm:h-20 sm:w-[183px] sm:px-6 sm:py-8 sm:text-2xl ${
              active ? "bg-forest" : "bg-gold"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
