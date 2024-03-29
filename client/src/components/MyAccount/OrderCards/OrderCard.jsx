// OrderCard.jsx
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './OrderCard.css';

const OrderCard = () => {
  const [myOrders, setMyOrders] = useState([]);
  const authToken = localStorage.getItem('userAuthToken');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Check if authToken is available
        if (authToken) {
          // Make a fetch request to get the user's orders using the authentication token
          const response = await fetch('http://localhost:4000/users/my-orders', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }

          const data = await response.json();
          console.log("data=", data);
          setMyOrders(data.orders); // Assuming the response contains an array of orders
        } else {
          console.log('Authentication token not found. Please log in.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Call the fetchOrders function
    fetchOrders();
  }, [authToken]);


  return (
    <div className="order-card">
      {myOrders.map((order, index) => (
        <div key={index} className="order-card">
          <h3 className="order-id">Order</h3>
          <p className="order-date">Order Date: {order.orderDate}</p>
          <div className="order-details">
            <h4 className="product-name">Product Name: </h4>
            {order.products.map((product, index) => (
              <div key={index}>
                <h4 className="product-name"> {product.product_name}</h4>
              </div>
            ))}
            <p className="product-price">Total Amount: {order.totalAmount} BDT </p>
          </div>
          <div className="order-details">
            <h4 className="product-name">Order Status </h4>
            <p className="product-price">{order.status}</p>
          </div>
          <Link to={`/order-status/${order.transactionId}`} className="show-details-btn">
            Show Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
