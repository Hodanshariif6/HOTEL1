const mongoose = require("mongoose")

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  profileImage: { type: String, default: "" }, // ADD THIS
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Customer", CustomerSchema)