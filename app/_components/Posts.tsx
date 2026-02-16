import { getAllPosts } from "@/lib/posts";
import { mdxComponents } from "@/mdx-components";

export async function Posts({
  exclude,
  include,
}: Readonly<{
  exclude?: string | string[];
  include?: string | string[];
}>) {
  const posts = await getAllPosts();
  const normalize = (keywords?: string | string[]) =>
    Array.isArray(keywords)
      ? keywords.map((keyword) => keyword.trim().toLowerCase()).filter(Boolean)
      : keywords
        ? [keywords.trim().toLowerCase()]
        : [];

  const excludes = normalize(exclude);
  const includes = normalize(include);

  const postsExcluded = excludes.length
    ? posts.filter(
        (post) =>
          !post.keywords.some((keyword) =>
            excludes.includes(keyword.toLowerCase()),
          ),
      )
    : posts;

  const postsIncluded = includes.length
    ? postsExcluded.filter((post) =>
        post.keywords.some((keyword) =>
          includes.includes(keyword.toLowerCase()),
        ),
      )
    : postsExcluded;
  return (
    <mdxComponents.ul>
      {postsIncluded.map((post) => {
        return (
          <mdxComponents.li key={post.alternates.canonical}>
            <mdxComponents.a href={post.alternates.canonical}>
              {post.title}
            </mdxComponents.a>
            {post.description ? `: ${post.description}` : ""}
          </mdxComponents.li>
        );
      })}
    </mdxComponents.ul>
  );
}
