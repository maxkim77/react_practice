// pagination.jsx
import React from 'react';
import '../assets/ProductPage.css';

const Pagination = ({ currentPage, totalProducts, productsPerPage, paginate }) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage); // 총 페이지 수 계산
    const pages = [];

    // 첫 페이지로 이동 버튼
    if (currentPage > 1) {
        pages.push(
            <button key="first" onClick={() => paginate(1)} aria-label="First Page">
                ⏮️
            </button>
        );
    }

    // 이전 페이지로 이동 버튼
    if (currentPage > 1) {
        pages.push(
            <button key="prev" onClick={() => paginate(currentPage - 1)} aria-label="Previous Page">
                ◀️
            </button>
        );
    }

    // 페이지 번호 버튼 생성
    let startPage, endPage;
    if (totalPages <= 5) { // 총 페이지가 5 이하인 경우
        startPage = 1;
        endPage = totalPages;
    } else { // 총 페이지가 5 이상인 경우
        if (currentPage <= 3) { // 현재 페이지가 3 이하인 경우
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) { // 현재 페이지가 마지막 페이지에서 2 이내인 경우
            startPage = totalPages - 4;
            endPage = totalPages;
        } else { // 그 외의 경우
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => paginate(i)}
                className={currentPage === i ? 'active' : ''} // 현재 페이지인 경우 active 클래스 추가
                aria-label={`Page ${i}`}
            >
                {i}
            </button>
        );
    }

    // 다음 페이지로 이동 버튼
    if (currentPage < totalPages) {
        pages.push(
            <button key="next" onClick={() => paginate(currentPage + 1)} aria-label="Next Page">
                ▶️
            </button>
        );
    }

    // 마지막 페이지로 이동 버튼
    if (currentPage < totalPages) {
        pages.push(
            <button key="last" onClick={() => paginate(totalPages)} aria-label="Last Page">
                ⏭️
            </button>
        );
    }

    return <div className="pagination">{pages}</div>; // 페이지네이션 버튼들을 포함하는 div 반환
};

export default Pagination;
