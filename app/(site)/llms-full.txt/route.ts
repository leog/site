import { getAllPosts, getPostBySlug } from "@/lib/keystatic";
import { postAsMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const docs = await Promise.all(
    posts.map(async ({ slug }) => {
      const post = await getPostBySlug(slug);
      return post ? postAsMarkdown(post) : "";
    }),
  );

  return new Response(docs.filter(Boolean).join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
