/**
 * Turns a YouTube / Vimeo / Loom share link into an embeddable player URL
 * (plus a thumbnail when the provider exposes one without an API call).
 */
export type VideoEmbed = {
  provider: "youtube" | "vimeo" | "loom";
  /** Player URL. Autoplay is appended by the caller when the facade is clicked. */
  src: string;
  /** Thumbnail URL when available without an API call (YouTube only). */
  thumbnail?: string;
};

export function parseVideoUrl(input?: string): VideoEmbed | null {
  if (!input) return null;
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");

  // YouTube: watch?v=ID, youtu.be/ID, /shorts/ID, /embed/ID, /live/ID
  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be") {
    const id =
      host === "youtu.be"
        ? url.pathname.slice(1).split("/")[0]
        : url.searchParams.get("v") ??
          url.pathname.match(/\/(?:shorts|embed|live)\/([^/?]+)/)?.[1];
    if (!id) return null;
    const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
    const start = url.searchParams.get("t") ?? url.searchParams.get("start");
    if (start) params.set("start", String(parseInt(start, 10) || 0));
    return {
      provider: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${id}?${params}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }

  // Vimeo: vimeo.com/ID, vimeo.com/ID/HASH (unlisted), player.vimeo.com/video/ID
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const match = url.pathname.match(/\/(?:video\/)?(\d+)(?:\/([a-z0-9]+))?/i);
    if (!match) return null;
    const [, id, hash] = match;
    const params = new URLSearchParams({ dnt: "1" });
    if (hash) params.set("h", hash);
    return {
      provider: "vimeo",
      src: `https://player.vimeo.com/video/${id}?${params}`,
    };
  }

  // Loom: loom.com/share/ID, loom.com/embed/ID
  if (host === "loom.com") {
    const id = url.pathname.match(/\/(?:share|embed)\/([a-z0-9]+)/i)?.[1];
    if (!id) return null;
    return { provider: "loom", src: `https://www.loom.com/embed/${id}` };
  }

  return null;
}
