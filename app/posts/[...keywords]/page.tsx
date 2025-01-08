import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { mdxComponents } from "@/mdx-components";
import { AnimatedName } from "@/app/_components/animated-name";
import { TitleKeywords } from "@/app/_components/keywords";

interface PageProps {
  params: Promise<{
    keywords: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { keywords } = await params;
  let keys = Array.isArray(keywords)
    ? keywords
    : [keywords];
  return {
    title: `Posts for: ${keys.join(", ")}`,
    description: `Listing posts matching the keywords: ${keys.join(
      ", "
    )}`,
  };
}

export default async function KeywordsPage({
  params,
}: Readonly<PageProps>) {
  const { keywords } = await params;
  let keys = Array.isArray(keywords)
    ? keywords
    : [keywords];
  const posts = await getAllPosts();

  // Filter posts that match any of the keywords
  const filteredPosts = posts.filter((post) =>
    keys.some((keyword) =>
      post.keywords
        ?.map((k) => k.toLowerCase())
        .includes(keyword.toLowerCase())
    )
  );

  return (
    <div className='container mx-auto p-4'>
      {
        <mdxComponents.h1>
          Posts for keywords{" "}
          {keys.length > 1
            ? `"${keys
                .slice(0, -1)
                .join('", "')}" and "${
                keys[keys.length - 1]
              }"`
            : `"${keywords.join()}"`}
        </mdxComponents.h1>
      }
      <AnimatedName />
      {filteredPosts.length > 0 ? (
        <mdxComponents.ul>
          {filteredPosts.map((post) => (
            <mdxComponents.li
              key={post.alternates.canonical}
              className='mb-2'
            >
              <TitleKeywords
                className='text-sm text-gray-500'
                keywords={post.keywords}
              >
                <mdxComponents.a
                  href={post.alternates.canonical}
                >
                  {post.title}
                </mdxComponents.a>
              </TitleKeywords>
            </mdxComponents.li>
          ))}
        </mdxComponents.ul>
      ) : (
        <mdxComponents.p>
          No notes found
        </mdxComponents.p>
      )}
    </div>
  );
}
