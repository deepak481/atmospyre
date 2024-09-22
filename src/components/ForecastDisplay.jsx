import React, { memo } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

const WeatherIcon = memo(({ condition }) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun className='h-8 w-8 text-yellow-400' />;
    case 'clouds':
      return <Cloud className='h-8 w-8 text-gray-400' />;
    case 'rain':
      return <CloudRain className='h-8 w-8 text-blue-400' />;
    case 'snow':
      return <CloudSnow className='h-8 w-8 text-blue-200' />;
    case 'thunderstorm':
      return <CloudLightning className='h-8 w-8 text-yellow-600' />;
    default:
      return <Cloud className='h-8 w-8 text-gray-400' />;
  }
});

const ForecastCard = memo(({ day, unit }) => {
  const highTemp = unit === 'celsius' ? day.day.maxtemp_c : day.day.maxtemp_f;
  const lowTemp = unit === 'celsius' ? day.day.mintemp_c : day.day.mintemp_f;

  return (
    <div className='flex flex-col items-center p-4 bg-white rounded-lg shadow'>
      <p className='font-semibold'>
        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
      </p>
      <WeatherIcon condition={day.day.condition.text} />
      <p className='mt-2'>
        <span className='font-bold'>{Math.round(highTemp)}°</span> / {Math.round(lowTemp)}°
      </p>
    </div>
  );
});

const ForecastDisplay = memo(({ forecast, unit }) => {
  return (
    <div className='mt-6'>
      <h3 className='text-xl font-semibold mb-4'>5-Day Forecast</h3>
      <div className='grid grid-cols-5 gap-4'>
        {forecast.forecastday.slice(0, 5).map((day, index) => (
          <ForecastCard key={index} day={day} unit={unit} />
        ))}
      </div>
    </div>
  );
});

export default ForecastDisplay;
