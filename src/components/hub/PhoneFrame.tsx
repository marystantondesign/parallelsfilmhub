"use client";

import { useEffect, useRef, useState } from "react";

// iPhone 15/16 Pro logical viewport size - the embedded page renders at this
// size regardless of how small the surrounding container gets; we only
// visually shrink it (via CSS transform) to fit narrow viewports, we never
// resize the iframe itself, so the embedded design always sees a true phone
// viewport.
const FRAME_WIDTH = 393;
const FRAME_HEIGHT = 853;

// A filled circle stands in for a fingertip, since the content behind it is
// a phone screen meant to be tapped, not clicked with an arrow pointer.
const TOUCH_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><circle cx='14' cy='14' r='11' fill='rgba(10,10,10,0.35)' stroke='white' stroke-width='2'/></svg>",
)}") 14 14, pointer`;

export default function PhoneFrame({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / FRAME_WIDTH));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[393px]" style={{ height: FRAME_HEIGHT * scale }}>
      <div
        className="relative origin-top overflow-hidden rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-[0_20px_50px_-20px_rgba(10,10,10,0.5)]"
        style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT, transform: `scale(${scale})`, cursor: TOUCH_CURSOR }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink"
        />
        <iframe src={src} title={title} width={FRAME_WIDTH} height={FRAME_HEIGHT} className="block h-full w-full border-0" />
      </div>
    </div>
  );
}
