import { WEATHER_API_KEY } from './constant';

const API_KEY = WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

const cache = new Map();

export const fetchWeatherData = async (city) => {
  const cacheKey = `weather_${city}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }

  try {
    const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchCitySuggestions = async (term) => {
  const cacheKey = `suggestions_${term}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }

  try {
    const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${term}`);
    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }
    const data = await response.json();
    const suggestions = data.map((item) => item.name);

    cache.set(cacheKey, { data: suggestions, timestamp: Date.now() });
    return suggestions;
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    throw error;
  }
};
