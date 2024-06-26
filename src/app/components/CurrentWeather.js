// CurrentWeather.js

import React from 'react';

const CurrentWeather = ({ weather }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{weather.name}</h2>
        <p className="text-lg mb-2">Temperature: {weather.main.temp} °C</p>
        <p className="text-lg mb-2">Description: {weather.weather[0].description}</p>
        <p className="text-lg">Humidity: {weather.main.humidity}%</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default CurrentWeather;
