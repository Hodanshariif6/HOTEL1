const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/create/order", orderController.createOrder);
router.get("/read/order", orderController.readOrder);
router.get("/getIncome/order", orderController.getTotalIncome);
router.get("/getTopCustomer/order", orderController.getTopCustomers);

module.exports = router;