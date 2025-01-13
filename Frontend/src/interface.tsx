export interface WeatherData {
    city : String,
    temperature : Number,
    description : String,
    feels_like: Number,
    min_temp : Number,
    max_temp: Number,
    humidity: Number,
    wind_speed: Number,
    rain: any 
}

export interface ApiError {
    msg : any ,
    status : Number
}