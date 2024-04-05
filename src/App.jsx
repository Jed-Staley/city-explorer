import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { When } from 'react-if';
import './App.css';
import Map from './Map.jsx';
import Weather from './Weather.jsx';
import Movies from './Movies.jsx';


const APIkey = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY;
const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN || process.env.VITE_BACKEND_DOMAIN;

function App() {
  const [userInput, setUserInput] = useState('');
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);

  const updateUserInput = event => setUserInput(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    fetchLocation();
  };

  const fetchBackendData = async (city, relativePath, setFunction) => {
    try {
      let url = backendDomain + relativePath + `?city=${city}`;
      console.log('Contacting', url);
      const response = await fetch(url);
      console.log(response);
      let data = await response.json();
      if (!data.length) {
        data = [];
      }
      setFunction(data);
    } catch (error) {
      let url = backendDomain + relativePath + `?city=${city}`;
      console.error('Error fetching data from', url, 'Error:', error);
    }
  }

  const fetchLocation = async () => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/search?key=${APIkey}&q=${userInput}&format=json`
      );
      const data = await response.json();
      setLocation(data[0]);
      let locationName = data[0].display_name.split(', ')[0];
      fetchBackendData(locationName, '/api/weather', setWeatherData);
      fetchBackendData(locationName, '/api/movies', setMoviesData);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input placeholder='Explore!' onChange={updateUserInput} />
      </form>

      {location.display_name && (
        <section>
          <h2>Location Information For: {location.display_name}</h2>
        </section>
      )}

      <When condition={location.display_name}>
        <Map APIkey={APIkey} location={location} />
      </When>

      <When condition={weatherData[0]}>
        <Weather weatherData={weatherData} />
      </When>

      <When condition={moviesData[0]}>
        <Movies moviesData={moviesData} />
      </When>
    </>
  );
}

export default App;
