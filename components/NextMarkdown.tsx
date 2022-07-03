import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import React from "react";

export const NextMarkdown = ({ children }: { children: MDXRemoteSerializeResult<Record<string, unknown>> }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props} />;
          }
          return (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
      }}
    ></MDXRemote>
  );
};
