var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const couponController=require('../controllers/couponController');
const orderController = require("../controllers/orderController");

// Register a new user
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/customer-info/:customerId',userController.getUserDetails);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/coupon-details/:couponName',couponController.getCouponDetails)
router.post("/create-order",orderController.createOrder);
router.get("/order-details/:trans_id",orderController.getOrderDetails);
router.get("/my-orders",orderController.getMyOrders)


module.exports = router;
