import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import '../../App.css'; // Import the CSS file

function EditShelterAccount(props){
    const [loc, setLoc] = useState('');
    const [bio, setBio] = useState('');
    const [num, setNum] = useState('');
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');

    const submit = async (e) => {
     e.preventDefault();
        const seek = {
            location: loc,
            description: bio,
            phone_num: num,
            shelter_name: name,
            website: website,
        };
        try {
            // Create the POST request using the fetch API
            const response = await fetch('http://127.0.0.1:8000/newuser/shelter/', {
                method: 'POST',
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



///need to change to form so that that the reuqried feields are actaully required
    return <> <section>
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-4">
                <div class="card h-100">
                    <form action="./shelter-manage.html" onSubmit={submit}>
                        <div class="card-body text-center">
                            <img src="./img/shelter-logo.png" alt="avatar"
                                 class="rounded-circle img-fluid" style={{width: "150px"}}></img>
                                <input style={{ width: '100%', textAlign: 'center', border: '0px' }} type="text" class="my-3" style={{ width: '100%', border: '0px', textAlign: 'center', fontSize: '1.25rem', fontWeight: 500 }} value={name} onChange={e => setName(e.target.value)} required></input>
                            <input type="text" class="text-muted mb-4" value={loc} onChange={e => setLoc(e.target.value)} required></input>
                            <div class="d-flex justify-content-center mb-2">
                                <button type="button" class="btn btn-primary">Follow</button>
                                <button type="button" class="btn btn-outline-primary ms-1">Message</button>
                            </div>
                            <h6 class="mt-4 text-left">Description:</h6>
                            <textarea style={{ width: '100%', textAlign: 'center', border: '0px', wordWrap: 'normal' }} rows="2" class="mb-2" id value={bio} onChange={e => setBio(e.target.value)} required></textarea>
                        </div>
                        <div class="align-self-end mx-3" style={{ width: '100%', textAlign: 'right' }}>
                            <input type="submit" style={{ marginBottom: '10px', marginRight: '30px' }} class="btn btn-outline-success" value="Save" ></input>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="row"    >
                            <div class="col-sm-3">
                                <p class="mb-0">Shelter Name</p>
                            </div>
                            <div class="col-sm-9">
                                <input style={{ width: '70%', border: '0px' }} type="text" class="text-muted mb-0"  value={name} onChange={e => setName(e.target.value)}></input>
                            </div>
                        </div>
                 <hr></hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Email</p>
                            </div>
                            <div class="col-sm-9">
                                <input style={{ width: '70%', border: '0px' }} type="text" class="text-muted mb-0" value="animal@shelter.com"></input>
                            </div>
                        </div>
<hr></hr>
                     <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Website</p>
                            </div>
                            <div class="col-sm-9">
                                <input style={{ width: '70%', border: '0px' }} type="text" class="text-muted mb-0" value={website} onChange={e => setWebsite(e.target.value)}></input>
                            </div>
                        </div>
<hr></hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Phone</p>
                            </div>
                            <div class="col-sm-9">
                                <input style={{ width: '70%', border: '0px' }} type="text" class="text-muted mb-0" value={num} onChange={e => setNum(e.target.value)}></input>
                            </div>
                        </div>
<hr></hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Address</p>
                            </div>
                            <div class="col-sm-9">
                                <input style={{ width: '70%', border: '0px' }} type="text" class="text-muted mb-0" value={loc} onChange={e => setLoc(e.target.value)}></input>
                            </div>
                        </div>
<hr></hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Manager Name</p>
                            </div>
                            <div class="col-sm-9">
                                <input style={{ width: '70%', border: '0px' }} type="text" class="text-muted mb-0" value="Smith Don"></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="pb-5">
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
  </section>

<div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

export default EditShelterAccount;