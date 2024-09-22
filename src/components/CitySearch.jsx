import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { fetchCitySuggestions } from '../utils/api';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const CitySearch = ({ onCitySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const debouncedFetchSuggestions = useCallback(
    debounce(async (term) => {
      if (term.length < 2) {
        setCities([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const suggestions = await fetchCitySuggestions(term);
        setCities(suggestions);
      } catch (err) {
        setError('Failed to fetch city suggestions. Please try again.');
        setCities([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    debouncedFetchSuggestions(searchTerm);
  }, [searchTerm, debouncedFetchSuggestions]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedFetchSuggestions(term);
  };

  const handleCitySelect = (city) => {
    onCitySelect(city);
    setSearchTerm(city);
    setIsOpen(false);
  };

  return (
    <div className='relative mt-6' ref={dropdownRef}>
      <div className='relative'>
        <input
          type='text'
          className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500'
          placeholder='Search for a city...'
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
        />
        <Search className='absolute right-3 top-2 h-6 w-6 text-gray-400' />
      </div>
      {isOpen && (
        <ul className='absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-auto'>
          {loading && <li className='px-4 py-2 text-gray-500'>Loading...</li>}
          {error && <li className='px-4 py-2 text-red-500'>{error}</li>}
          {!loading && !error && cities.length === 0 && (
            <li className='px-4 py-2 text-gray-500'>No cities found</li>
          )}
          {cities.map((city, index) => (
            <li
              key={index}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(CitySearch);
