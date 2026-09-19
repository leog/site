import type { MetadataRoute } from "next";
import { getAllPosts, getWorkPage } from "@/lib/keystatic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const workPage = await getWorkPage();
  const now = new Date().toISOString();

  return [
    { url: "https://leog.me", lastModified: now },
    { url: "https://leog.me/work", lastModified: workPage?.updatedAt ?? now },
    ...posts.map((post) => ({
      url: `https://leog.me${post.alternates.canonical}`,
      lastModified: post.updatedAt ?? post.date ?? now,
    })),
  ];
}
