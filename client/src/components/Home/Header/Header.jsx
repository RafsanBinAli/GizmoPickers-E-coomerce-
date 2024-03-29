import React, { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../../../assets/images/logo1.png"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const dropdownRef = useRef(null);
    const isUser = localStorage.getItem('isUserLoggedIn') ? true : false;
    
    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:4000/admin/show-categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const closeDropdown = () => {
        setIsOpen(false);
    };
    const handleSubcategoryClick = () => {
        setIsOpen(false); // Close the product dropdown when a subcategory link is clicked
    };

    return (
        <>
            <header className="main-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
                    <div className="container">
                        <div className="navbar-header">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <Link to="/" className="navbar-brand">
                                <img src={logo} className="logo" alt="" style={{ width: '100px', height: 'auto' }} />
                            </Link>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-menu">
                            <ul className="nav navbar-nav ml-auto" data-in="fadeInDown" data-out="fadeOutUp">
                                <li className="nav-item active">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>

                                <li className="nav-item active">
                                    <Link to="/about" className="nav-link">About Us</Link>
                                </li>

                                <li className="nav-item active" ref={dropdownRef}>

                                    <Link className="nav-link dropdown-toggle arrow" onClick={toggleDropdown}>Product</Link>


                                    <ul className={`dropdown-menu megamenu-content ${isOpen ? 'show' : ''}`} role="menu">
                                        <li>
                                            <div className="row">
                                                {/* Loop through categories */}
                                                {categories.map((category, index) => (
                                                    <div key={index} className="col-menu col-md-3">
                                                        <h6 className="title">{category.category_name}</h6>
                                                        <div className="content">
                                                            <ul className="menu-col">
                                                                {/* Loop through subcategories of the current category */}
                                                                {Object.keys(category.subCategories).map((subcategoryName, subIndex) => (
                                                                    <li key={subIndex}>
                                                                        <Link
                                                                            onClick={handleSubcategoryClick}
                                                                            to={`shop/${category.category_name}/${subcategoryName}`}
                                                                        // Close the dropdown when clicking on a subcategory link
                                                                        >
                                                                            {subcategoryName}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link to="/shop" className="nav-link " >SHOP</Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">Cart</Link>
                                </li>
                                <li className="nav-item"><a className="nav-link" href="contact-us.html">Contact Us</a></li>
                            </ul>
                        </div>

                        <div className="attr-nav">
                            <ul>



                                {isUser ? (
                                    <Link to="/my-account">
                                        <FaUser />
                                    </Link>
                                ) : (
                                    <li className="nav-item active">
                                    <Link to="/user/login" className="nav-link" style={{ fontWeight: 'bold' }}>Sign in</Link>
                                </li>
                                )}


                            </ul>
                        </div>
                        {/* <!-- End Atribute Navigation --> */}
                    </div>
                    {/* <!-- Start Side Menu --> */}

                </nav>
            </header>
        </>
    )
}
export default Header;