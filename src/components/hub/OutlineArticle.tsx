import type { OutlineBlock } from "@/lib/outline";
import { renderInline } from "@/components/hub/inline";

// Shared renderer for the "## heading / - list / plain paragraph" outline
// convention used by the beat sheet, storyboard frame list, and shot list.
export function OutlineArticle({ blocks, className }: { blocks: OutlineBlock[]; className?: string }) {
  return (
    <article className={className}>
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2 key={i} className="mt-8 font-display text-xl text-ink first:mt-0">
              {renderInline(block.text, `h${i}`)}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="mt-3 list-disc space-y-2 pl-5">
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item, `l${i}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mt-3 first:mt-0">
            {renderInline(block.text, `p${i}`)}
          </p>
        );
      })}
    </article>
  );
}
