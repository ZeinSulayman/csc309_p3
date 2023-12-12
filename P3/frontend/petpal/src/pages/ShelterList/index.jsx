// // PetList.jsx
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShelterList = () => {
  let page = 1;
  const [allShelters, setAll] = useState([]);
  const [filters, setFilters] = useState({
    });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const allResponse = await fetch('http://127.0.0.1:8000/shelters/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const allData = await allResponse.json();
        console.log(allData)
        setAll(allData);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);// Trigger the effect whenever filters change

    const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div>
      <section>
        <div className="container text-center" style={{ marginTop: '30px' }}>
          <div>
            {allShelters.results ? (
              allShelters.results.map((shelter, index) => (
                index % 3 === 0 && (
                  <div key={`row-${index}`} className="row py-2">
                    {[0, 1, 2].map((cardIndex) => {
                      const shelterIndex = index + cardIndex;
                      if (shelterIndex < allShelters.results.length) {
                        const currentShelter = allShelters.results[shelterIndex];

                        return (
                          <div key={`card-${shelterIndex}`} className="col">
                            <div className="card h-100" >
                              <img src={currentShelter.pic} className="card-img-top" style={{ height: '50%' }} alt="..." />
                              <div className="card-body">
                                <h5 className="card-title">
                                  <a style={{ textDecoration: 'none', color: 'black' }} href={`../pets/${currentShelter.shelter_id}`}>
                                    {currentShelter.shelter_name}
                                  </a>
                                </h5>
                                <p className="card-text"><strong>Website:</strong> {currentShelter.website}</p>
                                <p className="card-text"><strong>Color:</strong> {currentShelter.phone_num}</p>
                                <p className="card-text"><strong>Gender:</strong> {currentShelter.location}</p>
                                <a href={`../shelter/${currentShelter.shelter_id}`} className="btn btn-primary">
                                  Find out about {currentShelter.shelter_name}
                                </a>
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
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: page - 1 } })}>Previous</button></li>
                <li className="page-item"><button className="page-link" onClick={() => handleFilterChange({ target: { name: 'page', value: page + 1 } })}>Next</button></li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

    export default ShelterList;
