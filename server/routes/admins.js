var express = require('express');
var router = express.Router();

const productController =require("../controllers/productController");
const categoryController =require("../controllers/categoryController");
const adminController = require("../controllers/adminController")
const couponController = require("../controllers/couponController")
const blogController = require("../controllers/blogController")
const orderController = require("../controllers/orderController")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource from admin');
});

router.post('/create-product',productController.createProduct);
router.post('/add-categories', categoryController.createCategory);
router.post('/categories/:category_id/subcategories', categoryController.addSubCategory);
router.get('/show-categories', categoryController.getAllCategories);
router.delete('/categories/:categoryId/subcategories/:subCategoryName', categoryController.deleteSubCategory);
router.delete('/categories/:categoryId', categoryController.deleteCategory);
router.post('/create-coupon',couponController.createCoupon);
router.get('/get-coupons',couponController.getCoupons);
router.delete('/delete-coupon/:couponId',couponController.deleteCoupon);

router.post('/create-blog',blogController.createBlog);
router.delete('/delete-blog/:blogId',blogController.deleteBlogById);
router.get('/get-blogs',blogController.getAllBlogs);

router.get('/get-all-orders', orderController.getAllOrdersByStatus);
router.put('/order-status/:orderId',orderController.updateOrderStatus);


router.post('/signup-admin',adminController.createAdmin)
router.post('/signin-admin',adminController.loginAdmin)
router.get('/get-info',adminController.getAdminInfo)
module.exports = router;
