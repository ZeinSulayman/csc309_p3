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
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
      };
  if (!applications.results || !Array.isArray(applications.results)) {
    return(<p>Loading...</p>)
  }
return (
<div>
    <section>
              <div className="container pt-4">
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <div className="row">
                    <div className="mb-3 mb-md-0">
                    <div style={{width:'105%'}} class="d-flex">

          <select style={{width:'100%'}} className="form-control me-2" name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="" >Select Status</option>
            <option value="pending" >Pending</option>
            <option value="accepted" >Accepted</option>
            <option value="denied" >Denied</option>
            <option value="withdrawn" >Withdrawn</option>
          </select>
          </div>

                          </div>
                  </div>

                  <div className="w-100 d-md-none d-block m-3"></div>

                  <div className="row justify-content-end">
                    <div style={{ marginLeft: '5px', marginBottom: '5px' }} className="col-md-auto">
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          style={{ backgroundColor: '#2659F4', borderColor: '#2659F4' }}
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Sort
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                          <button style={{ paddingRight: '20px' }} className="dropdown-item" value="date_created" onClick={() => handleFilterChange({ target: { name: 'sort', value: 'age' } })}>
                              Sort by Date Created
                            </button>
                          </li>
                          <li>
                          <button style={{ paddingRight: '20px' }} className="dropdown-item" value="-last_modified" onClick={() => handleFilterChange({ target: { name: 'sort', value: 'name' } })}>
                              Sort by Last Modified
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>


                    <div style={{ marginLeft: '5px', marginBottom: '5px' }} className="col-md-auto">
                      <a className="btn btn-outline-success" href="../finder/">
                        Reset Filter/Sort
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          </section>
    <main className="container mt-5">
      <h2 className="title">Adoption Applications</h2>

      <div className="row">
        {applications.results.map((application) => (
                  <div key={application.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100">
                      <img
                        src={application.pet_pic}
                        style={{ height: '50%' }}
                        alt="Pet Image"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 style={{paddingBottom:'10'}}className="card-title">Pet Name: {application.pet_name}</h5>
                        <p style={{marginBottom:'2px'}} className="card-text">Shelter: {application.shelter_name}</p>
                        <p className="card-text">Applicant: {application.first_name} {application.last_name}</p>
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
                            >
                              <a style={{color:'white', textDecoration:'None'}} href='/'>View Application</a>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}


      </div>
      <div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: page - 1 } })}>Previous</button></li>
                    <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: page + 1 } })}>Next</button></li>
                  </ul>
                </nav>
              </div>
    </main>

    </div>
  );
};

    export default Applications;
