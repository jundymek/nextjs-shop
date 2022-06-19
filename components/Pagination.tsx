import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const Pagination = () => {
  const router = useRouter();
  const currentPage = parseInt(typeof router.query.pageNumber === "string" ? router.query.pageNumber : "1");
  return (
    <nav className="sm:border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-2">
      <div className="hidden sm:-mt-px sm:flex">
        <ul>
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i} className="inline-block">
              <Link href={`/products/page/${i + 1}`}>
                <a
                  className={
                    i !== currentPage - 1
                      ? `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`
                      : `border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`
                  }
                >
                  {i + 1}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center sm:hidden">
        <p className="text-xs mb-1">Page {currentPage} of 10</p>
        <div className="inline-flex justify-center space-x-1">
          <Link href={`/products/page/${currentPage - 1}`}>
            <a
              className={
                currentPage === 1
                  ? "pointer-events-none inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded"
                  : "inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded"
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link>
          <Link href={`/products/page/${currentPage + 1}`}>
            <a
              className={
                currentPage === 10
                  ? "pointer-events-none inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded"
                  : "inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded"
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};
