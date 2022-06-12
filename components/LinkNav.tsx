import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface LinkNavProps {
  children: React.ReactNode;
  href: string;
}

export const LinkNav = ({ href, children }: LinkNavProps) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a className={`mr-5 hover:text-gray-900 ${router.pathname === href && "underline"}`}>{children}</a>
    </Link>
  );
};
