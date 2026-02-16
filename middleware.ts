import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isKeystatic =
    request.nextUrl.pathname.startsWith("/keystatic") ||
    request.nextUrl.pathname.startsWith("/api/keystatic");

  if (!isKeystatic) {
    return NextResponse.next();
  }

  // In local storage mode (no GitHub env vars), block access in production
  const hasGitHubStorage =
    process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER &&
    process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME;

  if (!hasGitHubStorage && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};
