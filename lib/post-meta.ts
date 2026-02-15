export interface PostMeta {
  title: string;
  description?: string;
  keywords: string[];
  alternates: {
    canonical: string;
  };
}

export async function getPostMeta(
  slug: string
): Promise<PostMeta | null> {
  const post = await import(
    `../app/post/${slug}/page.mdx`
  );
  try {
    return post.metadata as PostMeta;
  } catch (error) {
    console.error(
      `Error reading post meta for slug: ${slug}`,
      error
    );
    return null;
  }
}

export async function getPostBySlug(
  slug: string
): Promise<PostMeta | null> {
  return getPostMeta(slug);
}
