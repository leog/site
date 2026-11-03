import "server-only";
import type { KeystaticPost, PostMeta } from "@/lib/keystatic";

export const SITE = "https://leog.me";

export const postMarkdownPath = (slug: string) => `/post/${slug}.md`;

export const postAsMarkdown = async (post: KeystaticPost) => {
  const meta = [
    `# ${post.title}`,
    "",
    post.description ? `> ${post.description}` : null,
    post.description ? "" : null,
    `- Author: Leo Giovanetti`,
    `- Canonical: ${SITE}${post.alternates.canonical}`,
    post.date ? `- Published: ${post.date}` : null,
    post.updatedAt && post.updatedAt !== post.date
      ? `- Updated: ${post.updatedAt}`
      : null,
    post.keywords.length ? `- Keywords: ${post.keywords.join(", ")}` : null,
    "",
  ].filter((line) => line !== null);
  return `${meta.join("\n")}\n${await post.content()}`;
};

export const postIndexLine = (post: PostMeta) =>
  `- [${post.title}](${SITE}${postMarkdownPath(post.slug)})${post.description ? `: ${post.description}` : ""}`;
