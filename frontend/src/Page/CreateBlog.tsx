import React, { useState, useEffect } from 'react';
import Grow from '@mui/material/Grow';
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  Paper,
  MenuItem,
  Snackbar,
  Alert,
  Stack,
  Chip,
  Fade,
  InputAdornment,
} from '@mui/material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import TitleRoundedIcon from '@mui/icons-material/TitleRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';
import axios from 'axios';

const categories = [
  "Programming", "Web Development", "Mobile Development", "Artificial Intelligence (AI)",
  "Machine Learning", "Cybersecurity", "Cloud Computing", "Data Science", "DevOps",
  "Blockchain", "Software Engineering", "Tech News", "Startups",
  "Gadgets & Reviews", "UI/UX Design", "Open Source", "Career in Tech",
  "Tools & Resources", "Code Snippets", "Tech Tutorials", "Other"
];

const CreateBlog: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    Images: '',
    category: '',
    subdescription: '',
    description: '',
  });

  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user._id);
    }
  }, []);

  // Dynamic image preview
  useEffect(() => {
    if (
      /^https?:\/\/.*\.(jpeg|jpg|gif|png|webp)$/i.test(formData.Images)
    ) {
      setImagePreview(formData.Images);
    } else {
      setImagePreview('');
    }
  }, [formData.Images]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.Images ||
      !formData.category ||
      !formData.subdescription ||
      !formData.description
    ) {
      alert('Please fill all the fields.');
      return;
    }
    setLoading(true);
    try {
      const blogData = { ...formData, author: userId };
      await axios.post('http://localhost:3001/blog', blogData);
      setSuccess(true);
      setFormData({
        title: '',
        Images: '',
        category: '',
        subdescription: '',
        description: '',
      });
      setImagePreview('');
    } catch (err) {
      alert('Error creating blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fdf6e3 0%, #e1f9f2 140%)',
        py: { xs: 3, sm: 6 },
        display: 'flex',
        alignItems: "flex-start",
        flexDirection: "column",
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center" mb={4}>
          <Chip
            label="Create Blog"
            icon={<CelebrationRoundedIcon sx={{ mb: '-3px', color: '#8DB45E' }} />}
            sx={{
              background: 'linear-gradient(90deg, #e5ffdf 40%, #ebf2fa 100%)',
              color: '#25463b',
              fontSize: 18,
              mb: 1.5,
              px: 2.6,
              py: 2,
              fontWeight: 700,
              boxShadow: 1,
              letterSpacing: 0.6,
            }}
          />
          <Typography variant="h4" fontWeight={800} color="#004030" mb={0.5}>
            Share your story 🚀
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ fontWeight: 400, fontSize: 18 }}
          >
            Inspire the community with your tech insight!
          </Typography>
        </Box>

        <Paper
          elevation={5}
          sx={{
            p: { xs: 2.2, sm: 3.2 },
            borderRadius: 4,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(9px)',
            boxShadow: '0 8px 26px 0 rgba(31,38,135,0.09)'
          }}
        >
          <Box display="flex" flexDirection="column" gap={3}>

            {/* Blog Title */}
            <TextField
              label="Blog Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              size="medium"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleRoundedIcon color="disabled" />
                  </InputAdornment>
                )
              }}
            />

            {/* Image URL with preview */}
            <TextField
              label="Image URL"
              name="Images"
              value={formData.Images}
              onChange={handleChange}
              fullWidth
              placeholder="https://..."
              required
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddPhotoAlternateRoundedIcon color="disabled" />
                  </InputAdornment>
                )
              }}
            />
            {imagePreview && (
              <Fade in={!!imagePreview}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 200,
                    borderRadius: 3,
                    mt: -1, mb: 1, objectFit: "cover",
                    boxShadow: '0 1px 16px rgba(110,180,130,0.13)'
                  }}
                />
              </Fade>
            )}

            {/* Category selection with preview */}
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryRoundedIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
              SelectProps={{
                MenuProps: {
                  TransitionComponent: Grow,
                  transitionDuration: 300, // smooth 300ms animation
                  PaperProps: {
                    sx: {
                      borderRadius: 2,
                      boxShadow: '0 8px 16px rgba(0, 64, 48, 0.2)',
                      '& .MuiMenuItem-root': {
                        transition: 'background-color 0.25s ease',
                        '&:hover': {
                          backgroundColor: '#e0f2f1', // light teal hover
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#4A9782',
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: '#3a7d6f',
                          },
                        },
                      },
                    },
                  },
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  }
                }
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            {/* Sub Description */}
            <TextField
              label="Sub Description"
              name="subdescription"
              value={formData.subdescription}
              onChange={handleChange}
              fullWidth
              required
              size="medium"
              multiline
              maxRows={2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NotesRoundedIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Full Description */}
            <TextField
              label="Full Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={6}
              fullWidth
              required
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: "start", mt: 1.2 }}>
                    <DescriptionRoundedIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Stack direction="row" justifyContent="center">
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleSubmit}
                endIcon={<CelebrationRoundedIcon />}
                sx={{
                  mt: 1,
                  bgcolor: '#8DB45E',
                  color: '#184535',
                  fontWeight: 700,
                  borderRadius: 2.5,
                  fontSize: '1.10rem',
                  px: 5,
                  py: 1.3,
                  boxShadow: '0 4px 16px 0 rgba(80,180,100,0.10)',
                  textTransform: 'capitalize',
                  letterSpacing: 0.4,
                  transform: loading ? "scale(.98)" : "scale(1)",
                  transition: 'all 0.16s',
                  '&:hover': { bgcolor: '#6bb24c', color: '#fff' },
                }}
              >
                {loading ? 'Publishing...' : 'Publish Blog'}
              </Button>
            </Stack>
          </Box>
        </Paper>
        <Snackbar
          open={success}
          autoHideDuration={2700}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            sx={{
              width: '100%',
              borderRadius: 2,
              letterSpacing: 0.2,
              fontWeight: 600,
              fontSize: 16,
              bgcolor: "#e4ffe9",
              color: "#388f3b"
            }}
            icon={<CelebrationRoundedIcon />}
          >
            Blog created successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CreateBlog;
