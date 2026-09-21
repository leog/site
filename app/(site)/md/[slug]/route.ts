import { getAllPosts, getPostBySlug } from "@/lib/keystatic";
import { postAsMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(await postAsMarkdown(post), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
