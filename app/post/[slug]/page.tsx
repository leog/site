import { AnimatedName } from "@/app/_components/animated-name";
import { TitleKeywords } from "@/app/_components/keywords";
import { getKeystaticPostBySlug } from "@/lib/keystatic";
import { mdxComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getKeystaticPostBySlug(slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.alternates.canonical,
    },
    keywords: post.keywords,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getKeystaticPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const content = await post.content();

  return (
    <>
      <TitleKeywords keywords={post.keywords}>
        <mdxComponents.h1>{post.title}</mdxComponents.h1>
      </TitleKeywords>
      <AnimatedName />
      <MDXRemote source={content} components={mdxComponents} />
    </>
  );
}
