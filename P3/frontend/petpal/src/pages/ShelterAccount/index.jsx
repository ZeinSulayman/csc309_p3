import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import '../../App.css'; // Import the CSS file

function EditShelterAccount(props){

    const [file,setFile] = useState(null);
    const [loc, setLoc] = useState('');
    const [bio, setBio] = useState('');
    const [num, setNum] = useState('');
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
        const [pic, setPic] = useState('');
    const [comments, setCom] = useState([]);


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
     e.preventDefault();
        const seek = {
            location: loc,
            description: bio,
            phone_num: num,
            shelter_name: name,
            website: website,
        };
         const formData = new FormData();
        formData.append("phone_num", num);
        formData.append("location", loc);
        formData.append("description", bio);
    formData.append("shelter_name", name);
      formData.append("website", website);
        formData.append("pic", file);
        try {
            // Create the POST request using the fetch API
            const response = await fetch('https://three09-p3-backend.onrender.com/newuser/shelter/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                 body: formData,
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
                                                        <p class="my-2">Current Photo:</p>


                                <img src={pic} class="mt-2" style={{ border: '1px solid black', borderRadius: '5px', maxWidth: '100%' }}></img>
                                <input style={{ width: '100%', textAlign: 'center', border: '0px' }} type="text" class="my-3" style={{ width: '100%', border: '0px', textAlign: 'center', fontSize: '1.25rem', fontWeight: 500 }} value={name} onChange={e => setName(e.target.value)} required></input>

                                                    <div class="row mb-3">

                            <div class="col-sm-9">
                                <input type="file" accept="image/*" onChange={handleFileChange}></input>
                            </div>

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