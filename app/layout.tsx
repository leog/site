import "./globals.css";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "500", "600", "800"],
});

export const metadata = {
  metadataBase: new URL("https://leog.me"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Hi! I'm Leo Giovanetti.",
    template: "%s from Leo Giovanetti.",
  },
  description:
    "Technical leader, frontend architect, eternal optimist and tennis enthusiast building delightful user/developer experiences.",
} satisfies Metadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${inter.className}`}>
        <body className="antialiased tracking-tight">
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-secondary text-text">
            <main className="max-w-[60ch] mx-auto w-full space-y-6 relative">
              {children}
            </main>
            <Footer />
            <Analytics />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}

function Footer() {
  const links = [
    { name: "@leog", url: "https://x.com/leog" },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/leog",
    },
    {
      name: "github",
      url: "https://github.com/leog",
    },
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center tracking-tight">
        I'm&nbsp;<b className="font-bold">leog</b>
        &nbsp;in&nbsp;
        <a
          href="https://x.com/leog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 underline decoration-neon hover:text-text-lighter transition-colors duration-200"
        >
          X
        </a>
        ,&nbsp;
        <a
          href="https://linkedin.com/in/leog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 underline decoration-neon hover:text-text-lighter transition-colors duration-200"
        >
          LinkedIn
        </a>
        &nbsp;and&nbsp;
        <a
          href="https://github.com/leog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 underline decoration-neon hover:text-text-lighter transition-colors duration-200"
        >
          GitHub
        </a>
        &nbsp;😏
      </div>
    </footer>
  );
}
