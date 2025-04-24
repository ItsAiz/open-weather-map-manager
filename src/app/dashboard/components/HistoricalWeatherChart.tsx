'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer } from 'recharts';
import WeatherApi from '@/services/WeatherApi';
import { ProcessedForecast } from '@/types/weather';

const HistoricalWeatherChart = ({ city }: { city: string }) => {
  const [forecastData, setForecastData] = useState<ProcessedForecast[]>([]);
  const [chartType, setChartType] = useState<'temp' | 'humidity' | 'wind'>('temp');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    WeatherApi.getForecastByCity(city)
      .then((data) => setForecastData(data))
      .finally(() => setLoading(false));
  }, [city]);

  const getDataForChart = () => {
    return forecastData.map((entry) => ({
      date: entry.date,
      value: chartType === 'temp' ? (entry.max + entry.min) / 2 :
             chartType === 'humidity' ? entry.humidity : entry.wind_speed,
    }));
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div>
      <h3>Gráfico del clima en los últimos 5 días</h3>
      <div>
        <button onClick={() => setChartType('temp')}>Temperatura</button>
        <button onClick={() => setChartType('humidity')}>Humedad</button>
        <button onClick={() => setChartType('wind')}>Viento</button>
      </div>
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart data={getDataForChart()}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey={'date'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type={'monotone'} dataKey={'value'} stroke={'#8884d8'} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalWeatherChart;
