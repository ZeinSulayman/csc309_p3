import React, { useEffect, useState } from "react";
import {fromAddress, setKey} from "react-geocode";
import Map from "../../components/Map/index";

const ShelterMaps = () => {
  setKey("AIzaSyDcX3F3pRrsiSNM-Ccda0G-a9ZD_BdCpvk");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await fetch('https://three09-p3-backend.onrender.com/shelters/', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }});
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const shelters = await response.json();
        // Extracting addresses from shelters and creating locations array
        const shelterLocations = shelters.results.map((shelter) => ({
          address: shelter.location,
          text: shelter.shelter_name, // You can use any property from the shelter object for the label
        }));

        setLocations(shelterLocations);
      } catch (error) {
        console.error('Error fetching shelters data:', error.message);
      }
    };

    fetchShelters();
  }, []);
  console.log("Shelters: ", locations);

  return <Map locations={locations}></Map>;

};

export default ShelterMaps;