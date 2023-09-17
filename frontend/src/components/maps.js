import React, { useRef, useState, useEffect } from 'react';
require('dotenv').config();
import {
  Button,
  Container,
  Grid,
  Input,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

function App({ hospitalAddresses }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [hospitalMarkers, setHospitalMarkers] = useState([]);
  const [hospitalDistances, setHospitalDistances] = useState([]);

  const originRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    if (isLoaded && map) {
      // Convert hospital addresses to lat and long and add markers
      const geocoder = new window.google.maps.Geocoder();
      const markers = [];

      hospitalAddresses.forEach((address) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location;

            const marker = new window.google.maps.Marker({
              position: location,
              map: map,
            });

            // Attach a click event listener to calculate and display distance
            marker.addListener('click', () => {
              calculateDistance(location);
            });

            markers.push(marker);
          }
        });
      });

      // Store the markers in state
      setHospitalMarkers(markers);

      // Get the user's current location using Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Display user's current location
          new window.google.maps.Marker({
            position: userLocation,
            map: map,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: '#00F',
              fillOpacity: 1,
              strokeColor: '#FFF',
              strokeWeight: 2,
            },
          });

          // Set the map center to the user's location
          map.setCenter(userLocation);

          // Calculate distance from user's location to all hospital addresses
          hospitalAddresses.forEach((address) => {
            calculateDistance(address);
          });
        });
      }
    }
  }, [isLoaded, map, hospitalAddresses]);

  async function calculateDistance(destination) {
    if (!map) {
      return;
    }

    const userLocation = map.getCenter(); // Get the user's location from the map center

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: userLocation,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    // Create a polylineOptions object to style the route line
    const polylineOptions = {
      strokeColor: 'blue', // Change the color as desired
      strokeWeight: 5,    // Change the weight to make it thicker
    };

    // Display the calculated path on the map with custom styles
    setDirectionsResponse({
      ...results,
      routes: results.routes.map((route) => ({
        ...route,
        overview_path: route.overview_path,
        overview_polyline: route.overview_polyline,
        bounds: route.bounds,
        legs: route.legs,
        polylineOptions: polylineOptions,
      })),
    });

    // Set the distance and duration in the state
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <Grid container direction="column" alignItems="center" style={{ height: '100vh' }}>
      <div style={{ position: 'absolute', left: 20, top: 100, height: '100%', width: '100%' }}>
        <GoogleMap
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {hospitalMarkers.map((marker, index) => (
            <Marker key={index} position={marker.getPosition()} />
          ))}
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          
          {/* Display distance and duration on the map */}
          {distance && (
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: 'white',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography variant="subtitle1">Distance: {distance}</Typography>
              <Typography variant="subtitle1">Duration: {duration}</Typography>
            </div>
          )}

          {/* Display distances to hospitals */}
          {hospitalDistances.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'white',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography variant="subtitle1">Distances to Hospitals:</Typography>
              {hospitalDistances.map((distance, index) => (
                <Typography key={index} variant="subtitle2">
                  {hospitalAddresses[index].name}: {distance}
                </Typography>
              ))}
            </div>
          )}
        </GoogleMap>
      </div>
    </Grid>
  );
}

export default App;
