// RainStatus.js

import React from 'react';

const RainStatus = ({ weather }) => {
  if (!weather || !weather.weather) {
    return <p className="text-white">Loading rain status...</p>;
  }

  const isRaining = weather.weather.some((condition) =>
    condition.main.toLowerCase().includes('rain')
  );

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-2">Rain Status</h2>
      {isRaining ? (
        // eslint-disable-next-line react/no-unescaped-entities
        <p>It's currently raining at {weather.name}.</p>
      ) : (
        <p>No rain at {weather.name} at the moment.</p>
      )}
    </div>
  );
};

export default RainStatus;
