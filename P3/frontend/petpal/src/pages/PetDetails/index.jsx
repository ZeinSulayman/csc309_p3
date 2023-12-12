import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import fetchApps from '../Applications/index'
const PetDetail = () => {
  const [canApply, setCanApply] = useState(false);
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [shelter, setShelter] = useState(null);
  const [viewAppId, setViewAppId] = useState('');

  useEffect(() => {
    const checkCanApply = async () => {
      try {
        const paramsWithdrawn = new URLSearchParams();
        paramsWithdrawn.append('status', 'withdrawn');
        paramsWithdrawn.append('pet', petId);

        const url_withdrawn = `http://127.0.0.1:8000/shelter/applications/?${paramsWithdrawn.toString()}`;

        const appsWithdrawnResponse = await fetch(url_withdrawn, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const appWithdrawnData = await appsWithdrawnResponse.json();

        const params = new URLSearchParams();
        params.append('pet', petId);

        const url = `http://127.0.0.1:8000/shelter/applications/?${params.toString()}`;

        const appsResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const appData = await appsResponse.json();

        console.log(appData)
        console.log(appWithdrawnData)

        if (appData.count === appWithdrawnData.count) {
          setCanApply(true);
        } else {
          appData.results.forEach(app => {
            if (app.status !== "withdrawn") {
              // Found an application with a status other than "withdrawn"
              // Store its id
              setViewAppId(app.id);

            }
          });
        }

      } catch (error) {
        console.log("Error fetching applications")
      }
    }

    const fetchPetAndShelter = async () => {
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
        console.log(petData.owner)
        // Fetch shelter details using the foreign key
        const shelterResponse = await fetch(`http://127.0.0.1:8000/shelter/${petData.owner}/`, {
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
    checkCanApply();
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
                <strong>{shelter.shelter_name}</strong>
              </div>
              <button className="btn btn-primary mb-2" onClick={() => window.location.href = `/shelter/${pet.owner}`}>
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
          {canApply ? (
              <button className="btn btn-primary" onClick={() => window.location.href = `/pets/${petId}/application`}>
               Submit an Application to Adopt
              </button>
          ) : (
              <button className="btn btn-primary" onClick={() => window.location.href = `/application-view/${viewAppId}`}>
               View latest application
              </button>
          )}
        </div>
      </div>
    </section>
    </div>
  );
};

export default PetDetail;