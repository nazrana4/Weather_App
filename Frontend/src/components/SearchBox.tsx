import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  setData: any;
  isLoading: boolean;
  setLoading: (value: (prev: boolean) => boolean) => void;
  setError: (value: any) => void;
  showSearchHistory: boolean;
  setShowSearchHistory: (value: boolean) => void;
  addSearchHistory: (city: string) => void;
  removeSearchHistory: (city: string) => void;
  searchHistory: string[];
}

async function fetchWeather(cityName: string) {
  const url = "http://localhost:3000/";
  const response: { data: any | null, error: { msg: string; status: number; } | null } = { data: null, error: null };

  if (!/^[a-zA-Z\s]*$/.test(cityName)) {
    response.error = { msg: "City name should be alphabets only", status: 400 };
    return response;
  }

  try {
    const apiResponse = await axios.get(url + cityName);
    response.data = apiResponse.data;
  } catch (error: any) {
    console.error(error);
    response.error = {
      msg: error.response?.data?.msg || "An error occurred",
      status: error.response?.status || 500,
    };
  }

  return response;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  setData,
  isLoading,
  setLoading,
  setError,
  showSearchHistory,
  setShowSearchHistory,
  addSearchHistory,
  removeSearchHistory,
  searchHistory,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    setShowSearchHistory(false);
    addSearchHistory(value);
    const { data, error } = await fetchWeather(value);
    setLoading((prev) => !prev);
    setData(data);
    setSuggestions([]);
    setError(error);
  };

  // Fetch suggestions on input change with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value.trim()) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/suggestions/${query}`);
      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // Close the dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSearchHistory(false);
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSearchHistory]);

  // Handle city selection from dropdown
  const handleCitySelect = (city: string) => {
    onChange(city);
    setShowSearchHistory(false); 
    setSuggestions([]); 
  };

  return (
    <div ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter City Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSearchHistory(true)} 
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-3 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Searching" : "Search"}
        </button>

        {showSearchHistory && value.trim() === "" && searchHistory.length > 0 && (
          <div className="dropdown absolute bg-white border border-gray-300 mt-2 rounded-lg shadow-lg w-80 z-10">
            <h4 className="font-bold text-center">Previous Searches:</h4>
            {searchHistory.map((city) => (
              <div
                key={city}
                className="dropdown-item px-4 py-2 flex items-center justify-between hover:bg-blue-100 cursor-pointer"
                onClick={() => handleCitySelect(city)} 
              >
                <span>{city}</span>
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    removeSearchHistory(city);
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {suggestions.length > 0 && value.trim() && (
          <div className="dropdown absolute bg-white border border-gray-300 mt-2 rounded-lg shadow-lg w-80 z-10">
            <h4 className="font-bold text-center">Suggestions:</h4>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="dropdown-item px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleCitySelect(suggestion)} 
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};
