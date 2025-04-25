'use client';

import { useState } from 'react';
import { Container, Typography, Box, Paper, Grid, Divider, Chip, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddchartIcon from '@mui/icons-material/Addchart';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import HistoricalWeatherChart from './components/HistoricalWeatherChart';
import { getWeatherPaperStyle } from '@/utils/styles';
import { CurrentWeather, WeatherCondition } from '@/types/weather';
import styles from './page.module.css';

const WeatherApp = () => {
  const theme = useTheme();
  const [selectedCity, setSelectedCity] = useState<string>('Bogotá, CO');
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>('clear');
  const [fadeIn, setFadeIn] = useState(true);

  const handleSelectCity = (city: string) => {
    setFadeIn(false);
    setTimeout(() => {
      setSelectedCity(city);
      setFadeIn(true);
    }, 300);
  };

  return (
    <Box minHeight={'100vh'}>
      <Box className={'overlay'} />
      <Fade in={fadeIn} timeout={500} key={selectedCity}>
        <Container maxWidth={false}
                   sx={{ ...getWeatherPaperStyle(theme, weatherCondition), margin: 0, minHeight: '100vh' }}>
          <Box textAlign={'center'} sx={{ mt: 4, mb: 3 }}>
            <Typography
              variant={'h2'}
              className={styles.title}
              sx={{
                fontWeight: 700,
                color: '#fff',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}>
              <AddchartIcon fontSize={'inherit'} sx={{ color: '#ffcc00' }} />
              Weather Dashboard
            </Typography>
            <Typography variant={'subtitle1'} sx={{ color: '#f0f0f0', mt: 1 }}>
              Real-time insights and historical trends at your fingertips
            </Typography>
          </Box>
          <Paper elevation={3} sx={{ 
            p: 2, 
            mb: 4,
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.6)',
          }}>
            <CitySearch onSelectCity={handleSelectCity} />
          </Paper>
          <Paper elevation={3} sx={{
            p: 3,
            mb: 4,
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.6)'
          }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='h5' sx={{ fontWeight: 'bold', mr: 2 }}>
                    {selectedCity}
                  </Typography>
                  <Chip label='Updated now' color='primary' size='small' />
                </Box>
                <WeatherDisplay city={selectedCity}
                                onWeatherData={(data) => {
                                  setWeatherCondition(data.description as WeatherCondition);
                                  setWeatherData(data);
                                }} />
                <Divider sx={{ my: 3 }} />
                <Typography variant='body2' color='text.secondary'>
                  Today, the weather will be mostly sunny with a chance of showers in the afternoon.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 8  }}>
                <HistoricalWeatherChart city={selectedCity} styles={getWeatherPaperStyle(theme, weatherCondition)} />
              </Grid>
            </Grid>
          </Paper>
          <Fade in={fadeIn} timeout={500} key={`stats-${selectedCity}`}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {weatherData && ['Wind', 'Humidity', 'Pressure', 'Visibility'].map((item) => {
                const value = 
                  item === 'Wind' ? `${weatherData.wind_speed} m/s` :
                  item === 'Humidity' ? `${weatherData.humidity}%` :
                  item === 'Pressure' ? `${weatherData.pressure} hPa` :
                  `${weatherData.visibility / 1000} km`;
                return (
                  <Grid size={{ xs: 6, md: 3 }} key={item}>
                    <Paper elevation={2} sx={{
                      p: 2,
                      borderRadius: '12px',
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.6)'
                    }}>
                      <Typography variant='subtitle2' color='text.secondary'>
                        {item}
                      </Typography>
                      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        {value}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Fade>
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
                  background: 'rgba(255, 255, 255, 0.6)',
                  '&:hover': { backgroundColor: '#f0f4f8' }
                }} onClick={() => setSelectedCity(city)}>
                  <AddchartIcon />
                  <Typography variant='subtitle2'>{city}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Fade>
    </Box>
  );
};

export default WeatherApp;