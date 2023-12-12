import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import '../../App.css'; // Import the CSS file
import Map from "../../components/Map/index";
import {setKey} from "react-geocode";
import CommentList from '../../components/Comments/index'
import {useParams} from "react-router-dom";

function ViewShelter(){
    const [shelter, setShelter] = useState(null);
    const [comments, setComments] = useState(null)
    const [rating, setRating] = useState(-1);
    const [content, setContent] = useState("");

    const { shelterId } = useParams();

    setKey("AIzaSyDcX3F3pRrsiSNM-Ccda0G-a9ZD_BdCpvk");

    const fetchShelter = async () => {
        // Create the POST request using the fetch API
        const response = await fetch(`http://127.0.0.1:8000/shelter/${shelterId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
        });
        const shelterData = await response.json();
        setShelter(shelterData);
        get_comments(shelterId);
    };

    const get_comments = async (ID) => {
        try {
            // Create the POST request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/shelters/${ID}/comments/`, {
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
                setComments(data.results)
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

    const com = {
            content: "Hello",
            name:localStorage.getItem('name'),
            rating:5
        };
    const post_comments = async (e) => {
        try {
            // Create the POST request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/shelters/${shelterId}/comments/`, {
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
                setComments(data.results)
                console.log(data)
                window.location.reload();

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
        fetchShelter();
    }, [shelterId]);

    return shelter ? (<> <section>
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-4">
                <div class="card h-100">
                        <div class="card-body text-center">
                            <img src={shelter.pic} alt="avatar"
                                 class="rounded-circle img-fluid" style={{width: "150px"}}></img>
                                <p class="my-3" style={{ width: '100%', border: '0px', textAlign: 'center', fontSize: '1.25rem', fontWeight: 500 }} >{shelter.shelter_name}</p>
                            <p style={{ width: '100%', textAlign: 'center', border: '0px' }} class="text-muted mb-4">{shelter.location}</p>
                            <div class="d-flex justify-content-center mb-2">
                                <button type="button" class="btn btn-primary">Follow</button>
                                <button type="button" class="btn btn-outline-primary ms-1">Message</button>
                            </div>
                            <h6 class="mt-4 text-left">Description:</h6>
                            <p style={{ width: '100%', textAlign: 'center', border: '0px', wordWrap: 'normal' }} class="mb-2" >{shelter.description}</p>
                        </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="row" style={{ paddingTop: '15px'}}    >
                            <div class="col-sm-3">
                                <p class="mb-0">Shelter Name</p>
                            </div>
                            <div class="col-sm-9">
                                <p style={{ width: '70%', border: '0px' }} class="text-muted mb-0" >{shelter.shelter_name}</p>
                            </div>
                        </div>
<hr style={{ padding: '15px'}}></hr>
                     <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Website</p>
                            </div>
                            <div class="col-sm-9">
                                <p style={{ width: '70%', border: '0px' }} class="text-muted mb-0">{shelter.website}</p>
                            </div>
                        </div>
<hr style={{ padding: '15px'}}></hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Phone</p>
                            </div>
                            <div class="col-sm-9">
                                <p style={{ width: '70%', border: '0px' }}  class="text-muted mb-0" >{shelter.phone_num}</p>
                            </div>
                        </div>
<hr style={{ padding: '15px'}}></hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Address</p>
                            </div>
                            <div class="col-sm-9">
                                <p style={{ width: '70%', border: '0px' }} class="text-muted mb-0">{shelter.location}</p>
                            </div>
                        </div>
<hr style={{ padding: '15px'}}></hr>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{/*<section class="pb-5">
    <div class="container">
      <h4>Top Reviews:</h4>
      <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">John Doglover: This place is good</div>
            This is a positive review
          </div>
          <button type="button" class="btn btn-primary rounded-pill mx-2" data-bs-toggle="modal" data-bs-target="#Modal">Reply</button>
          <span class="badge bg-primary rounded-pill">4.5/5.0</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Jack Doghater: This place stinks</div>
            This is a negative review
          </div>
          <button type="button" class="btn btn-primary rounded-pill mx-2" data-bs-toggle="modal" data-bs-target="#Modal">Reply</button>
          <span class="badge bg-primary rounded-pill">1.0/5.0</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Norm Normalson: Solid place for pets</div>
            This is a mediocre review
          </div>
          <button type="button" class="btn btn-primary rounded-pill mx-2" data-bs-toggle="modal" data-bs-target="#Modal">Reply</button>
          <span class="badge bg-primary rounded-pill">3.0/5.0</span>
        </li>
      </ol>
    </div>
  </section>*/}

{comments ? (
        <CommentList comments={comments} />
      ) : (
        <p>Loading comments...</p> // You can render a loading message or anything else while comments are being fetched or initialized
   )}
    <section>
        <div className="container" style={{paddingBottom: "30px"}}>
            <h4>Shelter Location:</h4>
            <Map locations={[{address: shelter.location, text: shelter.shelter_name}]}></Map>
        </div>
    </section>

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
</> ) : (
  <p>Loading...</p>
);
}

export default ViewShelter;