const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    rooms: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
          required: true,
        },
        name: String,
        prImage: String,
        quantity: Number,
        price: Number,
        nights: Number,
        total: Number,
      },
    ],
    TotalAmount: { type: Number, required: true },
    checkIn: { type: Date, required: true },   
    checkOut: { type: Date, required: true },  
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderModel", orderSchema);
