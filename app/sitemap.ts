import { getPostSlugs } from "@/lib/posts";
import path from "path";

export default async function sitemap() {
  const postsDirectory = path.join(
    process.cwd(),
    "app",
    "post"
  );
  const slugs = await getPostSlugs(
    postsDirectory
  );

  const posts = slugs.map((slug) => ({
    url: `https://leog.me/post/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["", "/work"].map((route) => ({
    url: `https://leog.me${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
