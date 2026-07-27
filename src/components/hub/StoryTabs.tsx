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
      className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`flex h-14 w-full items-center justify-center rounded-xl border border-parchment px-4 py-4 text-center font-display text-lg transition-colors sm:h-20 sm:w-[183px] sm:shrink-0 sm:px-6 sm:py-8 sm:text-2xl ${
              active ? "bg-forest" : "bg-gold"
            }`}
          >
            {/* .hub-scope a sets color: inherit at higher specificity than a
                Tailwind text-* class placed directly on the <a>, so the color
                has to live on a child span instead. */}
            <span className={active ? "text-paper" : "text-ink"}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
