import path from "path";
import { promises as fs } from "fs";
import {
  getPostMeta,
  type PostMeta,
} from "./post-meta";

export async function getPostSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name === "page.mdx"
    )
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name)
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, "/"));
}

export async function getAllPosts(): Promise<
  PostMeta[]
> {
  const slugs = await getPostSlugs(
    path.join(process.cwd(), "app", "post")
  );
  const posts: PostMeta[] = [];

  for (const slug of slugs) {
    const post = await getPostMeta(slug);
    if (post) {
      posts.push(post);
    }
  }

  return posts;
}
