import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({ comments, itemsPerPage, currentPage, paginate }) => {
  const totalPages = Math.ceil(comments.length / itemsPerPage);

  // Function to generate a range of pages around the current page
  const generatePageRange = () => {
    const pageRange = 3; // Number of pages to show on either side of the current page

    let start = Math.max(1, currentPage - pageRange);
    let end = Math.min(totalPages, currentPage + pageRange);

    // Adjust start and end if there are not enough pages to show
    const offset = pageRange - (end - start);
    start = Math.max(1, start - offset);
    end = Math.min(totalPages, end + offset);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <Pagination style={{ marginTop: "35px" }}>
      {generatePageRange().map((page) => (
        <Pagination.Item key={page} active={page === currentPage} onClick={() => paginate(page)}>
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default CustomPagination;
