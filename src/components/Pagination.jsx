import React from "react";
import useTheme from "../hooks/useTheme";

export default function Pagination({
  totalPages,
  currentPage,
  nextPage,
  prevPage,
  goToPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  let { isDark } = useTheme();
  return (
    <>
      <div className="flex justify-center my-4">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={` ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600"
                : "text-primary hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            }  page-link text-sm relative inline-flex items-center rounded-l-md px-2 py-2  shadow-lg `}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              aria-current="page"
              onClick={() => goToPage(number)}
              className={`page-item relative z-10 inline-flex ${
                currentPage === number
                  ? "font-extrabold italic ring-1 ring-inset ring-slate-500"
                  : "font-light not-italic"
              } items-center text-primary px-4 py-2 text-sm focus:z-20 focus-visible:outline shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              {number}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={nextPage}
            className={` ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600"
                : "text-primary hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            } page-link text-sm relative inline-flex items-center rounded-r-md px-2 py-2 shadow-lg `}
          >
            Next
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </>
  );
}
