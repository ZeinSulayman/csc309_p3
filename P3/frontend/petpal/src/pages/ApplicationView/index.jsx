// // PetList.jsx
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Applications = () => {
  let page = 1;
  const [applications, setApps] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    sort: '',
  });
  const [shelter, setShelter] = useState('');



  useEffect(() => {
    const fetchApps = async () => {
      const url = buildApiUrl();

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        console.log(data);
        setApps(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }

    }




    fetchApps();
  }, [filters]);// Trigger the effect whenever filters change
   const getInfo = async(petId) => {
   try {
                 // Fetch pet details
                 const petResponse = await fetch(`http://127.0.0.1:8000/pets/details/${petId}/`, {
                       method: 'GET',
                       headers: {
                         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                       }
                     });
                 const petData = await petResponse.json();
                 return(petData.name)
               } catch (error) {
                 console.error('Error fetching pet details:', error);
               }

               }
  // Function to build API URL with filters
  const buildApiUrl = () => {
    const baseUrl = 'http://127.0.0.1:8000/shelter/applications/'; // Replace with your Django API endpoint
    const params = new URLSearchParams();

    if (filters.status)  {
      params.append('status', filters.status);
    }
    if (filters.sort) {
      params.append('sort', filters.sort);
    }

    if(filters.page){
      if(filters.page > 0 && applications.count >= (filters.page-1)*10){
        page = filters.page
        params.append('page', filters.page);
      }
      else{
        params.append('page', page);
      }
    }

    // Combine base URL with parameters
    return `${baseUrl}?${params.toString()}`;
  };

  if (!applications.results || !Array.isArray(applications.results)) {
    return(<p>Loading...</p>)
  }
return (
<div>
    <main className="container mt-5">
      <h2 className="title">Adoption Applications</h2>

      <div className="row">
        {applications.results.map((application) => (
                  <div key={application.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100">
                      <img
                        src={application.petImage}
                        style={{ height: '50%' }}
                        alt="Pet Image"
                        className="card-img-top"
                      />
                      <div className="card-body">
<h5 className="card-title">Pet Name: {}</h5>
                        <p className="card-text">Shelter: #{application.applications}</p>
                      </div>
                      <div className="card-footer">
                        <div className="row">
                          <div className="col-12 col-sm-4 text-warning d-flex align-items-center justify-content-center mb-2 mb-sm-0">
                            {application.status}
                          </div>
                          <div className="col-12 col-sm-4 d-flex justify-content-center mb-2 mb-sm-0">

                          </div>
                          <div className="col-12 col-sm-4 d-flex justify-content-center">
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#applicationModal"
                            >
                              <i className="fas fa-eye"></i> View Application
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}


      </div>
    </main>
    <div className="modal fade" id="applicationModal" tabIndex="-1" aria-labelledby="applicationModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="applicationModalLabel">Adoption Application</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container mt-5 mb-5">
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div className="card" style={{ backgroundColor: '#e6f7ff' }}>
                        <div className="card-body">
                          <h2 className="mb-4 text-center">Pet Adoption Application for Fredrick</h2>

                          <form>
                            {/* Applicant Information */}
                            <div className="text-center mb-3">
                              <img
                                src="https://www.williamwalker.de/cdn/shop/articles/friendsofwilliamwalker_BreedProfileYorkshireTerrier4zu3_1024x.jpg?v=1628603961"
                                alt="Pet Image"
                                className="img-fluid rounded-circle"
                                style={{ maxWidth: '150px' }}
                              />
                            </div>

                            <h5 className="text-center mb-4"><strong>Pet Name: </strong> Fredrick</h5>
                            <p className="text-center"><strong>Code: </strong> #12345</p>

                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <strong><label htmlFor="name" className="form-label">Name</label></strong>
                                <div className="input-group">
                                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                                  <input type="text" className="form-control bg-light" id="firstName" value="Mert" readOnly />
                                </div>
                              </div>

                              <div className="col-md-6 mb-3">
                                <strong><label htmlFor="surname" className="form-label">Surname</label></strong>
                                <div className="input-group">
                                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                                  <input type="text" className="form-control bg-light" id="surname" value="Akin" readOnly />
                                </div>
                              </div>
                            </div>

                            <strong><label htmlFor="age" className="form-label">Date of Birth</label></strong>
                            <div className="mb-3 input-group">
                              <span className="input-group-text"><i className="fas fa-birthday-cake"></i></span>
                              <input type="number" className="form-control bg-light" id="age" value="21" readOnly />
                            </div>

                            {/* Add the rest of the form elements here */}

                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

    export default Applications;
