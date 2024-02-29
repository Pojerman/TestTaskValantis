import "./pagination.css";
import React from "react";

type PaginationProps = {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}


export default function Pagination({currentPage, onPageChange, totalPages}:PaginationProps) {

    const handlePageClick = (page: number, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        const newPage= page > totalPages ? 1 : page < 1 ? totalPages : page;
        onPageChange(newPage);
    }

    return (
        <div className="pagination">
            <a href="#" onClick={(event) => handlePageClick(currentPage - 1, event)}>&laquo;</a>
            {Array.from({length: totalPages}, (_, index) => (
                <a
                    key={index + 1}
                    href="#"
                    className={currentPage === index + 1 ? "active" : ""}
                    onClick={(event) => handlePageClick(index + 1, event)}>
                    {index + 1}
                </a>
            ))}
            <a href="#" onClick={(event) => handlePageClick(currentPage + 1, event)}>&raquo;</a>
        </div>
    )
}