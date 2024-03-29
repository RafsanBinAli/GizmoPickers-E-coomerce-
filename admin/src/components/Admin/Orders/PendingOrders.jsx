import { useState, useEffect } from 'react';
import axios from 'axios';
import './PendingOrders.css'; // Import CSS file for styling
import LeftPart from '../Dashboard/LeftPart';
import { useNavigate } from 'react-router-dom';

const PendingOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const authToken = localStorage.getItem('authToken'); // Retrieve token from localStorage
                const response = await axios.get(`http://localhost:4000/admin/get-all-orders`, {
                    params: { status: 'processing' },
                    headers: {
                        Authorization: `Bearer ${authToken}` // Set Authorization header with the token
                    }
                });
                setOrders(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleViewDetails = async (transactionId) => {

        navigate(`/admin/order-details/${transactionId}`);
    };

    return (
        <>
            <LeftPart />
            {orders.length === 0 ? (
                <div className="no-orders-message">No pending orders</div>
            ) : (
                <div className="order-cards">
                    {orders.map(order => (
                        <div className="order-card" key={order._id}>
                            <h3>Order Number: {order._id}</h3>
                            
                            <button onClick={() => handleViewDetails(order.transactionId)}>View Details</button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default PendingOrders;
