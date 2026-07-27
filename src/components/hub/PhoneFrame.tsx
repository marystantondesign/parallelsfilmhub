"use client";

import { useEffect, useState } from "react";

// ~81% of the iPhone 15/16 Pro logical viewport size (393x853) - two 10%
// shrinks - so the whole frame fits on screen without scrolling, on both
// desktop and real mobile browsers (whose collapsing address/toolbar chrome
// eats more effective height than a plain viewport number suggests). The
// embedded page always renders at this size regardless of how small the
// visiting device's screen gets; we only visually shrink it further (via CSS
// transform) to fit narrower viewports - we never resize the iframe itself.
const FRAME_WIDTH = 319;
const FRAME_HEIGHT = 691;

// Scaled against the true device viewport (not the surrounding page
// container) so there's always a visible margin around the frame and it
// stays centered, regardless of what width phone it's opened on.
const MIN_SIDE_MARGIN = 24;

// A filled circle stands in for a fingertip, since the content behind it is
// a phone screen meant to be tapped, not clicked with an arrow pointer.
const TOUCH_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><circle cx='14' cy='14' r='11' fill='rgba(10,10,10,0.35)' stroke='white' stroke-width='2'/></svg>",
)}") 14 14, pointer`;

export default function PhoneFrame({ src, title }: { src: string; title: string }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => setScale(Math.min(1, (window.innerWidth - MIN_SIDE_MARGIN * 2) / FRAME_WIDTH));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    // A fixed-width child wider than its container can't be centered with
    // margin:auto (the overflow makes "auto" resolve to 0, so it just
    // left-aligns) - flex justify-center is what actually keeps it centered,
    // with the CSS scale() transform then shrinking it around that same
    // centered anchor.
    <div className="flex w-full justify-center" style={{ height: FRAME_HEIGHT * scale }}>
      <div
        className="origin-top shrink-0 overflow-hidden rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-[0_20px_50px_-20px_rgba(10,10,10,0.5)]"
        style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT, transform: `scale(${scale})`, cursor: TOUCH_CURSOR }}
      >
        <iframe src={src} title={title} width={FRAME_WIDTH} height={FRAME_HEIGHT} className="block h-full w-full border-0" />
      </div>
    </div>
  );
}
