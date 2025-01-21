import Link from "next/link";

export function Keywords({
  keywords,
  className,
}: Readonly<{
  keywords?: string[];
  className?: string;
}>) {
  return (
    keywords?.length && (
      <div
        className={
          className ??
          "text-sm text-gray-500 fade-in"
        }
      >
        {keywords
          .filter((k) => k !== "leog")
          .map((k) => (
            <span key={k}>
              <Link
                href={`/posts/${k}`}
                className='hover:decoration-neon hover:underline'
              >
                #{k}
              </Link>
              &nbsp;
            </span>
          ))}
      </div>
    )
  );
}

export function TitleKeywords({
  keywords,
  children,
  className,
}: Readonly<{
  keywords?: string[];
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className='mb-0'>
      {children}
      <Keywords
        className={className}
        {...{ keywords }}
      ></Keywords>
    </div>
  );
}
