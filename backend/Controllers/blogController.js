let postBlog = require('../Modals/blog');

// create blog API

exports.createBlog = async (req, res) => {
    try {
        const { title, Images, category, subdescription, description, author } = req.body;

        if (!author) {
            return res.status(400).json({ message: "Author ID is required" });
        }

        const blog = new postBlog({
            title,
            Images,
            category,
            subdescription,
            description,
            author, // ✅ ensure author is passed
        });

        await blog.save();
        res.status(201).json({ message: "Blog created successfully", blogs: blog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// Read All Blog

// backend/controllers/blogController.js
exports.readallBlog = async (req, res) => {
    try {
        const blogs = await postBlog
            .find()
            .populate('author', 'fullname'); // ✅ fix here

        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Read specific Blog by ID

exports.readbyId = async (req, res) => {
    try {
        const blog = await postBlog.findById(req.params.id)
            .populate('author', 'fullname'); // <- Important

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json(blog);
    } catch (err) {
        console.error("Error fetching blog:", err);
        res.status(500).json({ message: "Server error" });
    }
};


// Update Blog by ID

exports.updatebyId = async (req, res) => {
    try {
        const post = await postBlog.findById(req.params.Id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if logged in user is the author
        if (post.author.toString() !== req.body.userId) {
            return res.status(403).json({ message: "Not authorized to update this post" });
        }

        const updatedPost = await postBlog.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({ updatedPost });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update any specific Data

exports.updatebyPatch = async (req, res) => {
    try {
        const updatePartialData = await SchemaData.findByIdAndUpdate(
            req.params.idno,
            { $set: req.body }, // sirf wahi fields update honge jo bheje gaye hain
            { new: true, }
        );

        res.status(200).send({ updatePartialData });

    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

// Delete Blog by Id 

exports.deletebyId = async (req, res) => {
    try {
        const post = await postBlog.findById(req.params.Id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.body.userId) {
            return res.status(403).json({ message: "Not authorized to delete this post" });
        }

        await postBlog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// search blog

exports.searchBlogs = async (req, res) => {
    try {
        const keyword = req.query.q || "";
        const regex = new RegExp(keyword, 'i');

        const blogs = await postBlog.find({
            $or: [
                { title: regex },
                { category: regex },
                { subdescription: regex },
                { description: regex }
            ]
        }).populate('author', 'name');

        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




