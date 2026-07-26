"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type Breakpoint = { query: string; columns: number; width: number };

// Pinterest's embedBoard widget lays pins out to fill the pixel width given
// via data-pin-board-width - there's no official "columns" attribute, so we
// approximate column counts by picking a width per breakpoint (~230px per
// pin column at the default thumbnail scale). Tune these if your board's
// pins render narrower/wider than expected once the real board is live.
const BREAKPOINTS: Breakpoint[] = [
  { query: "(min-width: 1024px)", columns: 5, width: 1160 },
  { query: "(min-width: 640px)", columns: 3, width: 700 },
  { query: "(min-width: 0px)", columns: 2, width: 470 },
];

function currentBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return BREAKPOINTS[0];
  return BREAKPOINTS.find((b) => window.matchMedia(b.query).matches) ?? BREAKPOINTS[BREAKPOINTS.length - 1];
}

declare global {
  interface Window {
    PinUtils?: { build: () => void };
  }
}

export default function PinterestBoardEmbed({ boardUrl }: { boardUrl: string }) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(BREAKPOINTS[0]);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const update = () => setBreakpoint(currentBreakpoint());
    update();
    const mqls = BREAKPOINTS.map((b) => window.matchMedia(b.query));
    mqls.forEach((mql) => mql.addEventListener("change", update));
    return () => mqls.forEach((mql) => mql.removeEventListener("change", update));
  }, []);

  useEffect(() => {
    // Re-run Pinterest's widget script against the (re-mounted) anchor below
    // whenever the target column count changes - the widget only lays out
    // an anchor once, on the width it had at build time.
    if (scriptReady) window.PinUtils?.build();
  }, [breakpoint.columns, scriptReady]);

  return (
    <>
      <Script src="https://assets.pinterest.com/js/pinit.js" strategy="afterInteractive" onLoad={() => setScriptReady(true)} />
      <div className="flex justify-center">
        <a
          key={breakpoint.columns}
          data-pin-do="embedBoard"
          data-pin-board-width={breakpoint.width}
          data-pin-scale-height="240"
          href={boardUrl}
        >
          {boardUrl}
        </a>
      </div>
    </>
  );
}
