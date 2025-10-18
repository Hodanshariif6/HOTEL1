const customerModel = require("../model/CustomerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_Secret || "myJwt_secret_1233";


const createCustomer = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existEmail = await customerModel.findOne({ email });
    if (existEmail) return res.status(400).json({ error: "Email already exists" });

    const hashPassword = await bcrypt.hash(password, 12);
    const newData = new customerModel({ name, phone, email, password: hashPassword, role: "customer", isActive: true });
    await newData.save();

    const token = jwt.sign({ userId: newData._id, role: newData.role }, JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({
      message: "✅ Customer created successfully",
      token,
      user: { id: newData._id, name: newData.name, email: newData.email, role: newData.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await customerModel.findOne({ email, role: "customer", isActive: true });
    if (!user) return res.status(400).json({ error: "Invalid customer credentials" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(400).json({ error: "Invalid customer credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ message: "✅ Customer login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await customerModel.find({ role: "customer" }, "-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await customerModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: `User ${user.isActive ? "activated" : "deactivated"} successfully`, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getProfile = async (req, res) => {
  try {
    const user = await customerModel.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ message: "No data provided" });

    const { name, phone, profileImage } = req.body;
    const user = await customerModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (profileImage) user.profileImage = profileImage;

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


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await customerModel.findOne({ email });
    if (!user) return res.json({ message: "If the email exists, a reset token has been sent" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    console.log(`Reset token for ${email}: ${resetToken}`);

    res.json({ message: "Reset token generated successfully.", resetToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==========================
// RESET PASSWORD
// ==========================
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: "Token and new password required" });
    if (newPassword.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

    const user = await customerModel.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetToken = null;
    user.resetTokenExpire = null;
    await user.save();

    res.json({ message: "Password reset successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCustomer,
  customerLogin,
  toggleUserStatus,
  getAllUsers,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword
};
