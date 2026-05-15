import { collection, config, fields, singleton } from "@keystatic/core";
import knownKeywords from "./lib/known-keywords.json";

const repoOwner = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER;
const repoName = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME;

const storage =
  repoOwner && repoName
    ? {
        kind: "github" as const,
        repo: {
          owner: repoOwner,
          name: repoName,
        },
      }
    : { kind: "local" as const };

function keywordsField() {
  return fields.array(
    fields.text({
      label: "Keyword",
      description: knownKeywords.length
        ? `Existing: ${knownKeywords.join(", ")}`
        : undefined,
    }),
    {
      label: "Keywords",
      itemLabel: (props) => props.value || "New keyword",
    },
  );
}

export default config({
  storage,
  ui: {
    brand: {
      name: "leog.me CMS",
    },
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        keywords: keywordsField(),
        date: fields.date({
          label: "Published Date",
          validation: { isRequired: true },
          defaultValue: { kind: "today" },
        }),
        updatedAt: fields.date({
          label: "Updated Date",
          defaultValue: { kind: "today" },
        }),
        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
        }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
  },
  singletons: {
    workPage: singleton({
      label: "Work Page",
      path: "content/work",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.text({
          label: "Title",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        keywords: keywordsField(),
        updatedAt: fields.date({
          label: "Updated Date",
          defaultValue: { kind: "today" },
        }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
  },
});
