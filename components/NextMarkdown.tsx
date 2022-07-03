import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import React from "react";
import { MarkdownResult } from "types";

export const NextMarkdown = ({ children }: { children: MarkdownResult }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props} />;
          }
          return !isInternalLink(href) ? (
            <a href={href} {...props} rel="noopener noreferrer" />
          ) : (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
      }}
    ></MDXRemote>
  );
};

const isInternalLink = (url: string) => {
  return url.startsWith("/");
};
