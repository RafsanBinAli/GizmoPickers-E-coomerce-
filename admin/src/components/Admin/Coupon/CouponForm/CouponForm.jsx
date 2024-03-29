import React, { useState } from 'react';

const CouponForm = ({ onCouponUploaded }) => {
    const authToken = localStorage.getItem('authToken');
    const [formData, setFormData] = useState({
        name: '',
        discount: '',
        expiryDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/admin/create-coupon', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                alert('Failed to upload coupon');
                throw new Error('Failed to upload coupon');
            }
            alert("Successfully Added!")
            // Clear form data after successful upload
            setFormData({ name: '', discount: '', expiryDate: '' });
            // Call the callback function to fetch updated coupon list
            onCouponUploaded();
        } catch (error) {
            console.error('Error uploading coupon:', error);
        }
    };

    return (
        <div className="coupon-form">
            <h3>Add Coupon</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group-wrapper"> {/* Wrapper div for form groups */}
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discount">Discount (%):</label>
                        <input type="number" id="discount" name="discount" value={formData.discount} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date:</label>
                        <input type="date" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
                    </div>
                    <button type="submit">Upload Coupon</button>
                </div>
                
            </form>
        </div>
    );
};

export default CouponForm;
