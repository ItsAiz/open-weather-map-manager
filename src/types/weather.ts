type WeatherMain = {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
};
  
type WeatherDescription = {
  description: string;
  icon: string;
};
  
type WeatherWind = {
  speed: number;
};
  
export type WeatherResponse = {
  main: WeatherMain;
  weather: WeatherDescription[];
  wind: WeatherWind;
  visibility: number;
};
  
type ForecastMain = {
  temp_min: number;
  temp_max: number;
  humidity: number;
};
  
type ForecastWind = {
  speed: number;
};
  
type ForecastListItem = {
  dt_txt: string;
  main: ForecastMain;
  wind: ForecastWind;
};
  
export type ForecastResponse = {
  list: ForecastListItem[];
};
  
type CitySearchItem = {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;  };
  
export type CitySearchResponse = CitySearchItem[];
  
export type CitySuggestion = {
  id: string;
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  label: string;
};
  
export type ProcessedForecast = {
  date: string;
  min: number;
  max: number;
  humidity: number;
  wind_speed: number;
};
  
export type CurrentWeather = {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
  description: string;
  icon: string;
};

export type WeatherCondition = 
  | 'thunderstorm' | 'thunderstorm with light rain' | 'thunderstorm with rain' 
  | 'thunderstorm with heavy rain' | 'light thunderstorm' | 'heavy thunderstorm'
  | 'drizzle' | 'light intensity drizzle' | 'drizzle rain' | 'heavy intensity drizzle'
  | 'rain' | 'light rain' | 'moderate rain' | 'heavy intensity rain'
  | 'snow' | 'light snow' | 'heavy snow' | 'sleet'
  | 'mist' | 'fog' | 'haze' | 'sand' | 'dust'
  | 'clear' | 'clear sky'
  | 'clouds' | 'few clouds' | 'scattered clouds' | 'broken clouds' | 'overcast clouds';