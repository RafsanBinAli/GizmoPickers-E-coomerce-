import React, { useState, useEffect } from 'react';
import LeftPart from '../Dashboard/LeftPart';
import './Blogs.css'; // Import CSS file for styling

const Blogs = () => {
    const authToken = localStorage.getItem('authToken');
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: '', content: '' });

    // Function to fetch blogs from the server
    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:4000/admin/get-blogs'); // Assuming your endpoint for fetching blogs is '/api/blogs'
            const data = await response.json();
            setBlogs(data); // Update state with fetched blogs
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    // Fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/admin/create-blog', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBlog)
            });
            if (response.ok) {
                await fetchBlogs(); // Fetch updated list of blogs after successful creation
                alert("Successfully created a blog")
                setNewBlog({ title: '', content: '' }); // Clear the form fields after submission
            } else {
                console.error('Failed to create blog:', response.statusText);
                alert( response.statusText);
            }
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    
                },
            });
            if (response.ok) {
                await fetchBlogs(); // Fetch updated list of blogs after successful deletion
            } else {
                console.error('Failed to delete blog:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <>
            <LeftPart />
            <div className="blogs-container">
                <form className="blog-form" onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Enter title" value={newBlog.title} onChange={handleInputChange} required />
                    <textarea name="content" placeholder="Enter content" value={newBlog.content} onChange={handleInputChange} required />
                    <button type="submit">Create Blog</button>
                </form>
                <div className="existing-blogs">
                    <h2 className='existing-blog-header'>Existing Blogs</h2>
                    {blogs.map(blog => (
                        <div className="blog-item" key={blog.id}>
                            <h3>{blog.title}</h3>
                            <p>{blog.content}</p>
                            <button className="delete-button" onClick={() => handleDelete(blog.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Blogs;
