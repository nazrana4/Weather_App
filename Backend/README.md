# Weather Application

This project is a simple weather application built using Node.js, Express, SQLite, and Axios. It fetches weather data from the OpenWeatherMap API and provides city suggestions based on user input.

## Features

- Fetch real-time weather data for a given city.
- Provide city name suggestions based on user input.
- Validate city names to ensure only valid inputs are processed.
- Handle API errors gracefully and return appropriate error messages.


## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/weather-app.git
   cd weather-app/Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your OpenWeatherMap API key:
     ```
     API_KEY=your_openweathermap_api_key
     ```

4. **Prepare the database:**
   - Ensure the `city.list.json` file is present in the root directory. Otherwise,
   - Run the database setup script:
     ```bash
     node cities_db.js
     ```

5. **Start the server:**
   ```bash
   node server.js
   ```

6. **Access the application:**
   - Server runs on `http://localhost:3000`

## API Endpoints

### 1. Fetch Weather Data
- **URL:** `GET /:city`
- **Description:** Fetches weather information for the given city.
- **Response:**
  - Success: Returns weather details including temperature, humidity, wind speed, etc.
  - Error:
    - `400`: Invalid city name.
    - `404`: City not found.
    - `500`: Server error.

- **Example Request:**
  ```
  GET /London
  ```

- **Example Response:**
  ```json
  {
    "city": "London",
    "temperature": 15.5,
    "description": "light rain",
    "feels_like": 13.2,
    "min_temp": 14.0,
    "max_temp": 16.5,
    "humidity": 87,
    "wind_speed": 4.1,
    "rain": 0.5
  }
  ```

### 2. Get City Suggestions
- **URL:** `GET /suggestions/:name`
- **Description:** Provides up to 5 city name suggestions based on the input.
- **Response:**
  - Success: Returns an array of suggested city names.
  - Error: `500`: Internal Server Error.

- **Example Request:**
  ```
  GET /suggestions/lo
  ```

- **Example Response:**
  ```json
  {
    "suggestions": [
      "London",
      "Los Angeles",
      "Lodz",
      "Logrono",
      "Lome"
    ]
  }
  ```

## Error Handling
- **Invalid City Name:** Ensures only valid alphabetic city names are processed.
- **API Errors:** Handles API-specific errors such as 404 (city not found) and other unexpected issues.

## Dependencies
- **Express:** For building the web server.
- **Axios:** For making HTTP requests to the OpenWeatherMap API.
- **SQLite3:** For managing the city names database.
- **dotenv:** For managing environment variables.
- **cors:** For handling cross-origin requests.

## Notes
- Ensure that your API key is valid and has sufficient quota for API calls.
- The database setup may take a few minutes depending on the size of the `city.list.json` file.
