
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';
import env from './env';

const apiKey = env.GOOGLE_MAP_KEY;

const containerStyle = {
  width: '1000px',
  height: '600px'
};

const defaultCenter = {
  lat: 38.206591,
  lng: -92.416691
};

export default function Map() {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
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
        setLocation(userLocation);
      }, () => {
        console.log('Error: The Geolocation service failed.');
      });
    } else {
      console.log('Error: Your browser doesn\'t support geolocation.');
    }
  }, []);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const selectedLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      setLocation(selectedLocation);
      setMarkers([{ position: selectedLocation, name: place.name }, { position: userLocation, name: 'Your Location' }]);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
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
        center={location || userLocation || defaultCenter}
        zoom={7}
      >
        {userLocation && (
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
        )}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              labelOrigin: { x: 12, y: -15 },
            }}
            label={{
              text: marker.name,
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: 'Arial',
            }}
          />
        ))}
        {markers.map((marker, index) => (
          <InfoWindow
            key={index}
            position={marker.position}
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
              {marker.name}
            </div>
          </InfoWindow>
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
