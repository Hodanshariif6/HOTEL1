const OrderModel = require("../model/orderModel");
const RoomModel = require("../model/RoomModel"); // ✅ sax

// Create Order
const createOrder = async (req, res) => {
  try {
    const { customer, rooms } = req.body;

    if (!rooms || rooms.length === 0) return res.status(400).json({ message: "At least one room is required" });
    if (!customer?.name || !customer?.email || !customer?.phone)
      return res.status(400).json({ message: "Customer info is incomplete" });

    let TotalAmount = 0;
    let orderRooms = [];

    for (let item of rooms) {
      const productData = await RoomModel.findById(item.productId);
      if (!productData) return res.status(400).json({ message: "Room not found" });

      if (item.quantity > productData.quantity) return res.status(400).json({ message: "Room out of stock" });

      const total = productData.price * item.quantity * item.nights;
      TotalAmount += total;

      productData.quantity -= item.quantity;
      await productData.save();

      orderRooms.push({
        productId: productData._id,
        name: productData.name,
        prImage: productData.prImage,
        quantity: item.quantity,
        price: productData.price,
        nights: item.nights,
        total,
      });
    }

    const newOrder = new OrderModel({ customer, rooms: orderRooms, TotalAmount });
    await newOrder.save();

    res.status(201).json({ message: "Booking Created", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Read Orders
const readOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("rooms.productId", "name price prImage");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Total Income
const getTotalIncome = async (req, res) => {
  try {
    const totalIncome = await OrderModel.aggregate([
      { $group: { _id: null, totalIncome: { $sum: "$TotalAmount" } } },
    ]);
    res.json(totalIncome);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Top Customers
const getTopCustomers = async (req, res) => {
  try {
    const topCustomers = await OrderModel.aggregate([
      {
        $group: {
          _id: "$customer.email",
          name: { $first: "$customer.name" },
          phone: { $first: "$customer.phone" },
          totalSpent: { $sum: "$TotalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
    ]);

    res.json(topCustomers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createOrder, readOrder, getTotalIncome, getTopCustomers };
