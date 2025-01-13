# Weather App Frontend

This is the frontend application for a Weather App that allows users to search for weather details of a city. It fetches weather data from an API and provides features like search history, suggestions, and a detailed weather card.

## Features

- **Search Weather**: Enter a city name to fetch weather data.
- **Weather Details**: Displays temperature, humidity, wind speed, and more.
- **Search History**: Maintains a list of recently searched cities.
- **Suggestions**: Provides suggestions as you type.

## Tech Stack

- **React**: Frontend library.
- **Tailwind CSS**: Styling framework.
- **Axios**: HTTP client for API calls.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd weather-app-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Application**:
   ```bash
   npm start
   ```

## Usage

1. **Enter a City Name**: Type a city name in the search box.
2. **View Weather Details**: The weather details will be displayed below the search box.
3. **Access Search History**: Click on previously searched cities from the dropdown.

## Key Components

### `SearchBox`
- Handles user input and triggers the API call to fetch weather data.
- Manages search history and suggestions.
- Validates input to ensure only alphabetical characters are entered.

### `WeatherCard`
- Displays detailed weather information, including temperature, description, and more.
- Shows loading or error messages when applicable.

### `useSearchHistory`
- Custom React hook to manage search history.
- Uses `localStorage` to persist history.

## API Integration

### Endpoints
- **Fetch Weather**: `http://localhost:3000/{cityName}`
- **Fetch Suggestions**: `http://localhost:3000/suggestions/{query}`

### Example API Response
#### Weather Data
```json
{
  "city": "New York",
  "temperature": 25,
  "description": "clear sky",
  "feels_like": 27,
  "min_temp": 20,
  "max_temp": 30,
  "humidity": 60,
  "wind_speed": 5,
  "rain": null
}
```

#### Suggestions
```json
{
  "suggestions": ["New York", "Newark", "New Orleans"]
}
```

## Tailwind CSS Classes

### Search Box
```css
w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300
```

### Weather Card
```css
mt-5 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-lg
```

## State Management

### States in `App.tsx`
- `city`: Holds the current search input.
- `weatherData`: Stores the fetched weather data.
- `loading`: Indicates whether an API call is in progress.
- `error`: Stores any error messages from API responses.
- `searchHistory`: Tracks the list of previously searched cities.
- `showSearchHistory`: Toggles the visibility of the search history dropdown.

## Local Storage
- The `STORAGE_KEY` (`WEATHER_APP_SEARCH_HISTORY`) is used to store and retrieve the search history.
- Limits the history to 5 cities for simplicity.

## Running the Application
1. Start the backend API server at `http://localhost:3000`.
2. Run the frontend application using `npm start`.
3. Open the application in the browser at `http://localhost:3000`.

## Future Enhancements

- Add unit tests using Jest and React Testing Library.
- Improve responsiveness for smaller devices.
- Integrate a loading spinner for better UX.
- Enhance error handling for different HTTP status codes.

---

Enjoy using the Weather App!

