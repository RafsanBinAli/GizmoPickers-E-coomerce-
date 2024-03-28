const mongoose = require("mongoose");

// Define schema for the Order model
const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: String,
      product_name: String,
      price: Number,
      quantity: Number,
    },
  ],
  shippingDetails: {
    recipientName: String,
    phoneNumber: String,
    houseNo: String,
    area: String,
    city: String,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
  transactionId:{
    type: String,
    default:null
  },
  orderDate: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
});

// Create Order model
const Order = mongoose.model("Order", orderSchema);

// Export the Order model
module.exports = Order;
