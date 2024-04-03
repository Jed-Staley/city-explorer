import { useState } from 'react'
import {When} from 'react-if';
import './App.css'

const APIkey = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY;


function App() {
  
  const [userInput, setUserInput] = useState('');
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState(null);

  const updateUserInput = newStr => setUserInput(newStr.target.value);
  const handleSubmit = cityStr => {
    cityStr.preventDefault();
    fetchLocation();
  }

  const fetchLocation = async () => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/search?key=${APIkey}&q=${userInput}&format=json`
      );
      const data = await response.json();
      setLocation(data[0]);
      fetchWeatherData(data[0].display_name);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  
  return (
    <>

      <form onSubmit={handleSubmit}>
        <input placeholder='Explore!' onChange={updateUserInput} />
      </form>

      {
        location.display_name ?
          <section>
            <h4>Location Information For: {location.display_name}</h4>
          </section>
        : null
      }

      <When condition={location.lat && location.lon}>
        <section>
          <h5>Latitude: {location.lat} Longitude: {location.lon}</h5>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${APIkey}&center=${location.lat},${location.lon}&size=500x440&zoom=10`} />
        </section>
      </When>

      {
        weatherData && (
        <section>
          <h2>Weather Data</h2>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </section>
      )}

    </>
  )
}

export default App
