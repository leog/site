import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-secondary text-text">
        <main className="max-w-[60ch] mx-auto w-full space-y-6 relative">
          {children}
        </main>
        <Footer />
        <Analytics />
      </div>
    </ViewTransitions>
  );
}

function Footer() {
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
