import { useContext, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
//import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [seeker, setSeeker] = useState(false);
    const [shelter, setShelter] = useState(false);


   const submit = async (e) => {
        e.preventDefault();

        const user = {
            username: username,
            email:email,
            password: password,
            password2:password2,
            is_pet_seeker: seeker,
            is_pet_shelter: shelter
        };

        try {
            // Create the POST request using the fetch API
            const response = await fetch('http://127.0.0.1:8000/api/newuser/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                const data = await response.json();
                setUsername(data.access)
                // Initialize the access & refresh token in localstorage.
                 localStorage.clear();
                 localStorage.setItem('access_token', data.access);
                 localStorage.setItem('refresh_token', data.refresh);

                 if (seeker){
                     window.location.href = '/newuser/seeker'
                 }else{
                    window.location.href = '/newuser/shelter'
                 }
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




    return (<body style={{backgroundColor: "#eee;"}}>
    <section>
        <div class="container p-3">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black" style={{borderRadius: "25px;"}}>
                <div class="card-body p-md-5">
                    <ul class="nav nav-tabs" style={{position:"static", justifyContent: "center"}}>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="signup.html">Sign-up</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="user">Login</a>
                        </li>
                    </ul>
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form class="mx-1 mx-md-4" onSubmit={submit}>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" class="form-control" required value={username} onChange={e => setUsername(e.target.value)}/>
                            <label class="form-label" for="form3Example1c" >Your Name</label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" class="form-control" required value={email} onChange={e => setEmail(e.target.value)}/>
                            <label class="form-label" for="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" class="form-control" required value={password} onChange={e => setPassword(e.target.value)}/>
                            <label class="form-label" for="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4cd" class="form-control" required value={password2} onChange={e => setPassword2(e.target.value)}/>
                            <label class="form-label" for="form3Example4cd">Repeat your password</label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <select class="form-select" id="validationCustom04" required   value={seeker ? "Seeker" : shelter ? "Shelter" : ""}
  onChange={(e) => {
    const selectedValue = e.target.value;
    setSeeker(selectedValue === "Seeker");
    setShelter(selectedValue === "Shelter");
  }}>
                              <option selected disabled value="">Choose...</option>
                              <option>Shelter</option>
                              <option>Seeker</option>
                            </select>
                            <div class="invalid-feedback">
                              Please select an account type.
                            </div>
                            <label for="validationCustom04" class="form-label">Account type</label>
                            </div>
                          </div>

                        <div class="form-check d-flex justify-content-center mb-5">
                          <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" required/>
                          <label class="form-check-label" for="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" class="btn btn-primary btn-lg">Register</button>
                        </div>

                      </form>

                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://static.vecteezy.com/system/resources/previews/018/871/715/original/happy-cat-transparent-background-png.png"
                        class="img-fluid"></img>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>);
};

export default Register;
/*
import { useState, useEffect } from "react";
import Table from "./Table";

function Players() {
    const [query, setQuery] = useState({search: "", page: 1});
    const [totalPages, setTotalPages] = useState(1);
    const [ players, setPlayers ] = useState([]);
    const [random, setRand] = useState('');

    useEffect(() => {
        const {search, page} = query;
        //fetch(`http://127.0.0.1:8000/shelters/`)
        fetch('http://127.0.0.1:8000/shelters/', {
            method: 'get',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }),
            //body: 'A=1&B=2'
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            setRand(json.results[0].location)
            //setPlayers(json.data);
            //setTotalPages(json.meta.total_pages);
        });
    }, [query]);

    return <>
        <p>
            <label>Search Player Name:
                <input
                    value={query.search}
                    onChange={event => setQuery({search: event.target.value, page: 1})}
                />
            </label>
        </p>
        <label>
        Username:
        <input
          value={random}
        />
      </label>
        <Table players={players} />
        <p>
        { query.page < totalPages
          ? <button onClick={() => setQuery({...query, page: query.page + 1})}>Next</button>
          : <></> }
        { query.page > 1
          ? <button onClick={() => setQuery({...query, page: query.page - 1})}>Previous</button>
          : <></> }
        </p>
        <p>Page {query.page} out of {totalPages}.</p>
    </>;
}

export default Players;*/