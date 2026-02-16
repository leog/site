import "server-only";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import type { PostMeta } from "./post-meta";

const reader = createReader(process.cwd(), keystaticConfig);

export interface KeystaticPost extends PostMeta {
  slug: string;
  content: () => Promise<string>;
}

const normalizeDate = (value?: string | null) => value ?? undefined;

export async function getKeystaticPostsMeta() {
  const allPosts = await reader.collections.posts.all();

  return allPosts
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      description: entry.description || undefined,
      keywords: [...(entry.keywords || [])],
      date: normalizeDate(entry.date),
      updatedAt: normalizeDate(entry.updatedAt),
      draft: entry.draft,
      alternates: {
        canonical: `/post/${slug}`,
      },
    }))
    .filter((post) => !post.draft);
}

export async function getKeystaticPostBySlug(
  slug: string,
): Promise<KeystaticPost | null> {
  const entry = await reader.collections.posts.read(slug);
  if (!entry || entry.draft) {
    return null;
  }

  return {
    slug,
    title: entry.title,
    description: entry.description || undefined,
    keywords: [...(entry.keywords || [])],
    date: normalizeDate(entry.date),
    updatedAt: normalizeDate(entry.updatedAt),
    draft: entry.draft,
    alternates: {
      canonical: `/post/${slug}`,
    },
    content: entry.content,
  };
}

export interface KeystaticWorkPage {
  title: string;
  description?: string;
  keywords: string[];
  updatedAt?: string;
  content: () => Promise<string>;
}

export async function getKeystaticWorkPage(): Promise<KeystaticWorkPage | null> {
  const entry = await reader.singletons.workPage.read();
  if (!entry) {
    return null;
  }

  return {
    title: entry.title,
    description: entry.description || undefined,
    keywords: [...(entry.keywords || [])],
    updatedAt: normalizeDate(entry.updatedAt),
    content: entry.content,
  };
}
