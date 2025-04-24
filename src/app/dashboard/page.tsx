'use client';

import { useState } from 'react';
import { Container, Typography, Box, Paper, Grid, Divider, Chip } from '@mui/material';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import HistoricalWeatherChart from './components/HistoricalWeatherChart';
import { useTheme } from '@mui/material/styles';
import { getWeatherPaperStyle } from '@/utils/styles';
import { WeatherCondition } from '@/types/weather';
import styles from './page.module.css';

const WeatherApp = () => {
  const theme = useTheme();
  const [selectedCity, setSelectedCity] = useState<string>('Bogotá, CO');
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>('clear');

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <Box padding={2.4} bgcolor={'#4d4d4d'}>
      <Container maxWidth={false} sx={{ ...getWeatherPaperStyle(theme, weatherCondition), margin: 0 }}>
        <Typography variant={'h4'} align={'center'} gutterBottom className={styles.title}>
          Weather Dashboard
        </Typography>
        <Paper elevation={3} sx={{ 
          p: 2, 
          mb: 4,
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.8)'
        }}>
          <CitySearch onSelectCity={handleSelectCity} />
        </Paper>
        <Paper elevation={3} sx={{
          p: 3,
          mb: 4,
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 6, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold', mr: 2 }}>
                  {selectedCity}
                </Typography>
                <Chip label='Updated now' color='primary' size='small' />
              </Box>
              <WeatherDisplay city={selectedCity}
                              onWeatherData={(data) => {
                                setWeatherCondition(data.description as WeatherCondition);
                              }} />
              <Divider sx={{ my: 3 }} />
              <Typography variant='body2' color='text.secondary'>
                Today, the weather will be mostly sunny with a chance of showers in the afternoon.
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 8   }}>
              <HistoricalWeatherChart city={selectedCity} />
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {['Wind', 'Humidity', 'Pressure', 'Visibility'].map((item) => (
            <Grid size={{ xs: 6, md: 3 }} key={item}>
              <Paper elevation={2} sx={{
                p: 2,
                borderRadius: '12px',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.8)'
              }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  {item}
                </Typography>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  {item === 'Wind' ? '9.8 km/h' : 
                   item === 'Humidity' ? '65%' : 
                   item === 'Pressure' ? '1012 hPa' : '10 km'}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
          Other Cities
        </Typography>
        <Grid container spacing={2}>
          {['New York', 'London', 'Tokyo', 'Paris', 'Sydney'].map((city) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={city}>
              <Paper elevation={1} sx={{
                p: 1.5,
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#f0f4f8' }
              }} onClick={() => setSelectedCity(city)}>
                <Typography variant='subtitle2'>{city}</Typography>
                <Typography variant='body2'>24° / 18°</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WeatherApp;