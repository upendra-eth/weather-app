// CurrentWeather.js

import React from 'react';

const CurrentWeather = ({ weather }) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden text-white">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{weather.name}</h2>
        <p className="text-lg mb-2">Temperature: {weather.main.temp} °C</p>
        <p className="text-lg mb-2">Description: {weather.weather[0].description}</p>
        <p className="text-lg mb-2">Humidity: {weather.main.humidity}%</p>
        {/* Additional fields you might want to include */}
        {/* <p className="text-lg mb-2">Wind Speed: {weather.wind.speed} m/s</p> */}
        {/* <p className="text-lg">Pressure: {weather.main.pressure} hPa</p> */}
      </div>
    </div>
  );
};

export default CurrentWeather;
