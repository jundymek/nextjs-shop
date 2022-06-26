import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

interface PaginationProps {
  numberOfProducts: number;
}

export const Pagination = ({ numberOfProducts }: PaginationProps) => {
  const router = useRouter();
  const numberOfPages = Math.ceil(numberOfProducts / 25);
  console.log(numberOfPages);
  const currentPage = parseInt(typeof router.query.pageNumber === "string" ? router.query.pageNumber : "1");
  const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);
  const [isPageNumberInputVisible, setIsPageNumberInputVisible] = useState(false);
  const handleChangePage = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
    togglePageInputVisible();
    router.push(`/products/page/${pageNumber}`);
  };
  const togglePageInputVisible = () => {
    setIsPageNumberInputVisible(!isPageNumberInputVisible);
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function handleClickOutside(event: { target: any }) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      console.log("changed");
      setIsPageNumberInputVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <nav className="sm:border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-2">
      <div className="hidden sm:-mt-px sm:flex">
        <ul>
          <li className="inline-block">
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
          </li>
          {Array.from({ length: 3 }, (_, i) => (
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
          {numberOfPages > 10 && (
            <>
              <li className="inline-block relative">
                <button
                  onClick={togglePageInputVisible}
                  className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium relative"
                >
                  ...
                  {currentPage > 3 && currentPage < numberOfPages - 3 && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 border-indigo-500 text-indigo-600 border-t-2">
                      {currentPage}
                    </span>
                  )}
                </button>
                {isPageNumberInputVisible && (
                  <div className="flex absolute -top-20 left-1/2 -translate-x-1/2" ref={wrapperRef}>
                    <div className="relative">
                      <div className="absolute top-4 left-3">
                        {" "}
                        <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{" "}
                      </div>{" "}
                      <input
                        type="text"
                        className="h-14 w-30 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                        placeholder="Go to page..."
                        max={numberOfPages}
                        onInput={(e) => setCurrentPageNumber(parseInt((e.target as HTMLInputElement).value))}
                      />
                      <div className="absolute top-2 right-2">
                        {" "}
                        <button
                          onClick={() => handleChangePage(currentPageNumber)}
                          className="h-10 w-20 text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
                        >
                          Go
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </>
          )}
          {Array.from({ length: 3 }, (_, i) => (
            <li key={i} className="inline-block">
              <Link href={`/products/page/${numberOfPages - 3 + i}`}>
                <a
                  className={
                    numberOfPages - 3 + i !== currentPage
                      ? `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`
                      : `border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`
                  }
                >
                  {numberOfPages - 3 + i}
                </a>
              </Link>
            </li>
          ))}
          <li className="inline-block">
            <Link href={`/products/page/${currentPage + 1}`}>
              <a
                className={
                  currentPage === numberOfPages
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
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center sm:hidden">
        <p className="text-xs mb-1">
          Page {currentPage} of {numberOfPages}
        </p>
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
