"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export type Breakpoint = { query: string; columns: number; width: number };

// Pinterest's embedBoard widget lays pins out to fill the pixel width given
// via data-pin-board-width - there's no official "columns" attribute, so we
// approximate column counts by picking a width per breakpoint (~230px per
// pin column at the default thumbnail scale). Tune these if your board's
// pins render narrower/wider than expected once the real board is live.
export const DEFAULT_BREAKPOINTS: Breakpoint[] = [
  { query: "(min-width: 1024px)", columns: 5, width: 1160 },
  { query: "(min-width: 640px)", columns: 3, width: 700 },
  { query: "(min-width: 0px)", columns: 2, width: 470 },
];

function currentBreakpoint(breakpoints: Breakpoint[]): Breakpoint {
  if (typeof window === "undefined") return breakpoints[0];
  return breakpoints.find((b) => window.matchMedia(b.query).matches) ?? breakpoints[breakpoints.length - 1];
}

declare global {
  interface Window {
    PinUtils?: { build: () => void };
  }
}

// Pinterest's board widget has no "max rows" option - it lays out every
// pin in one tall grid. To show only a handful of rows as a teaser, we clip
// the rendered height with an estimated pixel value and fade the cut edge
// so it reads as an intentional preview rather than a broken cutoff. The
// estimate assumes a roughly 1.4 average pin aspect ratio at this widget's
// column width (~230px across every breakpoint here); real boards vary, so
// treat `previewRows` as approximate and adjust visually if needed.
const ROW_HEIGHT_ESTIMATE = 320;
const ROW_GAP_ESTIMATE = 14;

function estimateMaxHeight(rows: number): number {
  return rows * ROW_HEIGHT_ESTIMATE + (rows - 1) * ROW_GAP_ESTIMATE;
}

export default function PinterestBoardEmbed({
  boardUrl,
  previewRows,
  breakpoints = DEFAULT_BREAKPOINTS,
}: {
  boardUrl: string;
  previewRows?: number;
  breakpoints?: Breakpoint[];
}) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(breakpoints[0]);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const update = () => setBreakpoint(currentBreakpoint(breakpoints));
    update();
    const mqls = breakpoints.map((b) => window.matchMedia(b.query));
    mqls.forEach((mql) => mql.addEventListener("change", update));
    return () => mqls.forEach((mql) => mql.removeEventListener("change", update));
  }, [breakpoints]);

  useEffect(() => {
    // Re-run Pinterest's widget script against the (re-mounted) anchor below
    // whenever the target column count changes - the widget only lays out
    // an anchor once, on the width it had at build time.
    if (scriptReady) window.PinUtils?.build();
  }, [breakpoint.columns, scriptReady]);

  const grid = (
    <div className="flex justify-center overflow-x-auto">
      <a
        key={breakpoint.columns}
        data-pin-do="embedBoard"
        data-pin-board-width={breakpoint.width}
        data-pin-scale-height="240"
        className="max-w-full break-all"
        href={boardUrl}
      >
        {boardUrl}
      </a>
    </div>
  );

  return (
    <>
      <Script src="https://assets.pinterest.com/js/pinit.js" strategy="afterInteractive" onLoad={() => setScriptReady(true)} />
      {previewRows ? (
        <div className="relative overflow-hidden" style={{ maxHeight: estimateMaxHeight(previewRows) }}>
          {grid}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent" />
        </div>
      ) : (
        grid
      )}
    </>
  );
}
