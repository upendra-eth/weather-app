// page.js
'use client'
// page.js

import { useState, useEffect } from 'react';
import fetchWeather from './utils/fetchWeather';
import CurrentWeather from './components/CurrentWeather';
import RainStatus from './components/RainStatus';
import LocationSearch from './components/LocationSearch';
import '../app/globals.css';

const Home = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLon(longitude);
        },
        (error) => {
          setError('Error getting geolocation');
        }
      );
    } else {
      setError('Geolocation not available');
    }
  }, []);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

    const fetchData = async () => {
      if (lat !== null && lon !== null) {
        try {
          const data = await fetchWeather(lat, lon, apiKey);
          setWeatherData(data);
        } catch (error) {
          setError('Error fetching weather data');
        }
      }
    };

    fetchData();
  }, [lat, lon]);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Weather App</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <LocationSearch />
        </div>
        {weatherData && (
          <div className="flex flex-col items-center space-y-4">
            <CurrentWeather weather={weatherData} />
            <RainStatus weather={weatherData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
