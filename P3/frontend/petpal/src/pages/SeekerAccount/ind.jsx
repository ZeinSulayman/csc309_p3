import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";

function EditSeekerAccount(props){
    const [loc, setLoc] = useState('');
    const [bio, setBio] = useState('');
    const [num, setNum] = useState('');

    const submit = async (e) => {
        const seek = {
            location: loc,
            bio: bio,
            phone_num: num,
        };
        try {
            // Create the POST request using the fetch API
            const response = await fetch('http://127.0.0.1:8000/newuser/seeker/', {
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
    <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
                    <div className="card" style={{overflowY: "auto", maxHeight: "90vh"}}>
                        <h2 className="px-4 pt-4 font-weight-bold">Edit Profile</h2>

                        <div className="card-body">
                          <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><strong>Background Color</strong></label>
                            <div className="col-sm-9">
                                <input type="color" value="#5f9ea0"></input>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><strong>Profile Picture</strong></label>
                            <div className="col-sm-9">
                                <input type="file"></input>
                                <p className="my-2">Current Photo:</p>
                                <img src="img/user.jpeg" className="mt-2"  alt={"User image"}></img>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><strong>Username</strong></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control-plaintext" value="Petpal User"></input>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><strong>Email</strong></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control-plaintext" value="petpaluser@gmail.com"></input>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><strong>Mobile</strong></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control-plaintext" value={num} onChange={e => setNum(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><strong>Location</strong></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control-plaintext" value={loc} onChange={e => setLoc(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><strong>About</strong></label>
                            <div className="col-sm-9">
                                <textarea className="form-control" rows="3" value={bio} onChange={e => setBio(e.target.value)} required></textarea>
                            </div>
                        </div>
                            <div className="d-flex justify-content-end">
                                <a className="btn btn-outline-success mb-3 mr-3" href="/seeker" onClick={() => submit()}>Save</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</section>
</>
};

export default EditSeekerAccount;