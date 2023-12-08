//  export default PetList;
import { useContext, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
//import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const CreatePet = () => {
    const [pic, setPic] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(0);
    const [size, setSize] = useState('small');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');



   const submit = async (e) => {
        e.preventDefault();
        const pet = {
            pic: pic,
            name: name,
            location: location,
            gender: gender,
            age: age,
            size: size,
            breed: breed,
            color: color,
            description: description
        };
        console.log(pet.pic)

        try {
            console.log(pet);
            const response = await fetch('http://127.0.0.1:8000/pets/newpet/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              },
              body: JSON.stringify(pet),
            });

            const data = await response.json();
            console.log('Pet created successfully:', data);
            // You can redirect to the pet list page or perform other actions here
          } catch (error) {
            console.error('Error creating pet:', error);
          }
        };

        const handleFileChange = (event) => {

          // Check if a file was selected before accessing its properties
          if (event.target.files && event.target.files.length > 0) {
            setPic(event.target.files[0]);

            // You can perform further actions with the file, such as uploading it to a server.
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

            <button type="submit" className="btn btn-primary mt-3" href="../../finder/">
              Create Pet
            </button>
          </form>
        </div>
      </div>
    </section>





    </body>);
};

export default CreatePet;