const express = require("express")
const {
  createAdmin,
  createCustomer,
  customerLogin,
  adminLogin,
  getAllUsers,
  toggleUserStatus
} = require("../controller/CustomerController")

const router = express.Router()

// Register
router.post("/register/customer", createCustomer)
router.post("/register/admin", createAdmin)

// Login
router.post("/login/customer", customerLogin)
router.post("/login/admin", adminLogin)

// Admin Only: Get all users
router.get("/users", getAllUsers)

// Admin Only: Block/Unblock user
router.put("/users/:id/toggle", toggleUserStatus)

// CustomerRouter.js - ADD THESE ROUTES
const { getProfile, updateProfile } = require("../controller/CustomerController")
const { verifyToken } = require("../middleware/Auth")

// Profile routes (protected)
router.get("/profile", verifyToken, getProfile)
router.put("/profile", verifyToken, updateProfile)

module.exports = router