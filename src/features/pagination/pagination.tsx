import "./pagination.css";
import React, {useEffect, useState} from "react";
import usePagination from "../../shared/hooks/usePagination.ts";
import {DOTS} from "../../shared/constants/const.ts";

type PaginationProps = {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}

export default function Pagination({currentPage, onPageChange, totalPages}:PaginationProps) {
    const paginationRange = usePagination(totalPages, currentPage);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handlePageClick = (page: number, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        const newPage= page > totalPages ? 1 : page < 1 ? totalPages : page;
        onPageChange(newPage);
    }

    return (
        <div className="pagination">
            <a href="#" onClick={(event) => handlePageClick(currentPage - 1, event)}>
                &laquo;
            </a>
            {isMobile ?
                <a href="#">
                    {currentPage}
                </a>
                :
                paginationRange.map((page, index) => (
                    <React.Fragment key={index}>
                        {page === DOTS ? (
                            <span>{DOTS}</span>
                        ) : (
                            <a
                                href="#"
                                className={currentPage === page ? 'active' : ''}
                                onClick={(event) => handlePageClick(Number(page), event)}
                            >
                                {page}
                            </a>
                        )}
                    </React.Fragment>
                ))
            }
            <a href="#" onClick={(event) => handlePageClick(currentPage + 1, event)}>
                &raquo;
            </a>
        </div>
    );
}