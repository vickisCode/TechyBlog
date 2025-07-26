import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Avatar,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Slide,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { Link } from 'react-router-dom';
import logo from '../assets/blog.png'

interface Props {
  isLoggedIn: boolean;
  onLogin: () => void;
  onSignup: () => void;
  onWriteBlog: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({
  isLoggedIn,
  onLogin,
  onSignup,
  onWriteBlog,
  onProfileClick,
  onLogout,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [avatarAnchor, setAvatarAnchor] = React.useState<null | HTMLElement>(null);

  // Example: fetch username/initial from localStorage or API (adjust as per your user logic)
  const userName = (() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      return user && user.fullname ? user.fullname : 'User';
    } catch {
      return 'User';
    }
  })();
  const avatarInitial = userName?.charAt(0)?.toUpperCase() || 'U';

  // Menu Handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const handleAvatarMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAvatarAnchor(event.currentTarget);
  const handleAvatarMenuClose = () => setAvatarAnchor(null);

  return (
    <AppBar
      position="sticky"
      elevation={5}
      sx={{
        background: 'rgba(255, 249, 229, 0.9)',
        color: '#004030',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 16px 0 rgba(0,60,44,0.06)',
        borderBottom: '1.5px solid #e6e0c9',
        zIndex: 1101,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 67 }}>
        {/* LOGO */}
        <Link
          to="/"
          style={{ textDecoration: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} width={35} alt="" />
            <Typography sx={{
              background: "linear-gradient(90deg,#1e7656,#8DB45E 70%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "filter .18s",
              filter: 'drop-shadow(0 1.5px 0.4px #eee)',
              fontWeight: 900,
              fontFamily: 'Poppins, monospace',
              fontSize: '2rem',
              textDecoration: 'none',
              letterSpacing: '.5px',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none',
            }}> TechyBlog</Typography>
          </div>

        </Link>

        {/* Desktop View */}
        {!isMobile && (
          <Box display="flex" alignItems="center" gap={2.5}>
            <Button
              component={Link}
              to="/allblogs"
              variant="text"
              sx={{
                color: '#24524a',
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: 0.1,
                px: 2,
                py: .5,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(77,190,113,0.11)'
                }
              }}
            >
              Browse Blogs
            </Button>
            {isLoggedIn ? (
              <>
                <Button
                  onClick={onWriteBlog}
                  variant="contained"
                  startIcon={<EditNoteRoundedIcon />}
                  sx={{
                    bgcolor: '#8DB45E',
                    color: '#153828',
                    fontWeight: 700,
                    fontSize: 16,
                    px: 2.2,
                    py: 1.1,
                    borderRadius: 3,
                    boxShadow: '0 3px 13px 0 rgba(22,70,42,0.08)',
                    textTransform: "none",
                    '&:hover': {
                      bgcolor: '#68b13e',
                      color: '#FFF9E5'
                    },
                  }}
                >
                  Write Blog
                </Button>
                <IconButton
                  edge="end"
                  onClick={handleAvatarMenuOpen}
                  sx={{
                    ml: 1,
                    p: 0.7,
                    borderRadius: 2.2,
                    transition: 'box-shadow .17s',
                    boxShadow: '0 2px 10px rgba(141,180,94,0.08)',
                    bgcolor: 'rgba(144,200,130,0.11)',
                    '&:hover': { boxShadow: '0 4px 16px rgba(141,180,94,0.15)', bgcolor: '#c3f9d5' }
                  }}
                >
                  <Avatar sx={{
                    bgcolor: "#8DB45E",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 22,
                    width: 38, height: 38,
                    boxShadow: '0 3px 24px rgba(127,201,109,0.12)'
                  }}>
                    {avatarInitial}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={avatarAnchor}
                  open={Boolean(avatarAnchor)}
                  onClose={handleAvatarMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  PaperProps={{ sx: { borderRadius: 3, minWidth: 140, boxShadow: 3 } }}
                >
                  <MenuItem
                    onClick={() => {
                      handleAvatarMenuClose();
                      onProfileClick();
                    }}
                  >Profile</MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      handleAvatarMenuClose();
                      onLogout();
                    }}
                    sx={{ color: '#be2e2e', fontWeight: 600 }}
                  >Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  onClick={onLogin}
                  variant="outlined"
                  sx={{
                    borderColor: '#68b13e',
                    color: '#24524a',
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 2.4, py: 1,
                    fontSize: 16,
                    boxShadow: 'none',
                    textTransform: "none",
                    '&:hover': {
                      bgcolor: '#e7f8db',
                      borderColor: '#153828',
                      color: '#153828'
                    },
                  }}
                >Login
                </Button>
                <Button
                  onClick={onSignup}
                  variant="contained"
                  sx={{
                    bgcolor: '#8DB45E',
                    color: '#153828',
                    fontWeight: 800,
                    fontSize: 16,
                    px: 2.6,
                    py: 1.1,
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow: '0 3px 14px 0 rgba(141,180,94,0.10)',
                    '&:hover': {
                      bgcolor: '#68b13e',
                      color: '#fdf6e3'
                    },
                  }}
                >Signup</Button>
              </>
            )}
          </Box>
        )}

        {/* ------------------ Mobile View ------------------ */}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              size="large"
              sx={{
                boxShadow: '0 2px 7px rgba(143,180,105,0.08)',
                bgcolor: '#e1f9f2',
                color: '#2f6847',
                borderRadius: 2.5,
              }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              TransitionComponent={Slide}
              PaperProps={{
                sx: {
                  minWidth: 210,
                  borderRadius: 3,
                  boxShadow: 5,
                  bgcolor: 'rgba(255, 249, 229, .97)',
                  mt: 1
                }
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {/* Mobile Logo and Divider */}
              <Box px={2} py={1}>
                <Typography textAlign="center" fontWeight={900} fontSize={23}
                  sx={{
                    background: "linear-gradient(90deg,#1e7656,#8DB45E 70%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                  TechyBlog
                </Typography>
              </Box>
              <Divider sx={{ mb: 1, opacity: 0.4 }} />
              {/* Action Items */}
              <MenuItem component={Link} to="/allblogs" onClick={handleMenuClose}>
                Browse Blogs
              </MenuItem>
              {isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      onWriteBlog();
                    }}
                  >
                    Write Blog
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      onProfileClick();
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      onLogout();
                    }}
                    sx={{ color: '#be2e2e', fontWeight: 600 }}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      onLogin();
                    }}
                  >Login</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      onSignup();
                    }}
                  >Signup</MenuItem>
                </>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
