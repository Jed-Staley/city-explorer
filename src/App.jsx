import { useState, useEffect } from 'react';
import { When } from 'react-if';
import './App.css';

const APIkey = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY;
const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN || process.env.VITE_BACKEND_DOMAIN;

function App() {
  const [userInput, setUserInput] = useState('');
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [moviesData, setMoviesData] = useState(null);

  const updateUserInput = event => setUserInput(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    fetchLocation();
  };

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

  const fetchBackendData = async (city, relativePath, setFunction) => {
    try {
      let url = backendDomain + relativePath + `?city=${city}`;
      console.log('Contacting', url);
      const response = await fetch(url);
      const data = await response.json();
      setFunction(data);
    } catch (error) {
      let url = backendDomain + relativePath + `?city=${city}`;
      console.error('Error fetching data from', url, 'Error:', error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input placeholder='Explore!' onChange={updateUserInput} />
      </form>

      {location.display_name && (
        <section>
          <h4>Location Information For: {location.display_name}</h4>
        </section>
      )}

      <When condition={location.lat && location.lon}>
        <section>
          <h5>
            Latitude: {location.lat} Longitude: {location.lon}
          </h5>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${APIkey}&center=${location.lat},${location.lon}&size=500x440&zoom=10`} />
        </section>
      </When>

      {weatherData && (
        <section>
          <h2>Weather Data</h2>
          {weatherData.map(item => (
            <p key={item.date}>
              {item.date}: {item.description}
            </p>
          ))}
        </section>
      )}

      {moviesData && (
        <section>
          <h2>Movie Data</h2>
          {moviesData.map(item => (
            <p key={item}>{item}</p>
          ))}
        </section>
      )}
    </>
  );
}

export default App;
