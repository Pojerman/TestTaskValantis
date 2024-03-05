import { useMemo } from 'react';
import {SIBLING_COUNT, DOTS} from "../constants/const.ts";

const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const usePagination = (totalPages:number, currentPage:number) => {
    const paginationRange = useMemo(() => {
        const totalPageNumbers = SIBLING_COUNT * 2 + 3;

        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1);
        const rightSiblingIndex = Math.min(currentPage + SIBLING_COUNT, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * SIBLING_COUNT;
            const leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, lastPageIndex];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * SIBLING_COUNT;
            const rightRange = range(totalPages - rightItemCount + 1, totalPages);

            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }

        return [];
    }, [totalPages, currentPage]);

    return paginationRange
};

export default usePagination;
