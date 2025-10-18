const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const RoomRouter = require("./Router/RoomRouter");
const orderRoute = require("./Router/orderRoute");
const newsRouter = require("./Router/NewsRouter");
const CabashoRouter = require("./Router/CabashoRouter");
const customerRouter = require("./Router/CustomerRouter");
const adminRouter = require("./Router/adminRouter");

const app = express();
const PORT = process.env.PORT || 7000; // PORT waa capital

// Middlewares
app.use(express.json());
app.use(cors());

// Static folder for images
app.use("/allImages", express.static("images"));

// Routes
app.use(newsRouter);
app.use(RoomRouter);
app.use(orderRoute);
app.use(CabashoRouter);
app.use(customerRouter);
app.use( adminRouter);

// MongoDB Connection
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
