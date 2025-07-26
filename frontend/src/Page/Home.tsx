import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Box
      minHeight="80vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      px={2}
      sx={{
        backgroundColor: '#FFF9E5', // background updated
      }}
    >
      {/* Gradient Text */}
      <Typography
        fontSize={'60px'}
        fontWeight="700"
        sx={{
          background: 'linear-gradient(90deg, #004030, #4A9782)', // Updated gradient to match theme
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
          lineHeight: '75px',
        }}
      >
        Stay Ahead with Tech Insights
      </Typography>

      {/* Subtext */}
      <Typography fontSize={'18px'} color="#004030" maxWidth="1000px" mb={4}>
        Dive into the latest in programming, AI, web development, gadgets, and software trends — all in one place. Fuel your curiosity and keep building!
      </Typography>

      {/* Buttons */}
      <Box display="flex" gap={2} justifyContent="center">
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            background: '#004030', // primary dark
            padding: '10px 30px',
            textTransform: 'capitalize',
            fontSize: '14px',
            fontWeight: '300',
            borderRadius: '10px',
            color: '#FFF9E5',
            '&:hover': {
              background: '#4A9782', // hover with accent
            },
          }}
          onClick={() => navigate(isLoggedIn ? '/dashboard' : '/signup')}
        >
          {isLoggedIn ? 'Go to Dashboard' : 'Start Writing'}
        </Button>

        <Button
          sx={{
            color: '#004030', // dark green text
            border: '1px solid #4A9782', // accent border
            padding: '8px 18px',
            borderRadius: '10px',
            textTransform: 'capitalize',
            fontWeight: '500',
            backgroundColor: '#DCD0A8', // surface background
            '&:hover': {
              backgroundColor: '#4A9782',
              color: '#FFF9E5',
            },
          }}
          onClick={() => navigate(isLoggedIn ? '/profile' : '/login')}
          startIcon={<AccountCircleIcon />}
        >
          {isLoggedIn ? 'My Profile' : 'Sign In'}
        </Button>
      </Box>
    </Box>
  );
}
