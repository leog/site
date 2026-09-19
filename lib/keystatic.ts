import "server-only";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export interface PostMeta {
  slug: string;
  title: string;
  description?: string;
  keywords: string[];
  date?: string;
  updatedAt?: string;
  draft?: boolean;
  alternates: {
    canonical: string;
  };
}

export interface KeystaticPost extends PostMeta {
  content: () => Promise<string>;
}

const normalizeDate = (value?: string | null) => value ?? undefined;

const toMeta = (
  slug: string,
  entry: {
    title: string;
    description: string;
    keywords: readonly string[];
    date: string | null;
    updatedAt: string | null;
    draft: boolean;
  },
): PostMeta => ({
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
});

const toTimestamp = (value?: string) => {
  const timestamp = value ? new Date(value).getTime() : 0;
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export async function getAllPosts(): Promise<PostMeta[]> {
  const allPosts = await reader.collections.posts.all();

  return allPosts
    .map(({ slug, entry }) => toMeta(slug, entry))
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        Math.max(toTimestamp(b.updatedAt), toTimestamp(b.date)) -
        Math.max(toTimestamp(a.updatedAt), toTimestamp(a.date)),
    );
}

export async function getPostBySlug(
  slug: string,
): Promise<KeystaticPost | null> {
  const entry = await reader.collections.posts.read(slug);
  if (!entry || entry.draft) {
    return null;
  }

  return { ...toMeta(slug, entry), content: entry.content };
}

export interface KeystaticWorkPage {
  title: string;
  description?: string;
  keywords: string[];
  updatedAt?: string;
  content: () => Promise<string>;
}

export async function getWorkPage(): Promise<KeystaticWorkPage | null> {
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

export const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      })
    : null;
