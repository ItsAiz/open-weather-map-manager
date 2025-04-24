'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import WeatherApi from '@/services/WeatherApi';
import { CurrentWeather } from '@/types/weather';

const WeatherDisplay = ({ city }: { city: string }) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    WeatherApi.getCurrentWeather(city)
      .then((weather) => setCurrentWeather(weather))
      .finally(() => setLoading(false));
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
          No se pudo obtener la información del clima.
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
        Clima actual en {city}
      </Typography>
      <Typography variant={'body1'}>
        <strong>Temperatura:</strong> {currentWeather.temp}°C
      </Typography>
      <Typography variant={'body1'}>
        <strong>Sensación térmica:</strong> {currentWeather.feels_like}°C
      </Typography>
      <Typography variant={'body1'}>
        <strong>Humedad:</strong> {currentWeather.humidity}%
      </Typography>
      <Typography variant={'body1'}>
        <strong>Velocidad del viento:</strong> {currentWeather.wind_speed} m/s
      </Typography>
      <Typography variant={'body1'}>
        <strong>Descripción:</strong> {currentWeather.description}
      </Typography>
    </Box>
  );
};

export default WeatherDisplay;
