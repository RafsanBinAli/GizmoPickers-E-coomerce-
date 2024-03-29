import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import "./ShowUp.css";
import LeftPart from '../Dashboard/LeftPart';

const ShowUp = () => {
    const authToken = localStorage.getItem('authToken');
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // Fetch products from the database
    const navigate = useNavigate();
    const handleEditProduct = (productId) => {
        navigate(`/admin/edit-product/${productId}`);
    };
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:4000/show-all-product');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Effect to fetch products when the component mounts or products state changes
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        
    }, [products]);
    // Function to handle product deletion
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:4000/delete-product/${productId}`, {

                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                  }
            });
            if (!response.ok) {
                const responseBody = await response.json();
               
                alert('Failed to delete product');
                throw new Error('Failed to delete product');
            }
            // Remove the deleted product from the local state
            setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
            // Show an alert indicating successful deletion
            alert('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            alert('Error deleting product:', error);
            console.error('Error deleting product:', error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <LeftPart />
            <div className="product-table">
                <h2>Products</h2>
                <div className="search-container"> {/* Container for search input and button */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                </div>
                <div className="table-container">
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category : Sub-Category</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {filteredProducts.map((product, index) => (
                <tr key={index}>
                    <td><img src={product.imageUrls} alt={product.product_name} style={{ maxWidth: '150px' }} /></td>
                    <td>{product.product_name}</td>
                    <td>{product.price} ৳</td>
                    <td>{product.description}</td>
                    <td>{product.category?.category_name} : {product.category?.subcategory_name}</td>
                    <td>
                        {/* Add buttons for actions (update and delete) */}
                        <button style={{ marginRight: '10px' }} onClick={() => handleEditProduct(product._id)}>Edit</button>
                        <button className="action-button" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

            </div>
        </>

    );
}

export default ShowUp;

