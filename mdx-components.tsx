import React, { ComponentPropsWithoutRef } from "react";
import { Link } from "next-view-transitions";
import { highlight } from "sugar-high";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

export const mdxComponents = {
  h1: ({ children, ...rest }: HeadingProps) => (
    <h1 className="font-medium pt-12 mb-0 fade-in" {...rest}>
      {children}
    </h1>
  ),
  h2: ({ children, ...rest }: HeadingProps) => (
    <h2 className="text-text font-medium mt-8 mb-3" {...rest}>
      {children}
    </h2>
  ),
  h3: ({ children, ...rest }: HeadingProps) => (
    <h3 className="text-text font-medium mt-8 mb-3" {...rest}>
      {children}
    </h3>
  ),
  h4: ({ children, ...rest }: HeadingProps) => (
    <h4 className="font-medium" {...rest}>
      {children}
    </h4>
  ),
  p: ({ children, ...rest }: ParagraphProps) => (
    <p className="text-text leading-snug" {...rest}>
      {children}
    </p>
  ),
  ol: ({ children, ...rest }: ListProps) => (
    <ol className="text-text list-decimal pl-5 space-y-2" {...rest}>
      {children}
    </ol>
  ),
  ul: ({ children, ...rest }: ListProps) => (
    <ul className="text-text list-disc pl-5 space-y-1" {...rest}>
      {children}
    </ul>
  ),
  li: ({ children, ...rest }: ListItemProps) => (
    <li className="pl-1" {...rest}>
      {children}
    </li>
  ),
  em: ({ children, ...rest }: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...rest}>
      {children}
    </em>
  ),
  strong: ({ children, ...rest }: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...rest}>
      {children}
    </strong>
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = "text-primary underline decoration-neon font-semibold";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: ({ children, ...rest }: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700"
      {...rest}
    >
      {children}
    </blockquote>
  ),
};

declare global {
  type MDXProvidedComponents = typeof mdxComponents;
}

export function useMDXComponents(): MDXProvidedComponents {
  return mdxComponents;
}
