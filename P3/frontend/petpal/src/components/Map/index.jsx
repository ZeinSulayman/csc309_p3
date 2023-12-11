/*import React, { useContext, useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";

const AnyReactComponent = ({ text }) => <div style={{position:'absolute',transform:'translate(-50%, -50%)'}}>{text}</div>;

export default function SimpleMap(){

    const [pos, setPos] = useState({long: 79.347015, lat: 43.651070});


// Set Google Maps Geocoding API key for quota management (optional but recommended).
// Use this if you want to set the API key independently.
setKey("AIzaSyDcX3F3pRrsiSNM-Ccda0G-a9ZD_BdCpvk"); // Your API key here.

// Set default response language (optional).
// This sets the default language for geocoding responses.
setLanguage("en"); // Default language for responses.

// Set default response region (optional).
// This sets the default region for geocoding responses.
setRegion("es"); // Default region for responses.


   useEffect(() => {
        const {long, lat} = pos;
        fromAddress("Varsity center toronto ontario")
          .then(({ results }) => {
            const { lat, lng } = results[0].geometry.location;
            console.log(lat, lng);
            setPos({long: lng,lat: lat});
          })
          .catch(console.error);
   }, []);

  const defaultProps = {
    center: {
      lng: -79.347015,
      //lng: pos.long,
      //lat: pos.lat
      lat: 43.651070
    },
    zoom: 12
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDcX3F3pRrsiSNM-Ccda0G-a9ZD_BdCpvk" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      <Marker lat={pos.lat} lng={pos.long} />
      <AnyReactComponent
          lat={43.651070}
          lng={-79.347015}
          text="My Marker"
      />
      </GoogleMapReact>
    </div>
  );
}

const Marker = props => {
  return <div className="SuperAwesomePin">afasdfasdfas</div>
}
*/
// import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
// import React, {useMemo, useContext, useState, useEffect } from "react";
// import {
//   setKey,
//   setDefaults,
//   setLanguage,
//   setRegion,
//   fromAddress,
//   fromLatLng,
//   fromPlaceId,
//   setLocationType,
//   geocode,
//   RequestType,
// } from "react-geocode";
// import "./App.css";
//
// const Map = ({ location }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyDcX3F3pRrsiSNM-Ccda0G-a9ZD_BdCpvk",
//   });
//   const center = useMemo(() => ({ lat: 43.651070, lng: -79.347015}), []);
//
//   const [pos, setPos] = useState({long: 79.347015, lat: 43.651070});
//
//
// // Set Google Maps Geocoding API key for quota management (optional but recommended).
// // Use this if you want to set the API key independently.
// setKey("AIzaSyDcX3F3pRrsiSNM-Ccda0G-a9ZD_BdCpvk"); // Your API key here.
//
// // Set default response language (optional).
// // This sets the default language for geocoding responses.
// setLanguage("en"); // Default language for responses.
//
// // Set default response region (optional).
// // This sets the default region for geocoding responses.
// setRegion("es"); // Default region for responses.
//
//
//    useEffect(() => {
//     const fetchCoordinates = async () => {
//       try {
//         const { results } = await fromAddress(location);
//         const { lat, lng } = results[0].geometry.location;
//         setPos({ long: lng, lat: lat });
//       } catch (error) {
//         console.error(error);
//       }
//     };
//
//     fetchCoordinates();
//   }, [location]);
//
//
//   return (
//     <div className="App">
//       {!isLoaded ? (
//         <h1>Loading...</h1>
//       ) : (
//         <GoogleMap
//           mapContainerClassName="map-container"
//           center={center}
//           zoom={12}
//         >
//         <MarkerF position={{lat:pos.lat, lng:pos.long}} />
//         </GoogleMap>
//       )}
//     </div>
//   );
// };
//
// export default Map;

import React, {useEffect, useMemo, useState} from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import {fromAddress} from "react-geocode";
import "./App.css";

const Map = ({ locations }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDcX3F3pRrsiSNM-Ccda0G-a9ZD_BdCpvk",
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const promises = locations.map(async (location) => {
          const { results } = await fromAddress(location.address);
          const { lat, lng } = results[0].geometry.location;
          return { lat, lng, text: location.text };
        });

        const newMarkers = await Promise.all(promises);
        setMarkers(newMarkers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [locations]);

  const mapCenter = useMemo(() => {
    if (markers.length === 0) {
      return { lat: 0, lng: 0 }; // Default center if no markers
    }

    // Calculate the bounds that encompass all markers
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend({ lat: marker.lat, lng: marker.lng });
    });

    // Get the center of the bounds
    return {
      lat: (bounds.getNorthEast().lat() + bounds.getSouthWest().lat()) / 2,
      lng: (bounds.getNorthEast().lng() + bounds.getSouthWest().lng()) / 2,
    };
  }, [markers]);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" center={mapCenter} zoom={12}>
          {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} label={marker.text} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;