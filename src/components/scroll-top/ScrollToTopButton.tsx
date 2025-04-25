'use client';

import { useEffect, useState } from 'react';
import { Box, Fade } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './scroll-to-top-button.module.css';

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fade in={show}>
      <Box onClick={scrollToTop} className={styles.scrollTopButton}>
        <KeyboardArrowUpIcon fontSize={'medium'} />
      </Box>
    </Fade>
  );
};

export default ScrollToTopButton;
