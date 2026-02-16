import { getAllPosts } from "@/lib/posts";
import { getKeystaticWorkPage } from "@/lib/keystatic";

export default async function sitemap() {
  const postsMeta = await getAllPosts();
  const workPage = await getKeystaticWorkPage();

  const posts = postsMeta.map((post) => ({
    url: `https://leog.me${post.alternates.canonical}`,
    lastModified:
      post.updatedAt ??
      post.date ??
      post.fileLastModified ??
      new Date().toISOString(),
  }));

  const now = new Date().toISOString();
  const routes = [
    { route: "", lastModified: now },
    {
      route: "/work",
      lastModified: workPage?.updatedAt ?? now,
    },
  ].map(({ route, lastModified }) => ({
    url: `https://leog.me${route}`,
    lastModified,
  }));

  return [...routes, ...posts];
}
