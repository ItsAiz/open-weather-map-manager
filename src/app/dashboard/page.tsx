'use client';

import { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import HistoricalWeatherChart from './components/HistoricalWeatherChart';
import styles from './page.module.css';

const WeatherApp = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <Box className={styles['box-container']}>
      <Container maxWidth={'md'} sx={{ py: 4 }}>
        <Typography color={'black'} variant={'h4'} align={'center'} gutterBottom>
          Consulta del Clima
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <CitySearch onSelectCity={handleSelectCity} />
        </Paper>
        {!selectedCity ? (
          <Typography align={'center'} color={'textSecondary'}>
            Por favor, selecciona una ciudad para ver la información del clima.
          </Typography>
        ) : (
          <Box display={'flex'} flexDirection={'column'} gap={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <WeatherDisplay city={selectedCity} />
            </Paper>
            <Paper elevation={2} sx={{ p: 2 }}>
              <HistoricalWeatherChart city={selectedCity} />
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default WeatherApp;
