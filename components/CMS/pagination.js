// pagination.js

import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import './pagination.css';

const Pagination = (props) => {
    const { onPageChange, totalCount, siblingCount = 1, className, currentPage, pageSize } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (!paginationRange || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={`pagination-container ${className}`}>
            <li
                style={{
                    pointerEvents: currentPage === 1 ? 'none' : 'auto',
                    opacity: currentPage === 1 ? 0.5 : 1,
                }}
                onClick={onPrevious}
                className='pagination-item'
            >
                <div className="arrow left" />
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return (
                        <li key={index} className="pagination-item dots">
                            &#8230;
                        </li>
                    );
                }

                return (
                    <li className='pagination-item' key={index} style={{ backgroundColor: pageNumber === currentPage ? '#ddd' : 'transparent' }} onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </li>
                );
            })}
            <li
            className='pagination-item'
                style={{
                    pointerEvents: currentPage === lastPage ? 'none' : 'auto',
                    opacity: currentPage === lastPage ? 0.5 : 1,
                }}
                onClick={onNext}
            >
                <div className="arrow right" />
            </li>
        </ul>
    );
};

export default Pagination;
