import React from "react";

const Pagination = ({ currentPage, totalPages, paginate, setCurrentPage }) => {
  const maxPages = 10;
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const indexOfLastPage = Math.ceil(currentPage / maxPages) * maxPages;
  const indexOfFirstPage = indexOfLastPage - maxPages + 1;
  const displayPages = pageNumbers.slice(indexOfFirstPage - 1, indexOfLastPage);

  return (
    <div className="pagination flex justify-center items-center py-4">
      <button
        onClick={() =>
          setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
        }
        className={`mx-2 px-3 py-1 border ${
          currentPage === 1 ? "bg-gray-300" : "bg-white text-black"
        }`}
      >
        {"<"}
      </button>
      {displayPages.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`mx-2 px-3 py-1 border ${
            currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() =>
          setCurrentPage(
            currentPage < totalPages ? currentPage + 1 : currentPage
          )
        }
        className={`mx-2 px-3 py-1 border ${
          currentPage === totalPages ? "bg-gray-300" : "bg-white text-black"
        }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
