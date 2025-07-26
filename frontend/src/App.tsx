import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';

import Landing from './Page/LandingPage';
import Login from './Page/login';
import Signup from './Page/Signup';
import CreateBlog from './Page/CreateBlog';
import BlogDetails from './Page/BlogDetails';
import Profile from './Page/Profile';
import YourBlogs from './Page/YourBlogs';
import ShowBlog from './Components/BlogCard';
import BrowseBlog from './Page/ShowBlogs';
import Navbar from './Components/Navbar';
import Footer from './Components/footer';
import Dashboard from './Page/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleWriteBlog = () => {
    navigate('/create');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Ye array me aap wo routes daal sakte hain jahan header/footer nahi chahiye
  const noHeaderFooterRoutes = ['/login', '/signup'];

  // Check kar rahe hain ki current path header/footer show karna hai ya nahi
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && (
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onWriteBlog={handleWriteBlog}
          onProfileClick={handleProfileClick}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/allblogs" element={<ShowBlog />} />
        <Route path="/browseblog" element={<BrowseBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/your-blogs" element={<YourBlogs />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
