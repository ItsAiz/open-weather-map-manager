'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography, ToggleButtonGroup, ToggleButton, Paper, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WeatherApi from '@/services/WeatherApi';
import { ProcessedForecast } from '@/types/weather';

const HistoricalWeatherChart = ({ city, styles }: { city: string, styles: object }) => {
  const theme = useTheme();
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
      value:
        chartType === 'temp'
          ? (entry.max + entry.min) / 2
          : chartType === 'humidity'
          ? entry.humidity
          : entry.wind_speed,
    }));
  };

  const getChartLabel = () => {
    switch (chartType) {
      case 'temp':
        return 'Temperature (°C)';
      case 'humidity':
        return 'Humidity (%)';
      case 'wind':
        return 'Wind (km/h)';
    }
  };

  const getLineColor = () => {
    switch (chartType) {
      case 'temp':
        return theme.palette.error.main;
      case 'humidity':
        return theme.palette.info.main;
      case 'wind':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };  

  if (loading) {
    return (
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ ...styles, p: 3, borderRadius: 3 }}>
      <Typography variant={'h6'} gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
        Historical weather for the next 5 days
      </Typography>
      <ToggleButtonGroup
        color={'primary'}
        value={chartType}
        exclusive
        onChange={(_, value) => value && setChartType(value)}
        sx={{mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {[
          { label: 'Temperature', value: 'temp' },
          { label: 'Humidity', value: 'humidity' },
          { label: 'Wind', value: 'wind' },
        ].map(({ label, value }) => (
          <ToggleButton
            key={value}
            value={value}
            sx={{
              flex: '1 1 auto',
              minWidth: '100px',
              color: 'white',
              '&.Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                color: '#333',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              },
            }}>
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart data={getDataForChart()} margin={{ top: 20, right: 20, left: 2, bottom: 0 }}>
          <CartesianGrid strokeDasharray={'3 3'} stroke={theme.palette.divider} />
          <XAxis dataKey={'date'} stroke={'white'} />
          <YAxis stroke={'white'}
                 label={{ value: getChartLabel(), angle: -90, position: 'insideLeft', fill: 'white' }} />
          <Tooltip
            contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: 8 }}
            labelStyle={{ color: theme.palette.text.primary }} />
          <Line
            type={'monotone'}
            dataKey={'value'}
            stroke={getLineColor()}
            strokeWidth={2}
            activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default HistoricalWeatherChart;
