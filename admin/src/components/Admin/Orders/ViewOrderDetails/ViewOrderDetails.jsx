import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './vieworderdetails.css'; // Import CSS file for styling
import LeftPart from '../../Dashboard/LeftPart';
import CustomerDetails from './CustomerDetails';

const ViewOrderDetails = () => {
    const { transactionId } = useParams(); // Extract orderId from URL params
    const authToken = localStorage.getItem('authToken');
    const [orderDetails, setOrderDetails] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null)
    const [customerDetails, setCustomerDetails] = useState(null)
   

    
    useEffect(() => {
        const fetchOrderAndCustomerDetails = async () => {
            try {
                if (transactionId) {
                    // Fetch order details
                    const orderResponse = await axios.get(`http://localhost:4000/users/order-details/${transactionId}`);
                    setOrderDetails(orderResponse.data.order);
                    setShippingAddress(orderResponse.data.order.shippingDetails);
                    
                    // Fetch customer details
                    if (orderResponse.status === 200) {
                        // Fetch customer details
                        const customerId = orderResponse.data.order.customer;
                        const customerResponse = await axios.get(`http://localhost:4000/users/customer-info/${customerId}`);
                        // Assuming the response contains customer details in response.data.customer
                        // Update state with customer details
                        console.log(customerResponse.data.user);
                        setCustomerDetails(customerResponse.data.user);
                    }

    
                    // Set shipping address
                    
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };
    
        fetchOrderAndCustomerDetails();
    
    }, [transactionId]);


    const handleMarkAsShipped = async () => {
        try {
           
            const orderId = orderDetails._id; 
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            // Send a PUT request to update the order status
            const response = await axios.put(`http://localhost:4000/admin/order-status/${orderId}`, { status: 'shipped' },config);
    
            // Check if the request was successful
            if (response.status === 200) {
                // Update the orderDetails state to reflect the new status
                setOrderDetails({ ...orderDetails, status: 'Shipped' });
                console.log('Order marked as shipped successfully.');
                alert('Order marked as shipped successfully.');
            } else {
                console.error('Failed to mark order as shipped.');
            }
        } catch (error) {
            console.error('Error marking order as shipped:', error);
        }
    };

    if (!orderDetails) {
        return <div>Loading...</div>; // Placeholder while fetching data
    }

    return (
        <>
            <LeftPart />
            <div className="order-details-container">
                <h2>Order Details</h2>
                <div className="product-details">
                    <h3><u>Product Details</u></h3>
                    <div>
                        <p><strong>Order Number:</strong> {orderDetails._id}</p>
                        {orderDetails.products.map((product, idx) => (
                            <div key={idx} className='individual'>
                                <p><strong>Product Name:</strong> {product.product_name}</p>
                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                <p><strong>Price:</strong> {product.price}</p>

                            </div>
                        ))}
                    </div>
                </div>
                {/* Shipping Address Part */}
                <div className="shipping-address">
                    <div className="shipping-details">
                        <h3><u>Shipping Address</u></h3>
                        <div>
                            <p><strong>Recipient Name:</strong> {shippingAddress.recipientName}</p>
                            <p><strong>Phone Number:</strong> {shippingAddress.phoneNumber}</p>
                            <p><strong>House No:</strong> {shippingAddress.houseNo}</p>
                            <p><strong>Area:</strong> {shippingAddress.area}</p>
                            <p><strong>City:</strong> {shippingAddress.city}</p>
                        </div>
                    </div>
                    <CustomerDetails customerDetails={customerDetails}/>
                </div>
                
                {orderDetails.status !== 'shipped' && 
                <button className="mark-as-shipped" onClick={handleMarkAsShipped}>Mark Order as Shipped</button>
            }
            </div>
        </>
    );
}

export default ViewOrderDetails;
