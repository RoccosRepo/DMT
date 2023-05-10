
//AIzaSyDVpa1qphmEE4s3ci-Ptib8PYTMKr-PT6U

// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '1000px',
//   height: '600px'
// };

// const defaultCenter = {
//   lat: 38.206591,
//   lng: -92.416691
// };

// export default function Map() {
//   const [location, setLocation] = useState(defaultCenter);
//   const [markerPosition, setMarkerPosition] = useState(defaultCenter);
//   const [userLocation, setUserLocation] = useState(null);
//   const [autocomplete, setAutocomplete] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const userLocation = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//         setUserLocation(userLocation);
//       }, () => {
//         console.log('Error: The Geolocation service failed.');
//       });
//     } else {
//       console.log('Error: Your browser doesn\'t support geolocation.');
//     }
//   }, []);

//   useEffect(() => {
//     if (userLocation) {
//       setLocation(userLocation);
//       setMarkerPosition(userLocation);
//     }
//   }, [userLocation]);

//   const handleSearch = () => {
//     if (autocomplete !== null) {
//       const place = autocomplete.getPlace();
//       if (place.geometry) {
//         setLocation({
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         });
//         setMarkerPosition({
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         });
//       }
//     }
//   };

//   const handlePlaceSelect = (place) => {
//     if (place.geometry) {
//       setLocation({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       });
//       setMarkerPosition({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       });
//     }
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey={"AIzaSyDVpa1qphmEE4s3ci-Ptib8PYTMKr-PT6U"}
//       libraries={['places']}
//     >
//       <div>
//         <Autocomplete
//           onLoad={(autocomplete) => setAutocomplete(autocomplete)}
//           onPlaceChanged={() => handlePlaceSelect(autocomplete.getPlace())}
//         >
//           <input
//             type="text"
//             placeholder="Search address"
//             style={{
//               boxSizing: `border-box`,
//               border: `1px solid transparent`,
//               width: `240px`,
//               height: `32px`,
//               padding: `0 12px`,
//               borderRadius: `3px`,
//               boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//               fontSize: `14px`,
//               outline: `none`,
//               textOverflow: `ellipses`,
//               position: "absolute",
//               left: "50%",
//               marginLeft: "-120px",
//             }}
//           />
//         </Autocomplete>
//         <button onClick={() => handleSearch()}>Search</button>
//       </div>
      
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={location}
//         zoom={7}
//       >
//         {userLocation && <Marker position={userLocation} />}
//         <Marker position={markerPosition} />
//       </GoogleMap>
//     </LoadScript>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1000px',
  height: '600px'
};

const defaultCenter = {
  lat: 38.206591,
  lng: -92.416691
};

export default function Map() {
  const [location, setLocation] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userLocation);
      }, () => {
        console.log('Error: The Geolocation service failed.');
      });
    } else {
      console.log('Error: Your browser doesn\'t support geolocation.');
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      setLocation(userLocation);
      setMarkerPosition(userLocation);
    }
  }, [userLocation]);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const selectedLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      setLocation(selectedLocation);
      setMarkerPosition(selectedLocation);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyDVpa1qphmEE4s3ci-Ptib8PYTMKr-PT6U"}
      libraries={['places']}
    >
      <div>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            placeholder="Search address"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </Autocomplete>
      </div>
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={7}
      >
        {userLocation && <Marker position={userLocation} />}
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
}
