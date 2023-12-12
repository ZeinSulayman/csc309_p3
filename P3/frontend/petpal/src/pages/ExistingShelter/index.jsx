import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import '../../App.css'; // Import the CSS file
import Map from "../../components/Map/index";
import {setKey} from "react-geocode";
import CommentList from '../../components/Comments/index'

function ShelterAccount(props){
    const [loc, setLoc] = useState('');
    const [bio, setBio] = useState('');
    const [num, setNum] = useState('');
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [pic, setPic] = useState('');
    const [comments, setCom] = useState([]);

    /*const comments = [
    { author: 'John Doglover', title: 'This place is good', content: 'This is a positive review', rating: 4.5 },
    { author: 'Jack Doghater', title: 'This place stinks', content: 'This is a negative review', rating: 1.0 },
    { author: 'Norm Normalson', title: 'Solid place for pets', content: 'This is a mediocre review', rating: 3.0 },
    // Add more comments as needed
    ];*/

    setKey("AIzaSyDcX3F3pRrsiSNM-Ccda0G-a9ZD_BdCpvk");

    const submit = async (e) => {
     //e.preventDefault();
        const seek = {
            location: loc,
            description: bio,
            phone_num: num,
            shelter_name: name,
            website: website,
        };
        try {
            // Create the POST request using the fetch API
            const response = await fetch('http://127.0.0.1:8000/shelter/', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(seek),
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                const data = await response.json();
                //console.log(localStorage.getItem('access_token'));
            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

    const get_shelter = async (e) => {
        const seek = {
            location: loc,
            description: bio,
            phone_num: num,
            shelter_name: name,
            website: website,
        };
        try {
            // Create the POST request using the fetch API
            const response = await fetch('http://127.0.0.1:8000/shelter/', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                const data = await response.json();
                setName(data.shelter_name)
                setLoc(data.location)
                setBio(data.description)
                setNum(data.phone_num)
                setWebsite(data.website)
                setPic(data.pic)
                //console.log(data)
                get_comments(data.shelter_id);
            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

    const get_comments = async (e) => {
        try {
            // Create the POST request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/shelters/${e}/comments/`, {
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

    const del = async (e) => {
        try {
            // Create the POST request using the fetch API
            const response = await fetch('http://3.16.23.69:8000/shelter/', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                //const data = await response.json();
                del2();
                 localStorage.clear();
                window.location.href = '/'
            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

    const del2 = async (e) => {
        try {
            // Create the POST request using the fetch API
            const response = await fetch('https://1208-52-14-206-42.ngrok-free.app/user/', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                //const data = await response.json();
                localStorage.clear();
                window.location.href = '/'
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
        get_shelter();
   }, []);


    return <> <section>
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-4">
                <div class="card h-100">
                    <form onSubmit={submit}>
                        <div class="card-body text-center">
                            <img src={pic} alt="avatar"
                                 class="rounded-circle img-fluid" style={{width: "150px"}}></img>
                                <input style={{ width: '100%', textAlign: 'center', border: '0px' }} type="text" class="my-3" style={{ width: '100%', border: '0px', textAlign: 'center', fontSize: '1.25rem', fontWeight: 500 }} value={name} onChange={e => setName(e.target.value)} required></input>
                            <input style={{ width: '100%', textAlign: 'center', border: '0px' }} type="text" class="text-muted mb-4" value={loc} onChange={e => setLoc(e.target.value)} required></input>
                            <div class="d-flex justify-content-center mb-2">
                                <button type="button" class="btn btn-primary">Follow</button>
                                <button type="button" class="btn btn-outline-primary ms-1">Message</button>
                            </div>
                            <h6 class="mt-4 text-left">Description:</h6>
                            <textarea style={{ width: '100%', textAlign: 'center', border: '0px', wordWrap: 'normal' }} rows="2" class="mb-2" id value={bio} onChange={e => setBio(e.target.value)} required></textarea>
                        </div>
                        <div class="align-self-end mx-3" style={{ width: '100%', textAlign: 'right' }}>
                            <button type="button" style={{ marginBottom: '10px', marginRight: '10px' }} class="btn btn-danger" onClick={() => del()} >Delete</button>
                            <input type="submit" style={{ marginBottom: '10px', marginRight: '30px' }} class="btn btn-outline-success" value="Save" ></input>

                        </div>
                    </form>
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
                                <input style={{ width: '70%', border: '0px' }} type="text" class="text-muted mb-0"  value={name} onChange={e => setName(e.target.value)}></input>
                            </div>
                        </div>
<hr style={{ padding: '15px'}}></hr>
                     <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Website</p>
                            </div>
                            <div class="col-sm-9">
                                <input style={{ width: '70%', border: '0px' }} type="text" class="text-muted mb-0" value={website} onChange={e => setWebsite(e.target.value)}></input>
                            </div>
                        </div>
<hr style={{ padding: '15px'}}></hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Phone</p>
                            </div>
                            <div class="col-sm-9">
                                <input style={{ width: '70%', border: '0px' }} type="text" class="text-muted mb-0" value={num} onChange={e => setNum(e.target.value)}></input>
                            </div>
                        </div>
<hr style={{ padding: '15px'}}></hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Address</p>
                            </div>
                            <div class="col-sm-9">
                                <input style={{ width: '70%', border: '0px' }} type="text" class="text-muted mb-0" value={loc} onChange={e => setLoc(e.target.value)}></input>
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
            <h4>Shelter Location</h4>
            <Map locations={[{address: loc, text: name}]}></Map>
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
        <textarea class="form-control" aria-label="With textarea" placeholder="Reply to review" id="review"></textarea>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</>
};

export default ShelterAccount;