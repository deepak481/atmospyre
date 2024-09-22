# Weather Forecast Application

This is a React-based weather forecast application that allows users to search for and view weather information for different cities. The app displays current weather conditions and a 5-day forecast.

## Setup Instructions

1. Clone the repository to your local machine:

   ```
   git clone
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

4. Start the development server:

   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Assumptions Made During Development

1. The application uses a free weather API (e.g., OpenWeatherMap or WeatherAPI) for fetching weather data. You need to sign up for an API key from the chosen provider.

2. The app is designed to work on modern web browsers and is responsive for various screen sizes.

3. The city search functionality assumes that the API provides city suggestions based on user input.

4. The application stores the last searched city and its weather data in the browser's local storage for offline viewing.

5. The pull-to-refresh functionality is primarily designed for touch devices but can also be triggered on desktop browsers.

6. The temperature unit conversion (Celsius/Fahrenheit) is implemented manually without relying on external libraries.

## How to Use the Application

1. **Search for a City**: Use the search bar at the top of the page to look up weather information for a specific city. As you type, you'll see suggestions appear in a dropdown list. Click on a suggestion to select it.

2. **View Current Weather**: The main display shows the current weather for the selected city, including temperature, weather condition, and an icon representing the weather.

3. **Check 5-Day Forecast**: Scroll down to see the 5-day forecast, which displays the expected weather conditions and temperature ranges for the next five days.

4. **Switch Temperature Units**: Click the toggle button to switch between Celsius and Fahrenheit for all temperature displays.

5. **Refresh Weather Data**: On touch devices, pull down from the top of the screen to refresh the weather data. On desktop, you can click a refresh button (if implemented) or reload the page.

6. **Offline Mode**: If you've previously searched for a city, the app will display the last cached data when you're offline. An indicator will show that you're viewing offline data.

7. **Responsive Design**: The application is designed to work on both desktop and mobile devices. The layout will adapt to different screen sizes for optimal viewing.

Enjoy using the Weather Forecast Application!
