const express = require("express")
const {
  createCustomer,
  customerLogin,
  getAllUsers,
  toggleUserStatus
} = require("../controller/CustomerController")

const router = express.Router()

router.post("/register/customer", createCustomer)

router.post("/login/customer", customerLogin)

router.get("/users", getAllUsers)

router.put("/users/:id/toggle", toggleUserStatus)

const { getProfile, updateProfile } = require("../controller/CustomerController")
const { verifyToken } = require("../middleware/Auth")

router.get("/profile", verifyToken, getProfile)
router.put("/profile", verifyToken, updateProfile)
const { forgotPassword, resetPassword } = require("../controller/CustomerController");

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


module.exports = router