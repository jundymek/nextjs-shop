import Link from "next/link";
import Image from "next/image";
import { LinkNav } from "./LinkNav";
import { Logo } from "components/Logo";

export const Header = () => {
  return (
    <header className="container w-full mx-auto">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <LinkNav href="/">Home</LinkNav>
          <LinkNav href="/about">About</LinkNav>
        </nav>
      </div>
    </header>
  );
};
