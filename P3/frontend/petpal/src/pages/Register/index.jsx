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
     const [error, setError] = useState(null);


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
            const response = await fetch('http://3.16.23.69:8000/api/newuser/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                const data = await response.json();
                setPassword(data.password)
                //setUsername(data.access)
                // Initialize the access & refresh token in localstorage.
                 localStorage.clear();
                 localStorage.setItem('access_token', data.access);
                 localStorage.setItem('refresh_token', data.refresh);
                 localStorage.setItem('shelter', shelter);
                 submit2();
                // Initialize the access & refresh token in localstorage.
            } else {
                // Handle error responses
                const data = await response.json();
                const usernameError = data.username;
                console.error('Username Error:', usernameError);
                setError(usernameError);
                const p2Error = data.password2;
                if (p2Error){setError(p2Error);}
                console.error('Username Error:', p2Error);
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };



const submit2 = async (e) => {
    //e.preventDefault();

    const user = {
        username: username,
        password: password,
    };

    try {
        // Create the POST request using the fetch API
        const response = await fetch('http://3.16.23.69:8000/api/user/', {
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
             localStorage.setItem('shelter', shelter);
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
        <div className="container p-3">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: "25px;"}}>
                <div className="card-body p-md-5">
                    <ul className="nav nav-tabs" style={{position:"static", justifyContent: "center"}}>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page">Sign-up</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/api/user">Login</a>
                        </li>
                    </ul>
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form class="mx-1 mx-md-4" onSubmit={submit}>
                        {/* Display the error message if there is one */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" required value={username} onChange={e => setUsername(e.target.value)}/>
                            <label className="form-label" htmlFor="form3Example1c" >Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" required value={email} onChange={e => setEmail(e.target.value)}/>
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" required value={password} onChange={e => setPassword(e.target.value)}/>
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4cd" className="form-control" required value={password2} onChange={e => setPassword2(e.target.value)}/>
                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <select className="form-select" id="validationCustom04" required   value={seeker ? "Seeker" : shelter ? "Shelter" : ""}
  onChange={(e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue === "Shelter")
    setSeeker(selectedValue === "Seeker");
    setShelter(selectedValue === "Shelter");
  }}>
                              <option selected disabled value="">Choose...</option>
                              <option>Shelter</option>
                              <option>Seeker</option>
                            </select>
                            <div className="invalid-feedback">
                              Please select an account type.
                            </div>
                            <label htmlFor="validationCustom04" className="form-label">Account type</label>
                            </div>
                          </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" required/>
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://static.vecteezy.com/system/resources/previews/018/871/715/original/happy-cat-transparent-background-png.png"
                        className="img-fluid" alt={"happy cat"}></img>

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