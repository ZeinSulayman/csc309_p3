// // PetList.jsx
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Finder = () => {
  let page = 1;
  const [allPets, setAll] = useState([]);
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    breed: '',
    sort: '',
  });
 

  useEffect(() => {
    const fetchPets = async () => {
      const url = buildApiUrl();
      try {
        const allresponse = await fetch('http://127.0.0.1:8000/pets/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const aldata = await allresponse.json();
        setAll(aldata);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          } 
        });
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
  
    fetchPets();
  }, [filters]);// Trigger the effect whenever filters change

  // Function to build API URL with filters
  const buildApiUrl = () => {
    const baseUrl = 'http://127.0.0.1:8000/pets/'; // Replace with your Django API endpoint
    const params = new URLSearchParams();

    // Add filters to the URL parameters
    if (filters.location) {
      params.append('location', filters.location);
    }
    if (filters.breed)  {
      params.append('breed', filters.breed);
    }
    if (filters.size) {
      params.append('size', filters.size);
    }
    if (filters.status)  {
      params.append('status', filters.status);
    }
    if (filters.sort) {
      params.append('sort', filters.sort);
    }

    if(filters.page){
      if(filters.page > 0 && allPets.count >= (filters.page-1)*10){
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
 
  // Function to handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  if (!pets.results || !Array.isArray(pets.results) || !allPets.results || !Array.isArray(allPets.results)) {
    return( <div>
      <section>
          <div className="container pt-4">
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <div className="row">
                <div className="mb-3 mb-md-0">
                <div style={{width:'105%'}} class="d-flex">
                  <select className="form-control me-2" name="location" value={filters.location} onChange={handleFilterChange}>
        <option value="">Select Location</option>
      </select>
      <select style={{width:'85%'}} className="form-control me-2" name="breed" value={filters.breed} onChange={handleFilterChange}>
        <option value="" >Select Breed</option>
      </select>
      <select className="form-control me-2" name="size" value={filters.size} onChange={handleFilterChange}>
        <option value="" >Select Size</option>
        <option value="small" >Small</option>
        <option value="medium" >Medium</option>
        <option value="large" >Large</option>
      </select>
      <select style={{width:'85%'}} className="form-control me-2" name="status" value={filters.status} onChange={handleFilterChange}>
        <option value="" >Select Status</option>
        <option value="Available" >Available</option>
        <option value="Adopted" >Adopted</option>
        <option value="Pending" >Pending</option>
        <option value="Withdrawn" >Withdrawn</option>
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
                      <button style={{ paddingRight: '20px' }} className="dropdown-item" value="Age" onClick={() => handleFilterChange({ target: { name: 'sort', value: 'age' } })}>
                          Sort by Age
                        </button>
                      </li>
                      <li>
                      <button style={{ paddingRight: '20px' }} className="dropdown-item" value="Name" onClick={() => handleFilterChange({ target: { name: 'sort', value: 'name' } })}>
                          Sort by Name
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
      <div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: page - 1 } })}>Previous</button></li>
              <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: '1' } })}>1</button></li>
              <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: '2' } })}>2</button></li>
              <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: '3' } })}>3</button></li>
              <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: page + 1 } })}>Next</button></li>
            </ul>
          </nav>
        </div>
      </div>
      ); 
  }
  const uniqueBreeds = new Set();

  const breedOptions = allPets.results.map((pet, index) => {
    if (!uniqueBreeds.has(pet.breed)) {
      uniqueBreeds.add(pet.breed);

      return (
        <option key={index} value={pet.breed}>
          {pet.breed}
        </option>
      );
    }

    return null;
  });
  const uniqueLocations = new Set();

  const locationOptions = allPets.results.map((pet, index) => {
    if (!uniqueLocations.has(pet.location)) {
      uniqueLocations.add(pet.location);

      return (
        <option key={index} value={pet.location}>
          {pet.location}
        </option>
      );
    }

    return null; 
  });
  return (
    <div>
      <section>
          <div className="container pt-4">
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <div className="row">
                <div className="mb-3 mb-md-0">
                <div style={{width:'105%'}} class="d-flex">
                  <select style={{marginBottom:'3px'}} className="form-control me-2" name="location" value={filters.location} onChange={handleFilterChange}>
        <option value="">Select Location</option>
        {locationOptions}
      </select>
      <select style={{width:'85%', marginBottom:'3px'}} className="form-control me-2" name="breed" value={filters.breed} onChange={handleFilterChange}>
        <option value="" >Select Breed </option>
        {breedOptions}
      </select>
           
      </div>
      <div style={{width:'105%'}} class="d-flex">
      <select style={{marginTop:'3px'}} className="form-control me-2" name="size" value={filters.size} onChange={handleFilterChange}>
        <option value="" >Select Size</option>
        <option value="small" >Small</option>
        <option value="medium" >Medium</option>
        <option value="large" >Large</option>
      </select>
      <select style={{width:'85%', marginTop:'3px'}} className="form-control me-2" name="status" value={filters.status} onChange={handleFilterChange}>
        <option value="" >Select Status</option>
        <option value="all" >All</option>
        <option value="available" >Available</option>
        <option value="adopted" >Adopted</option>
        <option value="pending" >Pending</option>
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
                      <button style={{ paddingRight: '20px' }} className="dropdown-item" value="Age" onClick={() => handleFilterChange({ target: { name: 'sort', value: 'age' } })}>
                          Sort by Age
                        </button>
                      </li>
                      <li>
                      <button style={{ paddingRight: '20px' }} className="dropdown-item" value="Name" onClick={() => handleFilterChange({ target: { name: 'sort', value: 'name' } })}>
                          Sort by Name
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
    
                
                <div style={{ marginLeft: '5px', marginBottom: '5px' }} className="col-md-auto">
                  <a className="btn btn-outline-success" href="">
                    Reset Filter/Sort
                  </a>
                </div>
              </div>
            </div>
          </div>
      </section>
      <section>
        <div className="container text-center" style={{ marginTop: '30px' }}>
        <div>
      {pets.results.map((pet, index) => (
        index % 3 === 0 && (
          <div key={`row-${index}`} className="row py-2">
            {[0, 1, 2].map((cardIndex) => {
              const petIndex = index + cardIndex;
              if (petIndex < pets.results.length) {
                const currentPet = pets.results[petIndex];
    
                return (
                  <div key={`card-${petIndex}`} className="col">
                    <div className="card h-100">
                      <img src={currentPet.pic} className="card-img-top" style={{ height: '30%' }} alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">
                          <a style={{ textDecoration: 'none', color: 'black' }} href={`./petdetail-${petIndex}.html`}>
                            {currentPet.name}
                          </a>
                        </h5>
                        <p className="card-text"><strong>Breed:</strong> {currentPet.breed}</p>
                        <p className="card-text"><strong>Gender:</strong> {currentPet.gender}</p>
                        <p className="card-text"><strong>Age:</strong> {currentPet.age} yrs old</p>
                        <p className="card-text"><strong>Size:</strong> {currentPet.size}</p>
                        <p className="card-text"><strong>Description:</strong> {currentPet.description}</p>
                        <p className="card-text"><strong>Location:</strong> {currentPet.location}</p>
                        <a href={`../pets/${currentPet.id}`} className="btn btn-primary">
                          Find out about {currentPet.name}
                        </a>
                      </div>
                      <div className="card-footer">
                        <small className="text-body-secondary">Status: {currentPet.status}</small>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        )
      ))}
    </div>
        <div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: page - 1 } })}>Previous</button></li>
              <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: '1' } })}>1</button></li>
              <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: '2' } })}>2</button></li>
              <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: '3' } })}>3</button></li>
              <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: page + 1 } })}>Next</button></li>
            </ul>
          </nav>
        </div>
      </div>
    </section>                    
    </div>
      );
    };
    
    export default Finder;

