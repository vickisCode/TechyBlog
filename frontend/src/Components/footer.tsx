import { Box, Container, Grid, Typography, Link, Divider, IconButton, Stack, TextField, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X'; // For Twitter/X
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

const socials = [
    { icon: <GitHubIcon />, link: "https://github.com/techyblog" },
    { icon: <XIcon />, link: "https://x.com/techyblog" },
    { icon: <LinkedInIcon />, link: "https://linkedin.com/company/techyblog" },
    { icon: <FacebookIcon />, link: "https://facebook.com/techyblog" },
];

const Footer = () => {
    const [newsletter, setNewsletter] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    // For scroll to top button
    const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <Box sx={{ bgcolor: '#143c2c', color: '#fff9e5', pt: { xs: 5, sm: 7 }, pb: 2 }}>

            <Container maxWidth="lg">
                <Grid container spacing={4}>

                    {/* About */}
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <Typography variant="h5" fontWeight={900} sx={{ color: '#b6fd9a', letterSpacing: 1 }}>
                            TechyBlog
                        </Typography>
                        <Typography variant="body2" mt={1.5} sx={{ opacity: 0.88 }}>
                            Share your knowledge, explore ideas, and connect with developers worldwide.
                        </Typography>
                        <Stack direction="row" spacing={1.5} mt={2}>
                            {socials.map(s => (
                                <IconButton
                                    key={s.link}
                                    href={s.link}
                                    target="_blank"
                                    rel="noopener"
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.08)',
                                        color: '#b6fd9a',
                                        '&:hover': { bgcolor: '#8db45e', color: '#143c2c' },
                                        borderRadius: '50%',
                                        transition: 'all .2s'
                                    }}
                                    size="small"
                                    aria-label="social"
                                >
                                    {s.icon}
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Quick Links */}
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <Typography variant="h6" mb={2} sx={{ color: '#DCD0A8', fontWeight: 700 }}>
                            Quick Links
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="/" sx={{ color: '#FFF9E5', fontSize: 15 }} underline="hover">Home</Link>
                            <Link href="/blogs" sx={{ color: '#FFF9E5', fontSize: 15 }} underline="hover">Blogs</Link>
                            <Link href="/about" sx={{ color: '#FFF9E5', fontSize: 15 }} underline="hover">About Us</Link>
                        </Stack>
                    </Grid>

                    {/* Newsletter */}
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <Typography variant="h6" mb={2} sx={{ color: '#DCD0A8', fontWeight: 700 }}>
                            Newsletter
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                            Stay updated! Get the latest stories and updates to your inbox.
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={e => {
                                e.preventDefault();
                                setSubscribed(true);
                                setNewsletter('');
                                setTimeout(() => setSubscribed(false), 2000);
                            }}
                        >
                            <Grid size={{ xs: 10 }}>
                                <TextField
                                    size="small"
                                    placeholder="Email address"
                                    value={newsletter}
                                    onChange={e => setNewsletter(e.target.value)}
                                    sx={{
                                        bgcolor: "#fff",
                                        borderRadius: 2,
                                        input: { color: "#143c2c" },
                                        minWidth: 0,
                                        // maxWidth: 180,
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }} mt={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        bgcolor: "#8DB45E", color: "#204736", fontWeight: 700, fontSize: 15,
                                        boxShadow: 0, px: 2, borderRadius: 2, textTransform: 'capitalize',
                                        ':hover': { bgcolor: "#b6fd9a" }
                                    }}
                                    disabled={!newsletter || subscribed}
                                >{subscribed ? "✓" : "Sign Up"}</Button>
                            </Grid>
                        </Box>
                        {subscribed && (
                            <Typography fontSize={13} color="#b6fd9a" mt={1}>
                                Thank you for subscribing!
                            </Typography>
                        )}
                    </Grid>

                    {/* Contact */}
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <Typography variant="h6" mb={2} sx={{ color: '#DCD0A8', fontWeight: 700 }}>
                            Contact
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.93 }}>
                            Email: <Link href="mailto:support@techyblog.com" sx={{ color: "#bdd89e", fontWeight: 500 }} underline="hover">support@techyblog.com</Link>
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.93 }}>
                            Phone: <Link href="tel:+919572949137" sx={{ color: "#bdd89e", fontWeight: 500 }} underline="hover">+91 95729 49137</Link>
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
                            Mon–Fri, 9am–6pm
                        </Typography>
                    </Grid>
                </Grid>



                <Divider sx={{ bgcolor: "#4A9782", my: 3, opacity: 0.24 }} />

                {/* Bottom */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection={{ xs: "column", sm: "row" }}
                    gap={2}
                    py={1}
                >
                    <Typography fontSize={14} sx={{ color: '#DCD0A8', letterSpacing: 0.5 }}>
                        © 2025 TechyBlog. All rights reserved.
                    </Typography>
                    <Button
                        onClick={handleScrollTop}
                        startIcon={<KeyboardArrowUpIcon />}
                        sx={{
                            bgcolor: "#b6fd9a",
                            color: "#14432a",
                            px: 2,
                            borderRadius: 3,
                            fontWeight: 700,
                            fontSize: 14,
                            boxShadow: 0,
                            textTransform: "capitalize",
                            transition: "all .16s",
                            ":hover": { bgcolor: "#8DB45E" }
                        }}>
                        Top
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
