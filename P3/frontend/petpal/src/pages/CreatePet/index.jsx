//  export default PetList;
import { useContext, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
//import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const CreatePet = () => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(0);
    const [size, setSize] = useState('small');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
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
        e.preventDefault();
        const pet = {
            name: name,
            location: location,
            gender: gender,
            age: age,
            size: size,
            breed: breed,
            color: color,
            description: description
        };
        const petFormData = new FormData();

        petFormData.append('pic', file);
        petFormData.append('name', name);
        petFormData.append('location', location);
        petFormData.append('gender', gender);
        petFormData.append('age', age);
        petFormData.append('size', size);
        petFormData.append('breed', breed);
        petFormData.append('color', color);
        petFormData.append('description', description);

        try {
            console.log(pet);
            const response = await fetch('https://1208-52-14-206-42.ngrok-free.app/pets/newpet/', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              },
              //body: JSON.stringify(pet),
               body: petFormData,

            });

            const data = await response.json();
            console.log('Pet created successfully:', data);
//              window.location.href = '/pets/manage/'

            // You can redirect to the pet list page or perform other actions here
          } catch (error) {
            console.error('Error creating pet:', error);
          }
        };


    return (<body>

    <section className="adoptapp-background">
      <div className="container centered">
        <div className="col-md-6">
          <h2 className="mb-4 text-center">
            <strong>Pet Creation Form</strong>
          </h2>

          <form className="row g-3 needs-validation" onSubmit={submit}>
            <div className="card">
              <div className="card-body">
                <h5>
                  <strong>General Information</strong>
                </h5>
                <div className="mb-3">
                    <div className="mb-3">
                    <label class="form-label fw-bold">Pet Images:</label>


                                                    <div class="row mb-2">
                                                        <div class="col-12">
                                                            <input type="file" accept="image/*" className="form-control" onChange={handleFileChange}></input>
                                                        </div>
                                                    </div>

                                                    <p class="my-2">Current Photo:</p>
                                                   <img src={pic} class="mt-2" style={{ border: '1px solid black', borderRadius: '5px', maxWidth: '100%' }}></img>
                  <div className="col-md-12">
                    <label htmlFor="petName" className="form-label">
                      <strong>Pet Name</strong>
                    </label>
                    <input type="text" className="form-control" id="petName" required value={name} onChange={e => setName(e.target.value)}/>
                    <div className="invalid-feedback">Please provide a pet name.</div>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="petLocation" className="form-label">
                      <strong>Location</strong>
                    </label>
                    <input type="text" className="form-control" id="Location" required value={location} onChange={e => setLocation(e.target.value)}/>
                    <div className="invalid-feedback">Please provide a location.</div>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="gender" className="form-label">
                        <strong>Gender</strong>
                    </label>
                    <select className="form-select" id="gender" required value={gender} onChange={e => setGender(e.target.value)}>
                    <option selected disabled value="">
                        Choose...
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <div className="invalid-feedback">Please provide a gender.</div>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="age" className="form-label">
                      <strong>Age</strong>
                    </label>
                    <input type="number" className="form-control" id="age" required value={age} onChange={e => setAge(e.target.value)}/>
                    <div className="invalid-feedback">Please provide a valid age.</div>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="gender" className="form-label">
                        <strong>Size</strong>
                    </label>
                    <select className="form-select" id="size" required value={size} onChange={e => setSize(e.target.value)}>
                    <option selected disabled value="">
                        Choose...
                        </option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                    <div className="invalid-feedback">Please provide a gender.</div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="Breed" className="form-label">
                      <strong>Breed</strong>
                    </label>
                    <input type="text" className="form-control" id="breed" required value={breed} onChange={e => setBreed(e.target.value)}/>
                    <div className="invalid-feedback">Please provide a Breed.</div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="color" className="form-label">
                      <strong>Color</strong>
                    </label>
                    <input type="text" className="form-control" id="color" required value={color} onChange={e => setColor(e.target.value)}/>
                    <div className="invalid-feedback">Please provide a Color.</div>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5>
                  <strong>Description</strong>
                </h5>
                <textarea className="form-control mb-3" id="allergies1" rows="3" required value={description} onChange={e => setDescription(e.target.value)}></textarea>
              </div>

            </div>

            <button type="submit" className="btn btn-primary mt-3" >
              Create Pet
            </button>
          </form>
        </div>
      </div>
    </section>





    </body>);
};

export default CreatePet;