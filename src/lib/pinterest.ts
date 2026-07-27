// TODO(pinterest): swap this if the board ever moves, or override per
// environment via NEXT_PUBLIC_PINTEREST_BOARD_URL.
export const PINTEREST_BOARD_URL =
  process.env.NEXT_PUBLIC_PINTEREST_BOARD_URL || "https://www.pinterest.com/marustabtob/parallel-film/";

export type Pin = {
  id: string;
  title: string;
  link: string;
  imageUrl: string;
};

function boardRssUrl(boardUrl: string): string {
  return `${boardUrl.replace(/\/+$/, "")}.rss`;
}

function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function stripCdata(text: string): string {
  const match = text.match(/^\s*<!\[CDATA\[([\s\S]*)\]\]>\s*$/);
  return match ? match[1] : text;
}

// Upgrade Pinterest's default thumbnail resolution (e.g. "/236x/") to a
// larger one so tiles in a real grid layout don't look blurry when scaled up.
function upscaleImageUrl(url: string): string {
  return url.replace(/\/\d+x(?:\d+)?\//, "/736x/");
}

// Pinterest boards expose a public, unauthenticated RSS feed (no API key or
// OAuth needed) that lists every pin with its title, permalink, and a
// thumbnail image embedded in the item's description. This lets us render
// the actual pins ourselves - no Pinterest widget chrome (avatar, board
// name, follow button) - just the images.
export async function getBoardPins(boardUrl: string): Promise<Pin[]> {
  try {
    const res = await fetch(boardRssUrl(boardUrl), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ParallelFilmSite/1.0; +https://github.com/marystantondesign/parallelsfilmhub)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const pins: Pin[] = [];
    const itemPattern = /<item>([\s\S]*?)<\/item>/g;

    for (const itemMatch of xml.matchAll(itemPattern)) {
      const item = itemMatch[1];

      const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/);
      const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/);
      const descriptionMatch = item.match(/<description>([\s\S]*?)<\/description>/);
      if (!linkMatch || !descriptionMatch) continue;

      const link = decodeHtmlEntities(stripCdata(linkMatch[1])).trim();
      const description = decodeHtmlEntities(stripCdata(descriptionMatch[1]));
      const imgMatch = description.match(/<img[^>]*\ssrc="([^"]+)"/);
      if (!imgMatch) continue;

      const idMatch = link.match(/\/pin\/(\d+)/);
      pins.push({
        id: idMatch ? idMatch[1] : link,
        title: titleMatch ? decodeHtmlEntities(stripCdata(titleMatch[1])).trim() : "",
        link,
        imageUrl: upscaleImageUrl(imgMatch[1]),
      });
    }

    return pins;
  } catch {
    return [];
  }
}
