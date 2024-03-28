const mongoose = require('mongoose');

// Define the schema for the blog post
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Blog model using the schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;