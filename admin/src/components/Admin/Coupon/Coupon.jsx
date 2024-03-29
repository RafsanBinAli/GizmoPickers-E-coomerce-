import React, { useState, useEffect } from 'react';
import "./coupon.css"
import CouponForm from './CouponForm/CouponForm';
import CouponList from './CouponList/CouponList';
import LeftPart from '../Dashboard/LeftPart';
const Coupon = () => {
    const authToken = localStorage.getItem('authToken');
    const [coupons, setCoupons] = useState([]);

    // Function to fetch coupons from the backend
    const fetchCoupons = async () => {
        try {
            const response = await fetch('http://localhost:4000/admin/get-coupons', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch coupons');
            }
    
            const data = await response.json();
            setCoupons(data.coupons);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    // Function to handle coupon deletion
    const handleDeleteCoupon = async (couponId) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/delete-coupon/${couponId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    
                }
            });
            if (!response.ok) {
                alert('Failed to delete coupon');
                throw new Error('Failed to delete coupon');
            }
            // Remove the deleted coupon from the local state
            setCoupons(prevCoupons => prevCoupons.filter(coupon => coupon.id !== couponId));
            alert("Deleted Successfully")
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    // Fetch coupons when the component mounts
    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <>
        <LeftPart/>
           <div className="content-wrapper">
            <h2>Coupons</h2>
            <div className="coupon-content">
                <CouponForm onCouponUploaded={fetchCoupons} />
                <CouponList coupons={coupons} onDeleteCoupon={handleDeleteCoupon} />
            </div>
        </div>

        </>
    )
}
export default Coupon;