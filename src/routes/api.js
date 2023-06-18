const express = require('express');


const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const UsersController = require("../controllers/Users/UsersController");
const ProductsController = require("../controllers/Products/ProductsController");
const OrdersController = require("../controllers/Orders/OrdersController");
const router = express.Router();


// User
router.post("/Registration", UsersController.Registration);
router.post("/Login", UsersController.Login);
router.post("/ProfileUpdate", AuthVerifyMiddleware, UsersController.ProfileUpdate);
router.get("/ProfileDetails", AuthVerifyMiddleware, UsersController.ProfileDetails);
router.get("/RecoverVerifyEmail/:email", UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp", UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass", UsersController.RecoverResetPass);


// Products
router.post("/CreateProducts", AuthVerifyMiddleware, ProductsController.CreateProducts);
router.post("/UpdateProducts/:id", AuthVerifyMiddleware, ProductsController.UpdateProducts);
router.get("/ProductsDropDown", AuthVerifyMiddleware, ProductsController.ProductsDropDown);
router.get("/DeleteProduct/:id", AuthVerifyMiddleware, ProductsController.DeleteProduct);
router.get("/ProductsDetailsByID/:id", AuthVerifyMiddleware, ProductsController.ProductsDetailsByID);
router.get("/ProductsList/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, ProductsController.ProductsList);

//Orders
router.post("/CreateOrders", AuthVerifyMiddleware, OrdersController.CreateOrders);
router.post("/UpdateOrders/:id", AuthVerifyMiddleware, OrdersController.UpdateOrders);
router.get("/DeleteOrder/:id", AuthVerifyMiddleware, OrdersController.DeleteOrder);
router.get("/OrdersList/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, OrdersController.OrdersList);

router.get("/OrdersDetailsByID/:id", AuthVerifyMiddleware, OrdersController.OrdersDetailsByID);
module.exports = router;