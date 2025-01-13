import { useState } from "react"
const STORAGE_KEY = "WEATHER_APP_SEARCH_HISTORY"


const fecthSearchHistory = ()=>{
    if(localStorage.getItem(STORAGE_KEY) == null){
        localStorage.setItem(STORAGE_KEY , JSON.stringify([]));
        console.log("Search History is empty")
        return [];
    }
    const stringifiedSearchHistory = localStorage.getItem(STORAGE_KEY)!;
    console.log("Search History is not empty")
    return JSON.parse(stringifiedSearchHistory);
}

export const useSearchHistory = () => {
    const [searchHistory,setSearchHistory] = useState(fecthSearchHistory);

    function addSearchHistory(city: string) {
        setSearchHistory((prevHistory) => {
            // Prevent duplicates
            if (!prevHistory.includes(city)) {
                const updatedHistory = [city, ...prevHistory].slice(0,5); // Add to the beginning of the array
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
                return updatedHistory; // Return updated history to set it in state
            }
            return prevHistory; // If city already exists, return the previous state
        });
    }

    function removeSearchHistory(city: string) {
        setSearchHistory((prevHistory) => {
            const updatedHistory = prevHistory.filter((item) => item !== city);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
            return updatedHistory;
        });
    }

  return [searchHistory, addSearchHistory, removeSearchHistory];
}
