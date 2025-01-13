const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

const fetchWeatherData = async (req, res, next) => {
    if (!req.params.city.match(/^[a-zA-Z\s\-]+$/)) {
      return res.status(400).json({msg : 'Invalid city name. Only alphabets are allowed.'});
    }
  
    const city = req.params.city;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
    try {
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
  
      weatherInfo = {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        feels_like: weatherData.main.feels_like,
        min_temp: weatherData.main.temp_min,
        max_temp: weatherData.main.temp_max,
        humidity: weatherData.main.humidity,
        wind_speed: weatherData.wind.speed,
        rain :  weatherData.rain?.['1h'] || null
      };
  
      req.weatherInfo = weatherInfo;
      next(); 
    } catch (error) {
      console.log(error);
      if (error.response) {
        const err = {
          status: error.response.status,
        };
        req.error = err;
      } else {
        req.error = {
          status: 500,
        };
      }
    next();
  };
  }

  module.exports = fetchWeatherData;