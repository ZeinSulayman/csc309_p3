import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";

function SeekerAccount(props){
    const [loc, setLoc] = useState('');
    const [bio, setBio] = useState('');
    const [num, setNum] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = () => {
    // Your submission logic here

    // Show the success modal after successful submission
    setShowSuccessModal(true);
    };

  const handleCloseSuccessModal = () => {
    // Close the success modal
    setShowSuccessModal(false);
  };

    const submit = async (e) => {
        const seek = {
            location: loc,
            bio: bio,
            phone_num: num,
        };
        try {
            // Create the POST request using the fetch API
            const response = await fetch('http://127.0.0.1:8000/seeker/', {
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
                submit2();
            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

    const submit2 = async (e) => {
        const seek = {
            username: name,
            email: email,
        };
        try {
            // Create the POST request using the fetch API
            const response = await fetch('http://127.0.0.1:8000/user/', {
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
                handleSubmit();
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


    useEffect(() => {
         fetch('http://127.0.0.1:8000/seeker/', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },}
                )
        .then(response => response.json())
        .then(json => {
            console.log(json);
            setBio(json['bio'])
            setNum(json['phone_num'])
            setLoc(json['location'])
        });
         fetch('http://127.0.0.1:8000/user/', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },}
                )
        .then(response => response.json())
        .then(json => {
            console.log(json);
            setName(json['username'])
            setEmail(json['email'])
        });
    }, []);

return( <section>
        <section>
      <div class="modal fade" id="sucModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Alert</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Save Successful
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="h-100 gradient-custom-2">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
                    <div class="card" style={{ overflowY: 'auto', maxHeight: '90vh' }}>
                        <h2 class="px-4 pt-4 font-weight-bold">Edit Profile</h2>
                        <hr></hr>
                        <div class="card-body">
                          <div class="row mb-3">
                            <label class="col-sm-3 col-form-label"><strong>Background Color</strong></label>
                            <div class="col-sm-9">
                                <input type="color" value="#5f9ea0"></input>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="col-sm-3 col-form-label"><strong>Profile Picture</strong></label>
                            <div class="col-sm-9">
                                <input type="file"></input>
                                <p class="my-2">Current Photo:</p>
                                <img src="img/user.jpeg" class="mt-2" style={{ border: '1px solid black', borderRadius: '5px', maxWidth: '100%' }}></img>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="col-sm-3 col-form-label"><strong>Username</strong></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control-plaintext" value={name} onChange={e => setName(e.target.value)}></input>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="col-sm-3 col-form-label"><strong>Email</strong></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control-plaintext" value={email} onChange={e => setEmail(e.target.value)}></input>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="col-sm-3 col-form-label"><strong>Mobile</strong></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control-plaintext" value={num} onChange={e => setNum(e.target.value)}></input>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="col-sm-3 col-form-label"><strong>City</strong></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control-plaintext" value={loc} onChange={e => setLoc(e.target.value)}></input>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="col-sm-3 col-form-label"><strong>About</strong></label>
                            <div class="col-sm-9">
                                <textarea class="form-control" rows="3" value={bio} onChange={e => setBio(e.target.value)}></textarea>
                            </div>
                        </div>
                            <div class="d-flex justify-content-end">
                                <a class="btn btn-outline-success mb-3 mr-3" style={{cursor: 'pointer' }} onClick={() => submit()} data-bs-toggle="modal" data-bs-target="#sucModal">Save</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</section>

  )
};

export default SeekerAccount;
