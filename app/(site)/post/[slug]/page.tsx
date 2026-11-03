import { AnimatedName } from "@/app/_components/animated-name";
import { TitleKeywords } from "@/app/_components/keywords";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/keystatic";
import { postMarkdownPath } from "@/lib/markdown";
import { Mdx } from "@/lib/mdx";
import { mdxComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.alternates.canonical,
      types: { "text/markdown": postMarkdownPath(slug) },
    },
    keywords: post.keywords,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const content = await post.content();
  const published = formatDate(post.date);
  const updated =
    post.updatedAt && post.updatedAt !== post.date
      ? formatDate(post.updatedAt)
      : null;

  return (
    <>
      <TitleKeywords keywords={post.keywords}>
        <mdxComponents.h1>{post.title}</mdxComponents.h1>
        {published && (
          <p className="text-sm text-gray-500 fade-in">
            <time dateTime={post.date}>{published}</time>
            {updated && ` · updated ${updated}`}
          </p>
        )}
      </TitleKeywords>
      <AnimatedName />
      <Mdx source={content} />
      <p className="text-sm text-gray-400">
        <a href={postMarkdownPath(slug)} className="underline decoration-neon">
          Read as Markdown
        </a>
      </p>
    </>
  );
}
