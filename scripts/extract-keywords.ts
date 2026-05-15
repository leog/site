import {
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
);
const OUTPUT = join(
  ROOT,
  "lib",
  "known-keywords.json",
);

const keywords = new Set<string>();

// Extract from YAML frontmatter (content/posts/*.mdx, content/work.mdx)
function extractFromYaml(filePath: string) {
  const content = readFileSync(filePath, "utf-8");
  const fmMatch = content.match(
    /^---\n([\s\S]*?)\n---/,
  );
  if (!fmMatch) return;
  const fm = fmMatch[1];
  const kwMatch = fm.match(
    /keywords:\n((?:\s+-\s+.+\n?)*)/,
  );
  if (!kwMatch) return;
  for (const item of kwMatch[1].matchAll(
    /^\s+-\s+(.+)$/gm,
  )) {
    keywords.add(
      item[1].trim().replace(/^['"]|['"]$/g, ""),
    );
  }
}

// Extract from JS metadata objects (app/(site)/post/*/page.mdx)
function extractFromMdxMeta(filePath: string) {
  const content = readFileSync(filePath, "utf-8");
  const kwMatch = content.match(
    /keywords:\s*\[([^\]]*)\]/,
  );
  if (!kwMatch) return;
  for (const item of kwMatch[1].matchAll(
    /"([^"]+)"|'([^']+)'/g,
  )) {
    keywords.add((item[1] || item[2]).trim());
  }
}

// Scan content/posts/
const postsDir = join(ROOT, "content", "posts");
for (const entry of readdirSync(postsDir, {
  withFileTypes: true,
})) {
  const mdxPath = entry.isDirectory()
    ? join(postsDir, entry.name, "index.mdx")
    : entry.name.endsWith(".mdx")
      ? join(postsDir, entry.name)
      : null;
  if (mdxPath) extractFromYaml(mdxPath);
}

// Scan content/work.mdx
const workPath = join(
  ROOT,
  "content",
  "work.mdx",
);
try {
  extractFromYaml(workPath);
} catch {}

// Scan app/(site)/post/*/page.mdx
const appPostsDir = join(
  ROOT,
  "app",
  "(site)",
  "post",
);
try {
  for (const entry of readdirSync(appPostsDir, {
    withFileTypes: true,
  })) {
    if (!entry.isDirectory()) continue;
    const mdxPath = join(
      appPostsDir,
      entry.name,
      "page.mdx",
    );
    try {
      extractFromMdxMeta(mdxPath);
    } catch {}
  }
} catch {}

const sorted = [...keywords].sort();
writeFileSync(
  OUTPUT,
  `${JSON.stringify(sorted, null, 2)}\n`,
);
console.log(
  `Extracted ${sorted.length} keywords: ${sorted.join(", ")}`,
);
