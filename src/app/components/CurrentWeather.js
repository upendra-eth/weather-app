// CurrentWeather.js

import React from 'react';

const CurrentWeather = ({ weather }) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-md">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-100">{weather.name}</h2>
        <p className="text-lg mb-2 text-gray-300">Temperature: {weather.main.temp} °C</p>
        <p className="text-lg mb-2 text-gray-300">Description: {weather.weather[0].description}</p>
        <p className="text-lg mb-2 text-gray-300">Humidity: {weather.main.humidity}%</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
