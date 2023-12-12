import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
const PetDetail = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [shelter, setShelter] = useState(null);
  useEffect(() => {
    const fetchPetAndShelter = async () => {
      try {
        // Fetch pet details
        const petResponse = await fetch(`https://1208-52-14-206-42.ngrok-free.app/pets/details/${petId}/`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
            });
        const petData = await petResponse.json();
        setPet(petData);
        console.log(petData.owner)
        // Fetch shelter details using the foreign key
        const shelterResponse = await fetch(`https://1208-52-14-206-42.ngrok-free.app/shelter/${petData.owner}/`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
            });
        const shelterData = await shelterResponse.json();
        setShelter(shelterData);
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchPetAndShelter();
  }, [petId]);

  if (!pet || !shelter) {
    return <p>Loading...</p>;
  }

//   return (
//     <div>
//       <h1>{pet.name}'s Details</h1>
//       <p>Breed: {pet.breed}</p>
//       <p>Gender: {pet.gender}</p>
//       {/* Display shelter information */}
//       <p>Shelter: {shelter.name}</p>
//       <p>Location: {shelter.location}</p>
//       {/* Add more details as needed */}
//     </div>
//   );
return(
<div>
<section className='detail'>
      <div className="container pt-3">
        <div className="d-flex justify-content-between">
          <h1>{pet.name}</h1>
          {/* Uncomment the button below if needed */}
          {/* <button type="button" className="btn btn-success">Available</button> */}
        </div>
        <div id="carouselExampleCaptions" className="carousel slide col-md-9" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {/* Add carousel indicators if needed */}
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={pet.pic}
                className="d-block w-100"
              />
            </div>
            {/* Add more carousel items as needed */}
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="container text-center p-5 col-md-9">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <i className="bi bi-house"></i> Current Shelter
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>{shelter.shelter_name}, Rating: </strong> 4.2/5
              </div>
              <button className="btn btn-primary mb-2" onClick={() => window.location.href = 'shelter.html'}>
                Learn More
              </button>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <i className="fa-solid fa-paw"></i>Pet Information
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body d-flex justify-content-center">
                <div className="row g-4">
                  {/* Card 1 */}
                  <div className="col-lg-6 col-md-12">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">{pet.name}</h5>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item"><strong>Location:</strong> {pet.location}</li>
                          <li className="list-group-item"><strong>Gender:</strong> {pet.gender}</li>
                          <li className="list-group-item"><strong>Age:</strong> {pet.age}</li>
                          <li className="list-group-item"><strong>Size:</strong> {pet.size}</li>
                          <li className="list-group-item"><strong>Breed:</strong> {pet.breed}</li>
                          <li className="list-group-item"><strong>Color:</strong> {pet.color}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="col-lg-6 col-md-12">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Description</h5>
                        <p>
                            {pet.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="btn btn-primary" onClick={() => window.location.href = `/pets/${petId}/application`}>
            Submit an Application to Adopt
          </button>
        </div>
      </div>
    </section>
    </div>
  );
};

export default PetDetail;