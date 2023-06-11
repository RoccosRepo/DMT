import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';
import env from './env';

const mapKey = env.GOOGLE_MAP_KEY;
const trailKey = env.TRAIL_API_KEY;

const containerStyle = {
  width: '1000px',
  height: '700px'
};

const defaultCenter = {
  lat: 38.206591,
  lng: -92.416691
};

export default function Map() {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationAvailable, setIsLocationAvailable] = useState(true);
  const [zoom, setZoom] = useState(7); 
  const [center, setCenter] = useState(userLocation || defaultCenter);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLocation);
          setCenter(userLocation); 
        },
        () => {
          console.log('Error: The Geolocation service failed.');
          setIsLocationAvailable(false);
        }
      );
    } else {
      console.log('Error: Your browser doesn\'t support geolocation.');
      setIsLocationAvailable(false);
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setContainerStyle({
        width: `${width}px`,
        height: `${height}px`
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


//   const fetchTrailData = async () => {
//     const url = 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=38.206591&lon=-92.416691&per_page=1000000&radius=100';
//     const options = {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': {trailKey},
//         'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await fetch(url, options);
//       const data = await response.json();
//       const trails = data.results;
//       const trailNames = trails.map(trail => trail.name);
//       setTrailSuggestions(trailNames);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchTrailData();
// }, []);
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const selectedLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.name
      };
      setSelectedLocation(selectedLocation);
      setZoom(8);
      setCenter(selectedLocation); 
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={mapKey}
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
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '240px',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
              position: 'absolute',
              left: '50%',
              marginLeft: '-120px',
            }}
          />
        </Autocomplete>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {!isLocationAvailable && (
          <Marker
            position={defaultCenter}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              labelOrigin: { x: 12, y: -15 },
            }}
            label={{
              text: 'Default Location',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: 'Arial',
            }}
          />
        )}
        {userLocation && (
          <>
          <Marker
            position={userLocation}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              labelOrigin: { x: 12, y: -15 },
            }}
            label={{
              text: 'Your Location',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: 'Arial',
            }}
          />
          <InfoWindow
          position={userLocation}
          options={{
            pixelOffset: new window.google.maps.Size(0, -30),
          }}
        >
          <div
            style={{
              background: '#ffffff',
              padding: '8px',
              borderRadius: '4px',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: 'Arial',
            }}
          >
            Your Location
          </div>
        </InfoWindow>
        </>
        )}
        {selectedLocation && (
          <Marker
            position={selectedLocation}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              labelOrigin: { x: 12, y: -15 },
            }}
            label={{
              text: selectedLocation.name,
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: 'Arial',
            }}
          />
        )}
        {selectedLocation && (
          <InfoWindow
            position={selectedLocation}
            options={{
              pixelOffset: new window.google.maps.Size(0, -30),
            }}
          >
            <div
              style={{
                background: '#ffffff',
                padding: '8px',
                borderRadius: '4px',
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial',
              }}
            >
              {selectedLocation.name}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}