import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { LinkNav } from "./LinkNav";

export const Header = () => {

  return (
    <header className="container w-full mx-auto">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-building-store"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#6366f1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="3" y1="21" x2="21" y2="21" />
            <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
            <line x1="5" y1="21" x2="5" y2="10.85" />
            <line x1="19" y1="21" x2="19" y2="10.85" />
            <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
          </svg>
          <span className="ml-3 text-xl">Next.js SHOP</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <LinkNav href="/">Home</LinkNav>
          <LinkNav href="/about">About</LinkNav>
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};
