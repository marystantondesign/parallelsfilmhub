import Link from "next/link";
import { DocumentIcon, GlobeIcon, PhoneIcon } from "@/components/hub/icons";

const DESTINATIONS = [
  {
    href: "/screenplay",
    label: "Screenplay",
    description: "Read the script.",
    badgeClass: "bg-ink",
    Icon: DocumentIcon,
  },
  {
    href: "/marketing",
    label: "Marketing Site",
    description: "The Parallel product site.",
    badgeClass: "bg-blue",
    Icon: GlobeIcon,
  },
  {
    href: "/app-design",
    label: "App Design",
    description: "Screens and visual design.",
    badgeClass: "bg-amber",
    Icon: PhoneIcon,
  },
];

export default function HubHome() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-14 sm:px-10 sm:py-20">
      <h1 className="text-center font-display text-5xl text-ink sm:text-6xl">Parallel</h1>

      <nav aria-label="Destinations" className="mt-10 flex flex-col gap-4 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-6">
        {DESTINATIONS.map((d) => {
          const isAppDesign = d.href === "/app-design";
          return (
            <Link
              key={d.href}
              href={d.href}
              className="group relative flex min-h-[6rem] flex-row items-center gap-4 rounded-xl border border-stone/40 bg-butter p-5 text-left transition-shadow hover:shadow-[0_6px_20px_-8px_rgba(10,10,10,0.25)] sm:min-h-[15rem] sm:flex-col sm:items-center sm:gap-3 sm:p-8 sm:text-center"
            >
              {isAppDesign && (
                <span className="group/tooltip absolute right-3 top-3 hidden sm:inline-flex">
                  <PhoneIcon className="h-4 w-4 text-stone" />
                  <span className="pointer-events-none absolute right-0 top-6 z-10 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-sans text-[11px] text-paper opacity-0 transition-opacity group-hover/tooltip:opacity-100">
                    Best viewed on mobile
                  </span>
                </span>
              )}

              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-16 sm:w-16 ${d.badgeClass}`}>
                <d.Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              </span>

              <span className="flex flex-1 flex-col sm:items-center">
                <span className="font-display text-xl text-ink sm:text-2xl">{d.label}</span>
                <span className="mt-0.5 font-serif-body text-sm italic text-stone sm:mt-2">{d.description}</span>
                <span className="mt-3 hidden items-center gap-1 font-sans text-xs uppercase tracking-[0.15em] text-ink sm:inline-flex">
                  Enter <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          );
        })}
      </nav>
    </main>
  );
}
