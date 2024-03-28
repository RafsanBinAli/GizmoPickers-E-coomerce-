const Blog = require("../models/Blog");
const { authenticateToken } = require("../middlewares/authenticateToken");

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    // Call the authenticateToken middleware before handling the request
    authenticateToken(req, res, async () => {
      const blog = new Blog(req.body);
      await blog.save();
      res.status(201).json(blog);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.deleteBlogById = async (req, res) => {
    try {
      // Call the authenticateToken middleware before handling the request
      authenticateToken(req, res, async () => {
        const blog = await Blog.findByIdAndDelete(req.params.blogId);
        if (!blog) {
          return res.status(404).json({ error: 'Blog post not found' });
        }
        res.json({ message: 'Blog post deleted successfully' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };