import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SignupImg from '../assets/signUpHeader.webp';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

type FormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SnackbarState = {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
};

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'error',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (formData.fullname.length < 2) newErrors.push('Name is too short');
    if (formData.password.length < 6) newErrors.push('Password is too short');
    if (formData.password !== formData.confirmPassword) newErrors.push('Passwords do not match');

    setErrors(newErrors);

    if (newErrors.length > 0) {
      setSnackbar({ open: true, message: newErrors[0], severity: 'error' });
    }

    return newErrors.length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors([]);

    try {
      const res = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.message || 'Signup failed';
        setErrors([errorMsg]);
        setSnackbar({ open: true, message: errorMsg, severity: 'error' });
      } else {
        setSnackbar({
          open: true,
          message: 'Signup successful! Redirecting...',
          severity: 'success',
        });
        setTimeout(() => navigate('/login'), 1200);
      }
    } catch (err) {
      setErrors(['Server error. Try again later.']);
      setSnackbar({ open: true, message: 'Server error. Try again later.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: '#FFF9E5', // Cream background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
        py: 2
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-5%',
          left: '-15%',
          width: 300,
          height: 300,
          bgcolor: '#DCD0A8', // Tan glow
          filter: 'blur(100px)',
          borderRadius: '50%',
          zIndex: 1,
        }}
      />

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ position: 'relative', zIndex: 2 }}
      >
        {/* Left Image */}
        <Grid size={{ xs: 12, md: 5 }} sx={{ textAlign: 'center' }}>
          <img
            src={SignupImg}
            alt="Join"
            style={{
              maxWidth: '100%',
            }}
          />
        </Grid>

        {/* Right Form */}
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              width: '100%',
              maxWidth: 380,
              borderRadius: 3,
              background: '#ffffffff', // Card tan
              backdropFilter: 'blur(8px)',
              boxShadow: '0 6px 20px rgba(0, 64, 48, 0.2)', // Soft greenish shadow
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Typography
                variant="h5"
                fontWeight={800}
                color="#004030" // Dark green text
                mb={1.5}
                textAlign="center"
              >
                Join <span style={{ color: '#4A9782' }}>TechyBlog</span>
              </Typography>
              <Typography
                variant="body2"
                color="#004030"
                mb={2}
                textAlign="center"
                sx={{ fontWeight: 400 }}
              >
                Share your knowledge and connect with the dev world.
              </Typography>

              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  label="Full Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ background: '#FFF9E5' }} // Input cream bg
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ background: '#FFF9E5' }}
                />

                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ background: '#FFF9E5' }}
                />

                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ background: '#FFF9E5' }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: '#004030', // Dark green
                    color: '#FFF9E5', // Cream text
                    fontWeight: 600,
                    borderRadius: 2,
                    fontSize: '1rem',
                    py: 1.2,
                    textTransform: 'capitalize',
                    letterSpacing: 0.5,
                    boxShadow: '0 4px 16px rgba(0, 64, 48, 0.3)',
                    '&:hover': {
                      background: '#4A9782', // Teal on hover
                      boxShadow: '0 6px 20px rgba(74, 151, 130, 0.4)',
                    },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Sign Up'}
                </Button>
              </form>

              <Divider sx={{ my: 2, borderColor: '#004030' }} />
              <Typography variant="body2" textAlign="center" color="#004030">
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{
                    color: '#4A9782',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    textDecorationThickness: 1.5,
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2100}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{
            borderRadius: 2,
            fontSize: '1rem',
            backgroundColor:
              snackbar.severity === 'success' ? '#4A9782' : snackbar.severity === 'error' ? '#b00020' : undefined,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;
