import { getAllPosts } from "@/lib/posts";

export default async function sitemap() {
  const postsMeta = await getAllPosts();

  const posts = postsMeta.map((post) => ({
    url: `https://leog.me${post.alternates.canonical}`,
    lastModified: post.updatedAt ?? post.date ?? post.fileLastModified,
  }));

  const now = new Date().toISOString();
  const routes = ["", "/work"].map((route) => ({
    url: `https://leog.me${route}`,
    lastModified: now,
  }));

  return [...routes, ...posts];
}
