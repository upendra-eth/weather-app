'use client'

// page.js

import { useState, useEffect } from 'react';
import fetchWeather from './utils/fetchWeather';
import CurrentWeather from './components/CurrentWeather';
import RainStatus from './components/RainStatus';

const Home = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Effect to get geolocation
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
          console.error('Error getting geolocation:', error);
          setError('Error getting geolocation');
        }
      );
    } else {
      console.error('Geolocation not available');
      setError('Geolocation not available');
    }
  }, []);

  // Effect to fetch weather data
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

    const fetchData = async () => {
      if (lat !== null && lon !== null) {
        try {
          const data = await fetchWeather(lat, lon, apiKey);
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setError('Error fetching weather data');
        }
      }
    };

    fetchData();
  }, [lat, lon]);

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  if (!weatherData) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Weather App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CurrentWeather weather={weatherData} />
        <RainStatus weather={weatherData} />
      </div>
    </div>
  );
};

export default Home;
