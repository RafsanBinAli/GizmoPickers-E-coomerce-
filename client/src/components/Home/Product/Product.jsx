import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/get-featured-products');
            setFeaturedProducts(response.data);
        } catch (error) {
            console.error('Error fetching featured products:', error);
        }
    };

    return (
        <>
            <div className="products-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-all text-center">
                                <h1>Featured Products</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row special-list">
                        {featuredProducts.map(product => (
                            <div key={product._id} className="col-lg-3 col-md-6 special-grid">
                            <Link to={`/product-details/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="products-single fix">
                                    <div className="box-img-hover">
                                        <img src={product.imageUrls} className="img-fluid" alt="Product" />
                                    </div>
                                    <div className="why-text">
                                        <h4>{product.product_name}</h4>
                                        <h5>{product.price} BDT</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
