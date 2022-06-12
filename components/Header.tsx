import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="max-w-5xl w-full mx-auto">
      <nav className="bg-gray-700 text-white">
        <ul className="flex">
          <li className="mx-2">
            <Link href="/" id="home">
              <a className={router.pathname == "/" ? "underline" : ""}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about" id="about">
              <a className={router.pathname == "/about" ? "underline" : ""}>About</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
