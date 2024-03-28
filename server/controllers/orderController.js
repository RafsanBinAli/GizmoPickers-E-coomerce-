const Order = require("../models/Order");
const { authenticateToken } = require("../middlewares/authenticateToken");

exports.createOrder = async (req, res) => {
  try {
    // Call the authenticate middleware before handling the request
    const { customer, totalAmount, products, transactionId, shippingDetails } =
      req.body;
    console.log(req.body);
    
    // Create a new order instance
    const newOrder = new Order({
      customer: customer,
      totalAmount,
      products: products,
      transactionId,
      shippingDetails: shippingDetails,
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with success message
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create Order", error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      console.log(req.user);

      // Call the authenticate middleware before handling the request
      const customerId = req.user.id; // Assuming _id is the ObjectId of the user

      // Fetch all orders of the authenticated user from the database
      const orders = await Order.find({ customer: customerId, status: { $in: ['processing', 'shipped', 'delivered'] }  });

      // Respond with the fetched orders
      res.status(200).json({ orders });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const { trans_id } = req.params;

    // Find the order by orderId
    const order = await Order.findOne({ transactionId: trans_id });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if the authenticated user is authorized to view this order
    // Here you can add logic to check if the order belongs to the authenticated user

    // Respond with the order details
    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllOrdersByStatus = async (req, res) => {
  try {
    // Call the authenticateToken middleware before handling the request
    authenticateToken(req, res, async () => {
      const { status } = req.query;

      // Validate status parameter
      if (!status) {
        return res
          .status(400)
          .json({ message: "Status parameter is required" });
      }

      // Fetch orders based on status
      const orders = await Order.find({ status });

      // Respond with the fetched orders
      res.status(200).json(orders);
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      console.log(req.body);
      const { orderId } = req.params; // Assuming the order ID is provided in the URL parameters
      const { status } = req.body; // Assuming the new status is provided in the request body

      // Find the order by orderId
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Update the order status
      order.status = status; // Assuming your Order model has a 'status' field

      // Save the updated order to the database
      await order.save();

      // Respond with success message and the updated order
      res
        .status(200)
        .json({ message: "Order status updated successfully", order });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update order status", error: error.message });
  }
};
