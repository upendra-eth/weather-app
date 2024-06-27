// RainStatus.js

import React from 'react';

const RainStatus = ({ weather }) => {
  if (!weather || !weather.weather) {
    return <p className="text-gray-400">Loading rain status...</p>;
  }

  const isRaining = weather.weather.some((condition) =>
    condition.main.toLowerCase().includes('rain')
  );

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-md">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-100">Rain Status</h2>
        {isRaining ? (
          <p className="text-gray-300">It's currently raining at {weather.name}.</p>
        ) : (
          <p className="text-gray-300">No rain at {weather.name} at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default RainStatus;