/*// // PetList.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//
const Finder = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/pets/', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
            });
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();  
  }, []);
  if (!pets.results || !Array.isArray(pets.results)) {
    return null; // or handle the error appropriately
  }
return (
<div>
  <section>
      <div className="container pt-4">
        <div className="d-flex flex-column flex-md-row justify-content-between">
          <div className="row">
            <div className="mb-3 mb-md-0">
              <form className="d-flex">
                <select className="form-control me-2">
                  <option value="">Select Location</option>
                  <option value="">San Francisco, CA</option>
                </select>
                <select style={{ width: '60%' }} className="form-control me-2">
                  <option value="">Any Breed</option>
                  <option value="">Suspicious Dog</option>
                </select>
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
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
                    <a style={{ paddingRight: '20px' }} className="dropdown-item" href="./finder_sorted.html">
                      Sort by Age
                    </a>
                  </li>
                  <li>
                    <a style={{ paddingRight: '20px' }} className="dropdown-item" href="#">
                      Sort by Name
                    </a>
                  </li>
                  <li>
                    <a style={{ paddingRight: '20px' }} className="dropdown-item" href="#">
                      Sort by Size
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div style={{ marginLeft: '5px', marginBottom: '5px' }} className="col-md-auto">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  style={{ backgroundColor: '#1548F3', borderColor: '#2659F4' }}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Extra Filters
                </button>
                <ul className="dropdown-menu">
                  <form action="./finder_filtered.html">
                    <div style={{ width: '350px', paddingLeft: '10px', paddingBottom: '5px', paddingRight: '10px', paddingTop: '10px' }}>
                      <div style={{ paddingBottom: '10px' }}>
                        <h6>Pet Size:</h6>
                        <label htmlFor="Small" style={{ marginLeft: '20px' }}>
                          Small
                        </label>
                        <label>
                          <input type="radio" id="Small" name="select" value="small" />
                        </label>
                        <label style={{ paddingLeft: '12px' }} htmlFor="Medium">
                          Medium
                        </label>
                        <label>
                          <input type="radio" id="Medium" name="select" value="medium" />
                        </label>
                        <label style={{ paddingLeft: '17px' }} htmlFor="Large">
                          Large
                        </label>
                        <label>
                          <input type="radio" id="Large" name="select" value="large" />
                        </label>
                      </div>
                      <div style={{ paddingBottom: '10px' }}>
                        <h6>Pet Age:</h6>
                        <label style={{ paddingLeft: '14px' }} htmlFor="young">
                          Young
                        </label>
                        <label>
                          <input type="radio" id="young" name="age" value="young" />
                        </label>
                        <label style={{ paddingLeft: '33px' }} htmlFor="old">
                          Adult
                        </label>
                        <label>
                          <input type="radio" id="old" name="age" value="adult" />
                        </label>
                        <label style={{ paddingLeft: '10px' }} htmlFor="senior">
                          Senior
                        </label>
                        <label>
                          <input type="radio" id="senior" name="age" value="senior" />
                        </label>
                      </div>
                      <div>
                        <h6>Pet Sex:</h6>
                        <label style={{ paddingLeft: '27px' }} htmlFor="male">
                          Male
                        </label>
                        <label>
                          <input type="radio" id="male" name="sex" value="male" />
                        </label>
                        <label style={{ paddingLeft: '21px' }} htmlFor="female">
                          Female
                        </label>
                        <label>
                          <input type="radio" id="female" name="sex" value="female" />
                        </label>
                      </div>
                      <input
                        className="btn btn-outline-success"
                        style={{
                          marginTop: '20px',
                          paddingRight: '10px',
                          paddingLeft: '10px',
                          marginLeft: '210px',
                        }}
                        type="submit"
                        value="Apply Filter"
                      />
                    </div>
                  </form>
                </ul>
              </div>
            </div>
            <div style={{ marginLeft: '5px', marginBottom: '5px' }} className="col-md-auto">
              <a className="btn btn-outline-success" href="./finder.html">
                Reset Filter/Sort
              </a>
            </div>
          </div>
        </div>
      </div>
  </section>
  <section>
    <div className="container text-center" style={{ marginTop: '30px' }}>
    <div>
  {pets.results.map((pet, index) => (
    index % 3 === 0 && (
      <div key={`row-${index}`} className="row py-2">
        {[0, 1, 2].map((cardIndex) => {
          const petIndex = index + cardIndex;
          if (petIndex < pets.results.length) {
            const currentPet = pets.results[petIndex];

            return (
              <div key={`card-${petIndex}`} className="col">
                <div className="card">
                  <img src={currentPet.image} className="card-img-top" style={{ height: '30%' }} alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">
                      <a style={{ textDecoration: 'none', color: 'black' }} href={`./petdetail-${petIndex}.html`}>
                        {currentPet.name}
                      </a>
                    </h5>
                    <p className="card-text"><strong>Breed:</strong> {currentPet.breed}</p>
                    <p className="card-text"><strong>Gender:</strong> {currentPet.gender}</p>
                    <p className="card-text"><strong>Age:</strong> {currentPet.age} yrs old</p>
                    <p className="card-text"><strong>Size:</strong> {currentPet.size}</p>
                    <p className="card-text"><strong>Description:</strong> {currentPet.description}</p>
                    <p className="card-text"><strong>Location:</strong> {currentPet.location}</p>
                    <a href={`petdetailerror-${petIndex}.html`} className="btn btn-primary">
                      Find out about {currentPet.name}
                    </a>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">Published: {currentPet.publishedDate}</small>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    )
  ))}
</div>
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>
</section>                    
</div>
  );
};

export default Finder;*/