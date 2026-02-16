import "./globals.css";
import { Inter } from "next/font/google";
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
    <html lang="en" className={`${inter.className}`}>
      <body className="antialiased tracking-tight">{children}</body>
    </html>
  );
}
