import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const neon = "#bfdd0c";
const background = "#000";
const foreground = "#f1f5f9";
const secondary = "rgba(148, 163, 184, 0.8)";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontFamily:
            "Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: background,
          color: foreground,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "-0.04em",
          }}
        >
          Hi! I'm Leo Giovanetti
          <span style={{ color: neon }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              color: secondary,
            }}
          >
            Technical leader, frontend architect,
            optimist, and tennis enthusiast
            building delightful user/developer
            experiences.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: neon,
              letterSpacing: "0.08em",
            }}
          >
            leog.me
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
