import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Grid,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface BlogPost {
  id: string;
  title: string;
  image: string;
  category: string;
  subdescription: string;
  description: string;
  createdAt: string;
}

interface UserType {
  fullname: string;
  email: string;
  avatarUrl?: string;
}

const initialBlogs: BlogPost[] = [
  {
  id: "1",
  title: "Future of AI in India",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQI2rO-hxV0ZJjRdCsmmjBpyTsX3yI6lnVA&s",
  category: "Technology",
  subdescription: "How AI is transforming the Indian tech landscape.",
  description: "India is witnessing a major shift in technology adoption with the rise of Artificial Intelligence. From agriculture to healthcare and education, AI is revolutionizing the way businesses operate. Government initiatives like Digital India and AI for All are fueling this transformation. With rising startups and research in AI, India is on its path to becoming a global AI hub.",
  createdAt: "2025-07-20T14:45:00Z"
}
,
  {
  id: "2",
  title: "Top 5 Programming Languages to Learn in 2025",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FY6SRsC6SZmKT3i2DOlSLMcqKu8q4IL_vg&s",
  category: "Technology",
  subdescription: "Stay ahead with the best coding skills of the future.",
  description: "The tech industry is evolving fast, and so are the tools used by developers. In 2025, the most in-demand programming languages are expected to be Python, JavaScript, TypeScript, Go, and Rust. These languages are widely used in AI, web development, cloud infrastructure, and blockchain, making them valuable for aspiring developers.",
  createdAt: "2025-07-25T18:10:00Z"
}
,
];

const initialUser: UserType = {
  fullname: "Demo User",
  email: "demo@email.com",
  avatarUrl: "https://i.pravatar.cc/150?img=3",
};

export default function AttractiveDashboard() {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [user] = useState<UserType>(initialUser);

  // Add/Edit Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost> | null>(null);

  // Open add/edit blog dialog
  const handleOpenDialog = (mode: "add" | "edit", blog?: BlogPost) => {
    setDialogMode(mode);
    setCurrentBlog(
      mode === "edit" && blog
        ? { ...blog }
        : {
            title: "",
            image: "",
            category: "",
            subdescription: "",
            description: "",
          }
    );
    setDialogOpen(true);
  };

  const handleDialogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentBlog((prev) => ({
      ...prev!,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDialogSubmit = () => {
    if (
      !currentBlog ||
      !currentBlog.title ||
      !currentBlog.category ||
      !currentBlog.subdescription ||
      !currentBlog.description ||
      !currentBlog.image
    ) {
      return;
    }
    if (dialogMode === "add") {
      const newBlog = {
        ...currentBlog,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      } as BlogPost;
      setBlogs((prev) => [newBlog, ...prev]);
    } else if (dialogMode === "edit" && currentBlog.id) {
      setBlogs((prev) =>
        prev.map((b) => (b.id === currentBlog.id ? (currentBlog as BlogPost) : b))
      );
    }
    setDialogOpen(false);
    setCurrentBlog(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      {/* User Info */}
      <Paper
        elevation={6}
        sx={{
          p: 3,
          mb: 4,
          display: "flex",
          alignItems: "center",
          borderRadius: 3,
          background:
            "linear-gradient(135deg, rgba(63,81,181,0.85), rgba(92,107,192,0.85))",
          color: "white",
          boxShadow:
            "0 4px 20px rgba(63,81,181,0.5), 0 0 20px rgba(92,107,192,0.4)",
        }}
      >
        <Avatar
          src={user.avatarUrl}
          sx={{
            width: 80,
            height: 80,
            boxShadow: "0 0 10px rgba(255,255,255,0.7)",
            border: "2px solid white",
            mr: 3,
          }}
          alt={user.fullname}
        />
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Hello, {user.fullname} 👋
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, opacity: 0.85 }}>
            {user.email}
          </Typography>
        </Box>
      </Paper>

      {/* Blog List */}
      <Box sx={{ mb: 5 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="700" color="text.primary">
            My Blog Posts
          </Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={() => handleOpenDialog("add")}
            sx={{ borderRadius: 2, px: 3, py: 1.2, fontWeight: "bold" }}
          >
            New Post
          </Button>
        </Box>
        {blogs.length === 0 ? (
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mt: 10 }}
          >
            No blogs found. Start writing!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {blogs.map((blog) => (
              <Grid size={{xs:12, sm:6}} key={blog.id}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow:
                        "0 12px 20px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.12)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {/* Image */}
                  {blog.image && (
                    <Box
                      component="img"
                      src={blog.image}
                      alt={blog.title}
                      sx={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 2,
                        mb: 2,
                        boxShadow:
                          "0 4px 15px rgba(0,0,0,0.1), inset 0 -4px 8px rgba(0,0,0,0.05)",
                        transition: "transform 0.25s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                  )}
                  <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={1}
                    sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                  >
                    {blog.category}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      flexGrow: 1,
                      color: "#555",
                      mb: 2,
                      lineHeight: 1.3,
                      fontSize: "0.9rem",
                    }}
                  >
                    {blog.subdescription}
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </Typography>
                    <Box>
                      <Tooltip title="Edit Post">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog("edit", blog)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Post">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(blog.id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Stats Section */}
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "#f5f7fa",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Stats
        </Typography>
        <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>
          {blogs.length}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Total Posts
        </Typography>
      </Paper>

      {/* Add/Edit Blog Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "primary.main" }}>
          {dialogMode === "add" ? "Add Blog Post" : "Edit Blog Post"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={currentBlog?.title || ""}
            onChange={handleDialogChange}
            fullWidth
            required
            autoFocus
          />
          <TextField
            margin="dense"
            label="Category"
            name="category"
            value={currentBlog?.category || ""}
            onChange={handleDialogChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Short Description"
            name="subdescription"
            value={currentBlog?.subdescription || ""}
            onChange={handleDialogChange}
            fullWidth
            required
            multiline
            minRows={2}
          />
          <TextField
            margin="dense"
            label="Content"
            name="description"
            value={currentBlog?.description || ""}
            onChange={handleDialogChange}
            fullWidth
            multiline
            minRows={4}
            required
          />
          <TextField
            margin="dense"
            label="Image URL"
            name="image"
            value={currentBlog?.image || ""}
            onChange={handleDialogChange}
            fullWidth
            required
            helperText="Please provide a valid image URL"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDialogSubmit} color="primary" sx={{ fontWeight: "bold" }}>
            {dialogMode === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
