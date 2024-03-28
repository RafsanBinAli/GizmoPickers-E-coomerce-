var express = require("express");
var router = express.Router();
const SSLCommerzPayment = require("sslcommerz-lts");
require("dotenv").config();
const { ObjectId } = require("mongodb");

const productController = require("../controllers/productController");
const Order = require("../models/Order");
const { authenticateToken } = require("../middlewares/authenticateToken");
const is_live = false;

const trans_id = new ObjectId().toString();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/show-all-product", productController.getAllProducts);
router.get("/product-details/:productId", productController.getProductById);
router.delete(
  "/delete-product/:productId",
  productController.deleteProductById
);
router.put("/update-product/:productId", productController.updateProductById);
router.get("/get-featured-products", productController.getFeaturedProducts);

router.post("/payment/success/:trans_id", async (req, res) => {
  console.log("ashse");

  try {
    const trans_id = req.params.trans_id;
    console.log(trans_id);
    // Find the order by trans_id
    const order = await Order.findOne({ transactionId: trans_id });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the order status
    order.status = "processing"; // or any other status you want to set
    await order.save();

    // Redirect to order status page
    res.redirect(`http://localhost:3000/order-status/${trans_id}`);
  } catch (error) {
    console.error("Error processing payment success:", error);
    res.status(500).json({ error: "Failed to process payment success" });
  }
});

router.post("/order", async (req, res) => {
console.log("trans id", trans_id)
  const data = {
    total_amount: req.body.total,
    currency: "BDT",
    tran_id: trans_id, // use unique tran_id for each api call
    success_url: `http://localhost:4000/payment/success/${trans_id}`,
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const productReceiviedFromClient = req.body.cartItems;
  
  const totalPrice = req.body.total;
  const shippingDetails = req.body.shippingDetails;

  authenticateToken(req, res, async () => {
    const sslcz = new SSLCommerzPayment(
      process.env.Store_ID,
      process.env.Store_Password,
      is_live
    );
    sslcz
      .init(data)
      .then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        console.log("Redirecting to: ", GatewayPageURL);

        res.status(200).json({ redirectUrl: GatewayPageURL });

        handleRedirect(
          productReceiviedFromClient,
          totalPrice,
          req.user,
          trans_id,
          shippingDetails
        );
       

        // Send a response after redirecting
      })
      .catch((error) => {
        console.error("Error initiating payment:", error);
        res.status(500).json({ error: "Failed to initiate payment" });
      });
  });
});

function handleRedirect(products, total, user, trans_id, shippingDetails) {
  fetch("http://localhost:4000/users/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products: products,
      totalAmount: total,
      customer: user.id,
      transactionId: trans_id,
      shippingDetails: shippingDetails,
    }),
  })
  .then((response) => {
    if (response.ok) {
      return response.json(); // Parse response body as JSON
    } else {
      console.error("Failed to create order");
      throw new Error("Failed to create order");
    }
  })
    .then((data) => {
      // Extract the order ID from the response data
     

      const orderId = data.order._id; // Assuming the order ID is returned as '_id'

    console.log("Order created successfully. Order ID:", orderId);
      
    })
    .catch((error) => {
      console.error("Error creating order:", error);
    });
}

module.exports = router;
