import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <section className="pb-5">
      <div className="container">
        <h4>Top Reviews:</h4>
        <ol className="list-group list-group-numbered">
          {comments.map((comment, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{comment.name}</div>
                {comment.content}
              </div>
              <button type="button" className="btn btn-primary rounded-pill mx-2" data-bs-toggle="modal" data-bs-target="#Modal">
                Reply
              </button>
              <span className="badge bg-primary rounded-pill">{comment.rating}/5</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default CommentList;
