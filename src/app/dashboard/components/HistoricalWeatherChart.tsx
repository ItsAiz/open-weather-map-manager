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
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography, ToggleButtonGroup, ToggleButton, Paper, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WeatherApi from '@/services/WeatherApi';
import { ProcessedForecast } from '@/types/weather';

const HistoricalWeatherChart = ({ city }: { city: string }) => {
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
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant={'h6'} gutterBottom sx={{ fontWeight: 'bold' }}>
        Historical weather for the next 5 days
      </Typography>
      <ToggleButtonGroup
        color={'primary'}
        value={chartType}
        exclusive
        onChange={(_, value) => value && setChartType(value)}
        sx={{mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <ToggleButton sx={{ flex: '1 1 auto', minWidth: '100px' }} value={'temp'}>Temperature</ToggleButton>
        <ToggleButton sx={{ flex: '1 1 auto', minWidth: '100px' }} value={'humidity'}>Humidity</ToggleButton>
        <ToggleButton sx={{ flex: '1 1 auto', minWidth: '100px' }} value={'wind'}>Wind</ToggleButton>
      </ToggleButtonGroup>
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart data={getDataForChart()} margin={{ top: 20, right: 20, left: 2, bottom: 0 }}>
          <CartesianGrid strokeDasharray={'3 3'} stroke={theme.palette.divider} />
          <XAxis dataKey={'date'} stroke={theme.palette.text.primary} />
          <YAxis stroke={theme.palette.text.primary}
                 label={{ value: getChartLabel(), angle: -90, position: 'insideLeft' }} />
          <Tooltip
            contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: 8 }}
            labelStyle={{ color: theme.palette.text.primary }} />
          <Legend
            layout={'horizontal'}
            verticalAlign={'top'}
            align={'right'}
            wrapperStyle={{ top: 0, right: 20 }} />
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
