import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 3;
    const maxPageNumber = Math.min(totalPages, maxPageNumbersToShow);
    const middlePage = Math.floor(maxPageNumber / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxPageNumber;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxPageNumber + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="mx-auto relative">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 mx-4 rounded-md text-slate bg-blue-300"
      >
        Previous
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`${
            currentPage === pageNumber ? "bg-white text-black" : "text-white"
          } px-2 py-1 rounded-md`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 mx-4 rounded-md text-slate bg-blue-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
