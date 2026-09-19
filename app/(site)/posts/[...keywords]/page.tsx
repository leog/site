import type { Metadata } from "next";
import { getAllPosts } from "@/lib/keystatic";
import { mdxComponents } from "@/mdx-components";
import { AnimatedName } from "@/app/_components/animated-name";
import { PostList } from "@/app/_components/Posts";

interface PageProps {
  params: Promise<{
    keywords: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { keywords } = await params;
  return {
    title: `Posts for: ${keywords.join(", ")}`,
    description: `Listing posts matching the keywords: ${keywords.join(", ")}`,
  };
}

export default async function KeywordsPage({ params }: Readonly<PageProps>) {
  const { keywords } = await params;
  const keys = keywords.map((k) => decodeURIComponent(k).toLowerCase());
  const posts = await getAllPosts();

  const filteredPosts = posts.filter((post) =>
    post.keywords.some((k) => keys.includes(k.toLowerCase())),
  );

  return (
    <>
      <mdxComponents.h1>
        Posts for keywords{" "}
        {keys.length > 1
          ? `"${keys.slice(0, -1).join('", "')}" and "${keys[keys.length - 1]}"`
          : `"${keys[0]}"`}
      </mdxComponents.h1>
      <AnimatedName />
      {filteredPosts.length > 0 ? (
        <PostList posts={filteredPosts} showKeywords />
      ) : (
        <mdxComponents.p>No posts found</mdxComponents.p>
      )}
    </>
  );
}
