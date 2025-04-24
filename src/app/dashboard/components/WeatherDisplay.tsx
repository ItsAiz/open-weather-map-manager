'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import WeatherApi from '@/services/WeatherApi';
import { CurrentWeather } from '@/types/weather';

interface WeatherDisplayProps {
  city: string;
  onWeatherData?: (data: CurrentWeather) => void;
}

const WeatherDisplay = ({ city, onWeatherData }: WeatherDisplayProps) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    WeatherApi.getCurrentWeather(city)
      .then((weather) => {
        setCurrentWeather(weather);
        if (onWeatherData) {
          onWeatherData(weather);
        }
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line
  }, [city]);

  if (loading) {
    return (
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'200px'}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentWeather) {
    return (
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'200px'}>
        <Typography variant={'h6'} color={'error'}>
          Unable to retrieve weather information.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box mt={2}>
        <Image src={currentWeather.icon} alt={'Ícono del clima'} width={100} height={100} />
      </Box>
      <Typography variant={'h5'} gutterBottom>
        Current weather in {city}
      </Typography>
      <Typography variant={'body1'}>
        <strong>Temperature:</strong> {currentWeather.temp}°C
      </Typography>
      <Typography variant={'body1'}>
        <strong>Feels like:</strong> {currentWeather.feels_like}°C
      </Typography>
      <Typography variant={'body1'}>
        <strong>Humidity:</strong> {currentWeather.humidity}%
      </Typography>
      <Typography variant={'body1'}>
        <strong>Wind speed:</strong> {currentWeather.wind_speed} m/s
      </Typography>
      <Typography variant={'body1'}>
        <strong>Description:</strong> {currentWeather.description}
      </Typography>
    </Box>
  );
};

export default WeatherDisplay;
