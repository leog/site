import { AnimatedName } from "@/app/_components/animated-name";
import { Keywords } from "@/app/_components/keywords";
import { getWorkPage } from "@/lib/keystatic";
import { Mdx } from "@/lib/mdx";
import { mdxComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const workPage = await getWorkPage();
  if (!workPage) {
    return {};
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
  const workPage = await getWorkPage();
  if (!workPage) {
    notFound();
  }

  const content = await workPage.content();

  return (
    <>
      <mdxComponents.h1>{workPage.title}</mdxComponents.h1>
      <AnimatedName />
      <Keywords keywords={workPage.keywords} />
      <Mdx source={content} />
    </>
  );
}
