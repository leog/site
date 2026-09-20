import { getAllPosts } from "@/lib/keystatic";

export const dynamic = "force-static";

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>https://leog.me${post.alternates.canonical}</link>
      <guid>https://leog.me${post.alternates.canonical}</guid>
      ${post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ""}
      ${post.description ? `<description>${xmlEscape(post.description)}</description>` : ""}
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Leo Giovanetti</title>
    <link>https://leog.me</link>
    <description>Writing by Leo Giovanetti on engineering, leadership and side projects.</description>
    <language>en</language>
    <atom:link href="https://leog.me/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
