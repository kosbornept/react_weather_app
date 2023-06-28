import './App.css';
import Background from './background.jpg';
import React, { useState, useEffect, useCallback } from 'react';

const api = {
  key: '356edc2c08aa4c53860141829230604',
  base: 'https://api.weatherapi.com/v1'
} 
const geolocationAPI = navigator.geolocation;

export default function App() {
  // Set Latitude and Longitude State
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  // Call Location
  useEffect(() => {
    if(!geolocationAPI) {
        console.log(`Geolocation API is not available. Ensure you have accepted the browser request for your location.`)
    } else {
        geolocationAPI.getCurrentPosition((position) => {
          const { coords } = position;
          setLat(coords.latitude);
          setLong(coords.longitude);
        }, (error) => {
          console.log(`Something went wrong in finding your location.`)
        })
    }
  }, [])

  // Set Weather State and Fetch API
  const [weather, setWeather] = useState({});
    const fetchWeather = useCallback(async () => {
    const res = fetch(
        `${api.base}/current.json?key=${api.key}&q=${lat},${long}`
      ).then((res) => res.json());
      const weather = await res;
      setWeather(weather);
    }, [lat, long])

    useEffect(() => {
      fetchWeather();
    }, [fetchWeather])

    // Set Time State
    const Time = () => {
      const init = new Date()
      const [date, setDate] = useState(init)
  
      const tick = () => {
      setDate(new Date())
      }
  
      useEffect(() => {
      const timerID = setInterval(() => tick(), 1000)
      // Unmount
      return () => {
          clearInterval(timerID)
      }
      }, [])
  
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
    }
  // console.log(weather);

  return (
    <div style={{backgroundImage: `url(${Background})`, height: '100vh', backgroundSize: 'cover', padding: '7rem'}} className="App">
      {(weather.location) ? (
        <div>
          <h1 style={{ backgroundColor: 'rgba(159, 146, 153, 0.5)', paddingTop: '5rem' }}>
              {weather.location.name}, {weather.location.country}
            </h1>
            <div style={{padding: '5rem', backgroundColor: 'rgba(159, 146, 153, 0.5)'}}>
              <h2 style={{fontSize: '5rem'}}>
                <Time />
              </h2>
            </div>
            <div style={{ backgroundColor: 'rgba(159, 146, 153, 0.5)', paddingBottom: '5rem'}}>
              <h3>
                It is currently {weather.current.temp_c}°C and {weather.current.condition.text}.
              </h3>
              <img alt='' src={weather.current.condition.icon} />
            </div>
            <footer style={{position: "fixed", bottom: 0, left: 0, backgroundColor: 'rgba(159, 146, 153, 0.5)', color: 'white'}}>
              <small>Photo by <a href="https://unsplash.com/@maritaextrabold?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marita Kavelashvili</a> on <a href="https://unsplash.com/wallpapers/nature/forest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </small>
            </footer>
        </div>
      ) : (
        <div>
          <h1>loading...</h1>
        </div>
      )}
    </div>
  )
}