import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";

function EditSeekerAccount(props){
    const [loc, setLoc] = useState('');
    const [bio, setBio] = useState('');
    const [num, setNum] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pic, setPic] = useState('');
    const [file,setFile] = useState(null);

    const handleFileChange = (e) => {
        const pic = e.target.files[0];
        setFile(pic)
        console.log(pic)
        if (pic) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPic(reader.result);
          };
          reader.readAsDataURL(pic);
        } else {
          setPic(null);
        }
    };


    const submit = async (e) => {
        const seek = {
            location: loc,
            bio: bio,
            phone_num: num,
        };

          const formData = new FormData();
    formData.append("phone_num", num);
    formData.append("location", loc);
    formData.append("bio", bio);
        formData.append("pic", file);
        try {
            // Create the POST request using the fetch API
            const response = await fetch('http://3.16.23.69:8000/newuser/seeker/', {
                method: 'POST',
                headers: {

                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                   body: formData,
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                const data = await response.json();
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
                        <div class="row mb-3">
                            <label class="col-sm-3 col-form-label"><strong>Profile Picture</strong></label>
                            <div class="col-sm-9">
                                <input type="file" accept="image/*" onChange={handleFileChange}></input>
                                <p class="my-2">Current Photo:</p>
                               <img src={pic} class="mt-2" style={{ border: '1px solid black', borderRadius: '5px', maxWidth: '100%' }}></img>
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
                            <div class="d-flex justify-content-end">
                                <a class="btn btn-outline-success mb-3 mr-3" onClick={() => submit()}>Save</a>
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