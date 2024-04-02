import { useState } from 'react'
import {When} from 'react-if';
import './App.css'

const APIkey = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY;


function App() {
  
  const [userInput, setUserInput] = useState('');
  const [location, setLocation] = useState({});

  const updateUserInput = newStr => setUserInput(newStr.target.value);
  const handleSubmit = cityStr => {
    cityStr.preventDefault();
    fetchLocation();
  }

  async function fetchLocation() {

    try {
      let jsonData;

      try {
        console.log(`https://us1.locationiq.com/v1/search?key=${APIkey}&q=${userInput}&format=json`)
        jsonData = await fetch(`https://us1.locationiq.com/v1/search?key=${APIkey}&q=${userInput}&format=json`);
      } catch(error) {
        console.error('Error: Failed to contact server', error);
      }

      let parsedData = await jsonData.json();
      setLocation(parsedData[0]);

    } catch(error) {
      console.error('Error: Unable to parse received data', error);
    }
  }
  
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

    </>
  )
}

export default App
