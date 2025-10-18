// controller/AdminController.js
const Admin = require("../model/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_Secret || "myJwt_secret_1233";

// Create admin (ONLY if no admin exists)
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    // If any admin already exists, block creation
    const adminCount = await Admin.countDocuments({});
    if (adminCount > 0) {
      return res.status(403).json({ error: "Admin already exists. Registration disabled." });
    }

    // proceed to create
    const existEmail = await Admin.findOne({ email });
    if (existEmail) return res.status(400).json({ error: "Email already registered" });

    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashPassword, role: "admin" });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully", admin: { id: newAdmin._id, email: newAdmin.email, name: newAdmin.name, role: newAdmin.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin login (unchanged except trimming etc.)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const admin = await Admin.findOne({ email: email.trim(), role: "admin" });
    if (!admin) return res.status(400).json({ error: "Invalid admin credentials" });

    const isPasswordValid = await bcrypt.compare(password.trim(), admin.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid admin credentials" });

    const token = jwt.sign(
      { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Admin login successful", admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update admin email/password (protected - must be admin)
const updateAdmin = async (req, res) => {
  try {
    // req.user is set by verifyToken middleware
    const adminId = req.user?.id;
    if (!adminId) return res.status(401).json({ error: "Unauthorized" });

    const { currentPassword, newEmail, newPassword } = req.body;
    if (!currentPassword) return res.status(400).json({ error: "Current password required to update credentials" });

    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    // verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Current password incorrect" });

    // If user wants to update email, check uniqueness (though only one admin exists, still good)
    if (newEmail && newEmail !== admin.email) {
      const exists = await Admin.findOne({ email: newEmail });
      if (exists) return res.status(400).json({ error: "Email already in use" });
      admin.email = newEmail;
    }

    // If updating password
    if (newPassword) {
      const hashed = await bcrypt.hash(newPassword, 10);
      admin.password = hashed;
    }

    // Optionally allow updating name
    if (req.body.name) admin.name = req.body.name;

    await admin.save();

    // Optionally issue a new token with updated email/name
    const token = jwt.sign(
      { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Admin updated successfully", admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = { createAdmin, adminLogin, updateAdmin };
