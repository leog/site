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

## License

1. You are free to use this code as inspiration.
2. Please do not copy it directly.
3. Crediting the author is appreciated.

Please remove all of my personal information by running `bun run delete`.
