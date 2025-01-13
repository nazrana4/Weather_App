import { useState } from "react";
import { SearchBox } from "./components/SearchBox";
import { WeatherCard } from "./components/WeatherCard";
import { useSearchHistory } from "./hooks/useSearchHistory";

function App() {
  const [city, setCity] = useState<string>(""); 
  const [weatherData, setWeatherData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [searchHistory, addSearchHistory, removeSearchHistory] = useSearchHistory(); 
  const [showSearchHistory, setShowSearchHistory] = useState(false); 

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 p-5">
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-900">Weather App</h1>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <SearchBox
          value={city} 
          onChange={setCity} 
          isLoading={loading} 
          setData={setWeatherData} 
          setLoading={setLoading} 
          setError={setError} 
          showSearchHistory={showSearchHistory}
          setShowSearchHistory={setShowSearchHistory}
          addSearchHistory={addSearchHistory} 
          removeSearchHistory={removeSearchHistory} 
          searchHistory={searchHistory}
        />

        <WeatherCard isLoading={loading} data={weatherData} error={error} />
      </div>
    </div>
  );
}

export default App;
