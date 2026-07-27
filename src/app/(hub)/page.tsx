import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "@/components/hub/icons";
import PinterestPinGrid from "@/components/hub/PinterestPinGrid";
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
    description: "Documentation for the film: Script, synopsis, beat sheet, storyboard, and shot list.",
    external: false,
  },
  {
    href: APP_DESIGN_URL,
    label: "App Design",
    description: "Functional app used in the film. Best viewed on your phone.",
    external: true,
    showPhoneIcon: true,
  },
  {
    href: MARKETING_URL,
    label: "Marketing Site",
    description: "Landing page for the app: how the technology works, the founder's story, etc.",
    external: true,
  },
] as const;

const CARD_CLASS =
  "flex flex-col items-center gap-1.5 rounded-xl bg-gold p-5 text-center transition-shadow hover:shadow-[0_6px_20px_-8px_rgba(10,10,10,0.35)] sm:p-6";

export default function HubHome() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-14 sm:px-10 sm:py-20">
      <Image
        src="/parallellogo.png"
        alt="Parallel"
        width={480}
        height={181}
        priority
        className="mx-auto h-auto w-64 sm:w-80"
      />

      <nav aria-label="Destinations" className="mt-10 flex flex-col gap-4 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-6">
        {DESTINATIONS.map((d) => {
          const content = (
            <>
              <span className="inline-flex items-center gap-1.5 font-display text-xl text-ink sm:text-2xl">
                {d.label}
                {"showPhoneIcon" in d && d.showPhoneIcon && <PhoneIcon className="h-4 w-4" aria-hidden="true" />}
              </span>
              <span className="font-serif-body text-sm italic text-paper">{d.description}</span>
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

      <div className="mt-6 flex flex-col gap-2 rounded-xl bg-gold p-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <span className="font-display text-xl text-ink sm:text-2xl">Visual Development Board</span>
        <span className="font-serif-body text-sm italic text-paper sm:text-right">
          A visual development board exploring the tone, atmosphere, and cinematic language of the film.
        </span>
      </div>

      <div className="mt-2 h-[520px] overflow-y-auto overflow-x-hidden rounded-xl border border-stone/40 sm:h-[720px]">
        <PinterestPinGrid boardUrl={PINTEREST_BOARD_URL} />
      </div>
    </main>
  );
}
