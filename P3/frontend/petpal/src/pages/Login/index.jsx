import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);


const submit = async (e) => {
    //e.preventDefault();

    const user = {
        username: username,
        password: password,
    };

    try {
        // Create the POST request using the fetch API
        const response = await fetch('http://127.0.0.1:8000/api/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        // Check if the request was successful (status code in the range 200-299)
        if (response.ok) {
            const data = await response.json();
            // Initialize the access & refresh token in localstorage.
             localStorage.clear();
             localStorage.setItem('access_token', data.access);
             localStorage.setItem('refresh_token', data.refresh);
             window.location.href = '/'
            // Initialize the access & refresh token in localstorage.
        } else {
            // Handle error responses
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        // Handle network errors
        console.error('Network error:', error.message);
    }
};

    //const [query, setQuery] = useState({search: "", page: 1});

    /*useEffect(() => {


    // Example payload for the POST request
    const postData = {

    "username": "b",
    "password": "123"

    };

    // Fetch options for a POST request
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // You can add other headers as needed
        },
        body: JSON.stringify(postData),
    };

    fetch('http://127.0.0.1:8000/api/user/', requestOptions)
        .then(response => response.json()
        )
        .then(json => {
            console.log('hi')
            //setPlayers(json.data);
            //setTotalPages(json.meta.total_pages);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
    }, [query]);*/

  return ( <section class="vh-100" style={{backgroundColor: "#eee;"}}>
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black" style={{borderRadius: "25px;"}}>
                <div class="card-body p-md-5">
                    <ul class="nav nav-tabs" style={{position:"static; justify-content: center;"}}>
                        <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="newuser">Sign-up</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link active" href="login.html">Login</a>
                        </li>
                    </ul>
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                      <form class="mx-1 mx-md-4" onSubmit={submit}>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input  id="form3Example3c" class="form-control" value={username}
                required
                onChange={e => setUsername(e.target.value)}/>
                            <label class="form-label" for="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" class="form-control" value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
                            <label class="form-label" for="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" class="btn btn-primary btn-lg">Login In</button>
                        </div>
                      </form>

                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://jankrepl.github.io/assets/images/symbolic_regression/main_files/cute-dog-transparent-background.png"
                        class="img-fluid"></img>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Login;
