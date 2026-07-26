import Link from "next/link";
import { DocumentIcon, ExternalLinkIcon, GlobeIcon, PhoneIcon } from "@/components/hub/icons";
import PinterestBoardEmbed from "@/components/hub/PinterestBoardEmbed";
import { PINTEREST_BOARD_URL } from "@/lib/pinterest";

// TODO(marketing): swap to the real marketing site URL once it's live (or
// keep this pointing at the in-repo placeholder /marketing page). Either
// way, this card always opens in a new tab.
const MARKETING_URL = "/marketing";

// TODO(app-design): swap to the real design file URL (e.g. a Figma link)
// once it's live (or keep this pointing at the in-repo placeholder
// /app-design page). Either way, this card always opens in a new tab.
const APP_DESIGN_URL = "/app-design";

const DESTINATIONS = [
  {
    href: "/story",
    label: "Story Development",
    description: "Synopsis, script, beat sheet, storyboard, and shot list.",
    badgeClass: "bg-ink",
    Icon: DocumentIcon,
    external: false,
  },
  {
    href: MARKETING_URL,
    label: "Marketing Site",
    description: "The product's positioning, features, and story as its own site.",
    badgeClass: "bg-blue",
    Icon: GlobeIcon,
    external: true,
  },
  {
    href: APP_DESIGN_URL,
    label: "App Design",
    description: "The app's screens, flows, and visual design system.",
    badgeClass: "bg-amber",
    Icon: PhoneIcon,
    external: true,
  },
] as const;

const CARD_CLASS =
  "group relative flex min-h-[6rem] flex-row items-center gap-4 rounded-xl border border-stone/40 bg-butter p-5 text-left transition-shadow hover:shadow-[0_6px_20px_-8px_rgba(10,10,10,0.25)] sm:min-h-[15rem] sm:flex-col sm:items-center sm:gap-3 sm:p-8 sm:text-center";

export default function HubHome() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-14 sm:px-10 sm:py-20">
      <h1 className="text-center font-display text-5xl text-ink sm:text-6xl">Parallel</h1>

      <nav aria-label="Destinations" className="mt-10 flex flex-col gap-4 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-6">
        {DESTINATIONS.map((d) => {
          const isAppDesign = d.href === APP_DESIGN_URL;

          const content = (
            <>
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
                  {d.external && <ExternalLinkIcon className="h-3 w-3" aria-hidden="true" />}
                </span>
              </span>
            </>
          );

          if (d.external) {
            return (
              <a key={d.href} href={d.href} target="_blank" rel="noopener noreferrer" className={CARD_CLASS}>
                {content}
              </a>
            );
          }

          return (
            <Link key={d.href} href={d.href} className={CARD_CLASS}>
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 sm:mt-12">
        <PinterestBoardEmbed boardUrl={PINTEREST_BOARD_URL} previewRows={5} />
      </div>
    </main>
  );
}
