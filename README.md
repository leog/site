[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%leog%2Fsite)

# site

- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## based on [@leerob's site](https://github.com/leerob/site)

- Dark mode
- Removed postgres redirections
- Renamed "notes" to "posts" (/n to /post)
- My custom style applied to mdx-components
- Adds keywords to posts
- List posts with certain keywords (/posts/keyword)

## Running Locally

This application requires Node.js v18.17+.

```bash
git clone https://github.com/leog/site.git
cd site
bun install
bun run delete # Remove all of my posts
bun dev
```

## CMS (Keystatic)

This repo includes Keystatic at `/keystatic`.

- Local mode (default): no extra setup needed.
- Remote/GitHub mode: set the env vars below.

```bash
KEYSTATIC_GITHUB_REPO_OWNER=leog
KEYSTATIC_GITHUB_REPO_NAME=site
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...
```

When `KEYSTATIC_GITHUB_REPO_OWNER` and
`KEYSTATIC_GITHUB_REPO_NAME` are set, Keystatic uses GitHub storage.
Otherwise it falls back to local file storage.

You can manage:

- `Posts` collection (renders under `/post/[slug]`)
- `Work Page` singleton (renders under `/work`, with fallback to local static content if not created yet)

## License

1. You are free to use this code as inspiration.
2. Please do not copy it directly.
3. Crediting the author is appreciated.

Please remove all of my personal information by running `bun run delete`.
