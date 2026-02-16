import { getKeystaticPostsMeta } from "./keystatic";

export interface PostMeta {
  title: string;
  description?: string;
  keywords: string[];
  date?: string;
  updatedAt?: string;
  draft?: boolean;
  alternates: {
    canonical: string;
  };
}

export async function getPostMeta(slug: string): Promise<PostMeta | null> {
  try {
    const post = await import(`../app/post/${slug}/page.mdx`);
    return post.metadata as PostMeta;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "MODULE_NOT_FOUND"
    ) {
      return null;
    }
    return null;
  }
}

export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
  const staticPost = await getPostMeta(slug);
  if (staticPost) {
    return staticPost;
  }

  const posts = await getKeystaticPostsMeta();
  return posts.find((post) => post.slug === slug) ?? null;
}
