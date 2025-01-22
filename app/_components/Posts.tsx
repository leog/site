import { getAllPosts } from "@/lib/posts";
import { mdxComponents } from "@/mdx-components";

export async function Posts({
  exclude,
  include,
}: Readonly<{
  exclude?: string;
  include?: string;
}>) {
  const posts = await getAllPosts();
  const postsExcluded = exclude
    ? posts.filter(
        (post) => !post.keywords.includes(exclude)
      )
    : posts;
  const postsIncluded = include
    ? postsExcluded.filter(
        (post) => !post.keywords.includes(include)
      )
    : postsExcluded;
  return (
    <mdxComponents.ul>
      {postsIncluded.map((post) => {
        return (
          <mdxComponents.li
            key={post.alternates.canonical}
          >
            <mdxComponents.a
              href={post.alternates.canonical}
            >
              {post.title}
            </mdxComponents.a>
            {post.description
              ? `: ${post.description}`
              : ""}
          </mdxComponents.li>
        );
      })}
    </mdxComponents.ul>
  );
}
