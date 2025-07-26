import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Avatar,
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const THEME_COLORS = {
  background: '#ffffffff',   // Background
  surface: '#ffffffff',      // Card/fields
  accent: '#FFCAA0',       // Buttons/accent
  highlight: '#F9E285',    // Highlights & hovers
  text: '#264237',         // Main text
  border: '#FFE5B4',       // Box-shadow/border
  white: '#ffffff',
  black: '#191919',
  success: '#43B68E',
};

interface User {
  _id: string;
  fullname: string;
  email: string;
  createdAt: string;
  avatarUrl?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setError('User ID not found. Please log in again.');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/user/profile/${userId}`);
        const userData = res.data.userDetail;
        setUser(userData);
        setFormData({ fullname: userData.fullname, email: userData.email, password: '' });
        setAvatarPreview(userData.avatarUrl || null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const validateForm = () => {
    if (!formData.fullname.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email is invalid');
      return false;
    }
    if (formData.password && formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setError('');
      setSuccess('');
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const updateData = new FormData();
      updateData.append('fullname', formData.fullname);
      updateData.append('email', formData.email);
      if (formData.password) {
        updateData.append('password', formData.password);
      }
      if (avatarFile) {
        updateData.append('avatar', avatarFile);
      }

      const res = await axios.put(
        `http://localhost:3001/user/profile/${userId}`,
        updateData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setUser(res.data.userDetail);
      setEditing(false);
      setSuccess('Profile updated successfully!');
      setFormData({ ...formData, password: '' });
      setAvatarFile(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress color="inherit" sx={{ color: THEME_COLORS.highlight }} />
      </Box>
    );
  if (error)
    return (
      <Alert
        severity="error"
        onClose={() => setError('')}
        sx={{
          background: THEME_COLORS.accent,
          color: THEME_COLORS.text,
          fontWeight: 700,
        }}
      >
        {error}
      </Alert>
    );
  if (!user)
    return (
      <Alert
        severity="warning"
        sx={{
          background: THEME_COLORS.highlight,
          color: THEME_COLORS.text,
          fontWeight: 700
        }}
      >
        No user found.
      </Alert>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb:6 }}>
      <Paper
        elevation={6}
        sx={{
          p: 5,
          background: THEME_COLORS.background,
          color: THEME_COLORS.text,
          borderRadius: 6,
          boxShadow: `0 8px 32px 0 ${THEME_COLORS.border}`,
          border: `2.5px solid ${THEME_COLORS.border}`,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: THEME_COLORS.accent,
            letterSpacing: '0.04em',
            textAlign: 'center',
          }}
        >
          My Profile
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center" gap={2} mb={3}>
          <Avatar
            alt={user.fullname}
            src={avatarPreview || ''}
            sx={{
              width: 110,
              height: 110,
              border: `3px solid ${THEME_COLORS.highlight}`,
              background: THEME_COLORS.surface,
              boxShadow: `0 2px 12px 0 ${THEME_COLORS.border}55`
            }}
          />
          {editing && (
            <>
              <input
                accept="image/*"
                id="avatar-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                  sx={{
                    background: THEME_COLORS.accent,
                    color: THEME_COLORS.black,
                    fontWeight: 600,
                    px: 2,
                    borderRadius: 2,
                    boxShadow: `0 2px 8px 0 ${THEME_COLORS.accent}33`,
                    '&:hover': {
                      background: THEME_COLORS.highlight,
                      color: THEME_COLORS.black,
                    }
                  }}
                >
                  Change Picture
                </Button>
              </label>
            </>
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap={2.5}>
          <TextField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            disabled={!editing}
            fullWidth
            required
            sx={{
              label: { color: THEME_COLORS.text, fontWeight: 500 },
              '.MuiOutlinedInput-root': {
                color: THEME_COLORS.text,
                background: THEME_COLORS.surface,
                borderRadius: 2,
                border: `1.5px solid ${THEME_COLORS.highlight}`,
              }
            }}
            InputLabelProps={{
              style: { color: THEME_COLORS.text }
            }}
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editing}
            fullWidth
            required
            type="email"
            sx={{
              label: { color: THEME_COLORS.text, fontWeight: 500 },
              '.MuiOutlinedInput-root': {
                color: THEME_COLORS.text,
                background: THEME_COLORS.surface,
                borderRadius: 2,
                border: `1.5px solid ${THEME_COLORS.highlight}`,
              }
            }}
            InputLabelProps={{
              style: { color: THEME_COLORS.text }
            }}
          />

          {editing && (
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!editing}
              fullWidth
              type="password"
              helperText="Leave blank if you don't want to change password"
              sx={{
                label: { color: THEME_COLORS.text, fontWeight: 500 },
                '.MuiOutlinedInput-root': {
                  color: THEME_COLORS.text,
                  background: THEME_COLORS.surface,
                  borderRadius: 2,
                  border: `1.5px solid ${THEME_COLORS.highlight}`,
                }
              }}
              InputLabelProps={{
                style: { color: THEME_COLORS.text }
              }}
            />
          )}

          {editing ? (
            <Box display="flex" gap={2} justifyContent="center">
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{
                  background: `linear-gradient(90deg, ${THEME_COLORS.accent}, ${THEME_COLORS.highlight})`,
                  color: THEME_COLORS.black,
                  fontWeight: 700,
                  borderRadius: 8,
                  px: 3,
                  boxShadow: `0 2px 12px 0 ${THEME_COLORS.highlight}33`,
                  '&:hover': {
                    background: THEME_COLORS.highlight,
                    color: THEME_COLORS.black,
                  }
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => {
                  setEditing(false);
                  setFormData({ fullname: user.fullname, email: user.email, password: '' });
                  setError('');
                  setSuccess('');
                  setAvatarFile(null);
                  setAvatarPreview(user.avatarUrl || null);
                }}
                sx={{
                  color: THEME_COLORS.accent,
                  borderColor: THEME_COLORS.highlight,
                  background: THEME_COLORS.surface,
                  fontWeight: 700,
                  borderRadius: 8,
                  px: 3,
                  '&:hover': {
                    background: THEME_COLORS.highlight,
                    color: THEME_COLORS.black,
                  }
                }}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setEditing(true)}
              sx={{
                background: `linear-gradient(90deg, ${THEME_COLORS.accent} 0%, ${THEME_COLORS.highlight} 100%)`,
                color: THEME_COLORS.black,
                fontWeight: 700,
                borderRadius: 8,
                px: 3,
                boxShadow: `0 2px 12px 0 ${THEME_COLORS.highlight}33`,
                '&:hover': {
                  background: THEME_COLORS.highlight,
                  color: THEME_COLORS.black,
                }
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>
        <Snackbar
          open={!!success}
          autoHideDuration={4000}
          onClose={() => setSuccess('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSuccess('')}
            severity="success"
            sx={{
              width: '100%',
              background: THEME_COLORS.success,
              color: THEME_COLORS.white,
              fontWeight: 700
            }}
          >
            {success}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
