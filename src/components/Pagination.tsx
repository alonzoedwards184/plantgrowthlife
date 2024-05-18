import React from "react";
import { Plant } from "../Views/PlantTable.tsx";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  data: Plant[]; // Add data prop
  itemsPerPage: number; // Add itemsPerPage prop
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            tabIndex={currentPage === 1 ? -1 : 0}
          >
            Previous
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a className="page-link" onClick={() => onPageChange(number)}>
              {number}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
