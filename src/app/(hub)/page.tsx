import Link from "next/link";

const DESTINATIONS = [
  {
    href: "/screenplay",
    label: "Screenplay",
    description: "Read the script.",
  },
  {
    href: "/marketing",
    label: "Marketing Site",
    description: "The Parallel product site.",
  },
  {
    href: "/app-design",
    label: "App Design",
    description: "Screens and visual design.",
  },
];

export default function HubHome() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16 sm:max-w-2xl sm:px-10">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-display text-5xl tracking-tight text-hub-ink sm:text-6xl">Parallel</h1>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-hub-muted">Best viewed on mobile</p>
      </div>

      <nav aria-label="Destinations" className="mt-12 flex flex-col gap-4 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-5">
        {DESTINATIONS.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="group flex min-h-[6.5rem] flex-col justify-center gap-1 rounded-2xl border border-hub-border bg-hub-surface px-6 py-5 transition-colors hover:bg-hub-surface-hover hover:border-hub-accent/60 active:bg-hub-surface-hover sm:min-h-[10rem] sm:text-center"
          >
            <span className="font-display text-2xl text-hub-ink sm:text-xl">{d.label}</span>
            <span className="text-sm text-hub-muted transition-colors group-hover:text-hub-ink/80">
              {d.description}
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
