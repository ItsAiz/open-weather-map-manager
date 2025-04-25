import { Theme } from '@mui/material/styles';
import { WeatherCondition } from '@/types/weather';
import backgrounds from '@/common/weather-backgrounds.json';

export const getWeatherPaperStyle = (theme: Theme, condition: WeatherCondition) => {
  const weatherBackgrounds: Record<WeatherCondition, string> = backgrounds;

  return {
    p: 3,
    mb: 4,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${weatherBackgrounds[condition]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(8px) brightness(0.7)',
      zIndex: -1,
    },
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(4px)',
  };
};
