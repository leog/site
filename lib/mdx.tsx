import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/mdx-components";

interface HastNode {
  type: string;
  tagName?: string;
  data?: { meta?: string };
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

// Exposes the fence meta (```ts title="file.ts") as data-meta on <code>.
const rehypeCodeMeta = () => (tree: HastNode) => {
  const walk = (node: HastNode) => {
    if (node.tagName === "code" && node.data?.meta && node.properties) {
      node.properties.dataMeta = node.data.meta;
    }
    node.children?.forEach(walk);
  };
  walk(tree);
};

export async function Mdx({ source }: Readonly<{ source: string }>) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    rehypePlugins: [rehypeCodeMeta],
  });
  return <Content components={mdxComponents} />;
}
