import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/mdx-components";

export async function Mdx({ source }: Readonly<{ source: string }>) {
  const { default: Content } = await evaluate(source, runtime);
  return <Content components={mdxComponents} />;
}
