// CommentList.js

import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const CommentList = ({ comments }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="pb-5 d-flex flex-column align-items-center" style={{marginTop:"35px"}}>
      <div className="container">
        <h4>Top Reviews:</h4>
        <ol className="list-group list-group-numbered">
          {currentComments.map((comment, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{comment.name}</div>
                {comment.content}
              </div>
              <button type="button" className="btn btn-primary rounded-pill mx-2" data-bs-toggle="modal" data-bs-target="#Modal">
                Reply
              </button>
              {comment.rating ? (
                <span className="badge bg-primary rounded-pill">{comment.rating}/5</span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      <Pagination style={{marginTop:"35px"}}>
        {Array.from({ length: Math.ceil(comments.length / itemsPerPage) }, (_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </section>
  );
};

export default CommentList;
