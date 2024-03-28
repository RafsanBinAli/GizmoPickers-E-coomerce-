const Coupon = require('../models/Coupon');
const { authenticateToken } = require("../middlewares/authenticateToken");

exports.createCoupon = async (req, res) => {
    try {
        
        // Call the authenticate middleware before handling the request
        authenticateToken(req, res, async () => {
            const { name, discount, expiryDate } = req.body;
            

            // Create a new coupon instance
            const newCoupon = new Coupon({ name, discount, expiryDate });

            // Save the coupon to the database
            await newCoupon.save();

            // Respond with success message
            res.status(201).json({ message: 'Coupon created successfully', coupon: newCoupon });
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Failed to create coupon', error: error.message });
    }
};
exports.deleteCoupon = async (req, res) => {
    try {
        // Call the authenticate middleware before handling the request
        authenticateToken(req, res, async () => {
            const { couponId } = req.params;

            // Find the coupon by ID and delete it
            const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

            if (!deletedCoupon) {
                return res.status(404).json({ message: 'Coupon not found' });
            }

            res.status(200).json({ message: 'Coupon deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete coupon', error: error.message });
    }
};
exports.getCoupons = async (req, res) => {
    try {
        // Call the authenticate middleware before handling the request
        authenticateToken(req, res, async () => {
            // Fetch all coupons from the database
            const coupons = await Coupon.find();

            // Respond with the fetched coupons
            res.status(200).json({ coupons });
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch coupons', error: error.message });
    }
};
exports.getCouponDetails = async (req, res) => {
    try {
        const { couponName } = req.params;
        console.log(couponName)

        // Find the coupon by coupon code
        const coupon = await Coupon.findOne({ name: couponName });
        console.log(coupon)

        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }

        // Respond with the coupon details
        res.status(200).json({ coupon });
    } catch (error) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
};