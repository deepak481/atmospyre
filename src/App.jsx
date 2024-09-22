import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Search } from 'lucide-react';
import CitySearch from './components/CitySearch';
import PullToRefresh from './components/PullToRefresh';
import { fetchWeatherData } from './utils/api';

const WeatherDisplay = lazy(() => import('./components/WeatherDisplay'));
const ForecastDisplay = lazy(() => import('./components/ForecastDisplay'));

export default function App() {
  const [city, setCity] = useState(() => localStorage.getItem('lastCity') || 'New York');
  const [weatherData, setWeatherData] = useState(() => {
    const cachedData = localStorage.getItem('cachedWeatherData');
    return cachedData ? JSON.parse(cachedData) : null;
  });
  const [unit, setUnit] = useState('celsius');
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (!isOnline) {
      setError('You are offline. Showing cached data.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      localStorage.setItem('lastCity', city);
      localStorage.setItem('cachedWeatherData', JSON.stringify(data));
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, [city, isOnline]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCitySelect = (newCity) => {
    setCity(newCity);
  };

  const toggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
        <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
          <div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
          <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
            <div className='max-w-md mx-auto'>
              <div className='flex items-center space-x-5'>
                <div className='h-14 w-14 bg-cyan-200 rounded-full flex items-center justify-center'>
                  <Search className='h-8 w-8 text-cyan-600' />
                </div>
                <div className='block pl-2 font-semibold text-xl self-start text-gray-700'>
                  <h2 className='leading-relaxed'>Weather Forecast</h2>
                  <p className='text-sm text-gray-500 font-normal leading-relaxed'>
                    {isOnline
                      ? 'Enter a city to get the weather forecast'
                      : 'Offline Mode - Showing cached data'}
                  </p>
                </div>
              </div>
              <div className='divide-y divide-gray-200'>
                <CitySearch onCitySelect={handleCitySelect} />
                {isLoading && <p className='text-gray-500 mt-2'>Loading...</p>}
                {error && <p className='text-red-500 mt-2'>{error}</p>}
                {weatherData && !isLoading && (
                  <Suspense fallback={<div>Loading weather data...</div>}>
                    <WeatherDisplay data={weatherData.current} city={city} unit={unit} />
                    <ForecastDisplay forecast={weatherData.forecast} unit={unit} />
                    <button
                      onClick={toggleUnit}
                      className='mt-4 bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors'
                    >
                      Switch to {unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}
                    </button>
                  </Suspense>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
}
