//  export default PetList;
import { useContext, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
//import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const CreatePet = () => {
    const [pet, setPet] = useState(null);
        const { petId } = useParams();

    const [pic, setPic] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(0);
    const [size, setSize] = useState('small');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');


   useEffect(() => {
       const fetchPet = async () => {
         try {
           // Fetch pet details
           const petResponse = await fetch(`http://127.0.0.1:8000/pets/details/${petId}/`, {
                 method: 'GET',
                 headers: {
                   'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                 }
               });
           const petData = await petResponse.json();
           setPet(petData);

         } catch (error) {
           console.error('Error fetching pet details:', error);
         }
       };

       fetchPet();
     }, [petId]);
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
            const response = await fetch('http://127.0.0.1:8000/pets/${petId}/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              },
              body: JSON.stringify(pet),
            });

            const data = await response.json();
            console.log('Pet created successfully:', data);
            window.location.href = '/'
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
    if(!pet){
    return(<p>Loading...</p>);
    }
    return (<body>

    <section className="adoptapp-background">
      <div className="container centered">
        <div className="col-md-6">
          <h2 className="mb-4 text-center">
            <strong>Pet Edit Form</strong>
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
                    <input type="text" className="form-control" id="petName" required value={name} placeholder={pet.name} onChange={e => setName(e.target.value)}/>
                    <div className="invalid-feedback">Please provide a pet name.</div>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="petLocation" className="form-label">
                      <strong>Location</strong>
                    </label>
                    <input type="text" className="form-control" id="Location" required value={location} placeholder={pet.location} onChange={e => setLocation(e.target.value)}/>
                    <div className="invalid-feedback">Please provide a location.</div>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="gender" className="form-label">
                        <strong>Gender</strong>
                    </label>
                    <select className="form-select" id="gender" required value={gender} placeholder={pet.gender} onChange={e => setGender(e.target.value)}>
                    <option selected disabled value="">
                        Choose... ({pet.gender})
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
                    <input type="number" className="form-control" id="age" required value={age}  onChange={e => setAge(e.target.value)}/>
                    <div className="invalid-feedback">Please provide a valid age.</div>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="gender" className="form-label">
                        <strong>Size</strong>
                    </label>
                    <select className="form-select" id="size" required value={size} placeholder={pet.size} onChange={e => setSize(e.target.value)}>
                    <option selected disabled value="">
                        Choose... ({pet.size})
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
                    <input type="text" className="form-control" id="breed" required value={breed} placeholder={pet.breed} onChange={e => setBreed(e.target.value)}/>
                    <div className="invalid-feedback">Please provide a Breed.</div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="color" className="form-label">
                      <strong>Color</strong>
                    </label>
                    <input type="text" className="form-control" id="color" required value={color} placeholder={pet.color} onChange={e => setColor(e.target.value)}/>
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
                <textarea className="form-control mb-3" id="allergies1" rows="3" required value={description} placeholder={pet.description} onChange={e => setDescription(e.target.value)}></textarea>
              </div>
            </div>

<button type="submit" className="btn btn-primary mt-3">
              Edit Pet
            </button>
          </form>
        </div>
      </div>
    </section>





    </body>);
};

export default CreatePet;