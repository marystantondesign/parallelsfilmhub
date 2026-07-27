import { getBoardPins } from "@/lib/pinterest";

export default async function PinterestPinGrid({ boardUrl }: { boardUrl: string }) {
  const pins = await getBoardPins(boardUrl);

  if (pins.length === 0) {
    return (
      <a
        href={boardUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full items-center justify-center p-4 text-center text-sm text-stone underline"
      >
        View the board on Pinterest
      </a>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-5">
      {pins.map((pin) => (
        <a
          key={pin.id}
          href={pin.link}
          target="_blank"
          rel="noopener noreferrer"
          className="aspect-[3/4] overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- external, board-controlled images; not worth wiring through next/image's remote-pattern config */}
          <img src={pin.imageUrl} alt={pin.title} loading="lazy" className="h-full w-full object-cover" />
        </a>
      ))}
    </div>
  );
}
