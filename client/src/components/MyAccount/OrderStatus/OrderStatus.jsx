import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderStatus.css'; // Import CSS for styling

const OrderStatus = () => {
    const { trans_id } = useParams(); // Get the trans_id from the URL
    const [orderDetails, setOrderDetails] = useState(null); // State to store order details
    const [customerDetails, setCustomerDetails] = useState([]);

    useEffect(() => {
        // Function to fetch order details and customer details
        const fetchData = async () => {
            try {
                // Make an API call to fetch order details using trans_id
                const orderResponse = await fetch(`http://localhost:4000/users/order-details/${trans_id}`);
                if (!orderResponse.ok) {
                    throw new Error('Failed to fetch order details');
                }
                const orderData = await orderResponse.json();
                console.log(orderData);
                setOrderDetails(orderData.order); // Update orderDetails state with fetched order details

                // Check if orderDetails is not null before fetching customer details
                if (orderData.order) {
                    const customerResponse = await fetch(`http://localhost:4000/users/customer-info/${orderData.order.customer}`);
                    if (!customerResponse.ok) {
                        throw new Error('Failed to fetch customer details');
                    }
                    const customerData = await customerResponse.json();
                    console.log("Customer data", customerData);
                    setCustomerDetails(customerData.user);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call fetchData function
        fetchData();
    }, [trans_id]);

    return (
        <div className="order-status-container">


            {/* Conditional rendering based on orderDetails */}
            {orderDetails && (
                <div>
                    <div className="order-summary">
                        <h3 className="section-heading"> <u>Order Summary</u></h3>

                        <p>
                            <span className="bold-text">Total Items:  </span>
                            <span className="dynamic-text">{orderDetails.products.length}</span>
                        </p>
                        <p>
                            <span className="bold-text">Total Amount: </span>
                            <span className="dynamic-text">${orderDetails.totalAmount}</span>
                        </p>

                    </div>

                    <div className="delivery-info">
                        <hr />
                        <h3 className="section-heading"> <u>Delivery Information</u></h3>


                        <p>
                            <span className="bold-text">Delivery Address:</span>
                            <span className="dynamic-text">{orderDetails.shippingDetails.houseNo} , {orderDetails.shippingDetails.area}, {orderDetails.shippingDetails.city}</span>
                        </p>
                        <p>
                            <span className="bold-text">Estimated Delivery Time:</span>
                            <span className="dynamic-text">{orderDetails.estimatedDeliveryTime}</span>
                        </p>

                    </div>

                    <div className="billing-info">
                        <hr />
                        <h3 className="section-heading"> <u>Billing Information</u></h3>

                        <p><span className="bold-text">Name: </span> <span className="dynamic-text">{customerDetails.fullName}</span></p>
                        <p><span className="bold-text">Email: </span> <span className="dynamic-text">{customerDetails.email}</span></p>
                        {/* Add more details like payment method, billing address, etc. */}
                    </div>

                    <div className="order-status-update">
                        <hr />
                        <h3 className="section-heading"><u>Order Status</u></h3>

                        <p>
                            <span className="bold-text">Status:</span>
                            <span className="dynamic-text">{orderDetails.status}</span>
                        </p>

                    </div>

                    <div className="return-home">
                        {/* Provide a link/button to return to the homepage or track order */}
                        <button className="return-home-btn">
                            <Link to="/" className="return-home-btn">Return to Homepage</Link>
                            </button>
                    </div>
                </div>
            )}

            {/* Display a loading message while fetching order details */}
            {!orderDetails && <p>Loading...</p>}
        </div>
    );
};

export default OrderStatus;
