import { AnimatedName } from "@/app/_components/animated-name";
import { Keywords } from "@/app/_components/keywords";
import { getKeystaticWorkPage } from "@/lib/keystatic";
import { mdxComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

import * as fallbackWorkPage from "./default-content.mdx";

const FallbackWorkContent = fallbackWorkPage.default;
const fallbackMetadata = (
  fallbackWorkPage as unknown as {
    metadata?: Metadata;
  }
).metadata;

export async function generateMetadata(): Promise<Metadata> {
  const workPage = await getKeystaticWorkPage();
  if (!workPage) {
    return fallbackMetadata ?? {};
  }

  return {
    title: workPage.title,
    description: workPage.description,
    alternates: {
      canonical: "/work",
    },
    keywords: workPage.keywords,
  };
}

export default async function WorkPage() {
  const workPage = await getKeystaticWorkPage();

  if (!workPage) {
    return <FallbackWorkContent />;
  }

  const content = await workPage.content();

  return (
    <>
      <mdxComponents.h1>{workPage.title}</mdxComponents.h1>
      <AnimatedName />
      <Keywords keywords={workPage.keywords} />
      <MDXRemote source={content} components={mdxComponents} />
    </>
  );
}
