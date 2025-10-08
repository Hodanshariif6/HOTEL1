const mongoose = require("mongoose");

const topCustomerSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  phone: String,
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
});

module.exports = mongoose.model("TopCustomer", topCustomerSchema);
