import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/keystatic";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(({ slug }) => ({ slug }));
}

const neon = "#bfdd0c";
const background = "#030712";
const foreground = "#f8fafc";
const muted = "rgba(148, 163, 184, 0.88)";

const truncate = (value: string, max = 200) => {
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, max - 1).trimEnd()}…`;
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title ?? "A post from Leo Giovanetti";
  const excerptSource =
    post?.description ??
    "Thoughts from Leo Giovanetti on product, engineering, and leadership.";
  const excerpt = truncate(excerptSource.replace(/\s+/g, " ").trim());

  return new ImageResponse(
    <div
      style={{
        fontFamily: "Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        padding: "80px",
        background,
        color: foreground,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 62,
          fontWeight: 600,
          letterSpacing: "-0.035em",
        }}
      >
        Hi! I'm Leo Giovanetti
        <span style={{ color: neon }}>.</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: "820px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            lineHeight: 1.4,
            color: muted,
          }}
        >
          {excerpt}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 26,
          fontWeight: 500,
          color: neon,
          letterSpacing: "0.08em",
        }}
      >
        leog.me/post/
        {slug}
      </div>
    </div>,
    {
      ...size,
    },
  );
}
