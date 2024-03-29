import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./FeatureProducts.css";
import LeftPart from '../Dashboard/LeftPart';

const FeatureProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/show-all-product');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleToggleFeature = async (id) => {
        try {
            // Find the product to update
            const productToUpdate = products.find(product => product._id === id);
            
            // Toggle the isItFeatured status
            productToUpdate.isItFeatured = !productToUpdate.isItFeatured;
    
            // Check the number of currently selected featured products
            const numFeaturedProducts = products.filter(product => product.isItFeatured).length;
    
            // Allow toggling the selection only if the limit has not been reached
            if (productToUpdate.isItFeatured && numFeaturedProducts <= 4) {
                // Update the product in the database
                await axios.put(`http://localhost:4000/update-product/${id}`, productToUpdate);
    
                // Update the local state to reflect the change
                setProducts(products.map(product =>
                    product._id === id ? { ...product, isItFeatured: !product.isItFeatured } : product
                ));
            } else {
                // Alert the user that the limit has been reached
                alert('You can select only up to four featured products.');
            }
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const featuredProducts = filteredProducts.filter(product => product.isItFeatured);

    return (
        <>
            <LeftPart />
            <div className='feature-product-wrapper'>
                <h2>Feature Products</h2>
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="tables-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Feature</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product._id}>
                                    <td>{product.product_name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={product.isItFeatured}
                                            onChange={() => handleToggleFeature(product._id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {featuredProducts.map(product => (
                                <tr key={product._id}>
                                    <td>{product.product_name}</td>
                                    <td>{product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default FeatureProducts;
