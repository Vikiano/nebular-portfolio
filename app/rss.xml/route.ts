import { galleries, photos } from "@/lib/photos";

export const runtime = "nodejs";
export const dynamic = "force-static";

function escapeXml(input: string): string {
  return input.replace(/[<>&'"]/g, (ch) => {
    switch (ch) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return ch;
    }
  });
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.nebular.art";
  const items: string[] = [];

  galleries.forEach((g) => {
    items.push(`<item>
      <title>${escapeXml(g.title)}</title>
      <link>${base}/galleries/${g.slug}</link>
      <guid isPermaLink="true">${base}/galleries/${g.slug}</guid>
      <pubDate>${new Date(g.published_at).toUTCString()}</pubDate>
      <description>${escapeXml(g.description)}</description>
    </item>`);
  });

  photos.forEach((p) => {
    if (!p.captured_at) return;
    items.push(`<item>
      <title>${escapeXml(p.title)}</title>
      <link>${base}/galleries/${p.gallery_slug}</link>
      <guid isPermaLink="false">nebular-photo-${p.id}</guid>
      <pubDate>${new Date(p.captured_at).toUTCString()}</pubDate>
      <description>${escapeXml(p.caption)}</description>
    </item>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nebular Labs Portfolio</title>
    <link>${base}</link>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Craft photography from Nebular Labs. New galleries and series published on a slow cadence.</description>
    <language>en-CA</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items.join("\n    ")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
