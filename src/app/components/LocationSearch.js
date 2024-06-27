// LocationSearch.js

import React, { useState } from 'react';
import fetchWeather from '../utils/fetchWeather';

const LocationSearch = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

  const geocodeCity = async (city) => {
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('City not found');
      }
      const { lat, lon } = data[0];
      return { lat, lon };
    } catch (error) {
      throw new Error('Error fetching coordinates');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { lat, lon } = await geocodeCity(location);
      const data = await fetchWeather(lat, lon, apiKey);
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 w-full max-w-md">
      <form onSubmit={handleSearch} className="flex flex-col">
        <label htmlFor="location" className="block mb-2 text-lg font-medium text-gray-300">
          Enter Location:
        </label>
        <div className="flex">
          <input
            type="text"
            id="location"
            className="py-2 px-4 w-full border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p className="mt-2 text-gray-400">Loading...</p>}
      {error && <p className="mt-2 text-red-600">Error: {error}</p>}

      {weatherData && (
        <div className="mt-4 bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-medium text-gray-100">Weather at {weatherData.name}</h2>
            <p className="mt-2 text-gray-300">
              <strong>Temperature:</strong> {weatherData.main.temp} °C
            </p>
            <p className="text-gray-300">
              <strong>Description:</strong> {weatherData.weather[0].description}
            </p>
            <p className="text-gray-300">
              <strong>Humidity:</strong> {weatherData.main.humidity}%
            </p>
            <p className="text-gray-300">
              <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
            </p>
            <p className="text-gray-300">
              <strong>Visibility:</strong> {weatherData.visibility / 1000} km
            </p>
            <p className="text-gray-300">
              <strong>Rain:</strong> {weatherData.rain ? `${weatherData.rain['1h']} mm` : 'No rain'}
            </p>
            <p className="text-gray-300">
              <strong>Snow:</strong> {weatherData.snow ? `${weatherData.snow['1h']} mm` : 'No snow'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
