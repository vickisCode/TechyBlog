// src/pages/ShowBlog.tsx
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Avatar,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Blog {
  _id: string;
  title: string;
  Images: string;
  category: string;
  subdescription: string;
  createdAt: string;
  author: {
    _id: string;
    fullname: string;
  };
}

const ShowBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:3001/blog');
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

const handleCardClick = (blogId: string) => {
  if (isLoggedIn) {
    navigate(`/blog/${blogId}`);
  } else {
    navigate(`/login?redirect=/blog/${blogId}`);
  }
};


  return (
    <Grid container justifyContent={'center'} py={4} mt={'-100px'} sx={{ backgroundColor: '#FFF9E5' }}>
      <Grid size={{ xs: 11, sm: 10 }}>
        <Typography fontSize={'34px'} fontWeight={'700'} color="#004030">
          Latest Blogs
        </Typography>

        <Grid container spacing={4} mt={2}>
          {blogs.map((blog) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={blog._id}>
              <Card
                sx={{
                  height: '100%',
                  boxShadow: 4,
                  backgroundColor: '#DCD0A8',
                  color: '#004030',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 6,
                    backgroundColor: '#4A9782',
                    color: '#FFF9E5',
                  },
                }}
                onClick={() => handleCardClick(blog._id)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="180"
                    image={blog.Images}
                    alt={blog.title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontWeight: 700,
                        color: '#004030',
                      }}
                    >
                      {blog.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        color: '#004030',
                      }}
                    >
                      {blog.subdescription}
                    </Typography>

                    <Box display="flex" alignItems="center" mt={2}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#4A9782' }} />
                      <Typography variant="caption" sx={{ color: '#004030' }}>
                        ✍️ {blog.author?.fullname || 'Unknown'} •{' '}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        display: 'inline-block',
                        backgroundColor: '#004030',
                        color: '#FFF9E5',
                        px: 2,
                        py: 0.5,
                        mt: '10px',
                        borderRadius: '16px',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      {blog.category}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShowBlog;
