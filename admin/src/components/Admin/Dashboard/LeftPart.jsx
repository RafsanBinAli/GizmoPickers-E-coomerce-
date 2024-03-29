import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./left.css"
const LeftPart = () => {
    
    const [userData, setUserData] = useState(null);
    const authToken = localStorage.getItem('authToken')
    // Simulate fetching user data from an API
    useEffect(() => {
        // Assuming you fetch user data from an API endpoint
        fetchUserData().then(data => {
            console.log("this ", data)
            setUserData(data);

        });
    }, []);

    // Function to fetch user data (replace this with actual API call)
    const fetchUserData = async () => {
        // Example of fetching user data from an API
        const response = await fetch('http://localhost:4000/admin/get-info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add your authentication token to the Authorization header
                'Authorization': `Bearer ${authToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        console.log("this is data", data.admin.username)
        return data.admin;
    };

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();
        // Redirect to login page
        window.location.reload();
    };

    return (
        <>
            <div id="wrapper">
                <nav className="navbar navbar-default navbar-cls-top " role="navigation" style={{ marginBottom: '0' }}>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" style={{ width: '320px' }} to="/admin/home">Gizmo Pickers</Link>
                    </div>
                    <div className="header-right">
                        <a href="message-task.html" className="btn btn-info" title="New Message"><b>30 </b><i className="fa fa-envelope-o fa-2x"></i></a>
                        <a href="message-task.html" className="btn btn-primary" title="New Task"><b>40 </b><i className="fa fa-bars fa-2x"></i></a>
                        <button className="btn btn-danger" title="Logout" onClick={handleLogout}>
                            <i className="fa fa-exclamation-circle fa-2x"></i>
                        </button>
                    </div>
                </nav>

                <nav className="navbar-default navbar-side" role="navigation" style={{ width: '320px', height: '100%' }}>
                    <div className="sidebar-collapse">
                        <ul className="nav" id="main-menu">
                            <li>
                                {userData && (
                                    <div className="user-img-div">
                                        <img src="assets/img/user.png" className="img-thumbnail" alt="no"/>
                                        <div className="inner-text">
                                            {userData.username}
                                            <br />
                                            {/* <small>Last Login : 2 Weeks Ago </small> */}
                                        </div>
                                    </div>

                                )}

                            </li>
                            <li>
                                <Link to="/admin/upload">
                                    <i className="fa fa-desktop"></i>Create Product
                                </Link>
                                <Link to="/admin/show-products">
                                    <i className="fa fa-flash "></i>Show and Update Products
                                </Link>
                                <Link to="/admin/feature-products">
                                    <i className="fa fa-desktop "></i>Feature Products
                                </Link>

                                <Link to="/admin/category">
                                    <i className="fa fa-key "></i>Categories
                                </Link>

                                <Link to="/admin/coupon">
                                    <i className="fa fa-recycle "></i>Coupons
                                </Link>
                                <Link to="/admin/blogs">
                                    <i className="fa fa-recycle"></i>Blogs
                                </Link>
                                <Link to="/admin/pending-orders">
                                    <i className="fa fa-coffee"></i> Pending Orders
                                </Link>

                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default LeftPart;