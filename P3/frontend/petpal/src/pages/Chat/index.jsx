import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../../components/Comments/index'

const Chat = () => {
    const [comments, setCom] = useState([]);
    const [content, setContent] = useState("");
    const { id } = useParams();


    const get_comments = async (e) => {
        try {
            // Create the POST request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/apps/${id}/comments/`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
            //console.log(data)
                const data = await response.json();
                setCom(data.results)
                console.log(data)

            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

console.log(content)
  const com = {
            content: content,
            name:localStorage.getItem('name')
        };
    const post_comments = async (e) => {
        try {
            // Create the POST request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/apps/${id}/comments/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                 body: JSON.stringify(com),
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
            //console.log(data)
                const data = await response.json();
                setCom(data.results)
                console.log(data)
                window.location.href = `/chat/${id}`

            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

   useEffect(() => {
        get_comments();
   }, []);



  return (    <section style={{height:"80vh"}}>
           {comments ? (
        <CommentList comments={comments} />
      ) : (
        <p>Loading comments...</p> // You can render a loading message or anything else while comments are being fetched or initialized
   )}

<div class="modal fade" id="Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Reply</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <textarea class="form-control" aria-label="With textarea" placeholder="Reply to review" id="review" value={content} onChange={e => setContent(e.target.value)}></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={() => post_comments()} >Save changes</button>
      </div>
    </div>
  </div>
</div>
  </section>

  );
};

export default Chat;
