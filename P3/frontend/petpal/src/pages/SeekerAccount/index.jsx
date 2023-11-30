import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";

function SeekerAccount(props){
    const [loc, setLoc] = useState('');
    const [bio, setBio] = useState('');
    const [num, setNum] = useState('');

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
        });
    }, []);

return( <section>
    <section class="h-100 gradient-custom-2">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-9 col-xl-7">
              <div class="card">
                <div class="rounded-top text-white d-flex flex-row" >
                  <div class="ms-4 mt-5 d-flex flex-column">
                    <img src="img/user.jpeg"
                      alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                      ></img>
                    <a type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                      href="seeker-account-editable.html">
                      Edit profile
                    </a>
                  </div>
                  <div class="ms-3" >
                    <h5>PetPal User</h5>
                    <p>Toronto</p>
                  </div>
                </div>
                <div class="p-4 text-black" >
                  <div class="d-flex justify-content-end text-center py-1">
                    <div>
                      <p class="mb-1 h5">4</p>
                      <p class="small text-muted mb-0">Adoptions</p>
                    </div>
                  </div>
                </div>
                <div class="card-body p-4 text-black">
                  <div class="mb-5">
                    <p class="lead fw-normal mb-1">About</p>
                    <div class="p-4" >
                      <p class="font-italic mb-1">{bio}</p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="lead fw-normal mb-0">Adopted on Petpal</p>
                  </div>
                  <div class="row g-2">
                    <div class="col mb-2">
                      <img src="img/beagle.webp"
                        alt="image 1" class="w-100 rounded-3"></img>
                    </div>
                    <div class="col mb-2">
                      <img src="img/yorkshire-terrier.webp"
                        alt="image 1" class="w-100 rounded-3"></img>
                    </div>
                  </div>
                  <div class="row g-2">
                    <div class="col">
                      <img src="img/bulldog.webp"
                        alt="image 1" class="w-100 rounded-3"></img>
                    </div>
                    <div class="col">
                      <img src="img/american-bobtail.webp"
                        alt="image 1" class="w-100 rounded-3"></img>
                    </div>
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
