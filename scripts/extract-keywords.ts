import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(ROOT, "lib", "known-keywords.json");

const keywords = new Set<string>();

// Extract from YAML frontmatter (content/posts/*.mdx, content/work.mdx)
function extractFromYaml(filePath: string) {
  const content = readFileSync(filePath, "utf-8");
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return;
  const kwMatch = fmMatch[1].match(/keywords:\n((?:\s+-\s+.+\n?)*)/);
  if (!kwMatch) return;
  for (const item of kwMatch[1].matchAll(/^\s+-\s+(.+)$/gm)) {
    keywords.add(item[1].trim().replace(/^['"]|['"]$/g, ""));
  }
}

const postsDir = join(ROOT, "content", "posts");
for (const entry of readdirSync(postsDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".mdx")) {
    extractFromYaml(join(postsDir, entry.name));
  }
}
extractFromYaml(join(ROOT, "content", "work.mdx"));

const sorted = [...keywords].sort();
writeFileSync(OUTPUT, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`Extracted ${sorted.length} keywords: ${sorted.join(", ")}`);
