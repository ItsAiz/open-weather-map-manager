import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from './back-button.module.css'; 

const BackButton = () => {
  const router = useRouter();

  return (
    <Box className={styles.backButtonContainer}>
      <Button
        onClick={() => router.back()}
        startIcon={<ArrowBackIcon />}
        variant={'contained'} sx={{ backgroundColor: 'transparent' }}
        className={styles.backButton}>
        Back
      </Button>
    </Box>
  );
};

export default BackButton;
