// LocationSearch.js

import React, { useState } from 'react';
import fetchWeather from '../utils/fetchWeather';

const LocationSearch = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(location, null, apiKey);
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 bg-gray-800 rounded-lg p-4 text-white">
      <form onSubmit={handleSearch}>
        <label htmlFor="location" className="block mb-2 text-lg font-medium">
          Enter Location:
        </label>
        <div className="flex">
          <input
            type="text"
            id="location"
            className="py-2 px-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            placeholder="Enter city name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p className="mt-2 text-gray-400">Loading...</p>}
      {error && <p className="mt-2 text-red-400">Error: {error}</p>}

      {weatherData && (
        <div className="mt-4">
          <h2 className="text-xl font-medium">Weather at {weatherData.name}</h2>
          <p className="mt-2">
            <strong>Temperature:</strong> {weatherData.main.temp} °C
          </p>
          <p>
            <strong>Description:</strong> {weatherData.weather[0].description}
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
          </p>
          <p>
            <strong>Visibility:</strong> {weatherData.visibility / 1000} km
          </p>
          <p>
            <strong>Rain:</strong> {weatherData.rain ? `${weatherData.rain['1h']} mm` : 'No rain'}
          </p>
          <p>
            <strong>Snow:</strong> {weatherData.snow ? `${weatherData.snow['1h']} mm` : 'No snow'}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
