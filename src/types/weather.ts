type WeatherMain = {
  temp: number;
  feels_like: number;
  humidity: number;
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
  description: string;
  icon: string;
};