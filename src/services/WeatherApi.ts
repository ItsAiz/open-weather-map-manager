import { v4 as uuidv4 } from 'uuid';
import { api, apiKey, escalateError, getResponseData } from './index';
import {
  CitySearchResponse,
  CitySuggestion,
  CurrentWeather,
  ForecastResponse,
  ProcessedForecast,
  WeatherResponse } from '@/types/weather';
const publicApiUrl: string | undefined = process.env.NEXT_PUBLIC_REACT_API_URL_PUBLIC;

export default class WeatherApi {
  static async getCurrentWeather(city: string): Promise<CurrentWeather> {
    return api.get<WeatherResponse>('/weather', {
      params: { q: city, appid: apiKey, units: 'metric' },
    })
      .then((resp) => {
        const data = getResponseData(resp);
        return {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed,
          pressure: data.main.pressure,
          visibility: data.visibility ?? 0,
          description: data.weather[0]?.description || 'Sin descripción',
          icon: `https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`,
        };
      })
      .catch(escalateError);
  }

  static async getForecastByCity(city: string): Promise<ProcessedForecast[]> {
    return api.get<ForecastResponse>('/forecast', {
      params: { q: city, appid: apiKey, units: 'metric' },
    })
      .then((resp) => {
        const data = getResponseData(resp);
        const grouped: Record<string, ProcessedForecast> = {};

        data.list.forEach((entry) => {
          const date = entry.dt_txt.split(' ')[0];

          if (!grouped[date]) {
            grouped[date] = {
              date,
              min: entry.main.temp_min,
              max: entry.main.temp_max,
              humidity: entry.main.humidity,
              wind_speed: entry.wind.speed,
            };
          } else {
            grouped[date].min = Math.min(grouped[date].min, entry.main.temp_min);
            grouped[date].max = Math.max(grouped[date].max, entry.main.temp_max);
          }
        });

        return Object.values(grouped).slice(0, 5);
      })
      .catch(escalateError);
  }

  static async searchCity(query: string): Promise<CitySuggestion[]> {
    if (!query.trim()) {
      return Promise.resolve([]);
    }

    return api.get<CitySearchResponse>(`${publicApiUrl}`, {
      params: { q: query, limit: 5, appid: apiKey },
    })
      .then((resp) => {
        const data = getResponseData(resp);
        return data.map((item) => ({
          id: uuidv4(),
          name: item.name,
          country: item.country,
          state: item.state,
          lat: item.lat,
          lon: item.lon,
          label: `${item.name}${item.state ? ', ' + item.state : ''}, ${item.country}`,
        }));
      })
      .catch(escalateError);
  }
}
