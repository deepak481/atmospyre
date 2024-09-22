import React, { memo } from 'react';
import WeatherIcon from './WeatherIcon'; // Import the new WeatherIcon component

const WeatherDisplay = memo(({ data, city, unit }) => {
  const temperature = unit === 'celsius' ? data.temp_c : data.temp_f;

  return (
    <div className='mt-6'>
      <h2 className='text-2xl font-bold text-gray-800'>{city}</h2>
      <div className='flex items-center mt-2'>
        <WeatherIcon condition={data.condition.text} size={12} />
        <p className='text-4xl font-bold text-gray-800 ml-4'>
          {Math.round(temperature)}°{unit === 'celsius' ? 'C' : 'F'}
        </p>
      </div>
      <p className='text-gray-600 mt-2'>{data.condition.text}</p>
    </div>
  );
});

export default WeatherDisplay;
