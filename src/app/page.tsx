'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography, Fade, Grow, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloudIcon from '@mui/icons-material/Cloud';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './page.module.css';

const Home = () => {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <Box className={'main-container'}>
      <Box className={'main-container-background'} />
      <Box className={'overlay'} />
      <Container maxWidth={'lg'} className={styles.content} sx={{ paddingTop: 0 }}>
        <Grow in={showContent} timeout={800}>
          <Box>
            <Box className={styles.illustration} />
            <Typography variant={'h2'} className={styles.title} gutterBottom>
              Welcome to WeatherApp
            </Typography>
            <Box display={'flex'} justifyContent={'center'}>
              <Typography variant='h6' className={styles.subtitle} gutterBottom>
                Track weather in your favorite cities, save locations, and access real-time meteorological data with ease.
              </Typography>
            </Box>
            <Stack direction={'row'} justifyContent={'center'} spacing={2} mt={4}>
              <Fade in={showContent} timeout={1200}>
                <Button style={{ color: 'white', padding: 12, fontWeight: 'bold' }}
                        className={styles.button} onClick={handleGoToDashboard}>
                  Go to Dashboard
                </Button>
              </Fade>
            </Stack>
          </Box>
        </Grow>
        <Fade in={showContent} timeout={1600}>
          <Box className={styles.features}>
            <Typography variant={'h5'} className={styles.featureTitle} marginBottom={'2rem'}>
              Why choose WeatherApp?
            </Typography>
            <Box className={styles.featureGrid} marginBottom={2.4}>
              <Box className={styles.featureItem}>
                <SearchIcon fontSize={'large'} />
                <Typography variant={'subtitle1'}>Smart City Search</Typography>
                <Typography variant={'body2'}>Quickly find any city with dynamic suggestions as you type.</Typography>
              </Box>
              <Box className={styles.featureItem}>
                <CloudIcon fontSize={'large'} />
                <Typography variant={'subtitle1'}>Live Weather Details</Typography>
                <Typography variant={'body2'}>See temperature, wind, humidity, and more in real time.</Typography>
              </Box>
              <Box className={styles.featureItem}>
                <ShowChartIcon fontSize={'large'} />
                <Typography variant={'subtitle1'}>Historical Insights</Typography>
                <Typography variant={'body2'}>Explore past weather trends with interactive graphs.</Typography>
              </Box>
              <Box className={styles.featureItem}>
                <FavoriteIcon fontSize={'large'} />
                <Typography variant={'subtitle1'}>Your Favorite Cities</Typography>
                <Typography variant={'body2'}>Save and manage frequently checked locations easily.</Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Home;
