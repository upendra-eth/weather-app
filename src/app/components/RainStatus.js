// RainStatus.js

import React from 'react';

const RainStatus = ({ weather }) => {
  const isRaining = weather.weather.some((condition) =>
    condition.main.toLowerCase().includes('rain')
  );

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Rain Status</h2>
        {isRaining ? (
          // eslint-disable-next-line react/no-unescaped-entities
          <p className="text-lg">It's currently raining at {weather.name}.</p>
        ) : (
          <p className="text-lg">No rain at {weather.name} at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default RainStatus;
