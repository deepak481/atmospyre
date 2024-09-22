# atmospyre - Weather Forecast Application

This React-based weather forecast application provides users with up-to-date weather information for cities worldwide. It features current weather conditions, a 5-day forecast, and a user-friendly interface.

## Features

- Real-time weather data retrieval from a public API
- City search with auto-suggestions
- Current weather display (temperature, condition, icon)
- 5-day weather forecast
- Temperature unit conversion (Celsius/Fahrenheit)
- Responsive design for various screen sizes
- Offline mode with cached data
- Pull-to-refresh functionality
- Performance optimizations for improved user experience

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/deepak481/atmospyre.git
   cd atmospyre
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your weather API key:

   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

   Note: You need to sign up for a free account with a weather API provider (WeatherAPI) to get an API key.

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://127.0.0.1:5173/`.

## Assumptions and Design Decisions

1. **API Choice**: The application uses a free weather API named as "WeatherAPI".

2. **Browser Compatibility**: The app is designed for modern web browsers and may not support older versions.

3. **Geolocation**: The app doesn't use browser geolocation. The default city is set to New York, but users can search for any city.

4. **Error Handling**: The app includes basic error handling for API calls and displays user-friendly error messages.

5. **Local Storage**: The last searched city and its weather data are stored in the browser's local storage for offline access.

6. **Responsive Design**: The UI adapts to different screen sizes using Tailwind CSS classes.

7. **Icon Library**: The app uses the `lucide-react` library for weather icons.

## How to Use the Application

1. **Search for a City**:

   - Type a city name in the search bar at the top of the page.
   - As you type, a dropdown will appear with city suggestions.
   - Click on a suggestion or press Enter to select a city.

2. **View Current Weather**:

   - The main display shows the selected city's name, current temperature, weather condition, and a representative icon.

3. **Check 5-Day Forecast**:

   - Scroll down to view the 5-day forecast.
   - Each day shows the expected weather icon, high and low temperatures.

4. **Switch Temperature Units**:

   - Click the toggle button to switch between Celsius and Fahrenheit.
   - All temperature displays will update accordingly.

5. **Refresh Weather Data**:

   - On touch devices: Pull down from the top of the screen to refresh.
   - On desktop: Reload the page or use the refresh button (if implemented).

6. **Offline Mode**:
   - If you've previously searched for a city, the app will display cached data when offline.
   - An indicator will show that you're viewing offline data.

## Performance Optimizations

The application incorporates several performance optimization techniques:

1. **Lazy Loading Components**:

   - The `WeatherDisplay` and `ForecastDisplay` components are lazy-loaded using React's `lazy` and `Suspense`.
   - This reduces the initial bundle size and improves the app's load time.

2. **Memoization**:

   - Components like `WeatherIcon`, `ForecastCard`, and `ForecastDisplay` use React's `memo` to prevent unnecessary re-renders.

3. **Debounced API Calls**:

   - The city search functionality uses a debounce mechanism to limit API calls while typing.

4. **Optimized API Calls**:

   - Weather data is fetched only when necessary (e.g., when a new city is selected or during a refresh action).

5. **Local Storage Caching**:

   - The last searched city and its weather data are cached in local storage.
   - This allows for offline access and reduces API calls for frequently checked cities.

6. **Code Splitting**:

   - The use of lazy loading inherently introduces code splitting, which helps in reducing the initial load time of the application.

7. **Efficient State Management**:

   - The app uses React's built-in hooks for state management, avoiding unnecessary complexity and potential performance issues associated with larger state management libraries for this scale of application.

8. **Tailwind CSS**:
   - The use of Tailwind CSS helps in keeping the styling efficient and the overall bundle size smaller compared to larger CSS frameworks.

These optimizations collectively contribute to a faster, more responsive user experience, especially on slower networks or less powerful devices.

## Future Enhancements

- Implement server-side rendering for improved initial load time and SEO.
- Add more detailed weather information (humidity, wind speed, etc.).
- Integrate weather alerts and notifications.
- Implement user accounts for saving favorite locations.
