import React, { useState, useEffect } from 'react';


const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    // Fetch blogs from the server
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:4000/admin/get-blogs');
                const data = await response.json();
                
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <>
            <div className="latest-blog">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-all text-center">
                                <h1>Latest Blog</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {blogs.map(blog => (
                            <div className="col-md-6 col-lg-4 col-xl-4" key={blog._id}>
                                <div className="blog-box">
                                    
                                    <div className="blog-content">
                                        <div className="title-blog">
                                            <h3>{blog.title}</h3>
                                            <p>{blog.content}</p>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;
