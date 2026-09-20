import { formatDate, getAllPosts, type PostMeta } from "@/lib/keystatic";
import { mdxComponents } from "@/mdx-components";
import { Keywords } from "./keywords";

export function PostList({
  posts,
  showKeywords,
}: Readonly<{ posts: PostMeta[]; showKeywords?: boolean }>) {
  return (
    <mdxComponents.ul>
      {posts.map((post) => (
        <mdxComponents.li key={post.slug}>
          <mdxComponents.a href={post.alternates.canonical}>
            {post.title}
          </mdxComponents.a>
          {post.description ? `: ${post.description}` : ""}
          {post.date && (
            <time dateTime={post.date} className="block text-sm text-gray-500">
              {formatDate(post.date)}
            </time>
          )}
          {showKeywords && <Keywords keywords={post.keywords} />}
        </mdxComponents.li>
      ))}
    </mdxComponents.ul>
  );
}

const normalize = (keywords?: string | string[]) =>
  (Array.isArray(keywords) ? keywords : keywords ? [keywords] : [])
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);

export async function Posts({
  exclude,
  include,
}: Readonly<{
  exclude?: string | string[];
  include?: string | string[];
}>) {
  const excludes = normalize(exclude);
  const includes = normalize(include);
  const has = (post: PostMeta, list: string[]) =>
    post.keywords.some((k) => list.includes(k.toLowerCase()));

  const posts = (await getAllPosts()).filter(
    (post) =>
      !(excludes.length && has(post, excludes)) &&
      (!includes.length || has(post, includes)),
  );

  return <PostList posts={posts} />;
}
