const customerModel = require("../model/CustomerModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_Secret || "myJwt_secret_1233"

// Create Admin
const createAdmin = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const existEmail = await customerModel.findOne({ email })
    if (existEmail) return res.status(400).json({ error: "Email already exists" })

    const hashPassword = await bcrypt.hash(password, 12)

    const adminData = new customerModel({ name, phone, email, password: hashPassword, role: "admin" })
    await adminData.save()

    res.status(201).json({
      message: "✅ Admin created successfully",
      admin: { id: adminData._id, name: adminData.name, email: adminData.email, role: adminData.role }
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create Customer
const createCustomer = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const existEmail = await customerModel.findOne({ email })
    if (existEmail) return res.status(400).json({ error: "Email already exists" })

    const hashPassword = await bcrypt.hash(password, 12)
    const newData = new customerModel({ name, phone, email, password: hashPassword, role: "customer" })
    await newData.save()

    const token = jwt.sign({ userId: newData._id, role: newData.role }, JWT_SECRET, { expiresIn: "24h" })

    res.status(201).json({
      message: "✅ Customer created successfully",
      token,
      user: { id: newData._id, name: newData.name, email: newData.email, role: newData.role }
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Customer Login
const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: "Email and password required" })

    const user = await customerModel.findOne({ email, role: "customer", isActive: true })
    if (!user) return res.status(400).json({ error: "Invalid customer credentials" })

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) return res.status(400).json({ error: "Invalid customer credentials" })

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "24h" })
    res.json({ message: "✅ Customer login successful", token, user })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
}

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: "Email and password required" })

    const admin = await customerModel.findOne({ email, role: "admin", isActive: true })
    if (!admin) return res.status(400).json({ error: "Invalid admin credentials" })

    const checkPassword = await bcrypt.compare(password, admin.password)
    if (!checkPassword) return res.status(400).json({ error: "Invalid admin credentials" })

    const token = jwt.sign({ userId: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: "24h" })
    res.json({ message: "✅ Admin login successful", token, user: admin })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
}


// Get All Users (Admins + Customers)
const getAllUsers = async (req, res) => {
  try {
    const users = await customerModel.find({}, "-password"); // admins + customers
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Toggle User Active/Inactive
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params
    const user = await customerModel.findById(id)
    if (!user) return res.status(404).json({ message: "User not found" })

    user.isActive = !user.isActive
    await user.save()

    res.json({ message: `User ${user.isActive ? "activated" : "deactivated"} successfully`, user })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// CustomerController.js - ADD THESE FUNCTIONS

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await customerModel.findById(req.user.userId).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update user profile
const updateProfile = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ message: "No data provided" });

    const { name, phone, profileImage } = req.body; // Halkan ka qaado profileImage

    const user = await customerModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (profileImage) user.profileImage = profileImage; // Ku keydi DB

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage || ""
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { 
  createAdmin, 
  createCustomer, 
  customerLogin, 
  adminLogin, 
  toggleUserStatus, 
  getAllUsers,
  getProfile,
  updateProfile
}


