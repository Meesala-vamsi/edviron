import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className={`px-3 py-2 rounded-lg border ${
          currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-blue-500 border-blue-300 hover:bg-blue-100"
        }`}
        disabled={currentPage === 1}
      >
        <GrFormPrevious/>
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-2 rounded-lg border ${
            currentPage === index + 1
              ? "bg-blue-500 text-white border-blue-500"
              : "text-blue-500 border-blue-300 hover:bg-blue-100"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        className={`px-3 py-2 rounded-lg border ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-blue-500 border-blue-300 hover:bg-blue-100"
        }`}
        disabled={currentPage === totalPages}
      >
        <MdNavigateNext/>
      </button>
    </div>
  );
};

export default Pagination;
