import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
  Grid,
  InputAdornment,
  Fade,
  Snackbar,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import loginImg from '../assets/loginImg.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 4500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      // ✅ Save token and userId
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);

      setError('');
      navigate(redirectPath);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FFF9E5',
        py: { xs: 6, sm: 5 },
        display: 'flex',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 4, md: 8 }}
        sx={{ maxWidth: 1200, mx: 'auto' }}
      >
        {/* Image Left Side */}
        <Grid size={{ xs: 12, sm: 6 }} sx={{ textAlign: 'center' }}>
          <Box display={'flex'} justifyContent={'center'}>
            <Box
              component="img"
              src={loginImg}
              alt="Login Illustration"
              sx={{
                maxWidth: { xs: 260, sm: 550 },
                borderRadius: 3,
                transform: 'translateY(10px)',
                userSelect: 'none',
              }}
              draggable={false}
            />
          </Box>

        </Grid>

        {/* Form Right Side */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Container maxWidth="xs">
            <Paper
              elevation={8}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: 5,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow:
                  '0 12px 28px rgba(0, 64, 48, 0.2), 0 4px 8px rgba(0, 64, 48, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow:
                    '0 18px 40px rgba(0, 64, 48, 0.3), 0 6px 14px rgba(0, 64, 48, 0.15)',
                },
              }}
            >
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                sx={{ color: '#004030', mb: 1 }}
              >
                Welcome Back
              </Typography>

              <Typography
                variant="subtitle1"
                textAlign="center"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Sign in to your account to continue writing
              </Typography>

              <Fade in={showError} unmountOnExit>
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              </Fade>

              <TextField
                label="Email"
                type="email"
                fullWidth
                size="medium"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                onKeyDown={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                size="medium"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                onKeyDown={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 4,
                  fontWeight: 700,
                  fontSize: '1rem',
                  py: 1.4,
                  textTransform: 'capitalize',
                  borderRadius: 3,
                  background:
                    'linear-gradient(90deg, #004030 0%, #4A9782 100%)',
                  boxShadow: '0 6px 18px rgba(74, 151, 130, 0.5)',
                  '&:hover': {
                    background:
                      'linear-gradient(90deg, #004030 0%, #75b587 100%)',
                    boxShadow: '0 10px 30px rgba(117, 181, 135, 0.7)',
                  },
                  '&:disabled': {
                    background: '#aacbb3',
                    boxShadow: 'none',
                    cursor: 'not-allowed',
                  },
                }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Box mt={3} textAlign="center" fontSize="0.94rem">
                <Typography variant="body2" component="span" color="text.secondary" mr={0.5}>
                  Don&apos;t have an account?
                </Typography>
                <Link
                  to="/signup"
                  style={{
                    color: '#4A9782',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#004030')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4A9782')}
                >
                  Sign up
                </Link>
              </Box>
            </Paper>
          </Container>
        </Grid>
      </Grid>

      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
