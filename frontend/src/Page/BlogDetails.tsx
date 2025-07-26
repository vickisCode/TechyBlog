// src/pages/BlogDetails.tsx
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Avatar,
  Divider,
  Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Blog {
  _id: string;
  title: string;
  Images: string;
  category: string;
  subdescription: string;
  description: string;
  createdAt: string;
  author: {
    _id: string;
    fullname: string;
  };
}

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ backgroundColor: '#FFF9E5', py: 5, borderRadius: 2 }}>
      <Grid container justifyContent={'center'}>
        <Grid size={{ xs: 11, sm: 10 }}>


          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#004030', fontWeight: 700 }}>
              {blog.title}
            </Typography>

            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: '#4A9782' }} />
              <Typography variant="subtitle2" sx={{ color: '#004030' }}>
                {blog.author?.fullname || 'Unknown'} • {new Date(blog.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <img
              src={blog.Images}
              alt={blog.title}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />

            <Typography
              variant="h5"
              fontWeight={'700'}
              mt={3}
              sx={{ color: '#004030' }}
            >
              {blog.subdescription}
            </Typography>

            <Divider sx={{ my: 2, bgcolor: '#4A9782' }} />

            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: '#004030' }}>
              {blog.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogDetails;
