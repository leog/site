import { getAllPosts } from "@/lib/keystatic";
import { postIndexLine, SITE } from "@/lib/markdown";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const byKeyword = (k: string) => posts.filter((p) => p.keywords.includes(k));
  const section = (title: string, list: typeof posts) =>
    list.length
      ? `\n## ${title}\n\n${list.map(postIndexLine).join("\n")}\n`
      : "";

  const agentReady = byKeyword("agent-ready");
  const sideProjects = byKeyword("side-project");
  const writing = posts.filter(
    (p) => !agentReady.includes(p) && !sideProjects.includes(p),
  );

  const body = `# Leo Giovanetti

> Technical leader and frontend architect writing about engineering, leadership, AI-agent-ready architecture and side projects.

Every post is available as plain Markdown by appending \`.md\` to its URL. The whole site is in ${SITE}/llms-full.txt. RSS: ${SITE}/feed.xml
${section("Quick tips", agentReady)}${section("Writing", writing)}${section("Side projects", sideProjects)}
## About

- [Work](${SITE}/work): where I work and what I have built.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
