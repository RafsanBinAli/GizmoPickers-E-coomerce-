import React from 'react';
const calculateDays = (expiryDate) => {
    const today = new Date();
    const expiration = new Date(expiryDate);
    const differenceInTime = expiration.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
};
const CouponList = ({ coupons, onDeleteCoupon }) => {
    return (
        <div className="coupon-list">
            <h3>Coupon List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Discount (%)</th>
                        <th>Duration</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon._id}>
                            <td>{coupon.name}</td>
                            <td>{coupon.discount}</td>
                            <td>{calculateDays(coupon.expiryDate)}</td>
                            <td>
                                <button onClick={() => onDeleteCoupon(coupon._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CouponList;
