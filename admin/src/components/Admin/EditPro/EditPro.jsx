import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import "./editpro.css"
import LeftPart from '../Dashboard/LeftPart';
const EditPro = () => {
    const navigate =useNavigate();
    const authToken = localStorage.getItem('authToken');
    const { productId } = useParams();
    const [product, setProduct] = useState({
        product_name: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:4000/product-details/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/update-product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                alert('Failed to update product');
                throw new Error('Failed to update product');

            }

            // Show success message or navigate to another page
            alert('Product updated successfully');
            navigate('/admin/show-products');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <>
            <LeftPart />
            <div className="edit-product-container">
                <h2>Edit Product</h2>
                <form className="edit-product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name:</label>
                        <input type="text" id="productName" name="product_name" value={product.product_name} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" name="price" value={product.price} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={(e) => handleInputChange(e)}
                            rows={8}
                            cols={70}
                            style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '5px' }}
                        ></textarea>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div></>

    );
};

export default EditPro;
