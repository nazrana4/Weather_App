# Weather App

This project is a full-stack weather application designed to provide users with real-time weather data and city name suggestions. It consists of a React frontend and an Express.js backend integrated with an SQLite database.

---

## Project Overview

The Weather App enables users to:

- Search for weather information by city name.
- View detailed weather information, including temperature, humidity, wind speed, and more.
- Access suggestions for city names while typing.
- Maintain a history of recent searches for quick access.

The backend fetches data from external APIs and interacts with an SQLite database to provide efficient city name suggestions. It handles errors gracefully and supports cross-origin requests for seamless frontend-backend communication.

The server is hosted on Replit for convenience but can also be initialized locally by following the instructions provided in the respective `README.md` files located in both the frontend and backend folders.

---

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- SQLite3
- npm or yarn

### Backend Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/weather-app.git
   cd weather-app/Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize the database:
   - Ensure `cities.db` exists with a table named `cities`. Otherwise run the below command
      ```bash
   node city_db.js
   ```
   - Populate the table with city names (e.g., using a CSV import tool or SQLite commands).

4. Start the server:
   ```bash
   node server.js
   ```

   The server will run on `http://localhost:3000/`.

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd weather-app/Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173/`.

---

## API Documentation

### `GET /:city`
- **Description**: Fetches weather information for a specified city.
- **Parameters**:
  - `city`: The name of the city (alphabets only).
- **Response**:
  - **200**: JSON object with weather details.
  - **404**: `{ msg: 'City not found' }`
  - **500**: `{ msg: 'Server error. Please try after some time' }`

### `GET /suggestions/:name`
- **Description**: Provides city name suggestions based on input.
- **Parameters**:
  - `name`: Partial city name (case-insensitive).
- **Response**:
  - **200**: `{ suggestions: ['City1', 'City2', ...] }`
  - **500**: `{ msg: 'Internal Server Error' }`

---

## Design Decisions

1. **React for Frontend**:
   - Leveraged React components for a modular and reusable UI.
   - Used hooks like `useState` and `useEffect` to manage state and side effects.

2. **Express.js for Backend**:
   - Chosen for its simplicity and compatibility with a wide range of middleware.
   - Facilitates efficient routing and error handling.

3. **SQLite for Database**:
   - Lightweight and easy to set up.
   - Suitable for the scale of this application.

4. **Middleware Structure**:
   - `fetchWeatherData` middleware abstracts API calls, ensuring separation of concerns.

---

## Future Improvements

1. **Enhanced Error Handling**:
   - Improve error messages with more user-friendly language.
   - Log errors to an external monitoring service.

2. **Scalability**:
   - Replace SQLite with a more scalable database like PostgreSQL for larger datasets.
   - Implement caching for frequently accessed cities to reduce API call latency.

3. **UI/UX Enhancements**:
   - Add animations for loading states and transitions.

---

## Notes about Platform Limitations

1. **Rate Limits**:
   - External weather APIs may impose rate limits, potentially affecting the application during high traffic.

2. **Database Constraints**:
   - SQLite is not suitable for concurrent high-volume requests; consider migration to a robust database for production use.

---

### Also the link on the hosted frontend and backend are:
- Backend : https://replit.com/@NazranaBagwan/Weather-App-Server
- Frontend : https://gregarious-buttercream-f484c5.netlify.app/
