# leog.me

Personal site: a short intro, a work history and a handful of posts.

- **Framework**: [Next.js](https://nextjs.org/) (App Router, MDX)
- **Content**: [Keystatic](https://keystatic.com) at `/keystatic`, files live in `content/`
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Deployment**: [Vercel](https://vercel.com)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

Originally based on [@leerob's site](https://github.com/leerob/site).

## Routes

- `/` intro plus post lists (posts tagged `side-project` are listed separately)
- `/work` the work page, a Keystatic singleton
- `/post/<slug>` a post
- `/posts/<keyword>` posts matching one or more keywords
- `/feed.xml`, `/sitemap.xml`, `/robots.txt`

## Running locally

```bash
bun install
bun dev
```

`bun dev` and `bun run build` first regenerate `lib/known-keywords.json` from
the content frontmatter so the CMS can suggest existing keywords.

## CMS (Keystatic)

- Local mode (default): no extra setup needed.
- GitHub mode: set the env vars below.

```bash
NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER=leog
NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME=site
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...
```

Content edits made through the CMS in GitHub mode land as commits, which
trigger a redeploy. All pages are statically generated.
