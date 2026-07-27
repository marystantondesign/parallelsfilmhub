"use client";

import { useEffect, useState } from "react";

// ~81% of the iPhone 15/16 Pro logical viewport size (393x853) - two 10%
// shrinks. The embedded page always renders at this size regardless of how
// small the visiting device's screen gets; we only visually shrink it
// further (via CSS transform) to fit narrower/shorter viewports - we never
// resize the iframe itself.
const FRAME_WIDTH = 319;
const FRAME_HEIGHT = 691;

// Scaled against the true viewport (not the surrounding page container) so
// there's always a visible, consistent margin around the frame and it stays
// centered on both axes, regardless of the window's width AND height - a
// short browser window shrinks the frame just as much as a narrow one does,
// so it never needs a scroll to see the whole thing.
const MIN_SIDE_MARGIN = 24;
const MIN_VERTICAL_MARGIN = 40;

// A filled circle stands in for a fingertip, since the content behind it is
// a phone screen meant to be tapped, not clicked with an arrow pointer.
const TOUCH_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><circle cx='14' cy='14' r='11' fill='rgba(10,10,10,0.35)' stroke='white' stroke-width='2'/></svg>",
)}") 14 14, pointer`;

export default function PhoneFrame({ src, title }: { src: string; title: string }) {
  const [scale, setScale] = useState(1);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const widthScale = (window.innerWidth - MIN_SIDE_MARGIN * 2) / FRAME_WIDTH;
      const heightScale = (window.innerHeight - MIN_VERTICAL_MARGIN * 2) / FRAME_HEIGHT;
      setScale(Math.min(1, widthScale, heightScale));
      setViewportHeight(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    // A fixed-size child bigger than its container can't be centered with
    // margin:auto (the overflow makes "auto" resolve to 0, so it just
    // sticks to one edge) - flex centering is what actually keeps it
    // centered on both axes, with the CSS scale() transform (anchored at
    // its default center origin, matching flex's own centering point) then
    // shrinking it around that same centered point.
    //
    // The outer div's height is pinned to the real viewport height (not
    // min-h-screen) deliberately: scale() only changes how the frame is
    // painted, not its layout size, so an auto-sizing/min-height container
    // would still grow to fit the frame's full unscaled height and force a
    // scrollbar even though the frame visually fits. A fixed height keeps
    // the container from growing past the viewport, so the shrunk frame's
    // leftover space above and below splits evenly - exactly
    // MIN_VERTICAL_MARGIN each side whenever height is the binding
    // constraint.
    <div className="flex w-full items-center justify-center" style={{ height: viewportHeight ?? "100vh" }}>
      <div
        className="shrink-0 overflow-hidden rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-[0_20px_50px_-20px_rgba(10,10,10,0.5)]"
        style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT, transform: `scale(${scale})`, cursor: TOUCH_CURSOR }}
      >
        <iframe src={src} title={title} width={FRAME_WIDTH} height={FRAME_HEIGHT} className="block h-full w-full border-0" />
      </div>
    </div>
  );
}
