import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
//import { UserContext } from '../../contexts/UserContext';
import { useUser } from '../../contexts/UserContext';


function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    //const { user, updateUser } = useContext(UserContext);
      const { user, updateUser } = useUser();
    //console.log(user)
    const handleUpdateUser = () => {
    updateUser({ id: 1, name: 'John Doe', seeker: true });
  };


const submit = async (e) => {
    e.preventDefault();

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
             await getUser();
             //window.location.href = '/'
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

const getUser = async (e) => {
    //e.preventDefault();
    try {
        const response = await fetch('http://127.0.0.1:8000/user/', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            }
            );
        // Check if the request was successful (status code in the range 200-299)
        if (response.ok) {
            const data = await response.json();
                console.log(data)
                const userInfo = { id: data['id'], name: data['username'], seeker: data['is_pet_seeker']};
                updateUser(userInfo);
                localStorage.setItem('shelter',data['is_pet_shelter']);
                handleUpdateUser();
                console.log(userInfo)
                window.location.href = '/'
            // Initialize the access & refresh token in localstorage.
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        // Handle network errors
        console.error('Network error:', error.message);
    }
};

  return ( <section className="vh-100" style={{backgroundColor: "#eee"}}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: "25px"}}>
                <div className="card-body p-md-5">
                    <ul className="nav nav-tabs" style={{position:"static; justify-content: center"}}>
                        <li className="nav-item">
                          <a className="nav-link" aria-current="page" href="/api/newuser">Sign-up</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link active">Login</a>
                        </li>
                    </ul>
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                      <form className="mx-1 mx-md-4" onSubmit={submit}>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input  id="form3Example3c" className="form-control" value={username}
                required
                onChange={e => setUsername(e.target.value)}/>
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Login</button>
                        </div>
                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://jankrepl.github.io/assets/images/symbolic_regression/main_files/cute-dog-transparent-background.png"
                        className="img-fluid" alt={"cute dog"}></img>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}

export default Login;
