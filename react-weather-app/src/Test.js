import './App.css';
import React, { useState, useEffect, useCallback } from 'react';

const api = {
  key: '356edc2c08aa4c53860141829230604',
  base: 'http://api.weatherapi.com/v1'
} 
const geolocationAPI = navigator.geolocation;

export default function App() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
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


    // Get local time
    const Time = () => {
        const init = new Date()
        const [date, setDate] = useState(init)
    
        const tick = () => {
        setDate(new Date())
        }
    
        useEffect(() => {
        const timerID = setInterval(() => tick(), 1000)
        return () => {
            clearInterval(timerID)
        }
        }, [])
    
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
    }
    console.log(weather);

    return (
    <div>
      {(weather.location) ? (
        <div>
            <h1>
              {weather.location.name}, {weather.location.country}
            </h1>
            <div>
              <h2>
                <Time />
              </h2>
            </div>
            <div>
              <h3>
                It is currently {weather.current.temp_c}°C and {weather.current.condition.text}.
              </h3>
              <img alt='' src={weather.current.condition.icon} />
            </div>
        </div>
      ) : (
        <div>
          <h1>loading...</h1>
        </div>
      )}
    </div>
  )
}