import { WeatherData, ApiError } from "../interface";

interface WeatherCardProps {
  data: WeatherData | null;
  error: ApiError | null;
  isLoading: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ isLoading, data, error }) => {
  return (
    <div className="mt-5 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
      {isLoading ? (
        <h2 className="text-center text-blue-500 text-lg font-medium">Loading...</h2>
      ) : (
        <>
          {error ? (
            <h2 className="text-center text-red-500 text-lg font-medium">{error.msg}</h2>
          ) : (
            data && (
              <>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                  Weather Details
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-bold">City Name:</span> {data.city}
                  </p>
                  <p>
                    <span className="font-bold">Temperature:</span> {data.temperature}°C
                  </p>
                  <p>
                    <span className="font-bold">Description:</span> {data.description}
                  </p>
                  <p>
                    <span className="font-bold">Feels Like:</span> {data.feels_like}°C
                  </p>
                  <p>
                    <span className="font-bold">Min Temp:</span> {data.min_temp}°C
                  </p>
                  <p>
                    <span className="font-bold">Max Temp:</span> {data.max_temp}°C
                  </p>
                  <p>
                    <span className="font-bold">Humidity:</span> {data.humidity}%
                  </p>
                  <p>
                    <span className="font-bold">Wind Speed:</span> {data.wind_speed} m/s
                  </p>
                  {data.rain && (
                    <p>
                      <span className="font-bold">Rain:</span> {data.rain} mm/h
                    </p>
                  )}
                </div>
              </>
            )
          )}
        </>
      )}
    </div>
  );
};
