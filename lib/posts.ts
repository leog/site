import path from "path";
import { promises as fs } from "fs";
import { getPostMeta, type PostMeta } from "./post-meta";

export interface Post extends PostMeta {
  slug: string;
  filePath: string;
  fileLastModified: string;
}

export async function getPostSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === "page.mdx")
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name),
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, "/"));
}

const toTimestamp = (value?: string) => {
  if (!value) {
    return 0;
  }
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs(path.join(process.cwd(), "app", "post"));
  const posts: Post[] = [];

  for (const slug of slugs) {
    const post = await getPostMeta(slug);
    if (post) {
      if (post.draft) {
        continue;
      }
      const filePath = path.join(
        process.cwd(),
        "app",
        "post",
        slug,
        "page.mdx",
      );
      const fileStats = await fs.stat(filePath);
      posts.push({
        ...post,
        slug,
        filePath,
        fileLastModified: fileStats.mtime.toISOString(),
      });
    }
  }

  posts.sort((a, b) => {
    const aDate = Math.max(
      toTimestamp(a.updatedAt),
      toTimestamp(a.date),
      toTimestamp(a.fileLastModified),
    );
    const bDate = Math.max(
      toTimestamp(b.updatedAt),
      toTimestamp(b.date),
      toTimestamp(b.fileLastModified),
    );
    return bDate - aDate;
  });

  return posts;
}
