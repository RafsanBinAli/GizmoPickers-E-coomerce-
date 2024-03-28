const mongoose = require('mongoose');

// Define the schema for the Coupon model
const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    }
});

// Create the Coupon model using the schema
const Coupon = mongoose.model('Coupon', couponSchema);

// Export the Coupon model
module.exports = Coupon;